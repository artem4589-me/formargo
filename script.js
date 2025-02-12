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

// Функция для создания сердца по месту клика
function createHeart(event) {
    const heart = document.createElement('div');
    heart.classList.add('heart');
    heart.innerHTML = '❤️';
    heart.style.left = `${event.clientX - 25}px`; // Позиционирование по оси X
    heart.style.top = `${event.clientY - 25}px`;  // Позиционирование по оси Y
    document.body.appendChild(heart);
    setTimeout(() => heart.remove(), 3000); // Удаляем сердце через 3 секунды
}

// Функция для изменения текста
function changeText() {
    const textElement = document.getElementById('text');
    textElement.textContent = heartText[textIndex];

    // Переход к следующему тексту
    textIndex = (textIndex + 1) % heartText.length;

    // Меняем прозрачность текста, чтобы эффект был плавным
    textElement.style.opacity = 1;
    setTimeout(() => {
        textElement.style.opacity = 0;
    }, 1500);
}

// Слушаем клик по экрану, чтобы создавать сердце и менять текст
document.body.addEventListener('click', (event) => {
    createHeart(event);
    changeText();
});

// Создаем сердца каждую секунду, чтобы они падали сверху
setInterval(() => {
    const heart = document.createElement('div');
    heart.classList.add('heart');
    heart.innerHTML = '❤️';
    heart.style.left = `${Math.random() * 100}%`;
    document.body.appendChild(heart);
    setTimeout(() => heart.remove(), 3000); // Удаляем сердце через 3 секунды
}, 1000);
