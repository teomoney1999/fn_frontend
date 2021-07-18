import React from 'react';
import ReactDOM from 'react-dom'; 
import { Link } from 'react-router-dom';

import classes from './Button.module.css';

const Button = (props) => {
    // console.log('Button RENDERED', props.children);
    return (
        <button 
            className={ `${classes.button} ${props.className}` }
            type={ props.type || "button" }
            onClick={ props.handleClick }>
                { props.children }
        </button>

    );
}

export const PortalButton = (props) => {
    return (
        <React.Fragment>
            { ReactDOM.createPortal(
                <Button className={ classes.portalBtn }>
                     <Link to={ props.redirectTo} >
                        <i className="fa fa-plus" aria-hidden="true" style={{color: 'white', fontSize: '1.25rem'}}></i>
                    </Link>
                </Button>
            , document.getElementById('backdrop')) 
            }
        </React.Fragment>
    );
}

export default React.memo(Button);