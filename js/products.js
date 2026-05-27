
// ============================================
// AnimeEngeek — Products Database
// ============================================

const PRODUCTS = [
  { id: 1, name: "Luffy Skull Keychain", series: "One Piece", type: "Keychain", price: 8.99, emoji: "🏴‍☠️", badge: "new", cat: "onepiece" },
  { id: 2, name: "Survey Corps Badge Pin", series: "Attack on Titan", type: "Pin", price: 5.99, emoji: "⚔️", badge: null, cat: "aot" },
  { id: 3, name: "Akatsuki Ring Set", series: "Naruto", type: "Ring", price: 12.99, emoji: "🌀", badge: "sale", oldPrice: 17.99, cat: "naruto" },
  { id: 4, name: "Dragon Ball Crystal Keychain", series: "Dragon Ball", type: "Keychain", price: 7.99, emoji: "⭐", badge: null, cat: "dragonball" },
  { id: 5, name: "Nezuko Bamboo Necklace", series: "Demon Slayer", type: "Necklace", price: 10.99, emoji: "🌸", badge: "new", cat: "demon" },
  { id: 6, name: "Anime Night T-Shirt", series: "Multi-Series", type: "Apparel", price: 19.99, emoji: "👕", badge: null, cat: "all" },
  { id: 7, name: "Blue Dragonball Keychain", series: "Dragon Ball", type: "Keychain", price: 9.99, emoji: "💙", badge: null, cat: "dragonball" },
  { id: 8, name: "MF Doom Ring", series: "Special Edition", type: "Ring", price: 14.99, emoji: "💍", badge: "sale", oldPrice: 19.99, cat: "all" },
  { id: 9, name: "Blue Lapis Necklace", series: "Anime Inspired", type: "Necklace", price: 13.99, emoji: "💎", badge: null, cat: "all" },
  { id: 10, name: "Kill la Kill Cross Pendant", series: "Kill la Kill", type: "Necklace", price: 11.99, emoji: "✝️", badge: "new", cat: "all" },
  { id: 11, name: "Pressed Flower Earrings", series: "Aesthetic", type: "Earrings", price: 6.99, emoji: "🌺", badge: null, cat: "all" },
  { id: 12, name: "Leather Anime Wallet", series: "Multi-Series", type: "Wallet", price: 22.99, emoji: "👜", badge: null, cat: "all" },
];

function renderProductCard(p) {
  const badgeHtml = p.badge ? `<div class="product-badge ${p.badge}">${p.badge === 'new' ? 'NEW' : 'SALE'}</div>` : '';
  const oldPriceHtml = p.oldPrice ? `<span class="product-price-old">€${p.oldPrice.toFixed(2)}</span>` : '';

  return `
    <div class="col-6 col-md-4 col-lg-3">
      <div class="product-card" data-id="${p.id}">
        <div class="product-img-wrap">
          <div class="product-img-placeholder">${p.emoji}</div>
          ${badgeHtml}
          <button class="product-fav-btn" data-id="${p.id}" title="Add to Favorites" aria-label="Add to Favorites">
            <i class="bi bi-heart"></i>
          </button>
          <div class="product-img-overlay">
            <button class="btn-add-cart" data-id="${p.id}" style="width:auto;padding:10px 20px;">
              <i class="bi bi-bag-plus me-1"></i> Add
            </button>
          </div>
        </div>
        <div class="product-body">
          <div class="product-series">${p.series}</div>
          <div class="product-name">${p.name}</div>
          <div class="product-price">€${p.price.toFixed(2)} ${oldPriceHtml}</div>
        </div>
        <div class="product-footer">
          <button class="btn-add-cart" data-id="${p.id}">
            <i class="bi bi-bag-plus me-1"></i> Add to Cart
          </button>
        </div>
      </div>
    </div>
  `;
}

function bindCartFav() {
  document.querySelectorAll('.btn-add-cart').forEach(btn => {
    btn.addEventListener('click', () => {
      const id = parseInt(btn.dataset.id);
      addToCart(id);
      btn.innerHTML = '<i class="bi bi-check-lg me-1"></i> Added!';
      btn.classList.add('added');
      setTimeout(() => {
        btn.innerHTML = '<i class="bi bi-bag-plus me-1"></i> Add to Cart';
        btn.classList.remove('added');
      }, 1500);
    });
  });

  document.querySelectorAll('.product-fav-btn').forEach(btn => {
    const id = parseInt(btn.dataset.id);
    updateFavBtn(btn, id);
    btn.addEventListener('click', () => {
      toggleFav(id);
      updateFavBtn(btn, id);
    });
  });
}

function updateFavBtn(btn, id) {
  const favs = getFavs();
  if (favs.includes(id)) {
    btn.classList.add('active');
    btn.innerHTML = '<i class="bi bi-heart-fill"></i>';
  } else {
    btn.classList.remove('active');
    btn.innerHTML = '<i class="bi bi-heart"></i>';
  }
}
