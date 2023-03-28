import axios from "axios";
import * as functions from '../_helper/functions';
const API_URL = process.env.REACT_APP_API_URL;
// let Authorization = localStorage.getItem('access_token');
// export let headers = {
//   'Content-Type': 'application/json',
//   Authorization: `Bearer ${localStorage.getItem('access_token')}`,
// }

export default function list(endpoint, params = {}) {

  let config = {
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${localStorage.getItem("access_token")}`,
    },
    params: params,
  };
 
  axios.get(API_URL + endpoint, config).then((response) => {
   

}) .catch(error => {
  
  if(error.message=="Request failed with status code 401")
  {
    
    functions.validateAccessToken();
   
  }
});

  return axios.get(API_URL + endpoint, config).then((response) => {
    
    if (response.data.results !== undefined) {
     
      response.extra_data = {
        count: response.data.count,
        next: response.data.next,
        previous: response.data.previous,
      };
      response.data = response.data.results;
    }
    
    
    return response;

  });

}

export function put(endpoint, data) {
  let config = {
    headers: endpoint.includes("profileImage")
      ? {
          "Content-Type": "multipart/form-data",
          Authorization: `Bearer ${localStorage.getItem("access_token")}`,
        }
      : {
          "Content-Type": "application/json",
          Authorization: `Bearer ${localStorage.getItem("access_token")}`,
        },
  };
  return axios.put(API_URL + endpoint, data, config);
}
export function patch(endpoint, data) {
  let config = {
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${localStorage.getItem("access_token")}`,
    },
  };
  return axios.patch(API_URL + endpoint, data, config);
}

export function post(endpoint, data) {
  let config = {
    headers: endpoint.includes("profileImage")
      ? {
          "Content-Type": "multipart/form-data",
          Authorization: `Bearer ${localStorage.getItem("access_token")}`,
        }
      : {
          "Content-Type": "application/json",
          Authorization: `Bearer ${localStorage.getItem("access_token")}`,
        },
  };
  return axios.post(API_URL + endpoint, data, config);
}

export function del(endpoint, data = {}) {
  let config = {
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${localStorage.getItem("access_token")}`,
    },
    data: data,
  };
  return axios.delete(API_URL + endpoint, config);
}
