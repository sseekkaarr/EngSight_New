// Periksa apakah Firebase diinisialisasi
if (!window.auth || !window.db) {
    console.error("Firebase is not initialized! Ensure firebaseConfig.js is loaded.");
}

// Tombol logout
const logoutButton = document.getElementById("logoutBtn");
if (logoutButton) {
    logoutButton.addEventListener("click", async () => {
        try {
            await window.auth.signOut(); // Gunakan window.auth
            alert("Logged out successfully!");
            window.location.href = "login.html"; // Redirect ke login
        } catch (error) {
            console.error("Error during logout:", error);
            alert("Failed to log out. Please try again.");
        }
    });
}


// Menampilkan data pengguna di halaman profil
auth.onAuthStateChanged(async (user) => {
    if (user) {
        // Tampilkan nama dan email pengguna
        document.querySelector("#profile-picture").src = "img/default-avatar.png"; // Default profile picture
        document.querySelector(".profile-info-content").innerHTML = `
            <p><strong>Name:</strong> ${user.displayName || "Not set"}</p>
            <p><strong>Email:</strong> ${user.email}</p>
        `;

        console.log("User data loaded:", user);
    } else {
        // Jika tidak ada pengguna, redirect ke halaman login
        window.location.href = "login.html";
    }
});

console.log("Profile.js loaded");
console.log("Auth instance:", window.auth);

