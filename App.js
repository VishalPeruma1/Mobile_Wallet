import UploadPrivateShare from './uploadprivateshare';
import New_wallet from './new_wallet';
import Continue from './Continue'
import ActionBarImage from './ActionBarImage';
import React, {useEffect, useCallback} from 'react';
import { SafeAreaView ,ScrollView, StyleSheet, Text, Button, View, TouchableOpacity, PermissionsAndroid, Alert} from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import Dashboard from './Dashboard';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import Wallet_Creation from './wallet_creation';
import Get_Private_Share from './Get_Private_Share';
import AccessWallet from './accessWallet';
import TabBar from './Tab_Bar';
import {request, PERMISSIONS} from 'react-native-permissions';

const Stack = createNativeStackNavigator();

const HomeScreen = ({ navigation }) => {

  const [readWritePermission, setReadWritePermission] = React.useState("denied");

  const fetchRequest = useCallback(() => {
    if(readWritePermission==="denied"){
      request(Platform.OS === 'ios' ? PERMISSIONS.IOS.WRITE_EXTERNAL_STORAGE : PERMISSIONS.ANDROID.WRITE_EXTERNAL_STORAGE).then((result) => {
        console.log(result)
        if(result==="granted"){
          setReadWritePermission(result)
          console.log("Permission Granted")
        }else{
          console.log("Permission Denied")
          Alert.alert(
            "Permission Required",
            "App requires Read & Write permission to work.",
            [
              {
                text: "Allow",
                onPress: () => fetchRequest()
              }
            ]
          )
        }
      });
    }   
  }, []);

  useEffect(()=>{
    if(readWritePermission!=="granted"){
      fetchRequest()
    }
  })

  React.useLayoutEffect(() => {
    navigation.setOptions({
      headerLeft: () => <ActionBarImage />,
    });
  }, [navigation]);

  return (
      <SafeAreaView>
        <ScrollView styles={styles.pagecontent}>  
          <Text style={styles.headline}>Welcome to Knuct Wallet.</Text>
          <Text style={styles.content}>
            This is a wallet that gives you access to your knuct coin anywhere in the world.
          </Text>
          <View style={styles.accesswallet}>
          <TouchableOpacity onPress={()=>navigation.navigate('Upload Private Share')}>
          <View style={{flexDirection:'row'}}>
            <MaterialIcons name='auto-awesome' style={{color:'#1976D2',fontSize:20}}/>
            <Text style={{color: '#1976D2', fontWeight:'bold', fontSize:14, marginLeft:5}}>ACCESS WALLET</Text>
          </View>
          </TouchableOpacity>
          </View>
          <View style={styles.newwallet}>
          <TouchableOpacity onPress={()=>navigation.navigate('New Wallet')}>
          <View style={{flexDirection:'row'}}>
              <MaterialIcons name='add-circle-outline' style={{color:'#ffffff',fontSize:20}}/>
            <Text style={{fontWeight:'bold', color:'#ffffff', fontSize:14, marginLeft:5}}>CREATE A NEW WALLET</Text>
          </View>
          </TouchableOpacity>
          </View>
        </ScrollView>
      </SafeAreaView>
  );
};
const App = () => {
  

  return (
  
 <NavigationContainer>
  <Stack.Navigator >
    <Stack.Screen name="Home" component={HomeScreen} options ={{title:'Knuct Wallet',headerStyle:{backgroundColor:'#d8d8d8'},headerLeft: ()=><ActionBarImage/>}}/>
    <Stack.Screen name="Upload Private Share" component={UploadPrivateShare} options ={{title:'Knuct Wallet',headerStyle:{backgroundColor:'#d8d8d8'},headerLeft: ()=><ActionBarImage/>}}/>
    <Stack.Screen name="New Wallet" component={New_wallet} options ={{title:'Knuct Wallet',headerStyle:{backgroundColor:'#d8d8d8'},headerLeft: ()=><ActionBarImage/>}} />
    <Stack.Screen name="Continue" component={Continue} options ={{title:'Knuct Wallet',headerStyle:{backgroundColor:'#d8d8d8'},headerLeft: ()=><ActionBarImage/>}} />
    <Stack.Screen name="Dashboard" component={Dashboard} options ={{title:'Knuct Wallet',headerStyle:{backgroundColor:'#d8d8d8'},headerLeft: ()=><ActionBarImage/>}} />
    <Stack.Screen name="Wallet Creation" component={Wallet_Creation} options ={{title:'Knuct Wallet',headerStyle:{backgroundColor:'#d8d8d8'},headerLeft: ()=><ActionBarImage/>}} />
    <Stack.Screen name="Get Private Share" component={Get_Private_Share} options ={{title:'Knuct Wallet',headerStyle:{backgroundColor:'#d8d8d8'},headerLeft: ()=><ActionBarImage/>}} />
    <Stack.Screen name="Access Wallet" component={AccessWallet} options ={{title:'Knuct Wallet',headerStyle:{backgroundColor:'#d8d8d8'},headerLeft: ()=><ActionBarImage/>}} />
    <Stack.Screen name="Tab Bar" component={TabBar} options ={{title:'Knuct Wallet',headerStyle:{backgroundColor:'#d8d8d8'},headerLeft: ()=><ActionBarImage/>}} />
  </Stack.Navigator>
  </NavigationContainer>
    
  );
};



const styles = StyleSheet.create({
  sectionContainer: {
    marginTop: 32,
    paddingHorizontal: 24,
  },
  pagecontent:{
    color:'black',
    flex:2 ,
    textAlign:'center',
    fontSize: 15,
    marginTop: 25,
    // justifyContent: 'center',
    // marginLeft: 37
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
    paddingEnd:20,
    paddingStart:20,
    // justifyContent: 'center',
    // marginLeft: 37,
    alignItems: 'center'
  },
  accesswallet:{
    borderColor:'#1976D2',
    flexDirection:'row',
    borderWidth:1,
    padding:12, 
    justifyContent:'center',
    flex:1,
    borderRadius:5,
    marginTop:30,
    alignSelf: 'center',
  },
  newwallet:{
    borderColor:'#1976D2',
    flexDirection:'row',
    borderWidth:1,
    padding:12, 
    justifyContent:'center',
    flex:1,
    borderRadius:5,
    marginTop:30,
    alignSelf: 'center',
    backgroundColor:'#1976D2'
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
