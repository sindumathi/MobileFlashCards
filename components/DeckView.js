import React, { Component } from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { connect } from 'react-redux';
import { yellow, brown, white, blueGrey, indigo } from '../utils/colors';
import { YellowButton } from './Button';

class DeckView extends Component {
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
                navigation.navigate('Quiz', { deckId: id });
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
  console.log(deck);
  return {
    deck,
    totalCards,
    outputText,
    id,
  };
};

export default connect(mapStateToProps)(DeckView);
