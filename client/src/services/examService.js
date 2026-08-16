import api from './api';

export const createExam = async (data) => {
    const response = await api.post('/exams', data);
    return response.data;
};

export const getExams = async () => {
    const response = await api.get('/exams');
    return response.data;
};

export const getExamById = async (id) => {
    const response = await api.get(`/exams/${id}`);
    return response.data;
};

export const getExamsByClassGroup = async (classGroupId) => {
    const response = await api.get(`/exams/classgroup/${classGroupId}`);
    return response.data;
};

export const deleteExam = async (id) => {
    const response = await api.delete(`/exams/${id}`);
    return response.data;
};
