/*
    Author: Daryl Hymel
    Date: 08/23/2026
    Purpose: 4.5 Guided Practice - Storing Locally. Cart page script that
             renders reserved items from local storage, keeps the timer in
             sync, and restores stock when the reservation expires.
*/

/* =========================================
     CART PAGE SCRIPT
     ---------------------------------------
     This file manages:
     - Cart rendering
     - Timer synchronization
     - Stock restoration
     - Page redirection
========================================= */


/* =========================================
     LOAD DATA FROM LOCAL STORAGE
     ---------------------------------------
     (These values are shared from index.html)
========================================= */

// Stored cart items from shopping page
const cart = JSON.parse(localStorage.getItem("cart")) || [];

// Product inventory with stock values
const products = JSON.parse(localStorage.getItem("products")) || [];

// Cart expiration timestamp (milliseconds)
let cartEndTime = localStorage.getItem("cartEndTime");


/* =========================================
    DOM REFERENCES
========================================= */
// Cart item container
const cartItems = document.getElementById("cart-items");

// Total price display
const cartTotal = document.getElementById("cart-total");

// Countdown timer display
const countdown = document.getElementById("countdown");


/* =========================================
     RENDER CART CONTENTS
========================================= */

// STEP 12
function displayCart() {
    // Clear previous render before rebuilding UI
    cartItems.innerHTML = "";
    let total = 0;

    // Loop through each item in cart
    cart.forEach(item => {
        total += item.price;

        const section = document.createElement("section");
        section.classList.add("cart-item");

        section.innerHTML = `
            <p>${item.name}</p>
            <p>$${item.price}</p>
        `;

        cartItems.appendChild(section);
    });

    // Update total display after loop completes
    cartTotal.textContent = `Total: $${total}`;
}

/* =========================================
     EXPIRE CART SESSION
========================================= */

// STEP 13
function expireCart() {

    // Restore stock back to inventory
    cart.forEach(item => {
        const product = products.find(product => product.id === item.id);

        if (product) {
            product.stock++;
        }
    });

    // Update cart data in local storage
    localStorage.setItem("products", JSON.stringify(products));

    // Clear cart-related storage
    localStorage.removeItem("cart");
    localStorage.removeItem("cartEndTime");

    // Notify user cart has expired
    alert("Your item reservations have ended. Stock availability may have changed.");

    // Redirect user back to the home page
    window.location.href = "index.html";
}


/* =========================================
     SYNCHONIZE TIMER TO REAL-TIME
========================================= */
function updateTimer() {

    // Default display when no timer exists
    if (!cartEndTime) {
        countdown.textContent = "15:00";
        return;
    }

    const remaining = cartEndTime - Date.now();

    // If time has expired, trigger cleanup
    if (remaining <= 0) {
        expireCart();
        return;
    }

    const minutes = Math.floor(remaining / 1000 / 60);

    const seconds = Math.floor((remaining / 1000) % 60);

    // Format and display remaining time
    countdown.textContent =
        `${minutes}:${seconds
            .toString()
            .padStart(2, "0")}`;
}


/* =========================================
     INITIALIZATION
========================================= */

// Render cart on page load
displayCart();

// Initialize timer display
updateTimer();

// Update countdown every second
setInterval(updateTimer, 1000);