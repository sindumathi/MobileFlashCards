import React from 'react';
import { connect } from 'react-redux';
import { View, Text, StyleSheet, TouchableOpacity, Image } from 'react-native';
import { brown, green } from '../utils/colors';
import { useNavigation } from '@react-navigation/native';
import { YellowButton } from './Button';

const EmptyCard = (props) => {
  const navigation = useNavigation();

  return (
    <View style={styles.container}>
      <Text style={styles.contentHeader}>
        You dont have any card in this deck
      </Text>
      <Text style={styles.contentText}>
        So please add cards to start the quiz.
      </Text>

      <Text style={styles.contentText}>What do you want to do?</Text>
      <View style={styles.resultViewButton}>
        <View style={styles.submitButtonContainer}>
          <YellowButton
            onPress={() => {
              navigation.navigate('AddCard', {
                deckId: props.route.params.deckId,
              });
            }}
            buttonName={'Add Card'}
          />
        </View>
        <View style={styles.submitButtonContainer}>
          <YellowButton
            onPress={() => {
              navigation.navigate('DeckIndex');
            }}
            buttonName={'Go To Deck'}
          />
        </View>
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
  contentText: {
    color: brown,
    fontSize: 20,
    padding: 10,
    textAlign: 'center',
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

export default connect()(EmptyCard);
