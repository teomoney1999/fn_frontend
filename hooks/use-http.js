import { useReducer, useCallback } from "react";

const httpReducer = (state, action) => {
    if (action.type === 'SUCCESS') {
        return {
            status: "completed", 
            data: action.responseData, 
            error: null, 
        }
    } else if (action.type === 'FAILED') {
        return {
            status: "completed", 
            data: null, 
            error: action.errorMessage, 
        }
    } 
    return {
        status: 'pending', 
        error: null, 
        data: null
    }
}


const useHttp = (requestFunction) => {
    const [httpState, dispatchHttpState] = useReducer(httpReducer, {
        status: "pending", 
        data: null, 
        error: null,
    });

    const sendRequest = useCallback(async (requestData) => {
        try {
            const responseData = await requestFunction(requestData); 
            dispatchHttpState({ type: 'SUCCESS', responseData: responseData }); 
        } catch (error) {
            dispatchHttpState({ type: 'FAILED', errorMessage: error.message });
        }
    }, []);

    return {
        ...httpState, 
        sendRequest
    }

}

export default useHttp;