import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Image,
  TextInput,
  KeyboardAvoidingView,
  TouchableWithoutFeedback,
  Keyboard,
  ScrollView,
} from "react-native";
// import { useNavigation } from "@react-navigation/native";
import { Camera } from "expo-camera";
import * as MediaLibrary from "expo-media-library";
import { useIsFocused } from "@react-navigation/native";
import * as Location from "expo-location";

import { storage, db } from "../../firebase/config";
import {
  ref,
  getDownloadURL,
  uploadBytesResumable,
  uploadBytes,
} from "firebase/storage";
import { collection, addDoc } from "firebase/firestore";

import { useSelector } from "react-redux";

const initialState = {
  name: "",
  terrain: "",
};

export const CreateScreen = ({ navigation }) => {
  const map = () => {
    navigation.navigate("Map");
  };

  const [state, setState] = useState(initialState);
  const [camera, setCamera] = useState(null);
  const [photo, setPhoto] = useState(null);
  const [hasCameraPermission, setHasCameraPermission] = useState(null);
  // For open/close camera
  const [type, setType] = useState(Camera.Constants.Type.back);
  const [openCamera, setOpenCamera] = useState(false);
  ///////////////useIsFocused /////////////////
  const isFocused = useIsFocused();
  //////////////disabled//////////////////
  const [isDisabled, setIsDisabled] = useState(false);
  // image
  // const [image, setImage] = useState(null);
  // const addImage = () => {};
  //////////////Keyboard/////////////////
  const [isShowKeyboard, setIsShowKeyboard] = useState(false);
  //////////////location////////////////
  const [location, setLocation] = useState(null);

  const { userId, username } = useSelector((state) => state.auth);

  useEffect(() => {
    (async () => {
      const cameraStatus = await Camera.requestCameraPermissionsAsync();
      await MediaLibrary.requestPermissionsAsync();
      setHasCameraPermission(cameraStatus.status === "granted");

      const location = await Location.getCurrentPositionAsync({});
      setLocation(location);

      setState(state);

      const { status } = await Location.requestForegroundPermissionsAsync();
      if (status !== "granted") {
        setErrorMsg("Permission to access location was denied");
        return;
      }
    })();
  }, []);

  const handlerCamera = async () => {
    setOpenCamera(true);
  };

  const closeCamera = async () => {
    setOpenCamera(false);
  };

  const takePhoto = async () => {
    // console.log("state", state);
    // console.log("location", location);

    // const photo = await camera.takePictureAsync();
    // const location = await Location.getCurrentPositionAsync();
    // console.log("latitude", location.coords.latitude);
    // console.log("longitude", location.coords.longitude);

    const { uri } = await camera.takePictureAsync();
    setPhoto(uri);
    // console.log("uri ", uri);
  };

  const sendPhoto = async () => {
    // uploadPhotoToServer();
    uploadPostToServer();
    // console.log("navigation", navigation);
    navigation.navigate("DefaultScreen", { photo });
    setPhoto(null);
    setState("");
    setIsDisabled(false);
  };

  const retakePhoto = async () => {
    setPhoto(null);
    setOpenCamera(true);
    setState("");
    setIsDisabled(false);
    setCamera(null);
  };

  /////////////////////PhotoToServer//////////////////
  function urlToBlob(photo) {
    return new Promise((resolve, reject) => {
      const xhr = new XMLHttpRequest();
      xhr.addEventListener("error", reject);
      xhr.addEventListener("readystatechange", () => {
        if (xhr.readyState === 4) {
          resolve(xhr.response);
        }
      });
      xhr.open("GET", photo);
      xhr.responseType = "blob"; // convert type
      xhr.send();
    });
  }

  const uploadPhotoToServer = async () => {
    //Завантаження фото на storage
    const blob = await urlToBlob(photo);
    const blobId = blob.data.blobId;
    const storageRef = ref(storage, `postImage/${blobId}`);
    const uploadTask = uploadBytesResumable(storageRef, blob);
    // console.log("uploadTask", uploadTask);

    ///////////////////////////////////////Отримання посилання на зроблену фотографію
    return uploadTask.then((snapshot) => {
      // console.log("snapshot", snapshot)
      return getDownloadURL(snapshot.ref).then((downloadURL) => {
        // console.log("downloadURL", downloadURL);
        return downloadURL;
      });
    });
  };

  ///////////////////Post// upload Post To Server ////////////////////////////
  const uploadPostToServer = async () => {
    const uploadPhoto = await uploadPhotoToServer();
    console.log("uploadPhoto", uploadPhoto);

    const docData = {
      uploadPhoto,
      state,
      location: location.coords,
      userId,
      username,
    };
    console.log("docData", docData);
    const createPost = addDoc(collection(db, "posts"), docData);
  };

  return (
    <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
      <ScrollView style={styles.container}>
        <View style={styles.containerPosts}>
          <TouchableOpacity
            onPress={() => {
              closeCamera(), navigation.navigate("Posts");
            }}
          >
            <Image
              source={require("../../assets/arrow_left.png")}
              style={styles.iconLeft}
            />
          </TouchableOpacity>
          <Text style={styles.postsText}>Создать публикацию</Text>
        </View>
        <View style={styles.postsLine} />

        {/* /////////Screen */}
        <View style={styles.sectionCamera}>
          {!openCamera ? (
            <View style={styles.containerCreateScreen}>
              <TouchableOpacity
                style={styles.containerIcon}
                onPress={handlerCamera}
              >
                <Image source={require("../../assets/icon_foto.png")} />
              </TouchableOpacity>
            </View>
          ) : (
            <View style={styles.containerCamera}>
              {isFocused && (
                <Camera
                  style={styles.camera}
                  type={type}
                  ref={(ref) => setCamera(ref)}
                >
                  <View style={styles.sectionFoto}>
                    <Image
                      source={photo ? { uri: photo } : { uri: null }}
                      style={photo ? styles.imagePhoto : styles.imageHidden}
                    />

                    <TouchableOpacity
                      style={!photo && styles.containerFrontal}
                      onPress={() => {
                        setType(
                          type === Camera.Constants.Type.back
                            ? Camera.Constants.Type.front
                            : Camera.Constants.Type.back
                        );
                      }}
                    >
                      <Image
                        source={
                          !photo && require("../../assets/frontal_icon.png")
                        }
                        style={{
                          width: 24,
                          height: 24,
                        }}
                      />
                    </TouchableOpacity>

                    <TouchableOpacity
                      style={!photo && styles.containerIconScreen}
                      onPress={takePhoto}
                    >
                      <Image
                        source={!photo && require("../../assets/icon_foto.png")}
                        style={{ width: 24, height: 24 }}
                      />
                    </TouchableOpacity>
                  </View>
                </Camera>
              )}
            </View>
          )}
        </View>

        <View style={styles.section}>
          <TouchableOpacity onPress={photo ? retakePhoto : sendPhoto}>
            {photo ? (
              <Text style={styles.textScreen}>Редактировать фото</Text>
            ) : (
              <Text style={styles.textScreen}>Загрузите фото</Text>
            )}
          </TouchableOpacity>

          {/* <TouchableOpacity onPress={addImage}>
            {image ? (
              <Text style={styles.textScreen}>Редактировать фото</Text>
            ) : (
              <Text style={styles.textScreen}>Загрузите фото</Text>
            )}
          </TouchableOpacity> */}

          <KeyboardAvoidingView
            behavior={Platform.OS == "ios" ? "padding" : "height"}
          >
            <View style={styles.form}>
              <TextInput
                style={styles.input}
                placeholder={"Название..."}
                value={state.name}
                onChangeText={(value) => {
                  setState((prevState) => ({ ...prevState, name: value }));
                  if (photo) {
                    setIsDisabled(true);
                  }
                }}
                autoCapitalize={"none"}
                placeholderTextColor={state.name ? "#212121" : "#BDBDBD"}
              />

              <TextInput
                style={styles.inputMap}
                placeholder={"Местность..."}
                value={state.terrain}
                onChangeText={(value) => {
                  setState((prevState) => ({ ...prevState, terrain: value }));
                  if (photo) {
                    setIsDisabled(true);
                  }
                }}
                autoCapitalize={"none"}
                placeholderTextColor={state.terrain ? "#212121" : "#BDBDBD"}
              />

              <TouchableOpacity style={styles.mapList} onPress={map}>
                <Image
                  source={require("../../assets/map.png")}
                  style={styles.iconMap}
                />
              </TouchableOpacity>

              {/* // /////button/////////////////////// */}
              <TouchableOpacity
                activeOpacity={0.8}
                style={isDisabled ? styles.buttonHover : styles.button}
                onPress={photo ? sendPhoto : null}
              >
                <Text
                  style={isDisabled ? styles.btnTitleHover : styles.btnTitle}
                >
                  Опубликовать
                </Text>
              </TouchableOpacity>

              <TouchableOpacity
                style={styles.trash}
                onPress={photo ? retakePhoto : null}
              >
                <Image
                  source={require("../../assets/trash.png")}
                  // style={styles.iconTrash}
                />
              </TouchableOpacity>
            </View>
          </KeyboardAvoidingView>
        </View>
      </ScrollView>
    </TouchableWithoutFeedback>
  );
};

