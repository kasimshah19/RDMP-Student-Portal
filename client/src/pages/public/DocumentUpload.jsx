import React, { useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { uploadDocument } from '../../services/admissionService';

const DocumentUpload = () => {
    const { applicationId } = useParams();
    const [uploads, setUploads] = useState({});
    const [errorMsg, setErrorMsg] = useState('');

    const documentsList = [
        { type: 'photo', label: 'Passport Size Photo', required: true },
        { type: 'aadhar', label: 'Aadhar Card', required: true },
        { type: '10th_marksheet', label: '10th Marksheet', required: true },
        { type: 'tc', label: 'Transfer Certificate (TC)', required: true },
        { type: 'caste_certificate', label: 'Caste Certificate', required: false },
    ];

    const handleFileChange = async (e, type) => {
        e.preventDefault();
        if (!e.target.files || e.target.files.length === 0) return;

        const file = e.target.files[0];
        const localFormData = new FormData();
        localFormData.append('document', file);
        localFormData.append('documentType', type);

        setUploads({ ...uploads, [type]: { status: 'uploading' } });
        setErrorMsg('');

        try {
            await uploadDocument(applicationId, localFormData);
            setUploads({ ...uploads, [type]: { status: 'success' } });
        } catch (error) {
            setUploads({ ...uploads, [type]: { status: 'error', error: 'Failed to upload' } });
            setErrorMsg(error.response?.data?.message || 'Error executing document upload.');
        }
    };

    return (
        <div className="min-h-screen bg-gray-50 flex flex-col">
            <header className="bg-prime-blue text-white shadow-md p-4 flex items-center justify-between">
                <h1 className="text-xl font-bold">RDMP Student Portal</h1>
                <Link to="/login" className="text-sm underline hover:text-gray-200">Login</Link>
            </header>

            <main className="flex-1 flex justify-center py-10 px-4 sm:px-6">
                <div className="bg-white p-8 rounded-xl shadow-lg w-full max-w-2xl border border-gray-100">
                    <div className="bg-green-50 border border-green-200 text-green-800 p-4 rounded mb-6">
                        <h3 className="font-bold text-lg mb-1">Application Submitted!</h3>
                        <p className="text-sm">Please save your Application ID: <strong className="text-base select-all bg-green-200 px-1">{applicationId}</strong></p>
                    </div>

                    <h2 className="text-xl font-bold text-prime-blue mb-2">Upload Documents</h2>
                    <p className="text-sm text-gray-500 mb-6">Accepted formats: JPG, PNG, PDF (Max 5MB)</p>

                    {errorMsg && <div className="mb-4 bg-red-50 text-red-600 p-3 rounded text-sm">{errorMsg}</div>}

                    <div className="space-y-4">
                        {documentsList.map((doc) => (
                            <div key={doc.type} className="flex flex-col sm:flex-row sm:items-center justify-between p-4 border border-gray-200 rounded">
                                <div className="mb-2 sm:mb-0">
                                    <p className="font-medium text-gray-800">{doc.label} {doc.required && <span className="text-red-500">*</span>}</p>
                                    <p className="text-xs text-gray-500">{doc.required ? 'Mandatory' : 'Optional'}</p>
                                </div>
                                <div className="flex items-center">
                                    {uploads[doc.type]?.status === 'success' ? (
                                        <span className="text-green-600 font-medium text-sm flex items-center">
                                            ✓ Uploaded
                                        </span>
                                    ) : uploads[doc.type]?.status === 'uploading' ? (
                                        <span className="text-blue-500 text-sm">Uploading...</span>
                                    ) : (
                                        <input type="file"
                                            accept=".pdf,.jpg,.jpeg,.png"
                                            onChange={(e) => handleFileChange(e, doc.type)}
                                            className="text-sm file:mr-4 file:py-2 file:px-4 file:rounded file:border-0 file:text-sm file:font-semibold file:bg-blue-50 file:text-blue-700 hover:file:bg-blue-100"
                                        />
                                    )}
                                </div>
                            </div>
                        ))}
                    </div>

                    <div className="mt-8 pt-4 border-t flex justify-end">
                        <Link to="/admission/status" className="bg-prime-blue text-white px-6 py-2 rounded shadow hover:bg-blue-800 transition">
                            Check Status Tracker
                        </Link>
                    </div>
                </div>
            </main>
        </div>
    );
};

export default DocumentUpload;
