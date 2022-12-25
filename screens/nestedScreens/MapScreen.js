import React, { useState } from "react";
import { View, StyleSheet, Dimensions } from "react-native";
import MapView, { Marker } from "react-native-maps";

export const MapScreen = ({ route }) => {
  const { longitude, latitude } = route.params?.location;
  const [mapRegion, setMapRegion] = useState(null);

  const handleMapRegionChange = (mapRegion) => {
    setMapRegion({ mapRegion });
  };

  return (
    <View style={styles.container}>
      <MapView
        style={styles.map}
        initialRegion={{
          latitude,
          longitude,
          latitudeDelta: 0.001,
          longitudeDelta: 0.006,
        }}
        region={mapRegion}
        onRegionChange={handleMapRegionChange}
      >
        <Marker coordinate={{ latitude, longitude }} title="" />
      </MapView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
  map: {
    width: Dimensions.get("window").width,
    height: Dimensions.get("window").height,
  },
});
