import React from 'react';
import { View, Image, Text, TouchableOpacity } from 'react-native';
import styles from './styles';
import logo from '../../../assets/icon.png';
import { FontAwesome } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';

export default function ServiceDetails() {
    const navigation = useNavigation();

    function navigateBack() {
        navigation.goBack()
    }

    return (
        <View style={styles.container}>
            <View style={styles.header}>
                <TouchableOpacity onPress={navigateBack}>
                    <FontAwesome name="arrow-left" size={30} color="black" />
                </TouchableOpacity>
                <Image source={logo} style={styles.logo} />
            </View>

            <View style={styles.main}>
                
            </View>
        </View>
    );
}