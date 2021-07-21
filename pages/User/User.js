import { useEffect, useState } from 'react';
// REACT ROUTER
import { useHistory } from 'react-router';
// REDUX
import { useDispatch, useSelector } from 'react-redux';
import { notificationAction } from '../../stores/notification-slice';
// CUSTOM HOOKS
import useHttp from '../../hooks/use-http'; 
import { getSingle } from '../../helpers/apiHelper';
// COMPONENT
import UserView from '../../objects/Users/ModelView';


const User = (props) => {
    const apiEndpoint = 'user'; 
    // HOOKS
    const history = useHistory();
    const dispatch = useDispatch();

    const {userId} = useSelector(state => state.auth); 
    
    const {info} = useSelector(state => state.user);


    /* 
     * METHOD: GET SINGLE
     */

    // USER
    const [user, setUser] = useState({}); 

    // Get info from redux
    useEffect(() => {
        if (!userId) {
            setUser({}); 
            return; 
        } 

        setUser(info);    

    }, [userId, info]);

    // const updateUserHandler = () => {

    // }



    const notify = ({message, type, delay}) => {
        dispatch(notificationAction.notify({
            message: message, 
            type: type, 
            delay: delay
        }));
    }

    const goBackHandler = () => history.goBack();

    return (
        <UserView 
            userId={ userId }
            user={ user }
            // error={ userError || userInfoError }
            // status={
            //     (readUserStatus === 'completed') || 
            //     (readUserInfoStatus === 'completed') 
            //         ? "completed" : "pending" }
            // onUpdateUser={}
            // onUpdateUserInfo={}
            notify={ notify }
            onGoBack={ goBackHandler }
        />
    );
}


export default User;