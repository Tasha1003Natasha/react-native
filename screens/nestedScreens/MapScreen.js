import React, { useState } from "react";
import { View, StyleSheet, Dimensions } from "react-native";
import MapView, { Marker } from "react-native-maps";

export const MapScreen = ({ route }) => {
  // const [mapInitialized, setMapInitialized] = useState(false);
  const [mapRegion, setMapRegion] = useState(null);

 

  // const onMapReady = async () => {
  //   if (mapInitialized) {
  //     return;
  //   }
  //   setMapInitialized(true);
  // };



  const handleMapRegionChange = (mapRegion) => {
    console.log(mapRegion);
    setMapRegion({ mapRegion });
  };

  return (
    // <View style={styles.container} onPress={onMapReady}>
    // <View style={styles.container} onPress={onMapReady}>
    <View style={styles.container}>
      <MapView
        style={styles.map}
        initialRegion={{
          latitude: 50.3881415,
          longitude: 30.6291775,
          latitudeDelta: 0.001,
          longitudeDelta: 0.006,
        }}
        region={mapRegion}
        onRegionChange={handleMapRegionChange}
      >
        <Marker
          coordinate={{ latitude: 50.3881415, longitude: 30.6291775 }}
          title=""
        />
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
    // position: "absolute",
    width: Dimensions.get("window").width,
    height: Dimensions.get("window").height,
    // flex: 1,
  },
});
