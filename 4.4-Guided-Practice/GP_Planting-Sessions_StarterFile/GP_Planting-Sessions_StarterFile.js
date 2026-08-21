/*
    Author: Daryl Hymel - darhym6254
    Date: 8/19/2026
    Purpose: 4.4 Guided Practice - Planting Sessions. Renders plant cards,
    manages a shopping cart, and saves the cart in session storage.
*/

/* =========================================
     GLOBAL VARIABLES
========================================= */

// STEP 2

// Plant Data
const plants = [

    {
        id: 1,
        name: "Monstera Deliciosa",
        description: "Large tropical leaves perfect for bright interiors.",
        price: 34.99,
        image: "images/monsteradeliciosa.png",
        alt: "Monstera Deliciosa",
        sun: "☀️"
    },

    {
        id: 2,
        name: "Snake Plant",
        description: "Low-maintenance plant with upright leaves.",
        price: 14.99,
        image: "images/snakeplant.png",
        alt: "Snake Plant",
        sun: "🌙"
    },

    {
        id: 3,
        name: "Bird of Paradise",
        description: "Bold tropical foliage with dramatic appearance.",
        price: 49.99,
        image: "images/paradiseplant.png",
        alt: "Paradise Plant",
        sun: "🌤"
    },

    {
        id: 4,
        name: "Peace Lily",
        description: "Elegant indoor plant with beautiful white blooms.",
        price: 29.99,
        image: "images/peacelily.png",
        alt: "Peace Lily",
        sun: "🌤"
    },

    {
        id: 5,
        name: "Monstera Adansonii",
        description: "Trailing vine with unique hole-filled leaves.",
        price: 24.99,
        image: "images/monsteradeliciosa.png",
        alt: "Monstera Adansonii",
        sun: "🌤"
    },

    {
        id: 6,
        name: "Sansevieria Laurentii",
        description: "Striped snake plant that thrives on neglect.",
        price: 19.99,
        image: "images/snakeplant.png",
        alt: "Sansevieria Laurentii",
        sun: "🌙"
    },

    {
        id: 7,
        name: "White Bird of Paradise",
        description: "Tall statement plant with wide fan-like leaves.",
        price: 54.99,
        image: "images/paradiseplant.png",
        alt: "White Bird of Paradise",
        sun: "☀️"
    }
];

// DOM References

// STEP 3
const plantGrid = document.getElementById("plant-grid");
const cartPanel = document.getElementById("cart-panel");
const cartToggle = document.getElementById("cart-toggle");
const collapseCart = document.getElementById("collapse-cart");
const cartItems = document.getElementById("cart-items");
const cartTotal = document.getElementById("cart-total");
const checkoutBtn = document.getElementById("checkout-btn");

/* =========================================
   SESSION STORAGE
========================================= */
// Retrieve cart data from session storage
// If no cart exists yet, create an empty array instead.

// STEP 4
let cart = JSON.parse(sessionStorage.getItem("plantCart")) || [];


/* =========================================
   RENDER PLANTS
========================================= */

// STEP 5
function renderPlants() {
    // Clear existing content before rendering.
    plantGrid.innerHTML = "";

    // Loop through every plant object
    plants.forEach((plant) => {

        // Create a new article element for each plant card
        const card = document.createElement("article");
        card.classList.add("plant-card");

        card.innerHTML = `
            <div class="image-container">
                <img src="${plant.image}" alt="${plant.alt}"/>
                <div class="sun-level" aria-label="Sunlight level">
                    ${plant.sun}
                </div>
            </div>
            <div class="card-content">
                <h3>${plant.name}</h3>
                <p>${plant.description}</p>
                <p class="price">$${plant.price.toFixed(2)}</p>
                <button class="add-btn" data-id="${plant.id}">
                    Add to Cart
                </button>
            </div>
        `;

        // Append the plant card to the page
        plantGrid.appendChild(card);
    });
}


/* =========================================
   SAVE CART
========================================= */

// STEP 6
function saveCart() {
    // Save current cart array into session storage
    sessionStorage.setItem("plantCart", JSON.stringify(cart));
}


/* =========================================
   ADD TO CART
========================================= */

