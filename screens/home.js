import { StatusBar } from 'expo-status-bar';
import { StyleSheet, View, Button, ScrollView, Text, Image } from 'react-native';
import React, { useState, useEffect } from 'react';
import { useFocusEffect } from '@react-navigation/native';
import config from 'D:\\PersonalProjects\\PantryPlus\\config.json';


function ProductCard({ product }) {
  return (
    <View style={styles.card}>
      <Text numberOfLines={1} ellipsizeMode="tail"> {product.productName} </Text>
      <Image source={{ uri: product.image }} style={styles.image} />
      <Text> Date Added:  {product.dateAdded}</Text>
    </View>
  );
}

export default function HomeScreen({ navigation, route }) {
  const [data, setData] = useState([]);
  const { PantryID } = route.params



  const NavigateToAddPage = () => {
    navigation.navigate('Add', { "PantryID": PantryID })
  };

  const NavigateToDeletePage = () => {
    console.log(PantryID)
    navigation.navigate('Delete', { "PantryID": PantryID });
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



  const fetchPantryData = async () => {
    try {
      var products = []
      const pantryData = await GetPantryItems(PantryID);
      for (var i = 0; i < pantryData.length; i++) {
        products.push({
          productID: pantryData[i][1],
          productName: pantryData[i][2],
          image: pantryData[i][4],
          dateAdded: pantryData[i][5]
        });
      }
      setData(products)
    } catch (error) {
      console.error("Error fetching pantry data:", error);
    }
  };


  useEffect(() => {
  }, [data]);

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
            <View style={styles.gridItem} key={product.productID}>
              <ProductCard product={product} />
            </View>
          ))}
        </ScrollView>
      </View>

      <View style={styles.footer}>
        <View style={styles.buttonsLeft}>
          <Button title="Add" style={styles.button} onPress={NavigateToAddPage} />
        </View>
        <View style={styles.buttonsRight}>
          <Button title="Remove" style={styles.button} onPress={NavigateToDeletePage} />
        </View>
      </View>
      <StatusBar style="auto" />
    </View >
  );
};


const styles = StyleSheet.create({
  gridContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
    padding: 10,
  },
  gridWrapper: {
    flex: 1,
    paddingHorizontal: 10,
  },
  name: {
    fontSize: 18,
    fontWeight: 'bold',
    color: 'black',
  },
  gridItem: {
    width: '48%', 
    marginBottom: 12,
  },
  card: {
    borderRadius: 10,
    padding: 10,
    top: 50,
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
    top: 40
  },
  pageHeader: {
    justifyContent:'center',
    alignItems: "center",
    width:'100%',
    height:'15%',
    backgroundColor:"#123524"
  },
  pageBackground: {
    backgroundColor: "#123524",
    width: '100%',
    height: '100%',
    justifyContent: "center",
    alignItems: "center",
  },
  tableHeader: {
    flexDirection: "row",
    justifyContent: "space-around",
    backgroundColor: "#f0f0f0",
    padding: 10,
    borderBottomWidth: 1,
    borderBottomColor: "#ccc",
    width: "95%",
    alignSelf: 'center',
    backgroundColor: "#EFE3C2",
    top: '5%'
  },
  headerCell: {
    flex: 1,
    textAlign: "center",
    fontWeight: "bold",
    fontSize: 16,
    color: "#333",
  },
  row: {
    flexDirection: "row",
    borderBottomWidth: 1,
    borderBottomColor: "#ccc",
    paddingVertical: 8,
    marginTop: 10,
  },

  cell: {
    fontSize: 11,
    flex: 1,
    textAlign: "center",
    paddingHorizontal: 8,
  },

  Main: {
    flexDirection: "row",
    height: '60%',
    width: '95%',
    alignSelf: 'center',
    justifyContent: 'center',
    marginBottom: '50%',
    backgroundColor: "#EFE3C2",
    top: '5%'
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

  footer: {
    bottom: 0,
    height:'10%',
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
    resizeMode: 'cover',
    borderRadius: 10,
  }
});
