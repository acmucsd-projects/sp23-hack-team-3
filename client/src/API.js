import axios from 'axios';

const serverURL = 'http://localhost:4000'

const API = {
    getEvents: function() {
        const test = axios.get(`${serverURL}/events`);
        // console.log(test);
        return test;
    }
}
export default API;
