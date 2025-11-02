    window.addEventListener("scroll", function () {
        const logo = document.querySelector(".logo");

        if (window.scrollY > 500) {
            logo.classList.add("scrolled");
        } else {
            logo.classList.remove("scrolled");
        }
    });

    window.addEventListener("scroll", function () {
    const floats = document.querySelectorAll(".float");
    const scrollY = window.scrollY;

    floats.forEach((img, index) => {
        const speed = (index + 1) * 0.2; // slightly different speed for each
        img.style.transform = `translateY(${scrollY * speed * 0.1}px)`;
    });
});

// USED CHATGPT 4 THIS

