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
      <View style={styles.cardContainer}>
        <Text style={styles.cardTitle}>{deck.title}</Text>
        <Text style={styles.cardDate}>Posted on {deck.created}</Text>
        <Text style={styles.totalCards}>{totalCards + ' ' + outputText} </Text>

        <TouchableOpacity style={styles.submitButtonContainer}>
          <AddCardButton
            onPress={() => {
              this.props.navigation.navigate('AddCard', {
                deckId: id,
              });
            }}
          />
        </TouchableOpacity>
      </View>
    );
  }
}
const styles = StyleSheet.create({
  cardContainer: {
    flex: 1,
    backgroundColor: brown,
    padding: 10,
    borderRadius: 10,
    marginBottom: 10,
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
});
const mapStateToProps = (decks, ownProps) => {
  const { id } = ownProps.route.params;
  const deck = decks[id];
  console.log('----------------');
  console.log(ownProps);
  console.log('deck' + id);
  console.log('----------------');
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
