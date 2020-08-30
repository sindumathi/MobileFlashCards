import React, { Component } from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import { Styles } from './Styles';

export const YellowButton = ({ onPress, buttonName }) => {
  const styles = Styles;
  return (
    <TouchableOpacity style={styles.submitButton} onPress={onPress}>
      <Text style={styles.submitButtonText}>{buttonName}</Text>
    </TouchableOpacity>
  );
};