// REDUX
import { userAction } from './user-slice';
import { notificationAction } from '../notification-slice';
// HELPER
import { getSingle } from '../../helpers/apiHelper';

const apiEndpoint = 'user';

export const getCurrentUserInfo = (token) => {
    return async (dispatch) => {
        try {
            if (!token) return;
            
            console.log('token', token);

            const response = await getSingle(apiEndpoint, token); 

            console.log('userInfo From App.js', response);

            dispatch(userAction.setUserInfo(response));
        } catch (error) {
            dispatch(notificationAction.notify({
                message: error.message, 
                type: 'danger',
            }));
        }
    }
}