import React, { Component } from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { connect } from 'react-redux';
import { yellow, brown, white } from '../utils/colors';

class Deck extends Component {
  render() {
    const { deck, totalCards } = this.props;
    return (
      <TouchableOpacity>
        <View style={styles.cardContainer}>
          <Text style={styles.cardTitle}>{deck.title}</Text>
          <Text style={styles.cardDate}>Posted on {deck.created}</Text>
          <Text style={styles.totalCards}>{totalCards} flash cards.</Text>
        </View>
      </TouchableOpacity>
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
  const deck = decks[ownProps.id];
  const totalCards = deck && deck.questions.length;
  console.log(deck);
  return {
    deck,
    totalCards,
  };
};

export default connect(mapStateToProps)(Deck);
