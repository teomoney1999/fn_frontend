// REDUX
import { userAction } from './user-slice';
import { notificationAction } from '../notification-slice';
// HELPER
import { getMany } from '../../helpers/apiHelper';

const apiEndpoint = 'userinfo';

export const getCurrentUserInfo = (token) => {
    return async (dispatch) => {
        try {
            const response = await getMany(apiEndpoint, {token: token}); 

            const userInfo = response[0];

            dispatch(userAction.setUserInfo(userInfo));
        } catch (error) {
            dispatch(notificationAction.notify({
                message: error.message, 
                type: 'danger',
            }));
        }
    }
}