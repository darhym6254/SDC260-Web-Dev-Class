/*
    Author: Daryl Hymel
    Date: 08/18/2026
    Purpose: 4.3 Guided Practice - Cookie Collection. Displays bakery products,
             manages a floating shopping cart, and saves the cart in a cookie
             so it persists across page refreshes.
*/

/* =========================================
     GLOBAL VARIABLES
========================================= */

// STEP 4

// Products
const products = [
    {
        name: "Butter Croissant",
        description: "Flaky layers baked with rich European butter.",
        price: 4.50,
        image: "images/croissant.png",
        alt: "Fresh buttery croissant"
    },
    {
        name: "Vanilla Cupcake",
        description: "Classic vanilla cake topped with creamy frosting.",
        price: 3.75,
        image: "images/cupcake.png",
        alt: "Vanilla cupcake with frosting"
    },
    {
        name: "Artisan Bread",
        description: "Handcrafted sourdough with a crispy crust.",
        price: 6.25,
        image: "images/bread.png",
        alt: "Fresh artisan bread loaf"
    },
    {
        name: "Chocolate Chip Cookies",
        description: "Soft baked cookies filled with chocolate chunks.",
        price: 5.00,
        image: "images/cookies.png",
        alt: "Chocolate chip cookies"
    },
    {
        name: "Apple Pie Slice",
        description: "Classic cinnamon apple pie with flaky crust.",
        price: 4.95,
        image: "images/pie.png",
        alt: "Apple pie slice"
    },
    {
        name: "Cinnamon Roll",
        description: "Soft cinnamon pastry drizzled with icing.",
        price: 4.25,
        image: "images/cinnamon-roll.png",
        alt: "Warm cinnamon roll"
    },
    {
        name: "Almond Croissant",
        description: "Buttery croissant filled with sweet almond cream.",
        price: 5.25,
        image: "images/croissant.png",
        alt: "Golden almond croissant"
    },
    {
        name: "Sourdough Baguette",
        description: "Long crusty loaf with a soft, airy center.",
        price: 5.50,
        image: "images/bread.png",
        alt: "Crusty sourdough baguette"
    },
    {
        name: "Iced Sugar Cookies",
        description: "Sweet vanilla cookies with a smooth icing glaze.",
        price: 4.75,
        image: "images/cookies.png",
        alt: "Iced sugar cookies"
    }
];

// Cart array
let cart = [];

// STEP 5
const productGrid = document.querySelector(".product-grid");
const cartItems = document.getElementById("cart-items");
const cartTotal = document.getElementById("cart-total");
const cartCount = document.getElementById("cart-count");
const toggleCart = document.getElementById("toggle-cart");
const cartContent = document.getElementById("cart-content");
const cartWindow = document.querySelector(".cart-window");

/* =========================================
     LOAD PAGE CONTENT
========================================= */

// STEP 6
window.addEventListener("DOMContentLoaded", () => {

    // Display products to HTML page
    displayProducts();

    // Load stored cookie data
    loadCartFromCookies();

    // Update cart
    updateCartDisplay();
});

/* =========================================
     DYNAMICALLY CREATE PRODUCT CARDS
========================================= */

// STEP 7
function displayProducts() {

    // Loop through product array
    products.forEach(product => {

        // Create a new product card
        const article = document.createElement("article");
        article.classList.add("card");

        article.innerHTML = `
            <img src="${product.image}" alt="${product.alt}">
            <h3>${product.name}</h3>
            <p>${product.description}</p>
            <span>$${product.price.toFixed(2)}</span>
            <button class="add-cart">Add to Cart</button>
        `;

        // Grab Select button
        const button = article.querySelector(".add-cart");

        // Add a click event listener to button
        button.addEventListener("click", () => {
            addToCart(product);
        });

        // Add product card to the page
        productGrid.appendChild(article);
    });
}

/* =========================================
     ADD PRODUCT TO CART
========================================= */

// STEP 8
function addToCart(product) {

    // Check if product already exists in cart
    const existingItem = cart.find(item => item.name === product.name);

    if (existingItem) {
        existingItem.quantity++;
    } else {
        cart.push({
            name: product.name,
            price: product.price,
            quantity: 1
        });

    }

    // Update cart
    updateCartDisplay();

    // Update cookie to save current cart status
    saveCartToCookies();

    // Animate the cart block to visually notify user of changes
    bounceCart();
}

/* =========================================
     UPDATE CART DISPLAY
========================================= */

// STEP 9
function updateCartDisplay() {

    // Clear out existing cart
    cartItems.innerHTML = "";

    let total = 0;
    let count = 0;

    // Loop through the cart
    cart.forEach((item, index) => {

        // Create a list item
        const li = document.createElement("li");

        // Calculate the item total
        const itemTotal = item.price * item.quantity;

        total += itemTotal;
        count += item.quantity;

        // Prep item display in cart
        li.innerHTML = `
            <span>
                ${item.name} x${item.quantity}
                ($${itemTotal.toFixed(2)})
            </span>

            <button class="remove-btn" aria-label="Remove ${item.name}">Remove</button>
        `;

        // Configure Remove button
        const removeButton = li.querySelector(".remove-btn");

        removeButton.addEventListener("click", () => {
            removeItem(index);
        });

        // Add item to cart
        cartItems.appendChild(li);
    });

    // Update totals
    cartTotal.textContent = `Total: $${total.toFixed(2)}`;
    cartCount.textContent = count;
}

/* =========================================
     REMOVE ITEMS FROM CART
========================================= */

// STEP 10
function removeItem(index) {

    // Remove item at index from the cart
    cart.splice(index, 1);

    // Update cart display and cookie data
    updateCartDisplay();
    saveCartToCookies();
}

/* =========================================
     SAVE CART USING COOKIES
========================================= */

// STEP 11
function saveCartToCookies() {

    // Convert array to string
    const cartString = JSON.stringify(cart);

    // Store string in cookie
    document.cookie = `bakeryCart=${cartString}; path=/; max-age=604800`;
}

/* =========================================
     LOAD CART FROM COOKIE
========================================= */

// STEP 12
function loadCartFromCookies() {

    // Split data in cookie for easier processing
    const cookies = document.cookie.split(";");

    cookies.forEach(cookie => {

        // Remove trailing spaces
        const trimmedCookie = cookie.trim();

        // Find target cookie data
        if (trimmedCookie.startsWith("bakeryCart=")) {

            // Get value from cookie
            const cookieValue = trimmedCookie.substring("bakeryCart=".length);

            // Parse the JSON data
            cart = JSON.parse(cookieValue);
        }
    });
}

/* =========================================
     COLLAPSIBLE CART WINDOW
========================================= */

let cartOpen = true;

/* =========================================
     TOGGLE CART OPEN/CLOSED
========================================= */
toggleCart.addEventListener("click", () => {

    // Flip cart visibility state on click
    cartOpen = !cartOpen;

    // Display/Hide cart based on visibility state
    if (cartOpen) {
        cartContent.style.display = "block";
    } else {
        cartContent.style.display = "none";
    }
});

/* =========================================
     BOUNCE ANIMATION FUNCTION
========================================= */

// STEP 13
function bounceCart() {

    cartWindow.classList.add("bounce");

    // End animation after 500ms (0.5 seconds)
    setTimeout(() => {
        cartWindow.classList.remove("bounce");
    }, 500);
}