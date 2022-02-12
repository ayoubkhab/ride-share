import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { auth } from "../../firebase";
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signOut,
  updateProfile,
} from "firebase/auth";
import { doc, setDoc } from "firebase/firestore";
import { db } from "../../firebase";
import { parse } from "date-fns";

const initialState = {
  users: [],
  loadingUI: false,
  user: "loadingUser",
  error: null,
};

export const signupUser = createAsyncThunk(
  "users/signupUser",
  async ({ newUserData, navigate }) => {
    const { email, password, displayName, birthDate } = newUserData;
    const userCredential = await createUserWithEmailAndPassword(
      auth,
      email,
      password
    );
    await updateProfile(auth.currentUser, {
      displayName: displayName,
    });

    const userRef = doc(db, "users", userCredential.user.uid);
    await setDoc(
      userRef,
      {
        displayName,
        birthDate: parse(birthDate, "dd/MM/yyyy", new Date()),
      },
      { merge: true }
    );
    navigate("/");

    return userCredential.user;
  }
);

export const loginUser = createAsyncThunk(
  "users/loginUser",
  async ({ userData, navigate }) => {
    const userCredential = await signInWithEmailAndPassword(
      auth,
      userData.email,
      userData.password
    );
    navigate("/");

    return userCredential.user;
  }
);

export const logoutUser = createAsyncThunk("users/logoutUser", async () => {
  await signOut(auth);
});

const usersSlice = createSlice({
  name: "users",
  initialState,
  reducers: {
    authenticateUser(state, action) {
      state.user = action.payload;
    },
    unauthenticateUser(state) {
      state.user = null;
    },
  },
  extraReducers(builder) {
    builder
      .addCase(signupUser.pending, (state) => {
        state.loadingUI = true;
      })
      .addCase(signupUser.fulfilled, (state, action) => {
        state.loadingUI = false;
        state.user = action.payload;
      })
      .addCase(signupUser.rejected, (state, action) => {
        state.loadingUI = false;
        state.error = action.error.message;
      })
      .addCase(loginUser.pending, (state) => {
        state.loadingUI = true;
      })
      .addCase(loginUser.fulfilled, (state, action) => {
        state.loadingUI = false;
        state.user = action.payload;
      })
      .addCase(loginUser.rejected, (state, action) => {
        state.loadingUI = false;
        state.error = action.error.message;
      })
      .addCase(logoutUser.pending, (state) => {
        state.loadingUI = true;
      })
      .addCase(logoutUser.fulfilled, (state, action) => {
        state.loadingUI = false;
      })
      .addCase(logoutUser.rejected, (state, action) => {
        state.loadingUI = false;
        state.error = action.error.message;
      });
  },
});

export const { authenticateUser, unauthenticateUser } = usersSlice.actions;

export default usersSlice.reducer;
