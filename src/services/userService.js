import { TokenService } from './localStorageService';
import axios from './config';

const userService = {
    login: async (data) => {
        try {
            const res = await axios.post('/users/login', data);
            TokenService.setToken(res.data.token);
            return res.data.token;
        } catch (err) {
            console.log(err);
        }
    },
};

export { userService };
