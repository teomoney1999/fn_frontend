

class validateHelper {
    constructor() {
        return; 
    }

    /** USER */
    static usernameValidate = (username) => {
        if (username) {
            const value = username.trim();
            return value.length > 5;
        }
        return false;
    }
    
    static passwordValidate = (password) => {
        if (password) {
            return password.trim().length > 5;
        }
        return false;
    }
    
    static fullnameValidate = (fullname) => {
        if (fullname) {
            return fullname.trim().length > 8;
        }
        return false;
    }

    static emailValidate = (email) => {
        if (email) {
            return email.trim().length > 10 && email.includes('@');
        }
        return false;
    }
    
    static phoneValidate = (phone) => {
        if (phone) {
            const phoneTrimmed = phone.trim();
            const phoneHeader = ['032', '033', '034', '035', '036', '037', '038', '039', '092']; 
            const phoneIncludeValidHeader = phoneHeader.filter(header => phoneTrimmed.includes(header)); 
        
            return phoneIncludeValidHeader.length > 0 && phone.length === 10;
        }

        return false;
        
    }

    /** TRANSACTION */
    static nameValidate = (name) => {
        if (name) {
            return name.trim().length > 0;
        }
        return false;
    }

    static amountValidate = (amount) => {
        if (amount) {
            const value = parseInt(amount);

            if (!value) {
                return false;
            }

            return value > 1000 && !(value % 1000); 
        }
        return false;
    }
}



export default validateHelper;