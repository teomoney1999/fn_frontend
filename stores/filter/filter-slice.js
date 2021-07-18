import { createSlice } from "@reduxjs/toolkit";

import formattingHelper from '../../helpers/formatingHelper';


const initialFilter = {
    filterPattern: {}, filteredData: [], isTriggerFilter: false, data: [], 
};


const filterSlice = createSlice({
    name: 'filter', 
    initialState: initialFilter, 
    reducers: {
        setFilterPattern(state, action) {
            state.filterPattern = action.payload.filteredPattern;
        }, 
        setFilteredData(state, action) {  
            if (state.isTriggerFilter) {
                const { type, date } = action.payload.condition;
                const condition = action.payload.condition;
                // Need to move to Filter component
                const filterFunc = (item) => {
                    if (condition.hasOwnProperty('type') && condition.hasOwnProperty('date')) {
                        return (item.transaction_type === type) && ((item.date >= date[0]) && (item.date <= date[1]))
                    }

                    else if (condition.hasOwnProperty('type')) {
                        return (item.transaction_type === type)
                    }

                    else if (condition.hasOwnProperty('date')) {
                        return (item.date >= date[0]) && (item.date <= date[1]);
                    }
                };
  
                state.filteredData = state.data.filter(filterFunc);
            } else {
                state.filteredData = state.data;
            }
        },
        setData(state, action) {
            state.data = action.payload;
        },
        setTriggerFilter(state, action) {
            state.isTriggerFilter = action.payload.triggerFilter;
        }
    }
});

export const filterAction = filterSlice.actions;

export default filterSlice;





