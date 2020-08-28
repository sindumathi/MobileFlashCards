import React, { Component, Fragment } from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { connect } from 'react-redux';
import { yellow, brown, white, green, red } from '../utils/colors';
import Results from './Results';

const ShowAnswerButton = ({ onPress }) => {
  return (
    <TouchableOpacity style={styles.submitButton} onPress={onPress}>
      <Text style={styles.submitButtonText}>Show Answer</Text>
    </TouchableOpacity>
  );
};

const ShowQuestionButton = ({ onPress }) => {
  return (
    <TouchableOpacity style={styles.submitButton} onPress={onPress}>
      <Text style={styles.submitButtonText}>Show Question</Text>
    </TouchableOpacity>
  );
};

const CorrectButton = ({ onPress }) => {
  return (
    <TouchableOpacity
      style={[styles.submitButton, styles.correctButton]}
      onPress={onPress}
    >
      <Text style={styles.submitButtonText}>Correct</Text>
    </TouchableOpacity>
  );
};
const InCorrectButton = ({ onPress }) => {
  return (
    <TouchableOpacity
      style={[styles.submitButton, styles.inCorrectButton]}
      onPress={onPress}
    >
      <Text style={styles.submitButtonText}>Incorrect</Text>
    </TouchableOpacity>
  );
};

class Quiz extends Component {
  state = {
    currentQuestion: 0,
    questionAnswered: false,
    showAnswer: false,
    correctAnswer: 0,
    quizComplete: false,
  };
  toggleQuestionAnswer = () => {
    this.setState({
      showAnswer: !this.state.showAnswer,
    });
  };

  handleQuestionAnswer = (answer) => {
    console.log('answer' + answer);
    const cardEmpty =
      this.state.currentQuestion === this.props.questions.length;
    if (answer === 'correct') {
      console.log('answer' + answer);
      this.setState(() => {
        correctAnswer: this.state.correctAnswer + 1;
      });
      if (!cardEmpty) {
        this.setState({ currentQuestion: this.state.currentQuestion + 1 });
      } else {
        this.setState({ quizComplete: true });
      }
    }
  };

  render() {
    const { currentQuestion, correctAnswer, showAnswer } = this.state;
    console.log('================showanswer');
    console.log(showAnswer);
    const { totalCards, deck, questions } = this.props;
    const displayQuestion = questions[currentQuestion];
    const quizComplete =
      this.state.currentQuestion === this.props.questions.length;
    return quizComplete ? (
      <View style={{ flex: 1 }}>
        <Results correctAnswer={correctAnswer} totalQuestions={totalCards} />
      </View>
    ) : (
      <View style={{ flex: 1 }}>
        <View style={styles.headerPanel}>
          <View style={styles.headerTextContainer}>
            <Text style={styles.headerText}>Quiz Time!</Text>
            <Text style={styles.countText}>
              {currentQuestion + 1} / {totalCards}
            </Text>
          </View>
        </View>
        <View style={styles.card}>
          {showAnswer === false ? (
            <View>
              <Text>Questions</Text>
              <Text>{displayQuestion.question}</Text>
              <View style={styles.submitButtonContainer}>
                <ShowAnswerButton onPress={this.toggleQuestionAnswer} />
              </View>
            </View>
          ) : (
            <View>
              <Text>Answers</Text>
              <Text>{displayQuestion.answer}</Text>
              <View style={styles.submitButtonContainer}>
                <ShowQuestionButton onPress={this.toggleQuestionAnswer} />
              </View>
            </View>
          )}
          <View>
            <View style={styles.submitButtonContainer}>
              <CorrectButton
                onPress={() => {
                  this.handleQuestionAnswer('correct');
                }}
              />
            </View>
            <View style={styles.submitButtonContainer}>
              <InCorrectButton
                onPress={() => {
                  this.handleQuestionAnswer('incorrect');
                }}
              />
            </View>
          </View>
        </View>
      </View>
    );
  }
}
const styles = StyleSheet.create({
  headerPanel: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    paddingLeft: 16,
    paddingRight: 16,
    height: 130,
    borderRadius: 10,
    backgroundColor: yellow,
  },
  headerTextContainer: {
    flex: 1,
    flexDirection: 'column',
  },
  headerText: {
    color: white,
    fontSize: 32,
  },
  countText: {
    marginTop: 24,
    fontSize: 26,
    color: white,
  },
  submitButtonContainer: {
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 10,
  },
  submitButton: {
    backgroundColor: yellow,
    padding: 10,
    borderRadius: 5,
    height: 45,
    width: '60%',
  },
  submitButtonText: {
    color: white,
    fontSize: 22,
    textAlign: 'center',
  },
  correctButton: {
    backgroundColor: green,
  },
  inCorrectButton: {
    backgroundColor: red,
  },
});

const mapStateToProps = (decks, ownProps) => {
  const { deckId } = ownProps.route.params;

  console.log(ownProps);
  const deck = decks[deckId];
  console.log(deck);
  const totalCards = (deck && deck.questions && deck.questions.length) || 0;
  console.log(totalCards);
  const questions = deck.questions;
  return {
    deck,
    totalCards,
    questions,
    deckId,
  };
};

export default connect(mapStateToProps)(Quiz);
