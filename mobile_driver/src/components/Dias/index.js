import React from 'react';
import { Text, TouchableOpacity, FlatList } from 'react-native';
import { Card } from 'react-native-paper';

const Data = [
    {
        id: 2, dia: 'SEG',
    },
    {
        id: 3, dia: 'TER',
    },
    {
        id: 4, dia: 'QUA',
    },
    {
        id: 5, dia: 'QUI',
    },
    {
        id: 6, dia: 'SEX',
    },
    {
        id: 7, dia: 'SAB',
    },
];

export default class Dias extends React.Component {

    state = {
        selectedItem: null,
        renderData: Data
    };

    onPressHandler(id) {
        let renderData = [...this.state.renderData];
        for (let data of renderData) {
            if (data.id == id) {
                data.selected = (data.selected == null) ? true : !data.selected;
                break;
            }
        }
        this.setState({ renderData });
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