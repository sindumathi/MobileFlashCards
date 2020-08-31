import React, { Component } from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { connect } from 'react-redux';
import { brown, white } from '../utils/colors';
import { YellowButton } from './Button';

//Individual deck view component: displays option to add card and start quiz.
//If no flash cards routes to a page where user will be alerted to add new card

class DeckView extends Component {
  handleQuizSubmit = () => {
    const { totalCards, id, navigation } = this.props;
    totalCards === 0
      ? navigation.navigate('EmptyCard', { deckId: id })
      : navigation.navigate('Quiz', { deckId: id });
  };
  render() {
    const { deck, totalCards, outputText, id, navigation } = this.props;

    return (
      <View style={styles.container}>
        <View style={styles.cardContainer}>
          <View style={styles.contentContainer}>
            <Text style={styles.cardTitle}>{deck.title}</Text>
            <Text style={styles.cardDate}>Posted on {deck.created}</Text>
            <Text style={styles.totalCards}>
              {totalCards + ' ' + outputText}{' '}
            </Text>
          </View>
        </View>
        <View style={styles.deckViewButton}>
          <TouchableOpacity style={styles.submitButtonContainer}>
            <YellowButton
              onPress={() => {
                navigation.navigate('AddCard', {
                  deckId: id,
                });
              }}
              buttonName={'Add Card'}
            />
          </TouchableOpacity>
          <TouchableOpacity style={styles.submitButtonContainer}>
            <YellowButton
              onPress={() => {
                this.handleQuizSubmit();
              }}
              buttonName={'Start Quiz'}
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
  contentContainer: {
    padding: 20,
  },
  cardTitle: {
    fontSize: 28,
    color: white,
  },
  cardDate: {
    fontSize: 12,
    paddingBottom: 10,
    color: white,
  },
  totalCards: {
    fontSize: 28,
    color: white,
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
const mapStateToProps = (decks, ownProps) => {
  const { id } = ownProps.route.params;
  const deck = decks[id];
  const totalCards = (deck && deck.questions && deck.questions.length) || 0;
  const outputText = totalCards > 1 ? 'flash cards' : 'flash card';
  return {
    deck,
    totalCards,
    outputText,
    id,
  };
};

export default connect(mapStateToProps)(DeckView);
