import Access from './access';
import New_wallet from './new_wallet'
import React, {Component} from 'react';
import {
  SafeAreaView,
  ScrollView,
  StatusBar,
  StyleSheet,
  Text, 
  Button,
  TouchableOpacity,
  Alert,
  useColorScheme,
  View,
} from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';




const Stack = createNativeStackNavigator();

const HomeScreen = ({ navigation }) => {
  return (
    <SafeAreaView>
    <StatusBar />
    <ScrollView>   
     
          <Text style={styles.headline}>Welcome to Knuct Webwallet. </Text>
          <Text style={styles.content}>
          This is web based wallet that give you access to your knuct coin anywhere in the world.
          </Text>
        
          <View style={styles.Button_style}>
          <Button
            color="#841584"
            accessibilityLabel="Learn more about this purple button"
        title="Access your Wallet"
        onPress={() => navigation.navigate('Access')}
      /></View>
      <View style={styles.Button_style}>

            <Button
            color="#841584"
            accessibilityLabel="Learn more about this purple button"
        title="+ Create a new Wallet"
        onPress={() => navigation.navigate('New Wallet')}
      />
      
              </View>
              <Text style={styles.content}>
              For better security download our desktop wallet.
            </Text>
              
      </ScrollView>
    </SafeAreaView>


  );
};
const App = () => {
  

  return (
  
 <NavigationContainer>
  <Stack.Navigator>
    <Stack.Screen name="Home" component={HomeScreen} />
    <Stack.Screen name="Access" component={Access} />
    <Stack.Screen name="New Wallet" component={New_wallet} />
  </Stack.Navigator>
  </NavigationContainer>

            
  );
};



const styles = StyleSheet.create({
  sectionContainer: {
    marginTop: 32,
    paddingHorizontal: 24,
  },
  sectionTitle: {
    fontSize: 24,
    fontWeight: '600',
  },
  content:{
    color:'black',
    flex:2 ,
    textAlign:'center',
    fontSize: 15,
    marginTop: 25,
    // justifyContent: 'center',
    // marginLeft: 37,
    alignItems: 'center'
  },
  Button_style:{
    flex:2 ,
    textAlign:'center',
    fontSize: 20,
    marginTop: 25,
    // justifyContent: 'center',
    // marginLeft: 37,
    alignItems: 'center'
  },
  container: {
    alignItems: 'center',
 },
 text: {
    borderWidth: 1,
    padding: 25,
    borderColor: 'black',
    backgroundColor: 'red'
 }
,
  headline: {
    textAlign: 'center', // <-- the magic
    fontWeight: 'bold',
    color:'black',
    fontSize: 35,
    marginTop: 250,
    // justifyContent: 'center',
    // marginLeft: 37,
    alignItems: 'center'
  },
  sectionDescription: {
    marginTop: 8,
    fontSize: 18,
    fontWeight: '400',
  },
  highlight: {
    fontWeight: '700',
  },
});

export default App;
