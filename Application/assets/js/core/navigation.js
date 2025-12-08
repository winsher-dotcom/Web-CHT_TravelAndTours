document.addEventListener("DOMContentLoaded", () => {
    const layout = document.querySelector(".layout");
    const sidebarToggle = document.getElementById("sidebarToggle");
    const sidebarLinks = document.querySelectorAll(
        ".sidebar-nav .sidebar-link, .top-bar-actions [data-section]"
    );
    const sections = document.querySelectorAll(
        "[data-section-root], .page-section[data-section]"
    );
    const pageTitle = document.getElementById("pageTitle");
    const pageSubtitle = document.getElementById("pageSubtitle");

    const titleMap = {
        dashboard: {
            title: "Dashboard",
            subtitle: "Overview of todays performance and activity.",
        },
        employees: {
            title: "Employees",
            subtitle: "Manage employee access, contact details, and roles.",
        },
        clients: {
            title: "Clients",
            subtitle: "View and register clients.",
        },
        bookings: {
            title: "Bookings",
            subtitle: "Create and monitor client bookings.",
        },
        payments: {
            title: "Payments",
            subtitle: "Track and record payments.",
        },
        packages: {
            title: "Packages",
            subtitle: "Configure tour packages and pricing.",
        },
        trips: {
            title: "Trips & Itinerary",
            subtitle: "Plan trips, activities, and logistics.",
        },
        vehicles: {
            title: "Vehicles",
            subtitle: "Track vehicles and transport providers.",
        },
        accommodations: {
            title: "Accommodations",
            subtitle: "Manage partner hotels and room types.",
        },
    };

    function activateSection(key) {
        sections.forEach((el) => {
            const root = el.hasAttribute("data-section-root");
            const secKey = root ? "dashboard" : el.getAttribute("data-section");
            if (!secKey) return;

            if (secKey === key) {
                el.classList.remove("hidden");
            } else if (root) {
                el.classList.toggle("hidden", key !== "dashboard");
            } else {
                el.classList.add("hidden");
            }
        });

        sidebarLinks.forEach((btn) => {
            const btnKey = btn.getAttribute("data-section");
            if (btn.closest(".sidebar-nav")) {
                btn.classList.toggle("active", btnKey === key);
            }
        });

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

    if (sidebarToggle && layout) {
        sidebarToggle.addEventListener("click", () => {
            layout.classList.toggle("sidebar-collapsed");
        });
    }

    // Initialize
    if (sections.length) activateSection("dashboard");

    // Logout
    document.querySelector(".logout")?.addEventListener("click", () => {
        localStorage.removeItem("loggedIn");
        localStorage.removeItem("employeeName");
        window.location.href = "../auth/login.html";
    });
});
