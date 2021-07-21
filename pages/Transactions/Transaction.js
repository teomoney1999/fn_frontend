import { Fragment, useEffect, useState } from 'react';
// REACT ROUTER
import { useHistory, useParams } from 'react-router';
// REDUX
import { useDispatch, useSelector } from 'react-redux';
import { notificationAction } from '../../stores/notification-slice';
import { balanceAction } from '../../stores/balance/balance-slice';
// CUSTOM HOOK
import useHttp from '../../hooks/use-http'; 
import { getSingle, post, deleteSingle, putSingle } from '../../helpers/apiHelper';
// COMPONENT
import TransactionView from '../../objects/Transactions/ModelView';



const Transaction = (props) => {
    const apiEndpoint = 'transaction';
    // HOOKS
    const params = useParams();
    const history = useHistory();
    const dispatch = useDispatch();

    const { transactionId } = params; 

    const balance = useSelector(state => state.balance); 

    /**
     * METHOD: POST 
     */
    const { sendRequest: _create, error: postError, status: postStatus
        // error, status, data: transaction 
    } = useHttp(post.bind(null, apiEndpoint));

    const createHandler = async (data) => {
        await _create(data); 

        const { amount, transaction_type } = data;

        if (transaction_type === 'thu') {
            dispatch(balanceAction.add({amount: amount}));
        } else if (transaction_type === 'chi') {
            dispatch(balanceAction.sub({amount: amount}));
        }
        console.log("BALANCE CHANGED");
        
        history.push('/transactions');
    }

    /**
     * METHOD: GET SINGLE
     */
     const [transaction, setTransaction] = useState({}); 

     const { sendRequest: _read, 
             // error, status, 
             data } = useHttp(getSingle.bind(null, apiEndpoint));
     
     useEffect(() => {
         if (!transactionId) {
             setTransaction({}); 
             return; 
         } 
         if (!data) {
             _read(transactionId); 
         } else {
             setTransaction(data); 
         }        
     }, [transactionId, _read, data]);

    /**
     * METHOD: UPDATE 
     */
     const { sendRequest: _update, error: putError, status: putStatus
        // , status, data: transaction 
    } = useHttp(putSingle.bind(null, apiEndpoint));

    const updateHandler = async (id, data) => {
        const response = await _update({...data, id}); 

        const { amount, transaction_type: oldType } = transaction;
        const oldAmount = parseInt(amount)
        const { amount: newAmount, transaction_type: newType } = data;

        if (newType === 'thu' && oldType === 'thu') {
            dispatch(balanceAction.add({amount: newAmount - oldAmount}));
        } 

        else if (newType === 'thu' && oldType === 'chi') {
            dispatch(balanceAction.add({amount: newAmount + oldAmount}));
        }

        else if (newType === 'chi' && oldType === 'thu') {
            dispatch(balanceAction.sub({amount: newAmount - oldAmount}));
        }

        else {
            dispatch(balanceAction.sub({amount: newAmount + oldAmount}));
        }
        
        console.log("BALANCE CHANGED");
        
        history.push('/transactions');
    }

    /**
     * METHOD: DELETE 
     */
    const { sendRequest: _delete, error: deleteError, status: deleteStatus
        // error, status, data: transaction 
    } = useHttp(deleteSingle.bind(null, apiEndpoint));

    const deleteHandler = async (id) => {
        await _delete(id); 

        const { amount, transaction_type } = transaction;
        const deleteAmount = parseInt(amount);

        if (transaction_type === 'thu') {
            dispatch(balanceAction.sub({amount: deleteAmount}));
        } else if (transaction_type === 'chi') {
            dispatch(balanceAction.add({amount: deleteAmount}));
        }
            console.log("BALANCE CHANGED");

        history.push('/transactions');
    }


    const notify = ({id, message, type}) => {
        dispatch(notificationAction.notify({
            message: message, 
            type: type
        }));
    }

    const goBackHandler = () => history.goBack(); 
    
    
    return (
        <Fragment>
            {/* { console.log("transaction", transaction) }, */}
            <TransactionView 
                transaction={ transaction }
                error={ postError || putError || deleteError }
                status={    
                    (postStatus === 'completed') || 
                    (putStatus === 'completed') || 
                    (deleteStatus === 'completed') 
                        ? "completed" : "pending" 
                }
                onCreateTransaction={ createHandler }
                onUpdateTransaction={ updateHandler }
                onDeleteTransaction={ deleteHandler }
                notify={ notify }
                onGoBack={ goBackHandler }/>
        </Fragment>
        
    );
}


export default Transaction;