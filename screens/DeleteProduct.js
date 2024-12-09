import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

export default function Delete() {
  return (
    <View style={styles.page}>
      <Text style={styles.text}>This is Delete</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  page: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'white',
  },
  text: {
    fontSize: 24,
    fontWeight: 'bold',
  },
});
