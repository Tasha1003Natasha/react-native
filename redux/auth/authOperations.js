import { auth } from "../../firebase/config";
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  currentUser,
  updateProfile,
  onAuthStateChanged,
  signOut,
} from "firebase/auth";
import { authSlice } from "./authReducer";
const { updateUserProfile, authStateChange, authSignOut } = authSlice.actions;

export const authSignUpUser = (
  { useremail, password, username },
  avatarImage
) =>
  console.log("authSignUpUser", { useremail, password, username }, avatarImage);
async (dispatch, getState) => {
  try {
    const { user } = await createUserWithEmailAndPassword(
      auth,
      useremail,
      password
    );
    console.log("user", { user });

    await updateProfile(user, {
      displayName: username,
      email: useremail,
      photoURL: avatarImage,
    });
    // console.log(" updateProfile", updateProfile);

    const { displayName, uid, email, photoURL } = auth.currentUser;

    const userUpdateProfile = {
      username: displayName,
      userId: uid,
      useremail: email,
      avatarURL: photoURL,
    };

    dispatch(updateUserProfile(userUpdateProfile));
    console.log("user", user);
  } catch (error) {
    console.log("error", error);
    console.log("error.code", error.code);
    console.log("error.message", error.message);
  }
};

// const invalidEmail = "";
// const validPassword = "wowsuchsecureverysafepassword";
// const user = await signInWithEmailAndPassword(
//   auth,
//   invalidEmail,
//   validPassword
// );

export const authSignInUser =
  ({ useremail, password }) =>
  async (dispatch, getState) => {
    try {
      const user = await signInWithEmailAndPassword(auth, useremail, password);
      console.log("user", user);
    } catch (error) {
      console.log("error", error);
      console.log("error.code", error.code);
      console.log("error.message", error.message);
    }
  };
export const authSignOutUser = () => async (dispatch, getState) => {
  await signOut(auth);
  dispatch(authSignOut());
};

export const authStateChangeUser = () => async (dispatch, getState) => {
  onAuthStateChanged(auth, (user) => {
    // auth.onAuthStateChanged((user) => {
    if (user) {
      const userUpdateProfile = {
        username: user.displayName,
        userId: user.uid,
        useremail: user.email,
        avatarURL: user.photoURL,
      };

      dispatch(updateUserProfile(userUpdateProfile));
      dispatch(authStateChange({ stateChange: true }));
    }
  });
};
