import { ADD_CARD, ADD_DECK, RECEIVE_DECKS } from '../actions';

export default function decks(state = {}, action) {
  switch (action.type) {
    case ADD_CARD:
      const { deckId, question, answer } = action.questions;
      return {
        ...state,
        [deckId]: {
          title: state[deckId].title,
          questions: state[deckId].questions.concat({
            question: question,
            answer: answer,
          }),
        },
      };
    case ADD_DECK: {
      const { deckId, deck } = action.deckInfo;
      return {
        ...state,
        [deckId]: deck,
      };
    }
    case RECEIVE_DECKS:
      return {
        ...state,
        ...action.decks,
      };
    default:
      return state;
  }
}
