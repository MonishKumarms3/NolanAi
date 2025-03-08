/** @format */

import { createSlice } from "@reduxjs/toolkit";

const initialState = {
	isAuthenticated: !!localStorage.getItem("token"),
	user: null,
	loading: false,
	error: null,
};

const authSlice = createSlice({
	name: "auth",
	initialState,
	reducers: {
		loginStart: (state) => {
			state.loading = true;
			state.error = null;
		},
		loginSuccess: (state, action) => {
			state.isAuthenticated = true;
			state.user = action.payload;
			state.loading = false;
			state.error = null;
		},
		loginFailure: (state, action) => {
			state.loading = false;
			state.error = action.payload;
			state.isAuthenticated = false;
			localStorage.removeItem("token");
		},
		logout: (state) => {
			state.isAuthenticated = false;
			state.user = null;
			localStorage.removeItem("token");
		},
	},
});

export const { loginStart, loginSuccess, loginFailure, logout } =
	authSlice.actions;
export default authSlice.reducer;
