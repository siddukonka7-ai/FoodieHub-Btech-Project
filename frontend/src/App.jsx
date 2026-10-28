import React, { useState, useEffect, useMemo } from 'react';
import {
  ShoppingBag, Search, Star, Clock, MapPin, User, CheckCircle2,
  Plus, Minus, Trash2, Filter, Percent, ShieldCheck, ArrowRight,
  Utensils, Sparkles, Copy, Check, Phone, Mail
} from 'lucide-react';

const INITIAL_RESTAURANTS = [
  {
    id: 1,
    name: 'Bawarchi Royal Kitchen',
    cuisine: 'Hyderabadi, Biryani, Mughlai',
    rating: 4.8,
    deliveryTime: '25-30 mins',
    deliveryFee: 30,
    location: 'Banjara Hills, Hyderabad',
    image: 'https://images.unsplash.com/photo-1589302168068-964664d93dc0?auto=format&fit=crop&w=800&q=80'
  },
  {
    id: 2,
    name: 'Dakshin Spice Express',
    cuisine: 'South Indian, Andhra, Dosa',
    rating: 4.6,
    deliveryTime: '20-25 mins',
    deliveryFee: 20,
    location: 'Jubilee Hills, Hyderabad',
    image: 'https://images.unsplash.com/photo-1610192244261-3f33de3f55e4?auto=format&fit=crop&w=800&q=80'
  },
  {
    id: 3,
    name: 'Tandoori Nights & Curries',
    cuisine: 'North Indian, Punjabi, Kebabs',
    rating: 4.7,
    deliveryTime: '30-35 mins',
    deliveryFee: 35,
    location: 'Madhapur, Hitech City',
    image: 'https://images.unsplash.com/photo-1585937421612-70a008356fbe?auto=format&fit=crop&w=800&q=80'
  },
  {
    id: 4,
    name: 'Napoli Woodfired Pizzeria',
    cuisine: 'Italian, Woodfired Pizza, Pasta',
    rating: 4.5,
    deliveryTime: '25-30 mins',
    deliveryFee: 25,
    location: 'Gachibowli, Hyderabad',
    image: 'https://images.unsplash.com/photo-1513104890138-7c749659a591?auto=format&fit=crop&w=800&q=80'
  },
  {
    id: 5,
    name: 'Wok & Roll Dragon House',
    cuisine: 'Asian, Indo-Chinese, Momos',
    rating: 4.4,
    deliveryTime: '20-30 mins',
    deliveryFee: 25,
    location: 'Kukatpally, Hyderabad',
    image: 'https://images.unsplash.com/photo-1552611052-33e04de081de?auto=format&fit=crop&w=800&q=80'
  },
  {
    id: 6,
    name: 'Crave Burger & Shake Lab',
    cuisine: 'Burgers, American, Thickshakes',
    rating: 4.6,
    deliveryTime: '15-20 mins',
    deliveryFee: 0,
    location: 'Secunderabad',
    image: 'https://images.unsplash.com/photo-1568901346375-23c9450c58cd?auto=format&fit=crop&w=800&q=80'
  }
];

