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

// import { auth } from "../../firebase/config";
// import { signOut } from "firebase/auth";
import { useDispatch } from "react-redux";
import { authSignOutUser } from "../../redux/auth/authOperations";
//////////////////////////////////////////////////////////
import { db } from "../../firebase/config";
import { collection, doc, query, onSnapshot, where } from "firebase/firestore";
import { useSelector } from "react-redux";
import { Posts } from "../../components/Posts";

export const ProfileScreen = () => {
  const [number, setNumber] = useState(0);
  const handleClick = () => setNumber(number + 1);
  //////////////////Аватарка///////////////////////
  const [image, setImage] = useState(null);
  const addImage = () => {};
  ////////////////////////////////////////////////////////////
  // const { uploadPhoto } = route.params;
  // console.log("uploadPhoto", uploadPhoto);
  const { userId } = useSelector((state) => state.auth);
  // console.log("userId", userId);
  const { username } = useSelector((state) => state.auth);
  const [userPosts, setUserPosts] = useState([]);

  const dispach = useDispatch();
  ////////////////////Перевірити////////////////////////
  const getUserPosts = async () => {
    const colRef = collection(db, "posts");
    const q = query(colRef, where("userId", "==", userId));
    const querySnapshot = onSnapshot(q, (snapshot) => {
      // console.log("snapshot", snapshot);
      let userPosts = [];
      console.log("userPosts", userPosts);
      snapshot.docs.forEach((doc) => {
        console.log("user.data", doc.data());
        userPosts.push({ ...doc.data() });
      });
      setUserPosts(userPosts);
    });
    return () => querySnapshot();
  };
  ///////////////////////////////////////
  // const getItem = (userPosts, index) => ({
  //   id: Math.random().toString().substring(0),
  //   title: `Item ${index + 1}`,
  // });

  // const getItemCount = (userPosts) => 1;
  // console.log("getItemCount", getItemCount);

  ///////////////////////////////////////

  const signOut = () => {
    dispach(authSignOutUser());
  };
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
            {/* ///////Posts////////////// */}

            {/* ////////////Тут закінчила///////////////////////// */}
            {/* <ScrollView nestedScrollEnabled={true} style={{ width: "100%" }}>
              <ScrollView style={styles.containerPostScreen} horizontal={true}> */}
            {/* <SafeAreaView style={styles.containerPostScreen}> */}
            {/* <VirtualizedList
                data={userPosts}
                // initialNumToRender={1}
                // maxToRenderPerBatch={1}
                // keyExtractor={(item) => item.key}

                initialScrollIndex={1}
                getItemLayout={(data, index) => ({
                  offset: 240 * index,
                  length: 240,
                  index,
                })}
                keyExtractor={(index) => index.toString()}
                getItem={(data, index) => data[index]}
                getItemCount={(data) => data.length}
                // getItemCount={getItemCount}
                // getItem={getItem}
                renderItem={({ item }) => <Posts item={item} />}
              /> */}
            {/* </SafeAreaView> */}

            {/* //////////////////////// */}
            {/* <ScrollView nestedScrollEnabled={true} style={{ width: "100%" }}>
              <ScrollView style={styles.containerPostScreen} horizontal={true}>
                <FlatList
                  data={userPosts}
                  keyExtractor={(item, id) => id.toString()}
                  renderItem={({ item }) => <Posts item={item} />}
                />
              </ScrollView>
            </ScrollView> */}

            <SafeAreaView style={styles.containerPostScreen}>
              <FlatList
                data={userPosts}
                snapToStart={true}
                snapToInterval={1}
                keyExtractor={(item, id) => id.toString()}
                renderItem={({ item }) => <Posts item={item} />}
              />
            </SafeAreaView>
            {/* //////////////////////////////////////////// */}
            {/* <SafeAreaView style={styles.containerPostScreen}>
              <FlatList
                data={userPosts}
                keyExtractor={(item, id) => id.toString()}
                renderItem={({ item }) => <Posts item={item} />}
              />
            </SafeAreaView> */}

            {/* ///////////////////////////////////////////////////////// */}

            {/* <View>
              <FlatList
                data={userPosts}
                keyExtractor={(item, id) => id.toString()}
                renderItem={({ item }) => (
                  <View style={styles.containerPostScreen} key={item.id}>
                    <Image
                      source={{ uri: item.uploadPhoto }}
                      style={styles.imageScreen}
                    />

                    <Text style={styles.textScreen}>{item.state.name}</Text>
                  </View>
                )}
              />
            </View> */}

            {/* <View style={styles.containerCreateScreen}>
                <Image source={require("../../assets/default_image.png")} />
              </View>
              <Text style={styles.textScreen}>{username}</Text> */}

            {/* <View style={styles.containerPostScreen}>
              <TouchableOpacity style={styles.containerComment}>
                <Image source={require("../../assets/message_circle.png")} />
                <Text style={styles.comment}>Number</Text>
              </TouchableOpacity>

              <TouchableOpacity
                style={styles.containerComment}
                onPress={handleClick}
              >
                <Image source={require("../../assets/thumbs_up.png")} />
                <Text style={styles.likeText}>{number}</Text>
              </TouchableOpacity>

              <TouchableOpacity style={styles.containerMap}>
                <Image
                  source={require("../../assets/map.png")}
                  style={styles.iconMap}
                />
                <Text style={styles.terrainScreen}>Terrain...</Text>
              </TouchableOpacity>
            </View> */}
            {/* </ScrollView>  */}
            {/* //////////////////////////////////////// */}
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

  // post: {
  //   flex: 1,
  //   paddingHorizontal: 16,
  //   alignItems: "center",
  // },
  // containerImage: {
  //   flexDirection: "row",
  // },
  form: {
    backgroundColor: "#FFFFFF",
    borderTopLeftRadius: 25,
    borderTopRightRadius: 25,
    alignItems: "center",
    position: "relative",
    //////////////////////////
    // marginTop: 190,
    //////////////////////////
    // justifyContent: "flex-start",
    // flex: 1,
    // alignItems: "flex-end",
    // marginTop: 190,
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
  userName: {
    color: "#212121",
    // marginTop: 92,
    marginTop: 72,
    fontSize: 30,
    fontFamily: "Roboto-Medium",
    textAlign: "center",
  },
  // Image
  ///////////////розкоментувала////////////////
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
  ///////////////////////////////

  containerPostScreen: {
    paddingHorizontal: 16,
    flexDirection: "row",
    marginTop: 10,
    // alignItems: "center",
    ///////////////////////////////////
    // width: 343,
    height: 300,
  },
  // Posts
  containerScreen: {
    height: 240,
    width: 343,
    backgroundColor: "#F6F6F6",
    borderRadius: 8,
    borderWidth: 1,
    borderColor: "#E8E8E8",
    // marginTop: 32,
  },
  textScreen: {
    color: "#212121",
    marginTop: 8,
    fontSize: 16,
    fontFamily: "Roboto-Medium",
    // marginHorizontal: 16,
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
