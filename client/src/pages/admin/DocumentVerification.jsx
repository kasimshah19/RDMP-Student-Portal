import React, { useState, useEffect } from 'react';
import { Search, Filter, ShieldCheck, XCircle, CheckCircle, Clock, Eye, Download, Shield } from 'lucide-react';
import { getAllSubmissions, verifyDocument } from '../../services/adminService';
import Loader from '../../components/common/Loader';
import EmptyState from '../../components/common/EmptyState';
import { useToast } from '../../context/ToastContext';

const DocumentVerification = () => {
    const { addToast } = useToast();
    const [loading, setLoading] = useState(true);
    const [submissions, setSubmissions] = useState([]);

    const [filter, setFilter] = useState('Pending Verification');
    const [search, setSearch] = useState('');

    // Split-Screen Modal state
    const [reviewDoc, setReviewDoc] = useState(null);

    const fetchSubmissions = async () => {
        setLoading(true);
        try {
            const res = await getAllSubmissions(filter !== 'All' ? { status: filter } : {});
            if (res.success) setSubmissions(res.data);
        } catch (err) {
            addToast("Failed to fetch submissions", "error");
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchSubmissions();
        // eslint-disable-next-line
    }, [filter]);

    const filteredList = submissions.filter(s => {
        if (!search) return true;
        const term = search.toLowerCase();
        return (
            s.studentId?.name?.toLowerCase().includes(term) ||
            s.studentId?.admissionNumber?.toLowerCase().includes(term) ||
            s.documentTypeId?.name?.toLowerCase().includes(term)
        );
    });

    return (
        <main className="px-4 lg:px-8 py-6 w-full max-w-[1400px] mx-auto flex-1 flex flex-col">
            <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-6">
                <div>
                    <h1 className="text-2xl lg:text-3xl font-bold sdp-font-display text-[var(--navy)] flex items-center gap-3">
                        <ShieldCheck size={28} className="text-[var(--brass)]" /> Document Verification Center
                    </h1>
                    <p className="text-sm font-medium mt-1 text-[var(--slate)]">Review and mandate student identity and compliance uploads securely.</p>
                </div>
            </div>

            <div className="sdp-card p-4 mb-6 flex flex-col md:flex-row gap-4 items-center justify-between">
                <div className="relative w-full max-w-md">
                    <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={18} />
                    <input
                        type="text"
                        placeholder="Search by Student Name, Admission No..."
                        value={search} onChange={e => setSearch(e.target.value)}
                        className="sdp-input w-full pl-10"
                    />
                </div>
                <div className="flex items-center gap-3 w-full md:w-auto">
                    <Filter size={18} className="text-[var(--slate)]" />
                    <select value={filter} onChange={e => setFilter(e.target.value)} className="sdp-input md:w-48 bg-white">
                        <option value="All">All Documents</option>
                        <option value="Pending Verification">Pending Verification</option>
                        <option value="Verified">Verified</option>
                        <option value="Rejected">Rejected</option>
                        <option value="Re-upload Required">Re-load Requested</option>
                    </select>
                </div>
            </div>

            {loading ? (
                <div className="flex justify-center items-center h-[300px]"><Loader /></div>
            ) : filteredList.length === 0 ? (
                <EmptyState title="Queue Empty" description="No documents match your operational filters." icon={Shield} />
            ) : (
                <div className="sdp-card overflow-hidden">
                    <div className="overflow-x-auto">
                        <table className="sdp-table w-full border-collapse">
                            <thead>
                                <tr>
                                    <th>Student</th>
                                    <th>Admission No.</th>
                                    <th>Class</th>
                                    <th>Document Type</th>
                                    <th>Uploaded At</th>
                                    <th>Status</th>
                                    <th className="text-right">Actions</th>
                                </tr>
                            </thead>
                            <tbody>
                                {filteredList.map((doc) => (
                                    <tr key={doc._id} className="hover:bg-gray-50/50 transition-colors">
                                        <td className="font-bold text-[var(--navy)]">{doc.studentId?.name || 'Corrupted ID'}</td>
                                        <td className="font-semibold text-[var(--slate)]">{doc.studentId?.admissionNumber || 'N/A'}</td>
                                        <td className="font-medium text-[var(--slate)]">{doc.studentId?.class || 'N/A'}</td>
                                        <td className="font-bold text-[var(--ink)]">{doc.documentTypeId?.name}</td>
                                        <td className="text-sm font-medium text-[var(--slate)]">
                                            {new Date(doc.uploadedAt).toLocaleDateString('en-GB')}
                                        </td>
                                        <td>
                                            <span className={`px-2.5 py-1 rounded text-xs font-bold uppercase tracking-wider 
                                                ${doc.status === 'Verified' ? 'bg-[var(--success-soft)] text-[var(--success-text)]' :
                                                    doc.status === 'Pending Verification' ? 'bg-[var(--warning-soft)] text-[var(--warning-text)]' :
                                                        'bg-[var(--danger-soft)] text-[var(--danger-text)]'}`}>
                                                {doc.status}
                                            </span>
                                        </td>
                                        <td className="text-right">
                                            <button onClick={() => setReviewDoc(doc)} className="px-4 py-1.5 bg-[var(--navy)] text-white text-xs font-bold rounded shadow-sm hover:opacity-90 flex items-center gap-1.5 ml-auto">
                                                <Eye size={14} /> Review
                                            </button>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                </div>
            )}

            {reviewDoc && (
                <VerificationModal
                    doc={reviewDoc}
                    onClose={() => setReviewDoc(null)}
                    onActionComplete={() => { setReviewDoc(null); fetchSubmissions(); }}
                />
            )}
        </main>
    );
};

/* Heavy Split-Screen Review Modal */
const VerificationModal = ({ doc, onClose, onActionComplete }) => {
    const { addToast } = useToast();
    const [action, setAction] = useState(''); // 'Verify', 'Reject', 'Re-upload'
    const [reason, setReason] = useState('');
    const [submitting, setSubmitting] = useState(false);

    const handleSubmit = async () => {
        if ((action === 'Rejected' || action === 'Re-upload Required') && !reason.trim()) {
            return addToast("Please provide a mandate reason.", "warning");
        }

        setSubmitting(true);
        try {
            const res = await verifyDocument(doc._id, {
                status: action,
                rejectionReason: action === 'Rejected' ? reason : null,
                reuploadReason: action === 'Re-upload Required' ? reason : null,
            });
            if (res.success) {
                addToast(`Document successfully ${action.toLowerCase()}`, "success");
                onActionComplete();
            } else {
                addToast(res.message, "error");
            }
        } catch (err) {
            addToast("Mutation failed.", "error");
        } finally {
            setSubmitting(false);
        }
    };

    return (
        <div className="fixed inset-0 z-[100] bg-black/90 backdrop-blur-sm flex items-center justify-center lg:p-6">
            <div className="bg-white lg:rounded-xl shadow-2xl w-full h-full lg:h-[90vh] max-w-[1400px] flex flex-col lg:flex-row overflow-hidden animate-in fade-in zoom-in-95 duration-200">

                {/* Visual Preview Left Frame */}
                <div className="w-full lg:w-2/3 h-[50vh] lg:h-full bg-slate-100 flex flex-col border-b lg:border-b-0 lg:border-r border-mist relative">
                    <div className="absolute top-4 right-4 z-10 flex gap-2">
                        <a href={doc.fileUrl} download target="_blank" rel="noreferrer" className="p-2 bg-white/90 shadow text-[var(--navy)] rounded hover:bg-white hover:text-[var(--brass)] transition-colors"><Download size={20} /></a>
                    </div>
                    {doc.fileUrl?.toLowerCase().endsWith('.pdf') ? (
                        <iframe src={doc.fileUrl} className="w-full h-full border-0" title="PDF Document" />
                    ) : (
                        <img src={doc.fileUrl} alt="Document View" className="w-full h-full object-contain p-4" />
                    )}
                </div>

                {/* Verification Engine Right Frame */}
                <div className="w-full lg:w-1/3 h-full overflow-y-auto flex flex-col bg-white">
                    <div className="p-6 border-b border-mist flex justify-between items-center bg-[var(--cloud)]">
                        <h2 className="font-bold text-lg text-[var(--navy)]">Verification Node</h2>
                        <button onClick={onClose} className="text-[var(--slate)] hover:text-red-500"><XCircle size={24} /></button>
                    </div>

                    <div className="p-6 flex-1 flex flex-col space-y-6">
                        {/* Student Meta Data */}
                        <div className="bg-slate-50 p-4 rounded-lg border border-slate-200 space-y-2">
                            <h3 className="font-bold text-[var(--navy)] border-b border-slate-200 pb-2 mb-3">Target Signature</h3>
                            <div className="text-[13px] grid grid-cols-3 gap-1">
                                <span className="font-bold text-[var(--slate)]">Name:</span>
                                <span className="col-span-2 font-bold text-[var(--ink)]">{doc.studentId?.name}</span>
                            </div>
                            <div className="text-[13px] grid grid-cols-3 gap-1">
                                <span className="font-bold text-[var(--slate)]">Admission No:</span>
                                <span className="col-span-2 font-bold text-[var(--ink)]">{doc.studentId?.admissionNumber}</span>
                            </div>
                            <div className="text-[13px] grid grid-cols-3 gap-1">
                                <span className="font-bold text-[var(--slate)]">Category:</span>
                                <span className="col-span-2 font-bold text-[var(--ink)]">{doc.studentId?.category}</span>
                            </div>
                        </div>

                        {/* Document Meta Data */}
                        <div>
                            <h3 className="font-bold text-sm text-[var(--slate)] uppercase tracking-widest mb-1.5">Document</h3>
                            <p className="font-bold text-xl text-[var(--navy)] leading-tight">{doc.documentTypeId?.name}</p>
                            <p className="text-sm font-medium text-[var(--slate)] mt-1">{doc.documentTypeId?.category}</p>
                        </div>

                        {/* Verification Action Matrix */}
                        <div className="pt-4 border-t border-mist mt-auto">
                            {!action ? (
                                <div className="flex flex-col gap-3">
                                    <button onClick={() => setAction('Verified')} className="w-full py-3 bg-[var(--success)] hover:bg-emerald-600 text-white font-bold rounded-lg shadow-sm flex items-center justify-center gap-2">
                                        <CheckCircle size={18} /> Approve Document
                                    </button>
                                    <div className="grid grid-cols-2 gap-3">
                                        <button onClick={() => setAction('Re-upload Required')} className="py-2.5 bg-amber-500 hover:bg-amber-600 text-white font-bold rounded-lg shadow-sm text-sm">
                                            Request Re-upload
                                        </button>
                                        <button onClick={() => setAction('Rejected')} className="py-2.5 bg-[var(--danger)] hover:bg-red-700 text-white font-bold rounded-lg shadow-sm text-sm">
                                            Hard Reject
                                        </button>
                                    </div>
                                </div>
                            ) : (
                                <div className="space-y-4 animate-in slide-in-from-bottom-4 duration-300">
                                    <div className="flex items-center justify-between">
                                        <h3 className="font-bold text-[var(--navy)] text-lg border-l-4 border-[var(--brass)] pl-3">
                                            Confirm <span className={action === 'Verified' ? 'text-[var(--success)]' : 'text-[var(--danger)]'}>{action}</span>
                                        </h3>
                                        <button onClick={() => setAction('')} className="text-xs font-bold text-[var(--slate)] hover:text-[var(--navy)] underline">Change</button>
                                    </div>

                                    {['Rejected', 'Re-upload Required'].includes(action) && (
                                        <div>
                                            <label className="block text-sm font-bold text-[var(--navy)] mb-1.5">Reason for {action}</label>
                                            <textarea
                                                value={reason} onChange={e => setReason(e.target.value)}
                                                rows={4} className="sdp-input w-full" placeholder="e.g. Uploaded photograph is extremely blurry..." autoFocus required
                                            />
                                        </div>
                                    )}

                                    <button onClick={handleSubmit} disabled={submitting} className="w-full py-3 bg-[var(--navy)] hover:bg-slate-800 text-white font-bold rounded-lg shadow-sm">
                                        {submitting ? 'Executing...' : 'Commit Database Operation'}
                                    </button>
                                </div>
                            )}
                        </div>
                    </div>
                </div>

            </div>
        </div>
    );
};

export default DocumentVerification;
