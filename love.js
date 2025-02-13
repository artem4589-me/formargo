const messages = [
  "Нажимай где угодно",
  "Я хочу тебе кое-что сказать",
  "Я люблю тебя ❤️",
  "Попробуй нажать кнопку внизу 💝"
];

let currentPage = 0;
let isLastPage = false;

function showMessage() {
  $('.message').text(messages[currentPage]);

  isLastPage = currentPage === messages.length - 1;
  
  if (isLastPage) {
      $('.next-button').show();
  } else {
      $('.next-button').hide();
  }
}

$('.bg_heart').on('click', function() {
  if (!isLastPage) {
      currentPage++;
      showMessage();
  }
});

setInterval(function() {
  let r_size = Math.floor(Math.random() * 65) + 10;
  let r_left = Math.floor(Math.random() * 100) + 1;
  let r_time = Math.floor(Math.random() * 5) + 5;
  
  $('.bg_heart').append(`<div class='heart' style='width:${r_size}px;height:${r_size}px;left:${r_left}%;animation:love ${r_time}s ease'></div>`);

  $('.heart').each(function() {
      if (parseFloat($(this).css("top")) <= -100) {
          $(this).remove();
      }
  });
}, 500);

showMessage();
