/*
    Author: Daryl Hymel
    Date: 08/23/2026
    Purpose: 4.6 Performance Assessment - Storage Central. Runs the Willow &
             Pine Crafts storefront. Displays six handmade products, manages
             the shopping cart with quantities, tracks stock, and stores data
             three ways: localStorage keeps the cart and inventory,
             sessionStorage counts items added this session, and a cookie
             remembers the last purchase for the welcome message.
*/

/* =========================================
    PRODUCT DATA
========================================= */

const defaultProducts = [
    {
        id: 1,
        name: "Hand-Carved Bookmark",
        description: "Smooth wooden bookmark carved from reclaimed oak.",
        price: 8.50,
        stock: 6,
        image: "images/bookmark.png",
        alt: "Hand-carved wooden bookmark"
    },
    {
        id: 2,
        name: "Lavender Soy Candle",
        description: "Hand-poured soy candle with a calming lavender scent.",
        price: 14.00,
        stock: 5,
        image: "images/candle.png",
        alt: "Lavender soy candle in a glass jar"
    },
    {
        id: 3,
        name: "Cork Coaster Set",
        description: "Set of four natural cork coasters with pressed leaves.",
        price: 12.25,
        stock: 4,
        image: "images/coasters.png",
        alt: "Set of natural cork coasters"
    },
    {
        id: 4,
        name: "Macrame Wall Hanging",
        description: "Hand-knotted macrame hanging made with organic cotton.",
        price: 32.00,
        stock: 2,
        image: "images/macrame.png",
        alt: "Macrame wall hanging with knotted cotton cords"
    },
    {
        id: 5,
        name: "Speckled Ceramic Mug",
        description: "Wheel-thrown stoneware mug with a speckled glaze.",
        price: 18.75,
        stock: 3,
        image: "images/mug.png",
        alt: "Speckled ceramic coffee mug"
    },
    {
        id: 6,
        name: "Chunky Knit Scarf",
        description: "Extra soft hand-knit scarf in warm autumn tones.",
        price: 26.50,
        stock: 1,
        image: "images/scarf.png",
        alt: "Chunky hand-knit scarf"
    }
];

/* =========================================
    BROWSER STORAGE SETUP
    ---------------------------------------
    localStorage   - cart contents and product stock
    sessionStorage - items added during this session
    cookie         - products from the last purchase
========================================= */

let products = JSON.parse(localStorage.getItem("products")) || defaultProducts;
let cart = JSON.parse(localStorage.getItem("cart")) || [];
let sessionAdds = Number(sessionStorage.getItem("sessionAdds")) || 0;

/* =========================================
    DOM REFERENCES
========================================= */

const productGrid = document.getElementById("product-grid");
const cartItems = document.getElementById("cart-items");
const cartCount = document.getElementById("cart-count");
const cartTotal = document.getElementById("cart-total");
const sessionCount = document.getElementById("session-count");
const welcomeMessage = document.getElementById("welcome-message");
const notification = document.getElementById("notification");
const clearCartButton = document.getElementById("clear-cart");
const checkoutButton = document.getElementById("checkout");

/* =========================================
    CREATE TOOLTIP ELEMENT
========================================= */

const tooltip = document.createElement("div");
tooltip.classList.add("mouse-tooltip");
tooltip.textContent = "Out of Stock";
document.body.appendChild(tooltip);

/* =========================================
    COOKIE HELPERS
========================================= */

// Save the last purchase in a cookie that lasts one week
function setLastPurchasedCookie(names) {
    document.cookie = `lastPurchased=${encodeURIComponent(names)}; path=/; max-age=604800`;
}

// Find and return the lastPurchased cookie value, or null if not set
function getLastPurchasedCookie() {
    const cookies = document.cookie.split(";");

    for (const cookie of cookies) {
        const trimmedCookie = cookie.trim();

        if (trimmedCookie.startsWith("lastPurchased=")) {
            return decodeURIComponent(trimmedCookie.substring("lastPurchased=".length));
        }
    }

    return null;
}

/* =========================================
    WELCOME MESSAGE
========================================= */

// Greet returning shoppers with their last purchase from the cookie
function displayWelcomeMessage() {
    const lastPurchased = getLastPurchasedCookie();

    if (lastPurchased) {
        welcomeMessage.textContent =
            `Welcome back! Last time you purchased: ${lastPurchased}.`;
    } else {
        welcomeMessage.textContent =
            "Every piece in our shop is made by hand in small batches.";
    }
}

/* =========================================
    DISPLAY PRODUCTS
========================================= */

function displayProducts() {

    productGrid.innerHTML = "";

    products.forEach(product => {
        const card = document.createElement("article");
        card.classList.add("product-card");

        // Grey out sold out products and show the tooltip
        if (product.stock === 0) {
            card.classList.add("out-of-stock");

            // Show tooltip while mouse moves over the card
            card.addEventListener("mousemove", event => {
                tooltip.style.left = `${event.clientX}px`;
                tooltip.style.top = `${event.clientY}px`;
                tooltip.classList.add("show");
            });

            // Hide tooltip when mouse leaves the card
            card.addEventListener("mouseleave", () => {
                tooltip.classList.remove("show");
            });
        }

        card.innerHTML = `
            <img src="${product.image}" alt="${product.alt}">
            <section class="product-content">
                <h3>${product.name}</h3>
                <p>${product.description}</p>
                <p class="price">$${product.price.toFixed(2)}</p>
                <p class="stock">Available: ${product.stock}</p>
                <button
                    ${product.stock === 0 ? "disabled" : ""}
                    onclick="addToCart(${product.id})"
                    aria-label="Add ${product.name} to cart"
                >
                    Add to Cart
                </button>
            </section>
        `;

        productGrid.appendChild(card);
    });
}

