import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { useLoginMutation } from "../../api/bookApi";

export const loginUser = createAsyncThunk('login/loginUser', async ({ email, password }) => {

    console.log('thunking')
    try {
      // Use the useLoginMutation hook to initiate the login mutation
      console.log('api running')
      const result = await useLoginMutation({ email, password });
      console.log('result: ', result.data)
      const { token, ...userData } = result.data;
      return { token, user: userData };
      }
     catch (error) {
        console.log(error)
      // Handle login error, you might want to throw or return a specific error here
      throw new Error('Login failed');
    }
  });

//Set up initial state
const initialState = {
    user: null,
    token: null,
    loading: false,
    error: null,
};


const loginSlice = createSlice({
    name: 'login',
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder.addCase(loginUser.pending, (state) => {
          state.loading = true;
          state.error = null;
        });
    
        builder.addCase(loginUser.fulfilled, (state, action) => {
          const { token, user } = action.payload;
          state.loading = false;
          state.token = token; // Update state.token instead of state.user
          state.user = user;
        });
    
        builder.addCase(loginUser.rejected, (state, action) => {
          state.loading = false;
          state.error = action.error.message;
        });
      },
  });
  
  // Export the async thunk and the reducer
//   export { loginUser };
  export default loginSlice.reducer;