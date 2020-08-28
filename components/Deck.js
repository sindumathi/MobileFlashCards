import React, { Component } from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { connect } from 'react-redux';
import { useNavigation } from '@react-navigation/native';
import { yellow, brown, white } from '../utils/colors';

const Deck = (props) => {
  const { deck, totalCards } = props;
  const navigation = useNavigation();
  function check() {
    console.log('Inside navigation deck');
    console.log(navigation);
    console.log('Inside navigation deck----------------------');
  }
  return (
    <TouchableOpacity
      onPress={() => navigation.navigate('DeckView', { id: deck.id })}
    >
      <View style={styles.cardContainer}>
        <Text style={styles.cardTitle}>{deck.title}</Text>
        <Text style={styles.cardDate}>Posted on {deck.created}</Text>
        <Text style={styles.totalCards}>{totalCards} flash cards.</Text>
      </View>
    </TouchableOpacity>
  );
};

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
  const totalCards = (deck && deck.questions && deck.questions.length) || 0;
  console.log(deck);
  return {
    deck,
    totalCards,
  };
};

export default connect(mapStateToProps)(Deck);
