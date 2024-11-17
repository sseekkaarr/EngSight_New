const registerForm = document.getElementById("register-form");
if (registerForm) {
  registerForm.addEventListener("submit", async (e) => {
    e.preventDefault();

    const name = document.getElementById("register-name").value.trim();
    const email = document.getElementById("register-email").value.trim();
    const password = document.getElementById("register-password").value.trim();

    if (!name || !email || !password) {
      alert("Please fill in all fields.");
      return;
    }

    try {
      console.log("Registering user with email:", email);

      const userCredential = await auth.createUserWithEmailAndPassword(email, password);
      const user = userCredential.user;

      console.log("User registered:", user.uid);

      await db.collection("users").doc(user.uid).set({
        name,
        email,
        createdAt: firebase.firestore.FieldValue.serverTimestamp(),
      });

      alert("Registration successful! Please login.");
      window.location.href = "login.html";
    } catch (error) {
      console.error("Error during registration:", error);
      alert(error.message);
    }
  });
}

const loginForm = document.getElementById("login-form");
if (loginForm) {
  loginForm.addEventListener("submit", async (e) => {
    e.preventDefault();

    const email = document.getElementById("login-email").value.trim();
    const password = document.getElementById("login-password").value.trim();

    if (!email || !password) {
      alert("Please fill in all fields.");
      return;
    }

    try {
      console.log("Logging in user with email:", email);

      const userCredential = await auth.signInWithEmailAndPassword(email, password);
      const user = userCredential.user;

      console.log("User logged in:", user.uid);

      alert("Login successful!");
      window.location.href = "index.html";
    } catch (error) {
      console.error("Error during login:", error);
      alert(error.message);
    }
  });
}

document.addEventListener("DOMContentLoaded", () => {
  const logoutButton = document.getElementById("logout-nav");
  if (logoutButton) {
    logoutButton.addEventListener("click", async () => {
      try {
        await auth.signOut();
        alert("Logged out successfully!");
        window.location.href = "login.html"; 
      } catch (error) {
        console.error("Error during logout:", error);
        alert(error.message);
      }
    });
  }
});

auth.onAuthStateChanged((user) => {
  const navbar = document.querySelector("nav ul");

  if (navbar) {
    if (user) {
      navbar.innerHTML = `
          <li><a href="profile.html">Profile</a></li>
      `;

      const logoutNavButton = document.getElementById("logout-nav");
      if (logoutNavButton) {
        logoutNavButton.addEventListener("click", async () => {
          try {
            await auth.signOut();
            alert("Logged out successfully!");
            window.location.href = "login.html";
          } catch (error) {
            console.error("Error during logout:", error);
          }
        });
      }
    } else {
      const currentPath = window.location.pathname;
      if (currentPath.includes("register.html") || currentPath.includes("login.html")) {
        navbar.innerHTML = `
            <li><a href="index.html">Home</a></li>
        `;
      } else {
        navbar.innerHTML = `
            <li><a href="register.html">Sign Up</a></li>
            <li><a href="login.html">Sign In</a></li>
        `;
      }
    }
  }
});

document.addEventListener("DOMContentLoaded", () => {
  const startNowButton = document.getElementById("start-now");
  if (startNowButton) {
    startNowButton.addEventListener("click", () => {
      if (auth && auth.currentUser) {
        window.location.href = "pre-reading.html";
      } else {
        alert("You need to log in first!");
        window.location.href = "login.html";
      }
    });
  }
});



const dropzones = document.querySelectorAll('.dropzone');

dropzones.forEach(dropzone => {
    dropzone.addEventListener('dragover', (e) => {
        e.preventDefault();
    });

    dropzone.addEventListener('drop', (e) => {
        const answer = e.dataTransfer.getData('text/plain');
        const existingAnswer = dropzone.querySelector('.answer');

        if (!existingAnswer) {
            const answerElement = document.createElement('div');
            answerElement.classList.add('answer');
            answerElement.textContent = answer;
            dropzone.appendChild(answerElement);
        }
    });
});
