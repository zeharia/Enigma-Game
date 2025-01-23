const timerElement = document.getElementById('timer');
let elapsedTime = 0;
setInterval(() => {
    elapsedTime++;
    timerElement.textContent = `TIMER : ${elapsedTime} s`;
}, 1000);

function showEnigma(number) {
    document.querySelectorAll('.enigmas').forEach(enigma => {
        enigma.style.display = 'none';
    });
    const currentEnigma = document.getElementById(`enigma-${number}`);
    currentEnigma.style.display = 'block';
}

// Enigma 1
const input = document.getElementById('mirror-input');
const button1 = document.querySelector('.btn-enigma1');
const valid1 = document.querySelector('.enigma-1-succes');
const error1 = document.querySelector('.enigma-1-error');
const nextBtn = document.querySelector('#enigma-1 .nextBtn');
const help1=document.getElementById('help-1');

function checkWord() {
    button1.addEventListener('click', () => {
        if (input.value.toLowerCase() === 'javascript') {
            valid1.style.display = 'block';
            error1.style.display = 'none';
            input.style.border = "2px solid green";
            nextBtn.style.display = 'block';
        } else {
            error1.style.display = 'block';
            valid1.style.display = 'none';
            input.style.border = "2px solid red";
        }
    });
}
checkWord();


// Enigma 2
const enigma2Image = document.querySelector('.enigma-image');
const reveal = document.querySelector('.success-message');
const enigma2Container = document.querySelector('#enigma-2');
const help2=document.getElementById('help-2');
let count = 0;
let isHidden = false;
let foundImage = false;

const textCounter = document.createElement('p');
textCounter.id = 'clickCount';
textCounter.textContent = `Number of clicks: ${count}`;
enigma2Container.appendChild(textCounter);

function searchImage() {
    enigma2Image.addEventListener('click', enigma2ClickHandler);
    document.addEventListener('click', clickCounter);
    function enigma2ClickHandler() {
        if (!isHidden) {
            enigma2Image.classList.add('hidden');
            isHidden = true;

            const hiddenText = document.createElement('p');
            hiddenText.textContent = 'Oops, something happened! Help me to find my Favorite Language';
            hiddenText.style.color = 'red';
            hiddenText.style.fontSize = '50px';
            hiddenText.classList.add('help-text');

            enigma2Container.appendChild(hiddenText);
        } else {
            enigma2Image.classList.remove('hidden');
            enigma2Image.classList.add('reveal');
            isHidden = false;

            if (reveal) reveal.style.display = 'block';

            const helpText = document.querySelector('.help-text');
            if (helpText) helpText.remove();

            const nextBtn = document.querySelector('#enigma-2 .nextBtn');
            if (nextBtn) nextBtn.style.display = 'block';

            foundImage = true;

            enigma2Image.removeEventListener('click', enigma2ClickHandler);

            document.removeEventListener('click', clickCounter);
        }
    }
    function clickCounter() {
        if (!foundImage && isHidden === true) {
            count++;
            textCounter.textContent = `Number of clicks: ${count}`;
        }
    }
}
searchImage();



// Enigma 3
const correctColor = ['BLUE', 'RED', 'GREEN', 'RED'];
const message3 = document.querySelector('#enigma-3 .message');
const body = document.querySelector('body');
const buttons = document.querySelectorAll('.button');
const help3=document.getElementById('help-3');
let currentColor = [];
let isValid = false;

function areArraysEqual(arr1, arr2) {
    return JSON.stringify(arr1) === JSON.stringify(arr2);
}
function checkColor() {
    buttons.forEach(button => {
        button.addEventListener('click', (e) => {
            if (isValid) return;

            currentColor.push(e.target.innerText);
            body.style.backgroundColor = e.target.innerText.toLowerCase();

            if (currentColor.length === correctColor.length) {
                let intervalId;
                if (areArraysEqual(currentColor, correctColor)) {
                    message3.textContent = 'You win!';
                    message3.style.color = 'green';
                    message3.style.fontSize = '50px';
                    document.querySelector('#enigma-3 .nextBtn').style.display = 'block';

                    let isYellow = true;
                    intervalId = setInterval(() => {
                        body.style.backgroundColor = isYellow ? 'yellow' : 'white';
                        isYellow = !isYellow;
                    }, 300);

                    setTimeout(() => {
                        clearInterval(intervalId);
                        body.style.backgroundColor = '';
                    }, 2000);

                    isValid = true;
                } else {
                    message3.textContent = 'You lose!';
                    message3.style.color = 'red';
                    message3.style.fontSize = '50px';
                }

                setTimeout(() => {
                    if (intervalId) clearInterval(intervalId);
                    currentColor = [];
                    message3.textContent = '';
                    body.style.backgroundColor = '';
                }, 2000);
            }
        });
    });
}
checkColor();


