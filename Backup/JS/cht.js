// Simple login handling for prototype only
const loginForm = document.getElementById("loginForm");
if (loginForm) {
    loginForm.addEventListener("submit", function (event) {
        event.preventDefault();

        const email = document.getElementById("email")?.value.trim();
        const password = document.getElementById("password")?.value.trim();

        if (!email || !password) {
            alert("Please fill out all fields.");
            return;
        }

        // Demo only – replace with backend logic later
        localStorage.setItem("loggedIn", "true");
        window.location.href = "Dashboards/dashboard.html";
    });
}

function login() {
    const user = document.getElementById("user")?.value;
    const pass = document.getElementById("pass")?.value;

    if (user === "admin" && pass === "123") {
        localStorage.setItem("loggedIn", "true");
        window.location.href = "Dashboards/dashboard.html";
    } else {
        alert("Invalid login");
    }
}

// Dashboard behaviour
document.addEventListener("DOMContentLoaded", () => {
    const sidebarLinks = document.querySelectorAll(
        ".sidebar-nav .sidebar-link, .top-bar-actions [data-section]"
    );
    const sections = document.querySelectorAll("[data-section-root], .page-section[data-section]");
    const pageTitle = document.getElementById("pageTitle");
    const pageSubtitle = document.getElementById("pageSubtitle");
    const layout = document.querySelector(".layout");
    const collapseToggle = document.getElementById("sidebarToggle");

    const titleMap = {
        dashboard: {
            title: "Dashboard",
            subtitle: "Overview of today’s performance and activity.",
        },
        bookings: {
            title: "Bookings",
            subtitle: "Create and manage client bookings.",
        },
        clients: {
            title: "Clients",
            subtitle: "View and register clients.",
        },
        packages: {
            title: "Packages",
            subtitle: "Configure tour packages and pricing.",
        },
        trips: {
            title: "Trips & Itineraries",
            subtitle: "Plan trips, activities and logistics.",
        },
        accommodations: {
            title: "Accommodations",
            subtitle: "Manage partner hotels and room allocations.",
        },
        vehicles: {
            title: "Vehicles",
            subtitle: "Track transport providers and capacities.",
        },
        payments: {
            title: "Payments",
            subtitle: "Monitor and record client payments.",
        },
    };

    function activateSection(key) {
        sections.forEach((el) => {
            const sectionKey = el.getAttribute("data-section") ||
                (el.hasAttribute("data-section-root") ? "dashboard" : null);
            if (!sectionKey) return;
            if (sectionKey === key) {
                el.classList.remove("hidden");
            } else if (el.hasAttribute("data-section-root")) {
                el.classList.toggle("hidden", key !== "dashboard");
            } else {
                el.classList.add("hidden");
            }
        });

        sidebarLinks.forEach((btn) => {
            const btnKey = btn.getAttribute("data-section");
            if (btnKey && btn.closest(".sidebar-nav")) {
                btn.classList.toggle("active", btnKey === key);
            }
        });

        // Collapsible sidebar
        if (collapseToggle && layout) {
            collapseToggle.addEventListener("click", () => {
                layout.classList.toggle("sidebar-collapsed");
            });
        }

        const copy = titleMap[key];
        if (copy) {
            if (pageTitle) pageTitle.textContent = copy.title;
            if (pageSubtitle) pageSubtitle.textContent = copy.subtitle;
        }
    }

    sidebarLinks.forEach((btn) => {
        const key = btn.getAttribute("data-section");
        if (!key) return;
        btn.addEventListener("click", () => activateSection(key));
    });

    // Initialize default
    if (sections.length) {
        activateSection("dashboard");
    }

    // Logout button
    document.querySelector(".logout")?.addEventListener("click", () => {
        localStorage.removeItem("loggedIn");
        window.location.href = "../cht_login.html";
    });
});
