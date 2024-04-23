import React, { useState } from "react";
import { TextInput, Button } from "react-native";
import LocationPicker from "../components/LocationPicker";

export default function HomeScreen() {
  const [modalVisible, setModalVisible] = useState(false);
  const [selectedLocation, setSelectedLocation] = useState(null);
  const [placeName, setPlaceName] = useState("");
  const [inputValue, setInputValue] = useState("");

  return (
    <>
      <TextInput
        style={{
          borderWidth: 1,
          padding: 10,
          width: "80%",
          marginBottom: 20,
          borderRadius: 8,
        }}
        placeholder="Enter location manually"
        value={inputValue}
        onChangeText={(text) => setInputValue(text)}
      />
      <Button title="Location Picker" onPress={() => setModalVisible(true)} />
      <LocationPicker
        modalVisible={modalVisible}
        setModalVisible={setModalVisible}
        selectedLocation={selectedLocation}
        setSelectedLocation={setSelectedLocation}
        placeName={placeName}
        setPlaceName={setPlaceName}
        inputValue={inputValue}
        setInputValue={setInputValue}
      />
    </>
  );
}
