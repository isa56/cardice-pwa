// Hearts, Diamonds, Spades, Clubs ♥ ♦ ♠ ♣
// Ace, 2, 3, 4, 5, 6, 7, 8, 9, 10, Jack, Queen, King

let cards = [];
let hasJoker = false;
let hasCardReplacement = false;

// HTML Components
const suitComponent = document.querySelector("#card-top-value");
const cardValueComponent = document.querySelector("#card-middle-value");
const diceValueComponent = document.querySelector("#dice");
const cardBtn = document.querySelector("#card-generator-btn");
const diceBtn = document.querySelector("#dice-btn");
const facesNumberInput = document.querySelector("#dice-number");
const cardReplaceSelector = document.querySelector("#card-replace-selector");
const cardJokerSelector = document.querySelector("#card-joker-selector");

initializeCards();

cardBtn.addEventListener("click", () => {
  selectCard();
});

diceBtn.addEventListener("click", () => {
  rollDice();
});

cardReplaceSelector.addEventListener("change", () => {
  hasCardReplacement = cardReplaceSelector.checked;
});

cardJokerSelector.addEventListener("change", () => {
  hasJoker = cardJokerSelector.checked;
});

function initializeCards() {
  let numberOfCards = hasJoker ? 54 : 52;
  for (let i = 0; i < numberOfCards; i++) {
    cards[i] = i;
  }
}

function generateRandomNumber(min = 1, max) {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

function selectCard() {
  if (cards.length === 0) {
    alert("No more cards left! Resetting deck...");
    initializeCards();
  }
  // Call randomNumber
  let randomNumber = generateRandomNumber(0, cards.length - 1);
  console.log(randomNumber);
  // Selects the card
  let cardId = cards[randomNumber];
  let suit = "";
  let value = "";
  let cardValue = cardId % 13;
  // Removes the card from the array
  if (!hasCardReplacement) {
    cards.splice(randomNumber, 1);
  }
  // Decides the suit
  if (cardId < 13) {
    suit = "♠";
  } else if (cardId < 26) {
    suit = "♣";
  } else if (cardId < 39) {
    suit = "♥";
  } else {
    suit = "♦";
  }
  // Decides the card value
  if (cardValue === 0) {
    value = "A";
  } else if (cardValue === 10) {
    value = "J";
  } else if (cardValue === 11) {
    value = "Q";
  } else if (cardValue === 12) {
    value = "K";
  } else {
    value = cardValue;
  }

  updateCardHTML(suit, value);
}

function rollDice() {
  let randomNumber = generateRandomNumber(1, facesNumberInput.value);
  updateDiceHTML(randomNumber);
}

function updateCardHTML(suit, value) {
  suitComponent.textContent = suit;
  cardValueComponent.textContent = value;
}

function updateDiceHTML(value) {
  diceValueComponent.textContent = value;
}