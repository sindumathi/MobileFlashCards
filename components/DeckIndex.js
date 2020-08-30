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
  FlatList,
  TouchableOpacity,
  Animated,
  Image,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { yellow, brown, white } from '../utils/colors';

class DeckIndex extends Component {
  render() {
    const { decks, navigation } = this.props;
    return (
      <View style={styles.container}>
        <ScrollView>
          <View style={styles.headerContainer}>
            <Image
              source={require('../assets/headerImage.png')}
              style={styles.headerImage}
            />
          </View>

          {/*}  <FlatList
          data={Object.keys(decks).map((id) => {
            return { key: id };
          })}
          renderItem={({ item }) => <Deck key={item.key} id={item.key} />}
        />*/}
          {Object.keys(decks).map((id) => {
            return <Deck key={id} id={id} />;
          })}
        </ScrollView>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
  },
  headerContainer: {
    flex: 1,
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
  contentContainer: {
    marginTop: 10,
    justifyContent: 'center',
    alignItems: 'center',
    minWidth: 320,
  },
  addIconContainer: {
    flex: 1,
    justifyContent: 'flex-end',
    alignItems: 'flex-end',
  },
  addIcon: {
    marginTop: 10,
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
