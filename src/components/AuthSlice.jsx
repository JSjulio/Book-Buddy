import { createSlice } from '@reduxjs/toolkit';

//Authorizing login info
const initialState = {
 token: null,
 userDetails: null,
 isAuthenticated: false,   
};

const authSlice = createSlice({
    name: 'auth',
    initialState,
    reducers: {
        setToken: (state, action) => {
            state.token = action.payload;
            state.isAuthenticated = !!action.payload;
        },
        setUserDetails: (state, action) => {
            state.userDetails = action.payload;
        },
        logout: (state) => {
            state.token = null;
            state.userDetails = null;
            state.isAuthenticated = false;
        },
    },
});

export default authSlice.reducer;
export const { setToken, setUserDetails, logout } = authSlice.actions;