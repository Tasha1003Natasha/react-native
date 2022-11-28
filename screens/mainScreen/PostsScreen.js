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
  containerImage: {
    flex: 1,
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
  containerToolbar: {
    flex: 1,
  },
  toolbarItems: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    flexWrap: "wrap",
    marginTop: 9,
    marginBottom: 34,
  },
  toolbar: {
    marginLeft: 31,
    marginRight: 31,
  },
});
