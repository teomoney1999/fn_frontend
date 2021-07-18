import { useState, useEffect } from "react";

import { useSelector, useDispatch } from 'react-redux'
import { notificationAction } from "../stores/notification-slice";

const useNotification = (props) => {
    const dispatch = useDispatch();

    const [notiIsVisible, setNotiIsVisible] = useState(false);
    
    const {content, isVisible} = useSelector(state => state.notification); 

    useEffect(() => {
        if (isVisible) {
            setNotiIsVisible(true);

            const timer = setTimeout(() => {
                dispatch(notificationAction.toggleVisible()); 
                setNotiIsVisible(false);
            }, content.delay);

            return () => {
                clearTimeout(timer);
            }
        }
    }, [isVisible, content])
    

    return notiIsVisible;
}


export default useNotification;