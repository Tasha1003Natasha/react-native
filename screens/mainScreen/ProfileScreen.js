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
  FlatList,
  VirtualizedList,
  SafeAreaView,
} from "react-native";
import { Toolbar } from "../../components/Toolbar";

import { useDispatch } from "react-redux";
import { authSignOutUser } from "../../redux/auth/authOperations";
//////////////////////////////////////////////////////////
import { db } from "../../firebase/config";
import { collection, query, onSnapshot, where } from "firebase/firestore";
import { useSelector } from "react-redux";
import { Posts } from "../../components/Posts";

export const ProfileScreen = ({ route }) => {
  const allComments = route.params?.allComments;
  const { userId, avatarURL, username } = useSelector((state) => state.auth);
  const [userPosts, setUserPosts] = useState([]);
  const dispach = useDispatch();

  //////////////////Аватарка!!!!!///////////////////////
  const [image, setImage] = useState(null);
  const removeImage = () => {
    setImage(null);
  };

  ////////////////////Пости///////////////////////
  const getUserPosts = async () => {
    const colRef = collection(db, "posts");
    const q = query(colRef, where("userId", "==", userId));
    const querySnapshot = onSnapshot(q, (snapshot) => {
      let userPosts = [];
      snapshot.docs.forEach((doc) => {
        userPosts.push({ ...doc.data() });
      });
      setUserPosts(userPosts);
    });
    return () => querySnapshot();
  };

  const signOut = () => {
    dispach(authSignOutUser());
  };

  const [dimensions, setDimensions] = useState(
    Dimensions.get("window").width - 8 * 2
  );

  const onchange = () => {
    const width = Dimensions.get("window").width - 8 * 2;
    setDimensions(width);
  };

  useEffect(() => {
    getUserPosts();
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
            <View style={styles.containerLogout}>
              <Text style={styles.userName}>{username}</Text>
              <TouchableOpacity onPress={signOut}>
                <Image
                  source={require("../../assets/logout.png")}
                  style={styles.iconLogout}
                />
              </TouchableOpacity>
            </View>

            {/* /* Аватарка */}
            <TouchableOpacity
              style={styles.avatarSection}
              onPress={!avatarURL && removeImage}
            >
              <TouchableOpacity onPress={!avatarURL && removeImage}>
                <Image
                  source={{ uri: avatarURL }}
                  style={{ width: 120, height: 120, borderRadius: 16 }}
                />

                <Image
                  source={require("../../assets/close.png")}
                  style={styles.avatarClose}
                />
                {/* <Image
                  source={
                    image
                      ? require("../../assets/close.png")
                      : require("../../assets/add.png")
                  }
                  style={image ? styles.avatarClose : styles.avatarAdd}
                /> */}
              </TouchableOpacity>
            </TouchableOpacity>
            {/* ///////Posts////////////// */}

            <SafeAreaView
              style={{
                ...styles.containerPostScreen,
                height: userPosts ? 350 : 0,
              }}
            >
              <FlatList
                data={userPosts}
                snapToStart={true}
                snapToInterval={1}
                keyExtractor={(item, id) => id.toString()}
                renderItem={({ item }) => (
                  <Posts item={item} allComments={allComments} />
                )}
              />
            </SafeAreaView>

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
  containerLogout: {
    alignItems: "baseline",
    marginHorizontal: 16,
    flexDirection: "row",
    justifyContent: "center",
  },
  iconLogout: {
    position: "absolute",
    marginLeft: 60,
    bottom: 40,
    left: 40,
    transform: [{ translateY: -40 }, { translateX: -40 }],
  },
  avatarSection: {
    position: "absolute",
    backgroundColor: "#F6F6F6",
    borderRadius: 16,
    width: 120,
    height: 120,
    top: 92,
    right: 65,
    transform: [{ translateY: -150 }, { translateX: -65 }],
  },
  avatarClose: {
    position: "absolute",
    top: 100,
    left: 30,
    transform: [{ translateY: -30 }, { translateX: 70 }],
  },
  avatarAdd: {
    position: "absolute",
    top: 100,
    left: 35,
    transform: [{ translateY: -30 }, { translateX: 70 }],
  },
  userName: {
    color: "#212121",
    // marginTop: 92,
    marginTop: 72,
    fontSize: 30,
    fontFamily: "Roboto-Medium",
    textAlign: "center",
  },
  // Image
  containerCreateScreen: {
    paddingHorizontal: 16,
    // marginTop: 32,
  },
  imageScreen: {
    height: 240,
    width: 343,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: "#E8E8E8",
  },
  ////////////////Post///////////////
  containerPostScreen: {
    paddingHorizontal: 16,
    flexDirection: "row",
    marginTop: 10,
    // height: 350,
  },
  // Posts
  containerScreen: {
    height: 240,
    width: 343,
    backgroundColor: "#F6F6F6",
    borderRadius: 8,
    borderWidth: 1,
    borderColor: "#E8E8E8",
  },
});
