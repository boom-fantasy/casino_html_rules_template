// Search functionality
document.addEventListener('DOMContentLoaded', function() {
    const searchBar = document.querySelector('.search-bar');
    const prevButton = document.getElementById('prevButton');
    const nextButton = document.getElementById('nextButton');
    const mainContent = document.querySelector('main');
    const searchToggle = document.querySelector('.search-toggle');
    const searchContainer = document.querySelector('.search-container');

    // Search toggle functionality
    if (searchToggle && searchContainer) {
        searchToggle.addEventListener('click', function() {
            searchToggle.classList.toggle('active');
            searchContainer.classList.toggle('active');
            if (searchContainer.classList.contains('active')) {
                searchBar.focus();
            }
        });
    }

    // Initialize mark.js
    const markInstance = new Mark(mainContent);
    let currentIndex = -1;
    let searchResults = [];

    if (searchBar) {
        // Clear default placeholder on focus
        searchBar.addEventListener('focus', function() {
            if (this.value === 'Search') {
                this.value = '';
                this.style.color = '#FFFFFF';
            }
        });

        // Restore placeholder if empty on blur
        searchBar.addEventListener('blur', function() {
            if (this.value === '') {
                this.value = 'Search';
                this.style.color = '#666666';
            }
        });

        // Handle search input
        searchBar.addEventListener('input', function(e) {
            const searchTerm = e.target.value.toLowerCase();
            
            // Clear previous highlights
            markInstance.unmark();
            currentIndex = -1;
            searchResults = [];

            if (searchTerm && searchTerm !== 'search') {
                // Highlight matches
                markInstance.mark(searchTerm, {
                    separateWordSearch: true,
                    done: function(counter) {
                        searchResults = document.querySelectorAll('mark');
                        if (searchResults.length > 0) {
                            currentIndex = 0;
                            prevButton.disabled = false;
                            nextButton.disabled = false;
                            highlightCurrent();
                        } else {
                            prevButton.disabled = true;
                            nextButton.disabled = true;
                        }
                    }
                });
            } else {
                prevButton.disabled = true;
                nextButton.disabled = true;
            }
        });
    }

    // Navigation button click handlers
    if (prevButton) {
        prevButton.addEventListener('click', function() {
            if (searchResults.length > 0) {
                currentIndex = (currentIndex - 1 + searchResults.length) % searchResults.length;
                highlightCurrent();
            }
        });
    }

    if (nextButton) {
        nextButton.addEventListener('click', function() {
            if (searchResults.length > 0) {
                currentIndex = (currentIndex + 1) % searchResults.length;
                highlightCurrent();
            }
        });
    }

    // Helper function to highlight current search result
    function highlightCurrent() {
        if (searchResults.length > 0) {
            // Remove previous current highlight
            searchResults.forEach(el => {
                el.style.backgroundColor = 'rgba(0, 174, 239, 0.3)';
            });

            // Highlight current result
            const current = searchResults[currentIndex];
            current.style.backgroundColor = 'rgba(0, 174, 239, 0.6)';
            
            // Scroll into view
            current.scrollIntoView({
                behavior: 'smooth',
                block: 'center'
            });
        }
    }

    // Handle escape key to close search
    document.addEventListener('keydown', function(e) {
        if (e.key === 'Escape' && searchContainer.classList.contains('active')) {
            searchToggle.classList.remove('active');
            searchContainer.classList.remove('active');
        }
    });
}); 