// Character counter

$(document).ready(function() {
  // --- our code goes here ---
  $('#tweet-text').on('keyup', function() {
    let count = 140;
    let num = $(this).val().length
    console.log(num)

    if (num) {
      count = count - num
    }

    if (count < 0) {
      // adds a class of red to counter
      // index accessed by eq() selector
      $(this).siblings().children().eq(1).addClass('red')
    } else {
      $(this).siblings().children().eq(1).removeClass('red')
    }

    $(this).siblings()[1].children[1].innerHTML = count

  })


});
