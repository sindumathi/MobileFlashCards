import React, { Component } from 'react';
import { receiveDecks } from '../actions';
import { connect } from 'react-redux';
import { getDecks } from '../utils/api';
import Deck from './Deck';
import PropTypes from 'prop-types';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  Animated,
  Image,
} from 'react-native';
import { FontAwesome } from '@expo/vector-icons';
import { yellow, brown, white } from '../utils/colors';

const AddCardButton = ({ onPress }) => {
  return (
    <TouchableOpacity style={styles.submitButton} onPress={onPress}>
      <Text style={styles.submitButtonText}>Add card</Text>
    </TouchableOpacity>
  );
};

const StartQuiz = ({ onPress }) => {
  return (
    <TouchableOpacity style={styles.submitButton} onPress={onPress}>
      <Text style={styles.submitButtonText}>StartQuiz</Text>
    </TouchableOpacity>
  );
};
class DeckIndex extends Component {
  componentDidMount() {
    const { dispatch } = this.props;
    getDecks()
      .then((decks) => dispatch(receiveDecks(decks)))
      .then(() => this.setState(() => ({ loading: false })));
  }
  //Add cards
  addCards = () => {
    //go to add cards page
  };
  //Start quiz
  startQuiz = () => {};

  render() {
    const { decks } = this.props;
    console.log(decks);
    console.log(
      Object.keys(decks).map((id) => {
        console.log('-------------');
        console.log(decks[id].title);
        console.log('-------------');
      })
    );
    return (
      <View>
        <ScrollView style={styles.container}>
          <View style={styles.headerContianer}>
            <Image
              source={require('../assets/headerImage.png')}
              style={styles.headerImage}
            />
          </View>
          {Object.keys(decks).map((id) => {
            return <Deck id={id} />;
          })}
        </ScrollView>
        <TouchableOpacity>
          <View style={styles.submitButtonContainer}>
            <AddCardButton onPress={'#'} />
            <StartQuiz onPress={'#'} />
          </View>
        </TouchableOpacity>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
  },
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
  contentContainer: {
    flex: 1,
  },
  title: {
    fontSize: 22,
    color: brown,
    paddingLeft: 20,
  },
  createdText: {
    fontSize: 14,
    color: white,
  },

  rightArrow: {
    color: white,
  },
  submitButtonContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  submitButton: {
    backgroundColor: brown,
    padding: 10,
    borderRadius: 5,
    height: 45,
    width: '60%',
    marginBottom: 10,
  },
  submitButtonText: {
    color: white,
    fontSize: 22,
    textAlign: 'center',
  },
});
function mapStateToProps(decks) {
  return {
    decks,
  };
}

export default connect(mapStateToProps)(DeckIndex);
