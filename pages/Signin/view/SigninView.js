import React, { useEffect } from 'react';

// UI
import Card from '../../../UI/Card/Card'; 
import Input from '../../../UI/Input/Input'; 
import Button from '../../../UI/Button/Button';
import LoadingSpinner from '../../../UI/LoadingSpinner/LoadingSpinner';

// CUSTOM HOOK
import useInput from '../../../hooks/use-input';
import useHttp from '../../../hooks/use-http';

// HELPER
import Helper from '../../../helpers/validateHelper';
// STYLE
import classes from './SigninView.module.css';


const SigninView = (props) => {
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
    
    const { enteredValue: fullname, 
            valueIsValid: fullnameIsValid,
            hasError: fullnameHasError, 
            valueChangeHandler: fullnameChangeHandler, 
            inputBlurHandler: fullnameInputBlurHanlder,
            reset: fullnameReset} = useInput(Helper.fullnameValidate);

    const { enteredValue: phone, 
            valueIsValid: phoneIsValid,
            hasError: phoneHasError, 
            valueChangeHandler: phoneChangeHandler, 
            inputBlurHandler: phoneInputBlurHanlder,
            reset: phoneReset } = useInput(Helper.phoneValidate);

    /**
     * FORM IS VALID ???
     */
    let formIsValid = false;
    if (usernameIsValid && passwordIsValid && fullnameIsValid && phoneIsValid) {
        formIsValid = true;
    }


    const submitHandler = (event) => {
        event.preventDefault(); 
        const data = {
            username: username, 
            password: password, 
            fullname: fullname, 
            phone: phone
        }

        if (formIsValid) {
            props.onAddUser(data);
        }

        usernameReset(); 
        passwordReset();
        fullnameReset();
        phoneReset();
        
    }

    return (
        <Card className={ classes.user }>
            <h1>Đăng ký</h1>
            <form onSubmit={ submitHandler }>
                {/* {props.isLoading && (
                    <div className={classes.loading}>
                        <LoadingSpinner />
                    </div>
                )} */}

                <Input 
                    id='username' 
                    type='text'
                    // ref={ nameInputRef }
                    label={ 'Tên đăng nhập' }
                    isValid={ usernameIsValid }
                    hasError={ usernameHasError }
                    value={ username}
                    onChange={ usernameChangeHandler }
                    onBlur={ usernameInputBlurHanlder }
                    className={ classes['card-input'] }
                    errorMessage={ "Vui lòng nhập lại tên đăng nhập!" } 
                />
                <Input 
                    id='password' 
                    type='password'
                    // ref={ nameInputRef }
                    label={ 'Mật khẩu' }
                    isValid={ passwordIsValid }
                    hasError={ passwordHasError }
                    value={ password }
                    onChange={ passwordChangeHandler }
                    onBlur={ passwordInputBlurHanlder }
                    className={ classes['card-input'] }
                    errorMessage={ "Vui lòng nhập lại mật khẩu!" } 
                />
                <Input 
                    id='name' 
                    type='text'
                    // ref={ nameInputRef }
                    label={ 'Họ và tên' }
                    isValid={ fullnameIsValid }
                    hasError={ fullnameHasError }
                    value={ fullname }
                    onChange={ fullnameChangeHandler }
                    onBlur={ fullnameInputBlurHanlder }
                    className={ classes['card-input'] }
                    errorMessage={ "Vui lòng nhập lại họ và tên!" } 
                />
                <Input 
                    id='phone' 
                    type='text'
                    // ref={ nameInputRef }
                    label={ 'Số điện thoại' }
                    isValid={ phoneIsValid }
                    hasError={ phoneHasError }
                    value={ phone }
                    onChange={ phoneChangeHandler }
                    onBlur={ phoneInputBlurHanlder }
                    className={ classes['card-input'] }
                    errorMessage={ "Vui lòng nhập lại số điện thoại!" } 
                />
                <div className={ classes.action }>
                    <Button 
                        type='submit'
                        className={ classes.btn }>
                            Đăng ký
                    </Button>
                </div>
            </form>
        </Card>
    );
}


export default SigninView;