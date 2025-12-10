// const container = document.querySelector('.newsContainer')

// function api() {
//     fetch(`https://api.currentsapi.services/v1/latest-news?apiKey=8QBBSLtatges1wqMydCjYXWhoMAFsQFVQ5R2qnfXggwshb-b`)
//         .then(res => res.json())
//         .then(data => createCard(data.news))
//         .catch(err=> console.log(err));
// }
// document.addEventListener("DOMContentLoaded", () => {
//     api();
// });


// function createCard(newsArray) {
//     container.innerHTML = '';
//     newsArray.forEach(news => {
//         const card = document.createElement("article");
//         card.className = "news-card";

//         card.innerHTML = `
//             <h1 class="news-title">${news.title}</h1>

//             ${news.image ? `<img src="${news.image}" class="news-img" style="width:100%; border-radius:10px; margin:10px 0;">` : ""}

//             <p class="meta">
//                 short by <span>${news.author || "Unknown"}</span>
//                 / ${new Date(news.published).toLocaleString()}
//             </p>

//             <p class="news-body">${news.description || "No description available"}</p>

//             <p class="category">Category: ${news.category ? news.category[0] : "General"}</p>

//             <p class="read-more">
//                 <a href="${news.url}" target="_blank">Read More</a>
//             </p>
//         `;

//         container.appendChild(card);
//     });
// }


const container = document.querySelector('#newsContainer');
const categories = document.querySelectorAll('.nav-links a'); // category menu

const API_KEY = "8QBBSLtatges1wqMydCjYXWhoMAFsQFVQ5R2qnfXggwshb-b";

// Show loading animation
function showLoader() {
    container.innerHTML = `
        <div class="loader">Fetching latest news...</div>
    `;
}

// Time ago function
function timeAgo(date) {
    const seconds = Math.floor((new Date() - new Date(date)) / 1000);
    const intervals = [
        { label: "year", seconds: 31536000 },
        { label: "month", seconds: 2592000 },
        { label: "day", seconds: 86400 },
        { label: "hour", seconds: 3600 },
        { label: "minute", seconds: 60 },
    ];

    for (const interval of intervals) {
        const count = Math.floor(seconds / interval.seconds);
        if (count > 1) return `${count} ${interval.label}s ago`;
        if (count === 1) return `${count} ${interval.label} ago`;
    }
    return "just now";
}

// Fetch API
function api(category = "") {
    showLoader();

    let url = `https://api.currentsapi.services/v1/latest-news?apiKey=${API_KEY}`;
    if (category) url = `https://api.currentsapi.services/v1/search?keywords=${category}&apiKey=${API_KEY}`;

    fetch(url)
        .then(res => res.json())
        .then(data => createCards(data.news))
        .catch(() => showError());
}

// Show error message
function showError() {
    container.innerHTML = `
        <div class="error-msg">Failed to load news. Please try again later.</div>
    `;
}

// Placeholder fallback image (when API image missing)
const fallbackImage = "https://images.unsplash.com/photo-1504712598893-24159a89200e?w=1200";

function createCards(newsArray) {
    container.innerHTML = '';

    newsArray.forEach(news => {
        if (!news.title || !news.description) return;

        const imageUrl = news.image && news.image.trim() !== "" ? news.image : fallbackImage;

        const card = document.createElement("article");
        card.className = "news-card fade";

        card.innerHTML = `
            <h1 class="news-title">${news.title}</h1>

            <img src="${imageUrl}" class="news-img" alt="News Image">

            <p class="meta">
                By <span>${news.author || "Unknown"}</span> · ${timeAgo(news.published)}
            </p>

            <p class="news-body">${news.description}</p>

            <p class="category">🗂 ${news.category ? news.category[0] : "General"}</p>

            <p class="read-more">
                <a href="${news.url}" target="_blank">Read More</a>
            </p>
        `;

        container.appendChild(card);
    });
}

// Auto replace broken images
document.addEventListener("error", function (e) {
    if (e.target.tagName === "IMG") {
        e.target.src = fallbackImage;
    }
}, true);


// Dropdown filter
document.querySelector("#categorySelect").addEventListener("change", (e) => {
    const category = e.target.value;
    api(category);
});

// Load Breaking News on Page Load
document.addEventListener("DOMContentLoaded", () => {
    api();
});
