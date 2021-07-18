export const isObject = (data) => {  
    return data instanceof Object;
}   


export const isArray = (data) => {
    return data instanceof Array;
}

export const isIn = (element, array) => {
    if (isArray(array)){
        return array.includes(element);
    }
    return false;   
}

export const getKey = (_object) => {
    if (isObject(_object)) {
        return Object.keys(_object);
    } 
    return null;
}

export const isEmpty = (arg) => {
    if (arg instanceof Object) {
        return Object.keys(arg).length === 0; 
    } else if (arg instanceof Array) {
        return arg.length === 0;
    }
}