const INITIAL_FOOD_ITEMS = [
  {
    id: 101,
    restaurantId: 1,
    restaurantName: 'Bawarchi Royal Kitchen',
    name: 'Hyderabadi Chicken Dum Biryani',
    description: 'Classic slow-cooked basmati rice layered with saffron, caramelized onions, and tender spiced chicken.',
    price: 289,
    rating: 4.9,
    prepTime: '25 mins',
    category: 'Biryani',
    isVeg: false,
    popularity: 99,
    image: 'https://images.unsplash.com/photo-1563379091339-03b21ab4a4f8?auto=format&fit=crop&w=700&q=80'
  },
  {
    id: 102,
    restaurantId: 1,
    restaurantName: 'Bawarchi Royal Kitchen',
    name: 'Shahi Paneer Zafrani Biryani',
    description: 'Fragrant basmati rice cooked in dum style with char-grilled malai paneer cubes and royal spices.',
    price: 249,
    rating: 4.7,
    prepTime: '22 mins',
    category: 'Biryani',
    isVeg: true,
    popularity: 92,
    image: 'https://images.unsplash.com/photo-1642821373181-696a54913e93?auto=format&fit=crop&w=700&q=80'
  },
  {
    id: 103,
    restaurantId: 2,
    restaurantName: 'Dakshin Spice Express',
    name: 'Ghee Roast Masala Dosa',
    description: 'Crispy golden fermented crepe roasted in pure cow ghee, served with spiced potato palya and 3 chutneys.',
    price: 139,
    rating: 4.8,
    prepTime: '15 mins',
    category: 'South Indian',
    isVeg: true,
    popularity: 96,
    image: 'https://images.unsplash.com/photo-1668236543090-82eba5ee5976?auto=format&fit=crop&w=700&q=80'
  },
  {
    id: 104,
    restaurantId: 3,
    restaurantName: 'Tandoori Nights & Curries',
    name: 'Paneer Butter Masala & 2 Garlic Naan',
    description: 'Cottage cheese simmered in rich tomato-cashew velvety gravy served with butter garlic tandoori naans.',
    price: 265,
    rating: 4.8,
    prepTime: '25 mins',
    category: 'North Indian',
    isVeg: true,
    popularity: 94,
    image: 'https://images.unsplash.com/photo-1631452180519-c014fe946bc7?auto=format&fit=crop&w=700&q=80'
  },
  {
    id: 105,
    restaurantId: 3,
    restaurantName: 'Tandoori Nights & Curries',
    name: 'Old Delhi Butter Chicken',
    description: 'Charcoal smoked boneless chicken tikka tossed in creamy makhani sauce with fenugreek leaves.',
    price: 319,
    rating: 4.9,
    prepTime: '28 mins',
    category: 'North Indian',
    isVeg: false,
    popularity: 98,
    image: 'https://images.unsplash.com/photo-1603894584373-5ac82b2ae398?auto=format&fit=crop&w=700&q=80'
  },
  {
    id: 106,
    restaurantId: 4,
    restaurantName: 'Napoli Woodfired Pizzeria',
    name: 'Artisan Margherita Burrata Pizza',
    description: '12-inch hand-stretched sourdough crust topped with San Marzano tomatoes, fresh basil, and mozzarella.',
    price: 349,
    rating: 4.6,
    prepTime: '20 mins',
    category: 'Pizza',
    isVeg: true,
    popularity: 89,
    image: 'https://images.unsplash.com/photo-1604382355076-af4b0eb60143?auto=format&fit=crop&w=700&q=80'
  },
  {
    id: 107,
    restaurantId: 4,
    restaurantName: 'Napoli Woodfired Pizzeria',
    name: 'Smoky BBQ Peri-Peri Chicken Pizza',
    description: 'Loaded with spicy peri-peri chicken chunks, red paprika, caramelized onions, and liquid cheese.',
    price: 399,
    rating: 4.7,
    prepTime: '25 mins',
    category: 'Pizza',
    isVeg: false,
    popularity: 93,
    image: 'https://images.unsplash.com/photo-1565299624946-b28f40a0ae38?auto=format&fit=crop&w=700&q=80'
  },
  {
    id: 108,
    restaurantId: 5,
    restaurantName: 'Wok & Roll Dragon House',
    name: 'Schezwan Hakka Noodles & Manchurian',
    description: 'Wok-tossed smoky vegetable Hakka noodles paired with crispy veg Manchurian balls in garlic soy glaze.',
    price: 219,
    rating: 4.5,
    prepTime: '18 mins',
    category: 'Chinese',
    isVeg: true,
    popularity: 88,
    image: 'https://images.unsplash.com/photo-1585032226651-759b368d7246?auto=format&fit=crop&w=700&q=80'
  },
  {
    id: 109,
    restaurantId: 6,
    restaurantName: 'Crave Burger & Shake Lab',
    name: 'Double Crunch Nashville Zinger Burger',
    description: 'Extra crispy spiced chicken fillet, cheddar slice, jalapenos, and chipotle aioli in a brioche bun.',
    price: 229,
    rating: 4.8,
    prepTime: '15 mins',
    category: 'Burgers',
    isVeg: false,
    popularity: 95,
    image: 'https://images.unsplash.com/photo-1586190848861-99aa4a171e90?auto=format&fit=crop&w=700&q=80'
  },
  {
    id: 110,
    restaurantId: 6,
    restaurantName: 'Crave Burger & Shake Lab',
    name: 'Crispy Korean Corn & Cheese Burger',
    description: 'Herb-crusted cottage cheese & sweet corn patty glazed with gochujang mayo and crunchy lettuce.',
    price: 189,
    rating: 4.5,
    prepTime: '15 mins',
    category: 'Burgers',
    isVeg: true,
    popularity: 85,
    image: 'https://images.unsplash.com/photo-1550547660-d9450f859349?auto=format&fit=crop&w=700&q=80'
  },
  {
    id: 111,
    restaurantId: 1,
    restaurantName: 'Bawarchi Royal Kitchen',
    name: 'Royal Double Ka Meetha & Rabri',
    description: 'Hyderabadi festive bread pudding soaked in saffron cardamom syrup topped with thick malai rabri.',
    price: 149,
    rating: 4.9,
    prepTime: '10 mins',
    category: 'Desserts',
    isVeg: true,
    popularity: 97,
    image: 'https://images.unsplash.com/photo-1551024709-8f23befc6f87?auto=format&fit=crop&w=700&q=80'
  },
  {
    id: 112,
    restaurantId: 6,
    restaurantName: 'Crave Burger & Shake Lab',
    name: 'Belgian Dark Chocolate Lava Cake',
    description: 'Warm molten chocolate cake with a gooey roasted hazelnut center, dusted with cocoa powder.',
    price: 159,
    rating: 4.8,
    prepTime: '12 mins',
    category: 'Desserts',
    isVeg: true,
    popularity: 91,
    image: 'https://images.unsplash.com/photo-1578985545062-69928b1d9587?auto=format&fit=crop&w=700&q=80'
  }
];

const COUPONS = {
  WELCOME50: { code: 'WELCOME50', type: 'PERCENT', value: 50, maxDiscount: 150, minOrder: 199, desc: '50% OFF up to ₹150 on orders above ₹199' },
  BTECH100: { code: 'BTECH100', type: 'FLAT', value: 100, maxDiscount: 100, minOrder: 399, desc: 'Flat ₹100 OFF on orders above ₹399' },
  FREEDEL: { code: 'FREEDEL', type: 'FREEDEL', value: 0, maxDiscount: 100, minOrder: 149, desc: 'Free Delivery on orders above ₹149' }
};

