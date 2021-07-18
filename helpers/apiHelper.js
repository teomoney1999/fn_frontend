import config from '../config/config-http';

import { requestHandler } from '../helpers/httpHelper';


export const post = async (endpoint, requestData) => {
    const response = await requestHandler({
        url: `${config.url}/${endpoint}`, 
        method: 'POST', 
        body: requestData
    }); 

    return response;
}

export const putSingle = async (endpoint, requestData) => {
    const id = requestData.id; 

    const response = await requestHandler({
        url: `${config.url}/${endpoint}/${id}`,
        method: 'PUT', 
        body: requestData,
    }); 

    return response;
}

export const deleteSingle = async (endpoint, id) => {
    const response = await requestHandler({
        url: `${config.url}/${endpoint}/${id}`,
        method: 'DELETE', 
    });

    return response;
}

export const getMany = async (endpoint, param) => {
    const response = await requestHandler({
        url: `${config.url}/${endpoint}` + (param ? `?${new URLSearchParams(param)}` : ''), 
    }); 
    
    return response['objects'];
}

export const getSingle = async (endpoint, id) => {
    const response = await requestHandler({
        url: `${config.url}/${endpoint}/${id}`,
    });

    return response;
}

