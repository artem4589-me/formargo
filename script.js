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

// Функция скрытия всего и появления анимированного сердца
function showBigHeart() {
    document.body.innerHTML = ''; // Удаляем всё кроме музыки
    const heartCanvas = document.createElement('canvas');
    heartCanvas.id = "heartCanvas";
    document.body.appendChild(heartCanvas);

    // Настраиваем холст
    const canvas = document.getElementById("heartCanvas");
    const ctx = canvas.getContext("2d");
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;

    let t = 0;

    function drawHeart() {
        ctx.clearRect(0, 0, canvas.width, canvas.height);

        ctx.strokeStyle = `hsl(${(t * 2) % 360}, 100%, 70%)`;
        ctx.lineWidth = 2;
        ctx.beginPath();

        for (let i = 0; i < 50; i++) {
            let angle = (i / 50) * Math.PI * 2;
            let x = 250 * Math.pow(Math.sin(angle), 3);
            let y = -250 * (0.8125 * Math.cos(angle) - 0.3125 * Math.cos(2 * angle) - 0.125 * Math.cos(3 * angle) - 0.0625 * Math.cos(4 * angle));
            ctx.lineTo(canvas.width / 2 + x, canvas.height / 2 + y);
        }

        ctx.closePath();
        ctx.stroke();

        t += 0.5;
        requestAnimationFrame(drawHeart);
    }

    drawHeart();
}

// Функция показа кнопки после последнего текста
function showButton() {
    if (buttonAdded) return;
    buttonAdded = true;

    const button = document.createElement('button');
    button.innerText = "Нажми на меня";
    button.classList.add('special-button');
    button.onclick = showBigHeart;
    document.body.appendChild(button);
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
