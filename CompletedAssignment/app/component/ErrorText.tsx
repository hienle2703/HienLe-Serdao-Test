import {View, Text, StyleSheet} from 'react-native';
import React from 'react';

const ErrorText = ({message, isError}: {message: string; isError: boolean}) => {
  if (!isError) {
    return null;
  }

  return (
    <View style={styles.width80}>
      <Text style={styles.errorText}>{message}</Text>
    </View>
  );
};

export default ErrorText;

const styles = StyleSheet.create({
  width80: {
    width: '80%',
  },
  errorText: {
    color: 'red',
    fontSize: 12,
  },
});
