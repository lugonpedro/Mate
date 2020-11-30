import React from "react";
import { GooglePlacesAutocomplete } from "react-native-google-places-autocomplete";

export default class SearchEsta extends React.Component {
  render() {
    const { onLocationSelected } = this.props;

    return (
      <GooglePlacesAutocomplete
        placeholder="Onde Mora"
        fetchDetails={true}
        onPress={onLocationSelected}
        query={{
          // available options: https://developers.google.com/places/web-service/autocomplete
          key: "AIzaSyC-0wZK4QIMROxSg93uIctMRf-p-keq9Ww",
          language: "pt-BR",
        }}
        textInputProps={{
          autoCapitalize: "none",
          autoCorrect: false,
        }}
        enablePoweredByContainer={false}
        styles={{
          container: {
            position: "absolute",
            width: "100%",
            top: 10,
          },
          textInputContainer: {
            flex: 1,
            backgroundColor: "transparent",
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
            shadowColor: "#000",
            shadowOpacity: 0.1,
            shadowOffset: { x: 0, y: 0 },
            shadowRadius: 15,
            borderWidth: 1,
            borderColor: "#DDD",
            fontSize: 14,
          },
          listView: {
            borderWidth: 1,
            borderColor: "#DDD",
            backgroundColor: "#FFF",
            marginHorizontal: 20,
            elevation: 5,
            shadowColor: "#000",
            shadowOpacity: 0.1,
            shadowOffset: { x: 0, y: 0 },
            shadowRadius: 15,
            marginTop: 70,
          },
          description: {
            fontSize: 14,
          },
          row: {
            padding: 20,
            height: 58,
          },
        }}
      />
    );
  }
}
