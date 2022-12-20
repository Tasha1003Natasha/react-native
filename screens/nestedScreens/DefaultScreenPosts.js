import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Image,
  ImageBackground,
  FlatList,
} from "react-native";
import { Posts } from "../../components/Posts";
import { Toolbar } from "../../components/Toolbar";

// import { auth } from "../../firebase/config";
// import { signOut } from "firebase/auth";
import { useDispatch, useSelector } from "react-redux";
import { authSignOutUser } from "../../redux/auth/authOperations";

export const DefaultScreenPosts = ({ route }) => {
  const [posts, setPosts] = useState([]);
  // console.log("route.params", route.params);
  const dispach = useDispatch();
  const userName = useSelector((state) => state.auth.username);
  const userEmail = useSelector((state) => state.auth.email);

  const signOut = () => {
    dispach(authSignOutUser());
  };

  useEffect(() => {
    if (route.params) {
      setPosts((prevState) => [...prevState, route.params]);
    }
  }, [route.params]);
  // console.log("posts", posts);

  return (
    <View style={styles.container}>
      <View style={styles.containerPosts}>
        <Text style={styles.postsText}>Публикации</Text>
        <TouchableOpacity onPress={signOut}>
          <Image
            source={require("../../assets/logout.png")}
            style={styles.iconLogout}
          />
        </TouchableOpacity>
      </View>
      <View style={styles.postsLine} />

      <View style={styles.section}>
        <View style={styles.containerImage}>
          <ImageBackground
            source={require("../../assets/defult.png")}
            style={styles.image}
          ></ImageBackground>

          <View style={styles.containerUser}>
            <Text style={styles.textUser}>{userName}</Text>
            <Text style={styles.emailUser}>{userEmail}</Text>
          </View>
        </View>
      </View>

      {/* ///////Posts////////////// */}
      <View style={styles.post}>
        <FlatList
          data={posts}
          keyExtractor={(item, indx) => indx.toString()}
          renderItem={({ item }) => <Posts item={item} />}
        />
      </View>
      {/* 
      <View style={styles.post}>
        <Posts posts={posts} />
      </View> */}

      <Toolbar />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#FFFFFF",
    position: "relative",
    paddingTop: 44,
  },
  containerPosts: {
    paddingTop: 11,
    paddingBottom: 11,
    flexDirection: "row",
    alignItems: "baseline",
    justifyContent: "flex-end",
    paddingHorizontal: 16,
  },
  postsText: {
    alignItems: "center",
    fontSize: 17,
    color: "#212121",
    fontFamily: "Roboto-Medium",
  },
  iconLogout: {
    marginLeft: 100,
    marginRight: 10,
    alignItems: "flex-end",
  },
  postsLine: {
    borderBottomColor: "#E5E5E5",
    borderBottomWidth: 1,
  },

  // ////////User/////////
  section: {
    paddingHorizontal: 16,
  },
  post: {
    flex: 1,
    paddingHorizontal: 16,
    alignItems: "center",
  },
  containerImage: {
    flexDirection: "row",
  },
  image: {
    width: 60,
    height: 60,
    borderRadius: 16,
    marginTop: 32,
    marginLeft: 16,
  },
  containerUser: {
    alignItems: "center",
    marginLeft: 8,
    marginTop: 48,

    marginBottom: 15,
  },
  textUser: {
    color: "#212121",
    fontSize: 13,
    fontFamily: "Roboto-Bold",
  },
  emailUser: {
    color: "rgba(33,33,33,0.8)",
    fontSize: 11,
    fontFamily: "Roboto-Medium",
  },
});
