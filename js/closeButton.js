class CloseButtonHandler {
    constructor() {
        this.init();
    }

    init() {
        const closeButton = document.querySelector('.close-button');
        if (closeButton) {
            closeButton.addEventListener('click', () => this.handleClose());
        }
    }

    handleClose() {
        const urlSearchParams = new URLSearchParams(window.location.search);
        const params = Object.fromEntries(urlSearchParams.entries());
        const parentUrl = params?.parentUrl;

        if (window.parent && parentUrl) {
            window.parent.postMessage({type: 'closeRulesFrame'}, parentUrl);
            return;
        }
        window.close();
    }
}

// Initialize when document is ready
document.addEventListener('DOMContentLoaded', () => {
    new CloseButtonHandler();
});