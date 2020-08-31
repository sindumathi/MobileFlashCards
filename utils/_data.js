import { AsyncStorage } from 'react-native';
export const FLASH_CARDS_KEY = 'MobileFlashCards:Decks';

const data = {
  KidsMathsQuiz: {
    id: 'KidsMathsQuiz',
    title: 'Kids Maths Quiz',
    timestamp: 1563796800,
    created: '2020-08-25',
    questions: [
      {
        question: 'What is 53+28?',
        answer: '81',
      },
      {
        question: 'which is greater 599 or 595?',
        answer: '599',
      },
      {
        question: 'which is smallest three digit number?',
        answer: '100',
      },
      {
        question:
          'If you split a pizza into two parts how will you represent in fraction?',
        answer: '1/2',
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
