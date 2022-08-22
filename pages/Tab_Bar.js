import React from 'react';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import Dashboard from './Dashboard.js';
import Contacts from './Contacts.js';
import Transactions from './Transactions.js';
import { View, Text, TouchableOpacity, PermissionsAndroid,BackHandler, Platform , Alert, ImageBackground} from 'react-native';
import * as ImagePicker from 'react-native-image-picker';
import RNFS from 'react-native-fs';
import { PERMISSIONS } from 'react-native-permissions';
import Geolocation from '@react-native-community/geolocation'
import { scale,ScaledSheet } from 'react-native-size-matters';

const TabBar= ({ navigation, route}) => {

    const [camerapermission,setcamerapermission] = React.useState("denied")
    const [locationpermission,setlocationpermission] = React.useState("denied")
    const [currentLongitude,setCurrentLongitude] = React.useState('...');
    const [currentLatitude,setCurrentLatitude] = React.useState('...');
    const [locationStatus,setLocationStatus] = React.useState('');
    const [currentDate,setCurrentDate] = React.useState('...');
    const [humidity,setHumidity] = React.useState('...');
    const [windSpeed,setWindSpeed] = React.useState('...');
    const [temp,setTemp] = React.useState('...');
    //const [phototaken,setphototaken] = React.useState("")(
    const [imgPath,setImgPath] = React.useState("")
    const did = route.params.did
    const [pagename,setPagename] = React.useState("Dashboard")
    const [responseCamera, setResponseCamera] = React.useState(null);
    const pages = [
        {displayname:"Dashboard",navName:"Dashboard",icon:<MaterialCommunityIcons name="view-dashboard-outline" style={{color:(pagename==="Dashboard"?"#1976D2":"#808080"), fontSize:scale(24)}}/>},
        {displayname:"Transaction",navName:"Transactions",icon:<MaterialIcons name="compare-arrows" style={{color:(pagename==="Transactions"?"#1976D2":"#808080"), fontSize:scale(24)}}/>},
        {displayname:"Contacts",navName:"Contacts",icon:<MaterialIcons name="contact-page" style={{color:(pagename==="Contacts"?"#1976D2":"#808080"), fontSize:scale(24)}}/>}
    ]
    React.useEffect(()=>{
      const backHandler = BackHandler.addEventListener('hardwareBackPress', () => true)
      return ()=>backHandler.remove()
     },[])

     const getWeatherDetails = async () => {
      setLocationStatus('Getting Location ...');
      console.log(locationStatus)
      Geolocation.getCurrentPosition(
        //Will give you the current location
        (position) => {
          setLocationStatus('You are Here');
          
          console.log(locationStatus)
          //getting the Longitude from the location json
          const currentLongitude = JSON.stringify(position.coords.longitude);
  
          //getting the Latitude from the location json
          const currentLatitude = JSON.stringify(position.coords.latitude);
          
          //FetchWeatherDetails(currentLatitude,currentLongitude);
          const API_KEY = "6e378b4664c12cb47ae1681917918117";
          fetch("https://api.openweathermap.org/data/2.5/weather?lat="+currentLatitude+"&lon="+currentLongitude+"&appid="+API_KEY+"&units=metric")
              .then(response => response.json())
              .then( responseJson => {
                //Setting Longitude state
                setCurrentLongitude(currentLongitude);
                //Setting Longitude state
                setCurrentLatitude(currentLatitude);
                setCurrentDate(new Date().toLocaleString());
                setHumidity(responseJson["main"]["humidity"]+"%");
                setTemp(responseJson["main"]["temp"] + " celsius");
                setWindSpeed(responseJson["wind"]["speed"]+" m/s");
                console.log(responseJson);
                setPagename("Camera")
              })
              .catch(error => {
                return {"status": "error","response": error};
              })
        },
        (error) => {
          setLocationStatus(error.message);
        },
        {
          enableHighAccuracy: false,
          timeout: 30000,
          maximumAge: 1000
        },
      );
    };  

    const getcamerapermission = () => {
      if(camerapermission==="denied") {
        PermissionsAndroid.request(
          PermissionsAndroid.PERMISSIONS.CAMERA,
        ).then((result) => {
          console.log(result)
          if(result==="granted") {
            setcamerapermission(true)
            console.log("Camera Permission Granted")
            getlocationpermission()
          } else{
            console.log("Camera Permission Denied")
            Alert.alert(
              "Permission Required",
              "Need Camera Permission to work.",
              [
                {
                  text: "Allow",
                  onPress: () => getcamerapermission()
                }
              ]
            )
          }
        });
      } else {
        getlocationpermission()
      }
    }

    const getlocationpermission = () => {
      if(locationpermission==="denied") {
        console.log(Platform.OS)
        if(Platform.OS==="ios") {
          check(PERMISSIONS.IOS.LOCATION_WHEN_IN_USE) 
          .then((result) => {
            console.log(result)
            if(result==="granted") {
              setlocationpermission(true)
              console.log("Location Permission Granted")
              OpenCamera()
            } else{
              console.log("Location Permission Denied")
              Alert.alert(
                "Permission Required",
                "Need Location Permission to work.",
                [
                  {
                    text: "Allow",
                    onPress: () => getlocationpermission()
                  }
                ]
              )
            }
          });
        }
        else{
          PermissionsAndroid.requestMultiple(
            [PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION,
            PermissionsAndroid.PERMISSIONS.ACCESS_COARSE_LOCATION,]
          ).then((result) => {
            console.log(result)
            if(result['android.permission.ACCESS_FINE_LOCATION'] && result['android.permission.ACCESS_COARSE_LOCATION']==="granted") {
              setlocationpermission(true)
              console.log("Location Permission Granted")
              OpenCamera()
            } else{
              console.log("Location Permission Denied")
              Alert.alert(
                "Permission Required",
                "Need Location Permission to work.",
                [
                  {
                    text: "Allow",
                    onPress: () => getlocationpermission()
                  }
                ]
              )
            }
          });
        } 
      } 
      else {
        OpenCamera()
      }
    }

    function OpenCamera () {
      var imgName = "img_"+new Date().getTime().toString()+".jpg"
      let options = {
        storageOptions: {
          skipBackup: true,
          //path: "Downloads",
        },
        path: Platform.OS==="ios" ? RNFS.LibraryDirectoryPath+'/PrivateShare.jpg' : RNFS.DownloadDirectoryPath +'/PrivateShare.jpg',
        mediaType: 'photo',
        includeBase64: false,
        // saveToPhotos: true,
      };
        ImagePicker.launchCamera ( options,
          (response) => {
            console.log(response);
            if(response.didCancel){
              console.log("User cancelled camera");
            }
            else if (response.errorCode) {
              console.log('Error occurred',response.errorCode);
            }
            else if (response.errorMessage) {
              console.log('Error occurred');
            }
            else{
              setResponseCamera(response);
              console.log(imgName)
              const destination = Platform.OS==="ios" ? RNFS.LibraryDirectoryPath+"/"+imgName : RNFS.DownloadDirectoryPath +"/"+imgName
              RNFS.moveFile(response.assets[0].uri, destination)
              .then((success) => {
                console.log('File moved!');
                setImgPath(destination)
                console.log(destination)
              })
              .catch((err) => {
                console.log("Error: " + err.message);
              });
              getWeatherDetails()
            }
          });
      }

    const TabScreen = ({data})=>{
        return(
            <TouchableOpacity onPress={()=>setPagename(data.navName)}>
            <View style={{alignItems:"center", justifyContent:"center"}}>
                {data.icon}
                <Text style={{color:(pagename===data.navName?"#1976D2":"#808080"), fontSize:scale(12)}} >{data.displayname}</Text>
            </View>
            </TouchableOpacity>
        )
    }

    return (
        <View style={{flex:1}}>
            {pagename==="Dashboard" ? 
                <Dashboard data={did}/> : null
            }
            {pagename==="Transactions" ? 
                <Transactions navigation={navigation}/> : null
            }
            {pagename==="Contacts" ? 
                <Contacts navigation={navigation}/> : null
            }
            {pagename==="Camera" ?
            <ImageBackground source={{uri : "file://"+imgPath}} style={{width: "100%", height: "100%", flex: 1,  }}>
            <View style={styles.detailStyle}>  
              <Text style={styles.boldText}>
                  {locationStatus}
              </Text>
              <Text style={styles.weatherText}>
                Longitude: {currentLongitude}
              </Text> 
              <Text style={styles.weatherText}>
                Latitude: {currentLatitude}
              </Text>
              <Text style={styles.weatherText}>
                Current Date: {currentDate}
              </Text>
              <Text style={styles.weatherText}>
                Wind Speed: {windSpeed}
              </Text>
              <Text style={styles.weatherText}>
                Temp: {temp}
              </Text>
              <Text style={[styles.weatherText, {marginBottom:56}]}>
                Humidity: {humidity}
              </Text>
            </View>
            </ImageBackground> 
              : null
            }
          <View style={styles.tabbarstyle}>
            {pages.map((data,id) => (
                <TabScreen key={id} data={data} />
            ))}
            <TouchableOpacity onPress={() => getcamerapermission()}>
              <View style={{alignItems:"center", justifyContent:"center"}}>
                  <MaterialCommunityIcons name="camera" style={{color:"#808080", fontSize:scale(24)}}/>
                  <Text style={{color:"#808080", fontSize:scale(12)}} >Camera</Text> 
              </View>
            </TouchableOpacity>
          </View>
        </View>
      );

}

const styles = ScaledSheet.create({
    tabbarstyle: {
        backgroundColor:'white', 
        paddingTop:'5@s', 
        paddingBottom:'5@s', 
        alignItems:"center", 
        justifyContent:"space-around", 
        flexDirection:"row", 
        borderRadius:'10@s', 
        bottom:'0@s',
        position:"absolute",
        width:"100%"
    },
    boldText: {
      fontSize: '22@s',
      color: 'red',
      marginVertical: '10@s',
    },
    detailStyle: {
      flex: 1, 
      margin: '15@s', 
      position: "absolute", 
      bottom: '0@s', 
      left: '0@s', 
    },
    weatherText : {
        justifyContent: 'center',
        alignItems: 'center',
        marginTop: '13@s',
        fontWeight: "900",
        color: 'black',
    }
})

export default TabBar;
