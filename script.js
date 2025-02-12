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
let musicStarted = false; // Переменная для отслеживания запуска музыки

// Функция для создания сердца по месту клика
function createHeart(event) {
    const heart = document.createElement('div');
    heart.classList.add('heart');
    heart.innerHTML = '❤️';
    document.body.appendChild(heart);
    setTimeout(() => heart.remove(), 3000); // Удаляем сердце через 3 секунды
}

// Функция для изменения текста
function changeText(event) {
    const textElement = document.createElement('div');
    textElement.classList.add('text');
    textElement.textContent = heartText[textIndex];

    // Позиционирование текста на месте клика
    textElement.style.left = `${event.clientX - 50}px`; // Позиция по оси X
    textElement.style.top = `${event.clientY - 30}px`;  // Позиция по оси Y

    document.body.appendChild(textElement);
    
    // Переход к следующему тексту
    textIndex = (textIndex + 1) % heartText.length;

    // Плавное исчезновение текста через 1.5 секунды
    setTimeout(() => textElement.style.opacity = 0, 2000);
    setTimeout(() => textElement.remove(), 2500); // Удаляем текст через 2 секунды
}

// Слушаем клик по экрану, чтобы создавать сердце и менять текст
document.body.addEventListener('click', (event) => {
    createHeart(event);
    changeText(event);

    // Запуск музыки при первом клике, если она еще не начала играть
    if (!musicStarted) {
        const audio = document.getElementById('background-music');
        audio.play(); // Запуск музыки
        musicStarted = true; // Флаг, чтобы музыка не запускалась повторно
    }
});

// Создаем сердца каждую секунду, чтобы они падали сверху (увеличиваем количество)
setInterval(() => {
    for (let i = 0; i < 15; i++) { // Теперь создается 3 сердца вместо 1
        const heart = document.createElement('div');
        heart.classList.add('heart');
        heart.innerHTML = '❤️';
        heart.style.left = `${Math.random() * 100}%`;
        document.body.appendChild(heart);
        setTimeout(() => heart.remove(), 3000); // Удаляем сердце через 3 секунды
    }
}, 1000);
