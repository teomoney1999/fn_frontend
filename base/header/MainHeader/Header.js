import React, { Fragment, useState } from 'react';
// REDUX 
import { useSelector } from 'react-redux';
// COMPONENT
import UserInfo from '../UserInfo/UserInfo';
import Nav from '../../nav/Nav';

// UI
import Button from '../../../UI/Button/Button';
import {PortalButton} from "../../../UI/Button/Button";
import classes from './Header.module.css';

const Header = (props) => {
    // const dispatch = useDispatch();

    // const navIsVisible = useSelector(state => state.ui.navIsVisible);
    const [navIsVisible, setNavIsVisible] = useState(false);
    const [isPortalButtonShown, setIsPortalButtonShown] = useState(true);
    const {info: userInfo} = useSelector(state => state.user); 

    const toggleNavVisible = (event) => {
        setNavIsVisible( prevState => !prevState);
    }


    return (
        <Fragment>
            <header className={ classes.Header } style={{'color': 'white'}}>
                <Button 
                    handleClick={ toggleNavVisible }
                    className={ classes.navBtn }>
                        <i className="fa fa-bars" aria-hidden="true"></i>
                </Button>
                
                <UserInfo {...userInfo}/>
                
            </header>
            { navIsVisible ? <Nav userInfo={ userInfo } onClose={ toggleNavVisible }/> : ''}
            { isPortalButtonShown && <PortalButton redirectTo={'/transaction'}/>}
        </Fragment>
    );
}


export default React.memo(Header);