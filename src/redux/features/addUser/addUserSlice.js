import { createSlice } from "@reduxjs/toolkit";
const UserData = {
  email: "",
  username: "",
  first_name: "",
  last_name: "",
  profile_picture: [],
  is_superuser: "",
  is_subscribed: "",
  is_verified: "",
};
const addUserSlices = createSlice({
  name: "User",
  initialState: UserData,
  reducers: {
    addUser: (state, action) => {
      state.profile_picture =
        action.payload.profile_picture
      state.email = action.payload.email;
      state.is_verified = action.payload.is_verified;
      state.first_name = action.payload.first_name;
      state.last_name = action.payload.last_name;
      state.is_subscribed = action.payload.is_subscribed;
      state.username = action.payload.username;
    },
    removeUser: (state, action) => {
      state.profile_picture = [];
      state.email = "";
      state.is_verified = "";
      state.first_name = "";
      state.last_name = "";
      state.is_subscribed = "";
      state.username = "";
    },
  },
});

export default addUserSlices.reducer;
export const addUserActions = addUserSlices.actions;
