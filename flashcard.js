if (window.location.pathname.endsWith('flashcard.html')) {

let flashcards = [];
let currentCard = 0;

// Fetch data from JSON file
fetch('osflashcard.json')
  .then(response => response.json())
  .then(data => {
    flashcards = data;
    displayCard();
  });

function displayCard() {
  if (currentCard < flashcards.length) {
    document.getElementById('question-text').textContent = flashcards[currentCard].question;
    document.getElementById('answer-text').textContent = flashcards[currentCard].answer;
  }
}

function flipCard() {
  const card = document.querySelector('.flashcard');
  card.style.transform = card.style.transform === 'rotateY(180deg)' ? 'rotateY(0deg)' : 'rotateY(180deg)';
}

function nextCard() {
  currentCard++;
  if (currentCard >= flashcards.length) {
    currentCard = 0;
  }
// Set timeout to delay the displayCard() function.
  setTimeout(() => {
    displayCard();
  }, 300); // 550ms to give it a slight extra delay for safety.
}


}