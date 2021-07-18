import React from 'react';
import {useSelector} from 'react-redux';

import Card from '../../../UI/Card/Card';
import Helper from '../../../helpers/formatingHelper';
import classes from './Balance.module.css';


const Balance = (props) => {
    const balance = useSelector(state => state.balance.amount);

    return (
        <Card className={ `${classes.card} ${props.className}`}>
            <div>
                <h2>Số dư</h2>
                <div className={ classes.balance }>{ Helper.currencyFormating(props.balance || balance) }</div>
            </div>        
        </Card>

    );
}


export default Balance;