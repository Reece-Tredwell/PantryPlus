import React from 'react';
import { View, Text, StyleSheet, ViewBase, Button } from 'react-native';
import { useCameraPermissions } from 'expo-camera';
import { useNavigationState, useFocusEffect } from '@react-navigation/native';

export default function Add({ navigation, route }) {
  const [permission, requestPermission] = useCameraPermissions();
  const { PantryID } = route.params


  const NavigateToAddScanner = () => {
    navigation.navigate('Add-Scanner', { "PantryID": PantryID })
  };


  return (
    <View style={styles.page}>
      <View style={styles.buttonView}>
        <Button title="Request Permission" style={styles.button} onPress={requestPermission} />
        <Button title="Scan Barcode" style={styles.button} onPress={NavigateToAddScanner} />
        <Button title="Enter Barcode Number" style={styles.button} />
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
