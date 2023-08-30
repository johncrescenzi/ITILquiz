document.addEventListener('DOMContentLoaded', () => {
  let currentQuestionIndex = 0;
  let questionsAnswered = 0;
  let correctAnswers = 0;
  let choiceMade = false;
  let totalQuestions = 0;

  
  const alertSuccess = document.querySelector('.alert-success');
  const alertInfo = document.querySelector('.alert-info');
  const nextButtons = document.querySelectorAll('.next-button');
  const explanationSpan = document.querySelector('.explanation');

  // Retrieve quizType from local storage
  const storedQuizType = localStorage.getItem('quizType');

  // Store original button classes
  const originalButtonClasses = [];
  document.querySelectorAll('.btn').forEach((button, index) => {
    originalButtonClasses[index] = button.className;
  });

  function resetChoiceButtonClasses() {
    document.querySelectorAll('.btn').forEach((button, index) => {
      button.className = originalButtonClasses[index]; // Reset to the original class
      button.classList.remove('btn-success', 'btn-error'); // Remove added classes
    });
  }

  // Shuffle an array using Fisher-Yates algorithm
function shuffleArray(array) {
  for (let i = array.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [array[i], array[j]] = [array[j], array[i]];
  }
}

  function loadQuestion(data, index) {
  const questionObj = data[index];
  const questionElement = document.querySelector('h1');
  questionElement.textContent = questionObj.question;

  // Log the correct index to debug
  console.log("Setting correct index: ", questionObj.correctIndex);

  // Update the correct answer index as a data attribute for later use
  questionElement.setAttribute('data-correct-index', questionObj.correctIndex);

  for (let i = 0; i < questionObj.choices.length; i++) {
    const choiceButton = document.getElementById(`choice${i}`);
    choiceButton.textContent = questionObj.choices[i];
  }

    // Hide alerts when a new question is loaded
    alertSuccess.style.display = 'none';
    alertInfo.style.display = 'none';


    // Disable the 'Next' buttons
    nextButtons.forEach(button => button.disabled = true);
  }


  function updateStats() {
    let percentage = 0; // Initialize to 0

  // Only attempt the division if totalQuestions is greater than 0
  if (totalQuestions > 0) {
    percentage = (questionsAnswered / totalQuestions) * 100;
  }
    percentage = Math.round(percentage);

    const statPercentage = document.querySelector('.statPercentage h2');
    const statCorrect = document.querySelector('.statCorrect h2');
    const questionsRemaining = document.querySelector('.statQuestionsRemaining h2');
    const progressBar = document.querySelector('.progress');


    statPercentage.textContent = `${percentage}`;
    questionsRemaining.innerHTML = `${totalQuestions - questionsAnswered}`;
    progressBar.setAttribute("value", percentage);
    statCorrect.textContent = `${correctAnswers}/${questionsAnswered}`;
  }

  console.log(`${storedQuizType}`)
  fetch(`${storedQuizType}.json`)
  .then(response => response.json())
  .then(data => {

    totalQuestions = data.length;
    
    // Shuffle the questions
    shuffleArray(data);

    // Shuffle the choices within each question
data.forEach(question => {
  // Get the correct choice before shuffling
  const correctChoice = question.choices[question.correctIndex];
  
  // Create an array of choice-explanation pairs
  const paired = question.choices.map((choice, index) => {
    return {choice, explanation: question.explanations[index]};
  });
  
  // Shuffle the paired array
  shuffleArray(paired);
  
  // Update choices and explanations based on the shuffled array
  question.choices = paired.map(pair => pair.choice);
  question.explanations = paired.map(pair => pair.explanation);
  
  // Update the correct index
  question.correctIndex = question.choices.indexOf(correctChoice);
});

    loadQuestion(data, currentQuestionIndex);
      // Ensure only quiz buttons are affected here
      const choiceButtons = document.querySelectorAll('.quizSection .btn-choice');


      choiceButtons.forEach((button) => {
        button.addEventListener('click', function() {
          if (choiceMade) return;
          const questionElement = document.querySelector('h1');
          const correctAnswerIndex = Number(questionElement.getAttribute('data-correct-index'));

          choiceMade = true;

          const clickedIndex = parseInt(this.id.replace("choice", ""));
const explanationText = data[currentQuestionIndex].explanations[clickedIndex];

          if (clickedIndex === correctAnswerIndex) {
            alertSuccess.style.display = 'block';
            alertInfo.style.display = 'none';
            correctAnswers++;
          } else {
            alertSuccess.style.display = 'none';
            alertInfo.style.display = 'block';
            explanationSpan.textContent = explanationText;
          }

          choiceButtons.forEach((btn, idx) => {
            if (btn.classList.contains("btn-choice")) {
              btn.classList.remove('btn-neutral');
              if (idx === correctAnswerIndex) {
                btn.classList.add('btn-success');
              } else {
                btn.classList.add('btn-error');
              }
            }
          });

          questionsAnswered++;
          updateStats();

          nextButtons.forEach(button => button.disabled = false);
        });
      });

      nextButtons.forEach(button => {
        button.addEventListener('click', function() {
          currentQuestionIndex++;
          if (currentQuestionIndex < data.length) {
            loadQuestion(data, currentQuestionIndex);
          }
          else if (currentQuestionIndex === data.length) {
  showScoreScreen(questionsAnswered, correctAnswers, totalQuestions);
  return;
}

          // Reset flag and choice button classes for the next question
          choiceMade = false;
          resetChoiceButtonClasses();
        });
      });
    })
    .catch(error => console.error('Error loading question data:', error));

  // Initialize stats and progress
  updateStats();
});
