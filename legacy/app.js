// ===== STATE & LOCALSTORAGE =====
let currentUser = JSON.parse(localStorage.getItem('sf_user')) || null;
let cartItems = JSON.parse(localStorage.getItem('sf_cart')) || [];
let wishlistItems = JSON.parse(localStorage.getItem('sf_wishlist')) || [];
let orderHistory = JSON.parse(localStorage.getItem('sf_orders')) || [];
const deliveryFee = 50;

// Initialize App
document.addEventListener('DOMContentLoaded', () => {
  updateAuthUI();
  renderCart();
  renderWishlist();
  
  // Start router
  const hash = window.location.hash.replace('#', '') || 'home';
  navigate(hash);
  
  // Hero slider setup
  if(hash === 'home') setTimeout(startAutoSlide, 500);
});

// ===== AUTHENTICATION =====
let isSignUpMode = false;

function openAuthModal() {
  if (currentUser) {
    navigate('account');
    return;
  }
  document.getElementById('authModalOverlay').classList.add('open');
}

function closeAuthModal() {
  document.getElementById('authModalOverlay').classList.remove('open');
}

function toggleAuthMode() {
  isSignUpMode = !isSignUpMode;
  document.getElementById('authTitle').textContent = isSignUpMode ? "Sign Up" : "Login";
  document.getElementById('authSubmitBtn').textContent = isSignUpMode ? "SIGN UP" : "LOGIN";
  document.getElementById('authName').style.display = isSignUpMode ? "block" : "none";
  if(isSignUpMode) document.getElementById('authName').setAttribute('required', 'true');
  else document.getElementById('authName').removeAttribute('required');
  
  document.getElementById('authToggleText').textContent = isSignUpMode ? "Already have an account?" : "Don't have an account?";
  document.getElementById('authToggleLink').textContent = isSignUpMode ? "Login" : "Sign up";
}

function handleAuthSubmit(e) {
  e.preventDefault();
  const email = document.getElementById('authEmail').value;
  
  if (isSignUpMode) {
    const name = document.getElementById('authName').value;
    currentUser = { name, email, id: Date.now() };
  } else {
    // Fake login: just use email prefix as name
    const name = email.split('@')[0];
    currentUser = { name, email, id: Date.now() };
  }
  
  localStorage.setItem('sf_user', JSON.stringify(currentUser));
  updateAuthUI();
  closeAuthModal();
  document.getElementById('authForm').reset();
  alert(`Welcome back, ${currentUser.name}!`);
}

function handleLogout() {
  if(confirm("Are you sure you want to logout?")) {
    currentUser = null;
    localStorage.removeItem('sf_user');
    updateAuthUI();
    navigate('home');
    alert("Logged out successfully.");
  }
}

function updateAuthUI() {
  const nameEl = document.getElementById('sidebarUserName');
  const loginBtn = document.getElementById('sidebarLoginBtn');
  const logoutBtn = document.getElementById('logoutBtn');
  
  if (currentUser) {
    nameEl.textContent = `Hello, ${currentUser.name}`;
    loginBtn.style.display = 'none';
    logoutBtn.style.display = 'flex';
  } else {
    nameEl.textContent = 'Hello, Guest';
    loginBtn.style.display = 'block';
    logoutBtn.style.display = 'none';
  }
}

// ===== SPA ROUTER =====
function navigate(page, param = null) {
  closeSidebar();
  closeInfoModal();
  window.location.hash = param ? `${page}-${param}` : page;
  
  const root = document.getElementById('app-root');
  
  // Clear any timers
  clearInterval(autoSlideInterval);
  
  if (page.startsWith('product-')) {
    param = page.split('-')[1];
    page = 'product';
  }

  switch(page) {
    case 'home':
      root.innerHTML = getHomeHTML();
      renderShopProducts('new_arrivals');
      startAutoSlide();
      break;
    case 'product':
      root.innerHTML = getProductHTML(Number(param));
      window.scrollTo(0, 0);
      break;
    case 'shop':
    case 'new_arrivals':
    case 'best_sellers':
    case 'categories':
      root.innerHTML = getShopHTML();
      renderShopProducts(page === 'categories' ? param : page);
      break;
    case 'account':
    case 'orders':
      if(!currentUser) { openAuthModal(); return; }
      root.innerHTML = getAccountHTML();
      break;
    case 'track':
      root.innerHTML = getTrackHTML();
      break;
    case 'offers':
      root.innerHTML = getOffersHTML();
      break;
    case 'about':
      root.innerHTML = getStaticHTML('About Soul Fit', '<p>Soul Fit is more than an apparel brand; it is a movement. We believe in crafting premium threads that connect souls. Every piece is designed with extreme attention to detail, using the finest fabrics to ensure you feel as good as you look.</p>');
      break;
    case 'faq':
      root.innerHTML = getStaticHTML('Frequently Asked Questions', `
        <h4>Do you offer free shipping?</h4><p style="color: gray; margin-bottom: 16px;">No, we charge a flat nominal fee of ₹50 on all orders to ensure premium delivery.</p>
        <h4>What is the return policy?</h4><p style="color: gray;">We have a 10-day easy return policy for all unworn items with tags attached.</p>
      `);
      break;
    case 'privacy':
    case 'terms':
      root.innerHTML = getStaticHTML(page === 'privacy' ? 'Privacy Policy' : 'Terms & Conditions', '<p>This is a simulated legal document for Soul Fit. All customer data is secured. By using this website, you agree to our premium quality standards and terms of service.</p>');
      break;
    default:
      root.innerHTML = getHomeHTML();
  }
  
  window.scrollTo({ top: 0, behavior: 'smooth' });
}

