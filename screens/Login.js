import { View, Text, StyleSheet, Modal, TouchableOpacity, TextInput, ActivityIndicator, BackHandler } from 'react-native';
import config from 'D:\\PersonalProjects\\PantryPlus\\config.json';
import React, { useState } from 'react';
import { Button, DataTable, Title } from 'react-native-paper';
import { navigate } from 'expo-router/build/global-state/routing';


export default function CreatePantry({ navigation }) {
    const [isLoading, setIsLoading] = useState(false);
    const [secureText, setSecureText] = useState(true);
    const [CreateModalVisible, setCreateModalVisible] = useState(false);
    const [LoginModalVisible, setLoginModalVisible] = useState(false);
    const [PantryUserName, UsernameSetText] = useState('');
    const [Password, PasswordSetText] = useState('');

    const openCreateModal = () => {
        setCreateModalVisible(true);
    }

    const navigateToCreatePantry = () => {
        navigation.navigate('CreatePantry')
    }

    const openLoginModal = () => {
        setLoginModalVisible(true);
    }

    const NavigateToHomePage = (DBID) => {
        navigation.navigate('Home', { "PantryID": DBID })
    };

    const renderLoading = () => {
        return (
            <View>
                <ActivityIndicator size="large" />
            </View>
        )
    }
    const CreateNewPantryTable = async (username, password) => {
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
        setCreateModalVisible(false);
        LoginToPantry(username, password)
    };

    const LoginToPantry = async (username, password) => {
        console.log("Logging In")
        setIsLoading(true);
        renderLoading()
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
            alert("Incorrect Credentials")
            console.log(response)
        } else {
            const data = await response.json();
            setLoginModalVisible(false);
            NavigateToHomePage(data["PantryKey"])
        }
    };


    return (
        <View style={styles.pageBackground}>
            <View style={styles.titleBox}>
                <Text style={styles.title}>Pantry Plus</Text>
                <Text style={styles.subtitle}>Login</Text>
            </View>
            <View style={styles.LoginBox}>
                <View style={styles.PantryNameInput}>
                    <TextInput style={styles.textInput} placeholder='PantryName' placeholderTextColor="#EFE3C2" value={PantryUserName} onChangeText={UsernameSetText}></TextInput>
                </View>
                <View style={styles.PasswordInput}>
                    <TextInput style={styles.textInput} placeholder='Password' placeholderTextColor="#EFE3C2" value={Password} onChangeText={PasswordSetText}></TextInput>
                </View>
                <TouchableOpacity style={styles.LoginButtonBox} onPress={() => LoginToPantry(PantryUserName, Password)}>
                    <Text style={styles.LoginText}>Login</Text>
                </TouchableOpacity>
            </View>
            <Button  title="New Pantry" style={styles.newPantryText} onPress={() => navigateToCreatePantry()}>New Pantry</Button>
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
    LoginBox: {
        padding: 20,
        justifyContent: 'space-between',
        bottom: '40%',
        height: '20%',
        width: '90%',
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
    LoginButtonBox: {
        top: '50%',
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
    LoginText: {
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
    newPantryText: {
        bottom: '33%',
        fontSize:14,
    }

})