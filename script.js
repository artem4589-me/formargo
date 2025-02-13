const heartText = [
    "Ты - мое сердце!",
    "Любовь, которая не исчезнет.",
    "Ты моя радость каждый день.",
    "Моя жизнь полна счастья с тобой.",
    "Ты - мой мир.",
    "Я так благодарен за тебя.",
    "Ты — моя навсегда.",
    "Твоя улыбка делает меня счастливым.",
    "Ты — моя звезда на этом свете.",
    "Каждый момент с тобой — это подарок.",
    "Ты — моя сила и моя слабость.",
    "Я люблю все в тебе.",
    "Ты — смысл моего существования.",
    "Я горжусь тем, что могу быть рядом с тобой.",
    "Ты — мой идеал.",
    "Без тебя мир был бы пустым.",
    "Я всегда буду поддерживать тебя.",
    "Ты — моя вдохновляющая муза.",
    "С тобой каждый день — это новый чудесный момент.",
    "Я не представляю своей жизни без тебя.",
    "Ты — самое красивое, что есть в моей жизни.",
    "Твои глаза — мое небо.",
    "Твоя душа такая нежная и светлая.",
    "Ты наполняешь меня смыслом и радостью.",
    "Ты — мой самый лучший друг и любимый человек.",
    "Каждая минута с тобой — это счастье."
];

let textIndex = 0;
let musicStarted = false;
let buttonAdded = false;
let heartsEnabled = true;

// Функция создания падающих сердец
function createFallingHeart() {
    if (!heartsEnabled) return;

    const heart = document.createElement('div');
    heart.classList.add('heart');
    heart.innerHTML = '❤️';

    let xPosition = Math.random() * 100;
    heart.style.left = `${xPosition}vw`;
    heart.style.top = `-50px`;

    document.body.appendChild(heart);

    let speed = Math.random() * 2 + 1;
    let position = -50;

    function animateHeart() {
        if (!heartsEnabled) {
            heart.remove();
            return;
        }
        position += speed;
        heart.style.transform = `translateY(${position}px)`;

        if (position < window.innerHeight) {
            requestAnimationFrame(animateHeart);
        } else {
            heart.remove();
        }
    }
    requestAnimationFrame(animateHeart);

    setTimeout(createFallingHeart, Math.random() * 200 + 50);
}

createFallingHeart();

// Функция показа кнопки после последнего текста
function showButton() {
    if (buttonAdded) return;
    buttonAdded = true;

    const button = document.createElement('button');
    button.innerText = "Нажми на меня";
    button.classList.add('special-button');
    button.onclick = startHeartAnimation;
    document.body.appendChild(button);
}

// Функция скрытия всех элементов и запуска анимации сердца
function startHeartAnimation() {
    heartsEnabled = false;
    document.querySelectorAll('.heart').forEach(heart => heart.remove());
    document.querySelectorAll('.text').forEach(text => text.remove());
    document.querySelector(".special-button").remove();

    // Запускаем отрисовку сердца
    drawAnimatedHeart();
}

// Функция анимации сердца
function drawAnimatedHeart() {
    const canvas = document.createElement("canvas");
    document.body.appendChild(canvas);
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
    const ctx = canvas.getContext("2d");

    ctx.fillStyle = "black";
    ctx.fillRect(0, 0, canvas.width, canvas.height);

    ctx.strokeStyle = "red";
    ctx.lineWidth = 2;

    function heartFunction(n) {
        let x = 16 * Math.pow(Math.sin(n), 3);
        let y = 13 * Math.cos(n) - 5 * Math.cos(2 * n) - 2 * Math.cos(3 * n) - Math.cos(4 * n);
        return { x, y };
    }

    function drawHeart() {
        ctx.translate(canvas.width / 2, canvas.height / 2);
        ctx.scale(15, -15); // Масштаб и отражение по оси Y

        for (let i = 0; i < 15; i++) {
            ctx.beginPath();

            for (let n = 0; n <= Math.PI * 2; n += 0.1) {
                let { x, y } = heartFunction(n);
                let newX = x * i;
                let newY = y * i;

                if (n === 0) {
                    ctx.moveTo(newX, newY);
                } else {
                    ctx.lineTo(newX, newY);
                }
            }

            ctx.stroke();
        }
    }

    drawHeart();
}

// Функция изменения текста при клике
function changeText(event) {
    if (textIndex >= heartText.length) return;

    const textElement = document.createElement('div');
    textElement.classList.add('text');
    textElement.textContent = heartText[textIndex];

    textElement.style.left = `${event.clientX - 50}px`;
    textElement.style.top = `${event.clientY - 30}px`;

    document.body.appendChild(textElement);

    textIndex++;

    if (textIndex === heartText.length) {
        setTimeout(showButton, 1000);
    }

    setTimeout(() => textElement.style.opacity = 0, 1500);
    setTimeout(() => textElement.remove(), 2000);
}

// Слушаем клик по экрану, чтобы менять текст
document.body.addEventListener('click', (event) => {
    const initialText = document.getElementById('text');
    if (initialText) {
        initialText.style.display = 'none';
    }

    changeText(event);

    if (!musicStarted) {
        const audio = document.getElementById('background-music');
        audio.play();
        musicStarted = true;
    }
});
