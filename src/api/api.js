import axios from "axios";


const axiosClient = axios.create({
    baseURL: 'https://jsonplaceholder.typicode.com',
  });

 export function getData(URL) {
    return axiosClient.get(`/${URL}`).then((response) => response);
  }