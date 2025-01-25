import axios, { AxiosRequestConfig, AxiosResponse, Method } from 'axios';
import { Absence, SortParams } from "../types";

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

export const calculateEndDate = (startDate: string, days: number): string => {
    const start = new Date(startDate);
    const end = new Date(start);
    end.setDate(start.getDate() + days);
    return end.toISOString().split('T')[0]; // Format as YYYY-MM-DD
};

export const sortAbsences = (absences: Absence[], SortParams: SortParams | null) => {
    if (!absences || !SortParams) return absences;

    return [...absences].sort((a, b) => {
        let aValue, bValue;

        switch (SortParams.key) {
            case 'startDate':
                aValue = new Date(a.startDate);
                bValue = new Date(b.startDate);
                break;
            case 'endDate':
                aValue = new Date(calculateEndDate(a.startDate, a.days));
                bValue = new Date(calculateEndDate(b.startDate, b.days));
                break;
            case 'employeeName':
                aValue = `${a.employee.firstName} ${a.employee.lastName}`;
                bValue = `${b.employee.firstName} ${b.employee.lastName}`;
                break;
            case 'absenceType':
                aValue = a.absenceType;
                bValue = b.absenceType;
                break;
            default:
                return 0;
        }
        if (aValue < bValue) return SortParams.direction === 'asc' ? -1 : 1;
        if (aValue > bValue) return SortParams.direction === 'asc' ? 1 : -1;
        return 0;
    });
};