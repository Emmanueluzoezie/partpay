import axios, { AxiosInstance } from 'axios';

export class ApiClient {
    private axiosInstance: AxiosInstance;

    constructor(baseURL: string, apiKey: string) {
        this.axiosInstance = axios.create({
            baseURL,
            headers: {
                'Content-Type': 'application/json',
                'api-key': apiKey,
            },
        });
    }

    async get<T>(url: string, params?: Record<string, any>): Promise<T> {
        const response = await this.axiosInstance.get<T>(url, { params });
        return response.data;
    }

    async post<T>(url: string, data?: Record<string, any>): Promise<T> {
        const response = await this.axiosInstance.post<T>(url, data);
        return response.data;
    }

    async put<T>(url: string, data?: Record<string, any>): Promise<T> {
        const response = await this.axiosInstance.put<T>(url, data);
        return response.data;
    }

    async delete<T>(url: string): Promise<T> {
        const response = await this.axiosInstance.delete<T>(url);
        return response.data;
    }
}