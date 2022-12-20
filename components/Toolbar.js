// import React, { useState } from "react";
import { View, StyleSheet, TouchableOpacity, Image } from "react-native";
import { useNavigation } from "@react-navigation/native";

export const Toolbar = () => {
  const navigation = useNavigation();
  // const [photo, setPhoto] = useState(null);

  return (
    <View tyle={styles.containerToolbar}>
      <View style={styles.postsLine} />
      <View style={styles.toolbarItems}>
        <TouchableOpacity onPress={() => navigation.navigate("Posts")}>
          <Image source={require("../assets/grid.png")} />
        </TouchableOpacity>
        {/* ///////закінчила тут //////////////// */}
        <TouchableOpacity
          // onPress={() => {
          //   setPhoto(null), navigation.navigate("Create");
          // }}
          onPress={() => {
            navigation.navigate("Create");
          }}
        >
          <Image source={require("../assets/new.png")} style={styles.toolbar} />
        </TouchableOpacity>

        <TouchableOpacity onPress={() => navigation.navigate("Profile")}>
          <Image source={require("../assets/user.png")} />
        </TouchableOpacity>
      </View>
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
