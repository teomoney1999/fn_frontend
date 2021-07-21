import { useEffect } from 'react'; 
// CUSTOM HOOKS
// import useHttp from '../../hooks/use-http';
// REACT ROUTER
import { useHistory } from 'react-router';
// REDUX
import { useDispatch } from 'react-redux';

import { authAction } from '../../stores/auth/auth-slice';
import { notificationAction } from '../../stores/notification-slice';

import { loginApi } from './login-api';
// import { login } from  '../../stores/Auth/auth-action';


import LoginView from './view/LoginView';

const Login = (props) => {
    // HOOKS
    const history = useHistory();
    const dispatch = useDispatch(); 

    const loginHandler = async (username, password) => {
        try {
            const response = await loginApi({username, password}); 
            
            dispatch(authAction.login({currentUser: response}));
            
            history.replace('/');
        } catch (error) {
            dispatch(notificationAction.notify({
                message: "Đăng nhập không thành công", 
                type: "danger"
            }))
        }
    }

    const notify = ({message, type, delay}) => {
        dispatch(notificationAction.notify({
            message: message, 
            type: type, 
            delay: delay
        }));
    }

    const goBackHandler = () => history.goBack();



    return (
        <LoginView 
            onLogin={ loginHandler }
            notify={ notify }
            onGoBack={ goBackHandler }
            />
    );
}


export default Login;