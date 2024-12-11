// helper functions to handle styling / positioning
function vh(percent) {
    const h = Math.max(
        document.documentElement.clientHeight,
        window.innerHeight || 0,
    );
    return (percent * h) / 100;
}

function vw(percent) {
    const w = Math.max(
        document.documentElement.clientWidth,
        window.innerWidth || 0,
    );
    return (percent * w) / 100;
}

function vmin(percent) {
    return Math.min(vh(percent), vw(percent));
}

function vmax(percent) {
    return Math.max(vh(percent), vw(percent));
}

// CSS STYLES
const MARK_CSS_STYLE = `
        mark {
            background: yellow;
            color: black;
        }
        .searchbar {
            position: fixed;
            padding-left: 24px;
            padding-bottom: 10px;
            right: 0;
            left: 0;
            z-index: 1030;
            display: flex;
            align-items: center;
            background-color: white;
            top: 0;
            height: 10vh;
        }
        .searchbar input {
            font-size: 25pt;
            height: 6vw;
            width: 24vw;
        }
        .searchbar button {
            font-size: 25pt;
            height: 6vw;
            width: 12vw;
        }
        main {
            padding-top: 8vh;
            padding-bottom: 40vh;
        }
        @media (orientation: landscape) {
            .searchbar input {
                font-size: 25pt;
                height: 3vw;
                width: 10vw;
            }
            .searchbar button {
                font-size: 25pt;
                height: 3vw;
                width: 8vw;
            }
        }
        @media (min-width : 150px) and (max-width: 280px) and (orientation:portrait) {
            .searchbar input {
                font-size: 8pt;
            }
            .searchbar button {
                font-size: 6pt;
            }
        }
        @media (min-width : 280px) and (max-width: 400px) and (orientation:portrait) {
            .searchbar input {
                font-size: 8pt;
            }
            .searchbar button {
                font-size: 8pt;
            }
        }
        @media (min-width : 400px) and (max-width: 700px) and (orientation:portrait) {
            .searchbar input {
                font-size: 14pt;
            }
            .searchbar button {
                font-size: 14pt;
            }
        }
        @media (min-height : 250px) and (max-height: 700px) and (orientation:landscape) {
            .searchbar input {
                height: 50px;
                width: 175px;
            }
            .searchbar button {
                height: 50px;
                width: 98px;
            }
        }
        @media (min-height : 700px) and (max-height: 1100px) and (orientation:landscape) {
            .searchbar input {
                height: 50px;
                width: 220px;
            }
            .searchbar button {
                height: 50px;
                width: 120px;
            }
        }
        @media only screen and (min-device-height : 350px) and (max-device-height: 500px) and (orientation:landscape) and (min-resolution: 2dppx){
            .searchbar input {
                font-size: 14pt;
                height: 4vw;
                width: 14vw;
            }
            .searchbar button {
                font-size: 14pt;
                height: 4vw;
                width: 8vw;
            }
        }
        @media only screen and (min-device-height : 350px) and (max-device-height: 500px) and (max-device-width: 700px) and (orientation:landscape) and (min-resolution: 2dppx){
            .searchbar input {
                font-size: 8pt;
            }
            .searchbar button {
                font-size: 8pt;
            }
        }
        `;
const currentStyle =
    window.document.head?.getElementsByTagName('style')?.[0] ??
    window.document.createElement('style');
currentStyle.innerHTML = currentStyle.innerHTML + MARK_CSS_STYLE;
window.document.head.append(currentStyle);

// Mark and Search logic
const context = document.getElementById('mainElement');
const instance = new Mark(context);
const searchText = document.getElementById('search');
const previousButton = document.getElementById('previousBtn');
const nextButton = document.getElementById('nextBtn');
let elementList;
let iterator = -1;

if (context && searchText && previousButton && nextButton) {
    context.addEventListener('click', () => {
        document.activeElement.blur();
    });

    searchText.addEventListener(
        'click',
        () => {
            if (searchText.value === 'Search') {
                searchText.value = '';
                searchText.style.color = '#000000';
            }
        },

        {
            once: true,
        },
    );

    searchText.oninput = function() {
        if (searchText.value.length) {
            instance.unmark();
            elementList = [];

            instance.mark(searchText.value, {
                each: domElement => {
                    elementList.push(domElement);
                },
            });
        } else {
            instance.unmark();
            elementList = [];
            iterator = -1;
        }
    };

    previousButton.addEventListener('click', () => {
        if (elementList.length) {
            if (elementList?.[iterator]) {
                elementList[iterator].style.border = '0px';
                elementList[iterator].style.backgroundColor = 'yellow';
            }

            iterator--;

            if (iterator < 0) {
                iterator = elementList.length - 1;
            }

            if (iterator >= elementList.length) {
                iterator = 0;
            }

            const yOffset = -vh(10.2);

            elementList[iterator].style.border = '1px solid black';
            elementList[iterator].style.backgroundColor = '#FFAC1C';
            const y =
                elementList[iterator].getBoundingClientRect().top +
                window.pageYOffset +
                yOffset;

            window.scrollTo({
                top: y,
                behavior: 'smooth',
            });
        }
    });

    nextButton.addEventListener('click', () => {
        if (elementList.length) {
            if (elementList?.[iterator]) {
                elementList[iterator].style.border = '0px';
                elementList[iterator].style.backgroundColor = 'yellow';
            }

            iterator++;

            if (iterator < 0) {
                iterator = elementList.length - 1;
            }

            if (iterator >= elementList.length) {
                iterator = 0;
            }

            const yOffset = -vh(10.2);
            elementList[iterator].style.border = '1px solid black';
            elementList[iterator].style.backgroundColor = '#FFAC1C';
            const y =
                elementList[iterator].getBoundingClientRect().top +
                window.pageYOffset +
                yOffset;

            window.scrollTo({
                top: y,
                behavior: 'smooth',
            });
        }
    });
}
