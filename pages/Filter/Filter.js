import { useEffect } from 'react';
// REDUX
import { useDispatch, useSelector } from 'react-redux';
import { filterAction } from '../../stores/filter/filter-slice';
// HELPER
import formattingHelper from '../../helpers/formatingHelper';
// COMPONENT
import FilterView from '../../objects/Filter/Filter';

const Filter = (props) => {
    const dispatch = useDispatch();

    const { data } = props; 

    useEffect(() => {
        if (!data.length) return;

        dispatch(filterAction.setData(data));
    }, [data]);


    const enableFilterHandler = (filterPattern={}) => {
        dispatch(filterAction.setTriggerFilter({triggerFilter: true}));

        let date = filterPattern.date || [];
        if (date.length > 1) {
            filterPattern.date = [formattingHelper.dateToTimestamp(date[0]), 
                                    formattingHelper.dateToTimestamp(date[1])];
        }

        dispatch(filterAction.setFilteredData({condition: filterPattern }) );
    }   

    const disableFilterHandler = () => {
        dispatch(filterAction.setTriggerFilter({triggerFilter: false}));

        dispatch(filterAction.setFilteredData({}));
    }


    return (
        <FilterView 
            onEnableFilter={enableFilterHandler}
            onDisableFilter={disableFilterHandler}/>
    );
}


export default Filter;