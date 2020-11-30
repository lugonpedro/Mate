import { StyleSheet } from "react-native";
import Constants from "expo-constants";

export default StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#4A99C7",
    paddingTop: Constants.statusBarHeight,
  },
  header: {
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "white",
    paddingHorizontal: 20,
    height: 60,
    paddingTop: 2,
    elevation: 10,
  },
  headerText: {
    fontSize: 30,
    fontWeight: "bold",
  },
  logo: {
    left: 10,
    width: 70,
    height: 120,
  },
  botaoDrivers: {
    position: "absolute",
    bottom: 75,
    alignSelf: "center",
    width: "90%",
    height: 42,
    backgroundColor: "#5DC1FB",
    borderRadius: 4,
    alignItems: "center",
    justifyContent: "center",
  },
  botaoDriver: {
    position: "absolute",
    bottom: 75,
    alignSelf: "center",
    width: "90%",
    height: 42,
    backgroundColor: "#4A99C7",
    borderRadius: 4,
    alignItems: "center",
    justifyContent: "center",
  },
  botaoAwaiting: {
    position: "absolute",
    bottom: 75,
    alignSelf: "center",
    width: "90%",
    height: 42,
    backgroundColor: "yellow",
    borderRadius: 4,
    alignItems: "center",
    justifyContent: "center",
  },
  botaoText: {
    fontSize: 16,
    fontWeight: "bold",
    color: "black",
  },
});
