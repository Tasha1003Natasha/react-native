import React, { useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Image,
  TextInput,
} from "react-native";
import UserAvatar from "react-native-user-avatar";

const initialState = {
  name: "",
  terrain: "",
  comment: "",
};

export const CommentsScreen = () => {
  const [state, setState] = useState(initialState);
  const [image, setImage] = useState(null);
  const addImage = () => {};

  //   const userName = useSelector(state => state.user?.user?.email);
  //   const avatarName = userName?.slice(0, 1).toLocaleUpperCase();

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
            <Image source={require("../../assets/default_image.png")} />
          )}

          <View style={styles.containerComment}>
            <UserAvatar style={styles.avatar} name="avatar" />
            {/* <Text style={styles.avatarName}>{avatarName || "U"}</Text> */}
            <View style={styles.comment}>
              <Text style={styles.commentText}>
                Really love your most recent photo. I’ve been trying to capture
                the same thing for a few months and would love some tips!
              </Text>
              <Text style={styles.commentData}>09 июня, 2020 | 08:40</Text>
            </View>
          </View>
        </TouchableOpacity>
      </View>

      <View style={styles.form}>
        <TextInput
          style={styles.input}
          placeholder={"Комментировать..."}
          value={state.name}
          onChangeText={(value) =>
            setState((prevState) => ({ ...prevState, comment: value }))
          }
          autoCapitalize={"none"}
          // onFocus={() => setIsShowKeyboard(true)}
        />

        <TouchableOpacity style={styles.send}>
          <Image source={require("../../assets/send.png")} />
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
  textScreen: {
    color: "#BDBDBD",
    marginTop: 8,
    fontSize: 16,
    fontFamily: "Roboto-Medium",
  },
  form: {
    marginTop: 32,
    flex: 1,
    marginHorizontal: 16,
    position: "relative",
    justifyContent: "flex-end",
  },
  input: {
    height: 50,
    marginBottom: 16,
    borderColor: "#E8E8E8",
    borderWidth: 1,
    backgroundColor: "#F6F6F6",
    color: "#BDBDBD",
    fontSize: 16,
    fontFamily: "Roboto-Regular",
    borderRadius: 100,
    padding: 15,
  },
  send: {
    position: "absolute",
    bottom: 8,
    right: 40,
    transform: [{ translateY: -8 }, { translateX: 40 }],
    padding: 8,
  },

  //Comment
  containerComment: {
    flexDirection: "row",
    justifyContent: "center",
    marginTop: 32,
    marginBottom: 24,
    marginHorizontal: 16,
  },
  avatar: {
    alignItems: "flex-start",
    borderRadius: 100 / 2,
    backgroundColor: "#F6F6F6",
    width: 32,
    height: 32,
  },
  comment: {
    alignItems: "flex-end",
    backgroundColor: "rgba(0, 0, 0, 0.03)",
    padding: 16,
    marginLeft: 16,
  },
  commentText: {
    color: "#212121",
    fontSize: 13,
    fontFamily: "Roboto-Regular",
  },
  commentData: {
    color: "#BDBDBD",
    fontSize: 10,
    fontFamily: "Roboto-Regular",
  },
});
