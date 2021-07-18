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

    const userId = useSelector(state => state.auth.userId); 

    const info = useSelector(state => state.user.info);
    const userInfoId = info ? info.id : null; 

    useEffect(() => {

    }, []);

    /* 
     * METHOD: GET SINGLE
     */

    // USER
    const [user, setUser] = useState({}); 

    const { sendRequest: _readUser, 
            // error: userError, status: readUserStatus, 
            data: userData } = useHttp(getSingle.bind(null, apiEndpoint));
    
    useEffect(() => {
        if (!userId) {
            setUser({}); 
            return; 
        } 
        if (!userData) {
            _readUser(userId); 
        } else {
            setUser(userData); 
        }        
    }, [userId, _readUser, userData]);

    const updateUserHandler = () => {

    }

    // USER INFO
    const [userInfo, setUserInfo] = useState({}); 

    const { sendRequest: _readUserInfo, 
        // error: userInfoError, status: readUserInfoStatus, 
        data: userInfoData } = useHttp(getSingle.bind(null, 'userinfo'));

    useEffect(() => {
        if (!userInfoId) {
            setUserInfo({}); 
            return; 
        } 
        if (!userInfoData) {
            _readUserInfo(userInfoId); 
        } else {
            setUserInfo(userInfoData); 
        }        
    }, [userInfoId, _readUserInfo, userInfoData]);

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
            userInfoId={ userInfoId }
            user={ user }
            userInfo={ userInfo }
            // error={ userError || userInfoError }
            // status={
            //     (postStatus === 'completed') || 
            //     (putStatus === 'completed') 
            //         ? "completed" : "pending" }
            // onUpdateUser={}
            // onUpdateUserInfo={}
            notify={ notify }
            onGoBack={ goBackHandler }/>
    );
}


export default User;