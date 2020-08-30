import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { FontAwesome } from '@expo/vector-icons';

import Login from './pages/Login';
import Register from './pages/Register';
import RegisterDriver from './pages/RegisterDriver';
import PassRecover from './pages/PassRecover';
import Route from './pages/Route';
import Profile from './pages/Profile';

const AppStack = createStackNavigator();
const Tab = createBottomTabNavigator();

export default function Routes() {

    function Home() {
        return(
        <Tab.Navigator>
            <Tab.Screen name="Rota" component={Route} 
            options={{tabBarIcon: ({ color, size }) =>
            (<FontAwesome name="map" color={"black"} size={25} />)} }/>
            <Tab.Screen name="Perfil" component={Profile} 
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
                <AppStack.Screen name="RegisterDriver" component={RegisterDriver} />
                <AppStack.Screen name="PassRecover" component={PassRecover} />
                <AppStack.Screen name="Home" component={Home} />
            </AppStack.Navigator>
        </NavigationContainer>
    );
}