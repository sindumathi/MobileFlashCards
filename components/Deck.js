import React, { useRef } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Animated,
} from 'react-native';
import { connect } from 'react-redux';
import { useNavigation } from '@react-navigation/native';
import { brown, white } from '../utils/colors';

//Deck displays the decks in decklist.
//Animation is added to each deck press.
// when individual deck is used it routes to deckview

const Deck = (props) => {
  const fadeAnim = useRef(new Animated.Value(0)).current;
  const { deck, totalCards } = props;
  const navigation = useNavigation();
  const animateNavigateDeck = () => {
    Animated.timing(fadeAnim, {
      toValue: 1,
      duration: 100,
      useNativeDriver: true,
    }).start(() => navigation.navigate('DeckView', { id: deck.id }));
  };
  return (
    <TouchableOpacity onPress={animateNavigateDeck} key={deck.id}>
      <View style={styles.cardContainer}>
        <View style={styles.contentContainer}>
          <Text style={styles.cardTitle}>{deck.title}</Text>
          <Text style={styles.cardDate}>Posted on {deck.created}</Text>
          <Text style={styles.totalCards}>{totalCards} flash cards.</Text>
        </View>
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
  contentContainer: {
    padding: 20,
  },
  cardTitle: {
    fontSize: 28,
    color: white,
  },
  cardDate: {
    fontSize: 12,
    color: white,
  },
  totalCards: {
    color: white,
    fontSize: 22,
  },
});
const mapStateToProps = (decks, ownProps) => {
  const deck = decks[ownProps.id];
  const totalCards = (deck && deck.questions && deck.questions.length) || 0;
  return {
    deck,
    totalCards,
  };
};

export default connect(mapStateToProps)(Deck);
