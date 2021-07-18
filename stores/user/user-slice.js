import { createSlice } from "@reduxjs/toolkit"; 

const userSlice = createSlice({
    name: "user", 
    initialState: {
        info: null, 
    }, 
    reducers: {
        setUserInfo(state, action) {
            state.info = action.payload; 
        }
    }
});

export default userSlice;

export const userAction = userSlice.actions;