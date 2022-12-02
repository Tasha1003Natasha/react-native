import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Image,
  TextInput,
  Pressable,
} from "react-native";
import MapView from "react-native-maps";
import { useNavigation } from "@react-navigation/native";
import { Camera } from "expo-camera";
import * as MediaLibrary from "expo-media-library";

const initialState = {
  name: "",
  terrain: "",
};

export const CreateScreen = () => {
  const navigation = useNavigation();
  const [state, setState] = useState(initialState);
  const [camera, setCamera] = useState(null);
  const [photo, setPhoto] = useState(null);
  const [hasCameraPermission, setHasCameraPermission] = useState(null);

  // For open camera
  const [type, setType] = useState(Camera.Constants.Type.back);
  const [openCamera, setOpenCamera] = useState(false);
  const handlerCamera = () => {
    setOpenCamera(true);
  };

  const closeCamera = () => {
    setOpenCamera(false);
  };
  // image
  const [image, setImage] = useState(null);
  const addImage = () => {};

  useEffect(() => {
    (async () => {
      const { status } = await Camera.requestCameraPermissionsAsync();
      await MediaLibrary.requestPermissionsAsync();
      setHasCameraPermission(status === "granted");
    })();
  }, []);

  const takePhoto = async () => {
    if (camera) {
      const photo = await camera.takePictureAsync();
      // await MediaLibrary.createAssetAsync(uri);
      setPhoto(photo.uri);
      // console.log("photo", photo);
    }
  };

  const sendPhoto = () => {
    // console.log("navigation", navigation);
    navigation.navigate("Posts", { photo });
  };

  if (hasCameraPermission === false) {
    return <Text>No access to camera</Text>;
  }

  return (
    <View style={styles.container}>
      <TouchableOpacity
        style={styles.containerPosts}
        onPress={() => {
          closeCamera(), navigation.navigate("Posts");
        }}
      >
        <Image
          source={require("../../assets/arrow_left.png")}
          style={styles.iconLeft}
        />
        <Text style={styles.postsText}>Создать публикацию</Text>
      </TouchableOpacity>
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
            <Camera
              style={styles.camera}
              type={type}
              ref={(ref) => setCamera(ref)}
            >
              <View style={styles.sectionFoto}>
                <TouchableOpacity
                  style={styles.containerFrontal}
                  onPress={() => {
                    setType(
                      type === Camera.Constants.Type.back
                        ? Camera.Constants.Type.front
                        : Camera.Constants.Type.back
                    );
                  }}
                >
                  <Image
                    source={require("../../assets/frontal_icon.png")}
                    style={{
                      width: 24,
                      height: 24,
                    }}
                  />
                </TouchableOpacity>

                {/* /////////////////////takePhoto//////////////////////////////////// */}
                <TouchableOpacity
                  style={styles.containerIconScreen}
                  onPress={!photo ? takePhoto : sendPhoto}
                >
                  <Image
                    source={
                      !photo
                        ? require("../../assets/icon_foto.png")
                        : require("../../assets/send_foto.png")
                    }
                    style={{ width: 24, height: 24 }}
                  />
                </TouchableOpacity>
                {/* /////////////////////sendPhoto//////////////////////////////////// */}
              </View>
            </Camera>
          </View>
        )}
      </View>

      <View style={styles.section}>
        <TouchableOpacity onPress={addImage}>
          {photo ? (
            <Text style={styles.textScreen}>Редактировать фото</Text>
          ) : (
            <Text style={styles.textScreen}>Загрузите фото</Text>
          )}
        </TouchableOpacity>

        <View style={styles.form}>
          <TextInput
            style={styles.input}
            placeholder={"Название..."}
            value={state.name}
            onChangeText={(value) =>
              setState((prevState) => ({ ...prevState, name: value }))
            }
            autoCapitalize={"none"}
            // onFocus={() => setIsShowKeyboard(true)}
          />

          <TextInput
            style={styles.inputMap}
            placeholder={"Местность..."}
            value={state.terrain}
            onChangeText={(value) =>
              setState((prevState) => ({ ...prevState, terrain: value }))
            }
            autoCapitalize={"none"}
            // onFocus={() => setIsShowKeyboard(true)}
          />
          <Pressable style={styles.mapList}>
            <Image
              source={require("../../assets/map.png")}
              style={styles.iconMap}
            />
            <MapView style={styles.map} />
          </Pressable>

          {image ? (
            <TouchableOpacity activeOpacity={0.8} style={styles.buttonHover}>
              <Text style={styles.btnTitleHover}>Опубликовать</Text>
            </TouchableOpacity>
          ) : (
            <TouchableOpacity activeOpacity={0.8} style={styles.button}>
              <Text style={styles.btnTitle}>Опубликовать</Text>
            </TouchableOpacity>
          )}

          <TouchableOpacity style={styles.trash}>
            <Image
              source={require("../../assets/trash.png")}
              // style={styles.iconTrash}
            />
          </TouchableOpacity>
        </View>
      </View>
    </View>
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

    color: "#BDBDBD",
    fontSize: 16,
    fontFamily: "Roboto-Regular",
  },
  inputMap: {
    height: 50,
    color: "#BDBDBD",
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
  map: {
    width: "100%",
    height: "100%",
  },
});
