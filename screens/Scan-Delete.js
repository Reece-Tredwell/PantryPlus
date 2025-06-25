import { Camera, CameraView } from 'expo-camera';
import axios from 'axios';
import React, { useState, useEffect } from 'react';
import { View, Text, Modal, StyleSheet, TouchableOpacity } from 'react-native';
import { Image } from 'expo-image';
import { DataTable } from 'react-native-paper';
import config from 'D:\\PersonalProjects\\PantryPlus\\config.json';
import { useFocusEffect } from '@react-navigation/native';

export default function AddScanner({ route }) {
    const {PantryID} = route.params
    const [data, setData] = useState(null);
    const [scanned, setScanned] = useState(false);
    const [modalVisible, setModalVisible] = useState(false);
    const [Quantity, setQuantity] = useState(0);
    const [barcode, setbarcode] = useState(0);

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
        setbarcode(barcode)
        if (!scanned) {
            setScanned(true);
            console.log("Barcode Number Read: " + barcode);
            fetchData(barcode).finally(() => {
                setTimeout(() => setScanned(false), 3000);
            });
        }
    };

    const removeItem = async (productBarcode, PantryID) => {
        try {
            const response = await fetch("https://cfaem0qp2j.execute-api.ap-southeast-2.amazonaws.com/Production/deleteDataFromPantry", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                    "x-api-key": config["PantryCreateAPIKey"]
                },
                body: JSON.stringify({
                    "barcode": productBarcode,
                    "pantryID": PantryID
                })
            }
            )
        } catch (error) {
            console.error("error found: ", error)
        }
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
                            <Text style={styles.ModalHeader}>
                                Remove From Pantry
                            </Text>
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
                            <View style={styles.ButtonRow}>
                                <TouchableOpacity style={styles.AddButton} onPress={() => setModalVisible(false)}>
                                    <Text style={styles.closeButtonText}> Close </Text>
                                </TouchableOpacity>
                                <TouchableOpacity style={styles.closeButton} onPress={() => removeItem(barcode, PantryID)}>
                                    <Text style={styles.closeButtonText}>Remove</Text>
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
    ModalHeader: {
        alignSelf: 'center',
        fontWeight: 'bold',
        fontSize: '25'
    },
    ButtonRow: {
        alignItems: 'center',
        alignSelf: 'center',
        top: 50,
        flexDirection: 'row',
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
        left: 10
    },
    AddButton: {
        marginTop: 10,
        padding: 10,
        backgroundColor: '#2196F3',
        borderRadius: 5,
        right: 10
    },
    closeButtonText: {
        color: 'white',
        fontSize: 16,
    },
});
