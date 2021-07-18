import React from 'react';
import ReactDOM from 'react-dom'; 
import { Link } from 'react-router-dom';

import Button from '../Button';

import classes from './Buttons.module.css';

const Buttons = (props) => {
    /**
     * props: 
     *  - Each button = {} => props = [{}, {}, {}]
     *  - {
     *      name, 
     *      onClick, 
     *      type, 
     *      className, 
     *      isShown
     *  }
     */
    return (
        <div className={ `${classes.btnGroup} ${props.className}` }>
            { props.btnList.map(btn => 
                (btn.isShown) && 
                    <Button
                        key={ btn.name }
                        type={ btn.type || 'button'}
                        className={ btn.className }
                        handleClick={ btn.onClick }>
                            { btn.name }
                    </Button>
            ) }
        </div>

    );
}


export default React.memo(Buttons);