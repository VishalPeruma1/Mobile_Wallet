
import React from 'react';
import type {Node} from 'react';
import {
  SafeAreaView,
  ScrollView,
  StatusBar,
  StyleSheet,
  Text, 
  Button,TouchableOpacity,
  Alert,
  useColorScheme,
  View,
} from 'react-native';

import {
  Colors,
  Header,
  
} from 'react-native/Libraries/NewAppScreen';

const Section = ({children, title}): Node => {
  const isDarkMode = useColorScheme() === 'dark';
  return (
    <View style={styles.sectionContainer}>
      <Text
        style={[
          styles.sectionTitle,
          {
            color: isDarkMode ? Colors.white : Colors.black,
          },
        ]}>
        {title}
      </Text>
      <Text
        style={[
          styles.sectionDescription,
          {
            color: isDarkMode ? Colors.light : Colors.dark,
          },
        ]}>
        {children}
      </Text>
    </View>
  );
};

const App: () => Node = () => {
  const isDarkMode = useColorScheme() === 'dark';

  const backgroundStyle = {
    backgroundColor: isDarkMode ? Colors.darker : Colors.lighter,
  };

  return (
    <SafeAreaView>
      <StatusBar />
      <ScrollView>        
            <Text style={styles.headline}>Welcome to Knuct Webwallet. </Text>
            <Text style={styles.content}>
            This is web based wallet that give you access to your knuct coin anywhere in the world.
            </Text>
            {/* <View style = {styles.container}>
         <TouchableOpacity>
            <Text style = {styles.text}>
               Button
            </Text>
         </TouchableOpacity>
      </View> */}
            <View style={styles.Button_style}>
            <Button
            color="#841584"
            accessibilityLabel="Learn more about this purple button"
        title="Access your Wallet"
        onPress={() => Alert.alert('Simple Button pressed')}
      /></View>
      <View style={styles.Button_style}>
            <Button
            color="#841584"
            accessibilityLabel="Learn more about this purple button"
        title="+ Create a new Wallet"
        onPress={() => Alert.alert('Simple Button pressed')}
      />
              </View>
              <Text style={styles.content}>
              For better security download our desktop wallet.
            </Text>
              
      </ScrollView>
    </SafeAreaView>
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
