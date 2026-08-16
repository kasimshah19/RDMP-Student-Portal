import api from './api';

export const markAttendance = async (data) => {
    const response = await api.post('/attendance/mark', data);
    return response.data;
};

export const getAttendanceByDate = async (divisionId, date) => {
    const response = await api.get(`/attendance/division/${divisionId}/date/${date}`);
    return response.data;
};

export const getMyAttendance = async () => {
    const response = await api.get('/attendance/me');
    return response.data;
};

export const getStudentAttendanceSummary = async () => {
    const response = await api.get('/attendance/me/summary');
    return response.data;
};

export const getDivisionReport = async (divisionId) => {
    const response = await api.get(`/attendance/report/division/${divisionId}`);
    return response.data;
};

export const getLowAttendance = async (threshold = 75) => {
    const response = await api.get(`/attendance/low-attendance?threshold=${threshold}`);
    return response.data;
};

export const getStudentAttendance = async (studentId) => {
    const response = await api.get(`/attendance/student/${studentId}`);
    return response.data;
};
