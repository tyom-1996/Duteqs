/* ======================================================
   SERGIO DALLINI — Cart Popup (Корзина) Logic
   ====================================================== */

(function () {
    'use strict';

    // ===== CART DATA STORE =====
    let cartItems = [];
    let cartIdCounter = 0;

    // ===== INJECT POPUP HTML =====
    function injectCartPopup() {
        if (document.getElementById('cart-popup')) return;

        const popupHTML = `
    <div class="cart-popup" id="cart-popup">
      <div class="cart-popup__overlay" id="cart-popup-overlay"></div>
      <div class="cart-popup__content">
        <div class="cart-popup__header">
          <h2 class="cart-popup__title">Ваша корзина</h2>
          <button class="cart-popup__close" id="cart-popup-close" aria-label="Закрыть корзину"></button>
        </div>

        <div class="cart-popup__body" id="cart-popup-body">
          <div class="cart-popup__empty" id="cart-popup-empty">Корзина пуста</div>
        </div>

        <div class="cart-popup__total" id="cart-popup-total-wrap" style="display: none;">
          <span class="cart-popup__total-label">Итоговая сумма</span>
          <span class="cart-popup__total-value" id="cart-popup-total-value">0₽</span>
        </div>

        <div class="cart-popup__footer">
          <button class="cart-popup__footer-btn cart-popup__footer-btn--clear" id="cart-popup-clear">
            Очистить (<span id="cart-popup-count">0</span>)
          </button>
          <a href="karzina.html" class="cart-popup__footer-btn cart-popup__footer-btn--go" id="cart-popup-go">
            Перейти в корзину
          </a>
        </div>
      </div>
    </div>`;

        document.body.insertAdjacentHTML('beforeend', popupHTML);
        bindPopupEvents();
    }

    // ===== OPEN / CLOSE =====
    function openCartPopup() {
        const popup = document.getElementById('cart-popup');
        if (popup) {
            popup.classList.add('cart-popup--open');
            document.body.style.overflow = 'hidden';
        }
    }

    function closeCartPopup() {
        const popup = document.getElementById('cart-popup');
        if (popup) {
            popup.classList.remove('cart-popup--open');
            document.body.style.overflow = '';
        }
    }

    // ===== PARSE PRICE STRING TO NUMBER =====
    function parsePrice(priceStr) {
        // Remove everything except digits and dots/commas
        // e.g. "15 000₽" → 15000, "1,500.00₽" → 1500
        const cleaned = priceStr.replace(/[^\d.,]/g, '').replace(',', '.');
        return parseFloat(cleaned) || 0;
    }

    // ===== FORMAT NUMBER AS PRICE STRING =====
    function formatPrice(num) {
        // Format with space as thousands separator: 15000 → "15 000₽"
        return num.toLocaleString('ru-RU', { maximumFractionDigits: 0 }).replace(/,/g, ' ') + '₽';
    }

    // ===== CALCULATE TOTAL =====
    function calculateTotal() {
        let total = 0;
        cartItems.forEach(item => {
            total += parsePrice(item.price) * item.qty;
        });
        const totalValueEl = document.getElementById('cart-popup-total-value');
        if (totalValueEl) {
            totalValueEl.textContent = formatPrice(total);
        }
    }

    // ===== RENDER CART ITEMS =====
    function renderCartItems() {
        const body = document.getElementById('cart-popup-body');
        const emptyMsg = document.getElementById('cart-popup-empty');
        const totalWrap = document.getElementById('cart-popup-total-wrap');
        const countEl = document.getElementById('cart-popup-count');

        if (!body) return;

        // Clear existing items (keep empty message)
        body.querySelectorAll('.cart-popup-item').forEach(el => el.remove());

        if (cartItems.length === 0) {
            emptyMsg.style.display = '';
            totalWrap.style.display = 'none';
        } else {
            emptyMsg.style.display = 'none';
            totalWrap.style.display = '';

            cartItems.forEach(item => {
                const itemHTML = `
        <div class="cart-popup-item" data-cart-id="${item.id}">
          <div class="cart-popup-item__image">
            <img src="${item.image}" alt="${item.name}" />
          </div>
          <div class="cart-popup-item__info">
            <div class="cart-popup-item__name">${item.name}</div>
            <div class="cart-popup-item__material">${item.material}</div>
            <div class="cart-popup-item__size">${item.size}</div>
          </div>
          <div class="cart-popup-item__quantity">
            <button class="cart-popup-item__qty-btn cart-popup-item__qty-btn--minus" data-cart-id="${item.id}" aria-label="Уменьшить">
              <span class="cart-popup-qty-minus"></span>
            </button>
            <span class="cart-popup-item__qty-value">${item.qty}</span>
            <button class="cart-popup-item__qty-btn cart-popup-item__qty-btn--plus" data-cart-id="${item.id}" aria-label="Увеличить">
              <span class="cart-popup-qty-plus"></span>
            </button>
          </div>
          <div class="cart-popup-item__price-group">
            <span class="cart-popup-item__price">${item.price}</span>
            <button class="cart-popup-item__remove" data-cart-id="${item.id}" aria-label="Удалить">
              <span class="cart-popup-remove-icon"></span>
            </button>
          </div>
        </div>`;

                body.insertAdjacentHTML('beforeend', itemHTML);
            });

            // Bind item events
            bindItemEvents();
        }

        // Update count
        countEl.textContent = cartItems.length;

        // Calculate and display total sum
        calculateTotal();
    }

    // ===== BIND ITEM EVENTS =====
    function bindItemEvents() {
        // Minus buttons
        document.querySelectorAll('.cart-popup-item__qty-btn--minus').forEach(btn => {
            btn.addEventListener('click', () => {
                const id = parseInt(btn.getAttribute('data-cart-id'));
                const item = cartItems.find(i => i.id === id);
                if (item && item.qty > 1) {
                    item.qty--;
                    renderCartItems();
                }
            });
        });

        // Plus buttons
        document.querySelectorAll('.cart-popup-item__qty-btn--plus').forEach(btn => {
            btn.addEventListener('click', () => {
                const id = parseInt(btn.getAttribute('data-cart-id'));
                const item = cartItems.find(i => i.id === id);
                if (item) {
                    item.qty++;
                    renderCartItems();
                }
            });
        });

        // Remove buttons
        document.querySelectorAll('.cart-popup-item__remove').forEach(btn => {
            btn.addEventListener('click', () => {
                const id = parseInt(btn.getAttribute('data-cart-id'));
                const itemEl = btn.closest('.cart-popup-item');
                itemEl.style.transition = 'opacity 0.3s, transform 0.3s';
                itemEl.style.opacity = '0';
                itemEl.style.transform = 'translateX(20px)';
                setTimeout(() => {
                    cartItems = cartItems.filter(i => i.id !== id);
                    renderCartItems();
                }, 300);
            });
        });
    }

    // ===== BIND POPUP EVENTS =====
    function bindPopupEvents() {
        const closeBtn = document.getElementById('cart-popup-close');
        const overlay = document.getElementById('cart-popup-overlay');
        const clearBtn = document.getElementById('cart-popup-clear');

        if (closeBtn) closeBtn.addEventListener('click', closeCartPopup);
        if (overlay) overlay.addEventListener('click', closeCartPopup);

        // Escape key
        document.addEventListener('keydown', (e) => {
            if (e.key === 'Escape') {
                const popup = document.getElementById('cart-popup');
                if (popup && popup.classList.contains('cart-popup--open')) {
                    closeCartPopup();
                }
            }
        });

        // Clear all
        if (clearBtn) {
            clearBtn.addEventListener('click', () => {
                cartItems = [];
                renderCartItems();
            });
        }
    }

    // ===== ADD TO CART (called when "В корзину" is clicked) =====
    function addToCart(productCard, btn) {
        // Extract product info from the card
        const imgEl = productCard.querySelector('.product-card__image, img');
        const image = imgEl ? imgEl.src : '';

        // Try to get a product name from alt text or generate one
        const altText = productCard.querySelector('img') ? productCard.querySelector('img').alt : '';
        const name = altText || 'Товар';

        cartIdCounter++;
        const newItem = {
            id: cartIdCounter,
            image: image,
            name: name,
            material: 'Хлопок 100%',
            size: 'Размер: S',
            qty: 1,
            price: '15 000₽'
        };

        cartItems.push(newItem);

        // Visual feedback on button
        btn.textContent = 'Добавлено ✓';
        btn.style.background = '#1a1a1a';
        setTimeout(() => {
            btn.textContent = 'В корзину';
            btn.style.background = '';
        }, 1500);

        // Render and open popup
        renderCartItems();
        openCartPopup();
    }

    // ===== INIT — Wire up "В корзину" buttons =====
    function init() {
        injectCartPopup();

        // Catalog pages: product-card buttons
        document.querySelectorAll('.product-card .btn--solid-dark').forEach(btn => {
            // Remove existing click listeners by cloning
            const newBtn = btn.cloneNode(true);
            btn.parentNode.replaceChild(newBtn, btn);

            newBtn.addEventListener('click', (e) => {
                e.preventDefault();
                const card = newBtn.closest('.product-card');
                if (card) {
                    addToCart(card, newBtn);
                }
            });
        });

        // Single product page: main "В корзину" button (btn--add-to-cart)
        document.querySelectorAll('.btn--add-to-cart').forEach(btn => {
            const newBtn = btn.cloneNode(true);
            btn.parentNode.replaceChild(newBtn, btn);

            newBtn.addEventListener('click', (e) => {
                e.preventDefault();
                const mainImg = document.querySelector('.single-product__image');
                const image = mainImg ? mainImg.src : '';
                const titleEl = document.querySelector('.single-product__title');
                const name = titleEl ? titleEl.textContent.trim() : 'Товар';

                cartIdCounter++;
                cartItems.push({
                    id: cartIdCounter,
                    image: image,
                    name: name,
                    material: 'Хлопок 100%',
                    size: 'Размер: S',
                    qty: 1,
                    price: '15 000₽'
                });

                newBtn.textContent = 'Добавлено ✓';
                newBtn.style.background = '#1a1a1a';
                setTimeout(() => {
                    newBtn.textContent = 'В корзину';
                    newBtn.style.background = '';
                }, 1500);

                renderCartItems();
                openCartPopup();
            });
        });

        // Obrazi single page: look-product cart buttons
        document.querySelectorAll('.look-product__cart-btn').forEach(btn => {
            const newBtn = btn.cloneNode(true);
            btn.parentNode.replaceChild(newBtn, btn);

            newBtn.addEventListener('click', (e) => {
                e.preventDefault();
                const lookProduct = newBtn.closest('.look-product');
                const thumbImg = lookProduct ? lookProduct.querySelector('.look-product__thumb img') : null;
                const image = thumbImg ? thumbImg.src : '';
                const nameEl = lookProduct ? lookProduct.querySelector('.look-product__name') : null;
                const name = nameEl ? nameEl.textContent.trim() : 'Товар';
                const materialEl = lookProduct ? lookProduct.querySelector('.look-product__material') : null;
                const material = materialEl ? materialEl.textContent.trim() : 'Материал';
                const sizeEl = lookProduct ? lookProduct.querySelector('.look-product__size') : null;
                const size = sizeEl ? sizeEl.textContent.trim() : 'Размер';
                const priceEl = lookProduct ? lookProduct.querySelector('.look-product__price') : null;
                const price = priceEl ? priceEl.textContent.trim() : '000₽';

                cartIdCounter++;
                cartItems.push({
                    id: cartIdCounter,
                    image: image,
                    name: name,
                    material: material,
                    size: size,
                    qty: 1,
                    price: price
                });

                newBtn.textContent = 'Добавлено ✓';
                newBtn.style.background = '#1a1a1a';
                setTimeout(() => {
                    newBtn.textContent = 'В корзину';
                    newBtn.style.background = '';
                }, 1500);

                renderCartItems();
                openCartPopup();
            });
        });
    }

    // Run on DOM ready
    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', init);
    } else {
        init();
    }
})();
