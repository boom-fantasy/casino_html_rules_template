class LanguageHandler {
    constructor() {
        this.defaultLanguage = 'en';
        this.supportedLanguages = ['en', 'es', 'pt-br']; // Add all supported languages here
        this.init();
    }

    init() {
        // Get language from URL parameter
        const urlParams = new URLSearchParams(window.location.search);
        const langParam = urlParams.get('lang');
        
        // Validate and load the appropriate language
        const language = this.validateLanguage(langParam);
        this.loadLanguage(language);
    }

    validateLanguage(lang) {
        // Check if the language parameter is supported
        if (lang && this.supportedLanguages.includes(lang.toLowerCase())) {
            return lang.toLowerCase();
        }
        return this.defaultLanguage;
    }

    async loadLanguage(lang) {
        try {
            const response = await fetch(`../languages/${lang}.html`);
            if (!response.ok) {
                throw new Error(`Language ${lang} not found`);
            }
            const content = await response.text();
            
            const mainContent = document.getElementById('mainContent');
            mainContent.innerHTML = content;
            
            // Reinitialize search functionality after content change
            if (window.markInstance) {
                window.markInstance.unmark();
            }
            window.markInstance = new Mark(mainContent);
            
        } catch (error) {
            console.error('Error loading language:', error);
            // If there's an error, try loading the default language
            if (lang !== this.defaultLanguage) {
                console.log('Falling back to default language');
                this.loadLanguage(this.defaultLanguage);
            }
        }
    }
}

// Initialize language handler when document is ready
document.addEventListener('DOMContentLoaded', () => {
    window.languageHandler = new LanguageHandler();
});
