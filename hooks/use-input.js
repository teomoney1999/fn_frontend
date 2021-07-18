import { useState } from 'react';


const useInput = (validateInputFunc) => {
    const [enteredValue, setEnteredValue] = useState(''); 
    const [isTouched, setIsTouched] = useState(false); 

    const valueIsValid = validateInputFunc(enteredValue.length ? enteredValue.trim() : enteredValue);
    const hasError =  (!valueIsValid && isTouched);

    const valueChangeHandler = (event) => {
        setEnteredValue(event.target.value); 
    }

    const inputBlurHandler = (event) => {
        setIsTouched(true); 
    }

    const fetchValueHandler = (value) => {
        setEnteredValue(value || '');
    }

    const reset = () => {
        setEnteredValue(''); 
        setIsTouched(false);
    }

    return {
        enteredValue, 
        valueIsValid,
        hasError, 
        valueChangeHandler, 
        inputBlurHandler,
        fetchValueHandler,
        reset
    }
}


export default useInput;

