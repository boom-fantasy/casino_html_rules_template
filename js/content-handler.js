class ContentHandler {
    constructor() {
        this.defaultLanguage = 'en';
        this.supportedLanguages = ['en', 'es', 'pt-br'];
        this.params = this.getUrlParams();
        this.init();
    }

    getUrlParams() {
        const urlParams = new URLSearchParams(window.location.search);
        return {
            lang: this.validateLanguage(urlParams.get('lang')),
            rtp: urlParams.get('rtp') || '95.0', // Default RTP if not provided
            // Add other dynamic parameters here
        };
    }

    validateLanguage(lang) {
        if (lang && this.supportedLanguages.includes(lang.toLowerCase())) {
            return lang.toLowerCase();
        }
        return this.defaultLanguage;
    }

    init() {
        this.loadLanguage(this.params.lang);
    }

    async loadLanguage(lang) {
        try {
            const response = await fetch(`languages/${lang}.html`);
            if (!response.ok) {
                throw new Error(`Language ${lang} not found`);
            }
            const content = await response.text();
            
            const mainContent = document.getElementById('mainContent');
            
            // Create a temporary div to parse and update the HTML
            const tempDiv = document.createElement('div');
            tempDiv.innerHTML = content;
            
            // Replace all placeholders
            this.replacePlaceholders(tempDiv);
            
            // Update the main content
            mainContent.innerHTML = tempDiv.innerHTML;
            
            // Reinitialize search functionality
            if (window.markInstance) {
                window.markInstance.unmark();
            }
            window.markInstance = new Mark(mainContent);
            
        } catch (error) {
            console.error('Error loading language:', error);
            if (lang !== this.defaultLanguage) {
                console.log('Falling back to default language');
                this.loadLanguage(this.defaultLanguage);
            }
        }
    }

    replacePlaceholders(element) {
        const walker = document.createTreeWalker(
            element,
            NodeFilter.SHOW_TEXT,
            null,
            false
        );

        let node;
        while (node = walker.nextNode()) {
            node.textContent = node.textContent.replace(
                /\{\{(\w+)\}\}/g,
                (match, key) => this.params[key] || match
            );
        }
    }
}

// Initialize when document is ready
document.addEventListener('DOMContentLoaded', () => {
    window.contentHandler = new ContentHandler();
}); 