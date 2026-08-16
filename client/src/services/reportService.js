import api from './api';

export const getClassStrengthReport = async () => {
    const response = await api.get('/reports/class-strength');
    return response.data;
};

export const getAdmissionFunnelReport = async () => {
    const response = await api.get('/reports/admission-funnel');
    return response.data;
};

export const getAttendanceTrendReport = async () => {
    const response = await api.get('/reports/attendance-trend');
    return response.data;
};
