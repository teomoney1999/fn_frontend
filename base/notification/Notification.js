// REDUX
import { useSelector } from 'react-redux';
// UI
import NotificationView from '../../UI/Notification/Notification';

const Notification = (props) => {
    const notification = useSelector(state => state.notification.content);
    
    return (
        <NotificationView {...notification} />
    );
}

export default Notification;