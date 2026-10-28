-- ============================================================================
-- FoodieHub - Online Food Ordering System (MySQL 8.0 Database Schema & Seed)
-- Final Year B.Tech Computer Science and Engineering Project
-- ============================================================================

CREATE DATABASE IF NOT EXISTS foodiehub_db CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;
USE foodiehub_db;

-- 1. Users Table
CREATE TABLE IF NOT EXISTS users (
    id INT AUTO_INCREMENT PRIMARY KEY,
    full_name VARCHAR(100) NOT NULL,
    email VARCHAR(120) NOT NULL UNIQUE,
    phone VARCHAR(15) NOT NULL,
    password_hash VARCHAR(255) NOT NULL,
    default_address TEXT,
    role ENUM('customer', 'admin') DEFAULT 'customer',
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- 2. Restaurants Table
CREATE TABLE IF NOT EXISTS restaurants (
    id INT AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(120) NOT NULL,
    cuisine VARCHAR(150) NOT NULL,
    rating DECIMAL(2,1) DEFAULT 4.5,
    delivery_time VARCHAR(30) NOT NULL,
    delivery_fee DECIMAL(6,2) DEFAULT 0.00,
    location VARCHAR(120) NOT NULL,
    image_url TEXT NOT NULL,
    is_featured BOOLEAN DEFAULT FALSE,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- 3. Menu Items Table
CREATE TABLE IF NOT EXISTS menu_items (
    id INT AUTO_INCREMENT PRIMARY KEY,
    restaurant_id INT NOT NULL,
    name VARCHAR(120) NOT NULL,
    description TEXT NOT NULL,
    price DECIMAL(8,2) NOT NULL,
    rating DECIMAL(2,1) DEFAULT 4.5,
    prep_time VARCHAR(30) NOT NULL,
    category VARCHAR(60) NOT NULL,
    is_veg BOOLEAN DEFAULT TRUE,
    is_bestseller BOOLEAN DEFAULT FALSE,
    image_url TEXT NOT NULL,
    FOREIGN KEY (restaurant_id) REFERENCES restaurants(id) ON DELETE CASCADE
);

-- 4. Coupons Table
CREATE TABLE IF NOT EXISTS coupons (
    code VARCHAR(30) PRIMARY KEY,
    description VARCHAR(200) NOT NULL,
    discount_type ENUM('PERCENT', 'FLAT', 'FREEDEL') NOT NULL,
    discount_value DECIMAL(8,2) NOT NULL,
    min_order_amount DECIMAL(8,2) DEFAULT 0.00,
    max_discount DECIMAL(8,2) DEFAULT 500.00,
    is_active BOOLEAN DEFAULT TRUE
);

-- 5. Orders Table (PCI-DSS Safe: Never stores raw card numbers or CVVs)
CREATE TABLE IF NOT EXISTS orders (
    order_id VARCHAR(40) PRIMARY KEY,
    user_id INT NULL,
    customer_name VARCHAR(100) NOT NULL,
    customer_phone VARCHAR(15) NOT NULL,
    delivery_address TEXT NOT NULL,
    order_notes TEXT,
    subtotal DECIMAL(10,2) NOT NULL,
    delivery_fee DECIMAL(8,2) NOT NULL,
    tax_amount DECIMAL(8,2) NOT NULL,
    discount_amount DECIMAL(8,2) DEFAULT 0.00,
    final_total DECIMAL(10,2) NOT NULL,
    coupon_code VARCHAR(30) NULL,
    payment_method ENUM('COD', 'ONLINE') NOT NULL,
    payment_gateway_ref VARCHAR(120) NULL,
    order_status ENUM('Pending', 'Confirmed', 'Preparing', 'Out for Delivery', 'Delivered') DEFAULT 'Confirmed',
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE SET NULL
);

-- 6. Order Items Table
CREATE TABLE IF NOT EXISTS order_items (
    id INT AUTO_INCREMENT PRIMARY KEY,
    order_id VARCHAR(40) NOT NULL,
    menu_item_id INT NOT NULL,
    item_name VARCHAR(120) NOT NULL,
    quantity INT NOT NULL,
    unit_price DECIMAL(8,2) NOT NULL,
    FOREIGN KEY (order_id) REFERENCES orders(order_id) ON DELETE CASCADE,
    FOREIGN KEY (menu_item_id) REFERENCES menu_items(id) ON DELETE RESTRICT
);

-- ============================================================================
-- SEED DATA
-- ============================================================================

INSERT INTO restaurants (id, name, cuisine, rating, delivery_time, delivery_fee, location, image_url, is_featured) VALUES
(1, 'Bawarchi Royal Kitchen', 'Hyderabadi, Biryani, Mughlai', 4.8, '25-30 mins', 30.00, 'Banjara Hills, Hyderabad', 'https://images.unsplash.com/photo-1589302168068-964664d93dc0?auto=format&fit=crop&w=800&q=80', TRUE),
(2, 'Dakshin Spice Express', 'South Indian, Andhra, Dosa', 4.6, '20-25 mins', 20.00, 'Jubilee Hills, Hyderabad', 'https://images.unsplash.com/photo-1610192244261-3f33de3f55e4?auto=format&fit=crop&w=800&q=80', TRUE),
(3, 'Tandoori Nights & Curries', 'North Indian, Punjabi, Kebabs', 4.7, '30-35 mins', 35.00, 'Madhapur, Hitech City', 'https://images.unsplash.com/photo-1585937421612-70a008356fbe?auto=format&fit=crop&w=800&q=80', TRUE),
(4, 'Napoli Woodfired Pizzeria', 'Italian, Woodfired Pizza, Pasta', 4.5, '25-30 mins', 25.00, 'Gachibowli, Hyderabad', 'https://images.unsplash.com/photo-1513104890138-7c749659a591?auto=format&fit=crop&w=800&q=80', FALSE),
(5, 'Wok & Roll Dragon House', 'Asian, Indo-Chinese, Momos', 4.4, '20-30 mins', 25.00, 'Kukatpally, Hyderabad', 'https://images.unsplash.com/photo-1552611052-33e04de081de?auto=format&fit=crop&w=800&q=80', FALSE),
(6, 'Crave Burger & Shake Lab', 'Burgers, American, Thickshakes', 4.6, '15-20 mins', 0.00, 'Secunderabad', 'https://images.unsplash.com/photo-1568901346375-23c9450c58cd?auto=format&fit=crop&w=800&q=80', TRUE);

INSERT INTO menu_items (id, restaurant_id, name, description, price, rating, prep_time, category, is_veg, is_bestseller, image_url) VALUES
(101, 1, 'Hyderabadi Chicken Dum Biryani', 'Classic slow-cooked basmati rice layered with saffron, caramelized onions, and tender spiced chicken.', 289.00, 4.9, '25 mins', 'Biryani', FALSE, TRUE, 'https://images.unsplash.com/photo-1563379091339-03b21ab4a4f8?auto=format&fit=crop&w=700&q=80'),
(102, 1, 'Shahi Paneer Zafrani Biryani', 'Fragrant basmati rice cooked in dum style with char-grilled malai paneer cubes and royal spices.', 249.00, 4.7, '22 mins', 'Biryani', TRUE, TRUE, 'https://images.unsplash.com/photo-1642821373181-696a54913e93?auto=format&fit=crop&w=700&q=80'),
(103, 2, 'Ghee Roast Masala Dosa', 'Crispy golden fermented crepe roasted in pure cow ghee, served with spiced potato palya and 3 chutneys.', 139.00, 4.8, '15 mins', 'South Indian', TRUE, TRUE, 'https://images.unsplash.com/photo-1668236543090-82eba5ee5976?auto=format&fit=crop&w=700&q=80'),
(104, 3, 'Paneer Butter Masala & 2 Garlic Naan', 'Cottage cheese simmered in rich tomato-cashew velvety gravy served with butter garlic tandoori naans.', 265.00, 4.8, '25 mins', 'North Indian', TRUE, TRUE, 'https://images.unsplash.com/photo-1631452180519-c014fe946bc7?auto=format&fit=crop&w=700&q=80'),
(105, 3, 'Old Delhi Butter Chicken', 'Charcoal smoked boneless chicken tikka tossed in creamy makhani sauce with fenugreek leaves.', 319.00, 4.9, '28 mins', 'North Indian', FALSE, TRUE, 'https://images.unsplash.com/photo-1603894584373-5ac82b2ae398?auto=format&fit=crop&w=700&q=80'),
(106, 4, 'Artisan Margherita Burrata Pizza', '12-inch hand-stretched sourdough crust topped with San Marzano tomatoes, fresh basil, and mozzarella.', 349.00, 4.6, '20 mins', 'Pizza', TRUE, FALSE, 'https://images.unsplash.com/photo-1604382355076-af4b0eb60143?auto=format&fit=crop&w=700&q=80'),
(107, 4, 'Smoky BBQ Peri-Peri Chicken Pizza', 'Loaded with spicy peri-peri chicken chunks, red paprika, caramelized onions, and liquid cheese.', 399.00, 4.7, '25 mins', 'Pizza', FALSE, TRUE, 'https://images.unsplash.com/photo-1565299624946-b28f40a0ae38?auto=format&fit=crop&w=700&q=80'),
(108, 5, 'Schezwan Hakka Noodles & Manchurian Bowl', 'Wok-tossed smoky vegetable Hakka noodles paired with crispy veg Manchurian balls in garlic soy glaze.', 219.00, 4.5, '18 mins', 'Chinese', TRUE, FALSE, 'https://images.unsplash.com/photo-1585032226651-759b368d7246?auto=format&fit=crop&w=700&q=80'),
(109, 6, 'Double Crunch Nashville Zinger Burger', 'Extra crispy spiced chicken fillet, cheddar slice, jalapenos, and chipotle aioli in a brioche bun.', 229.00, 4.8, '15 mins', 'Burgers', FALSE, TRUE, 'https://images.unsplash.com/photo-1586190848861-99aa4a171e90?auto=format&fit=crop&w=700&q=80'),
(110, 6, 'Crispy Korean Corn & Cheese Burger', 'Herb-crusted cottage cheese & sweet corn patty glazed with gochujang mayo and crunchy lettuce.', 189.00, 4.5, '15 mins', 'Burgers', TRUE, FALSE, 'https://images.unsplash.com/photo-1550547660-d9450f859349?auto=format&fit=crop&w=700&q=80'),
(111, 1, 'Royal Double Ka Meetha & Rabri', 'Hyderabadi festive bread pudding soaked in saffron cardamom syrup topped with thick malai rabri.', 149.00, 4.9, '10 mins', 'Desserts', TRUE, TRUE, 'https://images.unsplash.com/photo-1551024709-8f23befc6f87?auto=format&fit=crop&w=700&q=80'),
(112, 6, 'Belgian Dark Chocolate Hazelnut Lava Cake', 'Warm molten chocolate cake with a gooey roasted hazelnut center, dusted with cocoa powder.', 159.00, 4.8, '12 mins', 'Desserts', TRUE, FALSE, 'https://images.unsplash.com/photo-1578985545062-69928b1d9587?auto=format&fit=crop&w=700&q=80');

INSERT INTO coupons (code, description, discount_type, discount_value, min_order_amount, max_discount, is_active) VALUES
('WELCOME50', '50% OFF up to ₹150 on orders above ₹199', 'PERCENT', 50.00, 199.00, 150.00, TRUE),
('BTECH100', 'Flat ₹100 OFF on orders above ₹399', 'FLAT', 100.00, 399.00, 100.00, TRUE),
('FREEDEL', 'Free Delivery on orders above ₹149', 'FREEDEL', 0.00, 149.00, 100.00, TRUE);
