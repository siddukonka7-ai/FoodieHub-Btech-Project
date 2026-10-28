const express = require('express');
const cors = require('cors');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
require('dotenv').config();

const pool = require('./config/db');
const { verifyToken } = require('./middleware/authMiddleware');

const app = express();
app.use(cors());
app.use(express.json());

const JWT_SECRET = process.env.JWT_SECRET || 'super_secret_btech_cse_jwt_key_2026';

// Health Check Endpoint
app.get('/api/health', (req, res) => {
  res.json({
    status: 'OK',
    service: 'FoodieHub REST API',
    paymentGatewayConfigured: Boolean(process.env.PAYMENT_GATEWAY_KEY_ID)
  });
});

// 1. Auth: Register Customer
app.post('/api/auth/register', async (req, res) => {
  try {
    const { fullName, email, phone, password, address } = req.body;
    if (!fullName || !email || !phone || !password) {
      return res.status(400).json({ message: 'All required fields must be filled.' });
    }

    const [existing] = await pool.query('SELECT id FROM users WHERE email = ?', [email]);
    if (existing.length > 0) {
      return res.status(409).json({ message: 'Email is already registered.' });
    }

    const salt = await bcrypt.genSalt(12);
    const passwordHash = await bcrypt.hash(password, salt);

    const [result] = await pool.query(
      'INSERT INTO users (full_name, email, phone, password_hash, default_address) VALUES (?, ?, ?, ?, ?)',
      [fullName, email, phone, passwordHash, address || '']
    );

    const token = jwt.sign({ id: result.insertId, email }, JWT_SECRET, { expiresIn: '7d' });
    res.status(201).json({
      token,
      user: { id: result.insertId, fullName, email, phone, address: address || '' }
    });
  } catch (error) {
    res.status(500).json({ message: 'Server error during registration', error: error.message });
  }
});

// 2. Auth: Login Customer
app.post('/api/auth/login', async (req, res) => {
  try {
    const { email, password } = req.body;
    const [users] = await pool.query('SELECT * FROM users WHERE email = ?', [email]);
    if (users.length === 0) {
      return res.status(401).json({ message: 'Invalid email or password.' });
    }

    const user = users[0];
    const isMatch = await bcrypt.compare(password, user.password_hash);
    if (!isMatch) {
      return res.status(401).json({ message: 'Invalid email or password.' });
    }

    const token = jwt.sign({ id: user.id, email: user.email }, JWT_SECRET, { expiresIn: '7d' });
    res.json({
      token,
      user: {
        id: user.id,
        fullName: user.full_name,
        email: user.email,
        phone: user.phone,
        address: user.default_address
      }
    });
  } catch (error) {
    res.status(500).json({ message: 'Server error during login', error: error.message });
  }
});

// 3. Get Restaurants & Menu Items
app.get('/api/restaurants', async (req, res) => {
  try {
    const [restaurants] = await pool.query('SELECT * FROM restaurants ORDER BY is_featured DESC, rating DESC');
    res.json(restaurants);
  } catch (error) {
    res.status(500).json({ message: 'Failed to fetch restaurants', error: error.message });
  }
});

app.get('/api/menu', async (req, res) => {
  try {
    const [items] = await pool.query(`
      SELECT m.*, r.name AS restaurant_name
      FROM menu_items m
      JOIN restaurants r ON m.restaurant_id = r.id
      ORDER BY m.is_bestseller DESC, m.rating DESC
    `);
    res.json(items);
  } catch (error) {
    res.status(500).json({ message: 'Failed to fetch menu items', error: error.message });
  }
});

// 4. Create Order (Never stores card numbers or CVVs)
app.post('/api/orders', async (req, res) => {
  const connection = await pool.getConnection();
  try {
    await connection.beginTransaction();

    const {
      userId,
      customerName,
      customerPhone,
      deliveryAddress,
      orderNotes,
      items,
      subtotal,
      deliveryFee,
      taxAmount,
      discountAmount,
      finalTotal,
      couponCode,
      paymentMethod,
      paymentGatewayRef
    } = req.body;

    if (!customerName || !customerPhone || !deliveryAddress || !items || items.length === 0) {
      return res.status(400).json({ message: 'Missing required checkout details or empty cart.' });
    }

    // Security check: Reject if payload attempts to send raw card details
    if (req.body.cardNumber || req.body.cvv) {
      return res.status(400).json({
        message: 'Security Policy Violation: Never transmit raw card numbers or CVVs to backend storage.'
      });
    }

    const orderId = 'FH-' + Math.floor(100000 + Math.random() * 900000);

    await connection.query(
      `INSERT INTO orders 
      (order_id, user_id, customer_name, customer_phone, delivery_address, order_notes, subtotal, delivery_fee, tax_amount, discount_amount, final_total, coupon_code, payment_method, payment_gateway_ref, order_status)
      VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, 'Confirmed')`,
      [
        orderId,
        userId || null,
        customerName,
        customerPhone,
        deliveryAddress,
        orderNotes || '',
        subtotal,
        deliveryFee,
        taxAmount,
        discountAmount || 0,
        finalTotal,
        couponCode || null,
        paymentMethod || 'COD',
        paymentGatewayRef || null
      ]
    );

    for (const item of items) {
      await connection.query(
        'INSERT INTO order_items (order_id, menu_item_id, item_name, quantity, unit_price) VALUES (?, ?, ?, ?, ?)',
        [orderId, item.id, item.name, item.quantity, item.price]
      );
    }

    await connection.commit();
    res.status(201).json({
      success: true,
      orderId,
      status: 'Confirmed',
      message: 'Order placed successfully'
    });
  } catch (error) {
    await connection.rollback();
    res.status(500).json({ message: 'Order creation failed', error: error.message });
  } finally {
    connection.release();
  }
});

// 5. Update Order Status (Pending -> Confirmed -> Preparing -> Out for Delivery -> Delivered)
app.patch('/api/orders/:orderId/status', async (req, res) => {
  try {
    const { orderId } = req.params;
    const { status } = req.body;
    await pool.query('UPDATE orders SET order_status = ? WHERE order_id = ?', [status, orderId]);
    res.json({ success: true, orderId, status });
  } catch (error) {
    res.status(500).json({ message: 'Failed to update order status', error: error.message });
  }
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(\`FoodieHub Backend Server running on port \${PORT}\`);
});
