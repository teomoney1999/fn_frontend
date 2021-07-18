import { useEffect } from 'react'; 
import { useDispatch } from 'react-redux';
import useHttp from '../../hooks/use-http';
import { loginApi } from './login-api';
import { authAction } from '../../stores/auth/auth-slice';
import { notificationAction } from '../../stores/notification-slice';
// import { login } from  '../../stores/Auth/auth-action';


import LoginView from './view/LoginView';

const Login = (props) => {
    const dispatch = useDispatch(); 

    const loginHandler = async (username, password) => {
        try {
            console.log('username', username);
            const response = await loginApi({username, password}); 
            dispatch(authAction.login({currentUser: response}));
        } catch (error) {
            dispatch(notificationAction.notify({
                message: "Đăng nhập không thành công", 
                type: "danger"
            }))
        }
    }

    const errorHandler = () => {
        dispatch(notificationAction.notify({
            message: "Vui lòng nhập đủ thông tin.", 
            type: "danger"
        }))
    }

    return (
        <LoginView 
            onLogin={ loginHandler }
            onError={ errorHandler }/>
    );
}


export default Login;