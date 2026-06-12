document.addEventListener('DOMContentLoaded', () => {
  const version = "1.1.3"; // Update this version number when you make changes

  console.log("DOM fully loaded and parsed");

  // Initialize stats
  let currentStreak = 0;
  let bestStreak = 0;
  let totalCorrect = 0;
  let totalIncorrect = 0;
  let totalAttempted = 0;

  // Function to generate random math questions
  const generateQuestion = () => {
    const num1 = Math.floor(Math.random() * 10) + 1;
    const num2 = Math.floor(Math.random() * 10) + 1;
    const operators = ['+', '-', '*', '/'];
    const operator = operators[Math.floor(Math.random() * operators.length)];

    let question, answer;
    switch (operator) {
      case '+':
        question = `${num1} + ${num2}`;
        answer = num1 + num2;
        break;
      case '-':
        question = `${num1} - ${num2}`;
        answer = num1 - num2;
        break;
      case '*':
        question = `${num1} × ${num2}`;
        answer = num1 * num2;
        break;
      case '/':
        question = `${num1 * num2} ÷ ${num1}`;
        answer = num2;
        break;
    }
    return { question, answer };
  };

  // Get the generated question and answer
  let { question, answer } = generateQuestion();

  // Function to display the current question and stats
  const updateUI = () => {
    document.getElementById('app').innerHTML = `




<div class="text-center">
    <H2>     Solve: ${question} </H2>
  

<div class=container>
<div class="row">
<div class="col-sm-12">
<div class="input-group mb-3">
  <input id="user-answer"  class="form-control" placeholder="Your Answer" aria-label="Your Answer" aria-describedby="basic-addon2">
  <div class="input-group-append">
    <button class="btn btn-outline-primary" type="button">Submit</button>
  </div>
</div>
</div>
</div>
</div>



<div class="text-center">
    <H2 id="result"> </H2>
    </br>
   <p ></p>


  <div class="row">
      <div class="col-sm-6">
      <p>Current Streak: <span id="streak">${currentStreak}</span></p>
      <p>Best Streak: <span id="best-streak">${bestStreak}</span></p>
    </div>



 
      <div class="col-sm-6">
       <p>Total Correct: <span id="correct">${totalCorrect}</span></p>
       <p>Total Incorrect: <span id="incorrect">${totalIncorrect}</span></p>
     <p>Total Attempted: <span id="attempted">${totalAttempted}</span></p>

    </div>


</div>

   <p style="position: fixed; bottom: 0px;">Version: <span id="version">${version}</span></p> <!-- Version Display -->





    `;

    // Add event listener for Enter key after the input field has been created
    const userInput = document.getElementById('user-answer');
    if (userInput) {
      userInput.addEventListener('keypress', (e) => {
        if (e.key === 'Enter') {
          checkAnswer(); // Trigger checkAnswer when Enter is pressed
        }
      });
      
      // Set focus on the input field so the cursor is in the answer box
      userInput.focus();
    } else {
      console.error('user-answer input not found!');
    }
  };

  // Function to check the user's answer
  function checkAnswer() {
    const userAnswer = parseFloat(document.getElementById('user-answer').value);
    const resultElement = document.getElementById('result');
    const streakElement = document.getElementById('streak');
    const bestStreakElement = document.getElementById('best-streak');
    const correctElement = document.getElementById('correct');
    const incorrectElement = document.getElementById('incorrect');
    const attemptedElement = document.getElementById('attempted');
    var timeoutValue = 400;

    // Check if the user's answer is correct
    totalAttempted++; // Increment total attempted for each question 

    if (userAnswer === answer) {
      resultElement.innerHTML = 'Correct! Well done!';
      resultElement.style.color = 'green';
      currentStreak++; // Increase the current streak for correct answers
      totalCorrect++; // Increment total correct count
      timeoutValue = 400;
    } else {
      resultElement.innerHTML = `Incorrect. <BR> The correct answer is ${answer}. <BR> Try again!`;
      resultElement.style.color = 'red';
      currentStreak = 0; // Reset the streak on incorrect answer
      totalIncorrect++; // Increment total incorrect count
      timeoutValue = 800;
      
    }

    // Update the best streak if necessary
    if (currentStreak > bestStreak) {
      bestStreak = currentStreak;
    }

    // Update the UI with the new stats
    streakElement.innerText = currentStreak;
    bestStreakElement.innerText = bestStreak;
    correctElement.innerText = totalCorrect;
    incorrectElement.innerText = totalIncorrect;
    attemptedElement.innerText = totalAttempted;

    // Generate a new question
    const { question: newQuestion, answer: newAnswer } = generateQuestion();
    question = newQuestion;
    answer = newAnswer;

    // Update the UI with the new question
    setTimeout(updateUI, timeoutValue); // Slight delay to show result before updating
  }

  // Initially display the first question
  updateUI();
});
