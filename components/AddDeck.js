import React from 'react';
import {
  KeyboardAvoidingView,
  View,
  Image,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
} from 'react-native';
import { addDeck } from '../actions';
import { saveDeck } from '../utils/api';
import { connect } from 'react-redux';
import { yellow, brown, white, red } from '../utils/colors';
import { generateID } from '../utils/helpers';

const DeckSubmitButton = ({ onPress }) => {
  return (
    <TouchableOpacity style={styles.submitButton} onPress={onPress}>
      <Text style={styles.submitButtonText}>Create Deck</Text>
    </TouchableOpacity>
  );
};

class AddDeck extends React.Component {
  state = { deckName: '', errorMessage: '' };
  onSubmit = () => {
    const { deckName } = this.state;
    const { dispatch } = this.props;
    if (deckName === '') {
      this.setState({ errorMessage: "Deck name can't be empty" });
      return;
    }
    const deckId = generateID(deckName);
    const deckInfo = { id: deckId, title: deckName.trim(), questions: [] };
    dispatch(addDeck(deckId, deckInfo));
    saveDeck(deckId, deckInfo);
    this.setState({ deckName: '', errorMessage: '' });
    this.props.navigation.navigate('DeckIndex');
  };

  render() {
    const { deckName, errorMessage } = this.state;
    console.log(errorMessage);
    return (
      <KeyboardAvoidingView behavior='padding' style={{ flex: 1 }}>
        <View style={styles.headerContianer}>
          <Image
            source={require('../assets/headerAddDeck.png')}
            style={styles.headerImage}
          />
        </View>
        <Text style={styles.labelText}> Enter Deck name</Text>
        <TextInput
          value={deckName}
          style={styles.input}
          onChangeText={(deckName) => this.setState({ deckName })}
        />
        <Text style={styles.errorText}>{errorMessage}</Text>
        <View style={styles.submitButtonContainer}>
          <DeckSubmitButton onPress={this.onSubmit} />
        </View>
      </KeyboardAvoidingView>
    );
  }
}

const styles = StyleSheet.create({
  headerContianer: {
    flex: 1,
    flexDirection: 'row',
    backgroundColor: yellow,
    marginBottom: 10,
    alignItems: 'center',
    minHeight: 100,
    minWidth: 320,
  },
  headerImage: {
    minHeight: 100,
    alignItems: 'center',
    width: '100%',
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
  submitButtonContainer: {
    flex: 1,
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
  errorText: {
    color: red,
    padding: 10,
  },
});

export default connect()(AddDeck);