// ===== VIEW TEMPLATES =====

function getHomeHTML() {
  return `
    <!-- SEARCH -->
    <div class="search-wrap">
      <div class="container">
        <div class="search-bar">
          <span class="search-icon"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" width="18" height="18"><circle cx="11" cy="11" r="8"/><line x1="21" y1="21" x2="16.65" y2="16.65"/></svg></span>
          <input type="text" placeholder="Search for products, categories..." onkeypress="if(event.key === 'Enter') navigate('shop', 'all')" />
        </div>
      </div>
    </div>

    <!-- HERO -->
    <section class="hero-section" id="heroSection">
      <div class="hero-slides" id="heroSlides">
        <div class="hero-slide" style="background: linear-gradient(120deg,#2c2418 0%,#3d3020 100%); cursor: pointer;" onclick="navigate('product', 2)">
          <div class="hero-content hero-content-light">
            <p class="hero-tag">NEW SEASON 2024</p>
            <h1 class="hero-title">Elevate Your<br/>Everyday Style</h1>
            <button class="hero-btn hero-btn-white" onclick="event.stopPropagation(); navigate('shop')">SHOP NOW</button>
          </div>
        </div>
        <div class="hero-slide" style="background: linear-gradient(120deg,#f0ece6 0%,#e0d8ce 100%); cursor: pointer;" onclick="navigate('product', 4)">
          <div class="hero-content">
            <p class="hero-tag">SOUL FIT EXCLUSIVE</p>
            <h1 class="hero-title">Premium Threads<br/>For Real Souls</h1>
            <button class="hero-btn" onclick="event.stopPropagation(); navigate('shop')">SHOP NOW</button>
          </div>
        </div>
      </div>
      <button class="hero-arrow hero-prev" onclick="prevSlide()">&#8249;</button>
      <button class="hero-arrow hero-next" onclick="nextSlide()">&#8250;</button>
    </section>

    <!-- CATEGORIES -->
    <section class="section">
      <div class="container">
        <h2 class="section-title">Category of Clothes</h2>
        <div class="categories-grid">
          <div class="category-card" onclick="navigate('categories', 'T-shirt')">
            <div class="category-img-wrap"><img src="soulfit_category_tshirt_1777394453783.png" class="category-img" /></div>
            <p class="category-name">T-Shirt</p>
          </div>
          <div class="category-card" onclick="navigate('categories', 'Shirt')">
            <div class="category-img-wrap"><img src="soulfit_category_shirt_1777394467745.png" class="category-img" /></div>
            <p class="category-name">Shirt</p>
          </div>
          <div class="category-card" onclick="navigate('categories', 'Pant')">
            <div class="category-img-wrap"><img src="sf_pant.png" class="category-img" /></div>
            <p class="category-name">Pant</p>
          </div>
          <div class="category-card" onclick="navigate('categories', 'Cargo')">
            <div class="category-img-wrap"><img src="soulfit_category_cargo_1777394485440.png" class="category-img" /></div>
            <p class="category-name">Cargo</p>
          </div>
        </div>
      </div>
    </section>

    <!-- FEATURES STRIP -->
    <div class="container" style="margin-bottom: 40px;">
      <div class="features-strip">
        <div class="feature-card feature-card-highlight">
          <div class="feature-icon-wrap">
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" width="24" height="24"><path d="M5 12l5 5L20 7"/></svg>
          </div>
          <div class="feature-text">
            <div class="feature-title">100% Original</div>
            <div class="feature-sub">Guaranteed authentic</div>
          </div>
        </div>
        <div class="feature-divider"></div>
        <div class="feature-card">
          <div class="feature-icon-wrap">
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" width="24" height="24"><circle cx="12" cy="12" r="10"/><path d="M12 8v4l3 3"/></svg>
          </div>
          <div class="feature-text">
            <div class="feature-title">Fast Delivery</div>
            <div class="feature-sub">Within 2-4 days</div>
          </div>
        </div>
        <div class="feature-divider"></div>
        <div class="feature-card">
          <div class="feature-icon-wrap">
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" width="24" height="24"><path d="M3 3h18v18H3z"/><path d="M9 9h6v6H9z"/></svg>
          </div>
          <div class="feature-text">
            <div class="feature-title">Easy Returns</div>
            <div class="feature-sub">10 days return policy</div>
          </div>
        </div>
      </div>
    </div>

    <!-- NEW ARRIVALS -->
    <section class="section" style="padding-top: 0;">
      <div class="container">
        <div class="section-header">
          <h2 class="section-title">New Arrivals</h2>
          <a href="javascript:void(0)" class="view-all" onclick="navigate('new_arrivals')">View All <span style="font-size:18px">›</span></a>
        </div>
        <div class="products-grid" id="shopGrid"></div>
      </div>
    </section>

    <!-- ASSURANCES -->
    <section class="assurances-section">
      <div class="container">
        <div class="assurances-wrap">
          <div class="assurance-item">
            <div class="assurance-icon">
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" width="32" height="32"><path d="M22 11.08V12a10 10 0 11-5.93-9.14"/><polyline points="22 4 12 14.01 9 11.01"/></svg>
            </div>
            <h4 class="assurance-title">Premium Quality</h4>
            <p class="assurance-desc">Every piece is crafted with extreme attention to detail and finest fabrics.</p>
          </div>
          <div class="assurance-divider"></div>
          <div class="assurance-item">
            <div class="assurance-icon">
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" width="32" height="32"><rect x="3" y="11" width="18" height="11" rx="2" ry="2"/><path d="M7 11V7a5 5 0 0110 0v4"/></svg>
            </div>
            <h4 class="assurance-title">Secure Payments</h4>
            <p class="assurance-desc">100% secure payment gateways to ensure your details are always safe.</p>
          </div>
        </div>
      </div>
    </section>
  `;
}

