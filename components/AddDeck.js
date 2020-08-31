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

//Controlled component: deck name is stored in state
//Updates both Async storage and redux store
//Validation:i) Deckname cant be empty
//           ii) Deckname should be unique
//After deck creation redirects to deck view

class AddDeck extends React.Component {
  state = { deckName: '', errorMessage: '' };
  onSubmit = () => {
    const { deckName } = this.state;
    const { dispatch, decks } = this.props;
    if (deckName === '') {
      this.setState({ errorMessage: "Deck name can't be empty" });
      return;
    }
    const deckId = generateID(deckName);
    const deckExists = Object.keys(decks).includes(deckId);
    if (deckExists) {
      this.setState({ errorMessage: 'Deck already exists' });
      return;
    }
    const [month, date, year] = new Date().toLocaleDateString().split('/');
    const created = `${year}-${month}-${date}`;
    const deckInfo = {
      id: deckId,
      title: deckName.trim(),
      questions: [],
      timeStamp: Date.now(),
      created,
    };

    dispatch(addDeck(deckId, deckInfo));
    saveDeck(deckId, deckInfo);
    this.setState({ deckName: '', errorMessage: '' });
    this.props.navigation.navigate('DeckView', { id: deckId });
  };

  render() {
    const { deckName, errorMessage } = this.state;
    return (
      <KeyboardAvoidingView behavior='padding' style={{ flex: 1 }}>
        <View style={styles.container}>
          <View style={styles.headerContainer}>
            <Image
              source={require('../assets/headerAddDeck.png')}
              style={styles.headerImage}
            />
          </View>
          <View style={styles.contentContainer}>
            <Text style={styles.labelText}> Enter Deck name</Text>
            <TextInput
              value={deckName}
              style={styles.input}
              onChangeText={(deckName) =>
                this.setState({ deckName, errorMessage: '' })
              }
            />
            <Text style={styles.errorText}>{errorMessage}</Text>
          </View>
          <View style={styles.submitButtonContainer}>
            <DeckSubmitButton onPress={this.onSubmit} />
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
    alignItems: 'center',
    minHeight: 100,
    minWidth: 320,
  },
  headerImage: {
    minHeight: 90,
    alignItems: 'center',
    width: '100%',
  },
  labelText: {
    fontSize: 22,
    color: brown,
    marginBottom: 10,
  },
  contentContainer: {
    marginTop: 10,
  },

  input: {
    height: 44,
    padding: 8,
    borderWidth: 1,
    borderColor: brown,
    marginBottom: 15,
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
  errorText: {
    color: red,
    padding: 10,
  },
});
const mapStateToProps = (decks) => {
  return {
    decks,
  };
};

export default connect(mapStateToProps)(AddDeck);
