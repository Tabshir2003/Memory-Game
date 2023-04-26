// Constant image for the card back image for the "hidden" state.
const BACK_IMAGE = '../img/BACK.png';

const cardSet = [
  'AH', '2H', '3H', '4H', '5H', '6H', '7H', '8H', '9H', '0H', 'JH', 'QH', 'KH',
  'AS', '2S', '3S', '4S', '5S', '6S', '7S', '8S', '9S', '0S', 'JS', 'QS', 'KS'
];

// Shuffle the array IN PLACE
const shuffleArray = (array) => {
  for (var i = array.length - 1; i > 0; i--) {
    var j = Math.floor(Math.random() * (i + 1));
    var temp = array[i];
    array[i] = array[j];
    array[j] = temp;
  }
}

// Keeps track of the previous pick, and compare it to the current pick in the click handler function below.
let previousPick = undefined;


/* This will handle the click for each card. Consider what to do when a card is clicked.
*   - Is it the first card clicked? If so keep track using previousPick above.
*   - If it's second click, check for match
*   - If match is found, both cards stay flipped up, otherwise flip down
*   - No match scenario: Use setTimeout to delay resetting the cards back to a hidden state.
* */
const handleCardClick = (e) => {
  const clickedCard = e.target;
  const clickedCardId = clickedCard.dataset.id; //get the type of card

  // Do nothing if card is already matched
  if (clickedCard.classList.contains('matched')) { // if card you clicked is already matched, do nothing
    return;
  }

  clickedCard.src = '../img/' + clickedCardId + '.png'; // show the card image
  clickedCard.classList.add('flipped');

  if (previousPick == undefined) {
    previousPick = clickedCard;
  } else {
    const previousPickId = previousPick.dataset.id;

    if (clickedCardId == previousPickId) { // keep displaying both cards if matched
      clickedCard.classList.add('matched');
      previousPick.classList.add('matched');
      previousPick = undefined;
    } else {
      setTimeout(() => { // flip both cards  and show their backs since no match
        clickedCard.src = BACK_IMAGE; 
        clickedCard.classList.remove('flipped'); // remove status flipped
        previousPick.src = BACK_IMAGE;
        previousPick.classList.remove('flipped'); // remove status flipped
        previousPick = undefined;
      }, 250);
    }
  }
};

// Array.map function to turn all the ID's of cardSet into card nodes.
// Create elements for each card here.
// Attach the click handler, etc....
// Returning blank for each card ID, but we'd want to return an element.
const cardListMapper = (id) => {
  const card = document.createElement('img');
  card.src = BACK_IMAGE;
  card.dataset.id = id; // Giving each card an id which we can use to change img scr later.
  card.classList.add('card-image');
  card.addEventListener('click', handleCardClick);
  return card;
};

document.addEventListener('DOMContentLoaded', () => {
  // This "spreads" the cardSet twice, effectively creating a duplicate/matching set in the matchingSet array.
  const matchingSet = [...cardSet, ...cardSet];

  // Then shuffles it in place, mutating matchingSet to be random.
  shuffleArray(matchingSet);

  // Writes the mapper function to turn the random matchingSet array into HTML nodes.
  const cardList = document.getElementById('card-list');

  // This will append child(ren) elements to the cardList div provided in the HTML template.
  cardList.append(...matchingSet.map(cardListMapper))
})