import Access from './access';
import New_wallet from './new_wallet';
import Continue from './Continue'
import ActionBarImage from './ActionBarImage';
import React from 'react';
import { SafeAreaView ,ScrollView, StyleSheet, Text, Button, View} from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import Dashboard from './Dashboard';

const Stack = createNativeStackNavigator();

const HomeScreen = ({ navigation }) => {
  React.useLayoutEffect(() => {
    navigation.setOptions({
      headerLeft: () => <ActionBarImage />,
    });
  }, [navigation]);

  return (
    <>
    
      <SafeAreaView>
        <ScrollView>  

          <Text style={styles.headline}>Welcome to Knuct Wallet.</Text>
          <Text style={styles.content}>
            This is a wallet that gives you access to your knuct coin anywhere in the world.
          </Text>

          <View style={styles.Button_style}>
            <Button
              color="#841584"
              accessibilityLabel="Learn more about this purple button"
              title="Access your Wallet"
              onPress={() => navigation.navigate('Access')} /></View>
          <View style={styles.Button_style}>

            <Button
              color="#841584"
              accessibilityLabel="Learn more about this purple button"
              title="+ Create a new Wallet"
              onPress={() => navigation.navigate('New Wallet')} />

          </View>
          {/* <Text style={styles.content}>
            For better security download our desktop wallet.
          </Text> */}

        </ScrollView>
      </SafeAreaView></>


  );
};
const App = () => {
  

  return (
  
 <NavigationContainer>
  <Stack.Navigator >
    <Stack.Screen name="Home" component={HomeScreen} options ={{title:'Knuct Wallet',headerStyle:{backgroundColor:'#d8d8d8'},headerLeft: ()=><ActionBarImage/>}}/>
    <Stack.Screen name="Access" component={Access} options ={{title:'Knuct Wallet',headerStyle:{backgroundColor:'#d8d8d8'},headerLeft: ()=><ActionBarImage/>}}/>
    <Stack.Screen name="New Wallet" component={New_wallet} options ={{title:'Knuct Wallet',headerStyle:{backgroundColor:'#d8d8d8'},headerLeft: ()=><ActionBarImage/>}} />
    <Stack.Screen name="Continue" component={Continue} options ={{title:'Knuct Wallet',headerStyle:{backgroundColor:'#d8d8d8'},headerLeft: ()=><ActionBarImage/>}} />
    <Stack.Screen name="Dashboard" component={Dashboard} options ={{title:'Knuct Wallet',headerStyle:{backgroundColor:'#d8d8d8'},headerLeft: ()=><ActionBarImage/>}} />
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
    marginTop: 75,
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
