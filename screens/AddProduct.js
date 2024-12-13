import React from 'react';
import { View, Text, StyleSheet, ViewBase, Button } from 'react-native';

export default function Add() {
  return (
    
      <View style={styles.page}>
        <View>
          <Text style={styles.text}>This is Add</Text>
        </View>
        <View style={styles.buttonView}>
          <Button title="Scan Barcode" style = {styles.button}/>
          <Button title="Enter Barcode Number" style = {styles.button}/>
        </View>
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

  button: {
  flex: 1,
  justifyContent: 'center',
  alignItems: 'center',
},

buttonView: {
  flex: 1,
  justifyContent: 'center',
  alignItems: 'center',
},
});
