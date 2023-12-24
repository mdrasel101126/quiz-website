import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface IUserState {
  email: string | null;
  accessToken: string | null;
  role: string | null;
  userLoader: boolean;
}

const initialState: IUserState = {
  email: null,
  accessToken: null,
  role: null,
  userLoader: true,
};
const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    saveUser: (state, action: PayloadAction<IUserState>) => {
      state.email = action.payload?.email;
      state.accessToken = action.payload?.accessToken;
      state.userLoader = false;
      state.role = action.payload?.role;
    },
    setAccessToken: (state, action: PayloadAction<string>) => {
      state.accessToken = action.payload;
    },
    setLoader: (state) => {
      state.userLoader = false;
    },
    removeUser: (state) => {
      state.email = null;
      state.accessToken = null;
      state.userLoader = false;
      state.role = null;
    },
  },
});
export const { saveUser, removeUser, setAccessToken, setLoader } =
  userSlice.actions;
export default userSlice.reducer;
