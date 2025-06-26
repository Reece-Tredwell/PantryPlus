import React, { useEffect } from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { useCameraPermissions } from 'expo-camera';
import { useNavigationState, useFocusEffect } from '@react-navigation/native';

export default function Profile({ navigation, route }) {
    const [permission, requestPermission] = useCameraPermissions();
    const { PantryID } = route.params

    const Logout = () => {
        navigation.navigate('Login')
    }

    const getPantryName = async (ID) => {
        const response = await fetch(`https://cfaem0qp2j.execute-api.ap-southeast-2.amazonaws.com/Test/getPantryData`, {
            method: "POST",
            headers: {
                "accept": "application/json",
                "Content-Type": "application/json",
                "x-api-key": config["PantryCreateAPIKey"]
            },
            body: JSON.stringify({ "ID": ID })
        });
        console.log(response)
    }

    useEffect(() => {
        getPantryName(PantryID);
    }, []);


    return (
        <View style={styles.pageBackground}>
            <TouchableOpacity style={styles.LogoutButton} onPress={Logout}>
                <Text style={styles.Logout}>Logout</Text>
            </TouchableOpacity>
        </View>
    );



}

const styles = StyleSheet.create({
    pageBackground: {
        backgroundColor: "#123524",
        width: '100%',
        height: '100%',
        justifyContent: "center",
        alignItems: "center",
    },
    LogoutButton: {
        top: '5%',
        height: '10%',
        width: "90%",
        backgroundColor: '#EFE3C2',
        borderTopLeftRadius: 20,
        borderTopRightRadius: 20,
        borderBottomLeftRadius: 20,
        borderBottomRightRadius: 20,
        justifyContent: "center",
        alignItems: "center",
    },
    Logout: {
        fontSize: 20,
        color: 'black'
    }
});