function getShopHTML() {
  return `
    <div class="container" style="padding-top: 30px;">
      <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 24px; flex-wrap: wrap; gap: 16px;">
        <h2 class="section-title" style="margin: 0;">Shop Collection</h2>
        <div style="display: flex; gap: 12px; align-items: center;">
          <input type="text" id="shopSearch" placeholder="Search..." class="input-field" style="width: 200px; padding: 8px 12px;" onkeyup="handleSearch()" />
          <select class="input-field" id="shopSort" style="width: auto; padding: 8px 12px;" onchange="handleSearch()">
            <option value="default">Sort By</option>
            <option value="price-low">Price: Low to High</option>
            <option value="price-high">Price: High to Low</option>
          </select>
        </div>
      </div>
      <div class="categories-grid" style="margin-bottom: 30px; grid-template-columns: repeat(auto-fit, minmax(80px, 1fr));">
        <button class="hero-btn-white" onclick="renderShopProducts('all')" style="padding: 8px; font-size: 13px;">All</button>
        <button class="hero-btn-white" onclick="renderShopProducts('T-shirt')" style="padding: 8px; font-size: 13px;">T-Shirts</button>
        <button class="hero-btn-white" onclick="renderShopProducts('Polo T-Shirts')" style="padding: 8px; font-size: 13px;">Polos</button>
        <button class="hero-btn-white" onclick="renderShopProducts('Shirt')" style="padding: 8px; font-size: 13px;">Shirts</button>
        <button class="hero-btn-white" onclick="renderShopProducts('Printed Shirts')" style="padding: 8px; font-size: 13px;">Printed</button>
        <button class="hero-btn-white" onclick="renderShopProducts('Pant')" style="padding: 8px; font-size: 13px;">Pants</button>
        <button class="hero-btn-white" onclick="renderShopProducts('Track Pants')" style="padding: 8px; font-size: 13px;">Track Pants</button>
        <button class="hero-btn-white" onclick="renderShopProducts('Cargo')" style="padding: 8px; font-size: 13px;">Cargo</button>
      </div>
      <div class="products-grid" id="shopGrid"></div>
    </div>
  `;
}

