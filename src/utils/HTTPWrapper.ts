import axios from 'axios';
const api = 'https://tager.dev.ozitag.com';

export default class HTTPWrapper {
    post(url: string, data?: any) {
       return axios.post(`https://cors-anywhere.herokuapp.com/${api}/${url}`, data, {headers: {"Access-Control-Allow-Origin": "*", crossdomain: true,
               Authorization: localStorage.getItem('token')}})
    }
    get(url: string) {
        return axios.get(`https://cors-anywhere.herokuapp.com/${api}/${url}`, {headers: {Authorization: localStorage.getItem('token')}})
    }
    put(url: string, data: any) {
        return axios.put(`https://cors-anywhere.herokuapp.com/${api}/${url}`, data ,{headers: {Authorization: localStorage.getItem('token')}})
    }
}

