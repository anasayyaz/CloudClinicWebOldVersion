import axios from "axios";
import history from "utils/history";
import Cookies from 'js-cookie';
import Axios from "axios";
// const apiURL = process.env.REACT_APP_APIURL;
const apiURL = "https://cloudclinicdevapi.azurewebsites.net/api";
const API = axios.create({
  baseURL: apiURL,
  timeout: 60000,
});

API.interceptors.request.use(
  (request) => {
    console.log("interceptor request", request);
    if (request) {
      //perform the manipulation here and change the request object
   
    }
    return request;
  },
  (error) => {
    console.log("interceptor request ERROR", error);

    return Promise.reject(error.message);
  }
);

API.interceptors.response.use(
  (response) => {
    console.log("interceptor response", response);
    if (response) {
      //perform the manipulation here and change the response object
    }
   
    return response;

  },
  (error) => {
    console.log("interceptor response ERROR", error);
    if (error.response.status === 401) {
      history.replace("/authenticate/login");
      
    }

    return Promise.reject(error.message);
  }
);

export default API;
