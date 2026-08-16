import React, { useState, useEffect, useMemo, useRef } from 'react';
import { FileText, Download, CheckCircle, AlertTriangle, Clock, RefreshCw, Eye, UploadCloud, X, Upload } from 'lucide-react';
import { getDocuments, uploadDocument } from '../../services/studentService';
import Loader from '../../components/common/Loader';
import EmptyState from '../../components/common/EmptyState';
import { useToast } from '../../context/ToastContext';

const Documents = () => {
    const { addToast } = useToast();
    const [loading, setLoading] = useState(true);
    const [documents, setDocuments] = useState([]);

    // Modals
    const [uploadModal, setUploadModal] = useState({ open: false, doc: null });
    const [previewModal, setPreviewModal] = useState({ open: false, url: null, type: null });

    const fetchDocs = async () => {
        setLoading(true);
        try {
            const res = await getDocuments();
            if (res.success) setDocuments(res.data);
        } catch (err) {
            addToast("Failed to fetch documents", "error");
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchDocs();
        // eslint-disable-next-line
    }, []);

    // Derived Statistics
    const stats = useMemo(() => {
        const requiredDocs = documents.filter(d => d.isRequired);
        const total = requiredDocs.length;
        if (total === 0) return { total: 0, verified: 0, pending: 0, missing: 0, reupload: 0, completion: 100 };

        let verified = 0, pending = 0, missing = 0, reupload = 0;
        requiredDocs.forEach(d => {
            if (d.status === 'Verified') verified++;
            else if (d.status === 'Pending Verification') pending++;
            else if (d.status === 'Re-upload Required' || d.status === 'Rejected') reupload++;
            else missing++;
        });

        return {
            total, verified, pending, missing, reupload,
            completion: Math.round((verified / total) * 100)
        };
    }, [documents]);

    const groupedCategories = useMemo(() => {
        return documents.reduce((acc, doc) => {
            if (!acc[doc.category]) acc[doc.category] = [];
            acc[doc.category].push(doc);
            return acc;
        }, {});
    }, [documents]);

    // Sub-components
    const DocumentCard = ({ doc }) => {
        const StatusConfig = {
            'Not Uploaded': { c: 'var(--slate)', bg: 'var(--cloud)', text: 'Not Uploaded', icon: AlertTriangle },
            'Pending Verification': { c: 'var(--warning-text)', bg: 'var(--warning-soft)', text: 'Pending', icon: Clock },
            'Verified': { c: 'var(--success-text)', bg: 'var(--success-soft)', text: 'Verified', icon: CheckCircle },
            'Rejected': { c: 'var(--danger-text)', bg: 'var(--danger-soft)', text: 'Rejected', icon: X },
            'Re-upload Required': { c: 'var(--danger-text)', bg: 'var(--danger-soft)', text: 'Re-upload Required', icon: RefreshCw }
        };
        const st = StatusConfig[doc.status] || StatusConfig['Not Uploaded'];
        const Icon = st.icon;

        return (
            <div className="sdp-card p-4 border border-mist hover:border-[var(--brass)] transition-colors flex flex-col justify-between">
                <div>
                    <div className="flex justify-between items-start gap-2 mb-2">
                        <h4 className="font-bold text-[var(--navy)] text-[15px] leading-snug">{doc.name}</h4>
                        <span className="flex items-center gap-1 text-[10px] uppercase font-bold tracking-wider px-2 py-1 rounded"
                            style={{ backgroundColor: st.bg, color: st.c }}>
                            <Icon size={12} /> {st.text}
                        </span>
                    </div>
                    {doc.isRequired && doc.status === 'Not Uploaded' && (
                        <span className="text-xs font-semibold text-[var(--danger)] bg-red-50 px-2 py-0.5 rounded border border-red-100">REQUIRED</span>
                    )}
                    <p className="text-[13px] text-[var(--slate)] font-medium mt-2 line-clamp-2">{doc.description}</p>
                </div>

                {['Rejected', 'Re-upload Required'].includes(doc.status) && doc.uploadDetails?.rejectionReason && (
                    <div className="mt-3 bg-red-50 p-2.5 rounded border border-red-100 text-xs font-semibold text-red-700">
                        <strong className="block mb-0.5 uppercase tracking-wide text-[10px]">Reason:</strong>
                        {doc.uploadDetails.rejectionReason}
                    </div>
                )}

                <div className="mt-4 pt-3 border-t border-mist flex items-center justify-between">
                    {doc.uploadDetails ? (
                        <>
                            <div className="text-[11px] font-bold text-[var(--slate)] uppercase tracking-wide">
                                {new Date(doc.uploadDetails.uploadedAt).toLocaleDateString('en-GB')}
                            </div>
                            <div className="flex items-center gap-1">
                                <button onClick={() => setPreviewModal({ open: true, url: doc.uploadDetails.fileUrl, type: 'pdf' })} className="p-1.5 text-[var(--slate)] hover:text-[var(--navy)] hover:bg-[var(--cloud)] rounded transition-colors" title="View">
                                    <Eye size={16} />
                                </button>
                                {['Rejected', 'Re-upload Required'].includes(doc.status) && (
                                    <button onClick={() => setUploadModal({ open: true, doc })} className="px-3 py-1 bg-[var(--danger-soft)] hover:bg-red-200 text-[var(--danger-text)] text-xs font-bold rounded transition-colors">
                                        Re-upload
                                    </button>
                                )}
                            </div>
                        </>
                    ) : (
                        <button onClick={() => setUploadModal({ open: true, doc })} className="w-full py-1.5 bg-[var(--cloud)] hover:bg-[var(--navy)] hover:text-white text-[var(--navy)] text-xs font-bold uppercase tracking-wider rounded transition-colors border border-[var(--navy)]">
                            Upload Document
                        </button>
                    )}
                </div>
            </div>
        );
    };

    return (
        <main className="px-4 lg:px-8 py-6 w-full max-w-[1200px] mx-auto flex-1 flex flex-col pb-20">
            <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 mb-6">
                <div>
                    <h1 className="text-2xl lg:text-3xl font-bold sdp-font-display text-[var(--navy)]">My Documents</h1>
                    <p className="text-sm font-medium mt-1 text-[var(--slate)]">Manage and track your academic compliance documents safely</p>
                </div>
            </div>

            {loading ? (
                <div className="flex justify-center items-center h-[300px]"><Loader /></div>
            ) : (
                <>
                    {/* Completion Dashboard */}
                    <div className="sdp-card p-6 mb-8 flex flex-col md:flex-row gap-8 items-center bg-[var(--navy)] text-white">
                        <div className="flex-1 w-full shrink-0 max-w-[300px]">
                            <p className="text-sm font-bold text-slate-300 uppercase tracking-widest mb-2">Completion</p>
                            <div className="flex items-end gap-3 mb-2">
                                <span className="text-5xl font-extrabold">{stats.completion}%</span>
                                <span className="text-sm font-medium text-slate-400 mb-1">{stats.verified} of {stats.total} required</span>
                            </div>
                            <div className="w-full bg-slate-700 h-2.5 rounded-full overflow-hidden">
                                <div className="bg-[var(--brass)] h-full transition-all duration-1000" style={{ width: `${stats.completion}%` }}></div>
                            </div>
                        </div>
                        <div className="flex-1 w-full grid grid-cols-2 lg:grid-cols-4 gap-4 pt-4 md:pt-0 md:pl-8 md:border-l border-slate-700">
                            <div>
                                <p className="text-slate-400 text-xs font-bold uppercase tracking-widest">Total Required</p>
                                <p className="text-2xl font-bold mt-1 text-white">{stats.total}</p>
                            </div>
                            <div>
                                <p className="text-slate-400 text-xs font-bold uppercase tracking-widest">Pending</p>
                                <p className="text-2xl font-bold mt-1 text-[var(--warning)]">{stats.pending}</p>
                            </div>
                            <div>
                                <p className="text-slate-400 text-xs font-bold uppercase tracking-widest">Missing</p>
                                <p className="text-2xl font-bold mt-1 text-red-300">{stats.missing}</p>
                            </div>
                            <div>
                                <p className="text-slate-400 text-xs font-bold uppercase tracking-widest">Action Needed</p>
                                <p className="text-2xl font-bold mt-1 text-red-400">{stats.reupload}</p>
                            </div>
                        </div>
                    </div>

                    {/* Document Categories */}
                    <div className="space-y-8">
                        {Object.entries(groupedCategories).map(([catName, docs]) => {
                            const verifiedCnt = docs.filter(d => d.status === 'Verified').length;
                            return (
                                <div key={catName}>
                                    <div className="flex items-center justify-between mb-4 border-b border-mist pb-2">
                                        <h3 className="text-lg font-bold text-[var(--navy)] uppercase tracking-wide">{catName}</h3>
                                        <span className="text-xs font-bold text-[var(--slate)] bg-[var(--cloud)] px-3 py-1 rounded-full">
                                            {verifiedCnt} / {docs.length} Verified
                                        </span>
                                    </div>
                                    <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-5">
                                        {docs.map(doc => <DocumentCard key={doc.typeId} doc={doc} />)}
                                    </div>
                                </div>
                            );
                        })}
                        {documents.length === 0 && (
                            <EmptyState title="No Requirements Yet" description="There are no documents mandated for your profile segment currently." icon={FileText} />
                        )}
                    </div>
                </>
            )}

            {/* Upload Modal (Basic Wrapper) */}
            {uploadModal.open && (
                <UploadModal
                    doc={uploadModal.doc}
                    onClose={() => setUploadModal({ open: false, doc: null })}
                    onSuccess={() => {
                        setUploadModal({ open: false, doc: null });
                        fetchDocs();
                        addToast("Document uploaded! Passed to verification node.", "success");
                    }}
                />
            )}

            {/* Preview Modal */}
            {previewModal.open && (
                <div className="fixed inset-0 z-[100] bg-black/80 backdrop-blur-sm flex items-center justify-center p-4 lg:p-8">
                    <div className="bg-white rounded-xl shadow-2xl w-full h-[90vh] max-w-6xl overflow-hidden flex flex-col animate-in fade-in zoom-in-95 duration-200">
                        <div className="px-6 py-4 flex justify-between items-center bg-[var(--navy)] text-white shrink-0">
                            <h3 className="font-bold text-lg flex items-center gap-2"><Eye size={20} className="text-[var(--brass)]" /> Document Preview</h3>
                            <div className="flex gap-4 items-center">
                                <a href={previewModal.url} download target="_blank" rel="noreferrer" className="flex items-center gap-1.5 text-sm font-semibold hover:text-[var(--brass)] transition-colors"><Download size={16} /> Download</a>
                                <button onClick={() => setPreviewModal({ open: false, url: null, type: null })} className="text-gray-300 hover:text-white transition-colors"><X size={24} /></button>
                            </div>
                        </div>
                        <div className="p-4 bg-gray-100 flex-1 flex justify-center items-center overflow-auto">
                            {previewModal.url?.endsWith('.pdf') ? (
                                <iframe src={previewModal.url} className="w-full h-full shadow-lg border-0 bg-white" title="PDF Preview" />
                            ) : (
                                <img src={previewModal.url} alt="Document" className="max-w-full max-h-full object-contain shadow-lg" />
                            )}
                        </div>
                    </div>
                </div>
            )}
        </main>
    );
};

