import React, { useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Image,
  TextInput,
  Pressable,
} from "react-native";

const initialState = {
  name: "",
  terrain: "",
};

export const CommentsScreen = () => {
  const [state, setState] = useState(initialState);
  const [image, setImage] = useState(null);
  const addImage = () => {};

  return (
    <View style={styles.container}>
      <TouchableOpacity style={styles.containerPosts}>
        <Image
          source={require("../../assets/arrow_left.png")}
          style={styles.iconLeft}
        />
        <Text style={styles.postsText}>Комментарии</Text>
      </TouchableOpacity>
      <View style={styles.postsLine} />

      <View style={styles.containerCreateScreen}>
        <TouchableOpacity style={styles.containerScreen} onPress={addImage}>
          {image ? (
            <Image
              source={{ uri: image }}
              style={{ width: 343, height: 240 }}
            />
          ) : (
            <Image
              source={require("../../assets/default_image.png")}
              style={styles.imageScreen}
            />
          )}
          {/* <Image
            source={require("../../assets/icon_screen.png")}
            style={styles.imageScreen}
          /> */}
          {/* <Text style={styles.textScreen}>Загрузите фото</Text> */}
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#FFFFFF",
  },
  containerPosts: {
    paddingTop: 11,
    paddingBottom: 11,
    flexDirection: "row",
    alignItems: "center",
  },
  postsText: {
    marginLeft: 33,
    fontSize: 17,
    color: "#212121",
    fontFamily: "Roboto-Medium",
    alignItems: "center",
  },
  postsLine: {
    borderBottomColor: "#E5E5E5",
    borderBottomWidth: 1,
  },
  iconLeft: {
    marginLeft: 16,
    marginRight: 58,
  },
  containerCreateScreen: {
    paddingHorizontal: 16,
    alignItems: "center",
  },
  containerScreen: {
    height: 240,
    width: 343,
    backgroundColor: "#F6F6F6",
    borderRadius: 8,
    borderWidth: 1,
    borderColor: "#E8E8E8",
    marginTop: 32,
  },
  //   imageScreen: {
  //     marginTop: 90,
  //     marginBottom: 90,
  //     marginLeft: 141,
  //     marginRight: 141,
  //   },
  textScreen: {
    color: "#BDBDBD",
    marginTop: 8,
    fontSize: 16,
    fontFamily: "Roboto-Medium",
  },
  form: {
    marginTop: 32,
    position: "relative",

    flex: 1,
  },
  input: {
    height: 50,
    marginBottom: 16,
    borderBottomColor: "#E8E8E8",
    borderBottomWidth: 1,

    color: "#BDBDBD",
    fontSize: 16,
    fontFamily: "Roboto-Regular",
  },
  inputMap: {
    height: 50,

    color: "#BDBDBD",
    fontSize: 16,
    fontFamily: "Roboto-Regular",
    marginLeft: 25,
  },
  map: {
    borderBottomColor: "#E8E8E8",
    borderBottomWidth: 1,
    marginBottom: 16,
  },
  iconMap: {
    position: "absolute",
    top: 112,
    right: 170,
    transform: [{ translateY: -150 }, { translateX: -170 }],
    padding: 4,
  },
  button: {
    backgroundColor: "#F6F6F6",
    marginTop: 32,
    height: 51,
    alignItems: "center",
    justifyContent: "center",
    borderRadius: 100,
    borderWidth: 1,
    borderColor: "#F6F6F6",
    marginBottom: 32,
  },
  btnTitle: {
    color: "#BDBDBD",
    fontSize: 16,
    fontFamily: "Roboto-Regular",
  },
  buttonHover: {
    backgroundColor: "#FF6C00",
    marginTop: 32,
    height: 51,
    alignItems: "center",
    justifyContent: "center",
    borderRadius: 100,
    borderWidth: 1,
    borderColor: "#FF6C00",
    marginBottom: 32,
  },
  btnTitleHover: {
    color: "#FFFFFF",
    fontSize: 16,
    fontFamily: "Roboto-Regular",
  },
  trash: {
    flexDirection: "row",
    justifyContent: "center",
  },
});
