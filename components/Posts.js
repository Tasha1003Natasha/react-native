import React, { useState } from "react";
import { View, Text, StyleSheet, TouchableOpacity, Image } from "react-native";
import { useNavigation } from "@react-navigation/native";

export const Posts = ({ item }) => {
  const navigation = useNavigation();
  const [number, setNumber] = useState(0);
  const handleClick = () => setNumber(number + 1);

  return (
    <View style={styles.containerCreateScreen} key={item}>
      {/* <Image
          source={require("../assets/default_image.png")}
          style={styles.imageScreen}
        /> */}
      <Image source={{ uri: item.uploadPhoto }} style={styles.imageScreen} />

      <Text style={styles.textScreen}>
        {item.state.name ? item.state.name : "Name"}
      </Text>

      <View style={styles.containerPostScreen}>
        <TouchableOpacity
          style={styles.containerComment}
          onPress={() =>
            navigation.navigate("Comments", {
              postId: item.id,
              uploadPhoto: item.uploadPhoto,
            })
          }
        >
          {number ? (
            <Image source={require("../assets/message_circle.png")} />
          ) : (
            <Image source={require("../assets/message.png")} />
          )}

          <Text style={styles.comment}>{number}</Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={styles.containerMap}
          onPress={() => {
            navigation.navigate("Map", { location: item.location.coords });
            // const locationAll = item.location.coords;
            // console.log("locationAll", locationAll);
          }}
        >
          <Image source={require("../assets/map.png")} style={styles.iconMap} />
          <Text style={styles.terrainScreen}>
            {item.state.terrain ? item.state.terrain : "Terrain.."}
          </Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  // Image
  containerCreateScreen: {
    marginTop: 22,
  },
  imageScreen: {
    height: 240,
    width: 343,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: "#E8E8E8",
  },
  containerPostScreen: {
    flexDirection: "row",
    marginTop: 10,
  },

  textScreen: {
    color: "#212121",
    marginTop: 8,
    fontSize: 16,
    fontFamily: "Roboto-Medium",
  },
  // comment
  containerComment: {
    flex: 1,
    flexDirection: "row",
  },
  comment: {
    marginLeft: 6,
    color: "#BDBDBD",
    fontSize: 16,
    fontFamily: "Roboto-Regular",
  },
  // map
  containerMap: {
    flexDirection: "row",
    textAlign: "left",
    marginRight: 16,
  },
  terrainScreen: {
    color: "#212121",
    fontSize: 16,
    fontFamily: "Roboto-Regular",
    textDecorationLine: "underline",
  },
  iconMap: {
    marginRight: 3,
  },
});
