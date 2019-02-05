const $CURRENT_QUESTION = $('#questionAnswerForm');
const $CURRENT_QUESTION_NUMBER = $('#questionNumber');
const $QUESTIONS_COUNT = $('#questionCount');
const $feedBack  = $('#questionAnswerFeedback');
let score=0;
let questionNumber=0;

//starts quiz
function startQuiz(){
  $('body').on('click','#startButton',e=>{
    $('.startQuiz').hide()
    renderCurrentQuestion();
    console.log(`startQuiz ran`)
    $('.questionScore').show();
  })
}

//renders Answer elements
function renderAnswer(answer,index){
  return `  
  <div class="answers"> 
  <label class="answer-label"> 
  <input required type="radio" name="answer" value="${index}"><span>${answer}</span>
  </label>
  </div> `
}
//renders question and answers into the DOM
function renderQuestion(question){
  const answersHTML = question.answers.map(renderAnswer);
  const questionHTML=
  `
     <p>${question.text}</p>
    <form>
    ${answersHTML.join(' ')}
        <button id="submit-button" type="submit" >Submit!</button>
    </form>
    `
$CURRENT_QUESTION.html(questionHTML);  
}
// renders the current question into the DOM
function renderCurrentQuestion()
{
  const q = STORE.questions[STORE.currentQuestionIndex]
  renderQuestion(q)
  updateQuestionNumber()
  $CURRENT_QUESTION.show();
  

  }


//renders updated question number into the DOM
function updateQuestionNumber(){
$QUESTIONS_COUNT.html(STORE.questions.length);
  $CURRENT_QUESTION_NUMBER.html
  (STORE.currentQuestionIndex+1);

  

}

//function for what happens when submit button is clicked.
function userSelectedAnswer(){
$('#questionAnswerForm').on('click','#submit-button', e=>{
  e.preventDefault();
  console.log("userSelectedanswer ran")
  const currentQuestion = STORE.questions[STORE.currentQuestionIndex];
    const $checkedOption = $("input[name='answer']:checked")
  if($checkedOption.length===0){
      window.confirm(`Did you forget to check an answer?`)
      return 
  }
const checkedAnswerIndex = parseInt($("input[name='answer']:checked"). val())
 console.log(`checked index is: ${checkedAnswerIndex}`);  
  console.log(`correct index is: ${currentQuestion.correctAnswerIndex}`);

  if(checkedAnswerIndex ===currentQuestion.correctAnswerIndex ){
    //correct
    currentQuestion.userProvidedAnswer = true
    ifAnswerIsCorrect();
  }
  else{
    currentQuestion.userProvidedAnswer = false
   ifAnswerIsWrong();
  }
checkForFinalQuestion();
  $CURRENT_QUESTION.hide();
});

}
//function to check for the end of the quiz to display results
function checkForFinalQuestion(){
  if(STORE.currentQuestionIndex===STORE.questions.length -1){
    console.log(`Final score is ${score}`);
    if(score>=7){
      $('#finalResult').html(`<div class="finalResults"><div class=finalResultsIcon><img src="https://cdn0.iconfinder.com/data/icons/winter-lollipop/128/Like.png" alt="clapping hands icon"</></div>
      <h3>GREAT JOB!</h3>
      <p>You got ${score}/10!</p>
      <p>You really know about National Parks!</p>
      <button class="restartButton">Restart Quiz</button>
      </div>
      `);
           $feedBack.hide();
      $('#finalResult').show();
    }
else{
     $('#finalResult').html(`<div class="finalResults"><div class=finalResultsIcon><img src="https://cdn0.iconfinder.com/data/icons/famous-character-vol-2-colored/48/JD-37-128.png" alt="unsure emoji icon"</></div>
     <h3>Looks like you could brushup on your knowledge of National Parks!'</h3>
      <p>You got ${score}/10!</p>
      <p>Try again and see how you do!</p>
      <button class="restartButton">Restart Quiz</button></div>
      `);
           $feedBack.hide();
      $('#finalResult').show();
}
reStartQuiz();
    }
  }
//function to restart quiz when restart is clicked.
function reStartQuiz(){
   $('main').on('click', '.restartButton', function (event) {
    location.reload();
  });
}
//function for what to do if user answers question correctly
function ifAnswerIsCorrect(){
  feedbackCorrect();
  renderScore();
  console.log('if answer is correct ran')
}
//function for what to do if user answers question wrong
function ifAnswerIsWrong(){
  feedbackWrong();
  console.log('IfAnswerIsWrong ran')
}
//function to display the correct feedback in the DOM
function feedbackCorrect(){
  const correctAnswerFeedback=
  `<div class=answerFeedback>
  <div class=answerIcon><img src="https://cdn4.iconfinder.com/data/icons/gamification-1/256/--02-128.png" alt="trophy icon"</></div><p>Correct! You're doing a great job!</p><button type=button class="nextButton">Next</button></div>`
  $feedBack.html(correctAnswerFeedback);
  $('.nextButton').focus();
}
//function to display the wrong answer feedback into the DOM
function feedbackWrong(){
   const currentQuestion = STORE.questions[STORE.currentQuestionIndex]
   const correctAnswerText = currentQuestion.answers[currentQuestion.correctAnswerIndex]
    const wrongAnswerFeedback=
  `<div class=answerFeedback>
  <div class=answerIcon><img src="https://cdn2.iconfinder.com/data/icons/free-basic-icon-set-2/300/10-128.png" alt="warning icon"</></div><p>Sorry, the correct answer is ${correctAnswerText}</p><button type=button class="nextButton">Next</button></div>`
  $feedBack.html(wrongAnswerFeedback);
  $('.nextButton').focus();
}
//function to render the score
function renderScore(){
   STORE.questions.reduce((acc,q)=>{
     if(q.userProvidedAnswer === true){
         return score= acc+1
     }
     return score= acc
 }, 0)
 $('span.score').html(score)
}
//function to render the next question
function renderNextQuestion(){
$('main').on('click','.nextButton',function(event){
STORE.currentQuestionIndex++;
renderCurrentQuestion();
$CURRENT_QUESTION.show();
$feedBack.html('');
console.log(`The score is ${score}`);
console.log('nextbutton ran')
})
}


//function to create the quiz
function createQuiz(){
startQuiz();
renderNextQuestion();
userSelectedAnswer();
}
createQuiz();

$('.questionScore').hide();