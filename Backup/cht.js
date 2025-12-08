document.getElementById("loginForm").addEventListener("submit", function(event) {
    event.preventDefault();

    let email = document.getElementById("email").value.trim();
    let password = document.getElementById("password").value.trim();

    if (email === "" || password === "") {
        alert("Please fill out all fields.");
        return;
    }

    // Example only — replace with backend logic later
    alert("Login Successful!");
});

function login() {
    let user = document.getElementById("user").value;
    let pass = document.getElementById("pass").value;

    if (user === "admin" && pass === "123") {
        localStorage.setItem("loggedIn", "true");
        window.location.href = "dashboard.html";
    } else {
        alert("Invalid login");
    }
}


// Logout button
document.querySelector('.logout')?.addEventListener('click', () => {
    localStorage.removeItem("loggedIn");
    window.location.href = "index.html";
});


// Test comment