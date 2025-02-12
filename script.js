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

// Функция для создания одного падающего сердца сверху
function createFallingHeart() {
    const heart = document.createElement('div');
    heart.classList.add('heart');
    heart.innerHTML = '❤️';

    // Сердце появляется **в случайном месте по горизонтали**
    heart.style.left = `${Math.random() * 100}vw`;
    heart.style.top = `-50px`;

    // Разная скорость падения (3 - 6 секунд)
    heart.style.animationDuration = `${Math.random() * 3 + 3}s`;

    document.body.appendChild(heart);

    // Удаляем сердце после его падения
    setTimeout(() => heart.remove(), 6000);

    // Запускаем следующее сердце **через случайный интервал**
    setTimeout(() => {
        requestAnimationFrame(createFallingHeart);
    }, Math.random() * 150 + 50); // От 50 до 200 мс
}

// Функция для изменения текста при клике
function changeText(event) {
    const textElement = document.createElement('div');
    textElement.classList.add('text');
    textElement.textContent = heartText[textIndex];

    // Позиционирование текста на месте клика
    textElement.style.left = `${event.clientX - 50}px`;
    textElement.style.top = `${event.clientY - 30}px`;

    document.body.appendChild(textElement);
    
    // Переход к следующему тексту
    textIndex = (textIndex + 1) % heartText.length;

    // Плавное исчезновение текста через 1.5 секунды
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

    // Запуск музыки при первом клике, если она еще не начала играть
    if (!musicStarted) {
        const audio = document.getElementById('background-music');
        audio.play();
        musicStarted = true;
    }
});

// Запускаем первое сердце
createFallingHeart();
