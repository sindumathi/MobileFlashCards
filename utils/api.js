import { AsyncStorage } from 'react-native';
import { formatDecksResults, FLASH_CARDS_KEY } from './_data';

export function getDecks() {
  return AsyncStorage.getItem(FLASH_CARDS_KEY).then(formatDecksResults);
}

export function saveDeck(key, deck) {
  return AsyncStorage.mergeItem(
    FLASH_CARDS_KEY,
    JSON.stringify({
      [key]: deck,
    })
  );
}

export function saveCard(key, question, answer) {
  AsyncStorage.getItem(FLASH_CARDS_KEY).then((result) => {
    let decks = JSON.parse(result);
    decks[key].questions.push({ question: question, answer: answer });
    AsyncStorage.mergeItem(FLASH_CARDS_KEY, JSON.stringify(decks));
  });
}
