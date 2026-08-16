import api from './api';

export const createNotice = async (data) => {
    const response = await api.post('/notices', data);
    return response.data;
};

export const getAllNotices = async () => {
    const response = await api.get('/notices');
    return response.data;
};

export const getActiveNotices = async () => {
    const response = await api.get('/notices/active');
    return response.data;
};

export const updateNotice = async (id, data) => {
    const response = await api.patch(`/notices/${id}`, data);
    return response.data;
};

export const deleteNotice = async (id) => {
    const response = await api.delete(`/notices/${id}`);
    return response.data;
};
