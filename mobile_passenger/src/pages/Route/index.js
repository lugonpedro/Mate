import React from 'react';
import { View, Image, Text, Alert, TouchableOpacity } from 'react-native';
import Map from '../../components/Map';

import styles from './styles';
import logo from '../../../assets/icon.png';

export default function Route() {

    return (
        <View style={styles.container}>
            <View style={styles.header}>
                <Image source={logo} style={styles.logo} />
            </View>

            <View>
                <Map />
            </View>
        </View>
    );
}