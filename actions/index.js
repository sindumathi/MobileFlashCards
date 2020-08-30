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
  console.log(questions);
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
}
export function handleAddCard(questionAnswer) {
  console.log('inside the handle add card------------------');
  return (dispatch) => {
    return saveCard(questionAnswer)
      .then((questionAnswer) => {
        dispatch(addCard(questionAnswer));
      })
      .catch((e) => {
        console.warn('ERROR: Add card');
        dispatch(addCard(questionAnswer));
      });
  };
}*/
