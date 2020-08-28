import React, { Component } from 'react';
import {
  View,
  Text,
  StyleSheet,
  KeyboardAvoidingView,
  TouchableOpacity,
  TextInput,
  Image,
} from 'react-native';
import { yellow, brown, white } from '../utils/colors';

const SubmitButton = ({ onPress }) => {
  return (
    <TouchableOpacity style={styles.submitButton} onPress={onPress}>
      <Text style={styles.submitButtonText}>Add card</Text>
    </TouchableOpacity>
  );
};

class AddCard extends Component {
  state = { question: '', answer: '' };
  render() {
    const { question, answer } = this.state;
    return (
      <KeyboardAvoidingView behavior='padding' style={{ flex: 1 }}>
        <View style={styles.headerContianer}>
          <Image
            source={require('../assets/headerAddCard.png')}
            style={styles.headerImage}
          />
        </View>
        <Text style={styles.labelText}> Question</Text>
        <TextInput
          value={question}
          style={styles.input}
          onChangeText={(question) => this.setState({ question })}
          autoFocus={true}
        />
        <Text style={styles.labelText}>Answer</Text>
        <TextInput
          value={answer}
          style={styles.input}
          onChangeText={(answer) => this.setState({ answer })}
        />
        <View style={styles.submitButtonContainer}>
          <SubmitButton onPress={this.submit} />
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
    justifyContent: 'center',
    alignItems: 'center',
    minHeight: 100,
    minWidth: 320,
  },
  headerImage: {
    flex: 1,
    minHeight: 100,
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
});
export default AddCard;
