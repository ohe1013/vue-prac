import axios from 'axios';

let url = 'http://localhost:8080';

const http = axios.create({ baseURL: url });

http.interceptors.response.use(
    function (response) {
        return response;
    },
    function (error) {
        console.log(error);
        const prevReq = error?.config;
        prevReq.baseURL = 'https://jsonplaceholder.typicode.com/';
        return http(prevReq);
    }
);

export default http;
