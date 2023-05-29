import axios from 'axios';

const serverURL = 'http://localhost:4000'

const API = {
    getPurchase: function() {
        return axios.get(`${serverURL}/api/events`);
    }
}
export default API;