/* =========================================
    ADD TO CART
========================================= */

function addToCart(id) {
    const product = products.find(p => p.id === id);

    // Stop if the product is sold out
    if (product.stock <= 0) return;

    // Take one out of stock
    product.stock--;

    // Add to cart, or increase quantity if it is already there
    const existingItem = cart.find(item => item.id === id);

    if (existingItem) {
        existingItem.quantity++;
    } else {
        cart.push({
            id: product.id,
            name: product.name,
            price: product.price,
            quantity: 1
        });
    }

    // Count this add in sessionStorage for the current browsing session
    sessionAdds++;
    sessionStorage.setItem("sessionAdds", sessionAdds);

    saveData();
    displayProducts();
    displayCart();
    showNotification();
}

/* =========================================
    ADJUST QUANTITY
========================================= */

// Change an item's quantity with the + and - cart buttons.
// Stock moves the opposite direction of the quantity.
function changeQuantity(id, change) {
    const item = cart.find(item => item.id === id);
    const product = products.find(p => p.id === id);

    if (!item || !product) return;

    // Increasing quantity requires available stock
    if (change > 0 && product.stock <= 0) return;

    item.quantity += change;
    product.stock -= change;

    // Remove the item completely when quantity reaches zero
    if (item.quantity <= 0) {
        cart = cart.filter(cartItem => cartItem.id !== id);
    }

    saveData();
    displayProducts();
    displayCart();
}

/* =========================================
    DISPLAY CART
========================================= */

function displayCart() {

    cartItems.innerHTML = "";

    let totalCost = 0;
    let totalItems = 0;

    cart.forEach(item => {
        const itemTotal = item.price * item.quantity;
        totalCost += itemTotal;
        totalItems += item.quantity;

        const row = document.createElement("section");
        row.classList.add("cart-item");

        row.innerHTML = `
            <p>${item.name}</p>
            <p>$${itemTotal.toFixed(2)}</p>
            <section class="qty-controls">
                <button class="qty-btn" onclick="changeQuantity(${item.id}, -1)"
                    aria-label="Decrease quantity of ${item.name}">-</button>
                <span>x${item.quantity}</span>
                <button class="qty-btn" onclick="changeQuantity(${item.id}, 1)"
                    aria-label="Increase quantity of ${item.name}">+</button>
            </section>
        `;

        cartItems.appendChild(row);
    });

    cartCount.textContent = totalItems;
    cartTotal.textContent = `Total: $${totalCost.toFixed(2)}`;
    sessionCount.textContent = sessionAdds;
}

/* =========================================
    SAVE DATA
========================================= */

// Keep the cart and inventory in localStorage so they
// survive page refreshes and closing the browser
function saveData() {
    localStorage.setItem("products", JSON.stringify(products));
    localStorage.setItem("cart", JSON.stringify(cart));
}

/* =========================================
    NOTIFICATION
    ---------------------------------------
    VISUAL INDICATION: when an item is added to the cart, a
    notification message slides up in the corner for 1.5 seconds
    so the shopper knows the add was successful.
========================================= */

function showNotification() {
    notification.classList.add("show");
    setTimeout(() => notification.classList.remove("show"), 1500);
}

/* =========================================
    CLEAR CART
========================================= */

// Empty the cart and put every reserved item back in stock
function clearCart() {
    cart.forEach(item => {
        const product = products.find(p => p.id === item.id);
        if (product) product.stock += item.quantity;
    });

    cart = [];

    saveData();
    displayProducts();
    displayCart();
}

/* =========================================
    CHECKOUT
========================================= */

function checkout() {

    if (cart.length === 0) {
        alert("Your cart is empty. Add some handmade goods first!");
        return;
    }

    let totalCost = 0;
    let totalItems = 0;

    cart.forEach(item => {
        totalCost += item.price * item.quantity;
        totalItems += item.quantity;
    });

    // Remember this purchase in a cookie for the welcome message
    const purchasedNames = cart.map(item => item.name).join(", ");
    setLastPurchasedCookie(purchasedNames);

    // Confirm the purchase with the totals
    alert(`Thank you for your purchase! You bought ${totalItems} item(s) for $${totalCost.toFixed(2)}.`);

    // Purchased items stay out of stock, so just empty the cart
    cart = [];

    saveData();
    displayProducts();
    displayCart();
    displayWelcomeMessage();
}

/* =========================================
    BUTTON EVENTS
========================================= */

clearCartButton.addEventListener("click", clearCart);
checkoutButton.addEventListener("click", checkout);

/* =========================================
    INITIALIZATION
========================================= */

displayWelcomeMessage();
displayProducts();
displayCart();
