import React, { useState, useCallback } from "react";
import { View, Image, Text, TouchableOpacity, FlatList } from "react-native";
import styles from "./styles";
import logo from "../../../assets/icon.png";
import { FontAwesome } from "@expo/vector-icons";
import { useNavigation, useFocusEffect } from "@react-navigation/native";

import firebase from "firebase";
import "firebase/firestore";

export default function PassengersDetails() {
  const navigation = useNavigation();
  const firestore = firebase.firestore();
  const user = firebase.auth().currentUser.uid;

  function navigateBack() {
    navigation.goBack();
  }

  const [passengers, setPassengers] = useState([]);
  const [confirmPassengers, setConfirmPassengers] = useState([]);
  const [uid, setUid] = useState("");

  useFocusEffect(
    useCallback(() => {
      getPassengers();
      return () => {};
    }, [passengers])
  );

  function getPassengers() {
    firestore
      .collection("passageiro")
      .where("motorista", "==", user)
      .where("confirmed", "==", true)
      .get()
      .then((querySnapshot) => {
        var listP = [];
        querySnapshot.forEach((doc) => {
          listP.push({
            id: doc.id,
            nome: doc.data().nome,
            turno: doc.data().turno,
            tel: doc.data().telefone,
          });
        });
        setPassengers(listP);
      });

    firestore
      .collection("passageiro")
      .where("motorista", "==", user)
      .where("confirmed", "==", false)
      .get()
      .then((querySnapshot) => {
        var listCP = [];
        querySnapshot.forEach((doc) => {
          listCP.push({
            id: doc.id,
            nome: doc.data().nome,
          });
        });
        setConfirmPassengers(listCP);
      });
  }

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity onPress={navigateBack}>
          <FontAwesome name="arrow-left" size={30} color="black" />
        </TouchableOpacity>
        <Image source={logo} style={styles.logo} />
      </View>

      <View style={styles.main}>
        <Text style={{ padding: 10, fontSize: 18, fontWeight: "bold" }}>
          Passageiros
        </Text>
        <FlatList
          style={{ height: "48%" }}
          data={passengers}
          renderItem={({ item }) => {
            return (
              <View
                style={{
                  flex: 1,
                  alignSelf: "center",
                  justifyContent: "center",
                  padding: 3,
                }}
              >
                <TouchableOpacity
                  style={{
                    height: 100,
                    width: 300,
                    backgroundColor: "white",
                    borderRadius: 10,
                    justifyContent: "center",
                    alignItems: "center",
                  }}
                  onPressIn={() => {
                    setUid(item.id);
                  }}
                  onPress={() => {
                    navigation.navigate("ServiceDetails", {
                      uid: uid,
                    });
                  }}
                >
                  <Text
                    style={{
                      fontSize: 24,
                      fontWeight: "bold",
                    }}
                  >
                    {item.nome}
                  </Text>
                  <Text>{item.turno}</Text>
                  <Text>Telefone: {item.tel}</Text>
                </TouchableOpacity>
              </View>
            );
          }}
        />

        <Text style={{ padding: 10, fontSize: 18, fontWeight: "bold" }}>
          Sem Confirmação
        </Text>

        <FlatList
          data={confirmPassengers}
          renderItem={({ item }) => {
            return (
              <View
                style={{
                  flex: 1,
                  alignSelf: "center",
                  justifyContent: "center",
                  padding: 3,
                }}
              >
                <TouchableOpacity
                  style={{
                    height: 50,
                    width: 300,
                    backgroundColor: "white",
                    borderRadius: 10,
                    justifyContent: "center",
                    alignItems: "center",
                  }}
                  onPressIn={() => {
                    setUid(item.id);
                  }}
                  onPress={() => {
                    navigation.navigate("ServiceDetails", {
                      uid: uid,
                    });
                  }}
                >
                  <Text
                    style={{
                      fontSize: 18,
                    }}
                  >
                    {item.nome}
                  </Text>
                </TouchableOpacity>
              </View>
            );
          }}
        />
      </View>
    </View>
  );
}
