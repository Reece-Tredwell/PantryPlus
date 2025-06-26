import React, { useEffect } from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { useCameraPermissions } from 'expo-camera';
import EvilIcons from '@expo/vector-icons/EvilIcons';
import { useNavigationState, useFocusEffect } from '@react-navigation/native';
import { useRoute } from '@react-navigation/native';

export default function Profile({ navigation, route }) {
    const [permission, requestPermission] = useCameraPermissions();
    const username = route.params?.username;

    const Logout = () => {
        navigation.navigate('Login')
    }

    return (
        <View style={styles.pageBackground}>
            <View style={styles.pageHeader}>
                <EvilIcons name="user" size={200} color="white" />
                <Text style={styles.pageTitle}>{username}</Text>
            </View>
            <TouchableOpacity style={styles.LogoutButton} onPress={Logout}>
                <Text style={styles.Logout}>Logout</Text>
            </TouchableOpacity>
        </View>
    );



}

const styles = StyleSheet.create({
    pageTitle: {
        fontSize: 25,
        fontWeight: 'bold',
        color: '#EFE3C2',
    },
    pageTitle: {
        fontSize: 40,
        fontWeight: 'bold',
        color: '#EFE3C2',

    },
    pageHeader: {
        justifyContent: 'center',
        alignItems: "center",
        width: '100%',
        height: '15%',
        backgroundColor: "#123524"
    },
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
