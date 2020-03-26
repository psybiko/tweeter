/*
 * Client-side JS logic goes here
 * jQuery is already loaded
 * Reminder: Use (and do all your DOM work in) jQuery's document ready function
 */

// Escaping text so that unsafe characters are converted into a safe "encoded" representation
// This function protects against XSS
const escape = (str) => {
  let div = document.createElement('div');
  div.appendChild(document.createTextNode(str));
  return div.innerHTML;

}


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
    <p>${escape(tweet.content.text)}</p>
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
  const arr = []
  for (let tweet of tweets) {
    arr.push(createTweetElement(tweet))

  }
  let posts = $('.tweet-container').append(arr);
  return posts
}

$(document).ready(function () {

  // prevent default post request on submitting

  // We'll enhance the form submit handler to disallow form submission in the 
  // event that the tweet area is empty, or exceeds the 140 character limit.

  $(".ajax-form").submit((event) => {
    event.preventDefault();
    const formData = ($(".ajax-form").serialize())

    if (formData.length === 5) {
      alert('Tweet cannot be empty')
    } else if (formData.length > 145) {
      alert('Tweet exceeds maximum characters')
    } 

    $.ajax({
        url: '/tweets',
        type: 'POST',
        data: formData,
      })
      .then(() => {
        loadTweets()

      })
  })

 

  // Fetches data from db and renders the tweet
  const loadTweets = () => {
    // const $button = $('button');
    // $button.click(() => {
    $.ajax({
        url: '/tweets',
        type: 'GET',
        dataType: "JSON"
      })
      .then((response) => {
        console.log(response)
        renderTweets(response.reverse())
      })
  }


})