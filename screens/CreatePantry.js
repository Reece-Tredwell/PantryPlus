import { View, Text, StyleSheet, Modal, TouchableOpacity } from 'react-native';
import config from 'D:\\PersonalProjects\\PantryPlus\\config.json';
import React, { useState, useEffect, } from 'react';
import { DataTable, TextInput } from 'react-native-paper';

export default function CreatePantry({ navigation}) {
  const [CreateModalVisible, setCreateModalVisible] = useState(false);
  const [LoginModalVisible, setLoginModalVisible] = useState(false);
  const [PantryUserName, UsernameSetText] = useState('');
  const [Password, PasswordSetText] = useState('');

  const openCreateModal = () => {
    setCreateModalVisible(true);
  }

  const openLoginModal = () => {
    setLoginModalVisible(true);
  }

  const NavigateToHomePage = (DBID)  => {
    navigation.navigate('Home', {"PantryID": DBID})
  };

  const CreateNewPantryTable = async (username, password) => {
    console.log("Creating")
    const response = await fetch("https://cfaem0qp2j.execute-api.ap-southeast-2.amazonaws.com/Production/CreateNewPantryTable", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "x-api-key": config["PantryCreateAPIKey"]
      },
      body: JSON.stringify({
        "username": username,
        "password": password
      })
    })
    console.log(response)
    if (!response.ok) {
      console.log("Failed")
      console.log(response)
      throw new Error(`Failed to create pantry table: ${response.status} ${response.statusText}`);
    }
    const data = await response.json();
    console.log(data);
  };


  const LoginToPantry = async (username, password) => {
    console.log("Logging In")
    const response = await fetch("https://cfaem0qp2j.execute-api.ap-southeast-2.amazonaws.com/Production/LoginToPantry", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "x-api-key": config["PantryCreateAPIKey"]
      },
      body: JSON.stringify({
        "username": username,
        "password": password
      })
    });

    if (!response.ok) {
      console.log("Failed")
      console.log(response)
    }else{
      const data = await response.json();
      setLoginModalVisible(false);
      NavigateToHomePage(data["PantryKey"])
    }
  };


    return (
      <View style={styles.buttonView}>
        <TouchableOpacity style={styles.CreatePantryButton} onPress={openCreateModal}>
          <Text style={styles.Text}> Create New Pantry!</Text>
        </TouchableOpacity>


        <TouchableOpacity style={styles.CreatePantryButton} onPress={openLoginModal}>
          <Text style={styles.Text}> Sign Into a Pantry</Text>
        </TouchableOpacity>

        {CreateModalVisible && (
          <Modal
            animationType="slide"
            transparent={true}
            visible={CreateModalVisible}
            onRequestClose={() => setCreateModalVisible(false)}
          >
            <View style={styles.modalOverlay}>
              <View style={styles.modalContent}>

                <DataTable style={styles.container}>
                  <DataTable.Row>
                    <TextInput style={styles.TextInput} placeholder='Pantry Name' value={PantryUserName} onChangeText={UsernameSetText}></TextInput>
                  </DataTable.Row>
                  <DataTable.Row>
                    <TextInput style={styles.TextInput} placeholder='Password' value={Password} onChangeText={PasswordSetText}></TextInput>
                  </DataTable.Row>
                </DataTable>
                <View style={styles.ButtonRow}>
                  <TouchableOpacity style={styles.CreateButton} onPress={() => setCreateModalVisible(false)}>
                    <Text style={styles.closeButtonText}> Close </Text>
                  </TouchableOpacity>
                  <TouchableOpacity style={styles.closeButton} onPress={() => CreateNewPantryTable(PantryUserName, Password)}>
                    <Text style={styles.closeButtonText}>Create</Text>
                  </TouchableOpacity>
                </View>
              </View>
            </View>
          </Modal>
        )}

        {LoginModalVisible && (
          <Modal
            animationType="slide"
            transparent={true}
            visible={LoginModalVisible}
            onRequestClose={() => setLoginModalVisible(false)}
          >
            <View style={styles.modalOverlay}>
              <View style={styles.modalContent}>

                <DataTable style={styles.container}>
                  <DataTable.Row>
                    <TextInput style={styles.TextInput} placeholder='Pantry Name' value={PantryUserName} onChangeText={UsernameSetText}></TextInput>
                  </DataTable.Row>
                  <DataTable.Row>
                    <TextInput style={styles.TextInput} placeholder='Password' value={Password} onChangeText={PasswordSetText}></TextInput>
                  </DataTable.Row>
                </DataTable>
                <View style={styles.ButtonRow}>
                  <TouchableOpacity style={styles.CreateButton} onPress={() => setLoginModalVisible(false)}>
                    <Text style={styles.closeButtonText}> Close </Text>
                  </TouchableOpacity>
                  <TouchableOpacity style={styles.closeButton} onPress={() => LoginToPantry(PantryUserName, Password)}>
                    <Text style={styles.closeButtonText}>Login</Text>
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
    TextInput: {
      opacity: 10,
      flex: 1,
    },
    ButtonRow: {
      top: 10,
      flexDirection: 'row',
      justifyContent: 'space-between',
    },
    buttonView: {
      top: '30%',
      borderRadius: 10,
      alignItems: 'center',
      justifyContent: 'center',
    },
    CreatePantryButton: {
      marginTop: 10,
      padding: 10,
      backgroundColor: '#2196F3',
      borderRadius: 5,
    },
    Text: {
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
    CreateButton: {
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

  });