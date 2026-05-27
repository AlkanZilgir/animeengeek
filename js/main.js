
// ============================================
// AnimeEngeek — Main JavaScript
// ============================================

// ---- Navbar scroll effect ----
const nav = document.getElementById('mainNav');
if (nav) {
  window.addEventListener('scroll', () => {
    nav.classList.toggle('scrolled', window.scrollY > 50);
  });
}

// ---- Toast Notifications ----
function showToast(msg, type = 'info', icon = 'bi-info-circle') {
  let container = document.getElementById('toast-container');
  if (!container) {
    container = document.createElement('div');
    container.id = 'toast-container';
    document.body.appendChild(container);
  }
  const toast = document.createElement('div');
  toast.className = `toast-msg ${type}`;
  toast.innerHTML = `<i class="bi ${icon}"></i><span>${msg}</span>`;
  container.appendChild(toast);
  setTimeout(() => { toast.style.opacity = '0'; toast.style.transform = 'translateX(30px)'; toast.style.transition = 'all 0.3s ease'; setTimeout(() => toast.remove(), 300); }, 3000);
}

// ---- Storage Helpers ----
function getCart() { try { return JSON.parse(localStorage.getItem('ag_cart') || '[]'); } catch { return []; } }
function saveCart(c) { localStorage.setItem('ag_cart', JSON.stringify(c)); updateBadges(); }
function getFavs() { try { return JSON.parse(localStorage.getItem('ag_favs') || '[]'); } catch { return []; } }
function saveFavs(f) { localStorage.setItem('ag_favs', JSON.stringify(f)); updateBadges(); }
function getUser() { try { return JSON.parse(localStorage.getItem('ag_user') || 'null'); } catch { return null; } }
function saveUser(u) { localStorage.setItem('ag_user', JSON.stringify(u)); }

// ---- Badge counts ----
function updateBadges() {
  const cart = getCart();
  const favs = getFavs();
  const totalQty = cart.reduce((s, i) => s + i.qty, 0);
  document.querySelectorAll('#cartCount').forEach(el => el.textContent = totalQty);
  document.querySelectorAll('#favCount').forEach(el => el.textContent = favs.length);

  // Update profile icon if logged in
  const user = getUser();
  const profileBtn = document.getElementById('profileBtn');
  if (profileBtn && user) {
    profileBtn.setAttribute('href', 'pages/profile.html');
    profileBtn.setAttribute('title', user.name || 'Profile');
  }
}

// ---- Cart Actions ----
function addToCart(productId) {
  const product = PRODUCTS ? PRODUCTS.find(p => p.id === productId) : null;
  if (!product) return;
  const cart = getCart();
  const existing = cart.find(i => i.id === productId);
  if (existing) { existing.qty++; } else { cart.push({ id: productId, qty: 1 }); }
  saveCart(cart);
  showToast(`${product.name} added to cart!`, 'success', 'bi-bag-check');
}

function removeFromCart(productId) {
  let cart = getCart();
  cart = cart.filter(i => i.id !== productId);
  saveCart(cart);
}

function updateCartQty(productId, qty) {
  const cart = getCart();
  const item = cart.find(i => i.id === productId);
  if (item) {
    item.qty = Math.max(1, qty);
    saveCart(cart);
  }
}

// ---- Favorites ----
function toggleFav(productId) {
  let favs = getFavs();
  if (favs.includes(productId)) {
    favs = favs.filter(id => id !== productId);
    showToast('Removed from favorites', 'info', 'bi-heart');
  } else {
    favs.push(productId);
    const product = PRODUCTS ? PRODUCTS.find(p => p.id === productId) : null;
    showToast(`${product ? product.name : 'Item'} saved!`, 'success', 'bi-heart-fill');
  }
  saveFavs(favs);
}

// ---- Auth ----
function isLoggedIn() { return !!getUser(); }

function logout() {
  localStorage.removeItem('ag_user');
  showToast('Logged out successfully', 'info', 'bi-box-arrow-right');
  setTimeout(() => { window.location.href = window.location.pathname.includes('pages') ? '../index.html' : 'index.html'; }, 1000);
}

// ---- Newsletter Form ----
const nlForm = document.getElementById('newsletterForm');
if (nlForm) {
  nlForm.addEventListener('submit', function(e) {
    e.preventDefault();
    const email = document.getElementById('nlEmail').value.trim();
    const fb = document.getElementById('nlFeedback');
    if (!email || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      fb.textContent = 'Please enter a valid email address.';
      fb.className = 'form-feedback error';
      return;
    }
    fb.textContent = '🎉 You\'re subscribed! Check your inbox.';
    fb.className = 'form-feedback success';
    document.getElementById('nlEmail').value = '';
    setTimeout(() => { fb.textContent = ''; fb.className = 'form-feedback'; }, 4000);
  });
}

// ---- Init ----
document.addEventListener('DOMContentLoaded', () => {
  updateBadges();

  // Smooth scroll for anchor links
  document.querySelectorAll('a[href^="#"]').forEach(a => {
    a.addEventListener('click', e => {
      const target = document.querySelector(a.getAttribute('href'));
      if (target) { e.preventDefault(); target.scrollIntoView({ behavior: 'smooth' }); }
    });
  });

  // Close mobile nav on link click
  document.querySelectorAll('.nav-link').forEach(l => {
    l.addEventListener('click', () => {
      const collapse = document.getElementById('navbarNav');
      if (collapse && collapse.classList.contains('show')) {
        const bsCollapse = bootstrap.Collapse.getInstance(collapse);
        if (bsCollapse) bsCollapse.hide();
      }
    });
  });
});