// Enigma 4
const validCode = [3, 15, 4, 5];
let currentCode = [];
const buttonNext = document.querySelector('.nextBtn');
const lastButton=document.getElementById('lastButton');
const message = document.querySelector('.message');
const gameContainer = document.querySelector('.game-container');
const inputs = document.querySelectorAll('.inputs');
const help4=document.getElementById('help-4');

function checkCode() {
    inputs.forEach((input) => {
        input.addEventListener('change', (e) => {
            let inputValue = e.target.value;
            currentCode.push(Number(inputValue));
            if (currentCode.length === validCode.length) {
                if (areArraysEqual(currentCode, validCode)) {
                    lastButton.style.display = 'block';
                    message.textContent = 'You Win!';
                    message.style.color = 'green';
                    gameContainer.appendChild(message);
                } else {
                    message.style.color = 'red';
                    message.textContent = 'You Lose';
                    gameContainer.appendChild(message);
                    setTimeout(() => {
                        currentCode = [];
                        inputs.forEach(input => {
                            input.value = '';
                        });
                        message.textContent = '';
                    }, 2000);
                }
            }
        });
    });
}
checkCode();

const hints = {
    // Enigma 1 - The Mirror
    help1: () => {
        const helpText = [
            "Hint 1: Look at the text as if it were in a mirror",
            "Hint 2: Try reading the text from right to left",
            "Hint 3: It's a very popular programming language"
        ];
        return helpText[Math.floor(Math.random() * helpText.length)];
    },

    // Enigma 2 - Find Me If You Can
    help2: (clickCount) => {
        if (clickCount < 5) {
            return "Hint 1: The image is hidden somewhere on the screen...";
        } else if (clickCount < 10) {
            return "Hint 2: Look towards the top of the screen, the answer is above you!";
        } else if (clickCount < 15) {
            return "Hint 3: The image likes the right side of the screen... Look over there!";
        } else if (clickCount < 20) {
            return "Hint 4: Getting warmer! It's in the top right corner!";
        } else if (clickCount < 25) {
            return "Hint 5: Click at the very top right of the screen, you're almost there!";
        } else {
            return "Final Hint: The image is hidden in the last 100 pixels of the top right corner. Click there!";
        }
    },

    // Enigma 3 - Color Code
    help3: () => {
        const helpText = [
            "Hint 1: The sequence contains exactly 4 colors",
            "Hint 2: Start with the color that represents the sky",
            "Hint 3: One of the colors appears twice in the sequence",
            "Hint 4: The color red is important, it comes back often",
            "Hint 5: Think: BLUE, RED, GREEN, ..."
        ];
        return helpText[Math.floor(Math.random() * helpText.length)];
    },

    // Enigma 4 - Crack the Code
    help4: () => {
        const helpText = [
            "Hint 1: Look carefully at the word 'code' in red",
            "Hint 2: Each letter has a position in the alphabet",
            "Hint 3: A=1, B=2, C=3, D=4, E=5...",
            "Hint 4: The code uses the position of each letter in the word 'CODE'",
            "Hint 5: C is the 3rd letter of the alphabet..."
        ];
        return helpText[Math.floor(Math.random() * helpText.length)];
    }
};

// Function to add help buttons
function addHelpButtons() {
    document.querySelectorAll('.enigmas').forEach((enigma, index) => {
        const helpBtn = document.createElement('button');
        helpBtn.textContent = "Need Help?";
        helpBtn.classList.add('help-button');
        
        helpBtn.onclick = () => {
            const helpId = `help-${index + 1}`;
            const helpElement = document.getElementById(helpId);
            
            if (helpElement) {
                // Special case for enigma 2 which uses click count
                if (index + 1 === 2) {
                    const clickCount = parseInt(document.getElementById('clickCount')?.textContent.match(/\d+/) || 0);
                    helpElement.textContent = hints.help2(clickCount);
                } else {
                    helpElement.textContent = hints[`help${index + 1}`]();
                }
                
                helpElement.style.color = '#666';
                helpElement.style.fontStyle = 'italic';
                helpElement.style.padding = '10px';
                helpElement.style.backgroundColor = '#f0f0f0';
                helpElement.style.borderRadius = '5px';
                helpElement.style.margin = '10px 0';
            }
        };
        
        enigma.appendChild(helpBtn);
    });
}

// Call function after DOM loads
document.addEventListener('DOMContentLoaded', addHelpButtons);