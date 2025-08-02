// Shop data with products for each category
const shopData = {
    nametag: [
        {
            name: "Solid",
            price: "$3.99",
            description: "Have access to give your name some color.",
            image: "🏷️",
            icon: "fas fa-tag"
        },
        {
            name: "Multi",
            price: "$7.99",
            description: "Have access to give your name some color.",
            image: "🌈",
            icon: "fas fa-palette"
        },
        {
            name: "Glow",
            price: "$5.99",
            description: "Make your name glow with special effects.",
            image: "✨",
            icon: "fas fa-star"
        },
        {
            name: "Rainbow",
            price: "$9.99",
            description: "Rainbow animated nametag for extra style.",
            image: "🌈",
            icon: "fas fa-rainbow"
        }
    ],
    effects: [
        {
            name: "Fire Trail",
            price: "$4.99",
            description: "Leave a trail of fire behind you.",
            image: "🔥",
            icon: "fas fa-fire"
        },
        {
            name: "Ice Trail",
            price: "$4.99",
            description: "Leave a trail of ice crystals.",
            image: "❄️",
            icon: "fas fa-snowflake"
        },
        {
            name: "Lightning",
            price: "$6.99",
            description: "Lightning effects around your character.",
            image: "⚡",
            icon: "fas fa-bolt"
        },
        {
            name: "Smoke",
            price: "$3.99",
            description: "Smoke particles follow your movement.",
            image: "💨",
            icon: "fas fa-smog"
        }
    ]
};

// Current active category
let currentCategory = 'nametag';

// DOM elements
const categoryButtons = document.querySelectorAll('.top-category-btn');
const categoryTitle = document.querySelector('.category-title');
const productsContainer = document.getElementById('products-container');

// Initialize the shop
function initShop() {
    // Add click event listeners to category buttons
    categoryButtons.forEach(button => {
        button.addEventListener('click', () => {
            const category = button.getAttribute('data-category');
            switchCategory(category);
        });
    });

    // Load initial category
    loadProducts(currentCategory);
}

// Switch between categories
function switchCategory(category) {
    // Update active button
    categoryButtons.forEach(btn => btn.classList.remove('active'));
    document.querySelector(`[data-category="${category}"]`).classList.add('active');

    // Update category title
    categoryTitle.textContent = category.charAt(0).toUpperCase() + category.slice(1);

    // Load products for the selected category
    currentCategory = category;
    loadProducts(category);
}

// Load and display products for a category
function loadProducts(category) {
    const products = shopData[category] || [];
    
    // Clear current products
    productsContainer.innerHTML = '';

    // Create product cards
    products.forEach(product => {
        const productCard = createProductCard(product);
        productsContainer.appendChild(productCard);
    });
}

// Create a product card element
function createProductCard(product) {
    const card = document.createElement('div');
    card.className = 'product-card';
    
    card.innerHTML = `
        <div class="product-image">
            <i class="${product.icon}"></i>
        </div>
        <div class="product-price">${product.price}</div>
        <div class="product-name">${product.name}</div>
        <div class="product-description">${product.description}</div>
        <button class="buy-button" onclick="buyProduct('${product.name}', '${product.price}')">
            Buy
        </button>
    `;

    return card;
}

// Handle product purchase
function buyProduct(productName, price) {
    // Add purchase animation
    const button = event.target;
    const originalText = button.textContent;
    
    button.textContent = 'Purchasing...';
    button.disabled = true;
    
    // Simulate purchase process
    setTimeout(() => {
        button.textContent = 'Purchased!';
        button.style.background = 'linear-gradient(135deg, #00ff88 0%, #00cc6a 100%)';
        
        // Show success message
        showNotification(`Successfully purchased ${productName} for ${price}!`, 'success');
        
        // Reset button after 2 seconds
        setTimeout(() => {
            button.textContent = originalText;
            button.disabled = false;
            button.style.background = 'linear-gradient(135deg, #4b7fff 0%, #6c5ce7 100%)';
        }, 2000);
    }, 1500);
}

// Show notification
function showNotification(message, type = 'info') {
    // Create notification element
    const notification = document.createElement('div');
    notification.className = `notification ${type}`;
    notification.textContent = message;
    
    // Style the notification
    notification.style.cssText = `
        position: fixed;
        top: 100px;
        right: 20px;
        background: ${type === 'success' ? 'linear-gradient(135deg, #00ff88 0%, #00cc6a 100%)' : 'linear-gradient(135deg, #4b7fff 0%, #6c5ce7 100%)'};
        color: white;
        padding: 15px 25px;
        border-radius: 10px;
        font-weight: 600;
        z-index: 1000;
        transform: translateX(400px);
        transition: transform 0.3s ease;
        box-shadow: 0 8px 25px rgba(0, 0, 0, 0.3);
    `;
    
    document.body.appendChild(notification);
    
    // Animate in
    setTimeout(() => {
        notification.style.transform = 'translateX(0)';
    }, 100);
    
    // Remove after 3 seconds
    setTimeout(() => {
        notification.style.transform = 'translateX(400px)';
        setTimeout(() => {
            document.body.removeChild(notification);
        }, 300);
    }, 3000);
}

// Add smooth scrolling to sidebar
function addSmoothScrolling() {
    const sidebar = document.querySelector('.sidebar');
    if (sidebar) {
        sidebar.style.overflowY = 'auto';
        sidebar.style.scrollbarWidth = 'thin';
        sidebar.style.scrollbarColor = 'rgba(255, 255, 255, 0.3) transparent';
    }
}

// Add hover effects to product cards
function addProductCardEffects() {
    document.addEventListener('mouseover', (e) => {
        if (e.target.closest('.product-card')) {
            const card = e.target.closest('.product-card');
            card.style.transform = 'translateY(-5px) scale(1.02)';
        }
    });

    document.addEventListener('mouseout', (e) => {
        if (e.target.closest('.product-card')) {
            const card = e.target.closest('.product-card');
            card.style.transform = 'translateY(0) scale(1)';
        }
    });
}

// Add keyboard navigation
document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') {
        // Close any open modals or menus
        console.log('Escape pressed');
    }
});



// Handle URL hash for direct category navigation
function handleUrlHash() {
    const hash = window.location.hash.substring(1);
    if (hash && (hash === 'nametag' || hash === 'effects')) {
        // Small delay to ensure shop is initialized
        setTimeout(() => {
            switchCategory(hash);
        }, 100);
    }
}

// Initialize everything when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
    initShop();
    addSmoothScrolling();
    addProductCardEffects();
    handleUrlHash();
    
    // Add some sample notifications for demo
    setTimeout(() => {
        showNotification('Welcome to the McHvH Shop!', 'info');
    }, 1000);
});
