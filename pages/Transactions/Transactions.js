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
import Filter from '../Filter/Filter';
// HELPER
import Helper from "../../helpers/formatingHelper";
import { getMany } from "../../helpers/apiHelper";
import { sortByField } from "../../helpers/commonHelper";

const Transactions = (props) => {
    // API ENDPOINT
    const apiEndpoint = "transaction";

    // HOOKS
    const history = useHistory();
    const dispatch = useDispatch();

    const { userId } = useSelector(state => state.auth);

    // STATE
    const [transactionsList, setTransactionsList] = useState([]);

    const { sendRequest: getAllTransactions, 
            status, 
            error, 
            data: transactions, } = useHttp(getMany.bind(null, apiEndpoint, { user_id: userId }));

    const sortedData = useMemo(() => 
        sortByField({type: 'descending', field: 'created_at', dataSource: transactionsList}), 
    [transactionsList]);

    const filteredData = useSelector(state => state.filter.filteredData);

    useEffect(() => {
        getAllTransactions(); 
    }, [getAllTransactions]);

    useEffect(() => {
        if (filteredData.length) {
            setTransactionsList(filteredData);
        } else {
            setTransactionsList(transactions)
        }   
    }, [filteredData, transactions]);


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

        { field: "transaction_type", label: "Loại", style: {textAlign: 'center'}, template: (rowObj) => {
            let dataView;
            switch(rowObj.transaction_type.toLowerCase()){
                case 'thu': 
                    dataView = <i className="fa fa-plus-circle" aria-hidden="true" style={{color: 'green'}}></i>;
                    break;
                case 'chi': 
                    dataView = <i className="fa fa-minus-circle" aria-hidden="true" style={{color: 'red'}}></i>; 
                    break;
            }
            return dataView;
        } },

        { field: "created_at", label: "Thời gian", template: (rowObj) => (
            Helper.timestampToDate(rowObj.created_at, "DD/MM/YYYY")
        ) },
    ];

    const goBackHandler = () => history.goBack();

    return (
        <Fragment>
            <Filter data={ transactions || [] }/>
            <CollectionView 
                title={"Lịch sử giao dịch"}
                fields={ fields }
                navigateDestination={ apiEndpoint } 
                data={ sortedData || [] }
                onGoBack={goBackHandler}   
            />
        </Fragment>    
    );
}


export default Transactions;