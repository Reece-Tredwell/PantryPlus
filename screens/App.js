import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';

// Import screens
import CreatePantry from './CreatePantry'
import HomeScreen from './home';
import Add from './AddProduct';
import Delete from './DeleteProduct';
import AddScanner from './AddScanner';
import SelectDelete from './SelectDelete'
import ScanDelete from './ScanDelete'

const Stack = createStackNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="CreatePantry">
      <Stack.Screen name="CreatePantry" component={CreatePantry} options={{title: 'Pantry Plus', headerStyle: {backgroundColor: 'grey'}, headerTitleStyle:{fontSize: 35, fontFamily: 'arial'}}}/>
        <Stack.Screen name="Home" component={HomeScreen} options={{title: 'Pantry Plus', headerStyle: {backgroundColor: 'grey'}, headerTitleStyle:{fontSize: 35, fontFamily: 'arial'}}}/>
        <Stack.Screen name="Add" component={Add} options={{title: 'Add Products'}}/>
        <Stack.Screen name="Delete" component={Delete} options={{title: 'Delete Products'}} />
        <Stack.Screen name="AddScanner" component={AddScanner} options={{title: "Scan Away!"}}/>
        <Stack.Screen name="SelectDelete" component={SelectDelete} options={{title: "Delete Items"}}/>
        <Stack.Screen name="ScanDelete" component={ScanDelete} options={{title: "Delete Items By Scanning"}}/>
      </Stack.Navigator>
    </NavigationContainer>
  );
}