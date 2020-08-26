import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { FontAwesome } from '@expo/vector-icons';

import Login from './pages/Login';
import Register from './pages/Register';
import RegisterChoose from './pages/RegisterChoose';
import RegisterPassenger from './pages/RegisterPassenger';
import RegisterDriver from './pages/RegisterDriver';
import PassRecover from './pages/PassRecover';
import PassengerRoute from './pages/PassengerRoute';
import PassengerProfile from './pages/PassengerProfile';
import DriverRoute from './pages/DriverRoute';
import DriverProfile from './pages/DriverProfile';

const AppStack = createStackNavigator();
const Tab = createBottomTabNavigator();

export default function Routes() {

    function Passenger() {
        return(
        <Tab.Navigator>
            <Tab.Screen name="Rota" component={PassengerRoute} 
            options={ {tabBarIcon: ({ color, size }) =>
            (<FontAwesome name="map" color={"black"} size={25} />)} }/>
            <Tab.Screen name="Perfil" component={PassengerProfile} 
            options={ {tabBarIcon: ({ color, size }) =>
            (<FontAwesome name="user" color={"black"} size={25} />)} }/>
        </Tab.Navigator>
        )
    }

    function Driver() {
        return(
        <Tab.Navigator>
            <Tab.Screen name="Rota" component={DriverRoute} 
            options={{tabBarIcon: ({ color, size }) =>
            (<FontAwesome name="map" color={"black"} size={25} />)} }/>
            <Tab.Screen name="Perfil" component={DriverProfile} 
            options={ {tabBarIcon: ({ color, size }) =>
            (<FontAwesome name="user" color={"black"} size={25} />)} }/>
        </Tab.Navigator>
        )
    }

    return (
        <NavigationContainer>
            <AppStack.Navigator screenOptions={{headerShown: false}}>
                <AppStack.Screen name="Login" component={Login} />
                <AppStack.Screen name="Register" component={Register} />
                <AppStack.Screen name="RegisterChoose" component={RegisterChoose} />
                <AppStack.Screen name="RegisterPassenger" component={RegisterPassenger} />
                <AppStack.Screen name="RegisterDriver" component={RegisterDriver} />
                <AppStack.Screen name="PassRecover" component={PassRecover} />
                <AppStack.Screen name="Passenger" component={Passenger} />
                <AppStack.Screen name="Driver" component={Driver} />
            </AppStack.Navigator>
        </NavigationContainer>
    );
}