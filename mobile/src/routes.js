import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import { NavigationContainer } from '@react-navigation/native';

import Login from './pages/Login';
import Register from './pages/Register';
import RegisterChoose from './pages/RegisterChoose';
import RegisterPassenger from './pages/RegisterPassenger';
import RegisterDriver from './pages/RegisterDriver';
import PassRecover from './pages/PassRecover';
import Passenger from './pages/Passenger';
import Driver from './pages/Driver';
import Profile from './pages/Profile';

const AppStack = createStackNavigator();

export default function Routes() {
    return (
        <NavigationContainer>
            <AppStack.Navigator screenOptions={{ headerShown: false }}>
                <AppStack.Screen name="Login" component={Login} />
                <AppStack.Screen name="Register" component={Register} />
                <AppStack.Screen name="RegisterChoose" component={RegisterChoose} />
                <AppStack.Screen name="RegisterPassenger" component={RegisterPassenger} />
                <AppStack.Screen name="RegisterDriver" component={RegisterDriver} />
                <AppStack.Screen name="PassRecover" component={PassRecover} />
                <AppStack.Screen name="Passenger" component={Passenger} />
                <AppStack.Screen name="Driver" component={Driver} />
                <AppStack.Screen name="Profile" component={Profile} />
            </AppStack.Navigator>
        </NavigationContainer>
    );
}