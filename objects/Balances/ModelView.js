import React, { useState, useEffect } from 'react';
// REDUX
// import { useSelector } from 'react-redux';
// UI
import Card from '../../UI/Card/Card';
// import Button from '../../UI/Button/Button';
import Input from '../../UI/Input/Input';
// import SelectBox from '../../UI/SelectBox/SelectBox';
// import LoadingSpinner from '../../../../UI/LoadingSpinner/LoadingSpinner';
import ButtonGroup from '../../UI/Button/ButtonGroup/Buttons';


// CÚSTOM HOOK
import useInput from '../../hooks/use-input';

// HELPER
import validateHelper from '../../helpers/validateHelper';
import formatingHelper from '../../helpers/formatingHelper'; 

// STYLE
import classes from '../AdminForm/ModelView/ModelView.module.css';
import btnClasses from '../../UI/Button/Button.module.css';



const ModelView = (props) => {
    // const { userId } = useSelector(state => state.auth); 

    const [balanceId, setBalanceId] = useState('');
    const [date, setDate] = useState('');
    const [isDelete, setIsDelete] = useState(false);


    const { enteredValue: amount, 
            valueIsValid: amountIsValid,
            hasError: amountHasError, 
            valueChangeHandler: amountChangeHandler, 
            inputBlurHandler: amountInputBlurHanlder,
            fetchValueHandler: amountFetchHandler
            } = useInput(validateHelper.amountValidate);
    
    
    let formIsValid = false;
    if (amountIsValid) {
        formIsValid = true; 
    }

    // FETCH DATA
    const { data } = props;
    console.log('data', data);
    useEffect(() => {   
        const { id: idProp, 
            amount: amountProp,
            date: dateProp,
            } = data;

        setBalanceId(idProp);
        amountFetchHandler(amountProp); 
        setDate(formatingHelper.timestampToDate(dateProp, "DD/MM/YYYY") || formatingHelper.getCurrentTimestamp());
    }, [data]);

    // NOTIFY
    const { error, status } = props;
    useEffect(() => {
        if (status === 'completed' && error) {
            props.notify({message: error, type: 'danger'}); 
        } else if (status === 'completed' && !error) {
            props.notify({message: "Lưu thông tin thành công!", type: "success"});
        } 
    }, [error, status]);

 
    const submitHandler = (event) => {
        event.preventDefault(); 
            
            if (formIsValid){
                if (balanceId) {
                    if (isDelete) {
                        props.onDelete(balanceId);
                        setIsDelete(false);
                }
            } else {
                props.notify({message: "Vui lòng điền đầy đủ thông tin!", type: 'danger'});
            }
        };
    }

    return (
        <Card className={ `${classes.card} ${props.className}` }>
            <h2>Thông tin số dư</h2>
            <form onSubmit={ submitHandler }>
                <div className={`${classes.input} `} >
                    <Input 
                        id='name' 
                        type='text'
                        label={ 'Ngày tạo' }
                        value={ date }
                        className={ classes['card-input'] }
                        disabled={ true }
                        />

                    <Input 
                        id='amount' 
                        type='text'
                        label={ 'Số tiền' }
                        isValid={ amountIsValid }
                        hasError={ amountHasError }
                        value={ amount }
                        onChange={ amountChangeHandler }
                        onBlur={ amountInputBlurHanlder }
                        className={ classes['card-input'] }
                        errorMessage={ "Vui lòng nhập lại số tiền (Lớn hơn 1000 VND)" } 
                        disabled={ true }
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
                        // {
                        //     className: btnClasses['button-success'], 
                        //     type: 'submit', 
                        //     name: 'Lưu thông tin', 
                        //     isShown: true
                        // },
                        {
                            className: btnClasses['button-danger'], 
                            name: 'Xoá thông tin', 
                            type: 'submit',
                            onClick: () => setIsDelete(true),
                            isShown: balanceId ? true : false,
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