import React, { Component } from 'react';
import {
  View,
  Text,
  StyleSheet,
  KeyboardAvoidingView,
  TextInput,
  Image,
} from 'react-native';
import { connect } from 'react-redux';
import { brown, red } from '../utils/colors';

import { addCard } from '../actions/index';
import { addCardToDeck } from '../utils/api';
import { YellowButton } from './Button';

class AddCard extends Component {
  state = { question: '', answer: '', errorMessage: '' };
  onSubmit = () => {
    const { question, answer } = this.state;
    const { dispatch, deck, navigation } = this.props;
    const questionAnswer = {
      deckId: deck.id,
      question,
      answer,
    };
    if (question === '' || answer === '') {
      this.setState({
        errorMessage: "Question or Answer Fields Can't be empty",
      });
    } else {
      dispatch(addCard(questionAnswer));
      addCardToDeck(questionAnswer);
      navigation.navigate('DeckView', { id: deck.id });
    }
  };

  render() {
    const { question, answer, errorMessage } = this.state;
    return (
      <KeyboardAvoidingView behavior='padding' style={{ flex: 1 }}>
        <View style={styles.container}>
          <View style={styles.headerContainer}>
            <Image
              source={require('../assets/headerAddCard.png')}
              style={styles.headerImage}
            />
          </View>

          <View style={styles.contentContainer}>
            <Text style={styles.labelText}> Question</Text>
            <TextInput
              value={question}
              style={styles.input}
              onChangeText={(question) =>
                this.setState({ question, errorMessage: '' })
              }
              autoFocus={true}
            />
            <Text style={styles.labelText}>Answer</Text>
            <TextInput
              value={answer}
              style={styles.input}
              onChangeText={(answer) =>
                this.setState({ answer, errorMessage: '' })
              }
            />
            <Text style={styles.errorText}>{errorMessage}</Text>
          </View>

          <View style={styles.submitButtonContainer}>
            <YellowButton onPress={this.onSubmit} buttonName={'Add Card'} />
          </View>
        </View>
      </KeyboardAvoidingView>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginTop: 10,
  },
  headerContainer: {
    flexDirection: 'row',
    marginBottom: 10,
    minHeight: 100,
    alignItems: 'center',
    minWidth: 320,
  },

  headerImage: {
    minHeight: 90,
    alignItems: 'center',
    width: '100%',
  },
  contentContainer: {
    marginTop: 20,
  },

  labelText: {
    fontSize: 22,
    color: brown,
    marginBottom: 10,
  },

  input: {
    height: 44,
    padding: 8,
    borderWidth: 1,
    borderColor: brown,
    marginBottom: 15,
  },
  addViewButton: {
    flex: 1,
    marginBottom: 'auto',
    flexDirection: 'column',
    justifyContent: 'flex-end',
  },
  submitButtonContainer: {
    alignItems: 'center',
    marginTop: 20,
  },
  errorText: {
    color: red,
    padding: 10,
  },
});

const mapStateToProps = (decks, ownProps) => {
  const deckId = ownProps.route.params.deckId;
  const deck = decks[deckId];
  return { deck };
};
export default connect(mapStateToProps)(AddCard);
