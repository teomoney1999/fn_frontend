import config from "../../config/config-http";
import { requestHandler } from "../../helpers/httpHelper";

export const loginApi = async (loginData) => {
    const data = await requestHandler({
        method: 'POST', 
        url: `${config.url}/login`,
        body: loginData
    }); 

    return data;
}


export const getCurrentUserApi = async (token) => {
    const data = await requestHandler({
        url: `${config.url}/current_user?token=${token}`,
    });

    return data;


}