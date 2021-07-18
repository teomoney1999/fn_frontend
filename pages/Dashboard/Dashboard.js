import { lazy } from "react";
// import { useSelector } from "react-redux";
import Balance from "../../objects/Balances/DashboardView/Balance";
// const Balance = lazy(() => import("../../objects/Balances/DashboardView/Balance"));

const Dashboard = (props) => {
    return (
        <Balance />
    );
}


export default Dashboard;