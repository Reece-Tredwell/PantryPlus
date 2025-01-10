import { StatusBar } from 'expo-status-bar';
import { StyleSheet, View, Button, ImageBackground } from 'react-native';
import React, { useEffect } from 'react';
import axios from 'axios';
import config from 'D:\\PersonalProjects\\PantryPlus\\config.json';

export default function HomeScreen({ navigation, route }) {
  var data = [];
  const image = { uri: "https://dkdesignkitchens.com.au/wp-content/uploads/7-Tips-For-Designing-The-Perfect-Walk-in-Pantry.jpg" };
  const profileImage = { uri: "https://thumbs.dreamstime.com/z/young-happy-positive-teenager-man-gesturing-ok-isolated-white-background-40784002.jpg" }
  const { PantryID } = route.params

  const processProfilePress = () => {
    alert('Profile Clicked');
  };

  const NavigateToAddPage = () => {
    navigation.navigate('Add')
  };

  const NavigateToDeletePage = () => {
    navigation.navigate('Delete')
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
      console.log(response.data)
      if (!response.ok) {
        console.log("Failed")
        throw new Error(`Failed to Get Data From Pantry: ${response.status} ${response.statusText}`);
      }
      const data = await response.json();
      console.log("Pantry Items: ", data);
      return data;
    } catch {
      console.log("Cannot Retrieve Pantry Data")
    }
  }



  useEffect(() => {
    console.log('HomeScreen loaded');
    data = GetPantryItems("p1");
    var pantryData = data[0];
    for (let i = 0; i < pantryData.length; i++) {
      updatedData.push({
        insertID: pantryData[i].insertID,
        productID: pantryData[i].productID,
        userID: pantryData[i].userID,
        image: pantryData[i].Image,
        dateAdded: pantryData[i].dateAdded
      });
    }
  }, []);


  return (
    <ImageBackground source={image} style={styles.image}>
      <View style={styles.Main}>
      </View>
      <View style={styles.AddDelete}>
        <View style={styles.buttonsLeft}>
          <Button title="Add" style={styles.button} onPress={NavigateToAddPage} />
        </View>
        <View style={styles.buttonsRight}>
          <Button title="Remove" style={styles.button} onPress={NavigateToDeletePage} />
        </View>
      </View>
      <StatusBar style="auto" />
    </ImageBackground>
  );
};


const styles = StyleSheet.create({
  Main: {
    backgroundColor: 'white',
    height: '75%',
    width: '90%',
    alignSelf: 'center',
    justifyContent: 'center',
    marginTop: '-40%',

  },

  button: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },

  buttonsLeft: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'flex-start',
    paddingLeft: 75,
  },

  buttonsRight: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'flex-end',
    paddingRight: 75,
  },

  AddDelete: {
    position: 'absolute',
    top: 600,
    left: 0,
    right: 0,
    height: 75,
    flexDirection: 'row',
    backgroundColor: 'white'
  },

  Header: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    height: 125,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    backgroundColor: '#969393',
    paddingHorizontal: 10,
  },
  rightSection: {
    flex: 1,
    justifyContent: 'center',
  },
  centerSection: {
    flex: 2,
    alignItems: 'center',
    justifyContent: 'center',
  },
  leftSection: {
    flex: 1,
    alignItems: 'flex-end',
    justifyContent: 'center',
  },
  profileImage: {
    width: 50,
    height: 50,
    borderRadius: 25,
  },
  text: {
    color: 'white',
    fontSize: 20,
    fontWeight: 'bold',
  },
  title: {
    color: 'white',
    fontSize: 20,
    fontWeight: 'bold'
  },
  image: {
    flex: 1,
    resizeMode: 'cover',
    justifyContent: 'center',
    flexDirection: 'column'
  },
});
