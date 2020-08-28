import React, { Component } from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { connect } from 'react-redux';
import { yellow, brown, white } from '../utils/colors';

const AddCardButton = ({ onPress }) => {
  return (
    <TouchableOpacity style={styles.submitButton} onPress={onPress}>
      <Text style={styles.submitButtonText}>Add card</Text>
    </TouchableOpacity>
  );
};

const StartQuiz = ({ onPress }) => {
  return (
    <TouchableOpacity style={styles.submitButton} onPress={onPress}>
      <Text style={styles.submitButtonText}>StartQuiz</Text>
    </TouchableOpacity>
  );
};
class DeckView extends Component {
  render() {
    const { deck, totalCards, outputText, id } = this.props;
    return (
      <View style={styles.container}>
        <View style={styles.cardContainer}>
          <Text style={styles.cardTitle}>{deck.title}</Text>
          <Text style={styles.cardDate}>Posted on {deck.created}</Text>
          <Text style={styles.totalCards}>
            {totalCards + ' ' + outputText}{' '}
          </Text>
        </View>
        <View>
          <TouchableOpacity style={styles.submitButtonContainer}>
            <AddCardButton
              onPress={() => {
                this.props.navigation.navigate('AddCard', {
                  deckId: id,
                });
              }}
            />
          </TouchableOpacity>
          <TouchableOpacity style={styles.submitButtonContainer}>
            <StartQuiz
              onPress={() => {
                this.props.navigation.navigate('Quiz', { deckId: id });
              }}
            />
          </TouchableOpacity>
        </View>
      </View>
    );
  }
}
const styles = StyleSheet.create({
  container: { flex: 1 },
  cardContainer: {
    backgroundColor: brown,
    padding: 10,
    borderRadius: 10,
    margin: 10,
    marginTop: 20,
  },
  cardTitle: {
    fontSize: 22,
    padding: 10,
    color: white,
  },
  cardDate: {
    fontSize: 14,
    fontStyle: 'italic',
    color: white,
  },
  totalCards: {
    color: white,
    fontSize: 18,
  },
  submitButtonContainer: {
    justifyContent: 'center',
    alignItems: 'center',
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
});
const mapStateToProps = (decks, ownProps) => {
  const { id } = ownProps.route.params;
  const deck = decks[id];
  const totalCards = (deck && deck.questions && deck.questions.length) || 0;
  const outputText = totalCards > 1 ? 'flash cards' : 'flash card';
  console.log(deck);
  return {
    deck,
    totalCards,
    outputText,
    id,
  };
};

export default connect(mapStateToProps)(DeckView);
