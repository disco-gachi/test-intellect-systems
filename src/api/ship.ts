import { BaseApiResponse, Ship } from '@/types';
import { api } from './api';

export async function fetch (id: string) {
    try {
        const response = await api.get<Ship>(`/starships/${id}/`);
        return response.data;
    } catch (e) {}
    
    return null;
}

export async function fetchList (params: object = {}) {
    try {
        const response = await api.get<BaseApiResponse<Ship>>('/starships', { params });
        return response.data;
    } catch (e) {}
    
    return null;
}
