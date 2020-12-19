var buttonColors=["red","blue","green","yellow"];
var gamePattern=[]
var userClickedPattern=[];
var started=false;
var level=0;

$(document).keypress(function(){
    if(started===false)
  {
    $("h1").text("Level "+level);
    nextSequence();
    started=true;
  }
});



function nextSequence()
{
  userClickedPattern=[];
  level++;
  $("h1").text("Level "+level);
  var randomNumber=Math.floor(Math.random()*4);
  var randomChosenColor=buttonColors[randomNumber];
  gamePattern.push(randomChosenColor);
  $("#"+randomChosenColor).fadeOut(100).fadeIn(100).fadeOut(100).fadeIn(100);
  playSound(randomChosenColor);
}



function playSound(name)
{
  sound= new Audio("sounds/"+name+".mp3");
  sound.play();
}




$(".btn").click(function(){
  var userChosenColor=this.id;
  userClickedPattern.push(userChosenColor);
  playSound(userChosenColor);
  animatePress(userChosenColor);
  checkAnswer(userClickedPattern.length-1);
});




function animatePress(currentColor)
{
  $("#"+currentColor).addClass("pressed");
  setTimeout(function(){
    $("#"+currentColor).removeClass("pressed");},
    100);
}




function checkAnswer(currentLevel)
{
    if(gamePattern[currentLevel]===userClickedPattern[currentLevel])
    {
      console.log("Success");
      console.log(gamePattern);
      console.log(userClickedPattern);
      if(userClickedPattern.length===gamePattern.length)
      {
        setTimeout(function(){
          nextSequence();
        },1000);
      }
    }
    else
    {
      console.log("Wrong");
      playSound("wrong");
      $("body").addClass("game-over");
      $("h1").text("Game Over! Press any key to restart.");
      setTimeout(function(){
        $("body").removeClass("game-over");
      },200);

      startOver();
    }
}
function startOver()
{
  level=0;
  gamePattern=[];
  started=false;
}
