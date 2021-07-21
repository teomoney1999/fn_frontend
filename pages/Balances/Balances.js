import { Fragment, useEffect, useState, useMemo } from "react";
// REACT ROUTER
import { useHistory } from "react-router";
// REDUX
import { useDispatch, useSelector } from "react-redux";
import { notificationAction } from "../../stores/notification-slice";
// CUSTOM HOOK
import useHttp from "../../hooks/use-http";
// COMPONENT
import CollectionView from "../../objects/AdminForm/CollectionView/CollectionView";
import BalanceView from '../../objects/Balances/DashboardView/Balance';
// HELPER
import Helper from "../../helpers/formatingHelper";
import { getMany } from "../../helpers/apiHelper";
import { sortByField } from "../../helpers/commonHelper";

const Balances = (props) => {
    // API ENDPOINT
    const apiEndpoint = "balance";

    // HOOKS
    const history = useHistory();
    const dispatch = useDispatch();
    
    const { userId } = useSelector(state => state.auth);

    // STATE
    const [balancesList, setBalancesList] = useState([]);

    const { sendRequest: getAllBalances, 
            status, 
            error, 
            data: balances, } = useHttp(getMany.bind(null, apiEndpoint, { user_id: userId }));

    const sortedData = useMemo(() => 
        sortByField({type: 'descending', field: 'created_at', dataSource: balances}), 
    [balances, sortByField]);

    useEffect(() => {
        getAllBalances(); 
    }, [getAllBalances]);

    useEffect(() => {
        if (!sortedData.length) {
            setBalancesList(balances);
        } else {
            setBalancesList(sortedData); 
        }     
    }, [balances]);

    useEffect(() => {
        if (status === 'completed' && error) {
            dispatch(notificationAction.notify({
                message: error || "Có lỗi khi tải dữ liệu!", 
                type: 'danger',
            }));
        } 
    }, [status, error])

    const fields = [
        // { field: "id", label: "Mã" },
        // { field: "name", label: "Tên giao dịch" },   
        { field: "amount", label: "Số tiền", template: (rowObj) => (
            parseInt(rowObj.amount).toLocaleString('it-IT', {style : 'currency', currency : 'VND'})
        )},

        { field: "created_at", label: "Thời gian", template: (rowObj) => (
            Helper.timestampToDate(rowObj.created_at, "DD/MM/YYYY")
        ) },
    ];

    const goBackHandler = () => history.goBack();

    return (
        <Fragment>
            <BalanceView />
            <CollectionView 
                title={"Danh sách số dư"}
                fields={ fields }
                navigateDestination={ apiEndpoint } 
                data={ balancesList || [] }
                onGoBack={goBackHandler}   
            />
        </Fragment>
        
    );
}


export default Balances;