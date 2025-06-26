import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';

// Import screens
import Login from './Login'
import CreatePantry from './CreatePantry'
import HomeScreen from './home';
import Add from './Add';
import Delete from './Delete';
import AddScanner from './Add-Scanner';
import SelectDelete from './Select-Delete'
import ScanDelete from './Scan-Delete'
import Profile from './profile'

const Stack = createStackNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Login" screenOptions={{headerShown:false}}>
        <Stack.Screen name="Login" component={Login} />
        <Stack.Screen name="CreatePantry" component={CreatePantry} options={{ title: 'Pantry Plus', headerStyle: { backgroundColor: '#3E7B27' }, headerTitleStyle: { color: '#EFE3C2', fontSize: 35, fontFamily: 'arial' } }} />
        <Stack.Screen name="Home" component={HomeScreen} options={{ title: 'Pantry Plus', headerStyle: { backgroundColor: 'grey' }, headerTitleStyle: { fontSize: 35, fontFamily: 'arial' } }} />
        <Stack.Screen name="Add" component={Add} options={{ title: 'Add Products' }} />
        <Stack.Screen name="Delete" component={Delete} options={{ title: 'Delete Products' }} />
        <Stack.Screen name="Add-Scanner" component={AddScanner} options={{ title: "Scan Away!" }} />
        <Stack.Screen name="Select-Delete" component={SelectDelete} options={{ title: "Delete Items" }} />
        <Stack.Screen name="Scan-Delete" component={ScanDelete} options={{ title: "Delete Items By Scanning" }} />
        <Stack.Screen name="Profile" component={Profile} options={{ title: "Profile" }} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}