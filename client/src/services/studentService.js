import api from './api';

export const getMyProfile = async () => {
    const response = await api.get('/student/me');
    return response.data;
};

export const updateMyProfile = async (data) => {
    const response = await api.patch('/student/profile', data);
    return response.data;
};

export const updateMyPassword = async (data) => {
    const response = await api.patch('/student/profile/password', data);
    return response.data;
};

export const getMySubjectAttendance = async (filters = {}) => {
    const params = new URLSearchParams(filters).toString();
    const response = await api.get(`/student/attendance?${params}`);
    return response.data;
};

export const getMyExaminations = async (filters = {}) => {
    const params = new URLSearchParams(filters).toString();
    const response = await api.get(`/student/examinations?${params}`);
    return response.data;
};

export const getMyResults = async () => {
    const response = await api.get(`/marks/me`);
    return response.data;
};

export const getTimetable = async () => {
    const res = await api.get('/student/timetable');
    return res.data;
};
export const getNotices = async () => {
    const res = await api.get('/notices'); // global notices
    return res.data;
};
export const getDocuments = async () => {
    const res = await api.get('/documents/student');
    return res.data;
};
export const uploadDocument = async (formData) => {
    const res = await api.post('/documents/student', formData, {
        headers: { 'Content-Type': 'multipart/form-data' }
    });
    return res.data;
};
export const getFees = async () => {
    const res = await api.get('/student/fees');
    return res.data;
};
export const getLibrary = async () => {
    const res = await api.get('/student/library');
    return res.data;
};
export const getLeave = async () => {
    const res = await api.get('/student/leave');
    return res.data;
};
