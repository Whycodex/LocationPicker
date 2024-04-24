import React from "react";
import { View, StyleSheet } from "react-native";

import HomeScreen from "./screens/HomeScreen";
import Loader from "./components/Loader";

export default function App() {
  return (
    <View style={styles.container}>
      <Loader />
      <HomeScreen />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
});
