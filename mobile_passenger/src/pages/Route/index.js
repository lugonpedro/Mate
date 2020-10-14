import React from 'react';
import { View, Image, Text, Alert, TouchableOpacity } from 'react-native';
import SearchEsta from '../../components/SearchEsta';
import SearchVai from '../../components/SearchVai';
import Map from '../../components/Map';
import styles from './styles';
import logo from '../../../assets/icon.png';

export default class Route extends React.Component {

    render() {

        return (
            <View style={styles.container}>
                <View style={styles.header}>
                    <Image source={logo} style={styles.logo} />
                </View>

                <View style={styles.main}>
                    <Map />

                    <SearchEsta />
                    <SearchVai />

                    <TouchableOpacity 
                    style={styles.botao}
                    onPress={() => {}}>
                        <Text style={styles.botaoText}>Escolher Dia e Hora</Text>
                    </TouchableOpacity>

                </View>
            </View>
        );
    }
}