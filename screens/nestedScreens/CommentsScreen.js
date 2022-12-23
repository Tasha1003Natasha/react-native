import React, { useState, useEffect } from "react";
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
  FlatList,
} from "react-native";
import UserAvatar from "react-native-user-avatar";
import { useNavigation } from "@react-navigation/native";
import { useSelector } from "react-redux";
import { storage, db } from "../../firebase/config";
import { collection, addDoc, doc, query, onSnapshot } from "firebase/firestore";

export const CommentsScreen = ({ route }) => {
  // console.log("route.params", route.params);
  const { postId } = route.params;
  // console.log("postId", postId);

  ////////////////////Фото/////////////////////////
  const { uploadPhoto } = route.params;
  const [comment, setComment] = useState("");
  const [allComments, setAllComments] = useState([]);
  const navigation = useNavigation();
  //////////////Keyboard/////////////////
  const [isShowKeyboard, setIsShowKeyboard] = useState(false);
  //   const userName = useSelector(state => state.user?.user?.email);
  //   const avatarName = userName?.slice(0, 1).toLocaleUpperCase();

  const { username } = useSelector((state) => state.auth);

  useEffect(() => {
    getAllPosts();
  }, []);

  ////////date////////////////////////
  const showTime = async () => {
    // function showTime() {
    function addZero(i) {
      if (i < 10) {
        i = "0" + i;
      }
      return i;
    }

    const dateTime = new Date();
    const year = dateTime.getFullYear();
    const day = addZero(dateTime.getDate());
    const hours = addZero(dateTime.getHours());
    const minutes = addZero(dateTime.getMinutes());
    let allMonth;
    const month = dateTime.getMonth();
    // console.log("month", month);
    // console.log("allMonth", allMonth);

    switch (month) {
      case 0:
        allMonth = "января";
        break;
      case 1:
        allMonth = "февраля";
        break;
      case 2:
        allMonth = "марта";
        break;
      case 3:
        allMonth = "апреля";
        break;
      case 4:
        allMonth = "мае";
        break;
      case 5:
        allMonth = "июня";
        break;
      case 6:
        allMonth = "июля";
        break;
      case 7:
        allMonth = "августа";
        break;
      case 8:
        allMonth = "сентября";
        break;
      case 9:
        allMonth = "октября";
        break;
      case 10:
        allMonth = "ноября";
        break;
      case 11:
        allMonth = "декабря";
        break;
    }
    // console.log("allMonth", allMonth);

    const allData =
      day +
      " " +
      allMonth +
      " " +
      year +
      " " +
      "|" +
      " " +
      hours +
      ":" +
      minutes;

    const data = allData.toString();
    return data;
  };

  const createPost = async () => {
    const data = await showTime();
    // console.log("data", data);
    const comRef = doc(db, "posts", `${postId}`);
    const colRef = collection(comRef, "comments");

    addDoc(colRef, {
      username,
      comment,
      data,
    });
  };

  const getAllPosts = async () => {
    const comRef = doc(db, "posts", `${postId}`);
    const colRef = collection(comRef, "comments");
    const q = query(colRef);
    const querySnapshot = onSnapshot(q, (snapshot) => {
      // console.log("snapshot", snapshot);
      let allComments = [];
      // console.log("allComments", allComments);
      snapshot.docs.forEach((doc) => {
        console.log("doc.data", doc.data());
        allComments.push({ ...doc.data(), id: doc.id });
      });
      setAllComments(allComments);
    });
    return () => querySnapshot();
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

        <ScrollView nestedScrollEnabled={true} style={{ width: "100%" }}>
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

          <KeyboardAvoidingView
            behavior={Platform.OS == "ios" ? "padding" : "height"}
          >
            <ScrollView style={styles.containerComment} horizontal={true}>
              <FlatList
                data={allComments}
                renderItem={({ item }) => (
                  <View style={styles.comment}>
                    <UserAvatar style={styles.avatar} name={item.username} />
                    <View style={styles.containerItem}>
                      <Text style={styles.commentText}>{item.comment}</Text>
                      <Text style={styles.commentData}>{item.data}</Text>
                    </View>
                  </View>
                )}
                keyExtractor={(item) => item.id}
              />
            </ScrollView>

            <View style={styles.form}>
              {/* <View
              style={{
                ...styles.form,
                marginBottom: isShowKeyboard ? 10 : 40,
                marginTop: isShowKeyboard ? 20 : 10,
              }}
            > */}
              <TextInput
                style={styles.input}
                placeholder={"Комментировать..."}
                value={comment}
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
    // marginBottom: 16,
    // marginBottom: 24,
    marginHorizontal: 16,
    ///////////////////////
    width: "100%",
  },
  avatar: {
    alignItems: "flex-end",
    borderRadius: 100 / 2,
    backgroundColor: "#F6F6F6",
    width: 32,
    height: 32,
  },
  comment: {
    // alignItems: "flex-start",
    marginBottom: 24,
    // backgroundColor: "rgba(0, 0, 0, 0.03)",
    // padding: 16,
    // marginLeft: 16,
    // width: 299,
    // height: 32,
    // marginBottom: 24,
    flexDirection: "row",
  },
  containerItem: {
    alignItems: "flex-start",
    backgroundColor: "rgba(0, 0, 0, 0.03)",
    padding: 16,
    marginLeft: 16,
    width: 299,
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
    marginTop: 24,
  },
  input: {
    height: 50,
    // marginBottom: 10,
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
