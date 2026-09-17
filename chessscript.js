
const products = [
    {
        id: 1,
        name: "Wooden Staunton Chess Set",
        price: 49.99,
        image: "https://images.unsplash.com/photo-1586165368502-1bad197a6461?auto=format&fit=crop&w=500&q=80"
    },
    {
        id: 2,
        name: "Tournament Folding Vinyl Set",
        price: 24.99,
        image: "https://images.unsplash.com/photo-1560174038-da43f74f4d36?auto=format&fit=crop&w=500&q=80"
    },
    {
        id: 3,
        name: "Luxury Marble Chess Board",
        price: 120.00,
        image: "https://images.unsplash.com/photo-1610882645166-1ab98bc94a33?auto=format&fit=crop&w=500&q=80"
    },
    {
        id: 4,
        name: "Electronic Digital Chess Clock",
        price: 35.50,
        image: "https://images.unsplash.com/photo-1529699211952-734e80c4d42b?auto=format&fit=crop&w=500&q=80"
    }
];

let cart = [];

const productGrid = document.getElementById("product-grid");
const cartBtn = document.getElementById("cart-btn");
const cartModal = document.getElementById("cart-modal");
const closeBtn = document.querySelector(".close-btn");
const cartItemsContainer = document.getElementById("cart-items");
const cartCount = document.getElementById("cart-count");
const cartTotalPrice = document.getElementById("cart-total-price");
const checkoutBtn = document.getElementById("checkout-btn");


function displayProducts() {
    productGrid.innerHTML = products.map(product => `
        <div class="product-card">
            <img src="${product.image}" alt="${product.name}">
            <div class="product-info">
                <h3>${product.name}</h3>
                <p>$${product.price.toFixed(2)}</p>
                <button class="btn" onclick="addToCart(${product.id})">Add to Cart</button>
            </div>
        </div>
    `).join("");
}


function addToCart(productId) {
    const product = products.find(p => p.id === productId);
    const cartItem = cart.find(item => item.id === productId);

    if (cartItem) {
        cartItem.quantity += 1;
    } else {
        cart.push({ ...product, quantity: 1 });
    }
    updateCart();
    alert(`${product.name} has been added to your cart!`);
}

function updateCart() {
    cartCount.innerText = cart.reduce((total, item) => total + item.quantity, 0);
    
    if (cart.length === 0) {
        cartItemsContainer.innerHTML = "<p>Your cart is empty.</p>";
        cartTotalPrice.innerText = "0.00";
        return;
    }

    cartItemsContainer.innerHTML = cart.map(item => `
        <div class="cart-item">
            <div>
                <h4>${item.name}</h4>
                <small>$${item.price.toFixed(2)} x ${item.quantity}</small>
            </div>
            <button class="btn" style="background:#ff4d4d; color:white; padding: 0.3rem 0.6rem;" onclick="removeFromCart(${item.id})">X</button>
        </div>
    `).join("");

    const total = cart.reduce((sum, item) => sum + (item.price * item.quantity), 0);
    cartTotalPrice.innerText = total.toFixed(2);
}

function removeFromCart(productId) {
    cart = cart.filter(item => item.id !== productId);
    updateCart();
}

cartBtn.addEventListener("click", () => {
    cartModal.style.display = "block";
});

closeBtn.addEventListener("click", () => {
    cartModal.style.display = "none";
});

window.addEventListener("click", (e) => {
    if (e.target === cartModal) {
        cartModal.style.display = "none";
    }
});


checkoutBtn.addEventListener("click", () => {
    if (cart.length === 0) {
        alert("Your cart is empty!");
        return;
    }
    alert("Thank you for your order! Your purchase was successful.");
    cart = [];
    updateCart();
    cartModal.style.display = "none";
});


displayProducts();