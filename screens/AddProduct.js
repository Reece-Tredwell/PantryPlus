import React from 'react';
import { View, Text, StyleSheet, ViewBase, Button } from 'react-native';
import { useCameraPermissions } from 'expo-camera';

export default function Add({ navigation }) {
const [permission, requestPermission] = useCameraPermissions();

const NavigateToAddScanner = ()  => {
  navigation.navigate('AddScanner')
};


  return (
      <View style={styles.page}>
        <View>
          <Text style={styles.text}>This is Add</Text>
        </View>
        <View style={styles.buttonView}>
          <Button title="Request Permission" style = {styles.button} onPress={requestPermission}/>       
        <Button title="Scan Barcode" style = {styles.button} onPress={NavigateToAddScanner}/>
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
