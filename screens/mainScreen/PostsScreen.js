import React, { useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Image,
  ImageBackground,
} from "react-native";

export const PostsScreen = () => {
  const [number, setNumber] = useState(0);
  const handleClick = () => setNumber(number + 1);

  return (
    <View style={styles.container}>
      <TouchableOpacity style={styles.containerPosts}>
        <Text style={styles.postsText}>Публикации</Text>
        <Image
          source={require("../../assets/logout.png")}
          style={styles.iconLogout}
        />
      </TouchableOpacity>
      <View style={styles.postsLine} />

      <View style={styles.section}>
        <View style={styles.containerImage}>
          <ImageBackground
            source={require("../../assets/defult.png")}
            style={styles.image}
          ></ImageBackground>

          <View style={styles.containerUser}>
            <Text style={styles.textUser}>Natali Romanova</Text>
            <Text style={styles.emailUser}>email@example.com</Text>
          </View>
        </View>

        {/* Posts */}
        <View style={styles.containerCreateScreen}>
          <TouchableOpacity style={styles.containerScreen}>
            <Image
              source={require("../../assets/default_image.png")}
              style={styles.imageScreen}
            />
          </TouchableOpacity>

          <Text style={styles.textScreen}>Name</Text>

          <View style={styles.containerPostScreen}>
            <TouchableOpacity
              style={styles.containerComment}
              onPress={handleClick}
            >
              <Image source={require("../../assets/message.png")} />
              <Text style={styles.comment}>{number}</Text>
            </TouchableOpacity>

            <TouchableOpacity style={styles.containerMap}>
              <Image
                source={require("../../assets/map.png")}
                style={styles.iconMap}
              />
              <Text style={styles.terrainScreen}>Terrain...</Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>

      <View tyle={styles.containerToolbar}>
        <View style={styles.postsLine} />
        <TouchableOpacity style={styles.toolbarItems}>
          <Image source={require("../../assets/grid.png")} />
          <Image
            source={require("../../assets/new.png")}
            style={styles.toolbar}
          />
          <Image source={require("../../assets/user.png")} />
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#FFFFFF",
    position: "relative",
  },
  containerPosts: {
    paddingTop: 11,
    paddingBottom: 11,
    flexDirection: "row",
    alignItems: "baseline",
    justifyContent: "flex-end",
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

  ////////Posts/////////
  section: {
    flex: 1,
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
    marginLeft: 8,
    marginTop: 48,
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
  // Image
  containerCreateScreen: {
    paddingHorizontal: 16,
    marginTop: 32,
  },
  containerScreen: {
    height: 240,
    backgroundColor: "#F6F6F6",
    borderRadius: 8,
    borderWidth: 1,
    borderColor: "#E8E8E8",
    alignItems: "center",
    justifyContent: "flex-start",
  },
  containerPostScreen: {
    flexDirection: "row",
    marginTop: 10,
    // alignItems: "center",
  },
  textScreen: {
    color: "#212121",
    marginTop: 8,
    fontSize: 16,
    fontFamily: "Roboto-Medium",
  },
  // comment
  containerComment: {
    flex: 1,
    flexDirection: "row",
  },
  comment: {
    marginLeft: 6,
    color: "#BDBDBD",
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

  // //User
  containerToolbar: {
    flex: 1,
    position: "absolute",
  },
  toolbarItems: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    flexWrap: "wrap",
    marginTop: 9,
    marginBottom: 22,
  },
  toolbar: {
    marginLeft: 31,
    marginRight: 31,
  },
});
