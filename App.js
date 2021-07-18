import React, { lazy, Suspense, Fragment, useEffect } from 'react';
import { Route, Switch } from 'react-router';
// REDUX
import { useSelector, useDispatch } from 'react-redux';
import { authAction } from './stores/auth/auth-slice';
import { fetchBalance, createBalance } from './stores/balance/balance-action';
import { getCurrentUserInfo } from './stores/user/user-action';
// CUSTOM HOOK
import useNotification from './hooks/use-notification';

// UI
import LoadingSpinner from './UI/LoadingSpinner/LoadingSpinner'; 
import './App.css';

// COMPONENT
const Login = lazy(() => import('./pages/Login/Login'));
const Signin = lazy(() => import('./pages/Signin/Signin'));
const Layout = lazy(() => import('./base/layout/layout'));
const Notification = lazy(() => import('./base/notification/Notification'));

function App() {
  const dispatch = useDispatch();

  const isNotiVisible = useNotification();
  
  const auth = useSelector(state => state.auth); 
  const { info } = useSelector(state => state.user);
 
  const {isLoggedIn, token} = auth; 
  
  // AUTHORIZATION
  useEffect(() => {
    dispatch(authAction.authorized());
  }, [dispatch, authAction.authorized]);

  // USER INFO
  useEffect(() => {
    dispatch(getCurrentUserInfo(token))
  }, [token]);

  // BALANCE
  const balance = useSelector(state => state.balance); 
  useEffect(() => {
    // CAN I MOVE IT TO SOMEWHERE ELSE (EX: BALANCE FOLDER)
    if (!balance.changed) {
      // FETCH BALANCE
      dispatch(fetchBalance()); 
    } else {
      // CREATE NEW BALANCE
      const payload = {
        amount: balance.amount, 
        user_id: auth.userId,
      }
      dispatch(createBalance(payload));
    }
  }, [balance.changed]);


  return (
    <Fragment>
      {isNotiVisible && <Notification />}

      <Suspense fallback={<LoadingSpinner />}>
        <Switch>
          { !isLoggedIn && <Route path='/signin' render={ props => <Signin />} />}
          
          { isLoggedIn && <Layout /> }

          { !isLoggedIn && <Route path='*' render={ props => <Login />} />}
        </Switch>  
      </Suspense>   
    </Fragment>
  );
}

export default App;
