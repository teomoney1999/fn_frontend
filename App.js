import React, { lazy, Suspense, Fragment, useEffect } from 'react';
import { Route, Switch } from 'react-router';
// REDUX
import { useSelector, useDispatch } from 'react-redux';
import { authAction } from './stores/auth/auth-slice';
import { fetchBalance, createBalance } from './stores/balance/balance-action';
import { getCurrentUserInfo } from './stores/user/user-action';
// CUSTOM HOOK
import useNotification from './hooks/use-notification';

import './App.css';
// UI
import LoadingSpinner from './UI/LoadingSpinner/LoadingSpinner'; 
// const LoadingSpinner = lazy(() => import('./UI/LoadingSpinner/LoadingSpinner'));
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
  const {isLoggedIn, token, userId} = auth; 
  
  // AUTHORIZATION
  useEffect(() => {
    dispatch(authAction.authorized());
  }, [dispatch, authAction.authorized]);

  // USER INFO
  useEffect(() => {
    console.log("Get current user");
    dispatch(getCurrentUserInfo(token));
  }, [dispatch, token]);

  // BALANCE
  const balance = useSelector(state => state.balance); 
  useEffect(() => {
    if (!isLoggedIn) return;
    // CAN I MOVE IT TO SOMEWHERE ELSE (EX: BALANCE FOLDER)
    if (!balance.changed) {
      // FETCH BALANCE
      dispatch(fetchBalance(userId)); 
    } else {
      // CREATE NEW BALANCE
      const payload = {
        amount: balance.amount, 
        user_id: auth.userId,
      }
      dispatch(createBalance(payload));
    }
  }, [isLoggedIn, balance.changed]);


  return (
    <Fragment>
      <Suspense fallback={<LoadingSpinner />}>
        {isNotiVisible && <Notification />}
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
