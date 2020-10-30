import React, { useState, useEffect, Fragment } from 'react';
import { View, TextInput, TouchableOpacity, Image, Text } from 'react-native';
import { useNavigation } from '@react-navigation/native';

import styles from './styles';

import logo from '../../../assets/icon.png';

import firebase from 'firebase';
import 'firebase/firestore'


export default function Profile(props) {
    const navigation = useNavigation();

    const [passageiro, setPassageiro] = useState({});

    const userDocumnt = await firebase.firestore().collection('passageiro').doc("2jVnEgkQL07FqGS7I01H").get()

    const [editable, setEditable] = useState(false);

    return (
        <View style={styles.container}>
            <View style={styles.header}>
                <Image source={logo} style={styles.logo} />
            </View>

            <View style={styles.main}>
                <TextInput placeholder={"Nome Completo"}
                    style={styles.input}
                    defaultValue={passageiro.nome}
                    editable={editable}
                />

                <TextInput placeholder={"Telefone"}
                    keyboardType={'numeric'}
                    maxLength={11}
                    style={styles.input}
                    defaultValue={passageiro.telefone}
                    editable={editable} />

                <TextInput placeholder={"Data de Nascimento"}
                    keyboardType={'numeric'}
                    maxLength={8}
                    style={styles.input}
                    defaultValue={passageiro.dataNasc}
                    editable={editable} />

                <TextInput placeholder={"CPF"}
                    keyboardType={'numeric'}
                    maxLength={11}
                    style={styles.input}
                    defaultValue={passageiro.cpf}
                    editable={editable} />

                {editable || (
                    <Fragment>
                        <TouchableOpacity
                            style={styles.botaoEditar}
                            onPress={() => { setEditable(true) }}>
                            <Text style={styles.botaoText}>Editar</Text>
                        </TouchableOpacity>
                    </Fragment>
                )}

                {editable && (
                    <Fragment>
                        <TouchableOpacity
                            style={styles.botaoSalvar}
                            onPress={() => { setEditable(false) }}>
                            <Text style={styles.botaoText}>Salvar Edicao</Text>
                        </TouchableOpacity>
                    </Fragment>
                )}

            </View>
        </View>
    );
}