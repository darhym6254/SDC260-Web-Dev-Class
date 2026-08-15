/*
    Author: Daryl Hymel - darhym6254
    Date: 08/13/2026
    Purpose: JavaScript for the City Library portal. showBenefits() reads the
             membership dropdown and uses a switch statement to display the
             matching benefits. checkResources() then reads the student and
             educator radio buttons and uses conditional logic to decide what
             special resource access, if any, the visitor qualifies for.
*/

/* ========================================
   Display General Membership Benefits
======================================== */
function showBenefits() {

    // STEP 6

    // Prep a message to display to the user
    let message = "";

    // Obtain user-selected membership value from dropdown menu
    const membership = document.getElementById("membership").value;

    //Update message based on membership type
    switch(membership) {
        case "guest":
            message = "Guests may browse books and use public computers.";
            break;

        case "member":
            message = "Members may borrow books and access e-books.";
            break;

        case "premium":
            message = "Premium members have unlimited borrowing limits, study room access, and digital archive viewing permissions.";
            break;

        case "staff":
            message = "Staff members have full administrative rights and access to library content.";
            break;
    }

    // Display the membership benefits message on the page
    document.getElementById("benefits-result").textContent = message;

    // Check for additional resource access privileges
    checkResources();

}


/* ========================================
   Check Special Resource Access
======================================== */
function checkResources() {

    // STEP 7

    // Prep the special access message
    let accessMessage = "";

    // Obtain selected membership type
    const membership = document.getElementById("membership").value;

    // Obtain student radio button value
    const student = document.querySelector('input[name="student"]:checked').value;

    // Get selected educator radio button value
    const educator = document.querySelector('input[name="educator"]:checked').value;


    // STEP 8 (and STEP 9)

    // Check special resource conditions
    if (student === "yes" && membership === "guest") {
        // Student AND Guest
        accessMessage = "Unlimited e-book access.";
    }
    else if (student === "yes" && membership === "premium") {
        // Student AND Premium Member
        accessMessage = "Access to media equipment on library premises.";
    }
    else if (educator === "yes" && membership === "guest") {
        // Educator AND Guest
        accessMessage = "Unlimited e-book access and ability to reserve small study rooms.";
    }
    else if (educator === "yes" && membership === "member") {
        // Educator AND Member
        accessMessage = "Ability to reserve large study rooms for guests and have access to digital archives.";
    }
    else if (student === "yes" && membership === "member") {
        // STEP 9: Student AND Member
        // A student with a standard membership was not covered by any of the
        // conditions above, so they fell through to "No special access." This
        // branch gives them research tools instead. It is placed after the
        // educator conditions on purpose, so someone who is both a student and
        // an educator still gets the educator message they got before.
        accessMessage = "Free interlibrary loan requests and access to the online research databases.";
    }
    else if (membership === "staff" || (educator === "yes" && membership === "premium")) {
        // Staff OR Educator with Premium Membership
        accessMessage = "Ability to borrow media equipment off library premises";
    }
    else {
        // Default message if no special conditions are true
        accessMessage = "No special access.";
    }

    // Display special resource access
    document.getElementById("resource-result").textContent = accessMessage;

}
