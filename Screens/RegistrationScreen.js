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
  // Dimensions,
  Pressable,
  Button,
} from "react-native";
import { A } from "@expo/html-elements";

const initialState = {
  username: "",
  email: "",
  password: "",
};

export const RegistrationScreen = () => {
  const [state, setState] = useState(initialState);
  const [isShowKeyboard, setIsShowKeyboard] = useState(false);
  console.log(isShowKeyboard);

  const [type, setType] = useState(false);
  const handleClick = () => setType("text");

  // const [dimensions, setDimensions] = useState(
  //   Dimensions.get("window").width - 8 * 2
  // );

  // useEffect(() => {
  //   onchange = () => {
  //     const width = Dimensions.get("window").width - 8 * 2;
  //     setDimensions(width);
  //     // setIsShowKeyboard(true);
  //   };
  //   Dimensions.addEventListener("change", onchange);
  //   return () => {
  //     Dimensions.removeEventListener("change", onchange);
  //   };
  // }, []);

  // useEffect(() => {
  //   setIsShowKeyboard(true);
  // });

  const KeyboardHide = () => {
    setIsShowKeyboard(true);
    console.log(setIsShowKeyboard);
    Keyboard.dismiss();
    console.log(state);
    setState(initialState);
  };

  return (
    <TouchableWithoutFeedback onPress={KeyboardHide}>
      <KeyboardAvoidingView
        behavior={Platform.OS == "ios" ? "padding" : "height"}
      >
        <View style={styles.form}>
          <View
            onLayout={() => setIsShowKeyboard(true)}
            style={{
              ...styles.inputForm,
              marginBottom: isShowKeyboard ? 45 : 150,
              // width: dimensions,
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
              onFocus={() => setIsShowKeyboard(true)}
            />
            <TextInput
              style={styles.input}
              placeholder={"Адрес электронной почты"}
              value={state.email}
              onChangeText={(value) =>
                setState((prevState) => ({ ...prevState, email: value }))
              }
              autoCapitalize={"none"}
              onFocus={() => setIsShowKeyboard(true)}
            />
            <View style={styles.inputSection}>
              <TextInput
                // style={styles.input}
                style={styles.inputPassword}
                type={type}
                placeholder={"Пароль"}
                secureTextEntry={type ? false : true}
                value={state.password}
                onChangeText={(value) =>
                  setState((prevState) => ({ ...prevState, password: value }))
                }
                onFocus={() => setIsShowKeyboard(true)}
              />

              <Pressable style={styles.show} onPress={handleClick}>
                <Text style={styles.showText}>Показать</Text>
              </Pressable>
            </View>
            <TouchableOpacity activeOpacity={0.8} style={styles.button}>
              <Text style={styles.btnTitle}>Зарегистрироваться</Text>
            </TouchableOpacity>
            <Text style={styles.text}>Уже есть аккаунт? Войти</Text>
          </View>
        </View>
      </KeyboardAvoidingView>
    </TouchableWithoutFeedback>
  );
};

const styles = StyleSheet.create({
  form: {
    backgroundColor: "#FFFFFF",
    borderTopLeftRadius: 25,
    borderTopRightRadius: 25,
    // alignItems: "center",
    marginHorizontal: 16,
  },
  title: {
    marginTop: 32,
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
  },
  showText: {
    color: "#1B4371",
  },
});
