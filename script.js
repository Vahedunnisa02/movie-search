const form = document.querySelector('form');
const gallery = document.querySelector('.image-container');
const searchInput = form.querySelector('.search-input');
let timeoutId;

// Debouncing the search input
searchInput.addEventListener('input', () => {
    clearTimeout(timeoutId); // Clear the previous timeout
    timeoutId = setTimeout(() => {
        let query = searchInput.value.trim();
        if (query === '') {
            query = 'nothing';
        }
        tvMazeApi(query);
    }, 500); // Set the delay to 500ms (adjust as needed)
});

async function tvMazeApi(query) {
    const res = await fetch(`https://api.tvmaze.com/search/shows?q=${query}`);
    const shows = await res.json();
    
    makeImages(shows);
}

function makeImages(shows) {
    gallery.innerHTML = ''; // Clear the gallery before appending new images
    for (let show of shows) {
        if (show.show.image) {
            const img = document.createElement('img');
            img.src = show.show.image.medium;
            gallery.append(img);
        }
    }
}