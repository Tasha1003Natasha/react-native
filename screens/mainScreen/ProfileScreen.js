import React, { useState, useEffect } from "react";
import {
  StyleSheet,
  View,
  ImageBackground,
  TouchableOpacity,
  Image,
  Dimensions,
  Text,
  ScrollView,
} from "react-native";
import { Toolbar } from "../../components/Toolbar";

export const ProfileScreen = () => {
  const [image, setImage] = useState(null);
  const addImage = () => {};

  //   const userName = useSelector(state => state.user?.user?.email);
  //

  const [dimensions, setDimensions] = useState(
    Dimensions.get("window").width - 8 * 2
  );

  const onchange = () => {
    const width = Dimensions.get("window").width - 8 * 2;
    setDimensions(width);
  };

  useEffect(() => {
    const subscription = Dimensions.addEventListener("change", onchange);
    return () => subscription.remove();
  }, []);

  return (
    <View style={styles.container}>
      <ImageBackground
        source={require("../../assets/image.png")}
        style={styles.image}
      >
        <View style={styles.form}>
          <View
            style={{
              width: dimensions,
            }}
          >
            {/* <Text style={styles.userName}>{userName || "U"}</Text> */}
            <Text style={styles.userName}>userName</Text>
            {/* /* Аватарка */}
            <View style={styles.avatarSection}>
              <TouchableOpacity onPress={addImage}>
                <Image
                  source={{ uri: image }}
                  style={{ width: 132, height: 120 }}
                />

                <Image
                  source={require("../../assets/close.png")}
                  style={styles.avatarClose}
                />
              </TouchableOpacity>
            </View>

            {/* Posts */}
            <ScrollView>
              <View style={styles.containerCreateScreen}>
                <Image source={require("../../assets/default_image.png")} />
              </View>
              <Text style={styles.textScreen}>Name</Text>

              <View style={styles.containerPostScreen}>
                <TouchableOpacity style={styles.containerComment}>
                  <Image source={require("../../assets/message_circle.png")} />
                  <Text style={styles.comment}>Number</Text>

                  <Image source={require("../../assets/thumbs_up.png")} />
                  <Text style={styles.likeText}>Number</Text>
                </TouchableOpacity>

                <TouchableOpacity style={styles.containerMap}>
                  <Image
                    source={require("../../assets/map.png")}
                    style={styles.iconMap}
                  />
                  <Text style={styles.terrainScreen}>Terrain...</Text>
                </TouchableOpacity>
              </View>
            </ScrollView>
            <Toolbar />
          </View>
        </View>
      </ImageBackground>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    justifyContent: "center",
  },
  image: {
    flex: 1,
    resizeMode: "cover",
    justifyContent: "flex-end",
  },
  form: {
    backgroundColor: "#FFFFFF",
    borderTopLeftRadius: 25,
    borderTopRightRadius: 25,
    alignItems: "center",
    position: "relative",
  },
  avatarSection: {
    position: "absolute",
    backgroundColor: "#F6F6F6",
    borderRadius: 16,
    width: 120,
    height: 120,
    top: 92,
    right: 70,
    transform: [{ translateY: -150 }, { translateX: -70 }],
  },
  avatarClose: {
    position: "absolute",
    top: 100,
    left: 30,
    transform: [{ translateY: -30 }, { translateX: 70 }],
  },
  userName: {
    color: "#212121",
    marginTop: 92,
    fontSize: 30,
    fontFamily: "Roboto-Medium",
    textAlign: "center",
  },
  // Image
  containerCreateScreen: {
    paddingHorizontal: 16,
    marginTop: 32,
  },
  containerPostScreen: {
    flexDirection: "row",
    marginTop: 10,
    // alignItems: "center",
  },
  // Posts
  containerScreen: {
    height: 240,
    width: 343,
    backgroundColor: "#F6F6F6",
    borderRadius: 8,
    borderWidth: 1,
    borderColor: "#E8E8E8",
    marginTop: 32,
  },
  textScreen: {
    color: "#212121",
    marginTop: 8,
    fontSize: 16,
    fontFamily: "Roboto-Medium",
    marginHorizontal: 16,
  },
  // comment
  containerComment: {
    flex: 1,
    flexDirection: "row",
    paddingHorizontal: 16,
    marginBottom: 32,
  },
  comment: {
    marginLeft: 6,
    color: "#212121",
    fontSize: 16,
    fontFamily: "Roboto-Regular",
    marginRight: 24,
  },
  likeText: {
    marginLeft: 6,
    color: "#212121",
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
