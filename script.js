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
let buttonAdded = false; // Флаг, чтобы кнопка не появлялась дважды

// Функция создания падающего сердца
function createFallingHeart() {
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

// Функция показа кнопки после последнего текста
function showButton() {
    if (buttonAdded) return; // Если кнопка уже добавлена, ничего не делаем
    buttonAdded = true;

    const button = document.createElement('button');
    button.innerText = "Нажми на меня";
    button.classList.add('special-button');
    button.onclick = showBigHeart;
    document.body.appendChild(button);
}

// Функция анимации большого космического сердца
function showBigHeart() {
    const bigHeart = document.createElement('div');
    bigHeart.classList.add('big-heart');
    document.body.appendChild(bigHeart);
}

// Функция изменения текста при клике
function changeText(event) {
    if (textIndex >= heartText.length) return; // Если все фразы закончились, не делаем ничего

    const textElement = document.createElement('div');
    textElement.classList.add('text');
    textElement.textContent = heartText[textIndex];

    textElement.style.left = `${event.clientX - 50}px`;
    textElement.style.top = `${event.clientY - 30}px`;

    document.body.appendChild(textElement);

    textIndex++;

    // Если это последняя фраза, показать кнопку
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

// Запускаем первое сердце
createFallingHeart();
