import { notificationAction } from "./notification-slice"


export const notify = ({message, type, delay}) => {
    return (dispatch) => {
        dispatch(notificationAction.notify({message, type, delay})); 
    }
}

export const goBack = (history) => history.goBack();