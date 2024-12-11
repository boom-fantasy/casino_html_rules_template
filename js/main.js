// Search functionality
document.addEventListener('DOMContentLoaded', function() {
    const searchBar = document.querySelector('.search-bar');
    if (searchBar) {
        searchBar.addEventListener('input', function(e) {
            const searchTerm = e.target.value.toLowerCase();
            // Add search logic here
            console.log('Searching for:', searchTerm);
        });
    }
}); 