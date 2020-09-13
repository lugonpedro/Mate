import React from 'react';
import { View, Text, Alert } from 'react-native';
import MapView from 'react-native-maps';
import { GooglePlacesAutocomplete } from 'react-native-google-places-autocomplete';

import styles from './styles';

export default class Route extends React.Component {

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
            <View style={styles.container}>
                <View style={styles.header}>
                    {/* <TouchableOpacity onPress={this.signOut()}>
                        <FontAwesome name="sign-out" size={30} color="black" />
                    </TouchableOpacity> */}
                    <Text style={styles.headerText}>MATE</Text>
                    {/* <Image source={logo} style={styles.logo} /> */}
                </View>

                <View>
                    <MapView style={styles.map}
                        region={{
                            latitude: this.state.region.latitude,
                            longitude: this.state.region.longitude,
                            latitudeDelta: 0.0143,
                            longitudeDelta: 0.0134
                        }}
                        showsUserLocation
                        loadingEnabled
                    />

                    <GooglePlacesAutocomplete
                        placeholder="Local de Saida"
                        fetchDetails={true}
                        onPress={() => { }}
                        query={{
                            // available options: https://developers.google.com/places/web-service/autocomplete
                            key: 'AIzaSyAGBbXF9Uoon0qFrlcJ8E7viGEUb93e1n4',
                            language: 'pt-BR',
                        }}
                        textInputProps={{
                            autoCapitalize: "none",
                            autoCorrect: false
                        }}
                        currentLocation={true}
                        currentLocationLabel="Localizacao atual"
                        enablePoweredByContainer={false}
                        styles={{
                            container: {
                                position: "absolute",
                                width: '100%',
                                top: 10,
                            },
                            textInputContainer: {
                                flex: 1,
                                backgroundColor: 'transparent',
                                height: 54,
                                marginHorizontal: 20,
                                borderTopWidth: 0,
                                borderBottomWidth: 0,
                            },
                            textInput: {
                                height: 54,
                                margin: 0,
                                borderRadius: 0,
                                paddingTop: 0,
                                paddingBottom: 0,
                                paddingLeft: 20,
                                paddingRight: 20,
                                marginTop: 0,
                                marginLeft: 0,
                                marginRight: 0,
                                elevation: 5,
                                shadowColor: '#000',
                                shadowOpacity: 0.1,
                                shadowOffset: { x: 0, y: 0},
                                shadowRadius: 15,
                                borderWidth: 1,
                                borderColor: "#DDD",
                                fontSize: 18,
                            },
                            listView: {
                                borderWidth: 1,
                                borderColor: '#DDD',
                                backgroundColor: '#FFF',
                                marginHorizontal: 20,
                                elevation: 5,
                                shadowColor: "#000",
                                shadowOpacity: 0.1,
                                shadowOffset: { x: 0, y: 0},
                                shadowRadius: 15,
                                marginTop: 10,
                            },
                            description: {
                                fontSize: 16,
                            },
                            row: {
                                padding: 20,
                                height: 58,
                            }
                        }}
                    />

                </View>
            </View>
        );
    }
}