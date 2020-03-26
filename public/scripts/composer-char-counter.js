// Character counter

$(document).ready(function() {
  // --- our code goes here ---
  console.log('ready!')
  $('#tweet-text').on('keyup', function() {
    let count = 140;
    let num = $(this).val().length
    
    if (num) {
      count = count - num
    } 

    if (count < 0) {
      // adds a class of red to counter
      // index accessed by eq() selector
      $(this).siblings().children().eq(1).addClass('red')
    }

    $(this).siblings()[1].children[1].innerHTML = count
    
    console.log(count)
  })

});