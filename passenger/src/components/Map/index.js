import React, { Fragment } from "react";
import MapView, { Marker } from "react-native-maps";
import { View, Alert } from "react-native";

import SearchEsta from "../SearchEsta";
import SearchVai from "../SearchVai";
import Directions from "../Directions";

import markerStay from "../../../assets/mstay.png";
import markerGoing from "../../../assets/mgo.png";

import firebase from "firebase";
import "firebase/firestore";

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
          },
        });
      },
      () => {
        // mensagem de erro
      },
      {
        timeout: 3000,
        enableHighAccuracy: true,
        maximumAge: 5000,
      }
    );
    this.userExists();
  }

  userExists() {
    firebase
      .firestore()
      .collection("passageiro")
      .doc(firebase.auth().currentUser.uid)
      .get()
      .then((doc) => {
        if (doc.exists) {
          if (
            doc.data().latitudeS != null &&
            doc.data().longitudeS != null &&
            doc.data().latitudeC != null &&
            doc.data().longitudeC != null
          ) {
            firebase
              .firestore()
              .collection("passageiro")
              .doc(firebase.auth().currentUser.uid)
              .onSnapshot((doc) => {
                this.setState({
                  destinationStay: {
                    latitude: doc.data().latitudeS,
                    longitude: doc.data().longitudeS,
                  },
                  destinationGoing: {
                    latitude: doc.data().latitudeC,
                    longitude: doc.data().longitudeC,
                  },
                });
              });
          }
        }
      });
  }

  handleLocationStaySelected = (data, { geometry }) => {
    const {
      location: { lat: latitude, lng: longitude },
    } = geometry;

    this.setState({
      destinationStay: {
        latitude,
        longitude,
      },
    });
    this.saveLocS();
  };

  handleLocationGoingSelected = (data, { geometry }) => {
    const {
      location: { lat: latitude, lng: longitude },
    } = geometry;

    this.setState({
      destinationGoing: {
        latitude,
        longitude,
      },
    });
    this.saveLocC();
  };

  saveLocS = async () => {
    await firebase
      .firestore()
      .collection("passageiro")
      .doc(firebase.auth().currentUser.uid)
      .update({
        latitudeS: this.state.destinationStay.latitude,
        longitudeS: this.state.destinationStay.longitude,
      })
      .then((resultado) => {});
  };

  saveLocC = async () => {
    await firebase
      .firestore()
      .collection("passageiro")
      .doc(firebase.auth().currentUser.uid)
      .update({
        latitudeC: this.state.destinationGoing.latitude,
        longitudeC: this.state.destinationGoing.longitude,
      })
      .then((resultado) => {});
  };

  render() {
    const { region, destinationStay, destinationGoing } = this.state;

    return (
      <View>
        <MapView
          style={{
            width: "100%",
            height: "100%",
          }}
          region={region}
          showsUserLocation
          loadingEnabled
          ref={(el) => (this.mapView = el)}
        >
          {destinationStay && (
            <Marker
              coordinate={destinationStay}
              anchor={{ x: 0.6, y: 0.6 }}
              image={markerStay}
            ></Marker>
          )}

          {destinationGoing && (
            <Fragment>
              <Directions
                origin={destinationStay}
                destination={destinationGoing}
                onReady={(result) => {
                  this.mapView.fitToCoordinates(result.coordinates);
                }}
              />
              <Marker
                coordinate={destinationGoing}
                anchor={{ x: 0.6, y: 0.6 }}
                image={markerGoing}
              ></Marker>
            </Fragment>
          )}
        </MapView>

        <SearchEsta onLocationSelected={this.handleLocationStaySelected} />
        <SearchVai onLocationSelected={this.handleLocationGoingSelected} />
      </View>
    );
  }
}
