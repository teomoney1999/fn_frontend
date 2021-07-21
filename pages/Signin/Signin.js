import { useEffect} from 'react';
// REACT ROUTER
import { useHistory } from 'react-router-dom';
// REDUX
import { useDispatch } from 'react-redux';
import { notificationAction } from '../../stores/notification-slice';
// CUSTOM HOOKS
import useHttp from '../../hooks/use-http';
import { post } from '../../helpers/apiHelper';
// COMPONENT
import ModelView from '../../objects/Users/ModelView';

const Signin = (props) => {
    const apiEndpoint = 'user'; 

    // HOOKS
    const history = useHistory();
    const dispatch = useDispatch();

    // USER
    const { sendRequest: _create, 
        status, error,
        // data: user 
    } = useHttp(post.bind(null, apiEndpoint));
    
    const createHandler = async (data) => {
        console.log('data', data);

        await _create(data); 
        
        history.push('/login');
    }

    const notify = ({message, type, delay}) => {
        dispatch(notificationAction.notify({
            message: message, 
            type: type, 
            delay: delay
        }));
    }

    const goBackHandler = () => history.goBack();

    return (
        <ModelView 
            onCreate={ createHandler }
            error={ error }
            status={ status }
 
            // // onUpdateUser={}
            // // onUpdateUserInfo={}
            notify={ notify }
            onGoBack={ goBackHandler }
        />
    );
}


export default Signin;