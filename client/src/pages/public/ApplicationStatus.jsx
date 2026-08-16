import React, { useState } from 'react';
import { checkApplicationStatus } from '../../services/admissionService';
import { Link } from 'react-router-dom';

const ApplicationStatus = () => {
    const [appId, setAppId] = useState('');
    const [result, setResult] = useState(null);
    const [errorMsg, setErrorMsg] = useState('');
    const [isLoading, setIsLoading] = useState(false);

    const handleCheck = async (e) => {
        e.preventDefault();
        setIsLoading(true);
        setErrorMsg('');
        setResult(null);

        try {
            const data = await checkApplicationStatus(appId.trim());
            if (data.success) {
                setResult(data.data);
            } else {
                setErrorMsg(data.message);
            }
        } catch (err) {
            setErrorMsg(err.response?.data?.message || 'Error viewing status');
        }
        setIsLoading(false);
    };

    const getStatusColor = (status) => {
        switch (status) {
            case 'approved': return 'bg-green-100 text-green-800';
            case 'rejected': return 'bg-red-100 text-red-800';
            case 'documents_pending': return 'bg-orange-100 text-orange-800';
            default: return 'bg-yellow-100 text-yellow-800';
        }
    };

    return (
        <div className="min-h-screen bg-gray-50 flex flex-col">
            <header className="bg-prime-blue text-white shadow-md p-4 flex items-center justify-between">
                <h1 className="text-xl font-bold">RDMP Student Portal</h1>
                <Link to="/login" className="text-sm underline hover:text-gray-200">Login</Link>
            </header>

            <main className="flex-1 flex justify-center py-10 px-4 sm:px-6">
                <div className="bg-white p-8 rounded-xl shadow-lg w-full max-w-xl border border-gray-100 h-fit">
                    <h2 className="text-2xl font-bold text-prime-blue mb-4">Application Status Tracker</h2>

                    <form onSubmit={handleCheck} className="flex gap-2 mb-8">
                        <input
                            type="text"
                            required
                            placeholder="Enter Application ID (e.g. RDMP2026-0001)"
                            className="flex-1 p-2 border border-gray-300 rounded focus:outline-none focus:border-prime-blue"
                            value={appId}
                            onChange={e => setAppId(e.target.value)}
                        />
                        <button type="submit" disabled={isLoading} className="bg-prime-blue text-white px-4 py-2 rounded hover:bg-blue-800 transition disabled:opacity-50">
                            {isLoading ? 'Checking...' : 'Check Status'}
                        </button>
                    </form>

                    {errorMsg && <div className="bg-red-50 text-red-600 p-3 rounded mb-4 text-sm">{errorMsg}</div>}

                    {result && (
                        <div className="space-y-4 animate-fade-in-up border border-gray-200 rounded pt-4 pb-6 px-4 bg-gray-50">
                            <div className="flex justify-between items-center border-b pb-2">
                                <h3 className="font-semibold text-lg">{result.fullName}</h3>
                                <span className={`px-3 py-1 rounded-full text-xs font-bold uppercase ${getStatusColor(result.status)}`}>
                                    {result.status.replace('_', ' ')}
                                </span>
                            </div>

                            {result.remarks && result.status === 'rejected' && (
                                <div className="bg-red-100 text-red-800 p-3 rounded text-sm mt-2">
                                    <strong>Rejection Reason:</strong> {result.remarks}
                                </div>
                            )}

                            <div>
                                <h4 className="font-medium text-gray-700 mb-2 mt-4">Document Verification</h4>
                                {result.documents.length === 0 ? (
                                    <p className="text-sm text-gray-500 italic">No documents uploaded yet.</p>
                                ) : (
                                    <ul className="space-y-2">
                                        {result.documents.map(doc => (
                                            <li key={doc._id} className="flex justify-between items-center text-sm p-2 bg-white border rounded">
                                                <span className="capitalize">{doc.documentType.replace('_', ' ')}</span>
                                                {doc.verified ? (
                                                    <span className="text-green-600 font-medium">Verified</span>
                                                ) : doc.rejectionReason ? (
                                                    <span className="text-red-600 font-medium" title={doc.rejectionReason}>Rejected</span>
                                                ) : (
                                                    <span className="text-yellow-600 font-medium">Pending Review</span>
                                                )}
                                            </li>
                                        ))}
                                    </ul>
                                )}
                            </div>

                            <div className="mt-4 flex justify-end">
                                <Link to={`/admission/${result.applicationId}/documents`} className="text-prime-blue hover:underline text-sm font-medium">
                                    Upload Missing Documents
                                </Link>
                            </div>
                        </div>
                    )}
                </div>
            </main>
        </div>
    );
};

export default ApplicationStatus;
