import { createSlice } from "@reduxjs/toolkit";

const balanceSlice = createSlice({
    name: 'balance', 
    initialState: {
        amount: 0,         // the latest balance
        info: null,
        changed: false,
    }, 
    reducers: {
        add(state, action) {
            state.amount += action.payload.amount;
            state.changed = true; 
        }, 
        sub(state, action) {
            state.amount -= action.payload.amount; 
            state.changed = true;
        }, 
        setBalanceInfo(state, action) {
            state.info = action.payload; 
            state.amount = parseInt(state.info.amount); 
        },
        setBalanceAmount(state, action) { 
            state.amount = action.payload;
        },
        afterChanged(state, action) {
            state.changed = false; 
        }
    }
});

export default balanceSlice; 

export const balanceAction = balanceSlice.actions; 