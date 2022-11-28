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

export const CreateScreen = () => {
  const [state, setState] = useState(initialState);

  return (
    <View style={styles.container}>
      <TouchableOpacity style={styles.containerPosts}>
        <Image
          source={require("../../assets/arrow_left.png")}
          style={styles.iconLeft}
        />
        <Text style={styles.postsText}>Создать публикацию</Text>
      </TouchableOpacity>
      <View style={styles.postsLine} />

      <View style={styles.containerCreateScreen}>
        <TouchableOpacity style={styles.containerScreen}>
          <Image
            source={require("../../assets/icon_screen.png")}
            style={styles.imageScreen}
          />
          <Text style={styles.textScreen}>Загрузите фото</Text>
        </TouchableOpacity>

        <View style={styles.form}>
          <TextInput
            style={styles.input}
            placeholder={"Название..."}
            value={state.name}
            onChangeText={(value) =>
              setState((prevState) => ({ ...prevState, name: value }))
            }
            autoCapitalize={"none"}
            // onFocus={() => setIsShowKeyboard(true)}
          />

          <TextInput
            style={styles.inputMap}
            placeholder={"Местность..."}
            value={state.terrain}
            onChangeText={(value) =>
              setState((prevState) => ({ ...prevState, terrain: value }))
            }
            autoCapitalize={"none"}
            // onFocus={() => setIsShowKeyboard(true)}
          />
          <Pressable style={styles.map}>
            <Image
              source={require("../../assets/map.png")}
              style={styles.iconMap}
            />
          </Pressable>

          <TouchableOpacity activeOpacity={0.8} style={styles.button}>
            <Text style={styles.btnTitle}>Опубликовать</Text>
          </TouchableOpacity>

          <TouchableOpacity style={styles.trash}>
            <Image source={require("../../assets/trash.png")} />
          </TouchableOpacity>
        </View>
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
    fontSize: 17,
    color: "#212121",
    fontFamily: "Roboto-Medium",
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
  },
  containerScreen: {
    height: 240,
    backgroundColor: "#F6F6F6",
    borderRadius: 8,
    borderWidth: 1,
    borderColor: "#E8E8E8",
    marginTop: 32,
  },
  imageScreen: {
    marginTop: 90,
    marginBottom: 90,
    marginLeft: 141,
    marginRight: 141,
  },
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
    // backgroundColor: "#FF6C00",///hover
    backgroundColor: "#F6F6F6",
    marginTop: 32,
    height: 51,
    alignItems: "center",
    justifyContent: "center",
    borderRadius: 100,
    borderWidth: 1,
    // borderColor: "#FF6C00",///hover
    borderColor: "#F6F6F6",
    marginBottom: 32,
  },
  btnTitle: {
    // color: "#FFFFFF",///hover
    color: "#BDBDBD",
    fontSize: 16,
    fontFamily: "Roboto-Regular",
  },
  trash: {
    flexDirection: "row",
    justifyContent: "center",
  },
});
