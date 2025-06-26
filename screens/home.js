import { StatusBar } from 'expo-status-bar';
import { StyleSheet, View, Button, ScrollView, Text, Image, Pressable, TouchableOpacity } from 'react-native';
import React, { useState, useEffect } from 'react';
import { useFocusEffect } from '@react-navigation/native';
import AntDesign from '@expo/vector-icons/AntDesign';
import Octicons from '@expo/vector-icons/Octicons';
import config from 'D:\\PersonalProjects\\PantryPlus\\config.json';

//This is a custom component for displaying a product
function ProductCard({ product }) {
  const isRemoteImage = typeof product.image === 'string' && product.image.startsWith('http');

  return (
    <View style={styles.card}>
      <Text numberOfLines={1} ellipsizeMode="tail" style={styles.cardTitle}> {product.productName} </Text>
      <Image source={isRemoteImage ? { uri: product.image } : product.image} style={styles.image} />
      <Text style={styles.date}> Date Added:  {product.dateAdded}</Text>
    </View>
  );
}

export default function HomeScreen({ navigation, route }) {
  const [data, setData] = useState(route.params?.Data ?? []);
  const PantryID = route.params?.PantryID;
  const [PantryName, setPantryName] = useState("");



  const NavigateToAddPage = () => {
    navigation.navigate('Add', { "PantryID": PantryID })
  };

  const NavigateToDeletePage = () => {
    navigation.navigate('Delete', { "PantryID": PantryID });
  };

  const NavigateToProfilePage = async () => {
    navigation.navigate('Profile', { "PantryID": PantryID, "username": PantryName });
  };

  const getPantryName = async (ID) => {
    const response = await fetch(`https://cfaem0qp2j.execute-api.ap-southeast-2.amazonaws.com/Production/getPantryData`, {
      method: "POST",
      headers: {
        "accept": "application/json",
        "Content-Type": "application/json",
        "x-api-key": config["PantryCreateAPIKey"]
      },
      body: JSON.stringify({ "ID": ID })
    });
    const data = await response.json();
    return data.username
  }


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


  const fetchPantryData = async () => {
    try {
      var products = []
      const pantryData = await GetPantryItems(PantryID);
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


  useEffect(() => {
    const loadPantryName = async () => {
      const pantryName = await getPantryName(PantryID);
      setPantryName(pantryName);
    };
    loadPantryName();
  }, [PantryID]);



  useFocusEffect(
    React.useCallback(() => {
      fetchPantryData();
    }, [])
  );


  return (
    <View style={styles.pageBackground}>
      <View style={styles.pageHeader}>
        <Text style={styles.pageTitle}>Pantry Plus</Text>
      </View>
      <View style={styles.gridWrapper}>
        <ScrollView contentContainerStyle={styles.gridContainer}>
          {data.map((product) => (
            <View style={styles.gridItem} key={product.insertID}>
              <ProductCard product={product} />
            </View>
          ))}
        </ScrollView>
      </View>

      <View style={styles.footer}>
        <TouchableOpacity style={styles.footerIcon}>
          <AntDesign name="search1" size={24} color="black" />
        </TouchableOpacity>
        <TouchableOpacity style={styles.footerIcon} onPress={NavigateToDeletePage}>
          <AntDesign name="delete" size={24} color="black" />
        </TouchableOpacity>
        <TouchableOpacity style={styles.footerIcon} onPress={NavigateToAddPage}>
          <Octicons name="diff-added" size={24} color="black" />
        </TouchableOpacity>
        <TouchableOpacity style={styles.footerIcon} onPress={NavigateToProfilePage}>
          <AntDesign name="user" size={24} color="black" />
        </TouchableOpacity>
      </View>
      <StatusBar style="auto" />
    </View >
  );
};


const styles = StyleSheet.create({
  date: {
    fontSize: 12,
    top: 5,
  },
  cardTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    justifyContent: 'center',
    textAlign: "center",
  },
  gridContainer: {
    borderRadius: '1%',
    backgroundColor: "#EFE3C2",
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
    paddingHorizontal: 10,
    paddingTop: 10,
    paddingBottom: 30,
  },
  gridWrapper: {
    flex: 1,
    paddingHorizontal: 10,
  },
  gridItem: {
    width: '48%',
    marginBottom: 16,
  },
  card: {
    borderRadius: 10,
    padding: 10,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.3,
    shadowRadius: 3,
    backgroundColor: "#f5fdfe"
  },
  pageTitle: {
    fontSize: 40,
    fontWeight: 'bold',
    color: '#EFE3C2',
    top: 20
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
  footerIcon: {
    justifyContent: "center",
    alignItems: "center",
    bottom: 10,
    height: 60,
    width: 85
  },
  footer: {
    bottom: 0,
    height: '10%',
    width: "100%",
    flexDirection: 'row',
    backgroundColor: "#EFE3C2",
    alignItems: 'center',
    paddingHorizontal: 20,
    justifyContent: 'space-between',
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
    width: '100%',
    height: 100,
    resizeMode: 'contain',
    borderRadius: 10,
  }
});
