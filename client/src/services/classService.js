import api from './api';

export const getClasses = async () => {
    const response = await api.get('/classes');
    return response.data;
};

export const createClass = async (data) => {
    const response = await api.post('/classes', data);
    return response.data;
};

export const createDivision = async (data) => {
    const response = await api.post('/classes/divisions', data);
    return response.data;
};

export const getSubjects = async () => {
    const response = await api.get('/classes/subjects');
    return response.data;
};

export const createSubject = async (data) => {
    const response = await api.post('/classes/subjects', data);
    return response.data;
};
