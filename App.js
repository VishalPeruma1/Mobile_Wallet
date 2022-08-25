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
import ContactDetails from './pages/ContactDetails';
import Transactions from './pages/Transactions';
import RecentTransactions from './pages/RecentTransactions';
import RecentNftTransactions from './pages/RecentNftTransactions';
import TokensPage from './pages/TokensPage';
import {scale, ScaledSheet} from 'react-native-size-matters';

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
      <SafeAreaView style={{marginTop:scale(100)}}>
        <ScrollView>  
          <Text style={styles.headline}>Welcome to Knuct Wallet.</Text>
          <Text style={styles.content}>
            This is a wallet that gives you access to your knuct coin anywhere in the world.
          </Text>
          <View style={styles.accesswallet}>
          <TouchableOpacity onPress={()=>navigation.navigate('Upload Private Share')}>
          <View style={{flexDirection:'row'}}>
            <MaterialIcons name='auto-awesome' style={{color:'#1976D2',fontSize:scale(20)}}/>
            <Text style={styles.accessWalletBtnText}>ACCESS WALLET</Text>
          </View>
          </TouchableOpacity>
          </View>
          <View style={styles.newwallet}>
          <TouchableOpacity onPress={()=>navigation.navigate('Choose Words')}>
          <View style={{flexDirection:'row'}}>
              <MaterialIcons name='add-circle-outline' style={{color:'#ffffff',fontSize:scale(20)}}/>
            <Text style={styles.createWalletBtnText}>CREATE A NEW WALLET</Text>
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
                    const response = await fetch('https://webwallet.knuct.com/sapi/logout');
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
    <Stack.Screen name="New Contact" component={NewContact} />
    <Stack.Screen name="Contacts" component={Contacts} />
    <Stack.Screen name="Contact Details" component={ContactDetails} />
    <Stack.Screen name="Transactions" component={Transactions} />
    <Stack.Screen name="Recent Transactions" component={RecentTransactions} />
    <Stack.Screen name="Tokens Page" component={TokensPage}/>
    <Stack.Screen name="Recent NFT Transactions" component={RecentNftTransactions} />
  </Stack.Navigator>
  </NavigationContainer>
    
  );
};



const styles = ScaledSheet.create({
  sectionContainer: {
    marginTop: '32@s',
    paddingHorizontal: '24@s',
  },
  sectionTitle: {
    fontSize: '24@s',
    fontWeight: '600',
  },
  content:{
    color:'black',
    flex:2 ,
    textAlign:'center',
    fontSize: '15@s',
    marginTop: '25@s',
    paddingEnd: '20@s',
    paddingStart: '20@s',
    marginStart:'7@s',
    marginEnd:'7@s',
    // justifyContent: 'center',
    // marginLeft: 37,
    alignItems: 'center'
  },
  accesswallet:{
    borderColor:'#1976D2',
    flexDirection:'row',
    borderWidth:'1@s',
    padding:'12@s', 
    justifyContent:'center',
    flex:1,
    borderRadius:'5@s',
    marginTop:'30@s',
    alignSelf: 'center',
  },
  accessWalletBtnText:{
    color: '#1976D2', 
    fontWeight:'bold', 
    fontSize:'14@s', 
    marginLeft:'5@s'
  },
  createWalletBtnText:{
    fontWeight:'bold', 
    color:'#ffffff', 
    fontSize:'14@s', 
    marginLeft:'5@s'
  },
  newwallet:{
    borderColor:'#1976D2',
    flexDirection:'row',
    borderWidth:'1@s',
    padding:'12@s', 
    justifyContent:'center',
    flex:1,
    borderRadius:'5@s',
    marginTop:'22@s',
    alignSelf: 'center',
    backgroundColor:'#1976D2'
  },
  container: {
    alignItems: 'center',
 },
 text: {
    borderWidth: '1@s',
    padding: '25@s',
    borderColor: 'black',
    backgroundColor: 'red'
 }
,
  headline: {
    textAlign: 'center', // <-- the magic
    fontWeight: 'bold',
    color:'black',
    fontSize: '35@s',
    marginTop: '75@s',
    // justifyContent: 'center',
    // marginLeft: 37,
    alignItems: 'center'
  },
  sectionDescription: {
    marginTop: '8@s',
    fontSize: '18@s',
    fontWeight: '400',
  },
  highlight: {
    fontWeight: '700',
  },
});

export default App;
