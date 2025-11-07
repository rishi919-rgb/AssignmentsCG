
document.addEventListener("DOMContentLoaded", () => {
    const logo = document.querySelector(".logo");
    const floats = document.querySelectorAll(".float");

    // ✅ Scroll event for logo background change
    window.addEventListener("scroll", () => {
        if (window.scrollY > 500) {
            logo.classList.add("scrolled");
        } else {
            logo.classList.remove("scrolled");
        }
    });

    // ✅ Scroll event for floating images parallax
    window.addEventListener("scroll", () => {
        const scrollY = window.scrollY;

        floats.forEach((img, index) => {
            const speed = (index + 1) * 0.2; // slightly different speed per image
            img.style.transform = `translateY(${scrollY * speed * 0.1}px)`;
        });
    });

    // ✅ Hamburger toggle for mobile menu
    window.toggleMenu = function () {
        const nav = document.querySelector(".nav-links");
        nav.classList.toggle("active");
    };
});

