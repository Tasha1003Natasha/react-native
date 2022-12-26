import React, { useState, useEffect } from "react";
import {
  TouchableOpacity,
  StyleSheet,
  TextInput,
  View,
  TouchableWithoutFeedback,
  Keyboard,
  Text,
  Platform,
  KeyboardAvoidingView,
  Dimensions,
  Pressable,
  Image,
  ImageBackground,
} from "react-native";
import { useDispatch } from "react-redux";
import { authSignUpUser } from "../../redux/auth/authOperations";
import * as ImagePicker from "expo-image-picker";
import { storage } from "../../firebase/config";
import { ref, getDownloadURL, uploadBytesResumable } from "firebase/storage";

const initialState = {
  username: "",
  useremail: "",
  password: "",
};

export const RegistrationScreen = ({ navigation }) => {
  // console.log(Platform.OS);
  const dispatch = useDispatch();

  const login = () => {
    navigation.navigate("Login");
  };

  // const home = () => {
  //   navigation.navigate("Home");
  // };

  const [state, setState] = useState(initialState);
  const [isShowKeyboard, setIsShowKeyboard] = useState(false);

  const [type, setType] = useState(false);
  const handleClick = () => setType("text");

  const [image, setImage] = useState(null);

  const removeImage = () => {
    setImage(null);
  };

  const [dimensions, setDimensions] = useState(
    Dimensions.get("window").width - 8 * 2
  );

  useEffect(() => {
    onchange = () => {
      const width = Dimensions.get("window").width - 8 * 2;
      setDimensions(width);
    };

    const subscription = Dimensions.addEventListener("change", onchange);
    return () => subscription.remove();
  }, []);

  const showMessage = () => {
    if (
      state.username.trim() === "" ||
      state.useremail.trim() === "" ||
      state.password.trim() === ""
    ) {
      alert("Please fill in all fields!");
      return;
    } else if (state.password.length < 6) {
      alert("Passwords must be at least 6 characters long!");
      return;
    } else if (!image) {
      alert("Please choose an avatar!");
      return;
    }
  };

  const handleSubmit = async () => {
    showMessage();

    const avatarImage = await uploadAvatarToServer();

    Keyboard.dismiss();
    dispatch(authSignUpUser(state, avatarImage));
    setState(initialState);
    setImage("");
  };

  const keyboardHide = () => {
    Keyboard.dismiss();
  };
  /////////////////////image////////////////////////////////
  const addImage = async () => {
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.All,
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
    });
    if (!result.canceled) {
      setImage(result.assets[0].uri);
    }
  };

  /////////////////////AvatarToServer//////////////////
  function urlToBlob(image) {
    return new Promise((resolve, reject) => {
      const xhr = new XMLHttpRequest();
      xhr.addEventListener("error", reject);
      xhr.addEventListener("readystatechange", () => {
        if (xhr.readyState === 4) {
          resolve(xhr.response);
        }
      });
      xhr.open("GET", image);
      xhr.responseType = "blob";
      xhr.send();
    });
  }

  const uploadAvatarToServer = async () => {
    //Завантаження фото на storage
    const blob = await urlToBlob(image);
    const blobId = blob.data.blobId;
    const storageRef = ref(storage, `postImage/${blobId}`);
    const uploadTask = uploadBytesResumable(storageRef, blob);

    ///////////////////////////////////////Отримання посилання
    return uploadTask.then((snapshot) => {
      return getDownloadURL(snapshot.ref).then((downloadURL) => {
        return downloadURL;
      });
    });
  };

  return (
    <TouchableWithoutFeedback onPress={keyboardHide}>
      <View style={styles.container}>
        <ImageBackground
          source={require("../../assets/image.png")}
          style={styles.image}
        >
          <KeyboardAvoidingView
            behavior={Platform.OS == "ios" ? "padding" : "height"}
          >
            <View style={styles.form}>
              {/* /* Аватарка */}
              <TouchableOpacity
                style={styles.avatarSection}
                onPress={!image ? addImage : removeImage}
              >
                <TouchableOpacity onPress={!image ? addImage : removeImage}>
                  {image && (
                    <Image
                      source={{ uri: image }}
                      style={{ width: 120, height: 120, borderRadius: 16 }}
                    />
                  )}
                  <Image
                    source={
                      image
                        ? require("../../assets/close.png")
                        : require("../../assets/add.png")
                    }
                    style={image ? styles.avatarClose : styles.avatarAdd}
                  />
                </TouchableOpacity>
              </TouchableOpacity>
              <View
                onLayout={() => setIsShowKeyboard(true)}
                style={{
                  ...styles.inputForm,
                  marginBottom: isShowKeyboard ? 45 : 150,
                  width: dimensions,
                }}
              >
                <Text style={styles.title}>Регистрация</Text>
                <TextInput
                  style={styles.input}
                  placeholder={"Логин"}
                  value={state.username}
                  onChangeText={(value) =>
                    setState((prevState) => ({ ...prevState, username: value }))
                  }
                  autoCapitalize={"none"}
                />
                <TextInput
                  style={styles.input}
                  placeholder={"Адрес электронной почты"}
                  value={state.useremail}
                  onChangeText={(value) =>
                    setState((prevState) => ({
                      ...prevState,
                      useremail: value,
                    }))
                  }
                  autoCapitalize={"none"}
                />
                <View style={styles.inputSection}>
                  <TextInput
                    style={styles.inputPassword}
                    type={type}
                    placeholder={"Пароль"}
                    secureTextEntry={type ? false : true}
                    value={state.password}
                    onChangeText={(value) =>
                      setState((prevState) => ({
                        ...prevState,
                        password: value,
                      }))
                    }
                  />

                  <Pressable style={styles.show} onPress={handleClick}>
                    <Text style={styles.showText}>Показать</Text>
                  </Pressable>
                </View>

                <TouchableOpacity
                  onPress={handleSubmit}
                  activeOpacity={0.8}
                  style={styles.button}
                >
                  <Text style={styles.btnTitle}>Зарегистрироваться</Text>
                </TouchableOpacity>

                <TouchableOpacity onPress={login}>
                  <Text style={styles.text}>Уже есть аккаунт? Войти</Text>
                </TouchableOpacity>
              </View>
            </View>
          </KeyboardAvoidingView>
        </ImageBackground>
      </View>
    </TouchableWithoutFeedback>
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
  title: {
    marginTop: 92,
    marginBottom: 33,
    textAlign: "center",
    fontSize: 30,
    color: "#212121",
    fontFamily: "Roboto-Medium",
  },
  input: {
    height: 50,
    marginBottom: 16,
    backgroundColor: "#F6F6F6",
    borderColor: "#E8E8E8",
    borderWidth: 1,
    padding: 16,
    borderRadius: 8,
    color: "#212121",
    fontFamily: "Roboto-Regular",
  },
  text: {
    color: "#1B4371",
    fontSize: 16,
    textAlign: "center",
    marginTop: 16,
    fontFamily: "Roboto-Regular",
  },
  button: {
    backgroundColor: "#FF6C00",
    marginTop: 27,
    height: 51,
    alignItems: "center",
    justifyContent: "center",
    borderRadius: 100,
    borderWidth: 1,
    borderColor: "#FF6C00",
  },
  btnTitle: {
    color: "#FFFFFF",
    fontSize: 16,
    fontFamily: "Roboto-Regular",
  },
  inputForm: {
    marginBottom: 45,
  },
  show: {
    position: "absolute",
    right: 100,
    transform: [{ translateX: 100 }],
    padding: 16,
  },
  inputSection: {
    position: "relative",
    height: 50,
    marginBottom: 16,
    backgroundColor: "#F6F6F6",
    borderColor: "#E8E8E8",
    borderWidth: 1,
    padding: 16,
    borderRadius: 8,
    color: "#212121",
    fontFamily: "Roboto-Regular",

    justifyContent: "center",
    alignItems: "baseline",
  },
  inputPassword: {
    position: "absolute",
    padding: 16,
  },
  showText: {
    color: "#1B4371",
  },
  avatarSection: {
    position: "absolute",
    backgroundColor: "#F6F6F6",
    borderRadius: 16,
    width: 120,
    height: 120,
    top: 92,
    right: 70,
    transform: [{ translateY: -150 }, { translateX: -70 }],
  },
  avatarAdd: {
    position: "absolute",
    top: 100,
    left: 35,
    transform: [{ translateY: -30 }, { translateX: 70 }],
  },
  avatarClose: {
    position: "absolute",
    top: 100,
    left: 30,
    transform: [{ translateY: -30 }, { translateX: 70 }],
  },
});
