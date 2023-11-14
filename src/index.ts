import axios, { AxiosInstance, AxiosResponse } from 'axios';
import { termii } from './config';

export class Termii {
  private axiosInstance: AxiosInstance;

       constructor() {
              this.axiosInstance = axios.create({
                     baseURL: termii.baseURL,
                     headers: termii.headers,
              });
       }
}
