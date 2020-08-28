import { AsyncStorage } from 'react-native';
export const FLASH_CARDS_KEY = 'MobileFlashCards:Decks';

const data = {
  CapitalCities: {
    id: 'CapitalCities',
    title: 'Capital Cities',
    timestamp: 1563796800,
    created: '2019-07-22',
    questions: [
      {
        question: 'What is the capital of Canada?',
        answer: 'Ottawa',
      },
      {
        question: 'What is the capital of China?',
        answer: 'Beijing',
      },
      {
        question: 'What is the capital of Poland?',
        answer: 'Warsaw',
      },
      {
        question: 'What is the capital of Germany?',
        answer: 'Berlin',
      },
    ],
  },
  React: {
    id: 'React',
    title: 'React',
    timestamp: 1563710400,
    created: '2019-07-21',
    questions: [
      {
        question: 'What is React?',
        answer: 'A library for managing user interfaces',
      },
      {
        question: 'Where do you make Ajax requests in React?',
        answer: 'The componentDidMount lifecycle event',
      },
    ],
  },
};

function setInitialData() {
  AsyncStorage.setItem(FLASH_CARDS_KEY, JSON.stringify(data));
  return data;
}

export function formatDecksResults(results) {
  return results === null ? setInitialData() : JSON.parse(results);
  //setInitialData();
}
