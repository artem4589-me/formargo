const heartText = [
    "Ты - мое сердце!",
    "Любовь, которая не исчезнет.",
    "Ты моя радость каждый день.",
    "Моя жизнь полна счастья с тобой.",
    "Ты - мой мир."
];

function createHeart() {
    const heart = document.createElement('div');
    heart.classList.add('heart');
    heart.innerHTML = '❤️';
    heart.style.left = `${Math.random() * 100}%`;
    heart.addEventListener('click', () => changeText());
    document.body.appendChild(heart);
}

function changeText() {
    const textElement = document.getElementById('text');
    textElement.textContent = heartText[Math.floor(Math.random() * heartText.length)];
}

setInterval(createHeart, 1000); // создаем сердце каждую секунду
