import { View, Text, StyleSheet, TouchableOpacity, TextInput, ActivityIndicator, Keyboard } from 'react-native';
import config from 'D:\\PersonalProjects\\PantryPlus\\config.json';
import React, { useState } from 'react';
import { Button } from 'react-native-paper';
import { navigate } from 'expo-router/build/global-state/routing';


export default function CreatePantry({ navigation }) {
    const [isLoading, setIsLoading] = useState(false);
    const [PantryUserName, UsernameSetText] = useState('');
    const [Password, PasswordSetText] = useState('');
    const [PantryID, setPantryID] = useState('');
    const [Data, setData] = useState([]);

    const ForgotPassword = () => {
        //TODO
    };

    const navigateToCreatePantry = () => {
        navigation.navigate('CreatePantry',)
    }

    const NavigateToHomePage = (DBID) => {
        navigation.navigate('Home', { "PantryID": DBID, "Data": Data })
        setIsLoading(false)
        console.log(isLoading)
    };

    const isEmailValid = (email) => {
        if (email.length < 3 || !email.includes("@")) {
            return false
        } else {
            return true;
        };
    }

    const LoginToPantry = async (email, password) => {
        //check if email is valid
        if (isEmailValid(email) === false) {
            alert("Invalid email")
        } else {
            setIsLoading(true);
            Keyboard.dismiss();
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
                setIsLoading(false);
                alert("Incorrect Credentials")
            } else {
                const data = await response.json();
                const pantryKey = data["PantryKey"]
                setPantryID(pantryKey)
                const pantryItems = await fetchPantryData(pantryKey)
                setData(pantryItems);
                NavigateToHomePage(data["PantryKey"])
            }
        }
    };


    const GetPantryItems = async (ID) => {
        try {
            const response = await fetch(`https://cfaem0qp2j.execute-api.ap-southeast-2.amazonaws.com/Production/GetPantryItems`, {
                method: "POST",
                headers: {
                    "accept": "application/json",
                    "Content-Type": "application/json",
                    "x-api-key": config["PantryCreateAPIKey"]
                },
                body: JSON.stringify({ "ID": ID })
            });
            if (!response.ok) {
                console.log("Failed")
                throw new Error(`Failed to Get Data From Pantry: ${response.status} ${response.statusText}`);
            }
            const data = await response.json();
            return data;
        } catch {
            alert("Cannot Retrieve Pantry Data")
            console.log("Cannot Retrieve Pantry Data")
        }
    }


    const fetchPantryData = async (id) => {
        try {
            var products = []
            const pantryData = await GetPantryItems(id);
            for (var i = 0; i < pantryData.length; i++) {
                let image = pantryData[i][4];
                if (!image) {
                    image = require('../assets/no-Image-Available.jpg');
                }
                products.push({
                    insertID: pantryData[i][0],
                    productID: pantryData[i][1],
                    productName: pantryData[i][2],
                    image: image,
                    dateAdded: pantryData[i][5]
                });
            }
            setData(products)
        } catch (error) {
            console.error("Error fetching pantry data:", error);
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
                    <TextInput style={styles.textInput} placeholder='Email' placeholderTextColor="#EFE3C2" value={PantryUserName} onChangeText={UsernameSetText}></TextInput>
                </View>
                <View style={styles.PasswordInput}>
                    <TextInput style={styles.textInput} secureTextEntry={true} placeholder='Password' placeholderTextColor="#EFE3C2" value={Password} onChangeText={PasswordSetText}></TextInput>
                </View>
                <Button title="Forgot Password?" style={styles.ForgotPasswordText} onPress={() => ForgotPassword()}>Forgot Password?</Button>

                {isLoading ? (
                    <TouchableOpacity style={styles.LoginButtonBoxLoading} onPress={() => LoginToPantry(PantryUserName, Password)} disabled={true}>
                        <Text style={styles.LoginText}>Login</Text>
                    </TouchableOpacity>
                ) : (
                    <TouchableOpacity style={styles.LoginButtonBox} onPress={() => LoginToPantry(PantryUserName, Password)}>
                        <Text style={styles.LoginText}>Login</Text>
                    </TouchableOpacity>
                )}
            </View>
            <Button title="New Pantry" style={styles.newPantryText} onPress={() => navigateToCreatePantry()}>New Pantry</Button>
        </View>
    );
};

//https://colorhunt.co/palette/1235243e7b2785a947efe3c2
const styles = StyleSheet.create({
    loadingView: {
        height: 200,
        width: 200,
        backgroundColor: "white",
        borderRadius: 10
    },
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
        top: 5,
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
    LoginButtonBoxLoading: {
        top: '5%',
        height: '40%',
        width: "90%",
        backgroundColor: '#EFE3C2',
        opacity: 0.3,
        borderTopLeftRadius: 20,
        borderTopRightRadius: 20,
        borderBottomLeftRadius: 20,
        borderBottomRightRadius: 20,
        justifyContent: "center",
        alignItems: "center",
    },
    LoginButtonBox: {
        top: '5%',
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
        bottom: '37%',
        fontSize: 14,
    },
    ForgotPasswordText: {
        bottom: '10%',
        top: 5,
        fontSize: 14,
    }

})