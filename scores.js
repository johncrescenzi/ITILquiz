document.addEventListener('DOMContentLoaded', () => {
  // Get stored quiz scores from local storage and convert them to numbers
  const questionsAnswered = Number(localStorage.getItem('questionsAnswered'));
  const correctAnswers = Number(localStorage.getItem('correctAnswers'));
  const totalQuestions = Number(localStorage.getItem('totalQuestions'));

  // Calculate the percentage of correct answers
  const percentageCorrect = ((correctAnswers / questionsAnswered) * 100).toFixed(2);

  // Display the scores
  document.getElementById('correctAnswers').textContent = correctAnswers;
  document.getElementById('percentageCorrect').textContent = isNaN(percentageCorrect) ? 0 : percentageCorrect;

  // Add a click event listener to the "Retry Quiz" button
  document.getElementById('retryButton').addEventListener('click', () => {
    window.location.href = 'index.html';  // Navigate back to the quiz page
  });
});