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

// Функция создания падающего сердца
function createFallingHeart() {
    if (!heartsEnabled) return; // Остановить сердца, если нажата кнопка

    const heart = document.createElement('div');
    heart.classList.add('heart');
    heart.innerHTML = '❤️';

    heart.style.left = `${Math.random() * 100}vw`;
    heart.style.top = `-50px`;

    document.body.appendChild(heart);

    let startTime;
    function animateHeart(timestamp) {
        if (!startTime) startTime = timestamp;
        let progress = (timestamp - startTime) / 3000;

        if (progress < 1) {
            heart.style.transform = `translateY(${progress * 100}vh)`;
            requestAnimationFrame(animateHeart);
        } else {
            heart.remove();
        }
    }
    requestAnimationFrame(animateHeart);

    setTimeout(createFallingHeart, Math.random() * 150 + 50);
}

// Функция удаления сердец и начала рисования неонового сердца
function showBigHeart() {
    heartsEnabled = false; // Отключаем генерацию новых сердец
    document.querySelectorAll('.heart').forEach(heart => heart.remove()); // Удаляем уже созданные сердца
    document.body.innerHTML = ''; // Удаляем всё остальное

    // Создаём канвас
    const canvas = document.createElement('canvas');
    canvas.id = "heartCanvas";
    document.body.appendChild(canvas);

    const ctx = canvas.getContext("2d");
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;

    function drawHeart(x, y, size, color) {
        ctx.save();
        ctx.beginPath();
        let topCurveHeight = size * 0.3;
        ctx.moveTo(x, y + topCurveHeight);

        ctx.bezierCurveTo(
            x, y,
            x - size / 2, y,
            x - size / 2, y + topCurveHeight
        );

        ctx.bezierCurveTo(
            x - size / 2, y + (size + topCurveHeight) / 2,
            x, y + (size + topCurveHeight) / 2,
            x, y + size
        );

        ctx.bezierCurveTo(
            x, y + (size + topCurveHeight) / 2,
            x + size / 2, y + (size + topCurveHeight) / 2,
            x + size / 2, y + topCurveHeight
        );

        ctx.bezierCurveTo(
            x + size / 2, y,
            x, y,
            x, y + topCurveHeight
        );

        ctx.closePath();
        ctx.strokeStyle = color;
        ctx.lineWidth = 5;
        ctx.shadowColor = color;
        ctx.shadowBlur = 15;
        ctx.stroke();
        ctx.restore();
    }

    let t = 0;
    function animateHeart() {
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        let color = `hsl(${t % 360}, 100%, 70%)`;
        drawHeart(canvas.width / 2, canvas.height / 2 - 50, 200, color);
        t += 2;
        requestAnimationFrame(animateHeart);
    }

    animateHeart();
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

// Запускаем падающие сердца
createFallingHeart();

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
