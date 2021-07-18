import { Fragment, lazy } from 'react';
import { Route, Switch } from 'react-router-dom';

const Dashboard = lazy(() => import('../../pages/Dashboard/Dashboard'));
const Transaction = lazy(() => import('../../pages/Transactions/Transaction'))
const Transactions = lazy(() => import('../../pages/Transactions/Transactions'));
const Balance = lazy(() => import('../../pages/Balances/Balance'));
const Balances = lazy(() => import('../../pages/Balances/Balances'));
const User = lazy(() => import('../../pages/User/User'));
// const Filter = lazy(() => import('../../../objects/Filter/Filter'));

const Content = (props) => {
    return (
        <Fragment>
            <Switch>
                <Route path='/' render={ props => <Dashboard {...props} />} exact />
                {/* <Route path='/user' render={ props => <User {...props}/>} exact/> */}
                {/* TRANSACTION */}
                <Route exact path='/transaction' render={ props => <Transaction {...props} />} />
                <Route exact path='/transaction/:transactionId' render={ props => <Transaction {...props} />} />
                <Route exact path='/transactions' render={ props => <Transactions {...props} />} />          
                {/* BALANCE */}
                <Route exact path='/balance' render={ props => <Balance {...props} />} />
                <Route exact path='/balance/:balanceId' render={ props => <Balance {...props} />} />
                <Route path='/balances' render={ props => <Balances {...props} />} exact />
                {/* USER */}
                <Route path='/user' render={ props => <User {...props} />} exact />

                {/* <Route path='/filter' render={ props => <Filter />} exact/> */}
            </Switch>   
        </Fragment>
    );
}


export default Content;