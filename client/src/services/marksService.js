import api from './api';

export const enterMarks = async (data) => {
    const response = await api.post('/marks/enter', data);
    return response.data;
};

export const getMarkEntryRoster = async (divisionId, examId, subjectId) => {
    const response = await api.get(`/marks/division/${divisionId}/exam/${examId}/subject/${subjectId}`);
    return response.data;
};

export const getStudentResult = async (studentId, examId) => {
    const response = await api.get(`/marks/student/${studentId}/exam/${examId}`);
    return response.data;
};

export const getMyResults = async () => {
    const response = await api.get('/marks/me');
    return response.data;
};

export const getDivisionSummary = async (divisionId, examId) => {
    const response = await api.get(`/marks/summary/division/${divisionId}/exam/${examId}`);
    return response.data;
};

export const downloadMarksheet = async (studentId, examId, filename) => {
    const response = await api.get(`/marks/marksheet/${studentId}/${examId}`, {
        responseType: 'blob'
    });

    // Explicit Blob resolution locally mapping downloads cleanly seamlessly
    const url = window.URL.createObjectURL(new Blob([response.data], { type: 'application/pdf' }));
    const link = document.createElement('a');
    link.href = url;
    link.setAttribute('download', filename || `Marksheet.pdf`);
    document.body.appendChild(link);
    link.click();
    link.remove();
    window.URL.revokeObjectURL(url);

    return true;
};
