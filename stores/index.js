import { configureStore } from "@reduxjs/toolkit";

// SLICE
import authSlice from "./auth/auth-slice";
import balanceSlice from "./balance/balance-slice";
import notificationSlice from "./notification-slice";
import userSlice from "./user/user-slice";
import filterSlice from "./filter/filter-slice";


const appStore = configureStore({
    reducer: {
        auth: authSlice.reducer, 
        user: userSlice.reducer,
        notification: notificationSlice.reducer,
        balance: balanceSlice.reducer,
        filter: filterSlice.reducer
    }
}); 

export default appStore;