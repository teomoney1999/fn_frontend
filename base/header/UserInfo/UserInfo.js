import React from 'react';
import { Link } from 'react-router-dom';
import avaLogo from '../../../assets/avatar.jpg';

import classes from './UserInfo.module.css';

const UserInfo = (props) => {

    return (
        <div className={ classes.UserInfo }>
            <div className={ classes.info }>
                <p>{ props.fullname }</p>
            </div>

            <div className={ classes.avatar }>
                <Link to={'/user'}>
                    <img src={ avaLogo } />
                </Link>               
            </div>
        </div>
    );
}


export default UserInfo;