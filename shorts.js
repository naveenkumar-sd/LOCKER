let attempts = 5;
let input = '';
const boxes = ['box1', 'box2', 'box3', 'box4'];

const timerElement = document.getElementById('timer');
timerElement.classList.add('hide');
const timerbgElement = document.getElementById('timerbg');
timerbgElement.classList.add('hide2');
const bg3=document.getElementById('color3bg');


let countdown;

document.querySelectorAll('.key').forEach(key => {
    key.addEventListener('click', () => {
        // Add the transparent effect class
        key.classList.add('transparent');
        
        // Remove the class after the transition duration
        setTimeout(() => {
            key.classList.remove('transparent');
        }, 500); // Duration should match the CSS transition duration

        if (input.length < 4) {
            input += key.textContent;
            document.getElementById(boxes[input.length - 1]).textContent = key.textContent;
        }
        if (input.length === 4) {
            setTimeout(() => {
                const lockState = document.getElementById('lock-state');
                const currentTimePassword = getCurrentTimePassword();

                if (input === currentTimePassword) {
                    lockState.classList.remove('before');
                    lockState.classList.add('after');

                    bg3.classList.remove('before');
                    bg3.classList.add('after');
                    
                    // Hide the timer elements
                    timerElement.classList.add('hide');
                    timerbgElement.classList.add('hide2');
                    
                    // Stop the timer
                    clearInterval(countdown);
                    
                    // Show the lock state change after 3 seconds
                    setTimeout(() => {
                        document.getElementById('opened').classList.remove('hidden');
                    }, 3000);

                } else {
                    attempts--;
                    document.getElementById('attempts').textContent = attempts;

                    if (attempts === 1) {
                        setTimeout(startTimer, 5000); // Start the timer after 5 seconds
                    }
                    
                    if (attempts === 0) {
                        document.getElementById('popup').classList.remove('hidden');
                        document.getElementById('main-content').classList.add('blur');
                        timerElement.classList.add('hide');
                    } else {
                        input = '';
                        boxes.forEach(box => document.getElementById(box).textContent = '');
                    }

                    // Change the text to "REMAINING ATTEMPTS" after the first failed attempt
                    if (attempts < 5) {
                        document.querySelector('.attempts').innerHTML = `REMAINING - &nbsp<span id="attempts">${attempts}</span>`;
                    }
                }
            }, 100);
        }
    });
});

document.getElementById('close-popup').addEventListener('click', () => {
    document.getElementById('popup').classList.add('hidden');
    document.getElementById('main-content').classList.remove('blur');
});

function startTimer() {
    let timeLeft = 30;
    timerElement.textContent = formatTime(timeLeft);
    timerElement.classList.remove('hide');
    timerbgElement.classList.remove('hide2');
    
    countdown = setInterval(() => {
        timeLeft--;
        timerElement.textContent = formatTime(timeLeft);
        if (timeLeft <= 0) {
            clearInterval(countdown);
            document.getElementById('popup').classList.remove('hidden');
            document.getElementById('main-content').classList.add('blur');
            timerElement.classList.add('hide');
        }
    }, 1000);
}

function formatTime(time) {
    return time < 10 ? ' ' + time : time;
}

function getCurrentTimePassword() {
    const now = new Date();
    const hours = now.getHours().toString().padStart(2, '0');
    const minutes = now.getMinutes().toString().padStart(2, '0');
    return hours + minutes;
}
