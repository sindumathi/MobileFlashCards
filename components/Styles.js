import React, { Component } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  Animated,
  Image,
} from 'react-native';
import { yellow, brown, white } from '../utils/colors';

const YellowButton = ({ onPress, buttonName }) => {
  return (
    <TouchableOpacity style={styles.submitButton} onPress={onPress}>
      <Text style={styles.submitButtonText}>{buttonName}</Text>
    </TouchableOpacity>
  );
};

export const Styles = StyleSheet.create({
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
});
