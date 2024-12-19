import { View, Text, StyleSheet, ViewBase, Button, TouchableOpacity } from 'react-native';
import React, { useState, useEffect } from 'react';

export default function CreatePantry() {

    const CreateNewPantryTable = () =>{
        alert("New Table being made")
    }


return(
    <View style={styles.buttonView}>
        <TouchableOpacity style={styles.CreatePantryButton} onPress={CreateNewPantryTable}>
            <Text style={styles.Text}> Create New Pantry!</Text>
        </TouchableOpacity>
    </View>
    );
}

const styles = StyleSheet.create({
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
    Text:{
        fontSize: 18,
        marginBottom: 20,
    },

});