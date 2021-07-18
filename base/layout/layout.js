import { Fragment } from "react";
// import { useSelector } from "react-redux";

// COMPONENT
import MainHeader from '../header/MainHeader/Header';
import Content from "../content/Content";


// STYLE
import classes from './layout.module.css';

const Layout = (props) => {
    return ( 
        <Fragment>
            <MainHeader />
            
            <div className={ classes['body-container'] }>
                <Content />
            </div>
            
        </Fragment>
    );
}


export default Layout;