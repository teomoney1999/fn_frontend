import moment from 'moment';

class Helper {

    constructor(){
        return; 
    }

    static generateId = () => {
        return Math.random().toString(36).substr(2, 5);
    }

    static currencyFormating = (str) => {
        let toCurrency ;
        try {
          toCurrency = parseInt(str).toLocaleString('it-IT', {style : 'currency', currency : 'VND'});
        } catch (error) {
            return null;
        }
        return toCurrency;
    }

    /**
     * TIME HELPER
     */

    static getCurrentTimestamp = () => {
        return Math.floor(Date.now() / 1000);
    }


    static timestampToDate = (timestamp, format) => {
        let date;
        try {
            date = moment(timestamp).format(format);
        } catch (error){
            return null;
        }
        return date;
    }

    static dateToTimestamp = (date) => {
        let timestamp;
        try {
            timestamp = moment(date).unix();
        } catch (error) {
            return null;
        }

        return timestamp;
    }

    /**
     * DATA FORMATING
     */

     static dataFormatForGetMany = async (data) => {
        const formatedUsers = [];
    
        for (let key in data) {
            const user = {
                id: key,
                ...data[key]
            }
    
            formatedUsers.push(user);
        }
    
        return formatedUsers
    }
    
    static dataFormatForGetSingle = async (id, data) => {
        return {
            id: id, 
            ...data
        }
    }
    
}


export default Helper;