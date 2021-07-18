/**
 * Sorting a list of data by one of its field
 * @param {Object} args => {type, field, dataSource} 
 */
export const sortByField = (args) => {
    let {type, field, dataSource} = args; 

    if (!type) {
        // default 
        type = 'ascending';
    }

    if (dataSource instanceof Array) {
        if (type === 'descending') {
            return dataSource.slice().sort((a, b) => b[field] - a[field]);
        }
        return dataSource.slice().sort((a, b) => a[field] - b[field]);       // Array is freeze in strict mode
    }
    
    return [];
}