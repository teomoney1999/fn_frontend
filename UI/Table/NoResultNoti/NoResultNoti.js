import React from 'react';


import classes from './NoResultNoti.module.css';

const NoResultNoti = (props) => {
    return (
        <td 
            className={ classes.noti }
            colSpan={ props.colSpan }>
                { props.lang === "en" ? 
                    "No record found" : "Không có dữ liệu" }
        </td>

    );
}


export default NoResultNoti;