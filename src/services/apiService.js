import axios from './config';
import { TokenService } from './localStorageService';

const ApiService = {
    setHeader() {
        axios.defaults.headers.common['Authorization'] = TokenService.getToken();
    },
};
export default ApiService;
