import { Camera, CameraView } from 'expo-camera';
import axios from 'axios';
import React, { useState } from 'react';
import { View, Text, StyleSheet } from 'react-native';

export default function AddScanner() {
  const [data, setData] = useState(null);
  const [scannedBarcodes, setScannedBarcodes] = useState(new Set()); 

  const fetchData = async (barcode) => {
    try {
      const response = await axios.get(`https://api.upcitemdb.com/prod/trial/lookup?upc=${barcode}`);
      setData(response.data);
      console.log("Fetched data:", response.data); 
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  const handleBarcodeScanned = ({ data: barcode }) => {
    if (!scannedBarcodes.has(barcode)) {
      console.log("Barcode Number Read: " + barcode);
    };


    if (!scannedBarcodes.has(barcode)) {
      setScannedBarcodes((prev) => new Set(prev).add(barcode));
      fetchData(barcode);
    }
  };

  return (
    <View style={styles.page}>
      <Text style={styles.text}>This is going to be the Camera Page</Text>
      <CameraView
        style={StyleSheet.absoluteFillObject} facing="back" onBarcodeScanned={handleBarcodeScanned}
      />
      {/* {data && (
        <View>
          <Text>Fetched Data: {JSON.stringify(data)}</Text>
        </View>
      )} */}
    </View>
  );
};

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
