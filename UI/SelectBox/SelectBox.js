import React, { useRef } from 'react';

import classes from './SelectBox.module.css';

const SelectBox = (props) => {
    const selectRef = useRef(); 

    const getSelectValue = () => selectRef.current.value();

    return (
        <div className={ `${classes.control} ${props.className}` }>
            <label htmlFor={ props.id }>{ props.label }</label>
            <select
                id='type'
                value={ props.value }
                ref={ selectRef }
                onChange={ props.onChange } 
                onBlur={ props.onBlur }
            >
                { props.valuesList.map((value, index) => (
                    <option 
                        key={ value.valueField }
                        value={ value.valueField }>{ value.textField }</option>
                )) }

            </select>
        </div>

    );
}

export default SelectBox;