var buttonColours = ["red", "blue", "green", "yellow"];
var gamePattern = [];
var userClickedPattern = [];

var level = 0;
var started = false;

var count = 0;


$(".start").on("click", function(){

  $(".start").addClass("hide");
  $(".container").removeClass("hide");

  if (started === false) {
    nextSequence();
   
    started = true;
  }

});

$(".restart").on("click", function(){

  $(".container").removeClass("hide");
  $(".restart").addClass("hide");

  if (started === false) {
    $("#level-title").text("Level 1");
    setTimeout(function(){
      nextSequence();
    } ,1000);
    
   
    started = true;
  }
});


$(".btn").click(function () {
  var userChosenColour = this.id;
  userClickedPattern.push(userChosenColour);
  playSound(this.id);
  animatePress(this);

  checkAnswer(userClickedPattern.length-1);
  

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
      
      count++;

      if (count === 7) {
        victory();
      }else {

      setTimeout(function () {
        nextSequence();
      }, 1000);
    }

    }

  } else {

    playSound("wrong")
    $("body").addClass("game-over");

    setTimeout(function(){
      $("body").removeClass("game-over")
    }, 200);

    $("h1").text("Perdiste master");

    $(".container").addClass("hide");
    $(".restart").removeClass("hide");

    startOver();

  }

}




function startOver(){
level = 0;
gamePattern = [];
started = false;
count = 0;
}


function victory(){
  $("h1").addClass("hide");
  $(".container").addClass("hide");
  $("img").removeClass("hide");

  playSound("victory");
  alert("GANASTE CAPO!");
}