function getAccountHTML() {
  return `
    <div class="container" style="padding-top: 40px; padding-bottom: 40px;">
      <h2 class="section-title">My Account</h2>
      <div style="background: var(--cream); padding: 24px; border-radius: 12px; margin-bottom: 32px; display: flex; align-items: center; gap: 20px;">
        <div style="width: 60px; height: 60px; background: var(--black); color: var(--white); border-radius: 50%; display: flex; align-items: center; justify-content: center; font-size: 24px;">
          ${currentUser.name.charAt(0).toUpperCase()}
        </div>
        <div>
          <h3 style="margin-bottom: 4px;">${currentUser.name}</h3>
          <p style="color: gray; font-size: 14px;">${currentUser.email}</p>
        </div>
      </div>
      
      <h3 style="font-size: 20px; font-weight: 800; margin-bottom: 16px;">Order History</h3>
      <div id="orderHistoryList">
        ${orderHistory.length === 0 ? '<p style="color: gray;">You have no past orders.</p>' : orderHistory.map(o => `
          <div style="border: 1px solid var(--light-gray); padding: 16px; border-radius: 8px; margin-bottom: 16px;">
            <div style="display: flex; justify-content: space-between; margin-bottom: 8px;">
              <strong>${o.id}</strong>
              <span style="color: ${o.status === 'Delivered' ? '#2e7d32' : '#f57c00'}; font-weight: 600;">${o.status}</span>
            </div>
            <p style="color: gray; font-size: 13px; margin-bottom: 8px;">Date: ${o.date}</p>
            <p style="font-size: 14px; font-weight: 600;">Total: ₹${o.total}</p>
          </div>
        `).join('')}
      </div>
    </div>
  `;
}

function getTrackHTML() {
  return `
    <div class="container" style="padding-top: 40px; max-width: 500px;">
      <h2 class="section-title text-center">Track Your Order</h2>
      <div style="background: var(--cream); padding: 32px; border-radius: 16px;">
        <p style="margin-bottom: 16px; font-size: 14px; color: var(--gray);">Enter your Order ID below to check the current delivery status.</p>
        <input type="text" class="input-field" placeholder="e.g. ORD-123456" id="trackInput" style="margin-bottom: 16px;" />
        <button class="hero-btn w-100" onclick="handleTrackOrder()">TRACK STATUS</button>
        <div id="trackResult" style="margin-top: 20px; display: none; padding: 16px; border: 1px dashed var(--black); border-radius: 8px;"></div>
      </div>
    </div>
  `;
}

function getOffersHTML() {
  return `
    <div class="container" style="padding-top: 40px; max-width: 600px;">
      <h2 class="section-title">Current Offers</h2>
      <div style="background: var(--cream); padding: 24px; border-radius: 12px; margin-bottom: 16px; border: 1px dashed var(--black);">
        <h3 style="margin-bottom: 8px; font-weight: 800; font-size: 20px;">SOUL10</h3>
        <p style="color: var(--gray); font-size: 14px;">Get 10% off on your entire cart subtotal!</p>
      </div>
      <div style="background: var(--cream); padding: 24px; border-radius: 12px; border: 1px dashed var(--black);">
        <h3 style="margin-bottom: 8px; font-weight: 800; font-size: 20px;">FIT200</h3>
        <p style="color: var(--gray); font-size: 14px;">Get a flat ₹200 discount on your order.</p>
      </div>
    </div>
  `;
}

function getStaticHTML(title, content) {
  return `
    <div class="container" style="padding-top: 40px; padding-bottom: 60px; max-width: 800px;">
      <h2 class="section-title">${title}</h2>
      <div style="font-size: 15px; line-height: 1.8; color: var(--black);">
        ${content}
      </div>
    </div>
  `;
}

// ===== SHOP LOGIC =====
let currentFilter = 'all';

