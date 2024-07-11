const correctPassword = '3842';
let attempts = 3;
let input = '';
const boxes = ['box1', 'box2', 'box3', 'box4'];

document.querySelectorAll('.key').forEach(key => {
    key.addEventListener('click', () => {
        if (input.length < 4) {
            input += key.textContent;
            document.getElementById(boxes[input.length - 1]).textContent = key.textContent;
        }
        if (input.length === 4) {
            // Add a small delay to allow the fourth box to update
            setTimeout(() => {
                const lockState = document.getElementById('lock-state');
                if (input === correctPassword) {
                    lockState.classList.remove('before');
                    lockState.classList.add('after');
                } else {
                    attempts--;
                    document.getElementById('attempts').textContent = attempts;
                    if (attempts === 0) {
                        document.getElementById('popup').classList.remove('hidden');
                        document.getElementById('main-content').classList.add('blur');
                    } else {
                        input = '';
                        boxes.forEach(box => document.getElementById(box).textContent = '');
                    }
                }
            }, 100); // 100 milliseconds delay
        }
    });
});

document.getElementById('close-popup').addEventListener('click', () => {
    document.getElementById('popup').classList.add('hidden');
    document.getElementById('main-content').classList.remove('blur');
    document.getElementById('main-content2').classList.remove('blur');
    document.getElementById('main-content3').classList.remove('blur');
    
});
