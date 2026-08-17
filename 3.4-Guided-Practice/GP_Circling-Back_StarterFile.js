/*
    Author: Daryl Hymel - darhym6254
    Date: 08/16/2026
    Purpose: JavaScript for the Rustic Harvest Farmer's Market page. Stores the
             market data in arrays and objects, then uses one of each loop type
             (while, do...while, for, forEach, for...of, and for...in) to build
             the vendor, produce, event, tip, review, and statistics cards on
             the page.
*/

/* =========================================
   DATA ARRAYS AND OBJECTS
========================================= */

// STEP 3

// Weekly community events
const events = [
    "Live Bluegrass Music",
    "Kids Gardening Workshop",
    "Local Chef Demonstration",
    "Pumpkin Decorating Station"
];

// Sustainability tips
const tips = [
    "Bring reusable shopping bags.",
    "Buy seasonal produce to reduce transportation waste.",
    "Support small local farms.",
    "Compost leftover fruits and vegetables."
];

// Customer reviews
const reviews = [
    "The produce is always fresh and delicious!",
    "I love the friendly atmosphere every weekend.",
    "The local honey and baked goods are incredible."
];


// STEP 4 & STEP 12

// Market statistics object
const marketStats = {
    Vendors: 28,
    VisitorsPerWeekend: 1400,
    YearsOpen: 12,
    CommunityEvents: 18
};

// Vendor booth data
const vendors = [
    {
        name: "Green Valley Farms",
        specialty: "Organic Vegetables"
    },
    {
        name: "Honey Hill Apiary",
        specialty: "Wildflower Honey"
    },
    {
        name: "Sunrise Orchards",
        specialty: "Fresh Apples and Peaches"
    },
    {
        name: "Willow Creek Dairy",
        specialty: "Handmade Artisan Cheese"
    },
    {
        // STEP 12: New vendor with my Student ID and program name
        name: "darhym6254",
        specialty: "Web Development"
    }
];

// Seasonal produce array
const produce = [
    {
        item: "Tomatoes",
        farm: "Green Valley Farms"
    },
    {
        item: "Sweet Corn",
        farm: "Rolling Hills Farm"
    },
    {
        item: "Blueberries",
        farm: "Berry Patch Acres"
    },
    {
        item: "Peaches",
        farm: "Sunrise Orchards"
    },
    {
        item: "Bell Peppers",
        farm: "Oak Meadow Farm"
    },
    {
        item: "Zucchini",
        farm: "Willow Creek Gardens"
    }
];


/* =========================================
   DOM REFERENCES
========================================= */

// STEP 5

const vendorContainer = document.getElementById("vendorContainer");
const produceContainer = document.getElementById("produceContainer");
const eventContainer = document.getElementById("eventContainer");
const tipsContainer = document.getElementById("tipsContainer");
const reviewContainer = document.getElementById("reviewContainer");
const statsContainer = document.getElementById("statsContainer");


/* =========================================
   while LOOP
   SUSTAINABILITY TIPS
========================================= */

//STEP 6

let tipIndex = 0;
while (tipIndex < tips.length) {
    tipsContainer.innerHTML += `
        <article class="card">
            <h3>Eco-Friendly Tip #${tipIndex + 1}</h3>
            <p>${tips[tipIndex]}</p>
        </article>
    `;
    tipIndex++;
}


/* =========================================
   do...while LOOP
   CUSTOMER REVIEWS
========================================= */

// STEP 7

let reviewIndex = 0;
if (reviews.length > 0) {
    do {
        reviewContainer.innerHTML += `
            <article class="card">
                <h3>Anonymous Customer Review</h3>
                <p>"${reviews[reviewIndex]}"</p>
            </article>
        `;
        reviewIndex++;
    } while (reviewIndex < reviews.length);
}


/* =========================================
   for LOOP
   FEATURED VENDORS
========================================= */

// STEP 8

for (let i = 0; i < vendors.length; i++) {
    vendorContainer.innerHTML += `
        <article class="card">
            <h3>${vendors[i].name}</h3>
            <p>Specialty: ${vendors[i].specialty}</p>
        </article>
    `;
}


/* =========================================
   forEach LOOP
   SEASONAL PRODUCE
========================================= */

// STEP 9

produce.forEach(function(item) {
    produceContainer.innerHTML += `
        <article class="card">
            <h3>${item.item}</h3>
            <p>Farm: ${item.farm}</p>
        </article>
    `;
});


/* =========================================
   for...of LOOP
   WEEKLY EVENTS
========================================= */

// STEP 10

for (const event of events) {
    eventContainer.innerHTML += `
        <article class="card">
            <h3>${event}</h3>
            <p>Join the community and enjoy this special event.</p>
        </article>
    `;
}


/* =========================================
   for...in LOOP
   MARKET STATISTICS
========================================= */

// STEP 11

for (const stat in marketStats) {
    // Add a space before each capital letter
    const formattedStat = stat.replace(/([A-Z])/g, " $1");

    statsContainer.innerHTML += `
        <article class="stat-item">
            <p>${formattedStat}: ${marketStats[stat]}</p>
        </article>
    `;
}
