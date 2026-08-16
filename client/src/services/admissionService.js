import api from './api';

export const submitAdmission = async (admissionData) => {
    const response = await api.post('/admission/apply', admissionData);
    return response.data;
};

export const uploadDocument = async (applicationId, formData) => {
    const response = await api.post(`/admission/${applicationId}/documents`, formData, {
        headers: { 'Content-Type': 'multipart/form-data' }
    });
    return response.data;
};

export const checkApplicationStatus = async (applicationId) => {
    const response = await api.get(`/admission/status/${applicationId}`);
    return response.data;
};

export const getAdmissions = async (filters = {}) => {
    const params = new URLSearchParams(filters).toString();
    const response = await api.get(`/admission/all?${params}`);
    return response.data;
};

export const getAdmissionById = async (id) => {
    const response = await api.get(`/admission/${id}`);
    return response.data;
};

export const verifyDocument = async (id, docId, verifyAction, rejectionReason = '') => {
    const response = await api.patch(`/admission/${id}/verify-document/${docId}`, { verifyAction, rejectionReason });
    return response.data;
};

export const approveAdmission = async (id, appliedDivision) => {
    const response = await api.patch(`/admission/${id}/approve`, { appliedDivision });
    return response.data;
};

export const rejectAdmission = async (id, remarks) => {
    const response = await api.patch(`/admission/${id}/reject`, { remarks });
    return response.data;
};