function renderShopProducts(filterMode) {
  currentFilter = filterMode || currentFilter;
  let filtered = products;
  
  if(currentFilter === 'new_arrivals') filtered = products.filter(p => p.isNewArrival);
  else if(currentFilter === 'best_sellers') filtered = products.sort((a,b) => b.salesCount - a.salesCount).slice(0,4);
  else if(currentFilter !== 'all') filtered = products.filter(p => p.category === currentFilter || p.subcategory === currentFilter);
  
  const searchQ = document.getElementById('shopSearch')?.value.toLowerCase();
  if(searchQ) filtered = filtered.filter(p => p.name.toLowerCase().includes(searchQ) || p.category.toLowerCase().includes(searchQ) || (p.subcategory && p.subcategory.toLowerCase().includes(searchQ)));
  
  const sort = document.getElementById('shopSort')?.value;
  if(sort === 'price-low') filtered.sort((a,b) => a.price - b.price);
  if(sort === 'price-high') filtered.sort((a,b) => b.price - a.price);

  const grid = document.getElementById('shopGrid');
  if(!grid) return;
  
  if(filtered.length === 0) {
    grid.innerHTML = '<p>No products found.</p>';
    return;
  }
  
  grid.innerHTML = filtered.map(p => {
    const inWishlist = wishlistItems.some(w => w.id === p.id);
    return `
      <div class="product-card" onclick="navigate('product', ${p.id})">
        <div class="product-img-wrap">
          <img src="${p.image}" alt="${p.name}" class="product-img" />
          ${p.comingSoon ? '<div class="product-badge badge-sale" style="background:#555;">COMING SOON</div>' : (p.isNewArrival ? '<div class="product-badge">NEW</div>' : '')}
          <button class="wishlist-btn ${inWishlist ? 'active' : ''}" onclick="event.stopPropagation(); toggleWishlistBtn(${p.id}, this)">
            <svg viewBox="0 0 24 24" fill="${inWishlist ? 'var(--black)' : 'none'}" stroke="currentColor" stroke-width="1.5" width="18" height="18">
              <path d="M20.84 4.61a5.5 5.5 0 00-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 00-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 000-7.78z" />
            </svg>
          </button>
          ${p.comingSoon ? '<div class="product-quick-add" style="background:#888; cursor:not-allowed;" onclick="event.stopPropagation();">COMING SOON</div>' : `<div class="product-quick-add" onclick="event.stopPropagation(); addIdToCart(${p.id})">ADD TO CART</div>`}
        </div>
        <div class="product-info">
          <p class="product-name">${p.name}</p>
          <div class="product-price-row">
            <p class="product-price">₹${p.price}</p>
            <p class="product-mrp">₹${p.mrp}</p>
            <span class="product-discount">${p.discount}</span>
          </div>
          <div class="product-sizes">${p.sizes.map(s => `<span>${s}</span>`).join('')}</div>
        </div>
      </div>
    `;
  }).join('');
}

function handleSearch() {
  renderShopProducts(currentFilter);
}

// ===== WISHLIST & CART LOGIC =====

function toggleWishlistBtn(productId, btn) {
  const p = products.find(x => x.id === productId);
  const exists = wishlistItems.some(w => w.id === productId);
  
  btn.style.transform = 'scale(1.3)';
  setTimeout(() => btn.style.transform = '', 200);
  
  if (exists) {
    wishlistItems = wishlistItems.filter(w => w.id !== productId);
    btn.classList.remove('active');
    btn.querySelector('svg').setAttribute('fill', 'none');
  } else {
    wishlistItems.push(p);
    btn.classList.add('active');
    btn.querySelector('svg').setAttribute('fill', 'var(--black)');
  }
  
  localStorage.setItem('sf_wishlist', JSON.stringify(wishlistItems));
  renderWishlist();
}

function renderWishlist() {
  const container = document.getElementById('wishlistItemsContainer');
  if (wishlistItems.length === 0) {
    container.innerHTML = '<div class="empty-msg">Your wishlist is empty.</div>';
    return;
  }
  container.innerHTML = wishlistItems.map(item => `
    <div class="cart-item">
      <img src="${item.image}" class="cart-item-img" alt="${item.name}">
      <div class="cart-item-info">
        <div class="cart-item-title">${item.name}</div>
        <div class="cart-item-price">₹${item.price}</div>
        <button class="remove-btn" onclick="removeFromWishlist(${item.id})">Remove</button>
      </div>
    </div>
  `).join('');
}

function removeFromWishlist(id) {
  wishlistItems = wishlistItems.filter(item => item.id !== id);
  localStorage.setItem('sf_wishlist', JSON.stringify(wishlistItems));
  renderWishlist();
  if(window.location.hash.includes('shop')) renderShopProducts(currentFilter); // Update heart icons
}

function addIdToCart(id) {
  const p = products.find(x => x.id === id);
  cartItems.push({ ...p, cartId: Date.now() });
  localStorage.setItem('sf_cart', JSON.stringify(cartItems));
  
  const badge = document.getElementById('cartBadge');
  badge.textContent = cartItems.length;
  badge.style.transform = 'scale(1.5)';
  setTimeout(() => badge.style.transform = '', 200);
  
  renderCart();
  openCartSidebar();
}

function renderCart() {
  document.getElementById('cartBadge').textContent = cartItems.length;
  const container = document.getElementById('cartItemsContainer');
  if (cartItems.length === 0) {
    container.innerHTML = '<div class="empty-msg">Your cart is empty.</div>';
    document.getElementById('cartSubtotal').textContent = '₹0';
    document.getElementById('cartTotal').textContent = '₹0';
    return;
  }
  
  let subtotal = 0;
  container.innerHTML = cartItems.map(item => {
    subtotal += item.price;
    return `
      <div class="cart-item">
        <img src="${item.image}" class="cart-item-img" alt="${item.name}">
        <div class="cart-item-info">
          <div class="cart-item-title">${item.name}</div>
          <div class="cart-item-price">₹${item.price}</div>
          <button class="remove-btn" onclick="removeFromCart(${item.cartId})">Remove</button>
        </div>
      </div>
    `;
  }).join('');
  
  document.getElementById('cartSubtotal').textContent = `₹${subtotal}`;
  document.getElementById('cartTotal').textContent = `₹${subtotal + deliveryFee}`;
}

