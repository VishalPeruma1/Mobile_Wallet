import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import Dashboard from './Dashboard.js';
import UploadPrivateShare from './uploadprivateshare.js';

const TabBar= ({ navigation}) => {
    const Tab = createBottomTabNavigator();

    function MyTabs() {
        return (
        <Tab.Navigator
        initialRouteName="Dashboard"
        screenOptions={{
            tabBarActiveTintColor: '#1976D2',
            tabBarInactiveTintColor: '#808080',
            headerShown:false
        }}
        >
        <Tab.Screen
            name='Dashboard'
            component={Dashboard}
            options={{
            tabBarLabel: 'Dashboard',
            tabBarIcon: ({ color, size }) => (
                <MaterialIcons name="home" color={color} size={size}/>
            ),
            }}
        />
        <Tab.Screen
            name="Continue"
            component={UploadPrivateShare}
            options={{
            tabBarLabel: 'Contacts',
            tabBarIcon: ({ color, size }) => (
                <MaterialIcons name="contacts" color={color} size={size} />
            ),
            }}
        />
        {/* <Tab.Screen
            name="Profile"
            component={Profile}
            options={{
            tabBarLabel: 'Profile',
            tabBarIcon: ({ color, size }) => (
                <MaterialCommunityIcons name="account" color={color} size={size} />
            ),
            }}
        /> */}
        </Tab.Navigator>
        );
    }

    return (
          <MyTabs />
      );

}

export default TabBar;