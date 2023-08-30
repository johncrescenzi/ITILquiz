document.addEventListener("DOMContentLoaded", function() {
  // Initialize shouldHideLoader item if it doesn't exist
  if (localStorage.getItem("shouldHideLoader") === null) {
    localStorage.setItem("shouldHideLoader", "true");
  }
  const shouldHideLoader = localStorage.getItem("shouldHideLoader");
  
  if (shouldHideLoader === "true") {
    hideLoader();
  } else {
    showLoader();
  }
   hideLoader();

    // This will run whenever the page is loaded from the server or from the cache.
window.addEventListener("pageshow", function(event) {
  // Initialize shouldHideLoader item if it doesn't exist
  if (localStorage.getItem("shouldHideLoader") === null) {
    localStorage.setItem("shouldHideLoader", "true");
  }
  hideLoader();
});

  const themeDropdown = document.getElementById("themeDropdown");
  const dropdownBtn = document.getElementById("dropdownBtn");

  // Initial hide
  themeDropdown.style.display = 'none';

  // Toggle dropdown
  dropdownBtn.addEventListener("click", function() {
    if (themeDropdown.style.display === 'none') {
      themeDropdown.style.display = 'block';
    } else {
      themeDropdown.style.display = 'none';
    }
  });

  // Hide dropdown when an item is clicked
  themeDropdown.addEventListener("click", function(event) {
    if (event.target.tagName === 'A') {
      themeDropdown.style.display = 'none';
    }
  });
});

const themeDropdown = document.getElementById("themeDropdown");
  themeDropdown.addEventListener("click", (event) => {
    const clickedElement = event.target;
    const selectedTheme = clickedElement.getAttribute("data-theme");
    if (selectedTheme) {
      document.documentElement.setAttribute("data-theme", selectedTheme);
    }
  });

function hideLoader() {
  console.log("Hiding loader");
  document.getElementById('loader').classList.add('hidden');
  localStorage.setItem("shouldHideLoader", "true");
}

function showLoader() {
  console.log("Showing loader");
  document.getElementById('loader').classList.remove('hidden');
  localStorage.setItem("shouldHideLoader", "false");
}

let quizType;  // Declare quizType as a global variable

function startItilQuiz() {
  quizType = "itil";
  localStorage.setItem('quizType', quizType); // Store in local storage
  showLoader();
  setTimeout(() => {
    location.href = 'quiz.html?type=itil';
  }, 300);
}

function startOsQuiz() {
  quizType = "os";
  localStorage.setItem('quizType', quizType); // Store in local storage
  showLoader();
  setTimeout(() => {
    location.href = 'quiz.html?type=os';
  }, 300);
}

function startOsFlashcards() {
  flashCardType = "os";
  localStorage.setItem('flashCardType', flashCardType); // Store in local storage
  showLoader();
  setTimeout(() => {
    location.href = 'flashcard.html?type="os"';
  }, 300);
}


function showScoreScreen(questionsAnswered, correctAnswers, totalQuestions) {
  // Use localStorage to pass values to the next page
  localStorage.setItem('questionsAnswered', questionsAnswered);
  localStorage.setItem('correctAnswers', correctAnswers);
  localStorage.setItem('totalQuestions', totalQuestions);

  showLoader();  // Assuming showLoader is globally accessible or imported
  
  setTimeout(() => {
    location.href = 'scores.html';  // Redirect to scores page
  }, 300);
}

