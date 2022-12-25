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
  { email: userEmail, password, username },
  avatarImage
) =>
  console.log(
    "authSignUpUser",
    { email: userEmail, password, username },
    avatarImage
  );
async (dispatch, getState) => {
  try {
    const { user } = await createUserWithEmailAndPassword(
      auth,
      userEmail,
      password
    );
    console.log("user", { user });

    await updateProfile(user, {
      displayName: username,
      email: userEmail,
      photoURL: avatarImage,
    });
    // console.log(" updateProfile", updateProfile);

    const { displayName, uid, email, photoURL } = auth.currentUser;

    const userUpdateProfile = {
      username: displayName,
      userId: uid,
      email,
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
  ({ email, password }) =>
  async (dispatch, getState) => {
    try {
      const user = await signInWithEmailAndPassword(auth, email, password);
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
        email: user.email,
        avatarURL: user.photoURL,
      };

      dispatch(updateUserProfile(userUpdateProfile));
      dispatch(authStateChange({ stateChange: true }));
    }
  });
};
