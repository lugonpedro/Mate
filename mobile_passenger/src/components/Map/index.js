import React from 'react';
import MapView from 'react-native-maps';

export default class Map extends React.Component {

    state = {
        region: {
            latitude: 0,
            longitude: 0
        },
    };

    componentDidMount() {
        navigator.geolocation.getCurrentPosition(
            ({ coords: { latitude, longitude } }) => {
                this.setState({
                    region: {
                        latitude,
                        longitude,
                    }
                });
            }, // sucesso
            () => { Alert.alert('Nao foi possivel obter sua localizacao') }, // erro
            {
                timeout: 3000,
                enableHighAccuracy: true,
                maximumAge: 5000,
            }
        )
    }

    render() {
        return (
            <MapView style={{
                width: '100%',
                height: '100%'
            }}
                region={{
                    latitude: this.state.region.latitude,
                    longitude: this.state.region.longitude,
                    latitudeDelta: 0.0143,
                    longitudeDelta: 0.0134
                }}
                showsUserLocation
                loadingEnabled
            />
        );
    }
}