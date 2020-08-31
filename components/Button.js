import React from 'react';
import { Text, TouchableOpacity } from 'react-native';
import { Styles } from './Styles';

//created a common button component to reuse

export const YellowButton = ({ onPress, buttonName }) => {
  const styles = Styles;
  return (
    <TouchableOpacity style={styles.submitButton} onPress={onPress}>
      <Text style={styles.submitButtonText}>{buttonName}</Text>
    </TouchableOpacity>
  );
};
