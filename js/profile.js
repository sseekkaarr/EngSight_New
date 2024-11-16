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
// Check if the user is logged in and fetch profile details
window.auth.onAuthStateChanged(async (user) => {
    if (user) {
        // Display email from Firebase Auth
        document.getElementById("profile-email").textContent = user.email;

        try {
            // Fetch additional profile details from Firestore
            const userDoc = await window.db.collection("users").doc(user.uid).get();
            if (userDoc.exists) {
                const userData = userDoc.data();
                document.getElementById("profile-name").textContent = userData.name || "Not set";
            } else {
                console.error("No such user document in Firestore!");
                document.getElementById("profile-name").textContent = "Not set";
            }
        } catch (error) {
            console.error("Error fetching user profile from Firestore:", error);
            document.getElementById("profile-name").textContent = "Error";
        }
    } else {
        // If the user is not logged in, redirect to login page
        window.location.href = "login.html";
    }
});


console.log("Profile.js loaded");
console.log("Auth instance:", window.auth);

