import React from 'react';
import { Text, TouchableOpacity, FlatList } from 'react-native';
import { Card } from 'react-native-paper';

import firebase from 'firebase';
import 'firebase/firestore';

const Data = [
    {
        id: 0, dia: 'SEG',
    },
    {
        id: 1, dia: 'TER',
    },
    {
        id: 2, dia: 'QUA',
    },
    {
        id: 3, dia: 'QUI',
    },
    {
        id: 4, dia: 'SEX',
    },
    {
        id: 5, dia: 'SAB',
    },
];

export default class Dias extends React.Component {

    state = {
        selectedItem: [],
        renderData: Data
    };

    onPressHandler(id) {
        let renderData = this.state.renderData;
        for (let data of renderData) {
            if (data.id == id) {
                data.selected = (data.selected == null) ? true : !data.selected;
                if(this.state.selectedItem.includes(data.dia)) {
                    this.state.selectedItem.splice(data.id, 1)
                }else{
                    this.state.selectedItem.push(data.dia)
                }
            }
        }
        this.setState({ renderData });
        this.saveDias();
    }

    saveDias = async () => {
        await firebase.firestore().collection("motorista").doc(firebase.auth().currentUser.uid).update({
            dias: this.state.selectedItem,
        }).then(resultado => {

        })
    }

    render() {
        return (
            <FlatList

                horizontal={true}
                data={this.state.renderData}
                keyExtractor={item => item.id.toString()}
                showsHorizontalScrollIndicator={false}
                renderItem={({ item }) => (
                    <TouchableOpacity style={{ padding: 2, marginTop: 10 }} 
                    onPress={() => this.onPressHandler(item.id)}>
                        <Card
                            style={
                                item.selected == true
                                    ? {
                                        padding: 10,
                                        backgroundColor: '#326888',
                                        borderWidth: 3,
                                    }
                                    : {
                                        padding: 10,
                                        backgroundColor: '#76CAFB',
                                    }
                            }>
                            <Text>{item.dia}</Text>
                        </Card>
                    </TouchableOpacity>
                )}
            />
        );
    }
}