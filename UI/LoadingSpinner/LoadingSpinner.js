import { Fragment } from 'react';
import ReactDOM from 'react-dom';
import Backdrop from '../Backdrop/Backdrop';
import classes from './LoadingSpinner.module.css';

const LoadingSpinner = () => {
  return <div className={classes.spinner}></div>;
}

const PortalLoadingSpinner = () => {
  return (
    <Fragment>
      {ReactDOM.createPortal(<LoadingSpinner />, 
                                document.getElementById("backdrop"))}
      { ReactDOM.createPortal(<Backdrop />, 
                                document.getElementById('backdrop'))}
        
    </Fragment>
    
  );
}
export default PortalLoadingSpinner;