export default function App() {
  const [activeTab, setActiveTab] = useState('home');
  const [selectedRestaurant, setSelectedRestaurant] = useState(null);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [dietFilter, setDietFilter] = useState('ALL');
  const [maxPrice, setMaxPrice] = useState(450);
  const [minRating, setMinRating] = useState(0);
  const [sortBy, setSortBy] = useState('popularity');
  const [copiedCode, setCopiedCode] = useState('');

  // Persistent Cart in localStorage
  const [cart, setCart] = useState(() => {
    try {
      const saved = localStorage.getItem('foodiehub_cart_v1');
      return saved ? JSON.parse(saved) : [];
    } catch {
      return [];
    }
  });

  const [couponInput, setCouponInput] = useState('');
  const [appliedCoupon, setAppliedCoupon] = useState(null);
  const [couponMessage, setCouponMessage] = useState({ type: '', text: '' });

  // Customer Account & Order History
  const [user, setUser] = useState(() => {
    try {
      const saved = localStorage.getItem('foodiehub_user_v1');
      return saved ? JSON.parse(saved) : {
        name: 'Siddhartha Konka',
        email: 'siddhartha.cse@btech.edu.in',
        phone: '9876543210',
        address: 'Flat 302, Tech Park Residency, Hitech City, Hyderabad - 500081',
        isLoggedIn: true
      };
    } catch {
      return { name: 'Siddhartha Konka', email: 'siddhartha.cse@btech.edu.in', phone: '9876543210', address: 'Hyderabad', isLoggedIn: true };
    }
  });

  const [orders, setOrders] = useState(() => {
    try {
      const saved = localStorage.getItem('foodiehub_orders_v1');
      return saved ? JSON.parse(saved) : [];
    } catch {
      return [];
    }
  });

  const [checkoutForm, setCheckoutForm] = useState({
    name: user.name || '',
    phone: user.phone || '',
    address: user.address || '',
    notes: '',
    paymentMethod: 'COD',
    gatewayConfigured: false
  });
  const [checkoutError, setCheckoutError] = useState('');
  const [latestOrder, setLatestOrder] = useState(null);

  useEffect(() => {
    localStorage.setItem('foodiehub_cart_v1', JSON.stringify(cart));
  }, [cart]);

  useEffect(() => {
    localStorage.setItem('foodiehub_orders_v1', JSON.stringify(orders));
  }, [orders]);

  useEffect(() => {
    localStorage.setItem('foodiehub_user_v1', JSON.stringify(user));
  }, [user]);

  const addToCart = (item) => {
    setCart((prev) => {
      const existing = prev.find((i) => i.id === item.id);
      if (existing) {
        return prev.map((i) => i.id === item.id ? { ...i, quantity: i.quantity + 1 } : i);
      }
      return [...prev, { ...item, quantity: 1 }];
    });
  };

  const updateQuantity = (id, delta) => {
    setCart((prev) =>
      prev
        .map((i) => (i.id === id ? { ...i, quantity: i.quantity + delta } : i))
        .filter((i) => i.quantity > 0)
    );
  };

  const subtotal = useMemo(() => cart.reduce((acc, item) => acc + item.price * item.quantity, 0), [cart]);
  const baseDeliveryFee = subtotal > 0 ? (subtotal > 499 ? 0 : 35) : 0;
  const taxes = Math.round(subtotal * 0.05);

  const discount = useMemo(() => {
    if (!appliedCoupon || subtotal === 0) return 0;
    const c = COUPONS[appliedCoupon];
    if (!c || subtotal < c.minOrder) return 0;
    if (c.type === 'PERCENT') return Math.min(Math.round((subtotal * c.value) / 100), c.maxDiscount);
    if (c.type === 'FLAT') return c.value;
    if (c.type === 'FREEDEL') return baseDeliveryFee;
    return 0;
  }, [appliedCoupon, subtotal, baseDeliveryFee]);

  const finalTotal = Math.max(0, subtotal + baseDeliveryFee + taxes - discount);

  const handleApplyCoupon = () => {
    const code = couponInput.trim().toUpperCase();
    if (!COUPONS[code]) {
      setCouponMessage({ type: 'error', text: 'Invalid coupon code. Try WELCOME50, BTECH100, or FREEDEL.' });
      return;
    }
    if (subtotal < COUPONS[code].minOrder) {
      setCouponMessage({ type: 'error', text: `Minimum order of ₹${COUPONS[code].minOrder} required for ${code}.` });
      return;
    }
    setAppliedCoupon(code);
    setCouponMessage({ type: 'success', text: `Coupon ${code} applied! (${COUPONS[code].desc})` });
  };

  const filteredMenu = useMemo(() => {
    return INITIAL_FOOD_ITEMS.filter((item) => {
      if (selectedRestaurant && item.restaurantId !== selectedRestaurant.id) return false;
      if (selectedCategory !== 'All' && item.category !== selectedCategory) return false;
      if (dietFilter === 'VEG' && !item.isVeg) return false;
      if (dietFilter === 'NON_VEG' && item.isVeg) return false;
      if (item.price > maxPrice) return false;
      if (item.rating < minRating) return false;
      if (searchQuery.trim() !== '') {
        const q = searchQuery.toLowerCase();
        const matchName = item.name.toLowerCase().includes(q);
        const matchRest = item.restaurantName.toLowerCase().includes(q);
        const matchCat = item.category.toLowerCase().includes(q);
        if (!matchName && !matchRest && !matchCat) return false;
      }
      return true;
    }).sort((a, b) => {
      if (sortBy === 'price_low') return a.price - b.price;
      if (sortBy === 'price_high') return b.price - a.price;
      if (sortBy === 'rating') return b.rating - a.rating;
      return b.popularity - a.popularity;
    });
  }, [selectedRestaurant, selectedCategory, dietFilter, maxPrice, minRating, searchQuery, sortBy]);

  const handlePlaceOrder = (e) => {
    e.preventDefault();
    if (!checkoutForm.name.trim() || !/^[6-9]\d{9}$/.test(checkoutForm.phone.trim()) || checkoutForm.address.trim().length < 10) {
      setCheckoutError('Please provide a valid name, 10-digit Indian mobile number, and complete delivery address.');
      return;
    }
    if (checkoutForm.paymentMethod === 'ONLINE' && !checkoutForm.gatewayConfigured) {
      setCheckoutError('Online Payment Gateway requires valid merchant credentials. Enable Demo Gateway Credentials or select Cash on Delivery.');
      return;
    }
    const newOrder = {
      orderId: 'FH-' + Math.floor(100000 + Math.random() * 900000),
      createdAt: new Date().toLocaleString('en-IN'),
      customerName: checkoutForm.name,
      customerPhone: checkoutForm.phone,
      deliveryAddress: checkoutForm.address,
      notes: checkoutForm.notes,
      paymentMethod: checkoutForm.paymentMethod,
      items: [...cart],
      subtotal,
      deliveryFee: baseDeliveryFee,
      taxes,
      discount,
      finalTotal,
      status: 'Confirmed'
    };
    setOrders([newOrder, ...orders]);
    setLatestOrder(newOrder);
    setCart([]);
    setAppliedCoupon(null);
    setCheckoutError('');
    setActiveTab('confirmation');
  };

  const advanceOrderStatus = (orderId) => {
    const stages = ['Pending', 'Confirmed', 'Preparing', 'Out for Delivery', 'Delivered'];
    setOrders((prev) =>
      prev.map((o) => {
        if (o.orderId !== orderId) return o;
        const idx = stages.indexOf(o.status);
        const nextStatus = idx < stages.length - 1 ? stages[idx + 1] : 'Delivered';
        return { ...o, status: nextStatus };
      })
    );
  };

  const totalCartCount = cart.reduce((acc, item) => acc + item.quantity, 0);

  return (
    <div className="min-h-screen flex flex-col bg-slate-50">
      {/* Navbar */}
      <header className="sticky top-0 z-50 bg-white/95 backdrop-blur border-b border-slate-200 shadow-sm">
        <div className="max-w-7xl mx-auto px-4 py-3 flex flex-wrap items-center justify-between gap-3">
          <button
            onClick={() => { setSelectedRestaurant(null); setActiveTab('home'); }}
            className="flex items-center gap-2.5 text-left"
          >
            <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-orange-500 to-rose-600 flex items-center justify-center text-white shadow-md">
              <Utensils className="w-5 h-5" />
            </div>
            <div>
              <span className="text-xl font-extrabold tracking-tight text-slate-900">Foodie<span className="text-orange-600">Hub</span></span>
              <span className="block text-[10px] font-semibold uppercase tracking-wider text-slate-400">Online Food Ordering</span>
            </div>
          </button>

          <nav className="flex items-center gap-1 sm:gap-2 flex-wrap">
            {[
              { id: 'home', label: 'Home' },
              { id: 'menu', label: 'Food Menu' },
              { id: 'restaurants', label: 'Restaurants' },
              { id: 'offers', label: 'Offers' },
              { id: 'account', label: 'Account & Orders' }
            ].map((tab) => (
              <button
                key={tab.id}
                onClick={() => {
                  if (tab.id !== 'menu') setSelectedRestaurant(null);
                  setActiveTab(tab.id);
                }}
                className={`px-3 py-2 rounded-lg text-sm font-semibold transition ${
                  activeTab === tab.id ? 'bg-orange-50 text-orange-600' : 'text-slate-600 hover:bg-slate-100'
                }`}
              >
                {tab.label}
              </button>
            ))}

            <button
              onClick={() => setActiveTab('cart')}
              className="relative ml-2 px-4 py-2 rounded-xl bg-slate-900 text-white text-sm font-bold flex items-center gap-2 hover:bg-orange-600 transition"
            >
              <ShoppingBag className="w-4 h-4" />
              <span>Cart</span>
              <span className="px-2 py-0.5 text-xs rounded-full bg-orange-500 text-white">{totalCartCount}</span>
            </button>
          </nav>
        </div>
      </header>

      {/* Main Content */}
      <main className="flex-1 max-w-7xl w-full mx-auto px-4 py-6">
        {activeTab === 'home' && (
          <div className="space-y-10">
            {/* Hero Banner */}
            <div className="relative rounded-3xl overflow-hidden bg-slate-900 text-white shadow-xl">
              <img
                src="https://images.unsplash.com/photo-1504674900247-0877df9cc836?auto=format&fit=crop&w=1400&q=80"
                alt="Food Banner"
                className="absolute inset-0 w-full h-full object-cover opacity-35"
              />
              <div className="relative z-10 p-8 md:p-14 max-w-2xl space-y-5">
                <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-orange-500/20 border border-orange-400/30 text-orange-300 text-xs font-bold">
                  <Sparkles className="w-3.5 h-3.5" /> Express 25-Min Delivery Across Hyderabad
                </span>
                <h1 className="text-3xl md:text-5xl font-extrabold leading-tight">
                  Craving Royal Biryani or Woodfired Pizza?
                </h1>
                <p className="text-slate-200 text-base md:text-lg">
                  Order from top-rated restaurants near you with live kitchen tracking, zero hidden fees, and instant coupon discounts.
                </p>
                <div className="flex flex-col sm:flex-row gap-2 pt-2">
                  <div className="flex-1 flex items-center bg-white rounded-xl px-4 py-3 text-slate-800 shadow">
                    <Search className="w-5 h-5 text-slate-400 mr-2" />
                    <input
                      type="text"
                      value={searchQuery}
                      onChange={(e) => setSearchQuery(e.target.value)}
                      placeholder="Search Hyderabadi Biryani, Masala Dosa, Burgers..."
                      className="w-full focus:outline-none text-sm"
                    />
                  </div>
                  <button
                    onClick={() => setActiveTab('menu')}
                    className="px-6 py-3 rounded-xl bg-orange-600 hover:bg-orange-500 text-white font-bold text-sm flex items-center justify-center gap-2 shadow-lg transition"
                  >
                    Explore Menu <ArrowRight className="w-4 h-4" />
                  </button>
                </div>
              </div>
            </div>

            {/* Categories */}
            <div>
              <h2 className="text-xl font-extrabold text-slate-900 mb-4">Popular Food Categories</h2>
              <div className="grid grid-cols-2 sm:grid-cols-4 md:grid-cols-7 gap-3">
                {['All', 'Biryani', 'South Indian', 'North Indian', 'Pizza', 'Chinese', 'Burgers', 'Desserts'].map((cat) => (
                  <button
                    key={cat}
                    onClick={() => { setSelectedCategory(cat); setActiveTab('menu'); }}
                    className={`p-3 rounded-2xl border text-center font-bold text-sm transition ${
                      selectedCategory === cat ? 'bg-orange-600 text-white border-orange-600 shadow' : 'bg-white text-slate-700 border-slate-200 hover:border-orange-400'
                    }`}
                  >
                    {cat}
                  </button>
                ))}
              </div>
            </div>

            {/* Featured Restaurants */}
            <div>
              <div className="flex items-center justify-between mb-4">
                <h2 className="text-xl font-extrabold text-slate-900">Top Featured Restaurants</h2>
                <button onClick={() => setActiveTab('restaurants')} className="text-sm font-bold text-orange-600 hover:underline">
                  View All Restaurants →
                </button>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                {INITIAL_RESTAURANTS.slice(0, 3).map((rest) => (
                  <div
                    key={rest.id}
                    onClick={() => { setSelectedRestaurant(rest); setActiveTab('menu'); }}
                    className="cursor-pointer bg-white rounded-2xl border border-slate-200 overflow-hidden shadow-sm hover:shadow-md transition group"
                  >
                    <div className="h-44 overflow-hidden relative">
                      <img src={rest.image} alt={rest.name} className="w-full h-full object-cover group-hover:scale-105 transition duration-300" />
                      <span className="absolute bottom-3 right-3 px-2.5 py-1 rounded-lg bg-slate-900/80 text-white text-xs font-bold flex items-center gap-1">
                        <Clock className="w-3 h-3" /> {rest.deliveryTime}
                      </span>
                    </div>
                    <div className="p-4">
                      <div className="flex items-center justify-between">
                        <h3 className="font-bold text-lg text-slate-900">{rest.name}</h3>
                        <span className="px-2 py-0.5 rounded bg-emerald-600 text-white text-xs font-bold flex items-center gap-1">
                          <Star className="w-3 h-3 fill-current" /> {rest.rating}
                        </span>
                      </div>
                      <p className="text-xs text-slate-500 mt-1">{rest.cuisine}</p>
                      <p className="text-xs text-slate-400 mt-2 flex items-center gap-1">
                        <MapPin className="w-3.5 h-3.5" /> {rest.location} • {rest.deliveryFee === 0 ? 'Free Delivery' : `₹${rest.deliveryFee} Delivery`}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}

        {/* Food Menu Tab */}
        {activeTab === 'menu' && (
          <div className="space-y-6">
            {selectedRestaurant && (
              <div className="p-4 rounded-2xl bg-orange-50 border border-orange-200 flex items-center justify-between">
                <div>
                  <span className="text-xs font-bold uppercase text-orange-600">Browsing Restaurant Menu</span>
                  <h2 className="text-xl font-extrabold text-slate-900">{selectedRestaurant.name}</h2>
                  <p className="text-xs text-slate-600">{selectedRestaurant.cuisine} • {selectedRestaurant.location}</p>
                </div>
                <button
                  onClick={() => setSelectedRestaurant(null)}
                  className="px-3 py-1.5 rounded-lg bg-white border border-slate-300 text-xs font-bold text-slate-700 hover:bg-slate-100"
                >
                  Show All Restaurants
                </button>
              </div>
            )}

            {/* Filter Bar */}
            <div className="bg-white p-4 rounded-2xl border border-slate-200 shadow-sm grid grid-cols-1 md:grid-cols-5 gap-4 items-center">
              <div className="flex items-center border border-slate-200 rounded-xl px-3 py-2">
                <Search className="w-4 h-4 text-slate-400 mr-2" />
                <input
                  type="text"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  placeholder="Search dish or cuisine..."
                  className="w-full text-sm focus:outline-none"
                />
              </div>

              <div className="flex items-center gap-1">
                {['ALL', 'VEG', 'NON_VEG'].map((type) => (
                  <button
                    key={type}
                    onClick={() => setDietFilter(type)}
                    className={`flex-1 py-2 rounded-lg text-xs font-bold border transition ${
                      dietFilter === type ? 'bg-slate-900 text-white border-slate-900' : 'bg-slate-50 text-slate-600 border-slate-200'
                    }`}
                  >
                    {type === 'ALL' ? 'All' : type === 'VEG' ? '🟢 Pure Veg' : '🔴 Non-Veg'}
                  </button>
                ))}
              </div>

              <div>
                <label className="block text-[11px] font-bold text-slate-500">Max Price: ₹{maxPrice}</label>
                <input
                  type="range"
                  min="100"
                  max="450"
                  step="10"
                  value={maxPrice}
                  onChange={(e) => setMaxPrice(Number(e.target.value))}
                  className="w-full accent-orange-600"
                />
              </div>

              <select
                value={selectedCategory}
                onChange={(e) => setSelectedCategory(e.target.value)}
                className="border border-slate-200 rounded-xl px-3 py-2 text-sm font-semibold"
              >
                {['All', 'Biryani', 'South Indian', 'North Indian', 'Pizza', 'Chinese', 'Burgers', 'Desserts'].map((c) => (
                  <option key={c} value={c}>{c === 'All' ? 'All Categories' : c}</option>
                ))}
              </select>

              <select
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value)}
                className="border border-slate-200 rounded-xl px-3 py-2 text-sm font-semibold"
              >
                <option value="popularity">Sort: Popularity</option>
                <option value="rating">Sort: Highest Rating</option>
                <option value="price_low">Sort: Price Low to High</option>
                <option value="price_high">Sort: Price High to Low</option>
              </select>
            </div>

            {/* Menu Grid */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {filteredMenu.map((item) => {
                const inCart = cart.find((c) => c.id === item.id);
                return (
                  <div key={item.id} className="bg-white rounded-2xl border border-slate-200 overflow-hidden shadow-sm flex flex-col justify-between">
                    <div>
                      <div className="h-48 relative overflow-hidden">
                        <img src={item.image} alt={item.name} className="w-full h-full object-cover" />
                        <span className={`absolute top-3 left-3 px-2.5 py-1 rounded-md text-xs font-bold shadow ${item.isVeg ? 'bg-emerald-600 text-white' : 'bg-rose-600 text-white'}`}>
                          {item.isVeg ? '● VEG' : '▲ NON-VEG'}
                        </span>
                        <span className="absolute bottom-3 right-3 px-2 py-1 rounded bg-slate-900/80 text-white text-xs font-semibold">
                          {item.prepTime}
                        </span>
                      </div>
                      <div className="p-4">
                        <div className="flex items-center justify-between text-xs text-slate-400 font-semibold mb-1">
                          <span>{item.restaurantName}</span>
                          <span className="text-amber-500 font-bold">★ {item.rating}</span>
                        </div>
                        <h3 className="font-bold text-slate-900 text-base">{item.name}</h3>
                        <p className="text-xs text-slate-500 mt-1 line-clamp-2">{item.description}</p>
                      </div>
                    </div>
                    <div className="p-4 pt-0 flex items-center justify-between border-t border-slate-100 mt-2">
                      <span className="text-lg font-extrabold text-slate-900">₹{item.price}</span>
                      {inCart ? (
                        <div className="flex items-center gap-2 bg-orange-50 border border-orange-200 rounded-xl px-2 py-1">
                          <button onClick={() => updateQuantity(item.id, -1)} className="p-1 text-orange-600 font-bold"><Minus className="w-3.5 h-3.5" /></button>
                          <span className="text-sm font-bold text-orange-700">{inCart.quantity}</span>
                          <button onClick={() => updateQuantity(item.id, 1)} className="p-1 text-orange-600 font-bold"><Plus className="w-3.5 h-3.5" /></button>
                        </div>
                      ) : (
                        <button
                          onClick={() => addToCart(item)}
                          className="px-4 py-2 rounded-xl bg-orange-600 hover:bg-orange-500 text-white text-xs font-bold transition"
                        >
                          + Add to Cart
                        </button>
                      )}
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        )}

        {/* Restaurants Tab */}
        {activeTab === 'restaurants' && (
          <div className="space-y-6">
            <h2 className="text-2xl font-extrabold text-slate-900">Partner Restaurants in Hyderabad</h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {INITIAL_RESTAURANTS.map((rest) => (
                <div key={rest.id} className="bg-white rounded-2xl border border-slate-200 overflow-hidden shadow-sm">
                  <img src={rest.image} alt={rest.name} className="w-full h-48 object-cover" />
                  <div className="p-5 space-y-2">
                    <div className="flex items-center justify-between">
                      <h3 className="font-bold text-lg text-slate-900">{rest.name}</h3>
                      <span className="px-2 py-0.5 rounded bg-emerald-600 text-white text-xs font-bold">★ {rest.rating}</span>
                    </div>
                    <p className="text-xs text-slate-500">{rest.cuisine}</p>
                    <p className="text-xs text-slate-400">{rest.location} • {rest.deliveryTime}</p>
                    <button
                      onClick={() => { setSelectedRestaurant(rest); setActiveTab('menu'); }}
                      className="w-full mt-3 py-2.5 rounded-xl bg-slate-900 hover:bg-orange-600 text-white text-xs font-bold transition"
                    >
                      Browse Restaurant Menu
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Offers Tab */}
        {activeTab === 'offers' && (
          <div className="space-y-6">
            <h2 className="text-2xl font-extrabold text-slate-900">Exclusive Discount Coupons</h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {Object.values(COUPONS).map((c) => (
                <div key={c.code} className="p-6 rounded-2xl bg-white border-2 border-dashed border-orange-300 flex flex-col justify-between space-y-4">
                  <div>
                    <span className="px-3 py-1 rounded-lg bg-orange-100 text-orange-700 font-extrabold text-sm">{c.code}</span>
                    <p className="font-bold text-slate-800 mt-3">{c.desc}</p>
                    <p className="text-xs text-slate-500 mt-1">Minimum cart value: ₹{c.minOrder}</p>
                  </div>
                  <button
                    onClick={() => {
                      navigator.clipboard.writeText(c.code);
                      setCopiedCode(c.code);
                      setCouponInput(c.code);
                    }}
                    className="w-full py-2 rounded-xl bg-slate-900 text-white text-xs font-bold flex items-center justify-center gap-1.5"
                  >
                    {copiedCode === c.code ? <><Check className="w-4 h-4" /> Copied to Cart</> : <><Copy className="w-4 h-4" /> Copy Code</>}
                  </button>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Shopping Cart & Checkout */}
        {activeTab === 'cart' && (
          <div>
            {cart.length === 0 ? (
              <div className="bg-white rounded-3xl border border-slate-200 p-12 text-center max-w-lg mx-auto my-8 space-y-4">
                <ShoppingBag className="w-16 h-16 text-orange-500 mx-auto stroke-1" />
                <h2 className="text-2xl font-extrabold text-slate-900">Your Food Cart is Empty</h2>
                <p className="text-sm text-slate-500">Add delicious biryanis, crispy dosas, or woodfired pizzas from our menu to start your order.</p>
                <button
                  onClick={() => setActiveTab('menu')}
                  className="px-6 py-3 rounded-xl bg-orange-600 text-white font-bold text-sm"
                >
                  Browse Food Menu
                </button>
              </div>
            ) : (
              <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                {/* Cart Items & Checkout Form */}
                <div className="lg:col-span-2 space-y-6">
                  <div className="bg-white rounded-2xl border border-slate-200 p-6 space-y-4">
                    <h3 className="text-lg font-extrabold text-slate-900">Order Items ({totalCartCount})</h3>
                    {cart.map((item) => (
                      <div key={item.id} className="flex items-center justify-between border-b border-slate-100 pb-3">
                        <div>
                          <p className="font-bold text-slate-900 text-sm">{item.name}</p>
                          <p className="text-xs text-slate-400">₹{item.price} each • {item.restaurantName}</p>
                        </div>
                        <div className="flex items-center gap-3">
                          <div className="flex items-center gap-2 border border-slate-200 rounded-lg px-2 py-1">
                            <button onClick={() => updateQuantity(item.id, -1)}><Minus className="w-3.5 h-3.5" /></button>
                            <span className="text-sm font-bold">{item.quantity}</span>
                            <button onClick={() => updateQuantity(item.id, 1)}><Plus className="w-3.5 h-3.5" /></button>
                          </div>
                          <span className="font-bold text-sm w-16 text-right">₹{item.price * item.quantity}</span>
                        </div>
                      </div>
                    ))}
                  </div>

                  {/* Delivery & Payment Form */}
                  <form onSubmit={handlePlaceOrder} className="bg-white rounded-2xl border border-slate-200 p-6 space-y-4">
                    <h3 className="text-lg font-extrabold text-slate-900">Delivery & Secure Checkout</h3>
                    {checkoutError && (
                      <div className="p-3 rounded-xl bg-rose-50 border border-rose-200 text-rose-700 text-xs font-semibold">
                        {checkoutError}
                      </div>
                    )}
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      <div>
                        <label className="block text-xs font-bold text-slate-600 mb-1">Customer Full Name *</label>
                        <input
                          type="text"
                          required
                          value={checkoutForm.name}
                          onChange={(e) => setCheckoutForm({ ...checkoutForm, name: e.target.value })}
                          className="w-full border border-slate-200 rounded-xl px-3 py-2 text-sm"
                        />
                      </div>
                      <div>
                        <label className="block text-xs font-bold text-slate-600 mb-1">10-Digit Mobile Number *</label>
                        <input
                          type="text"
                          required
                          value={checkoutForm.phone}
                          onChange={(e) => setCheckoutForm({ ...checkoutForm, phone: e.target.value })}
                          className="w-full border border-slate-200 rounded-xl px-3 py-2 text-sm"
                        />
                      </div>
                    </div>
                    <div>
                      <label className="block text-xs font-bold text-slate-600 mb-1">Complete Delivery Address *</label>
                      <textarea
                        rows="2"
                        required
                        value={checkoutForm.address}
                        onChange={(e) => setCheckoutForm({ ...checkoutForm, address: e.target.value })}
                        className="w-full border border-slate-200 rounded-xl px-3 py-2 text-sm"
                      />
                    </div>
                    <div>
                      <label className="block text-xs font-bold text-slate-600 mb-1">Cooking / Delivery Instructions (Optional)</label>
                      <input
                        type="text"
                        value={checkoutForm.notes}
                        onChange={(e) => setCheckoutForm({ ...checkoutForm, notes: e.target.value })}
                        placeholder="e.g., Less spicy, leave at security gate"
                        className="w-full border border-slate-200 rounded-xl px-3 py-2 text-sm"
                      />
                    </div>

                    <div className="pt-2 space-y-2">
                      <label className="block text-xs font-bold text-slate-600">Select Payment Method</label>
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                        <button
                          type="button"
                          onClick={() => setCheckoutForm({ ...checkoutForm, paymentMethod: 'COD' })}
                          className={`p-3 rounded-xl border text-left text-xs font-bold ${
                            checkoutForm.paymentMethod === 'COD' ? 'border-orange-600 bg-orange-50 text-orange-700' : 'border-slate-200'
                          }`}
                        >
                          💵 Cash on Delivery (COD)
                          <span className="block text-[10px] font-normal text-slate-500 mt-0.5">Pay via Cash or UPI at doorstep</span>
                        </button>
                        <button
                          type="button"
                          onClick={() => setCheckoutForm({ ...checkoutForm, paymentMethod: 'ONLINE' })}
                          className={`p-3 rounded-xl border text-left text-xs font-bold ${
                            checkoutForm.paymentMethod === 'ONLINE' ? 'border-orange-600 bg-orange-50 text-orange-700' : 'border-slate-200'
                          }`}
                        >
                          💳 Online Payment Gateway
                          <span className="block text-[10px] font-normal text-slate-500 mt-0.5">Zero Card/CVV storage policy</span>
                        </button>
                      </div>

                      {checkoutForm.paymentMethod === 'ONLINE' && (
                        <div className="p-3 rounded-xl bg-slate-50 border border-slate-200 text-xs space-y-2">
                          <label className="flex items-center gap-2 font-semibold text-slate-700">
                            <input
                              type="checkbox"
                              checked={checkoutForm.gatewayConfigured}
                              onChange={(e) => setCheckoutForm({ ...checkoutForm, gatewayConfigured: e.target.checked })}
                            />
                            Simulate Configured Merchant Gateway Key (`RAZORPAY_KEY_ID`)
                          </label>
                          <p className="text-[11px] text-slate-500 flex items-center gap-1">
                            <ShieldCheck className="w-4 h-4 text-emerald-600" />
                            PCI-DSS Compliant: Card numbers and CVVs are never collected or stored on FoodieHub servers.
                          </p>
                        </div>
                      )}
                    </div>

                    <button
                      type="submit"
                      className="w-full py-3.5 rounded-xl bg-orange-600 hover:bg-orange-500 text-white font-extrabold text-sm shadow-lg transition"
                    >
                      Confirm & Place Order • ₹{finalTotal}
                    </button>
                  </form>
                </div>

                {/* Bill Summary */}
                <div className="space-y-6">
                  <div className="bg-white rounded-2xl border border-slate-200 p-6 space-y-4">
                    <h3 className="text-base font-extrabold text-slate-900">Apply Promo Coupon</h3>
                    <div className="flex gap-2">
                      <input
                        type="text"
                        value={couponInput}
                        onChange={(e) => setCouponInput(e.target.value)}
                        placeholder="Enter WELCOME50"
                        className="flex-1 border border-slate-200 rounded-xl px-3 py-2 text-xs font-bold uppercase"
                      />
                      <button
                        type="button"
                        onClick={handleApplyCoupon}
                        className="px-4 py-2 rounded-xl bg-slate-900 text-white text-xs font-bold"
                      >
                        Apply
                      </button>
                    </div>
                    {couponMessage.text && (
                      <p className={`text-xs font-semibold ${couponMessage.type === 'error' ? 'text-rose-600' : 'text-emerald-600'}`}>
                        {couponMessage.text}
                      </p>
                    )}

                    <div className="border-t border-slate-100 pt-4 space-y-2 text-sm">
                      <div className="flex justify-between text-slate-600">
                        <span>Item Subtotal</span>
                        <span>₹{subtotal}</span>
                      </div>
                      <div className="flex justify-between text-slate-600">
                        <span>Delivery Partner Fee</span>
                        <span>{baseDeliveryFee === 0 ? 'FREE' : `₹${baseDeliveryFee}`}</span>
                      </div>
                      <div className="flex justify-between text-slate-600">
                        <span>GST & Restaurant Taxes (5%)</span>
                        <span>₹{taxes}</span>
                      </div>
                      {discount > 0 && (
                        <div className="flex justify-between text-emerald-600 font-bold">
                          <span>Promo Discount ({appliedCoupon})</span>
                          <span>-₹{discount}</span>
                        </div>
                      )}
                      <div className="flex justify-between text-base font-extrabold text-slate-900 border-t border-slate-200 pt-3">
                        <span>Final Payable Total</span>
                        <span>₹{finalTotal}</span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            )}
          </div>
        )}

        {/* Order Confirmation Screen */}
        {activeTab === 'confirmation' && latestOrder && (
          <div className="max-w-xl mx-auto bg-white rounded-3xl border border-slate-200 p-8 text-center space-y-5 shadow-sm">
            <CheckCircle2 className="w-16 h-16 text-emerald-500 mx-auto" />
            <span className="px-3 py-1 rounded-full bg-emerald-50 text-emerald-700 font-bold text-xs">
              Order ID: {latestOrder.orderId}
            </span>
            <h2 className="text-2xl font-extrabold text-slate-900">Order Confirmed!</h2>
            <p className="text-sm text-slate-600">
              Thank you, <strong>{latestOrder.customerName}</strong>! Your order has been sent to the restaurant kitchen and will arrive at <strong>{latestOrder.deliveryAddress}</strong>.
            </p>
            <div className="bg-slate-50 p-4 rounded-2xl text-left text-xs space-y-1.5 border border-slate-200">
              <div className="flex justify-between font-bold text-slate-800">
                <span>Payment Mode:</span>
                <span>{latestOrder.paymentMethod}</span>
              </div>
              <div className="flex justify-between font-bold text-slate-800">
                <span>Total Amount Paid/Payable:</span>
                <span>₹{latestOrder.finalTotal}</span>
              </div>
            </div>
            <button
              onClick={() => setActiveTab('account')}
              className="w-full py-3 rounded-xl bg-orange-600 text-white font-bold text-sm"
            >
              Track Live Order Status
            </button>
          </div>
        )}

        {/* Customer Account & Live Order Tracking */}
        {activeTab === 'account' && (
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            <div className="bg-white rounded-2xl border border-slate-200 p-6 space-y-4 h-fit">
              <div className="flex items-center gap-3">
                <div className="w-12 h-12 rounded-2xl bg-orange-100 text-orange-600 flex items-center justify-center font-extrabold text-lg">
                  {user.name ? user.name[0] : 'U'}
                </div>
                <div>
                  <h3 className="font-extrabold text-slate-900">{user.name}</h3>
                  <p className="text-xs text-slate-500">{user.email}</p>
                </div>
              </div>
              <div className="space-y-2 pt-2 text-xs">
                <label className="block font-bold text-slate-600">Update Profile Name</label>
                <input
                  type="text"
                  value={user.name}
                  onChange={(e) => setUser({ ...user, name: e.target.value })}
                  className="w-full border border-slate-200 rounded-xl px-3 py-2"
                />
                <label className="block font-bold text-slate-600">Phone Number</label>
                <input
                  type="text"
                  value={user.phone}
                  onChange={(e) => setUser({ ...user, phone: e.target.value })}
                  className="w-full border border-slate-200 rounded-xl px-3 py-2"
                />
                <label className="block font-bold text-slate-600">Saved Address</label>
                <textarea
                  rows="2"
                  value={user.address}
                  onChange={(e) => setUser({ ...user, address: e.target.value })}
                  className="w-full border border-slate-200 rounded-xl px-3 py-2"
                />
              </div>
            </div>

            <div className="lg:col-span-2 space-y-4">
              <h3 className="text-xl font-extrabold text-slate-900">Live Order Tracking & History</h3>
              {orders.length === 0 ? (
                <div className="bg-white rounded-2xl border border-slate-200 p-8 text-center text-slate-500 text-sm">
                  No orders placed yet. Place an order from the menu to test real-time status progression!
                </div>
              ) : (
                orders.map((ord) => (
                  <div key={ord.orderId} className="bg-white rounded-2xl border border-slate-200 p-5 space-y-4">
                    <div className="flex flex-wrap items-center justify-between gap-2 border-b border-slate-100 pb-3">
                      <div>
                        <span className="font-extrabold text-slate-900 text-sm">{ord.orderId}</span>
                        <span className="block text-xs text-slate-400">{ord.createdAt}</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <span className="px-3 py-1 rounded-full bg-orange-50 text-orange-700 font-bold text-xs">
                          Status: {ord.status}
                        </span>
                        {ord.status !== 'Delivered' && (
                          <button
                            onClick={() => advanceOrderStatus(ord.orderId)}
                            className="px-3 py-1 rounded-lg bg-slate-900 text-white text-xs font-bold hover:bg-orange-600 transition"
                          >
                            Simulate Next Stage →
                          </button>
                        )}
                      </div>
                    </div>
                    <div className="grid grid-cols-5 gap-1 text-center text-[11px] font-bold">
                      {['Pending', 'Confirmed', 'Preparing', 'Out for Delivery', 'Delivered'].map((step) => {
                        const stages = ['Pending', 'Confirmed', 'Preparing', 'Out for Delivery', 'Delivered'];
                        const active = stages.indexOf(ord.status) >= stages.indexOf(step);
                        return (
                          <div
                            key={step}
                            className={`py-1.5 rounded-lg ${active ? 'bg-emerald-600 text-white' : 'bg-slate-100 text-slate-400'}`}
                          >
                            {step}
                          </div>
                        );
                      })}
                    </div>
                    <div className="text-xs text-slate-600 flex justify-between pt-1">
                      <span>{ord.items.map((i) => `${i.name} x${i.quantity}`).join(', ')}</span>
                      <span className="font-extrabold text-slate-900">₹{ord.finalTotal}</span>
                    </div>
                  </div>
                ))
              )}
            </div>
          </div>
        )}
      </main>

      {/* Footer */}
      <footer className="bg-slate-900 text-slate-400 py-8 mt-12">
        <div className="max-w-7xl mx-auto px-4 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs">
          <div>
            <p className="font-bold text-white text-sm">FoodieHub – Online Food Ordering System</p>
            <p>Final-Year B.Tech Computer Science & Engineering Full-Stack Project</p>
          </div>
          <div className="flex items-center gap-4">
            <span className="flex items-center gap-1"><Phone className="w-3.5 h-3.5" /> +91 98765 43210</span>
            <span className="flex items-center gap-1"><Mail className="w-3.5 h-3.5" /> support@foodiehub.in</span>
          </div>
        </div>
      </footer>
    </div>
  );
}
