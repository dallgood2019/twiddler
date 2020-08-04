$(document).ready(function () {
  // Layout
  let $mainTitle = $(
    '<h1 class="title-twitter"><i id="bird-icon" class="fa fa-twitter" aria-hidden="true"></i>Twiddler</h1>'
  );
  let $twtTextArea = $(
    '<div class="tweet-box"><textarea placeholder="Whats happening?" class="tweet-input"></textarea><div class="logBtn"><button id="log-btn-color" class="ui button" type="submit">Tweet</button></div></div>'
  );
  let $profileSelf = $(
    '<div id="profile-box"><div id="box-profile" class="ui link cards"><div class="card"><div id="my-photo" class="image"></div><div class="content"><div id="user-id" class="header"></div><div class="meta"></div><div class="description"></div></div><div class="extra content"><span id="year-joined" class="float left">Joined </span><span><i id="circleIcon" class="check circle icon"></i>Verified</span></div></div></div></div>'
  );
  let $profileUser = $(
    '<div id="box-profile-user"><div id="box-profile" class="ui link cards"><div class="card"><div id="user-profile-pic" class="image"></div><div class="content"><div id="user-id-person" class="header"></div><div class="meta"></div><div class="description"></div></div><div class="extra content"><span id="year-joined-user" class="float left">Joined </span><span><i id="circleIcon" class="check circle icon"></i>Verified</span></div></div></div></div>'
  );
  let $loginBtn = $(
    '<div class="loginBtn"><button id="login-btn-color" class="ui button" type="submit">Submit</button></div>'
  );
  let $userInfo = $(
    '<div id="login-group"><form class="ui form"><div class="field"><label id="first-name-login">First Name</label><input id="name-value" type="text" name="first-name" placeholder="First Name"></div><div class="field"><label id="gender-login">Gender</label><div id="dropdown" class="ui selection dropdown"><input type="hidden" name="gender"><i class="dropdown icon"></i><div class="default text">Gender</div><div class="menu"><div class="item" data-value="1">Male</div><div class="item" data-value="0">Female</div></form></div>'
  );
  let $popUpName = $(
    '<div id="pop-up" class="ui compact message"><p>Please enter your name</p></div>'
  );
  let $popUpMsg = $(
    '<div id="pop-up" class="ui compact message"><p>Form cannot be blank</p></div>'
  );
  let $popUpGender = $(
    '<div id="pop-up" class="ui compact message"><p>Please choose a gender</p></div>'
  );

  $mainTitle.appendTo(".head");
  $profileSelf.appendTo(".user-profile-header");
  $profileUser.appendTo(".trend-title");
  $userInfo.appendTo(".main-feed");
  $loginBtn.appendTo(".main-feed");
  $("#dropdown").dropdown();
  $profileSelf.hide();
  $profileUser.hide();

  // login button
  $loginBtn.on("click", function () {
    let $loginNameValue = $("#name-value").val();
    let $selfNameProfile = $("<div></div>");
    let $firstLetter = $loginNameValue.charAt(0);
    let $splitName = $loginNameValue.slice(1);
    let $yrJoined = $("<div></div>");
    let $yrJoinedUser = $("<div></div>");
    let yearJoined = moment().calendar("days");
    let $genderType = $("input[name='gender']:input").val();
    let $malePhoto = $('<img src="/Styles/matthew.png">');
    let $femalePhoto = $('<img src="/Styles/molly.png">');

    // Name and gender verification
    if (!$loginNameValue && !$genderType) {
      $popUpName.remove();
      $popUpGender.remove();
      $popUpName.appendTo(".twt-text-area");
      $popUpGender.appendTo(".twt-text-area");
    } else if (!$genderType) {
      $popUpGender.remove();
      $popUpName.remove();
      $popUpGender.appendTo(".twt-text-area");
    } else if (!$loginNameValue) {
      $popUpName.remove();
      $popUpGender.remove();
      $popUpName.appendTo(".twt-text-area");
    } else {
      $popUpName.remove();
      $popUpGender.remove();

      // Gender photo selection
      $popUpGender.hide();
      if ($genderType === "0") {
        $femalePhoto.appendTo("#my-photo");
      } else if ($genderType === "1") {
        $malePhoto.appendTo("#my-photo");
      }

      $loginBtn.hide();
      $userInfo.hide();
      $profileSelf.show();
      $profileUser.hide();
      $selfNameProfile
        .text($firstLetter.toUpperCase() + $splitName)
        .appendTo("#user-id");
      $yrJoined.text(yearJoined).appendTo("#year-joined");
      $yrJoinedUser.text(yearJoined).appendTo("#year-joined-user");
      $twtTextArea.appendTo(".twt-text-area");

      // Generating my own tweets
      $("#log-btn-color").on("click", function () {
        let $myTweet = $('<div id="tweet"></div>');
        let $myTweetValue = $(".tweet-input").val();
        let $loginNameValue = $("#name-value").val();
        if (!$myTweetValue) {
          $popUpMsg.appendTo(".twt-text-area");
        } else {
          $popUpMsg.remove();
          $myTweet.text($myTweetValue).appendTo(".user-history");
          $(".tweet-input").val("");
          let $genderType = $("input[name='gender']:input").val();
          let $malePhoto = $(
            '<img id="selfTweetPhoto"src="/Styles/stevie.jpg">'
          );
          let $femalePhoto = $(
            '<img id="selfTweetPhoto"src="/Styles/elliot.jpg">'
          );
          let $newTweet = $('<div id="tweet"></div>');
          let $newUser = $('<div id="userNameSelf"></div>');
          let $newMessage = $('<div id="tweet-msg-self"></div>');
          let $newDateTime = $('<span id="date-time-self"></span>');

          if ($genderType === "0") {
            $femalePhoto.appendTo($newTweet);
          } else if ($genderType === "1") {
            $malePhoto.appendTo($newTweet);
          }
          constructTweet(
            $newTweet,
            ".main-feed",
            $newUser,
            $loginNameValue,
            $newMessage,
            $myTweetValue,
            $newDateTime
          );
        }
      })(
        // Recursive call to randomly auto-tweet for more realistic feel (tweets anywhere from 1 - 20 secs)
        (function randomAutoTweet() {
          let rand = Math.round(Math.random() * 10);
          setTimeout(function () {
            twiddler();
            console.log("Delayed " + rand + " secs.");
            randomAutoTweet();
          }, rand * 1000);
        })()
      );
    }
  });

  // Main function for Twiddler
  function twiddler() {
    // Starts adding tweets to the users arrays from our Data_Generator file
    generateRandomTweet();

    let newTweet = streams.home.pop();

    let $newTweet = $('<div id="tweet"></div>');
    let $newUser = $('<div id="userName"></div>');
    let $newMessage = $('<div id="tweet-msg"></div>');
    let $newDateTime = $('<span id="date-time"></span>');

    // Unique profile photos
    let $dc = $('<img id="profile-pic" src="/Styles/elliot.jpg">');
    let $ms = $('<img id="profile-pic" src="/Styles/steve.jpg">');
    let $sp = $('<img id="profile-pic" src="/Styles/stevie.jpg">');
    let $st = $('<img id="profile-pic" src="/Styles/joe.jpg">');
    let $dcUserPic = $('<img id="profile-pic1" src="/Styles/elliot.jpg">');
    let $msUserPic = $('<img id="profile-pic1" src="/Styles/steve.jpg">');
    let $spUserPic = $('<img id="profile-pic1" src="/Styles/stevie.jpg">');
    let $stUserPic = $('<img id="profile-pic1" src="/Styles/joe.jpg">');

    if (newTweet.user === "douglascalhoun") {
      $dc.appendTo($newTweet);
    } else if (newTweet.user === "mracus") {
      $ms.appendTo($newTweet);
    } else if (newTweet.user === "shawndrost") {
      $st.appendTo($newTweet);
    } else if (newTweet.user === "sharksforcheap") {
      $sp.appendTo($newTweet);
    }

    // Main-tweet feed
    constructTweet(
      $newTweet,
      ".main-feed",
      $newUser,
      newTweet.user,
      $newMessage,
      newTweet.message,
      $newDateTime
    );

    // Allows user to click on profile photo and see their tweet history
    $dc.on("click", function () {
      viewUserHistory($dcUserPic, streams.users.douglascalhoun);
    });

    $ms.on("click", function () {
      viewUserHistory($msUserPic, streams.users.mracus);
    });

    $st.on("click", function () {
      viewUserHistory($stUserPic, streams.users.shawndrost);
    });

    $sp.on("click", function () {
      viewUserHistory($spUserPic, streams.users.sharksforcheap);
    });
  }

  // Helper Functions
  function constructTweet(
    tweet,
    gridLocation,
    user,
    userName,
    userMessage,
    message,
    dateTime
  ) {
    tweet.appendTo(gridLocation);
    user
      .addClass(userName)
      .attr("data-user", userName)
      .text("@" + userName + " ")
      .appendTo(tweet);
    userMessage.text("- " + message).appendTo(tweet);
    dateTime.attr("data-livestamp", new Date().toUTCString()).appendTo(tweet);
  }

  function viewUserHistory(photo, user) {
    $("#user-id-person").empty();
    let $name = $("<div></div>");
    $name.text(user[0].user).appendTo("#user-id-person");
    $profileUser.show();
    $("#user-profile-pic").empty();
    photo.appendTo("#user-profile-pic");
    $(".trend-feed").empty();
    let userMsg = user;
    for (let i = 0; i <= userMsg.length; i++) {
      let $newTweet = $('<div id="tweet"></div>');
      $newTweet.text(userMsg[i].message).appendTo(".trend-feed");
    }
  }
});
