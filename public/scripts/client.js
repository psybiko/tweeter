/*
 * Client-side JS logic goes here
 * jQuery is already loaded
 * Reminder: Use (and do all your DOM work in) jQuery's document ready function
 */


// This function is responsible for returning a tweet article element containing the entire HTML structure of the tweet.
const createTweetElement = function (tweet) {
  const {
    name,
    avatars,
    handle
  } = tweet.user;
  let markup = `
  <header>
    <div class="user">
    <img src = "${avatars}">
    <p>${name}</p>
    </div>
    <p class="tweeter-handle">${handle}</p>
  </header>
    <div class="status">
    <p>${tweet.content.text}</p>
    </div>
    <div class="line">
    <footer>
    <p>10 days ago</p>
    <div class="tweet-buttons">
    <i class="fab fa-font-awesome-flag"></i>
    <i class="fas fa-retweet"></i>
    <i class="fas fa-heart"></i>
    </div>
    </footer>
    
    `
    let $tweet = $('<article>').addClass('tweet');
    let tweetCard = $tweet.append(markup);
    return tweetCard;
  }
  
  const renderTweets = (tweets) => {
    // loop through tweets
    // calls createTweetElement for each tweet
    // takes return value and appends it the the tweet container
    // let posted = $('.tweet-container').append(tweets);
    for (let tweet of tweets) {
      let $tweet = createTweetElement(tweet)
      let posts = $('.tweet-container').append($tweet);
      return posts
    }
  }

  $(document).ready(function () {

  // prevent default post request on submitting
  const form = $('.ajax-form')
  $(form).submit((event) => {
    console.log('Triggered')
    event.preventDefault();

    const formData = ($(form).serialize())

    $.ajax({
      url: $(form).attr('action'),
      type: 'POST',
      data: formData,
    })
  })

  // Fetches data from db and renders the tweet
  const loadTweets = () => {
    const $button = $('button');
    $button.click(() => {
      $.ajax({
          url: $(form).attr('action'),
          type: 'GET',
          dataType: "JSON"
        })
        .then((response) => {
          renderTweets(response)
        })
    })
  }

  loadTweets()

})