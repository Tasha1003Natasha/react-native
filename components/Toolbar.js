import React from "react";
import { View, StyleSheet, TouchableOpacity, Image } from "react-native";

export const Toolbar = () => {
  return (
    <View tyle={styles.containerToolbar}>
      <View style={styles.postsLine} />
      <TouchableOpacity style={styles.toolbarItems}>
        <Image source={require("../assets/grid.png")} />
        <Image source={require("../assets/new.png")} style={styles.toolbar} />
        <Image source={require("../assets/user.png")} />
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  containerToolbar: {
    flex: 1,
    position: "absolute",
  },
  toolbarItems: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    flexWrap: "wrap",
    marginTop: 9,
    marginBottom: 22,
  },
  toolbar: {
    marginLeft: 31,
    marginRight: 31,
  },
  postsLine: {
    borderBottomColor: "#E5E5E5",
    borderBottomWidth: 1,
  },
});
