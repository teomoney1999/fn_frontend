import { authAction } from "./auth-slice";

export const getCurrentUserInfo = (history) => {
    return async (dispatch) => {
        try {
            const currentUser = await getCurrentUserApi(); 
            dispatch(authAction.setCurrentUser({currentUser: currentUser}));
        } catch (error) {
            console.log("REDIRECT TO LOGIN");
            history.replace('/login');
        }
    }
}