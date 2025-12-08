document.addEventListener("DOMContentLoaded", () => {
    const form = document.getElementById("loginForm");
    if (!form) return;

    form.addEventListener("submit", (event) => {
        event.preventDefault();

        const email = document.getElementById("email")?.value.trim();
        const password = document.getElementById("password")?.value.trim();

        if (!email || !password) {
            alert("Please fill out all fields.");
            return;
        }

        // Demo only: mark user as logged in
        localStorage.setItem("loggedIn", "true");
        localStorage.setItem("employeeName", email);

        window.location.href = "../dashboard/dashboard.html";
    });
});
