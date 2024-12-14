// import { StatusBar } from 'expo-status-bar';
// import { StyleSheet, Text, View, Button, ImageBackground, Image, TouchableOpacity  } from 'react-native';

// export default function App() {
//   const image = { uri: "https://dkdesignkitchens.com.au/wp-content/uploads/7-Tips-For-Designing-The-Perfect-Walk-in-Pantry.jpg" };
//   const profileImage = {uri : "https://thumbs.dreamstime.com/z/young-happy-positive-teenager-man-gesturing-ok-isolated-white-background-40784002.jpg"}

//   const processProfilePress = () => {
//     alert('Profile Clicked');
//   };

//   const NavigateToAddPage = ()  => {
//     alert('Moving to the Add Page');
//   };

//   const NavigateToDeletePage = ()  => {
//     alert('Moving to the Delete Page');
//   };

//   return (
//     <ImageBackground source={image} style={styles.image}>
//       <View style={styles.Header}>
//         {/* Right Section (Profile) */}
//         <View style={styles.rightSection}>
//         <TouchableOpacity onPress={processProfilePress}>
//           <Image source={profileImage} style={styles.profileImage}/>
//         </TouchableOpacity>
//         </View>

//         {/* Center Section (Title) */}
//         <View style={styles.centerSection}>
//           <Text style={styles.title}>Pantry Plus</Text>
//         </View>

//         {/* Left Section (Optional Button or Icon) */}
//         <View style={styles.leftSection}>
//           <Button title="Click Me" onPress={() => alert('Button Pressed')} />
//         </View>
//       </View>

//       <View style = {styles.AddDelete}>
//         <View style = {styles.buttonsLeft}>
//             <Button title="Add" style = {styles.AddDelete} onPress={NavigateToAddPage}/>
//           </View>
//           <View style = {styles.rightSection}>
//             <Button title="Remove" style = {styles.AddDelete} onPress={NavigateToDeletePage}/>
//           </View>
//       </View>



//       <StatusBar style="auto" />
//     </ImageBackground>
//   );
// }

// const styles = StyleSheet.create({
//   buttonsLeft: {
//     flex: 1,
//     justifyContent: 'center',
//     alignItems: 'center',
//   },

//   buttonsRight: {
//     flex: 1,
//     justifyContent: 'center',
//     alignItems: 'center',    
//   },  

//   AddDelete: {
//     position: 'absolute',
//     top: 750,
//     left: 0,
//     right: 0,
//     height: 75,
//     flexDirection: 'row',
//     backgroundColor: 'white'
//   },

//   Header: {
//     position: 'absolute',
//     top: 0,
//     left: 0,
//     right: 0,
//     height: 125,
//     flexDirection: 'row', // Arrange children horizontally
//     alignItems: 'center',
//     justifyContent: 'space-between', // Space out children
//     backgroundColor: '#969393',
//     paddingHorizontal: 10, // Add padding to edges
//   },
//   rightSection: {
//     flex: 1, // Take equal space
//     justifyContent: 'center',
//   },
//   centerSection: {
//     flex: 2, // Take more space for the title
//     alignItems: 'center',
//     justifyContent: 'center',
//   },
//   leftSection: {
//     flex: 1, // Take equal space
//     alignItems: 'flex-end', // Align to the right
//     justifyContent: 'center',
//   },
//   profileImage: {
//     width: 50, // Width of the profile image
//     height: 50, // Height of the profile image
//     borderRadius: 25, // Makes the image circular
//   },
//   text: {
//     color: 'white',
//     fontSize: 20,
//     fontWeight: 'bold',
//   },
//   title: {
//     color : 'white',
//     fontSize : 20,
//     fontWeight: 'bold'
//   },
//   image: {
//     flex: 1,
//     resizeMode: 'cover',
//     justifyContent: 'center',
//   },
// });


import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';

// Import screens
import HomeScreen from './home';
import Add from './AddProduct';
import Delete from './DeleteProduct';
import AddScanner from './AddScanner';

const Stack = createStackNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Home">
        <Stack.Screen name="Home" component={HomeScreen} options={{title: 'Pantry Plus', headerStyle: {backgroundColor: 'grey'}, headerTitleStyle:{fontSize: 35, fontFamily: 'arial'}}}/>
        <Stack.Screen name="Add" component={Add} options={{title: 'Add Products'}}/>
        <Stack.Screen name="Delete" component={Delete} options={{title: 'Delete Products'}} />
        <Stack.Screen name="AddScanner" component={AddScanner} options={{title: "Scan Away!"}}/>
      </Stack.Navigator>
    </NavigationContainer>
  );
}
