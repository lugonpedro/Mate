import React from 'react';
import { View, Image, Text, TextInput, TouchableOpacity } from 'react-native';
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
                <TextInput placeholder={"Nome do Motorista"}
                    style={styles.input}
                    defaultValue={""}
                    editable={false}
                />

                <TextInput placeholder={"Turno"}
                    style={styles.input}
                    defaultValue={""}
                    editable={false} />

                <TextInput placeholder={"Local de Saida"}
                    style={styles.input}
                    defaultValue={""}
                    editable={false} />

                <TextInput placeholder={"Local de Chegada"}
                    style={styles.input}
                    defaultValue={""}
                    editable={false} />

                <TextInput placeholder={"Dias de Trabalho"}
                    style={styles.input}
                    defaultValue={""}
                    editable={false} />

                <TouchableOpacity
                    style={styles.botao}
                    onPress={() => {}}>
                    <Text style={styles.botaoText}>Solicitar Servico</Text>
                </TouchableOpacity>
            </View>
        </View>
    );
}