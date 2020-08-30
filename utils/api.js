import { AsyncStorage } from 'react-native';
import { formatDecksResults, FLASH_CARDS_KEY } from './_data';

export function getDecks() {
  AsyncStorage.clear();
  return AsyncStorage.getItem(FLASH_CARDS_KEY).then(formatDecksResults);
}

export function saveDeck(deckId, deck) {
  return AsyncStorage.mergeItem(
    FLASH_CARDS_KEY,
    JSON.stringify({
      [deckId]: deck,
    })
  );
}

export function addCardToDeck({ deckId, question, answer }) {
  AsyncStorage.getItem(FLASH_CARDS_KEY).then((result) => {
    let decks = JSON.parse(result);
    decks[deckId].questions.push({ question: question, answer: answer });
    AsyncStorage.mergeItem(FLASH_CARDS_KEY, JSON.stringify(decks));
  });
}
