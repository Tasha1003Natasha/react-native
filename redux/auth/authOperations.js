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

export const authSignUpUser =
  ({ email, password, username }) =>
  async (dispatch, getState) => {
    try {
      const { user } = await createUserWithEmailAndPassword(
        auth,
        email,
        password
      );

      await updateProfile(user, {
        displayName: username,
      });

      const { displayName, uid } = auth.currentUser;

      const userUpdateProfile = {
        username: displayName,
        userId: uid,
      };

      dispatch(updateUserProfile(userUpdateProfile));

      console.log("user", user);
    } catch (error) {
      console.log("error", error);
      console.log("error.message", error.message);
    }
  };
export const authSignInUser =
  ({ email, password }) =>
  async (dispatch, getState) => {
    try {
      const user = await signInWithEmailAndPassword(auth, email, password);
      console.log("user", user);
    } catch (error) {
      console.log("error", error);
      console.log("error.message", error.message);
    }
  };
export const authSignOutUser = () => async (dispatch, getState) => {
  await signOut(auth);
  dispatch(authSignOut());
};

export const authStateChangeUser = () => async (dispatch, getState) => {
  await auth.onAuthStateChanged((user) => {
    if (user) {
      const userUpdateProfile = {
        username: user.displayName,
        userId: user.uid,
      };

      dispatch(updateUserProfile(userUpdateProfile));
      dispatch(authStateChange({ stateChange: true }));
    }
  });
};
