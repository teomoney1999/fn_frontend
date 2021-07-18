import React, { Fragment } from "react";
import ReactDOM from "react-dom";
// REDUX
// import { useSelector } from "react-redux";
// COMPONENT
import NavItem from "./NavItem/Item";
// UI
import Backdrop from "../../UI/Backdrop/Backdrop";

import classes from './Nav.module.css';

const NavOverlay = (props) => {
    // console.log('auth', useSelector(state => state.auth));
    return (
        <div className={ classes.nav }>
            <div className={ classes.greeding}>
                <h2>Hello</h2>
                <h3>{ props.fullname }</h3>
            </div>
            <NavItem 
                img={<i className="fa fa-usd" aria-hidden="true"></i>} 
                name='Dashboard'
                destination=''
                style={ {textDecoration: 'none'} } 
                onClick={props.onClose}/>
            <NavItem 
                img={<i className="fa fa-usd" aria-hidden="true"></i>} 
                name='Quản lý giao dịch'
                destination='transactions' 
                className={ classes.navItem }
                style={ {textDecoration: 'none'} } 
                onClick={props.onClose}/> 
            <NavItem 
                img={<i className="fa fa-usd" aria-hidden="true"></i>} 
                name='Quản lý số dư'
                destination='balances' 
                className={ classes.navItem }
                style={ {textDecoration: 'none'} } 
                onClick={props.onClose}/> 
        </div>
    );
}

const Nav = (props) => {
    return (
       <Fragment>
            { ReactDOM.createPortal(<Backdrop onClose={props.onClose}/>, 
                                    document.getElementById('backdrop'))}
            { ReactDOM.createPortal(<NavOverlay {...props.userInfo} onClose={props.onClose}/>, 
                                    document.getElementById('backdrop'))}
       </Fragment>
    )
}


export default React.memo(Nav);