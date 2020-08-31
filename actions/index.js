export const RECEIVE_DECKS = 'RECEIVE_DECKS';
export const ADD_DECK = 'ADD_DECK';
export const ADD_CARD = 'ADD_CARD';

export function receiveDecks(decks) {
  return {
    type: RECEIVE_DECKS,
    decks,
  };
}

export function addDeck(deckId, deck) {
  const deckInfo = { deckId, deck };
  return {
    type: ADD_DECK,
    deckInfo,
  };
}

export function addCard(questions) {
  return {
    type: ADD_CARD,
    questions,
  };
}