// STEP 7
function addToCart(id) {
    // Locate selected plant object.
    const plant = plants.find((item) => item.id === id);

    // Check if item already exists in cart.
    const existingItem = cart.find((item) => item.id === id);

    if (existingItem) {
        // If exists, update quantity
        existingItem.quantity++;
    } else {
        // Otherwise, add a new object to the cart
        cart.push({...plant, quantity: 1});
    }

    // Save updates and refresh cart UI
    saveCart();
    renderCart();
    animateCartButton();
}


/* =========================================
  UPDATE QUANTITY
========================================= */

// STEP 8
function updateQuantity(id, change) {
    // Find matching cart item.
    const item = cart.find((product) => product.id === id);

    // Exit function early if item is missing
    if (!item) return;

    // Update item quantity
    item.quantity += change;

    // Remove item if quantity reaches zero
    if (item.quantity <= 0) {
        cart = cart.filter((product) => product.id !== id);
    }

    // Save changes and update cart UI
    saveCart();
    renderCart();
}


/* =========================================
   RENDER CART
========================================= */

// STEP 9
function renderCart() {
    // If cart is empty
    if (cart.length === 0) {
        cartItems.innerHTML = "<p>Your cart is empty.</p>";
        cartTotal.textContent = "Total: $0.00";
        return;
    }

    // Clear previous cart content
    cartItems.innerHTML = "";
    let total = 0;

    // Loop through all items in the cart
    cart.forEach((item) => {
        // Calculate running total
        total += item.price * item.quantity;

        // Create cart item element
        const cartItem = document.createElement("article");
        cartItem.classList.add("cart-item");

        cartItem.innerHTML = `
            <h3>${item.name}</h3>
            <p>Price: $${(item.price * item.quantity).toFixed(2)}</p>
            <div class="quantity-controls">
                <button class="quantity-btn decrease-btn" data-id="${item.id}">
                    -
                </button>
                <span>${item.quantity}</span>
                <button class="quantity-btn increase-btn" data-id="${item.id}">
                    +
                </button>
            </div>
        `;

        // Add item to cart panel
        cartItems.appendChild(cartItem);
    });

    // Display updated cart total
    cartTotal.textContent = `Total: $${total.toFixed(2)}`;
}


/* =========================================
   TOGGLE CART
========================================= */
function toggleCart() {

    // Toggle open state of cart
    cartPanel.classList.toggle("open");

    // Change arrow direction
    if (cartPanel.classList.contains("open")) {
        collapseCart.innerHTML = "❯";
    } else {
        collapseCart.innerHTML = "❮";
    }
}

// Open/Close Main cart button
cartToggle.addEventListener("click", () => { toggleCart(); });

// Open/Close Side arrow button
collapseCart.addEventListener("click", () => { toggleCart(); });


/* =========================================
   CLICK EVENTS
========================================= */

// STEP 10
document.addEventListener("click", (event) => {
    // ADD TO CART
    if (event.target.classList.contains("add-btn")) {
        const id = Number(event.target.dataset.id);
        addToCart(id);
    }

    // INCREASE QUANTITY
    if (event.target.classList.contains("increase-btn")) {
        const id = Number(event.target.dataset.id);
        updateQuantity(id, 1);
    }

    // DECREASE QUANTITY
    if (event.target.classList.contains("decrease-btn")) {
        const id = Number(event.target.dataset.id);
        updateQuantity(id, -1);
    }
});


/* =========================================
   CHECKOUT
========================================= */

// STEP 11
checkoutBtn.addEventListener("click", () => {
    // Prevent checkout if cart is empty
    if (cart.length === 0) {
        alert("Your cart is empty.");
        return;
    }

    // Calculate total price and pop alert for checkout
    let total = 0;

    cart.forEach((item) => {
        total += item.price * item.quantity;
    });

    alert(`Confirm Purchase\n\nTotal: $${total.toFixed(2)}`);
});


/* =========================================
   CART BUTTON ANIMATION
========================================= */
function animateCartButton() {
    cartToggle.classList.add("bounce");
    setTimeout(() => { cartToggle.classList.remove("bounce"); }, 500);
}

/* =========================================
   INITIALIZE
========================================= */

// Set initial arrow direction and load product & cart data
collapseCart.innerHTML = "❮";
renderPlants();
renderCart();