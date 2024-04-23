import React, { useState, useEffect } from "react";
import { View, Button, Modal, StyleSheet, Alert, Text } from "react-native";
import MapView, { Marker, Callout } from "react-native-maps";
import * as Location from "expo-location";
import { reverseGeocodeAsync } from "expo-location";

export default function LocationPicker({
  modalVisible,
  setModalVisible,
  selectedLocation,
  setSelectedLocation,
  placeName,
  setPlaceName,
  setInputValue,
}) {
  const [initialRegion, setInitialRegion] = useState(null);

  useEffect(() => {
    (async () => {
      await getLocationAsync();
    })();
  }, []);

  const getLocationAsync = async () => {
    let { status } = await Location.requestForegroundPermissionsAsync();
    if (status !== "granted") {
      console.error("Permission to access location was denied");
      return;
    }

    let location = await Location.getCurrentPositionAsync({});
    setInitialRegion({
      latitude: location.coords.latitude,
      longitude: location.coords.longitude,
      latitudeDelta: 0.0922,
      longitudeDelta: 0.0421,
    });
    setSelectedLocation({
      latitude: location.coords.latitude,
      longitude: location.coords.longitude,
    });
    try {
      const locationData = await reverseGeocodeAsync({
        latitude: location.coords.latitude,
        longitude: location.coords.longitude,
      });
      const { name, city } = locationData[0];
      setPlaceName(`${name}, ${city}`);
    } catch (error) {
      console.error("Error getting location name:", error);
    }
  };

  const handleRegionChange = async (region) => {
    setSelectedLocation({
      latitude: region.latitude,
      longitude: region.longitude,
    });
    try {
      const locationData = await reverseGeocodeAsync({
        latitude: region.latitude,
        longitude: region.longitude,
      });
      const { name, city } = locationData[0];
      setPlaceName(`${name}, ${city}`);
    } catch (error) {
      console.error("Error getting location name:", error);
    }
  };

  const handleSubmit = () => {
    if (selectedLocation && placeName.trim() !== "") {
      setInputValue(placeName);
      setModalVisible(false);
    } else {
      Alert.alert(
        "Please select a location on the map and enter a place name."
      );
    }
  };

  return (
    <Modal
      animationType="slide"
      transparent={false}
      visible={modalVisible}
      onRequestClose={() => setModalVisible(false)}
    >
      <View style={styles.mapContainer}>
        <MapView
          style={styles.map}
          initialRegion={initialRegion}
          onRegionChange={handleRegionChange}
        >
          {selectedLocation && (
            <Marker coordinate={selectedLocation} draggable>
              <Callout>
                <Text style={styles.calloutText}>{placeName}</Text>
              </Callout>
            </Marker>
          )}
        </MapView>
        <View style={styles.buttonContainer}>
          <Button title="Submit" onPress={handleSubmit} />
        </View>
      </View>
    </Modal>
  );
}

const styles = StyleSheet.create({
  mapContainer: {
    flex: 1,
  },
  map: {
    flex: 1,
  },
  calloutText: {
    fontSize: 16,
    fontWeight: "bold",
  },
  buttonContainer: {
    position: "absolute",
    bottom: 20,
    width: "100%",
    paddingHorizontal: 20,
  },
});
