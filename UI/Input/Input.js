import React, { useRef, useImperativeHandle } from 'react';

import classes from './Input.module.css';

const Input = React.forwardRef((props, ref) => {
    const inputRef = useRef(); 
    
    // const getInputValue = () => inputRef.current.value; 

    const activate = () => inputRef.current.focus(); 

    useImperativeHandle(ref, () => {
        return {
            focus: activate,
        }
    })
    return (
        <div className={ `${classes.control} ${ props.className } ${
            props.hasError ? classes.invalid : ''
        }` }>
            <label htmlFor={ props.id }>{ props.label }</label>
            <input 
                id={ props.id }    
                type={ props.type }
                value={ props.value }
                placeholder={ props.placeholder }
                onChange={ props.onChange }
                onBlur={ props.onBlur }
                ref={ inputRef }
                disabled={ props.disabled ? true : false}
            />
            { props.hasError && <p className={ classes.error }>{ props.errorMessage }</p>}       
        </div>
        
    );
});


export default Input;