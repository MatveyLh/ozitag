import axios from 'axios';
const api = 'https://tager.dev.ozitag.com';

export default class HTTPWrapper {
    post(url: string, data?: any) {
       return axios.post(`${api}/${url}`, data, {headers: {Authorization: localStorage.getItem('token')}})
    }
    get(url: string) {
        return axios.get(`${api}/${url}`, {headers: {Authorization: localStorage.getItem('token')}})
    }
}