function removeFromCart(cartId) {
  cartItems = cartItems.filter(item => item.cartId !== cartId);
  localStorage.setItem('sf_cart', JSON.stringify(cartItems));
  renderCart();
}

// ===== SIDEBARS =====
function openSidebar() {
  document.getElementById('sidebar').classList.add('open');
  document.getElementById('sidebarOverlay').classList.add('open');
  document.body.style.overflow = 'hidden';
}
function closeSidebar() {
  document.getElementById('sidebar').classList.remove('open');
  document.getElementById('sidebarOverlay').classList.remove('open');
  document.body.style.overflow = '';
}
function openWishlistSidebar() {
  closeSidebar();
  document.getElementById('wishlistSidebar').classList.add('open');
  document.getElementById('sidebarOverlay').classList.add('open');
}
function closeWishlistSidebar() {
  document.getElementById('wishlistSidebar').classList.remove('open');
  document.getElementById('sidebarOverlay').classList.remove('open');
}
function openCartSidebar() {
  closeWishlistSidebar();
  closeSidebar();
  document.getElementById('cartSidebar').classList.add('open');
  document.getElementById('sidebarOverlay').classList.add('open');
}
function closeCartSidebar() {
  document.getElementById('cartSidebar').classList.remove('open');
  document.getElementById('sidebarOverlay').classList.remove('open');
}
function openChatSidebar() {
  closeSidebar();
  document.getElementById('chatSidebar').classList.add('open');
  document.getElementById('sidebarOverlay').classList.add('open');
}
function closeChatSidebar() {
  document.getElementById('chatSidebar').classList.remove('open');
  document.getElementById('sidebarOverlay').classList.remove('open');
}

document.getElementById('sidebarOverlay').addEventListener('click', () => {
  closeSidebar(); closeWishlistSidebar(); closeCartSidebar(); closeChatSidebar(); closeInfoModal();
});

// ===== HERO SLIDER =====
let currentSlide = 0;
const totalSlides = 2; // Reduced to 2 slides in the new template
let autoSlideInterval;

function updateSlider() {
  const slides = document.getElementById('heroSlides');
  if(!slides) return;
  slides.style.transform = `translateX(-${currentSlide * 100}%)`;
}
function nextSlide() { currentSlide = (currentSlide + 1) % totalSlides; updateSlider(); resetAutoSlide(); }
function prevSlide() { currentSlide = (currentSlide - 1 + totalSlides) % totalSlides; updateSlider(); resetAutoSlide(); }
function startAutoSlide() { autoSlideInterval = setInterval(nextSlide, 3500); }
function resetAutoSlide() { clearInterval(autoSlideInterval); startAutoSlide(); }

// ===== CHECKOUT FLOW =====
let discount = 0;
let finalTotal = 0;
let timerInterval;

function openCheckout() {
  if (cartItems.length === 0) return alert("Your cart is empty!");
  if (!currentUser) {
    alert("Please log in to checkout.");
    openAuthModal();
    return;
  }
  closeCartSidebar();
  
  let subtotal = cartItems.reduce((sum, item) => sum + item.price, 0);
  finalTotal = subtotal + deliveryFee - discount;
  document.getElementById('finalCheckoutAmount').textContent = `₹${finalTotal}`;
  
  document.getElementById('checkoutModal').classList.add('open');
  showStep(1);
}

function closeCheckout() {
  document.getElementById('checkoutModal').classList.remove('open');
  clearInterval(timerInterval);
}

function closeCheckoutAndReset() {
  closeCheckout();
  cartItems = [];
  localStorage.setItem('sf_cart', JSON.stringify([]));
  renderCart();
  document.getElementById('addressForm').reset();
  discount = 0;
  document.getElementById('couponMsg').textContent = '';
  document.getElementById('couponCode').value = '';
}

function showStep(stepNum) {
  document.querySelectorAll('.checkout-step').forEach(el => el.classList.remove('active'));
  document.getElementById('step' + stepNum).classList.add('active');
}

function applyCoupon() {
  const code = document.getElementById('couponCode').value.toUpperCase();
  const msgEl = document.getElementById('couponMsg');
  let subtotal = cartItems.reduce((sum, item) => sum + item.price, 0);
  
  if (code === 'SOUL10') {
    discount = Math.round(subtotal * 0.1);
    msgEl.textContent = `Applied! 10% off (₹${discount} saved)`;
    msgEl.className = 'coupon-msg';
  } else if (code === 'FIT200') {
    discount = 200;
    msgEl.textContent = `Applied! Flat ₹200 off`;
    msgEl.className = 'coupon-msg';
  } else {
    discount = 0;
    msgEl.textContent = 'Invalid Coupon Code';
    msgEl.className = 'coupon-msg error';
  }
  
  finalTotal = subtotal + deliveryFee - discount;
  document.getElementById('finalCheckoutAmount').textContent = `₹${finalTotal}`;
}

