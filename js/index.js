function showDescription(lab) {
    const descriptionContainer = document.getElementById("description-container");

    if (lab === 'pre-reading') {
        descriptionContainer.innerHTML = "<p>Preparing your mind for the reading process.</p>";
    } else if (lab === 'reading') {
        descriptionContainer.innerHTML = "<p>Engage with the text! Skimming for key ideas and highlighting important information.</p>";
    } else if (lab === 'post-reading') {
        descriptionContainer.innerHTML = "<p>Reflect on what you’ve read by writing a summary-analysis/response essay.</p>";
    }

    descriptionContainer.style.display = "block";
}

document.addEventListener("DOMContentLoaded", () => {
    const startNowButton = document.getElementById("start-now");
    startNowButton.addEventListener("click", () => {
        alert("Redirecting to Pre-Reading Lab...");
        window.location.href = "pre-reading.html"; // Redirect sesuai kebutuhan
    });
});

function startNow() {
    window.location.href = 'pre-reading.html';
}


auth.onAuthStateChanged((user) => {
    const navbar = document.querySelector("nav ul");
    if (user) {
        // Jika user login
        navbar.innerHTML = `
            <li><a href="index.html">Home</a></li>
            <li><a href="profile.html">Profile</a></li>
        `;
    } else {
        // Jika user belum login
        navbar.innerHTML = `
            <li><a href="index.html">Home</a></li>
            <li><a href="register.html">Sign Up</a></li>
            <li><a href="login.html">Sign In</a></li>
        `;
    }
});



