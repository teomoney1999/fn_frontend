import { createSlice } from "@reduxjs/toolkit";

const authSlice = createSlice({
    name: 'auth', 
    initialState: {
        isLoggedIn: false, 
        token: null, 
        userId: null, 
        currentUser: null,
    }, 
    reducers: {
        login(state, action) {
            const currentUser = action.payload.currentUser; 
            // state.token = payload.token; 
            state.currentUser = currentUser; 
            state.token = state.userId = currentUser.id
            state.isLoggedIn = true;
            // state.userId = currentUser.id; 

            localStorage.setItem("token", state.token); 
            localStorage.setItem("userId", state.userId); 
        },
        logout(state, action) {
            state.token = null; 
            state.currentUser = null; 
            state.isLoggedIn = false; 
            state.userId = null;

            localStorage.removeItem("token");
            localStorage.removeItem("userId");
        }, 
        authorized(state, action) {
            state.token = state.userId = localStorage.getItem("token");
            state.isLoggedIn = state.token ? true : false;
        }
    }
}); 

export const authAction = authSlice.actions; 

export default authSlice;