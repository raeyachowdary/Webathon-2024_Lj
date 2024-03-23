document.addEventListener('DOMContentLoaded', function () {
    const ratings = document.querySelectorAll('.rating');

    ratings.forEach(rating => {
        const ratingValue = parseInt(rating.dataset.rating);
        for (let i = 0; i < 5; i++) {
            const star = document.createElement('span');
            star.innerHTML = '&#9733;'; // Unicode for star character
            if (i < ratingValue) {
                star.classList.add('rated');
            }
            rating.appendChild(star);
        }
    });
});