document.addEventListener('DOMContentLoaded', function() {
    // Initialize theme from localStorage
    const savedTheme = localStorage.getItem('theme');
    if (savedTheme === 'dark') {
        document.body.classList.add('dark-mode');
    }

    // Initialize liked destinations from localStorage
    const likedDestinations = JSON.parse(localStorage.getItem('likedDestinations')) || [];
    updateLikeCount(likedDestinations.length);
    
    // Set initial state for like buttons
    const likeButtons = document.querySelectorAll('.like-button');
    likeButtons.forEach((button, index) => {
        if (likedDestinations.includes(index)) {
            button.classList.add('liked');
            button.textContent = '❤️ Liked';
        }
        
        // Add click event listener to like buttons
        button.addEventListener('click', function() {
            const buttonIndex = Array.from(likeButtons).indexOf(this);
            
            if (this.classList.contains('liked')) {
                // Unlike
                this.classList.remove('liked');
                this.textContent = '❤ Like';
                
                const destinationIndex = likedDestinations.indexOf(buttonIndex);
                if (destinationIndex > -1) {
                    likedDestinations.splice(destinationIndex, 1);
                }
            } else {
                // Like
                this.classList.add('liked');
                this.textContent = '❤️ Liked';
                
                // Add animation class
                this.style.animation = 'none';
                setTimeout(() => {
                    this.style.animation = 'pulse 0.4s';
                }, 10);
                
                if (!likedDestinations.includes(buttonIndex)) {
                    likedDestinations.push(buttonIndex);
                }
            }
            
            // Update localStorage and like count
            localStorage.setItem('likedDestinations', JSON.stringify(likedDestinations));
            updateLikeCount(likedDestinations.length);
        });
    });
    
    // Theme toggle functionality
    const themeButton = document.getElementById('theme-button');
    themeButton.addEventListener('click', function() {
        document.body.classList.toggle('dark-mode');
        
        // Save theme preference
        if (document.body.classList.contains('dark-mode')) {
            localStorage.setItem('theme', 'dark');
        } else {
            localStorage.setItem('theme', 'light');
        }
    });
});

// Function to update the liked count display
function updateLikeCount(count) {
    const likedCountElement = document.getElementById('liked-count');
    likedCountElement.textContent = count === 1 ? '1 destination liked' : `${count} destinations liked`;
}