import api from './api';

// Document Verification Admin Services
export const getAllSubmissions = async (filters = {}) => {
    const params = new URLSearchParams(filters).toString();
    const res = await api.get(`/documents/admin/submissions?${params}`);
    return res.data;
};

export const verifyDocument = async (id, payload) => {
    const res = await api.patch(`/documents/admin/submissions/${id}/verify`, payload);
    return res.data;
};

// ... other admin services can be grouped here if needed