function proceedToPayment(e) {
  e.preventDefault();
  showStep(2);
  togglePaymentView();
}

function togglePaymentView() {
  const method = document.querySelector('input[name="paymentMethod"]:checked').value;
  document.getElementById('upiView').classList.remove('active');
  document.getElementById('qrView').classList.remove('active');
  clearInterval(timerInterval);
  
  if (method === 'upi') {
    document.getElementById('upiView').classList.add('active');
  } else {
    document.getElementById('qrView').classList.add('active');
    startTimer(5 * 60, document.getElementById('qrTimer'));
  }
}

function startTimer(duration, display) {
  let timer = duration, minutes, seconds;
  timerInterval = setInterval(function () {
    minutes = parseInt(timer / 60, 10);
    seconds = parseInt(timer % 60, 10);
    minutes = minutes < 10 ? "0" + minutes : minutes;
    seconds = seconds < 10 ? "0" + seconds : seconds;
    display.textContent = minutes + ":" + seconds;
    if (--timer < 0) {
      clearInterval(timerInterval);
      display.textContent = "EXPIRED";
    }
  }, 1000);
}

function placeOrder() {
  clearInterval(timerInterval);
  const randomId = 'ORD-' + Math.floor(100000 + Math.random() * 900000);
  document.getElementById('orderIdDisplay').textContent = randomId;
  
  // Save to dummy order history
  const newOrder = {
    id: randomId,
    status: Math.random() > 0.5 ? 'Processing' : 'Delivered',
    date: new Date().toLocaleDateString(),
    total: finalTotal,
    items: [...cartItems]
  };
  orderHistory.unshift(newOrder);
  localStorage.setItem('sf_orders', JSON.stringify(orderHistory));
  
  showStep(3);
}

function handleTrackOrder() {
  const id = document.getElementById('trackInput').value.trim();
  const res = document.getElementById('trackResult');
  if(!id) return;
  
  const found = orderHistory.find(o => o.id === id);
  res.style.display = 'block';
  
  if (found) {
    res.innerHTML = `
      <strong>Order Found: ${found.id}</strong><br>
      Status: <span style="color: ${found.status === 'Delivered' ? '#2e7d32' : '#f57c00'}">${found.status}</span><br>
      Placed on: ${found.date}
    `;
  } else {
    res.innerHTML = `<span style="color: #d32f2f;">Order not found. Please check your Order ID.</span>`;
  }
}

// ===== HEADER SHADOW =====
window.addEventListener('scroll', () => {
  const header = document.getElementById('mainHeader');
  if(header) header.style.boxShadow = window.scrollY > 10 ? '0 2px 12px rgba(0,0,0,0.1)' : 'none';
}, { passive: true });

// ===== AI CHATBOT =====
function handleChatKeyPress(e) { if (e.key === 'Enter') sendChatMessage(); }

function sendChatMessage() {
  const inputEl = document.getElementById('chatInput');
  const msgText = inputEl.value.trim();
  if (!msgText) return;

  const chatMessages = document.getElementById('chatMessages');
  const userDiv = document.createElement('div');
  userDiv.className = 'chat-msg user-msg';
  userDiv.textContent = msgText;
  chatMessages.appendChild(userDiv);
  inputEl.value = '';

  const typingId = 'typing-' + Date.now();
  const typingDiv = document.createElement('div');
  typingDiv.className = 'chat-msg bot-msg typing-indicator';
  typingDiv.id = typingId;
  typingDiv.textContent = 'Typing...';
  chatMessages.appendChild(typingDiv);
  chatMessages.scrollTop = chatMessages.scrollHeight;

  setTimeout(() => {
    document.getElementById(typingId)?.remove();
    let text = msgText.toLowerCase();
    let response = "That's interesting! I am currently a simulated AI assistant. I can help with returns, shipping, or discounts. Ask away!";
    if (text.includes('hi') || text.includes('hello')) response = "Hello there! How can I help you today?";
    if (text.includes('return')) response = "We have a 10-day hassle-free return policy.";
    if (text.includes('shipping')) response = "Fast delivery in 2-4 days for ₹50.";
    if (text.includes('discount')) response = "Use code SOUL10 for 10% off!";
    
    const botDiv = document.createElement('div');
    botDiv.className = 'chat-msg bot-msg';
    botDiv.textContent = response;
    chatMessages.appendChild(botDiv);
    chatMessages.scrollTop = chatMessages.scrollHeight;
  }, 1000);
}

