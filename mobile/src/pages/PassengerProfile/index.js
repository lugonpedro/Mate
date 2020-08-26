import React from 'react';
import { View, TextInput, TouchableOpacity, Image, Text } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { FontAwesome } from '@expo/vector-icons';

import styles from './styles';

import logo from '../../../assets/icon.png';

export default function Passenger() {
    const navigation = useNavigation();

    function signOut() {
        navigation.navigate('Login')
    }

    return (
        <View style={styles.container}>
            <View style={styles.header}>
                <TouchableOpacity onPress={signOut}>
                    <FontAwesome name="sign-out" size={30} color="black" />
                </TouchableOpacity>
                <Text style={styles.headerText}>MATE</Text>
                <Image source={logo} style={styles.logo}/>
            </View>

            <View style={styles.container}>
            

            </View>
        </View>
    );
}