import React, { useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Image,
  TextInput,
  ScrollView,
  Keyboard,
  TouchableWithoutFeedback,
  KeyboardAvoidingView,
} from "react-native";
import UserAvatar from "react-native-user-avatar";
import { useNavigation } from "@react-navigation/native";
import { useSelector } from "react-redux";
import { storage, db } from "../../firebase/config";
import { collection, addDoc, doc } from "firebase/firestore";

export const CommentsScreen = ({ route }) => {
  // console.log("route.params", route.params);
  const { postId } = route.params;
  // console.log("postId", postId);

  ////////////////////Фото/////////////////////////
  const { uploadPhoto } = route.params;
  const [comment, setComment] = useState("");
  const navigation = useNavigation();
  //   const userName = useSelector(state => state.user?.user?.email);
  //   const avatarName = userName?.slice(0, 1).toLocaleUpperCase();

  const { username } = useSelector((state) => state.auth);

  const createPost = async () => {
    const comRef = doc(db, "posts", `${postId}`);
    const colRef = collection(comRef, "comments");
    addDoc(colRef, {
      username,
      comment,
    });
  };

  return (
    <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
      <View style={styles.container}>
        <View style={styles.containerPosts}>
          <TouchableOpacity
            onPress={() => navigation.navigate("DefaultScreen")}
          >
            <Image
              source={require("../../assets/arrow_left.png")}
              style={styles.iconLeft}
            />
          </TouchableOpacity>
          <Text style={styles.postsText}>Комментарии</Text>
        </View>

        <View style={styles.postsLine} />

        <View style={styles.containerCreateScreen}>
          <TouchableOpacity style={styles.containerScreen}>
            {/* {image ? (
              <Image
                source={{ uri: uploadPhoto }}
                style={{ width: 343, height: 240 }}
              />
            ) : (
              <Image source={require("../../assets/default_image.png")} />
            )} */}

            <Image
              source={{ uri: uploadPhoto }}
              style={{ width: 343, height: 240 }}
            />
          </TouchableOpacity>
        </View>

        <ScrollView>
          <KeyboardAvoidingView
            behavior={Platform.OS == "ios" ? "padding" : "height"}
          >
            {comment && (
              <View style={styles.containerComment}>
                <UserAvatar style={styles.avatar} name="avatar" />
                {/* <Text style={styles.avatarName}>{avatarName || "U"}</Text> */}
                <View style={styles.comment}>
                  <Text style={styles.commentText}>{comment}</Text>
                  <Text style={styles.commentData}>09 июня, 2020 | 08:40</Text>
                </View>
              </View>
            )}
            <View style={styles.form}>
              <TextInput
                style={styles.input}
                placeholder={"Комментировать..."}
                value={comment}
                // onChangeText={(value) =>
                //   setState((prevState) => ({ ...prevState, comment: value }))
                // }
                // onChangeText={(value) =>
                //   setComment((prevState) => ({ ...prevState, comment: value }))
                // }
                onChangeText={setComment}
                autoCapitalize={"none"}
                placeholderTextColor={comment ? "#212121" : "#BDBDBD"}

                // onFocus={() => setIsShowKeyboard(true)}
              />

              <TouchableOpacity style={styles.send} onPress={createPost}>
                <Image source={require("../../assets/send.png")} />
              </TouchableOpacity>
            </View>
          </KeyboardAvoidingView>
        </ScrollView>
      </View>
    </TouchableWithoutFeedback>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#FFFFFF",
    paddingTop: 44,
  },
  containerPosts: {
    paddingTop: 11,
    paddingBottom: 11,
    flexDirection: "row",
    alignItems: "center",
    /////////////////////////////////
    marginHorizontal: 16,
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
    // paddingHorizontal: 16,
    alignItems: "center",
    marginHorizontal: 16,
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
  textScreen: {
    color: "#BDBDBD",
    marginTop: 8,
    fontSize: 16,
    fontFamily: "Roboto-Medium",
  },

  //Comment
  containerHidden: {
    overflow: "hidden",
  },
  containerComment: {
    flexDirection: "row",
    // justifyContent: "center",
    marginTop: 32,
    marginBottom: 16,
    // marginBottom: 24,
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
    width: 299,
    // height: 32,
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

  ////////////////////Форма///////////

  form: {
    marginHorizontal: 16,
    justifyContent: "flex-start",
    marginBottom: 16,
    marginTop: 30,
  },
  input: {
    height: 50,
    // marginBottom: 16,
    borderColor: "#E8E8E8",
    borderWidth: 1,
    backgroundColor: "#F6F6F6",
    // color: "#BDBDBD",
    fontSize: 16,
    fontFamily: "Roboto-Regular",
    borderRadius: 100,
    padding: 15,
    //////////////////////////////////////
    alignItems: "flex-start",
  },
  send: {
    position: "absolute",
    bottom: 1,
    left: 155,
    transform: [{ translateY: -1 }, { translateX: 155 }],
    padding: 8,
  },
});
