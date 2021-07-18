import { useEffect, useState } from 'react';
// REACT ROUTER
import { useHistory, useParams } from 'react-router';
// REDUX
import { useDispatch } from 'react-redux';
import { notificationAction } from '../../stores/notification-slice';
// import { balanceAction } from '../../stores/balance/balance-slice';
// CUSTOM HOOK
import useHttp from '../../hooks/use-http'; 
import { getSingle, deleteSingle } from '../../helpers/apiHelper';
// COMPONENT
import BalanceView from '../../objects/Balances/ModelView';

const Balance = (props) => {
    const apiEndpoint = 'balance';
    // HOOKS
    const params = useParams();
    const history = useHistory();
    const dispatch = useDispatch();

    const { balanceId } = params; 
    /**
     * METHOD: GET SINGLE
     */
    const [balance, setBalance] = useState({}); 

    const { sendRequest: _read, 
            error, status, 
            data } = useHttp(getSingle.bind(null, apiEndpoint));
     
    useEffect(() => {
        if (!balanceId) {
            setBalance({}); 
            return; 
        } 
        if (!data) {
            _read(balanceId); 
        } else {
            setBalance(data); 
        }   
    }, [balanceId, _read, data]);

    /**
     * METHOD: DELETE 
     */
     const { sendRequest: _delete, error: deleteError, status: deleteStatus
        // error, status, data: transaction 
    } = useHttp(deleteSingle.bind(null, apiEndpoint));

    const deleteHandler = async (id) => {
        const response = await _delete(id); 

        history.push('/balances');
    }

    const notify = ({id, message, type}) => {
        dispatch(notificationAction.notify({
            message: message, 
            type: type
        }));
    }
    
     const goBackHandler = () => {
        history.goBack(); 
    }
    return (
        <BalanceView 
            data={ balance }
            error={ deleteError }
            status={deleteStatus}
            notify={ notify }
            onDelete={ deleteHandler }
            onGoBack={ goBackHandler }/>
    );
}


export default Balance;