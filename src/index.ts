import axios, { AxiosInstance, AxiosResponse } from 'axios';
import { termii } from './config';

interface Payload {
  phone_number: string;
  message: string;
  pin_id?: string;
  pin?: string;
}

export class Termii {
  private sender_id: string = 'S-Alert';
  private api_key: string = '';
  private verify_ssl: boolean = true;
  private max_attempts: number = 3;
  private pin_time_to_live: number = 0;
  private pin_length: number = 6;
  private pin_placeholder: string = '< _pin_ >';
  private pin_type: string = 'NUMERIC';
  private channel: string = 'generic';
  private token_message_type: string = 'ALPHANUMERIC';
  private message_type: string = 'plain';
  private response: AxiosResponse | null = null;

  private axiosInstance: AxiosInstance;

  constructor(apiKey: string, senderId: string = 'S-Alert') {
    this.api_key = apiKey;
    this.sender_id = senderId;

    this.axiosInstance = axios.create({
      baseURL: termii.baseURL,
      headers: termii.headers,
    });
  }

  private async post(path: string, payload: any): Promise<AxiosResponse> {
    try {
      const response = await this.axiosInstance.post(path, payload);
      this.response = response;
      return response;
    } catch (error) {
      throw new Error(`Error in POST request: ${error.message}`);
    }
  }

  private async get(path: string, payload: any): Promise<AxiosResponse> {
    try {
      const response = await this.axiosInstance.get(path, { params: payload });
      this.response = response;
      return response;
    } catch (error) {
      throw new Error(`Error in GET request: ${error.message}`);
    }
  }

  public async sendMessage(payload: Payload): Promise<AxiosResponse> {
    const data = {
      api_key: this.api_key,
      from: this.sender_id,
      channel: this.channel,
      type: this.message_type,
      to: payload.phone_number,
      sms: payload.message,
    };

    return this.post('sms/send', data);
  }

  public async sendToken(payload: Payload): Promise<AxiosResponse> {
    const data = {
      api_key: this.api_key,
      message_type: this.token_message_type,
      to: payload.phone_number,
      from: this.sender_id,
      channel: this.channel,
      pin_attempts: this.max_attempts,
      pin_time_to_live: this.pin_time_to_live,
      pin_length: this.pin_length,
      pin_placeholder: this.pin_placeholder,
      message_text: payload.message,
      pin_type: this.pin_type,
    };

    return this.post('sms/otp/send', data);
  }
}
