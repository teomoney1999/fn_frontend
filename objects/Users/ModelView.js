import React, { useState, useEffect, Fragment } from 'react';

// UI
import Card from '../../UI/Card/Card';
// import Button from '../../UI/Button/Button';
import Input from '../../UI/Input/Input';
import SelectBox from '../../UI/SelectBox/SelectBox';
// import LoadingSpinner from '../../../../UI/LoadingSpinner/LoadingSpinner';
import ButtonGroup from '../../UI/Button/ButtonGroup/Buttons';

// CÚSTOM HOOK
import useInput from '../../hooks/use-input';

// HELPER
import validateHelper from '../../helpers/validateHelper';

// STYLE
import classes from '../AdminForm/ModelView/ModelView.module.css';
import btnClasses from '../../UI/Button/Button.module.css';



const ModelView = (props) => {
    const { userId, userInfoId, error, status, userInfo, user } = props; 

    /**
     * AUTH FORM
     */
    const { enteredValue: username, 
        valueIsValid: usernameIsValid,
        hasError: usernameHasError, 
        valueChangeHandler: usernameChangeHandler, 
        inputBlurHandler: usernameInputBlurHanlder,
        fetchValueHandler: usernameFetchHandler,
        reset: usernameReset } = useInput(validateHelper.usernameValidate);

    const { enteredValue: password, 
        valueIsValid: passwordIsValid,
        hasError: passwordHasError, 
        valueChangeHandler: passwordChangeHandler, 
        inputBlurHandler: passwordInputBlurHanlder,
        fetchValueHandler: passwordFetchHandler,
        reset: passwordReset } = useInput(validateHelper.passwordValidate);
    
    let authFormIsValid = false;
    if (usernameIsValid && passwordIsValid) {
        authFormIsValid = true; 
    }

    // FETCH DATA
    useEffect(() => {   
        if (!user) return;
       
        const { username: usernameProp } = user;

        usernameFetchHandler(usernameProp); 
    }, [user]);

    const submitAuthForm = (event) => {
        event.preventDefault(); 
       
        const data = {
            username: username,
            password: password, 
            user_id: userId,
        }
        
        if (authFormIsValid){
            if (userId) {
                props.onUpdateUser(userId, data);         
            } 
  
            usernameReset(); 
            passwordReset();
        } else {
            props.notify({message: "Vui lòng điền đầy đủ thông tin!", type: 'danger'});
        }
    };

    /**
     * INFO FORM
     */

    const { enteredValue: fullname, 
        valueIsValid: fullnameIsValid,
        hasError: fullnameHasError, 
        valueChangeHandler: fullnameChangeHandler, 
        inputBlurHandler: fullnameInputBlurHanlder,
        fetchValueHandler: fullnameFetchHandler,
        reset: fullnameReset } = useInput(validateHelper.fullnameValidate);
    
    const { enteredValue: email, 
        valueIsValid: emailIsValid,
        hasError: emailHasError, 
        valueChangeHandler: emailChangeHandler, 
        inputBlurHandler: emailInputBlurHanlder,
        fetchValueHandler: emailFetchHandler,
        reset: emailReset } = useInput(validateHelper.emailValidate);

    const { enteredValue: phone, 
        valueIsValid: phoneIsValid,
        hasError: phoneHasError, 
        valueChangeHandler: phoneChangeHandler, 
        inputBlurHandler: phoneInputBlurHanlder,
        fetchValueHandler: phoneFetchHandler,
        reset: phoneReset } = useInput(validateHelper.phoneValidate);

    const [gender, setGender] = useState('nam');

    let infoFormIsValid = false;
    if (fullnameIsValid && emailIsValid && phoneIsValid) {
        infoFormIsValid = true; 
    }

    // FETCH DATA
    useEffect(() => {   
        if (!userInfo) return; 
        
        const { fullname, gender, email, phone } = userInfo;

        fullnameFetchHandler(fullname); 
        setGender(gender);
        emailFetchHandler(email);
        phoneFetchHandler(phone);

    }, [userInfo]);

    const onGenderChange = (event) => {
        setGender(event.target.value());
    }

    const submitInfoForm = (event) => {
        event.preventDefault(); 
             
        const data = {
            fullname: fullname, 
            email: email, 
            phone: phone, 
            gender: gender,
            user_id: userId,
        }
        
        if (infoFormIsValid){ 
            props.onUpdateUserInfo(userInfoId, data);
    
            /**
             * Reset input 
             */
            fullnameReset();
            emailReset();
            phoneReset(); 
            setGender('nam');
        } else {
            props.notify({message: "Vui lòng điền đầy đủ thông tin!", type: 'danger'});
        }
    };

    const submitHandler = (event) => {
        event.preventDefault(); 

        // AUTH FORM
        const authData = {
            username: username,
            password: password, 
            // user_id: userId
        }

        const infoData = {
            fullname: fullname, 
            email: email, 
            phone: phone, 
            gender: gender,
            // user_id: userId,
        }

        if (authFormIsValid && infoFormIsValid) {
            if (userId && userInfoId) {
                // PUT
                props.onUpdateUser(userId, {...authData, user_id: userId});  
                props.onUpdateUserInfo(userInfoId, {...infoData, user_id: userId});
            } else {
                // POST
                const data = {...authData, userinfo: {...infoData}}
                props.onCreateUser(data);
            }

            /**
             * Reset input 
             */
             usernameReset(); 
             passwordReset();
 
             fullnameReset();
             emailReset();
             phoneReset(); 
             setGender('nam');
        } else {
            props.notify({message: "Vui lòng điền đầy đủ thông tin!", type: 'danger'});
        }
    };

    // NOTIFY
    useEffect(() => {
        if (status === 'completed' && error) {
            props.notify({message: error, type: 'danger'}); 
        } else if (status === 'completed' && !error) {
            props.notify({message: "Lưu thông tin thành công!", type: "success"});
        } 
    }, [error, status]);


    return (
        <Fragment>
            {/* <Card className={ `${classes.card} ${props.className}` }>
                <h2>Thông tin đăng nhập</h2>
                <form onSubmit={ submitAuthForm }>
                    <div className={`${classes.input} `} >
                        <Input 
                            id='username' 
                            type='text'
                            // ref={ nameInputRef }
                            label={ 'Tên đăng nhập' }
                            isValid={ usernameIsValid }
                            hasError={ usernameHasError }
                            value={ username }
                            onChange={ usernameChangeHandler }
                            onBlur={ usernameInputBlurHanlder }
                            className={ classes['card-input'] }
                            errorMessage={ "Vui lòng nhập lại tên đăng nhập!" } 
                            />
                        <Input 
                            id={ 'passwordLogin' }
                            type={ 'password' }
                            label={ 'Mật khẩu' }
                            isValid={ passwordIsValid }
                            hasError={ passwordHasError }
                            value={ password }
                            onChange={ passwordChangeHandler }
                            onBlur={ passwordInputBlurHanlder }
                            // ref={ passwordInputRef }
                            className={ classes['card-input'] }
                            errorMessage={ "Vui lòng nhập lại mật khẩu" } />
                    </div>

                    <ButtonGroup 
                        btnList={ [
                            {
                                className: btnClasses['button-light'],
                                onClick: props.onGoBack, 
                                name: 'Quay lại', 
                                isShown: true,
                            }, 
                            {
                                className: btnClasses['button-success'], 
                                type: 'submit', 
                                name: 'Lưu thông tin', 
                                isShown: true
                            },
                        ] }
                        className={ classes.action }
                    />
                </form>
            </Card>
            <Card className={ `${classes.card} ${props.className}` }>
                <h2>Thông tin người dùng</h2>
                <form onSubmit={ submitInfoForm }>
                    <div className={`${classes.input} `} >
                        <Input 
                            id='fullname' 
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
                        
                        <SelectBox 
                            id='gender' 
                            label={ 'Giới tính' }
                            valuesList={ [
                                {textField: 'Nam', valueField: 'nam'},
                                {textField: 'Nữ', valueField: 'nu'},
                                {textField: 'Khác', valueField: 'khac'},
                            ] }
                            value={ gender }
                            onChange={ onGenderChange }
                            className={ classes['card-input'] }
                        />
                    </div>

                    <div className={`${classes.input} `} >
                        <Input 
                            id={ 'email' }
                            type={ 'email' }
                            label={ 'Email' }
                            isValid={ emailIsValid }
                            hasError={ emailHasError }
                            value={ email }
                            onChange={ emailChangeHandler }
                            onBlur={ emailInputBlurHanlder }
                            // ref={ passwordInputRef }
                            className={ classes['card-input'] }
                            errorMessage={ "Vui lòng nhập lại email" } />
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
                    </div>

                    <ButtonGroup 
                        btnList={ [
                            {
                                className: btnClasses['button-light'],
                                onClick: props.onGoBack, 
                                name: 'Quay lại', 
                                isShown: true,
                            }, 
                            {
                                className: btnClasses['button-success'], 
                                type: 'submit', 
                                name: 'Lưu thông tin', 
                                isShown: true
                            },
                        ] }
                        className={ classes.action }
                    />
                    
                </form>
            </Card> */}


                
            <form onSubmit={ submitHandler }>
                <Card className={ `${classes.card} ${props.className}` }>
                    <h2>Thông tin đăng nhập</h2>
                    <div className={`${classes.input} `} >
                        <Input 
                            id='username' 
                            type='text'
                            // ref={ nameInputRef }
                            label={ 'Tên đăng nhập' }
                            isValid={ usernameIsValid }
                            hasError={ usernameHasError }
                            value={ username }
                            onChange={ usernameChangeHandler }
                            onBlur={ usernameInputBlurHanlder }
                            className={ classes['card-input'] }
                            errorMessage={ "Vui lòng nhập lại tên đăng nhập!" } 
                            />
                        <Input 
                            id={ 'passwordLogin' }
                            type={ 'password' }
                            label={ 'Mật khẩu' }
                            isValid={ passwordIsValid }
                            hasError={ passwordHasError }
                            value={ password }
                            onChange={ passwordChangeHandler }
                            onBlur={ passwordInputBlurHanlder }
                            // ref={ passwordInputRef }
                            className={ classes['card-input'] }
                            errorMessage={ "Vui lòng nhập lại mật khẩu" } />
                    </div>
             
            </Card>
            <Card className={ `${classes.card} ${props.className}` }>
                <h2>Thông tin người dùng</h2>
                    <div className={`${classes.input} `} >
                        <Input 
                            id='fullname' 
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
                        
                        <SelectBox 
                            id='gender' 
                            label={ 'Giới tính' }
                            valuesList={ [
                                {textField: 'Nam', valueField: 'nam'},
                                {textField: 'Nữ', valueField: 'nu'},
                                {textField: 'Khác', valueField: 'khac'},
                            ] }
                            value={ gender }
                            onChange={ onGenderChange }
                            className={ classes['card-input'] }
                        />
                    </div>

                    <div className={`${classes.input} `} >
                        <Input 
                            id={ 'email' }
                            type={ 'email' }
                            label={ 'Email' }
                            isValid={ emailIsValid }
                            hasError={ emailHasError }
                            value={ email }
                            onChange={ emailChangeHandler }
                            onBlur={ emailInputBlurHanlder }
                            // ref={ passwordInputRef }
                            className={ classes['card-input'] }
                            errorMessage={ "Vui lòng nhập lại email" } />
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
                    </div>

                    <ButtonGroup 
                        btnList={ [
                            {
                                className: btnClasses['button-light'],
                                onClick: props.onGoBack, 
                                name: 'Quay lại', 
                                isShown: true,
                            }, 
                            {
                                className: btnClasses['button-success'], 
                                type: 'submit', 
                                name: 'Lưu thông tin', 
                                isShown: true
                            },
                        ] }
                        className={ classes.action }
                    />
                </Card>   
            </form>
            
        </Fragment>
        

    );
}


// export default TransactionItemView;
export default React.memo(ModelView);