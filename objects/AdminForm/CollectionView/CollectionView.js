import React, {useMemo} from 'react';
// import { useRouteMatch } from 'react-router-dom';

// UI
import Card from '../../../UI/Card/Card';
import Button from '../../../UI/Button/Button';
import Table from '../../../UI/Table/Table';

// import Helper from '../../../../helpers/formatingHelper';

// STYLE
import classes from './CollectionView.module.css';
import btnClass from '../../../UI/Button/Button.module.css';


const CollectionView = (props) => {
    // const match = useRouteMatch();

    // const {tableData} = props;

    // const sortTransactionByTime = useMemo((type='ascending') => {
    //     if (tableData instanceof Array) {
    //         if (type === 'descending') {
    //             return tableData.slice().sort((a, b) => a.date - b.date);       // Array is freeze in strict mode
    //         }
    //         return tableData.slice().sort((a, b) => b.date - a.date);
    //     }

    //     return [];
        
    // }, [tableData]);


    return (
        <Card className={ `${classes.card} ${props.className}` }>
            <h1>{ props.title }</h1>

            <Table 
                data={ props.data }
                fields={ props.fields }
                onNavigate={ props.navigateDestination }/> 

            <Button
                className={`${btnClass['button-light']} ${classes.btn}`}
                handleClick={ props.onGoBack }>
                    Quay lại
            </Button>
        </Card>

    );
}


export default CollectionView;