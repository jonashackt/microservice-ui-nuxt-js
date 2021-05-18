import axios, {AxiosResponse} from 'axios'

const axiosApi = axios.create({
    // looks like this baseURL: `http://fargatealb-81c02c2-1301929463.eu-central-1.elb.amazonaws.com:8098/api`,
    // but is configure as environment variable inside nuxt.config.js (see https://nuxtjs.org/docs/2.x/configuration-glossary/configuration-env)
    baseURL: process.env.baseUrl,
    timeout: 1000,
    headers: {
      'Access-Control-Allow-Origin': '*',
      'Content-Type': 'application/json'
    }
});

interface User {
    id: number;
    firstName: string;
    lastName: string;
}

export default {
    hello(): Promise<AxiosResponse<string>> {
        return axiosApi.get(`/hello`);
    },
    getUser(userId: number): Promise<AxiosResponse<User>> {
        return axiosApi.get(`/user/` + userId);
    },
    createUser(firstName: string, lastName: string): Promise<AxiosResponse<number>> {
        return axiosApi.post(`/user/` + firstName + '/' + lastName);
    },
    getSecured(user: string, password: string): Promise<AxiosResponse<string>> {
        return axiosApi.get(`/secured/`,{
            auth: {
                username: user,
                password: password
            }});
    }
}


