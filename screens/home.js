import { StatusBar } from 'expo-status-bar';
import { StyleSheet, View, Button, ImageBackground, FlatList, Text, Image } from 'react-native';
import React, { useState, useEffect } from 'react';
import { useFocusEffect } from '@react-navigation/native';
import config from 'D:\\PersonalProjects\\PantryPlus\\config.json';


export default function HomeScreen({ navigation, route }) {
  const [data, setData] = useState(null);
  const image = { uri: "https://dkdesignkitchens.com.au/wp-content/uploads/7-Tips-For-Designing-The-Perfect-Walk-in-Pantry.jpg" };
  const { PantryID } = route.params
  const headers = ["Insert ID", "Product ID", "Product Name", "Image", "Date"];

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
          insertID: pantryData[i][0],
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


  const renderRow = ({ item }) => {
    const keys = Object.keys(item);
    return (
      <View style={styles.row}>
        {keys.map((key) => {
          if (key === "image") {
            return (
              <Image
                key={key}
                source={{ uri: item[key] }}
                style={styles.image}
              />
            );
          }
          return (
            <Text key={key} style={styles.cell}>
              {item[key]}
            </Text>
          );
        })}
      </View>
    );
  };


  return (
    <View style={styles.pageBackground}>
      <View style={styles.tableHeader}>
        {headers.map((header, index) => (
          <Text key={index} style={styles.headerCell}>
            {header}
          </Text>
        ))}
      </View>
    </View>

    // <ImageBackground source={image} style={styles.image}>
    //   <View style={styles.tableHeader}>
    //     {headers.map((header, index) => (
    //       <Text key={index} style={styles.headerCell}>
    //         {header}
    //       </Text>
    //     ))}
    //   </View>
    //   <View style={styles.Main}>
    //     <FlatList
    //       style={styles.cell}
    //       data={data}
    //       renderItem={renderRow}
    //       keyExtractor={(item, index) => index.toString()}
    //     />
    //   </View>
    //   <View style={styles.AddDelete}>
    //     <View style={styles.buttonsLeft}>
    //       <Button title="Add" style={styles.button} onPress={NavigateToAddPage} />
    //     </View>
    //     <View style={styles.buttonsRight}>
    //       <Button title="Remove" style={styles.button} onPress={NavigateToDeletePage} />
    //     </View>
    //   </View>
    //   <StatusBar style="auto" />
    // </ImageBackground>
  );
};


const styles = StyleSheet.create({
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
    width: "97%",
    alignSelf: 'center',
  },
  headerCell: {
    flex: 1,
    textAlign: "center",
    fontWeight: "bold",
    fontSize: 16,
    color: "#333",
  },
  // row: {
  //   flexDirection: "row",
  //   borderBottomWidth: 1,
  //   borderBottomColor: "#ccc",
  //   paddingVertical: 8,
  //   marginTop: 10,
  // },

  // cell: {
  //   fontSize: 11,
  //   flex: 1,
  //   textAlign: "center",
  //   paddingHorizontal: 8,
  // },

  // Main: {
  //   flexDirection: "row",
  //   backgroundColor: 'white',
  //   height: '60%',
  //   width: '97%',
  //   alignSelf: 'center',
  //   justifyContent: 'center',
  //   marginBottom: '50%',

  // },

  // button: {
  //   flex: 1,
  //   justifyContent: 'center',
  //   alignItems: 'center',
  // },

  // buttonsLeft: {
  //   flex: 1,
  //   justifyContent: 'center',
  //   alignItems: 'flex-start',
  //   paddingLeft: 75,
  // },

  // buttonsRight: {
  //   flex: 1,
  //   justifyContent: 'center',
  //   alignItems: 'flex-end',
  //   paddingRight: 75,
  // },

  // AddDelete: {
  //   position: 'absolute',
  //   top: 600,
  //   left: 0,
  //   right: 0,
  //   height: 75,
  //   flexDirection: 'row',
  //   backgroundColor: 'white'
  // },

  // Header: {
  //   position: 'absolute',
  //   top: 0,
  //   left: 0,
  //   right: 0,
  //   height: 125,
  //   flexDirection: 'row',
  //   alignItems: 'center',
  //   justifyContent: 'space-between',
  //   backgroundColor: '#969393',
  //   paddingHorizontal: 10,
  // },
  // rightSection: {
  //   flex: 1,
  //   justifyContent: 'center',
  // },
  // centerSection: {
  //   flex: 2,
  //   alignItems: 'center',
  //   justifyContent: 'center',
  // },
  // leftSection: {
  //   flex: 1,
  //   alignItems: 'flex-end',
  //   justifyContent: 'center',
  // },
  // profileImage: {
  //   width: 50,
  //   height: 50,
  //   borderRadius: 25,
  // },
  // text: {
  //   color: 'white',
  //   fontSize: 20,
  //   fontWeight: 'bold',
  // },
  // title: {
  //   color: 'white',
  //   fontSize: 20,
  //   fontWeight: 'bold'
  // },
  // image: {
  //   flex: 1,
  //   resizeMode: 'cover',
  //   justifyContent: 'center',
  //   flexDirection: 'column'
  // },
});
