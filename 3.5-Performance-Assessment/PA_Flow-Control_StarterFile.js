/*
    Author: Daryl Hymel - darhym6254
    Date: 08/16/2026
    Purpose: JavaScript for the Greenway Park Trail Recommender. Stores the
             trail data in an array of objects, uses a loop to build the trail
             cards on the page, and uses conditional logic on the Trail Finder
             form to recommend a trail based on whether the visitor is bringing
             pets and their hiking experience level.
*/

/* =========================================
   GREENWAY PARK TRAIL DATA
========================================= */

const trails = [
    { name: "River Walk", difficulty: "low", time: 20 },
    { name: "Forest Loop", difficulty: "medium", time: 45 },
    { name: "Hill Summit Trail", difficulty: "high", time: 90 },
    { name: "Lake Side Path", difficulty: "low", time: 30 },
    { name: "Rock Ridge Trail", difficulty: "high", time: 75 },
    { name: "Meadow Breeze Path", difficulty: "low", time: 25 },
    { name: "Canyon Overlook Trail", difficulty: "medium", time: 55 },
    // New trail named with my Student ID
    { name: "darhym6254 Explorer Trail", difficulty: "medium", time: 50 }
];

/* =========================================
   DISPLAY TRAILS VIA LOOP
========================================= */

// Container that holds all of the trail cards
const trailContainer = document.getElementById("trailContainer");

// Build a card for every trail in the array
for (const trail of trails) {
    trailContainer.innerHTML += `
        <article class="card">
            <h3>${trail.name}</h3>
            <p>Difficulty: ${trail.difficulty}</p>
            <p>Average Time: ${trail.time} minutes</p>
        </article>
    `;
}

/* =========================================
   FORM LOGIC
========================================= */

const trailForm = document.getElementById("trailForm");

trailForm.addEventListener("submit", function (event) {

    // Keep the page from reloading when the form is submitted
    event.preventDefault();

    // Prep the recommendation message
    let recommendation = "";

    // Obtain the selected pets radio button value
    const pets = document.querySelector('input[name="pets"]:checked').value;

    // Obtain the selected hiking experience level from the dropdown menu
    const experience = document.getElementById("experience").value;

    // Determine which trail to recommend based on the park guidelines
    if (pets === "yes" && experience === "low") {
        // Bringing pets AND low experience
        recommendation = "River Walk";
    }
    else if (pets === "yes" && (experience === "medium" || experience === "high")) {
        // Bringing pets AND medium or high experience
        recommendation = "Forest Loop";
    }
    else if (pets === "no" && experience === "low") {
        // No pets AND low experience
        recommendation = "Lake Side Path";
    }
    else if (pets === "no" && experience === "medium") {
        // No pets AND medium experience
        recommendation = "Forest Loop";
    }
    else if (pets === "no" && experience === "high") {
        // No pets AND high experience
        recommendation = "Rock Ridge Trail";
    }
    else {
        // Default option when no condition above is met
        recommendation = "River Walk";
    }

    // Display the recommended trail in the Results aside
    document.getElementById("result").textContent =
        "Recommended Trail: " + recommendation;

});