/* Dedicated Upload Modal Subcomponent */
const UploadModal = ({ doc, onClose, onSuccess }) => {
    const { addToast } = useToast();
    const [file, setFile] = useState(null);
    const [uploading, setUploading] = useState(false);
    const [progress, setProgress] = useState(0);

    const handleDrop = (e) => {
        e.preventDefault();
        const dropped = e.dataTransfer.files[0];
        if (dropped) validateFile(dropped);
    };

    const handleChange = (e) => {
        if (e.target.files[0]) validateFile(e.target.files[0]);
    };

    const validateFile = (f) => {
        if (f.size > 5 * 1024 * 1024) return addToast("File exceeds 5MB limit", "error");
        setFile(f);
    };

    const handleUpload = () => {
        if (!file) return addToast("Please select a file first", "warning");
        setUploading(true);
        setProgress(0);

        // Simulating upload progress bar visuals precisely
        const intv = setInterval(() => {
            setProgress(p => {
                if (p >= 90) { clearInterval(intv); return 90; }
                return p + 15;
            });
        }, 300);

        // Native API Call simulation wrapping multipart explicitly
        setTimeout(async () => {
            clearInterval(intv);
            const formData = new FormData();
            formData.append('documentFile', file);
            formData.append('documentTypeId', doc.typeId);

            try {
                const res = await uploadDocument(formData);
                if (res.success) {
                    setProgress(100);
                    setTimeout(() => onSuccess(), 400);
                } else {
                    addToast(res.message || "Upload failed", "error");
                    setUploading(false);
                }
            } catch (err) {
                addToast("Server failed resolving the multiplex binary stream natively.", "error");
                setUploading(false);
            }
        }, 1500);
    };

    return (
        <div className="fixed inset-0 z-[100] bg-black/60 backdrop-blur-sm flex items-center justify-center p-4">
            <div className="bg-white rounded-xl shadow-2xl w-full max-w-lg overflow-hidden animate-in fade-in zoom-in-95 duration-200">
                <div className="px-6 py-4 border-b border-mist flex justify-between items-center bg-[var(--cloud)]">
                    <h3 className="font-bold text-[var(--navy)] text-lg flex items-center gap-2">
                        <UploadCloud size={20} className="text-[var(--brass)]" /> Upload Document
                    </h3>
                    <button onClick={onClose} disabled={uploading} className="text-[var(--slate)] hover:text-[var(--danger)] transition-colors"><X size={20} /></button>
                </div>

                <div className="p-6">
                    <div className="mb-5">
                        <h4 className="font-bold text-[var(--ink)] text-[15px]">{doc.name}</h4>
                        <p className="text-sm text-[var(--slate)] mt-1">{doc.description}</p>
                    </div>

                    {!file ? (
                        <div
                            onDragOver={(e) => e.preventDefault()}
                            onDrop={handleDrop}
                            className="border-2 border-dashed border-gray-300 hover:border-[var(--brass)] rounded-xl h-[160px] flex flex-col items-center justify-center bg-gray-50 transition-colors cursor-pointer relative"
                        >
                            <input type="file" onChange={handleChange} accept=".pdf,.jpg,.jpeg,.png" className="absolute inset-0 opacity-0 cursor-pointer" />
                            <UploadCloud size={32} className="text-gray-400 mb-2" />
                            <p className="text-[13px] font-semibold text-[var(--slate)]">Drag & Drop or <span className="text-[var(--navy)] underline">Browse</span></p>
                            <p className="text-[11px] font-medium text-gray-400 mt-1">PDF, JPG, PNG up to 5MB</p>
                        </div>
                    ) : (
                        <div className="bg-[var(--cloud)] border border-mist rounded-xl p-4 flex items-center justify-between">
                            <div className="flex items-center gap-3 overflow-hidden">
                                <FileText size={28} className="text-[var(--navy)] shrink-0" />
                                <div className="truncate">
                                    <p className="text-sm font-bold text-[var(--ink)] truncate w-[220px]">{file.name}</p>
                                    <p className="text-xs text-[var(--slate)] font-medium">{(file.size / (1024 * 1024)).toFixed(2)} MB</p>
                                </div>
                            </div>
                            {!uploading && (
                                <button onClick={() => setFile(null)} className="p-1.5 bg-white shadow-sm border border-mist rounded text-[var(--danger)] hover:bg-red-50">
                                    <X size={14} />
                                </button>
                            )}
                        </div>
                    )}

                    {uploading && (
                        <div className="mt-5">
                            <div className="flex justify-between text-xs font-bold text-[var(--navy)] mb-1">
                                <span>Uploading & Encrypting...</span>
                                <span>{progress}%</span>
                            </div>
                            <div className="w-full bg-[var(--cloud)] rounded-full h-1.5 overflow-hidden">
                                <div className="bg-[var(--success)] h-full transition-all duration-300" style={{ width: `${progress}%` }}></div>
                            </div>
                        </div>
                    )}

                    <div className="mt-6 flex justify-end gap-3">
                        <button onClick={onClose} disabled={uploading} className="px-5 py-2 text-sm font-bold text-[var(--slate)] hover:text-[var(--ink)] bg-[var(--cloud)] hover:bg-mist rounded transition-colors disabled:opacity-50">Cancel</button>
                        <button onClick={handleUpload} disabled={uploading || !file} className="px-6 py-2 text-sm font-bold text-white bg-[var(--navy)] hover:bg-slate-800 rounded transition-colors disabled:opacity-50 shadow-sm flex items-center gap-2">
                            {uploading ? 'Processing...' : <><Upload size={16} /> Upload Securely</>}
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Documents;
