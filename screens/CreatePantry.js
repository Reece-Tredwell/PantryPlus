import { View, Text, StyleSheet, Modal, TouchableOpacity, TextInput, ActivityIndicator, Keyboard } from 'react-native';
import config from 'D:\\PersonalProjects\\PantryPlus\\config.json';
import React, { useState } from 'react';
import { Button, DataTable, Title } from 'react-native-paper';
import { navigate } from 'expo-router/build/global-state/routing';


export default function CreatePantry({ navigation }) {
  const [isLoading, setIsLoading] = useState(false);
  const [secureText, setSecureText] = useState(true);
  const [PantryUserName, UsernameSetText] = useState('');
  const [Password, PasswordSetText] = useState('');
  const [EmailSetText, setEmail] = useState('');


  const NavigateToHomePage = (DBID) => {
    navigation.navigate('Home', { "PantryID": DBID })
  };

  const NavigateToLogin = () => {
    navigation.navigate('Login')
  };

  const LoginToPantry = async (email, password) => {
    const response = await fetch("https://cfaem0qp2j.execute-api.ap-southeast-2.amazonaws.com/Production/LoginToPantry", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "x-api-key": config["PantryCreateAPIKey"]
      },
      body: JSON.stringify({
        "email": email,
        "password": password
      })
    });
    if (!response.ok) {
      console.log("Failed")
      alert("Pantry login Failed")
      console.log(response)
    } else {
      const data = await response.json();
      print(data["PantryKey"])
      NavigateToHomePage(data["PantryKey"])
    }
  };




  const isEmailValid = (email) => {
    if (email.length < 3 || !email.includes("@")) {
      return false
    } else {
      return true;
    };
  }


  const CreateNewPantryTable = async (email, username, password) => {
    if (isEmailValid(email) === false) {
      alert("Invalid email")
    } else {
      Keyboard.dismiss();
      setIsLoading(true);
      const response = await fetch("https://cfaem0qp2j.execute-api.ap-southeast-2.amazonaws.com/Production/CreateNewPantryTable", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "x-api-key": config["PantryCreateAPIKey"]
        },
        body: JSON.stringify({
          "email": email,
          "username": username,
          "password": password
        })
      })
      console.log(response)
      if (!response.ok) {
        alert("Pantry Creation Failed")
        setIsLoading(false);
        throw new Error(`Failed to create pantry table: ${response.status} ${response.statusText}`);
      }else{
      console.log("creation Successful, Logging in")
      LoginToPantry(email, password)
      }
    }
  };


  return (
    <View style={styles.pageBackground}>
      <View style={styles.titleBox}>
        <Text style={styles.title}>Pantry Plus</Text>
        <Text style={styles.subtitle}>Create Pantry</Text>
      </View>
      <View style={styles.RegisterBox}>
        <View style={styles.EmailInput}>
          <TextInput style={styles.textInput} placeholder='Email' placeholderTextColor="#EFE3C2" value={EmailSetText} onChangeText={setEmail}></TextInput>
        </View>
        <View style={styles.PantryNameInput}>
          <TextInput style={styles.textInput} placeholder='PantryName' placeholderTextColor="#EFE3C2" value={PantryUserName} onChangeText={UsernameSetText}></TextInput>
        </View>
        <View style={styles.PasswordInput}>
          <TextInput style={styles.textInput} placeholder='Password' placeholderTextColor="#EFE3C2" value={Password} onChangeText={PasswordSetText}></TextInput>
        </View>
        {isLoading ? (
          <ActivityIndicator size="large" color="#85A947" />
        ) : (
          <TouchableOpacity style={styles.RegisterButtonBox} onPress={() => CreateNewPantryTable(EmailSetText, PantryUserName, Password)}>
            <Text style={styles.RegisterText}>Register</Text>
          </TouchableOpacity>
        )}
      </View>
      <Button title="Login" style={styles.LoginText} onPress={() => NavigateToLogin()}>Login</Button>
    </View>
  );
};
//https://colorhunt.co/palette/1235243e7b2785a947efe3c2
const styles = StyleSheet.create({
  pageBackground: {
    backgroundColor: "#123524",
    width: '100%',
    height: '100%',
    justifyContent: "center",
    alignItems: "center",
  },
  title: {
    fontSize: 40,
    fontWeight: 'bold',
    color: '#EFE3C2'
  },
  subtitle: {
    top: 10,
    fontSize: 25,
    fontWeight: 'bold',
    color: '#EFE3C2',
    opacity: 10
  },
  titleBox: {
    bottom: '15%',
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  RegisterBox: {
    padding: 20,
    justifyContent: 'space-between',
    bottom: '40%',
    height: '20%',
    width: '90%',
    justifyContent: "center",
    alignItems: "center",
  },
  EmailInput: {
    bottom: 30,
    height: '40%',
    width: "90%",
    backgroundColor: '#3E7B27',
    borderColor: '#EFE3C2',
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    borderBottomLeftRadius: 20,
    borderBottomRightRadius: 20,
    justifyContent: "center",
    alignItems: "center",
  },
  PantryNameInput: {
    bottom: 10,
    height: '40%',
    width: "90%",
    backgroundColor: '#3E7B27',
    borderColor: '#EFE3C2',
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    borderBottomLeftRadius: 20,
    borderBottomRightRadius: 20,
    justifyContent: "center",
    alignItems: "center",
  },
  PasswordInput: {
    height: '40%',
    width: "90%",
    backgroundColor: '#3E7B27',
    borderColor: '#EFE3C2',
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    borderBottomLeftRadius: 20,
    borderBottomRightRadius: 20,
    justifyContent: "center",
    alignItems: "center",
  },
  RegisterButtonBox: {
    top: '30%',
    height: '40%',
    width: "90%",
    backgroundColor: '#EFE3C2',
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    borderBottomLeftRadius: 20,
    borderBottomRightRadius: 20,
    justifyContent: "center",
    alignItems: "center",
  },
  RegisterText: {
    fontSize: 20,
    color: 'black'
  },
  textInput: {
    width: '90%',
    opacity: 10,
    flex: 1,
    textAlign: 'left',
    fontSize: 20,
    color: '#EFE3C2',
  },
  LoginText: {
    bottom: '33%',
    fontSize: 14,
  },
  ForgotPasswordText: {
    top: 5,
    fontSize: 14,
  }

})