import React from 'react';
import { Link } from 'react-router-dom';

import NoResultNoti from '../../UI/Table/NoResultNoti/NoResultNoti';

import Helper from '../../helpers/formatingHelper';

import classes from './Table.module.css';

const Table = (props) => {
    /**
     * tableHead: [
     *  { field: "abc", label: "ABC"},
     *  ...
     * ]
     * 
     * props.fields
     */
    
    return ( 
        <div className={ classes.tableWrapper } style={{overflowX: 'auto', overflowY: "auto"}}>
            <table className={ classes.table }>
                <thead>
                    <tr>
                        { props.fields.map( (field, index) => (
                            <th key={ index.toString() }>{ field.label }</th>   
                        ))}
                    </tr> 
                </thead>
                <tbody>
                    {!props.data.length ?   
                        (<tr>
                            <NoResultNoti 
                                lang="vi"
                                colSpan={5}/>    
                        </tr>) :
                        (props.data.map( (data, index) => (                              
                            <tr key={ data.id }>                       
                                {props.fields.map( field => {
                                    let dataView,
                                        tdProps = {
                                            key: Helper.generateId(),
                                        }; 
                                    
                                    // CONDITIONAL TEMPLATE
                                    if (field.hasOwnProperty('template')) {                                          
                                        dataView = field['template'](data);
                                    } else {
                                        dataView = data[field];
                                    }

                                    // DATA IS A OBJECT OR ARRAY
                                    // {textField: '', valueField: ''}
                                    if (field.hasOwnProperty('textField')) {
                                        dataView = data['textField'];
                                    }

                                    // WIDTH
                                    if (field.hasOwnProperty('width')) {
                                        tdProps.width = field['width'];
                                    }

                                    if (field.hasOwnProperty('style')) {
                                        tdProps.style = field['style'];
                                    }
                                    
                                    return (
                                        <td {...tdProps} >
                                            <Link 
                                                to={`${props.onNavigate}/${data.id}`}
                                                style={{textDecoration: 'none', color: 'inherit'}}> 
                                                    { dataView }  
                                            </Link>     
                                        </td>
                                    )                                 
                                }) }                              
                            </tr>
                        ) ) ) }
                </tbody>
            </table>
        </div>

    );
}

export default Table;