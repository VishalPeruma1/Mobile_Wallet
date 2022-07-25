import React, {useEffect, useCallback} from 'react';
import { SafeAreaView ,ScrollView, StyleSheet, Text, Button, View, TouchableOpacity, Alert, LogBox} from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import {request, PERMISSIONS} from 'react-native-permissions';
import Toast from 'react-native-simple-toast';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import UploadPrivateShare from './pages/UploadPrivateShare';
import ActionBarImage from './pages/ActionBarImage';
import AccessWallet from './pages/AccessWallet';
import ChooseWords from './pages/choose_words';
import CreateWallet from './pages/CreateWallet';
import Get_Private_Share from './pages/Get_Private_Share';
import TabBar from './pages/Tab_Bar'; 
import NewContact from './pages/NewContact';
import Contacts from './pages/Contacts';
import OpenCamera from './pages/OpenCamera';
import ContactDetails from './pages/ContactDetails';
import Transactions from './pages/Transactions';
import RecentTransactions from './pages/RecentTransactions';

const Stack = createNativeStackNavigator();

LogBox.ignoreAllLogs()

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
        <ScrollView>  
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
          <TouchableOpacity onPress={()=>navigation.navigate('Choose Words')}>
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
  <Stack.Navigator screenOptions={{title:'Knuct Wallet',headerStyle:{backgroundColor:'#d8d8d8'},headerLeft: ()=><ActionBarImage/>}} >
    <Stack.Screen name="Home" component={HomeScreen} />
    <Stack.Screen name="Upload Private Share" component={UploadPrivateShare} />
    <Stack.Screen name="Access Wallet" component={AccessWallet} />
    <Stack.Screen name="Choose Words" component={ChooseWords} />
    <Stack.Screen name="Create Wallet" component={CreateWallet} />
    <Stack.Screen name="Get Private Share" component={Get_Private_Share} />
    <Stack.Screen name="Tab Bar" component={TabBar} options ={({ navigation }) => ({
              headerRight: () => (
                <TouchableOpacity onPress={async() => {
                  try {
                    const response = await fetch('http://webwallet.knuct.com/sapi/logout');
                    console.log(response)
                    console.log(response.status)
                    if(response.status===204) {
                      console.log("Home")
                      navigation.navigate("Home")
                    }else{
                      Toast.show("Unable to logout at the moment. Try again")
                    }
                  } catch(error) {
                    Toast.show(error,Toast.LONG);
                  }
                }}>
                <Text style={{color:"#00000099", fontSize:18}}>Logout</Text>
                </TouchableOpacity>
              ),
            })} />
    <Stack.Screen name="NewContact" component={NewContact} />
    <Stack.Screen name="Contacts" component={Contacts} />
    <Stack.Screen name="Open Camera" component={OpenCamera} />
    <Stack.Screen name="Contact Details" component={ContactDetails} />
    <Stack.Screen name="Transactions" component={Transactions} />
    <Stack.Screen name="RecentTransactions" component={RecentTransactions} />
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
