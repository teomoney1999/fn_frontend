import { createSlice } from "@reduxjs/toolkit";

const notificationSlice = createSlice({
    name: 'notification', 
    initialState: {
        content: null, 
        isVisible: false, 
        type: null, // danger, success, warning 

    }, 
    reducers: {
        notify(state, action) {
            const payload = action.payload;
            
            state.content = {
                type: payload.type, 
                message: payload.message,
                delay: payload.delay || 3000,
            }
            state.isVisible = true;
        },

        toggleVisible(state) {
            state.isVisible = false;
        }
    }
}); 

export const notificationAction = notificationSlice.actions; 

export default notificationSlice;