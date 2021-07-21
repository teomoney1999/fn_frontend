// REDUX
import { balanceAction } from './balance-slice';
import { notificationAction } from '../notification-slice';
// HELPER
import { getMany, post } from '../../helpers/apiHelper';


const apiEndpoint = 'balance';

export const fetchBalance = (userId) => {
    return async (dispatch) => {
        try {
            const response = await getMany(apiEndpoint, {user_id: userId, get_latest: true}); 

            dispatch(balanceAction.setBalanceInfo(response[0]));

        } catch (error) {
            dispatch(notificationAction.notify({
                message: error.message || "Không thể lấy thông tin số dư", 
                type: 'danger'
            }));
        }
    }
}

export const createBalance = (data) => {
    return async (dispatch) => {
        try {
            await post(apiEndpoint, data); 
            dispatch(balanceAction.afterChanged());
        } catch (error) {
            dispatch(notificationAction.notify({
                message: error.message || "Không thể cập nhật số dư", 
                type: 'danger'
            }));
        }
    }
}