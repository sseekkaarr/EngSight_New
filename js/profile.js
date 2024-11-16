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
        document.getElementById("profile-email").textContent = user.email;

        try {
            const userDoc = await window.db.collection("users").doc(user.uid).get();
            if (userDoc.exists) {
                const userData = userDoc.data();
                document.getElementById("profile-name").textContent = userData.name || "Not set";
            } else {
                console.error("No such user document in Firestore!");
                document.getElementById("profile-name").textContent = "Not set";
            }

            loadTestResults(user.uid); // Panggil fungsi untuk memuat hasil tes
        } catch (error) {
            console.error("Error fetching user profile from Firestore:", error);
            document.getElementById("profile-name").textContent = "Error";
        }
    } else {
        window.location.href = "login.html";
    }
});




console.log("Profile.js loaded");
console.log("Auth instance:", window.auth);

const loadTestResults = async (userId) => {
    const testResultsContainer = document.querySelector(".test-cards");
    testResultsContainer.innerHTML = ""; // Clear any existing content

    const defaultTests = [
        { test_type: "pre_reading_lab", label: "Pre-Reading Lab" },
        { test_type: "reading_lab", label: "Reading Lab" },
        { test_type: "post_reading_lab", label: "Post-Reading Lab" },
    ];

    try {
        const testsCollection = await firebase.firestore().collection("users").doc(userId).collection("tests").get();
        const results = {};

        // Collect existing test results
        testsCollection.forEach((doc) => {
            results[doc.id] = doc.data();
        });

        // Render test results
        defaultTests.forEach(({ test_type, label }) => {
            const test = results[test_type] || { score: 0, max_score: 100 };
            const score = test.score || 0;
            const submissionDate = test.submission_date
                ? new Date(test.submission_date.toDate()).toLocaleDateString()
                : "Not Attempted";

            const scoreColor = score >= 90 ? "#4caf50" : score >= 70 ? "#ff9800" : "#f44336";

            const testCard = `
                <div class="test-card">
                    <div class="progress-ring" style="border-color: ${scoreColor};">
                        <span class="score-text">${score}%</span>
                    </div>
                    <h3>${label}</h3>
                    <p><strong>Date:</strong> ${submissionDate}</p>
                </div>
            `;
            testResultsContainer.innerHTML += testCard;
        });
    } catch (error) {
        console.error("Error loading test results:", error);
        testResultsContainer.innerHTML = `<p>Error loading test results.</p>`;
    }
};


// Fungsi untuk render progress ring default (0%)
const renderDefaultTestResults = (container) => {
    const defaultResults = [
        { testType: "Pre-Reading Lab", score: 0 },
        { testType: "Reading Lab", score: 0 },
        { testType: "Post-Reading Lab", score: 0 },
    ];

    defaultResults.forEach((result) => {
        const testCard = `
            <div class="test-card">
                <div class="progress-ring" style="border-color: #f44336;">
                    <span class="score-text">${result.score}%</span>
                </div>
                <h3>${result.testType}</h3>
                <p><strong>Date:</strong> Not Attempted</p>
            </div>
        `;
        container.innerHTML += testCard;
    });
};

// Panggil loadTestResults saat halaman dimuat
document.addEventListener("DOMContentLoaded", loadTestResults);