// Legacy fallback to prevent crashes if old index references it
function closeInfoModal() {
  const m = document.getElementById('infoModalOverlay');
  if(m) m.classList.remove('open');
}

// ===== PRODUCT DETAILS PAGE (PDP) =====
function getProductHTML(productId) {
  const p = products.find(x => x.id === productId);
  if (!p) return '<div class="container" style="padding: 60px 0; text-align: center;"><h2>Product not found</h2><button class="hero-btn mt-3" onclick="navigate(\'shop\')">Return to Shop</button></div>';
  
  const inWishlist = wishlistItems.some(w => w.id === p.id);
  
  // Recommended products (same category, excluding current)
  const recommended = products.filter(x => x.category === p.category && x.id !== p.id).slice(0, 4);
  const recGridHTML = recommended.map(r => {
    return `
      <div class="product-card" onclick="navigate('product', ${r.id})">
        <div class="product-img-wrap">
          <img src="${r.image}" alt="${r.name}" class="product-img" />
          ${r.comingSoon ? '<div class="product-badge badge-sale" style="background:#555;">COMING SOON</div>' : ''}
        </div>
        <div class="product-info">
          <p class="product-name">${r.name}</p>
          <p class="product-price">₹${r.price}</p>
        </div>
      </div>
    `;
  }).join('');

  return `
    <div class="container" style="padding: 40px 24px;">
      <div class="pdp-layout">
        <!-- Gallery -->
        <div class="pdp-gallery">
          <div class="pdp-main-img-wrap">
            <img src="${p.image}" alt="${p.name}" class="pdp-main-img" id="pdpMainImg" />
          </div>
          <div class="pdp-thumbs">
            ${p.images.map((img, i) => `
              <img src="${img}" alt="${p.name} angle ${i+1}" class="pdp-thumb ${i===0?'active':''}" onclick="document.getElementById('pdpMainImg').src='${img}'; document.querySelectorAll('.pdp-thumb').forEach(t=>t.classList.remove('active')); this.classList.add('active');" />
            `).join('')}
          </div>
        </div>
        
        <!-- Details -->
        <div class="pdp-details">
          <p class="pdp-category">${p.subcategory || p.category}</p>
          <h1 class="pdp-title">${p.name}</h1>
          <div class="product-price-row pdp-price-row">
            <p class="product-price" style="font-size:24px;">₹${p.price}</p>
            <p class="product-mrp" style="font-size:16px;">₹${p.mrp}</p>
            <span class="product-discount">${p.discount}</span>
          </div>
          <p class="pdp-desc">${p.description}</p>
          
          <div class="pdp-sizes">
            <h4 style="margin-bottom:12px; font-size:14px;">Select Size:</h4>
            <div class="product-sizes" style="gap:10px;">
              ${p.sizes.map(s => `<span class="pdp-size-btn" onclick="document.querySelectorAll('.pdp-size-btn').forEach(b=>b.classList.remove('active')); this.classList.add('active');">${s}</span>`).join('')}
            </div>
          </div>
          
          <div class="pdp-actions">
            ${p.comingSoon ? 
              `<button class="hero-btn pdp-btn" style="background:#888; cursor:not-allowed; width: 100%;">COMING SOON</button>` : 
              `<button class="hero-btn pdp-btn" onclick="addIdToCart(${p.id})" style="flex:1;">ADD TO CART</button>`
            }
            <button class="wishlist-btn pdp-wishlist-btn ${inWishlist ? 'active' : ''}" onclick="toggleWishlistBtn(${p.id}, this)" style="position:static; width: 52px; height: 52px; flex-shrink:0;">
              <svg viewBox="0 0 24 24" fill="${inWishlist ? 'var(--black)' : 'none'}" stroke="currentColor" stroke-width="1.5" width="22" height="22">
                <path d="M20.84 4.61a5.5 5.5 0 00-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 00-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 000-7.78z" />
              </svg>
            </button>
          </div>
          
          <div class="pdp-perks">
            <div class="pdp-perk"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" width="20" height="20"><path d="M5 12l5 5L20 7"/></svg> 100% Original</div>
            <div class="pdp-perk"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" width="20" height="20"><circle cx="12" cy="12" r="10"/><path d="M12 8v4l3 3"/></svg> Fast Delivery</div>
          </div>
        </div>
      </div>
      
      ${recGridHTML ? `
      <div class="pdp-recommended" style="margin-top: 60px; border-top: 1px solid var(--light-gray); padding-top: 40px;">
        <h3 class="section-title">Recommended For You</h3>
        <div class="products-grid">
          ${recGridHTML}
        </div>
      </div>
      ` : ''}
    </div>
  `;
}
