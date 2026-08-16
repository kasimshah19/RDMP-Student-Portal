import api from './api';

export const getTeacherProfile = async () => {
    const response = await api.get('/teacher/me');
    return response.data;
};

export const getAllTeachers = async () => {
    const response = await api.get('/teacher/all');
    return response.data;
};

export const assignTeacherDivision = async (id, divisionId, action) => {
    const response = await api.patch(`/teacher/${id}/assign-division`, { divisionId, action });
    return response.data;
};

export const assignTeacherSubject = async (id, subjectId, action) => {
    const response = await api.patch(`/teacher/${id}/assign-subject`, { subjectId, action });
    return response.data;
};
