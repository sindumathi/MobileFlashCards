import React from 'react';
import { connect } from 'react-redux';
import { View, Text, StyleSheet, TouchableOpacity, Image } from 'react-native';
import { brown, green } from '../utils/colors';
import { useNavigation } from '@react-navigation/native';
import { YellowButton } from './Button';

const Results = (props) => {
  const navigation = useNavigation();

  const { correctAnswer, totalQuestions, percentage, id, reset } = props;
  function handlePlayAgain() {
    reset();
    navigation.navigate('Quiz', { deckId: id });
  }

  return (
    <View style={styles.container}>
      <View style={styles.headerContainer}>
        <Image
          source={require('../assets/headerResults.png')}
          style={styles.headerImage}
        />
      </View>
      <Text style={styles.contentHeader}>
        You have Completed your FlashCard Quiz
      </Text>
      <Text style={styles.quizText}>
        You got {correctAnswer} out of {totalQuestions} correct
      </Text>
      <Text style={styles.percentText}>({percentage}%)</Text>

      <Text style={styles.quizText}>What do you want to do?</Text>

      <View style={styles.resultViewButton}>
        <TouchableOpacity style={styles.submitButtonContainer}>
          <YellowButton
            onPress={() => {
              handlePlayAgain();
            }}
            buttonName={'Play Again'}
          />
        </TouchableOpacity>
        <TouchableOpacity style={styles.submitButtonContainer}>
          <YellowButton
            onPress={() => {
              navigation.navigate('DeckIndex');
            }}
            buttonName={'Go To Deck'}
          />
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  headerContainer: {
    flexDirection: 'row',
    marginBottom: 10,
    justifyContent: 'center',
    alignItems: 'center',
    minWidth: 320,
  },
  headerImage: {
    flex: 1,
    minHeight: 120,
  },
  quizText: {
    color: brown,
    fontSize: 20,
    padding: 10,
    textAlign: 'center',
  },
  percentText: {
    color: green,
    fontSize: 30,
    padding: 10,
    textAlign: 'center',
    fontWeight: 'bold',
  },
  contentHeader: {
    fontSize: 24,
    color: brown,
    textAlign: 'center',
    fontWeight: 'bold',
    padding: 10,
  },
  submitButtonContainer: {
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 20,
  },
  deckViewButton: {
    flex: 1,
    marginBottom: 'auto',
    flexDirection: 'column',
    justifyContent: 'flex-end',
  },
});
const mapStateToProps = (deck, ownProps) => {
  console.log(ownProps);
  const { correctAnswer, totalQuestions } = ownProps;

  const percentage =
    correctAnswer === 0
      ? 0
      : Math.round((correctAnswer / totalQuestions) * 100);
  return { correctAnswer, totalQuestions, percentage };
};

export default connect(mapStateToProps)(Results);
