import { useReducer } from 'react';
import { NavLink, useRouteMatch } from 'react-router-dom';
import classes from './Item.module.css';

const NavItem = (props) => {
    const match = useRouteMatch();
    
    return (
        <NavLink 
            className={ classes.NavItem} 
            to={`${match.url}${props.destination}`}
            activeClassName={ classes.active } 
            style={ props.style }
            onClick={props.onClick} exact>
                <div className={ classes.img} >
                    { props.img }
                </div>
                <div className={ classes.title}>
                    { props.name }
                </div>

        </NavLink>
    )
}


export default NavItem;