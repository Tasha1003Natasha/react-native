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
import { db } from "../../firebase/config";
import { collection, addDoc, doc, query, onSnapshot } from "firebase/firestore";

export const CommentsScreen = ({ route }) => {
  const { postId, uploadPhoto } = route.params;
  ////////////////////Фото/////////////////////////
  const [comment, setComment] = useState("");
  const [allComments, setAllComments] = useState([]);
  const number = allComments.length;
  const navigation = useNavigation();
  const { username, avatarURL } = useSelector((state) => state.auth);

  useEffect(() => {
    getAllPosts();
  }, []);

  ////////date////////////////////////
  const showTime = async () => {
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

  const sendComment = () => {
    createPost(), setComment("");
  };

  const createPost = async () => {
    const data = await showTime();
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
      let allComments = [];
      snapshot.docs.forEach((doc) => {
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
            onPress={() =>
              navigation.navigate("DefaultScreen", {
                allComments: number,
              })
            }
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
                    {/* <UserAvatar style={styles.avatar} name={item.username} /> */}
                    <View style={styles.avatarContainer}>
                      <Image
                        source={{ uri: avatarURL }}
                        style={styles.avatar}
                      />
                    </View>
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
              <TextInput
                style={styles.input}
                placeholder={"Комментировать..."}
                value={comment}
                onChangeText={setComment}
                autoCapitalize={"none"}
                placeholderTextColor={comment ? "#212121" : "#BDBDBD"}
              />

              <TouchableOpacity style={styles.send} onPress={sendComment}>
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
    marginTop: 32,
    marginHorizontal: 16,
    ///////////////////////
    width: "100%",
  },
  avatarContainer: {
    alignItems: "flex-end",
    backgroundColor: "#F6F6F6",
    borderRadius: 32 / 2,
    borderWidth: 1,
    borderColor: "#F6F6F6",
    width: 32,
    height: 32,
  },
  avatar: {
    borderWidth: 1,
    borderColor: "#F6F6F6",
    borderRadius: 32 / 2,
    width: 32,
    height: 32,
  },
  comment: {
    marginBottom: 24,
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
    borderColor: "#E8E8E8",
    borderWidth: 1,
    backgroundColor: "#F6F6F6",
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
