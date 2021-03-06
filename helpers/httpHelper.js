import config from "../config/config-http";

// REQUEST HANDLER
export const requestHandler = async (requestConfig) => {   
    
    const request = await fetch(requestConfig.url, {
        method: requestConfig.method ? requestConfig.method : 'GET', 
        headers: {
            'Content-Type': 'application/json',
            'Access-Control-Allow-Methods': 'GET, PUT, POST, DELETE',
            // 'Origin': '*',
            // 'Access-Control-Allow-Credentials': 'true'
            // 'Access-Control-Allow-Headers': 'Content-Type'
        }, 
        body: requestConfig.body ? JSON.stringify(requestConfig.body) : null
    });

    const data = await request.json();

    if (!request.ok) {      
        throw new Error( data.error_message || "Có lỗi xảy ra. Vui lòng thử lại sau!");
    }

    return data;   
}


