import React from 'react';
import ReactDOM from 'react-dom';
// UI
import Card from '../Card/Card';
import classes from './Notification.module.css';

const Notification = (props) => {
    return (
        <Card className={` ${props.className} ${classes.notification} ${
            props.type ? classes[props.type] : ''
        } `}>
            <h4>{ props.message }</h4>
        </Card>
    )
 
}

const PortalNotification = (props) => {
    return (
        <React.Fragment>
            { ReactDOM.createPortal(
                <Notification {...props}/>
            , document.getElementById('backdrop')) 
            }
        </React.Fragment>
    )
}


export default PortalNotification;