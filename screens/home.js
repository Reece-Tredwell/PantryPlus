import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View, Button, ImageBackground, Image, TouchableOpacity  } from 'react-native';

export default function HomeScreen({ navigation }) {
  const image = { uri: "https://dkdesignkitchens.com.au/wp-content/uploads/7-Tips-For-Designing-The-Perfect-Walk-in-Pantry.jpg" };
  const profileImage = {uri : "https://thumbs.dreamstime.com/z/young-happy-positive-teenager-man-gesturing-ok-isolated-white-background-40784002.jpg"}

  const processProfilePress = () => {
    alert('Profile Clicked');
  };

  const NavigateToAddPage = ()  => {
    navigation.navigate('Add')
  };

  const NavigateToDeletePage = ()  => {
    navigation.navigate('Delete')
  };

  
  return (
    <ImageBackground source={image} style={styles.image}>
        {/* <View style={styles.rightSection}>
        <TouchableOpacity onPress={processProfilePress}>
          <Image source={profileImage} style={styles.profileImage}/>
        </TouchableOpacity>
        </View> */}
      <View style = {styles.Main}>
          <View>
            
          </View>
      </View>
      <View style = {styles.AddDelete}>
        <View style = {styles.buttonsLeft}>
            <Button title="Add" style = {styles.button} onPress={NavigateToAddPage}/>
        </View>
        <View style = {styles.buttonsRight}>
            <Button title="Remove" style = {styles.button} onPress={NavigateToDeletePage}/>
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
    alignSelf: 'center', // Centers the box horizontally within the parent
    justifyContent: 'center', // Ensures content inside the box is centered (if applicable)
    marginTop: '-40%', // Adjusts vertical position

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
    flexDirection: 'row', // Arrange children horizontally
    alignItems: 'center',
    justifyContent: 'space-between', // Space out children
    backgroundColor: '#969393',
    paddingHorizontal: 10, // Add padding to edges
  },
  rightSection: {
    flex: 1, // Take equal space
    justifyContent: 'center',
  },
  centerSection: {
    flex: 2, // Take more space for the title
    alignItems: 'center',
    justifyContent: 'center',
  },
  leftSection: {
    flex: 1, // Take equal space
    alignItems: 'flex-end', // Align to the right
    justifyContent: 'center',
  },
  profileImage: {
    width: 50, // Width of the profile image
    height: 50, // Height of the profile image
    borderRadius: 25, // Makes the image circular
  },
  text: {
    color: 'white',
    fontSize: 20,
    fontWeight: 'bold',
  },
  title: {
    color : 'white',
    fontSize : 20,
    fontWeight: 'bold'
  },
  image: {
    flex: 1,
    resizeMode: 'cover',
    justifyContent: 'center',
    flexDirection: 'column'
  },
});
