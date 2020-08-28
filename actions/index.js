export const RECEIVE_DECKS = 'RECEIVE_DECKS';
export const ADD_DECK = 'ADD_DECK';
export const ADD_CARD = 'ADD_CARD';

export function receiveDecks(decks) {
  return {
    type: RECEIVE_DECKS,
    decks,
  };
}

export function addDeck(deck) {
  return {
    type: ADD_DECK,
    deck,
  };
}

export function addCard(questions) {
  return {
    type: ADD_CARD,
    questions,
  };
}
/*
export function handleAddDeck(deckId, deckInfo) {
  const deck = { deckId, deckInfo };
  return (dispatch) => {
    return saveDeck(deckId, deckInfo).then((deck) => {
      dispatch(addDeck(deck));
    });
  };
}*/
