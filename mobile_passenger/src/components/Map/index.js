import React, { Fragment } from 'react';
import MapView, { Marker } from 'react-native-maps';
import { View, Text } from 'react-native';

import SearchEsta from '../SearchEsta';
import SearchVai from '../SearchVai';
import Directions from '../Directions';

import markerStay from '../../../assets/mstay.png';
import markerGoing from '../../../assets/mgo.png';

export default class Map extends React.Component {

    state = {
        region: null,
        destinationStay: null,
        destinationGoing: null,
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

    handleLocationStaySelected = (data, { geometry }) => {
        const {
            location: { lat: latitude, lng: longitude }
        } = geometry;

        this.setState({
            destinationStay: {
                latitude,
                longitude,
                title: data.structured_formatting.main_text,
            }
        })
    }

    handleLocationGoingSelected = (data, { geometry }) => {
        const {
            location: { lat: latitude, lng: longitude }
        } = geometry;

        this.setState({
            destinationGoing: {
                latitude,
                longitude,
                title: data.structured_formatting.main_text,
            }
        })
    }

    render() {
        const { region, destinationStay, destinationGoing } = this.state;

        return (
            <View>
                <MapView style={{
                    width: '100%',
                    height: '100%',
                }}
                    region={region}
                    showsUserLocation
                    loadingEnabled
                    ref={el => this.mapView = el}
                >
                    {destinationStay && (
                        <Marker
                            coordinate={destinationStay}
                            anchor={{ x: 0.6, y: 0.6 }}
                            image={markerStay}
                            title={destinationStay.title}
                            description={"Saindo daqui"}>
                        </Marker>
                    )}

                    {destinationGoing && (
                        <Fragment>
                            <Directions
                                origin={destinationStay}
                                destination={destinationGoing}
                                onReady={result => {
                                    this.mapView.fitToCoordinates(result.coordinates);
                                }}
                            />
                            <Marker
                                coordinate={destinationGoing}
                                anchor={{ x: 0.6, y: 0.6 }}
                                image={markerGoing}
                                title={destinationGoing.title}
                                description={"Chegando aqui"}>
                            </Marker>
                        </Fragment>
                    )}
                </MapView>

                <SearchEsta onLocationSelected={this.handleLocationStaySelected} />
                <SearchVai onLocationSelected={this.handleLocationGoingSelected} />

            </View>
        );
    }
}