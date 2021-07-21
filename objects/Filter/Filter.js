import React, { useState } from 'react';
import DateRangePicker from '@wojtekmaj/react-daterange-picker';


// UI
import Card from '../../UI/Card/Card';
import SelectBox from '../../UI/SelectBox/SelectBox';
import Buttons from '../../UI/Button/ButtonGroup/Buttons';

import classes from './Filter.module.css';
import btnClasses from '../../UI/Button/Button.module.css';


const Filter = (props) => {
    const [value, setValue] = useState([new Date(), new Date()]);
    const [isValueTouched, setIsValueTouched] = useState(false);

    const [type, setType] = useState('thu');

    let filterPattern = isValueTouched ? { type, date: value } : { type }; 

    // EVENT HANDLER
    const onChangeType = (event) => {
        setType(event.target.value);
    }

    const onBlurDatepicker = (event) => {
        setIsValueTouched(true);
    }

    return (
        <Card className={ classes.card }>
            <SelectBox 
                id='type' 
                valuesList={ [
                    {textField: 'Thu', valueField: 'thu'},
                    {textField: 'Chi', valueField: 'chi'}
                ] }
                value={ type || 'thu' }
                onChange={ onChangeType }
            />
                  
            <DateRangePicker
                value={value}
                format={"dd-MM-y"} 
                onChange={ setValue } 
                onBlur={ onBlurDatepicker }         
            />

            <Buttons 
                btnList={ [
                    {
                        className: btnClasses['button-success'], 
                        type: 'submit', 
                        name: 'Tìm kiếm', 
                        onClick: props.onEnableFilter.bind(null, filterPattern),
                        isShown: true,
                    },
                    {
                        className: btnClasses['button-danger'], 
                        type: 'submit',
                        name: 'Xoá bộ lọc',
                        onClick: props.onDisableFilter,      
                        isShown: true,                 
                    }
                ] }
                className={ classes.action }
            />
                  
        </Card>
    );
}


export default Filter;