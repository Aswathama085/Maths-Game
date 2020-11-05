
var correctAnswer;
var playing = false;
var score;
var action;
var timeremain;

document.getElementById("resetstart").onclick =
    function () {
        if (playing == true) {
            location.reload(); //reloading the page
        }
        else //if we are not playing
        {
            playing = true;
            score = 0;
            document.getElementById("scoreValue").innerHTML = score;

            //show countdown
            show("timeremaining");
            timeremain = 60;
            document.getElementById("timeremainingvalue").innerHTML = timeremain;
            //change button to reset
            hide("gameOver");
            document.getElementById("resetstart").innerHTML = "Reset Game";

            //start countdown
            startCoundown();

            generateQA();
        }
    }

for(i=1;i<5;i++){
document.getElementById("box"+i).onclick=
function(){
    if(playing==true)
    {
        if(this.innerHTML==correctAnswer)
        {
            score++;
            document.getElementById("scoreValue").innerHTML=score;
            hide("wrong");
            show("correct");
            setTimeout(function(){
                hide("correct");
            },1000);

            generateQA();
        }

        else
        {
            show("wrong");
            setTimeout(function(){
                hide("wrong");
            },1000);
        }
    }
}}

function startCoundown() {
    action = setInterval(function () {

        timeremain -= 1;
        document.getElementById("timeremainingvalue").innerHTML = timeremain;
        if (timeremain == 0) //game over
        {
            stopCountdown();
            show("gameOver");
            document.getElementById("gameOver").innerHTML = "<p>game over</p><p>your score is " + score + "</p>";

            hide("timeremaining");
            hide("Correct");
            hide("Wrong");
            playing = false;
            document.getElementById("resetstart").innerHTML = "Start Game";
        }
    }, 1000);
}

function stopCountdown() {
    clearInterval(action);
}

function hide(id) {
    document.getElementById(id).style.display = "none";
}

function show(id) {
    document.getElementById(id).style.display = "block";
}

function generateQA(){
    var x = 1+ Math.round(9*Math.random());
    var y = 1+ Math.round(9*Math.random());
    correctAnswer = x*y;
    document.getElementById("question").innerHTML = x + "x" + y;
    var correctPosition = 1+ Math.round(3*Math.random());
    document.getElementById("box"+correctPosition).innerHTML = correctAnswer; //fill one box with the correct answer
    
    //fill other boxes with wrong answers
    
    var answers = [correctAnswer];
    
    for(i=1; i<5; i++){
        if(i != correctPosition) {
            var wrongAnswer;
            do{
                wrongAnswer = (1+ Math.round(9*Math.random()))*(1+ Math.round(9*Math.random())); //a wrong answer
            }while(answers.indexOf(wrongAnswer)>-1)
            document.getElementById("box"+i).innerHTML = wrongAnswer;
            answers.push(wrongAnswer);
        }
    }
}