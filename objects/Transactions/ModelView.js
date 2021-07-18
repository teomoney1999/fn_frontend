import React, { useState, useRef, useCallback, useEffect } from 'react';
// REDUX
import { useSelector, useDispatch } from 'react-redux';
// UI
import Card from '../../UI/Card/Card';
import Button from '../../UI/Button/Button';
import Input from '../../UI/Input/Input';
import SelectBox from '../../UI/SelectBox/SelectBox';
// import LoadingSpinner from '../../../../UI/LoadingSpinner/LoadingSpinner';
import ButtonGroup from '../../UI/Button/ButtonGroup/Buttons';


// CÚSTOM HOOK
import useInput from '../../hooks/use-input';

// HELPER
import validateHelper from '../../helpers/validateHelper';
import formatingHelper from '../../helpers/formatingHelper'; 
import { isEmpty } from '../../helpers/typeCheckHelper';

// STYLE
import classes from '../AdminForm/ModelView/ModelView.module.css';
import btnClasses from '../../UI/Button/Button.module.css';



const ModelView = (props) => {
    const dispatch = useDispatch();
    const { userId } = useSelector(state => state.auth); 

    const [transactionId, setTransactionId] = useState('');
    const [date, setDate] = useState('');
    const [type, setType] = useState('thu');
    const [isDelete, setIsDelete] = useState(false);

    const { enteredValue: name, 
            valueIsValid: nameIsValid,
            hasError: nameHasError, 
            valueChangeHandler: nameChangeHandler, 
            inputBlurHandler: nameInputBlurHanlder,
            fetchValueHandler: nameFetchHandler,
            reset: nameReset } = useInput(validateHelper.nameValidate);

    const { enteredValue: amount, 
            valueIsValid: amountIsValid,
            hasError: amountHasError, 
            valueChangeHandler: amountChangeHandler, 
            inputBlurHandler: amountInputBlurHanlder,
            fetchValueHandler: amountFetchHandler,
            reset: amountReset } = useInput(validateHelper.amountValidate);
    
    const { enteredValue: description, 
            valueIsValid: descriptionIsValid,
            // hasError: descriptionHasError, 
            valueChangeHandler: descriptionChangeHandler, 
            inputBlurHandler: descriptionInputBlurHanlder,
            fetchValueHandler: descriptionFetchHandler,
            reset: descriptionReset } = useInput((description) => true);
    
    let formIsValid = false;
    if (nameIsValid && amountIsValid && descriptionIsValid) {
        formIsValid = true; 
    }

    // FETCH DATA
    const { transaction, urlParam } = props;
    useEffect(() => {   
        const { id: idProp, 
            name: nameProp, 
            amount: amountProp,
            type: typeProp,
            date: dateProp,
            description: descriptionProp, 
            } = transaction;

        setTransactionId(idProp);
        nameFetchHandler(nameProp); 
        amountFetchHandler(amountProp); 
        descriptionFetchHandler(descriptionProp); 
        setType(typeProp || 'thu');               // need a default value
        setDate(dateProp || formatingHelper.getCurrentTimestamp());
    }, [transaction]);

    // NOTIFY
    const { error, status } = props;
    useEffect(() => {
        if (status === 'completed' && error) {
            dispatch(props.notify({message: error, type: 'danger'})); 
        } else if (status === 'completed' && !error) {
            dispatch(props.notify({message: "Lưu thông tin thành công!", type: "success"}));
        } 
    }, [error, status]);

    /**
     * USE REF
     */
    const nameInputRef = useRef(); 
    const amountInputRef = useRef(); 
 
    /**
     * Event Handler
     */
    const onChangeType = useCallback((event) => {
        setType(event.target.value);
    }, []);

    const submitHandler = (event) => {
        event.preventDefault(); 
        
        /**
         * Save info 
         */        
        const data = {
            name: name, 
            transaction_type: type, 
            amount: parseInt(amount), 
            description: description,
            user_id: userId,
        }
        
        if (formIsValid){
            if (transactionId) {
                if (isDelete) {
                    props.onDeleteTransaction(transactionId);
                    setIsDelete(false);
                } else {
                    props.onUpdateTransaction(transactionId, data);
                }          
            } else {
                props.onCreateTransaction(data);
            }  
            /**
             * Reset input 
             */
            nameReset();
            amountReset();
            setType('thu'); 
            descriptionReset();
        } else {
            dispatch(props.notify({message: "Vui lòng điền đầy đủ thông tin!", type: 'danger'}));
        }
    };

    return (
        <Card className={ `${classes.card} ${props.className}` }>
            <h2>Thông tin giao dịch</h2>
            <form onSubmit={ submitHandler }>
                <div className={`${classes.input} `} >
                    <Input 
                        id='name' 
                        type='text'
                        ref={ nameInputRef }
                        label={ 'Tên giao dịch' }
                        isValid={ nameIsValid }
                        hasError={ nameHasError }
                        value={ name }
                        onChange={ nameChangeHandler }
                        onBlur={ nameInputBlurHanlder }
                        className={ classes['card-input'] }
                        errorMessage={ "Vui lòng nhập lại tên giao dịch!" } 
                        />

                    <Input 
                        id='amount' 
                        type='text'
                        ref={ amountInputRef }
                        label={ 'Số tiền' }
                        isValid={ amountIsValid }
                        hasError={ amountHasError }
                        value={ amount }
                        onChange={ amountChangeHandler }
                        onBlur={ amountInputBlurHanlder }
                        className={ classes['card-input'] }
                        errorMessage={ "Vui lòng nhập lại số tiền (Lớn hơn 1000 VND)" } 
                        />
                </div>

                <div className={`${classes.input} `} >
                    <SelectBox 
                        id='type' 
                        label={ 'Loại giao dịch' }
                        valuesList={ [
                            {textField: 'Thu', valueField: 'thu'},
                            {textField: 'Chi', valueField: 'chi'}
                        ] }
                        value={ type }
                        onChange={ onChangeType }
                        className={ classes['card-input'] }
                    />
        
                    <Input 
                        id='description' 
                        type='text'
                        value={ description }
                        isValid={ true }
                        hasError={ false }
                        label={ 'Mô tả' }
                        onChange={ descriptionChangeHandler }
                        onBlur={ descriptionInputBlurHanlder }
                        className={ classes['card-input'] }
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
                        {
                            className: btnClasses['button-danger'], 
                            name: 'Xoá thông tin', 
                            type: 'submit',
                            onClick: () => setIsDelete(true),
                            isShown: transactionId ? true : false,
                        }
                    ] }
                    className={ classes.action }
                />
                
            </form>
        </Card>

    );
}


// export default TransactionItemView;
export default React.memo(ModelView);