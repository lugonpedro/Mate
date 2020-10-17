import React from 'react';
import MapView from 'react-native-maps';
import { View } from 'react-native';
import SearchEsta from '../SearchEsta';
import SearchVai from '../SearchVai';
import Directions from '../Directions';

export default class Map extends React.Component {

    state = {
        region: null,
        destination: null,
    };

    componentDidMount() {
        navigator.geolocation.getCurrentPosition(
            ({ coords: { latitude, longitude } }) => {
                this.setState({
                    region: {
                        latitude,
                        longitude,
                        latitudeDelta: 0.0143,
                        longitudeDelta: 0.0134,
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

    handleLocationSelected = (data, { geometry }) => {
        const { 
            location: { lat: latitude, lng: longitude } 
        } = geometry;

        this.setState({
            destination: {
                latitude,
                longitude,
                title: data.structured_formatting.main_text,
            }
        })
    }

    render() {
        const { region, destination } = this.state;

        return (
            <View>
                <MapView style={{
                    width: '100%',
                    height: '100%',
                }}
                    region={region}
                    showsUserLocation
                    loadingEnabled
                >
                    {destination && (
                        <Directions
                            origin={region}
                            destination={destination}
                            onReady={() => {}}
                        />
                    )}
                </MapView>
                <SearchEsta onLocationSelected={this.handleLocationSelected} />
                {/* <SearchVai /> */}
            </View>
        );

    }
}