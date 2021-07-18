import React from 'react';

// UI
import Card from '../Card/Card';
import Button from '../Button/Button';


import classes from './ErrorModal.module.css';

const ErrorModal = (props) => {
    return (
        <Card>
            <header>
                <h1>{ props.title }</h1>
            </header>
            <div>
                <p>{ props.message }</p>
            </div>
            <footer>
                <Button
                    handleClick={ props.handleClick }>
                        Đã hiểu
                    </Button>
            </footer>
        </Card>

    );
}


export default ErrorModal;