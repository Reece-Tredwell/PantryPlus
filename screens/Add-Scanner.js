import { Camera, CameraView } from 'expo-camera';
import axios from 'axios';
import React, { useState, useEffect, useRef } from 'react';
import { View, Text, Modal, StyleSheet, TouchableOpacity } from 'react-native';
import { Image } from 'expo-image';
import { DataTable } from 'react-native-paper';
import config from 'D:\\PersonalProjects\\PantryPlus\\config.json';
import { useNavigationState, useFocusEffect } from '@react-navigation/native';


export default function AddScanner({ route }) {
  const scanLock = useRef(false);
  const { PantryID } = route.params;
  const [data, setData] = useState(null);
  const [scanned, setScanned] = useState(false);
  const [modalVisible, setModalVisible] = useState(false);
  const [Quantity, setQuantity] = useState(0);

  const fetchData = async (barcode) => {
    try {
      const response = await axios.get(
        `https://world.openfoodfacts.org/api/v0/product/${barcode}.json`
      );
      setData(response.data);
      setModalVisible(true);
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  const handleBarcodeScanned = ({ data: barcode }) => {
    if (scanLock.current) return;

    console.log("Barcode Number Read: " + barcode);
    scanLock.current = true;
    setScanned(true);

    fetchData(barcode)
      .catch((error) => {
        console.error("Error fetching data:", error);
        setScanned(false);
        scanLock.current = false;
      });
  };

  const increment = () => setQuantity(prevQuantity => prevQuantity + 1);
  const decrement = () => setQuantity(prevQuantity => Math.max(0, prevQuantity - 1));

  const insertItem = async (productID, Image, productName) => {

 
    try {
      if (Image == null) {
        Image = ""
      }

      const response = await fetch(`https://cfaem0qp2j.execute-api.ap-southeast-2.amazonaws.com/Production/insertItem`, {
        method: "POST",
        headers: {
          "accept": "application/json",
          "Content-Type": "application/json",
          "x-api-key": config["PantryCreateAPIKey"]
        },
        body: JSON.stringify({
          "DBID": PantryID,
          "itemQuant": Quantity,
          "itemData": {
            "productID": productID,
            "productName": productName,
            "Image": Image,
            "userID": "1",
            "dateAdded": new Date()
          }
        })
      });
      if (!response.ok) {
        console.log("Failed")
        console.log(response)
        throw new Error(`Failed To Add Data: ${response.status} ${response.statusText}`);
      }
    } catch {
      console.log(response)
      console.log("Failed To Insert Data Into Pantry")
    }
    setModalVisible(false)
  }

  const ifClosed = () => {
    setModalVisible(false)
    setScanned(false)
    scanLock.current = false;
  }

  const ifAdded = () => {
    insertItem(data.code, data.product.image_front_thumb_url, data.product.product_name)
    setModalVisible(false)
    setScanned(false)
    scanLock.current = false;
  }

  return (
    <View style={styles.page}>
      <Text style={styles.text}>Loading</Text>
      <CameraView
        style={StyleSheet.absoluteFillObject}
        facing="back"
        onBarcodeScanned={handleBarcodeScanned}
      />
      {modalVisible && (
        <Modal
          animationType="slide"
          transparent={true}
          visible={modalVisible}
          onRequestClose={() => setModalVisible(false)}
        >
          <View style={styles.modalOverlay}>
            <View style={styles.modalContent}>

              <DataTable style={styles.container}>
                <DataTable.Row>
                  <DataTable.Cell style={styles.titleCell}>Product ID</DataTable.Cell>
                  <DataTable.Cell>{data.code}</DataTable.Cell>
                </DataTable.Row>
                <DataTable.Row>
                  <DataTable.Cell style={styles.titleCell}>Product Name</DataTable.Cell>
                  <DataTable.Cell>{data.product.product_name || "N/A"}</DataTable.Cell>
                </DataTable.Row>
                <DataTable.Row>
                  <DataTable.Cell style={styles.titleCell}>Manufacturer</DataTable.Cell>
                  <DataTable.Cell>{data.product.brands || "N/A"}</DataTable.Cell>
                </DataTable.Row>
              </DataTable>
              <Image
                source={{ uri: data.product.image_front_thumb_url }}
                style={{ width: 100, height: 100 }}
              />
              <Text style={styles.QuantTitle}>Quantity</Text>
              <View style={styles.Counter}>
                <TouchableOpacity style={styles.DecButton} onPress={decrement}>
                  <Text style={styles.closeButtonText}>-</Text>
                </TouchableOpacity>
                <Text style={styles.number}>{Quantity}</Text>
                <TouchableOpacity style={styles.IncButton} onPress={increment}>
                  <Text style={styles.closeButtonText}>+</Text>
                </TouchableOpacity>
              </View>
              <View style={styles.ButtonRow}>
                <TouchableOpacity style={styles.closeButton} onPress={() => ifClosed()}>
                  <Text style={styles.closeButtonText}>Close</Text>
                </TouchableOpacity>
                <TouchableOpacity style={styles.AddButton} onPress={() => ifAdded()}>
                  <Text style={styles.closeButtonText}> Add </Text>
                </TouchableOpacity>
              </View>
            </View>
          </View>
        </Modal>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  ButtonRow: {
    top: 10,
    flexDirection: 'row',
  },
  QuantTitle: {
    top: 10,
    fontWeight: 'bold',
    fontSize: 15
  },
  number: {
    top: 15,
    fontSize: 20
  },
  IncButton: {
    left: 10,
    marginTop: 10,
    padding: 10,
    backgroundColor: '#2196F3',
    borderRadius: 5,
  },
  DecButton: {
    right: 10,
    marginTop: 10,
    padding: 10,
    backgroundColor: '#2196F3',
    borderRadius: 5,
  },
  Counter: {
    top: 10,
    flexDirection: 'row',
  },
  titleCell: {
    flex: 1,
    fontWeight: 'bold',
  },
  container: {
    margin: 10,
  },
  page: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'white',
  },
  text: {
    fontSize: 18,
    fontWeight: 'bold',
    color: 'black',
  },
  modalOverlay: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
  modalContent: {
    width: 300,
    height: 500,
    padding: 20,
    backgroundColor: 'white',
    borderRadius: 10,
    alignItems: 'center',
  },
  modalText: {
    fontSize: 18,
    marginBottom: 20,
  },
  closeButton: {
    marginTop: 10,
    padding: 10,
    backgroundColor: '#2196F3',
    borderRadius: 5,
    right: 5
  },
  AddButton: {
    marginTop: 10,
    padding: 10,
    backgroundColor: '#2196F3',
    borderRadius: 5,
    left: 5
  },
  closeButtonText: {
    color: 'white',
    fontSize: 16,
  },
});
