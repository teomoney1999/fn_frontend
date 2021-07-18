import React, { useState, useRef } from 'react';
// REACT ROUTER
import { useHistory, Link } from 'react-router-dom';

// REDUX
// import { useSelector } from "react-redux";

// CUSTOM HOOK
import useInput from '../../../hooks/use-input';

// UI
import Card from '../../../UI/Card/Card';
import Input from '../../../UI/Input/Input';
import Button from '../../../UI/Button/Button';
import LoadingSpinner from '../../../UI/LoadingSpinner/LoadingSpinner';

import Helper from '../../../helpers/validateHelper';

import logo  from '../../../assets/app_logo.jpeg';

import classes from './LoginView.module.css';

 
const LoginView = (props) => {
    const history = useHistory();

    // CUSTOM HOOK
    const { enteredValue: username, 
            valueIsValid: usernameIsValid,
            hasError: usernameHasError, 
            valueChangeHandler: usernameChangeHandler, 
            inputBlurHandler: usernameInputBlurHanlder,
            reset: usernameReset } = useInput(Helper.usernameValidate);

    const { enteredValue: password, 
            valueIsValid: passwordIsValid,
            hasError: passwordHasError, 
            valueChangeHandler: passwordChangeHandler, 
            inputBlurHandler: passwordInputBlurHanlder,
            reset: passwordReset } = useInput(Helper.passwordValidate);
    
    let formIsValid = false;
    if (usernameIsValid && passwordIsValid) {
        formIsValid = true;
    }

    const [isLoading, setIsLoading] = useState(false);

    /**
     * USE REF
     */
    const usernameInputRef = useRef(); 
    const passwordInputRef = useRef(); 

    /**
     * EVENT HANDLER
     */
    const submitHandler = (event) => {
        event.preventDefault(); 
        setIsLoading(true);
        
        if (formIsValid){
            props.onLogin(username, password);
            history.replace('/');
        } else {
            props.onError();
        }
      
        usernameReset();
        passwordReset();
    }


    return (
        <React.Fragment>
            { isLoading && <LoadingSpinner /> }

            <Card className={ `${classes.login} ${props.className}` }>
                <img 
                    src={ logo } 
                    alt={"Logo"} />

                <h2>Đăng nhập</h2>

                <form onSubmit={ submitHandler }>
                    <Input 
                        id={ 'username '}
                        type={ 'text' } 
                        label={ 'Tên đăng nhập' }
                        isValid={ usernameIsValid }
                        hasError={ usernameHasError }
                        value={ username }
                        onChange={ usernameChangeHandler }
                        onBlur={ usernameInputBlurHanlder }
                        ref={ usernameInputRef }
                        errorMessage={ "Vui lòng nhập lại tên đăng nhập" } />

                    <Input 
                        id={ 'passwordLogin' }
                        type={ 'password' }
                        label={ 'Mật khẩu' }
                        isValid={ passwordIsValid }
                        hasError={ passwordHasError }
                        value={ password }
                        onChange={ passwordChangeHandler }
                        onBlur={ passwordInputBlurHanlder }
                        ref={ passwordInputRef }
                        errorMessage={ "Vui lòng nhập lại mật khẩu" } />
                        
                    <div className={ classes.action }>
                        <Button 
                            type='submit'
                            className={ classes.btn }>
                                Đăng nhập
                        </Button>
                    
                    </div>
                    <div className={ classes.redirect }>
                        <Link to={'/signin'}>
                            <p>Bạn chưa có tài khoản. Click vào đây để đăng ký ngay!</p>
                        </Link>
                    </div>
                </form>
            </Card>
        </React.Fragment>
    );
}


export default LoginView;