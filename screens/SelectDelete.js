import Checkbox from 'expo-checkbox';
import React, { useState, useEffect } from 'react';
import { StyleSheet, Text, View, FlatList, Image, TouchableOpacity } from 'react-native';
import config from 'D:\\PersonalProjects\\PantryPlus\\config.json';

export default function SelectDelete({ navigation, route }) {
  const { data } = route.params
  const [Data, setData] = useState(null);
  const headers = ["Insert ID", "Product ID", "Product Name", "Image", "Date"];
  const [isChecked, setChecked] = useState(false)
  const [selectedId, setSelectedId] = useState(null);
  


  useEffect(() => {
    setData(data)
  }, []);

  const handlePress = (productID) => {
    setSelectedId(productID);
  };

  const renderRow = ({ item }) => {
    const backgroundColor = item.productID === selectedId ? '#6e3b6e' : '#fff'; // Highlight selected item
    const color = item.productID === selectedId ? 'white' : 'black';
    const keys = Object.keys(item);
    return (
      <View style={styles.row}>
        <TouchableOpacity onPress={() => handlePress(item.productID)}>
          <View style={[styles.item, { backgroundColor }]}>
            <Text style={[styles.title, { color }]}>{item.title}</Text>
          </View>
        </TouchableOpacity>
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
    <View>
      <View style={styles.tableHeader}>
        {headers.map((header, index) => (
          <Text key={index} style={styles.headerCell}>
            {header}
          </Text>
        ))}
      </View>
      <View style={styles.Main}>
        {/* <Checkbox
          onValueChange={setChecked}
          value={isChecked}
          style={styles.checkbox}
          color={isChecked ? '#4630EB' : undefined}
        /> */}
        <FlatList
          style={styles.cell}
          data={data}
          renderItem={renderRow}
          keyExtractor={(item, index) => index.toString()}
        />
      </View>
    </View>
  )
}

const styles = StyleSheet.create({
  image: {
    flex: 1,
    resizeMode: 'cover',
    justifyContent: 'center',
    flexDirection: 'column'
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
  container: {
    flex: 1,
    marginHorizontal: 16,
    marginVertical: 32,
  },
  section: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  paragraph: {
    fontSize: 15,
  },
  checkbox: {
    margin: 8,
  },
  Main: {
    flexDirection: "row",
    backgroundColor: 'white',
    height: '90%',
    width: '97%',
    alignSelf: 'center',
    justifyContent: 'center',
    marginBottom: '50%',
  }
});
