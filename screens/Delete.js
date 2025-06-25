import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, ViewBase, Button } from 'react-native';
import { useCameraPermissions } from 'expo-camera';

export default function Delete({ navigation, route }) {
  const [permission, requestPermission] = useCameraPermissions();
  const { data } = route.params
  const { PantryID } = route.params
  const [Data, setData] = useState(false);


  useEffect(() => {
    setData(data)
  }, [data]);

  const NavigateToDeleteScanner = () => {
    navigation.navigate('Scan-Delete', {"PantryID": PantryID})
  };

  const NavigateToSelectDelete = () => {
    navigation.navigate('Select-Delete',{ data: data })
  };


  return (
    <View style={styles.page}>
      <View>
        <Text style={styles.text}>This is the Delete Page</Text>
      </View>
      <View style={styles.buttonView}>
        <Button title="Request Permission" style={styles.button} onPress={requestPermission} />
        <Button title="Scan Barcode" style={styles.button} onPress={NavigateToDeleteScanner} />
        <Button title="Select Items To Delete" style={styles.button} onPress={NavigateToSelectDelete} />
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
