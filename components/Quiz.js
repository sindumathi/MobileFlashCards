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
    <TouchableOpacity onPress={onPress}>
      <Text style={styles.submitButtonText}>Correct</Text>
    </TouchableOpacity>
  );
};
const InCorrectButton = ({ onPress }) => {
  return (
    <TouchableOpacity onPress={onPress}>
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
    this.setState({ showAnswer: false });
    const cardEmpty =
      this.state.currentQuestion === this.props.questions.length;
    if (answer === 'correct') {
      this.setState({ correctAnswer: this.state.correctAnswer + 1 });
    }
    if (!cardEmpty) {
      this.setState({ currentQuestion: this.state.currentQuestion + 1 });
    } else {
      this.setState({ quizComplete: true });
    }
  };

  handleStateReset = () => {
    this.setState({
      currentQuestion: 0,
      questionAnswered: false,
      showAnswer: false,
      correctAnswer: 0,
      quizComplete: false,
    });
  };

  render() {
    const { currentQuestion, correctAnswer, showAnswer } = this.state;
    const { totalCards, deck, questions } = this.props;
    const displayQuestion = questions[currentQuestion];
    const quizComplete =
      this.state.currentQuestion === this.props.questions.length;

    return quizComplete ? (
      <View style={{ flex: 1 }}>
        <Results
          correctAnswer={correctAnswer}
          totalQuestions={totalCards}
          id={deck.id}
          reset={this.handleStateReset}
        />
      </View>
    ) : (
      <View style={styles.container}>
        <View style={styles.headerPanel}>
          <View style={styles.headerTextContainer}>
            <Text style={styles.headerText}>Quiz Time!</Text>
            <Text style={styles.countText}>
              {currentQuestion + 1} / {totalCards} cards
            </Text>
          </View>
        </View>
        <View style={styles.card}>
          <View style={styles.quizContainer}>
            <Text style={styles.contentHeader}>Question:</Text>
            <Text style={styles.quizText}>{displayQuestion.question}</Text>
            {!showAnswer && (
              <View style={styles.submitButtonContainer}>
                <ShowAnswerButton onPress={this.toggleQuestionAnswer} />
              </View>
            )}
          </View>

          {showAnswer && (
            <View style={styles.answerContainer}>
              <Text style={styles.contentHeader}>Answer:</Text>
              <Text style={styles.quizText}>{displayQuestion.answer}</Text>
              <Text style={styles.contentHeader}> Your answer is</Text>
              <View style={styles.buttonContainer}>
                <View style={styles.correctButton}>
                  <CorrectButton
                    onPress={() => {
                      this.handleQuestionAnswer('correct');
                    }}
                  />
                </View>
                <View style={styles.inCorrectButton}>
                  <InCorrectButton
                    onPress={() => {
                      this.handleQuestionAnswer('incorrect');
                    }}
                  />
                </View>
              </View>
            </View>
          )}
        </View>
      </View>
    );
  }
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
  },
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
    justifyContent: 'center',
    alignItems: 'center',
  },
  headerText: {
    color: white,
    fontSize: 32,
  },

  countText: {
    alignItems: 'center',
    marginTop: 24,
    fontSize: 26,
    color: white,
  },
  card: {
    padding: 20,
  },
  contentHeader: {
    fontSize: 24,
    color: brown,
    textAlign: 'center',
    fontWeight: 'bold',
    padding: 10,
  },
  quizText: {
    color: brown,
    fontSize: 20,
    padding: 10,
    textAlign: 'center',
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
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 10,
  },
  correctButton: {
    backgroundColor: green,
    padding: 10,
    borderRadius: 5,
    height: 45,
    flexBasis: '40%',
    flexGrow: 0,
    marginRight: 10,
  },
  inCorrectButton: {
    backgroundColor: red,
    padding: 10,
    borderRadius: 5,
    height: 45,
    flexBasis: '40%',
    flexGrow: 0,
  },
});

const mapStateToProps = (decks, ownProps) => {
  const { deckId } = ownProps.route.params;
  const deck = decks[deckId];
  const totalCards = (deck && deck.questions && deck.questions.length) || 0;
  const questions = deck.questions;
  return {
    deck,
    totalCards,
    questions,
    deckId,
  };
};

export default connect(mapStateToProps)(Quiz);