const styles = StyleSheet.create({
  // /////////////////////
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
  section: {
    paddingHorizontal: 16,
  },
  sectionCamera: {
    paddingHorizontal: 16,
    alignItems: "center",
  },
  containerCreateScreen: {
    alignItems: "center",
    justifyContent: "center",
    height: 240,
    width: 343,
    backgroundColor: "#F6F6F6",
    borderRadius: 8,
    borderWidth: 1,
    borderColor: "#E8E8E8",
    marginTop: 32,
    marginBottom: 8,
  },
  imagePhoto: {
    alignItems: "center",
    justifyContent: "center",
    height: 242,
    width: 346,
    backgroundColor: "#F6F6F6",
    borderRadius: 8,
    borderWidth: 1,
    borderColor: "#E8E8E8",
    marginTop: 32,
    marginBottom: 8,

    position: "absolute",
    top: -32,
  },
  imageHidden: {
    display: "none",
  },
  containerIcon: {
    height: 60,
    width: 60,
    backgroundColor: "#FFFFFF",
    borderRadius: 50,
    borderWidth: 1,
    borderColor: "#E8E8E8",
    justifyContent: "center",
    alignItems: "center",
  },
  // camera
  containerCamera: {
    alignItems: "center",
    marginTop: 32,
    marginBottom: 8,

    borderWidth: 4,
    borderColor: "#000000",
    borderRadius: 8,
  },
  camera: {
    height: 240,
    width: 343,
  },
  containerIconScreen: {
    marginTop: 50,
    height: 50,
    width: 50,
    backgroundColor: "#FFFFFF",
    borderRadius: 50,
    borderWidth: 1,
    borderColor: "#E8E8E8",
    justifyContent: "center",
    alignItems: "center",
    opacity: 0.5,
  },
  sectionFoto: {
    justifyContent: "center",
    alignItems: "center",
  },
  containerFrontal: {
    height: 40,
    width: 40,
    backgroundColor: "#FFFFFF",
    borderRadius: 50,
    borderColor: "#E8E8E8",
    justifyContent: "center",
    alignItems: "center",

    marginTop: 10,
    opacity: 0.5,
  },
  // //////////////
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

    fontSize: 16,
    fontFamily: "Roboto-Regular",
  },

  inputMap: {
    height: 50,
    fontSize: 16,
    fontFamily: "Roboto-Regular",
    marginLeft: 25,
  },
  mapList: {
    borderBottomColor: "#E8E8E8",
    borderBottomWidth: 1,
  },
  iconMap: {
    position: "absolute",
    top: 112,
    right: 170,
    transform: [{ translateY: -150 }, { translateX: -170 }],
    padding: 4,
  },
  button: {
    backgroundColor: "#F6F6F6",
    marginTop: 32,
    height: 51,
    alignItems: "center",
    justifyContent: "center",
    borderRadius: 100,
    borderWidth: 1,
    borderColor: "#F6F6F6",
    marginBottom: 32,
  },
  btnTitle: {
    color: "#BDBDBD",
    fontSize: 16,
    fontFamily: "Roboto-Regular",
  },
  buttonHover: {
    backgroundColor: "#FF6C00",
    marginTop: 32,
    height: 51,
    alignItems: "center",
    justifyContent: "center",
    borderRadius: 100,
    borderWidth: 1,
    borderColor: "#FF6C00",
    marginBottom: 32,
  },
  btnTitleHover: {
    color: "#FFFFFF",
    fontSize: 16,
    fontFamily: "Roboto-Regular",
  },
  trash: {
    // flex: 1,
    alignItems: "center",
    justifyContent: "flex-start",
  },
});
