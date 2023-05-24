var buttonColours = ["red", "blue", "green", "yellow"];
var gamePattern = [];
var userClickedPattern = [];

var level = 0;
var started = false;

$(".btn").click(function () {
  var userChosenColour = this.id;
  userClickedPattern.push(userChosenColour);
  playSound(this.id);
  animatePress(this);

  checkAnswer(userClickedPattern.length-1);
});


  $(document).keydown(function () {
    if (started === false) {
    nextSequence();
   
    started = true;
  }
  });






function nextSequence() {

  userClickedPattern = [];

  level++;
  $("#level-title").text("Level " + level);


  var randomNumber = Math.floor(Math.random() * 4);
  var randomChosenColour = buttonColours[randomNumber];
  gamePattern.push(randomChosenColour);

  $("#" + randomChosenColour)
    .fadeToggle(100)
    .fadeToggle(100);

  playSound(randomChosenColour);
}

function playSound(name) {
  var audio = new Audio("sounds/" + name + ".mp3");
  audio.play();
}

function animatePress(currentColour) {
  $(currentColour).addClass("pressed");
  setTimeout(function () {
    $(currentColour).removeClass("pressed");
  }, 100);
}


function checkAnswer(currentLevel) {

  
  if (gamePattern[currentLevel] === userClickedPattern[currentLevel]) {

   
    if (userClickedPattern.length === gamePattern.length){

     
      setTimeout(function () {
        nextSequence();
      }, 1000);

    }

  } else {

    playSound("wrong")
    $("body").addClass("game-over");

    setTimeout(function(){
      $("body").removeClass("game-over")
    }, 200);

    $("h1").text("Game Over, Press Any Key to Restart");

    startOver();

  }

}




function startOver(){
level = 0;
gamePattern = [];
started = false;

}