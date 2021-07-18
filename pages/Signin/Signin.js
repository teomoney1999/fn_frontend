import { useEffect} from 'react';
// REACT ROUTER
import { useHistory } from 'react-router-dom';
// CUSTOM HOOKS
import useHttp from '../../hooks/use-http';
import { post } from '../../helpers/apiHelper';
// COMPONENT
// import SigninView from './view/SigninView';
import SigninView from '../../objects/Users/ModelView';

const Signin = (props) => {
    const apiEndpoint = 'user'; 
    // HOOKS
    const history = useHistory();

    // USER
    const { sendRequest: _create, 
        // status, error,
        // data: user 
    } = useHttp(post.bind(null, apiEndpoint));
    
    const createHandler = async (data) => {
        await _create(data); 
        
        history.push('/login');
    }

    return (
        <SigninView onCreateUser={ createHandler }/>
    );
}


export default Signin;