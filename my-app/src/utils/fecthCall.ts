import axios, { AxiosRequestConfig, AxiosResponse, Method } from 'axios';

interface FecthCallOptions extends AxiosRequestConfig {
    method: Method;
    endpoint: string;
    params?: Record<string, any>;
    data?: Record<string, any>;
}

export const fetchCall = async <T = any>({ method, endpoint, params, data, ...config }: FecthCallOptions): Promise<AxiosResponse<T>> => {
    const baseConfig: AxiosRequestConfig = {
        headers: {
            'Content-Type': 'application/json',
        },
        ...config,
    };

    try {
        const response = await axios({
            method,
            url: `/${endpoint}`,
            params,
            data,
            ...baseConfig
        });
        return response;
    } catch (error) {
        console.error(`Error in ${method} request to ${endpoint}:`, error);
        throw error;
    }
};