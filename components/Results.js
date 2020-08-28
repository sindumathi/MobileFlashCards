import React from 'react';
import { connect } from 'react-redux';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { black, white } from '../utils/colors';

const Results = (props) => {
  const { correctAnswer, totalQuestions, percentage } = props;

  return (
    <View>
      <Text>Completed your FlashCards</Text>
      <Text>
        You got {correctAnswer} out of {totalQuestions} correct ({percentage}%)
      </Text>

      <TouchableOpacity>
        <Text>Return To Deck</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({});
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
