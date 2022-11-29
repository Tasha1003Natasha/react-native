import React, { useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Image,
  ScrollView,
} from "react-native";

export const Posts = () => {
  const [number, setNumber] = useState(0);
  const handleClick = () => setNumber(number + 1);

  return (
    <ScrollView style={styles.containerCreateScreen}>
      <TouchableOpacity style={styles.containerScreen}>
        <Image
          source={require("../assets/default_image.png")}
          style={styles.imageScreen}
        />
      </TouchableOpacity>

      <Text style={styles.textScreen}>Name</Text>

      <View style={styles.containerPostScreen}>
        <TouchableOpacity style={styles.containerComment} onPress={handleClick}>
          <Image source={require("../assets/message.png")} />
          <Text style={styles.comment}>{number}</Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.containerMap}>
          <Image source={require("../assets/map.png")} style={styles.iconMap} />
          <Text style={styles.terrainScreen}>Terrain...</Text>
        </TouchableOpacity>
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  // Image
  containerCreateScreen: {
    marginTop: 32,
  },
  containerScreen: {
    height: 240,
    width: 343,
    backgroundColor: "#F6F6F6",
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
