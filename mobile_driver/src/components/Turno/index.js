import React from 'react';
import { Picker } from '@react-native-community/picker';

export default class Turno extends React.Component {

    state = {
        turno: ''
    };

    updateTurno = (turno) => {
        this.setState({ turno: turno })
    }

    render() {
        return (
            <Picker
                selectedValue={this.state.turno} onValueChange={this.updateTurno}
                style={{ height: 50, width: 150, alignItems: 'center', justifyContent: 'center' }}>
                <Picker.Item label="Matutino" value="Manha" />
                <Picker.Item label="Vespertino" value="Tarde" />
                <Picker.Item label="Noturno" value="Noite" />
            </Picker>

        );
    }
}