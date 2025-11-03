document.addEventListener('DOMContentLoaded', () => {
    // Removed IP copy functionality on the title

    const shopData = {
        nametag: [
            {
                name: 'Common',
                price: '$0.99',
                description: 'Basic nametag with standard features',
                image: '<svg width="80" height="80" viewBox="0 0 80 80" xmlns="http://www.w3.org/2000/svg"><path d="M40 10L10 30v20l30 20 30-20V30L40 10zm0 5l25 15v15L40 60 15 45V30l25-15z" fill="#4CAF50"/></svg>'
            },
            {
                name: 'Prime',
                price: '$2.99',
                description: 'Enhanced nametag with premium features',
                image: '<svg width="80" height="80" viewBox="0 0 80 80" xmlns="http://www.w3.org/2000/svg"><path d="M40 10L10 30v20l30 20 30-20V30L40 10zm0 5l25 15v15L40 60 15 45V30l25-15z" fill="#2196F3"/></svg>'
            },
            {
                name: 'Gold',
                price: '$3.99',
                description: 'Exclusive nametag with golden features',
                image: '<svg width="80" height="80" viewBox="0 0 80 80" xmlns="http://www.w3.org/2000/svg"><path d="M40 10L10 30v20l30 20 30-20V30L40 10zm0 5l25 15v15L40 60 15 45V30l25-15z" fill="#FFD700"/></svg>'
            },
            {
                name: 'Amethyst',
                price: '$4.99',
                description: 'Rare nametag with crystal effects',
                image: '<svg width="80" height="80" viewBox="0 0 80 80" xmlns="http://www.w3.org/2000/svg"><path d="M40 10L10 30v20l30 20 30-20V30L40 10zm0 5l25 15v15L40 60 15 45V30l25-15z" fill="#9C27B0"/></svg>'
            },
            {
                name: 'Crimson',
                price: '$9.99',
                description: 'Unique nametag with crimson glow',
                image: '<svg width="80" height="80" viewBox="0 0 80 80" xmlns="http://www.w3.org/2000/svg"><path d="M40 10L10 30v20l30 20 30-20V30L40 10zm0 5l25 15v15L40 60 15 45V30l25-15z" fill="#D32F2F"/></svg>'
            }
        ],
        effects: [
            {
                name: 'Basic Effects',
                price: '$1.99',
                description: 'Simple visual effects package',
                image: '<svg width="80" height="80" viewBox="0 0 80 80" xmlns="http://www.w3.org/2000/svg"><path d="M40 10l-5 20-20 5 20 5 5 20 5-20 20-5-20-5z" fill="#E91E63"/></svg>'
            },
            {
                name: 'Advanced Effects',
                price: '$3.99',
                description: 'Enhanced visual effects package',
                image: '<svg width="80" height="80" viewBox="0 0 80 80" xmlns="http://www.w3.org/2000/svg"><path d="M40 10l-5 20-20 5 20 5 5 20 5-20 20-5-20-5z" fill="#4CAF50"/></svg>'
            },
            {
                name: 'Premium Effects',
                price: '$5.99',
                description: 'Premium visual effects package',
                image: '<svg width="80" height="80" viewBox="0 0 80 80" xmlns="http://www.w3.org/2000/svg"><path d="M40 10l-5 20-20 5 20 5 5 20 5-20 20-5-20-5z" fill="#FFC107"/></svg>'
            }
        ]
    };

    let currentCategory = 'nametag';

    function initShop() {
        const productsGrid = document.querySelector('.products-grid');
        if (!productsGrid) return; // Exit if we're not on the shop page

        loadProducts(currentCategory);
        document.querySelectorAll('.top-category-btn').forEach(btn => {
            btn.addEventListener('click', () => switchCategory(btn.dataset.category));
        });
    }

    function switchCategory(category) {
        currentCategory = category;
        document.querySelectorAll('.top-category-btn').forEach(btn => {
            btn.classList.toggle('active', btn.dataset.category === category);
        });
        loadProducts(category);
    }

    function loadProducts(category) {
        const productsGrid = document.querySelector('.products-grid');
        if (!productsGrid) return; // Exit if element doesn't exist

        productsGrid.innerHTML = '';
        shopData[category].forEach(product => {
            productsGrid.appendChild(createProductCard(product));
        });
    }

    function createProductCard(product) {
        const card = document.createElement('div');
        card.className = 'product-card';
        card.innerHTML = `
            <div class="product-image">${product.image}</div>
            <h3 class="product-name">${product.name}</h3>
            <div class="product-price">${product.price}</div>
            <p class="product-description">${product.description}</p>
            <button class="buy-button" onclick="buyProduct('${product.name}')">Buy Now</button>
        `;
        return card;
    }

    function buyProduct(productName) {
        const product = [...shopData.nametag, ...shopData.effects].find(p => p.name === productName);
        if (!product) return;

        const modalOverlay = document.createElement('div');
        modalOverlay.className = 'modal-overlay';
        modalOverlay.innerHTML = `
            <div class="purchase-modal">
                <div class="modal-header">
                    <h3 class="modal-title">Purchase Confirmation</h3>
                    <button class="close-modal">&times;</button>
                </div>
                <div class="modal-content">
                    <div class="product-details">
                        <div class="detail-row">
                            <span class="detail-label">Item</span>
                            <span class="detail-value">${product.name}</span>
                        </div>
                        <div class="detail-row">
                            <span class="detail-label">Price</span>
                            <span class="detail-value">${product.price}</span>
                        </div>
                        <div class="detail-row">
                            <span class="detail-label">Type</span>
                            <span class="detail-value">${currentCategory.charAt(0).toUpperCase() + currentCategory.slice(1)}</span>
                        </div>
                        <div class="detail-row">
                            <span class="detail-label">Description</span>
                            <span class="detail-value">${product.description}</span>
                        </div>
                    </div>
                </div>
                <div class="modal-actions">
                    <button class="modal-button cancel-purchase">Cancel</button>
                    <button class="modal-button confirm-purchase">Confirm Purchase</button>
                </div>
            </div>
        `;

        document.body.appendChild(modalOverlay);
        setTimeout(() => modalOverlay.classList.add('active'), 50);

        const closeModal = () => {
            modalOverlay.classList.remove('active');
            setTimeout(() => modalOverlay.remove(), 300);
        };

        modalOverlay.querySelector('.close-modal').addEventListener('click', closeModal);
        modalOverlay.querySelector('.cancel-purchase').addEventListener('click', closeModal);
        modalOverlay.querySelector('.confirm-purchase').addEventListener('click', () => {
            closeModal();
            showNotification(`Successfully purchased ${product.name}!`);
        });

        modalOverlay.addEventListener('click', (e) => {
            if (e.target === modalOverlay) closeModal();
        });
    }

    function showNotification(message) {
        const notification = document.createElement('div');
        notification.className = 'notification';
        notification.style.cssText = `
            position: fixed;
            bottom: 20px;
            right: 20px;
            background: rgba(30, 30, 30, 0.9);
            color: white;
            padding: 15px 25px;
            border-radius: 8px;
            box-shadow: 0 4px 15px rgba(0, 0, 0, 0.2);
            z-index: 1000;
        `;
        notification.textContent = message;
        document.body.appendChild(notification);
        setTimeout(() => {
            notification.remove();
        }, 3000);
    }

    // Initialize shop functionality
    initShop();

    // Make buyProduct function globally available
    window.buyProduct = buyProduct;
});
