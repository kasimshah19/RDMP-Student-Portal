import React, { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Check, X } from 'lucide-react';

const Seal = () => (
    <div className="flex-shrink-0 w-16 h-16 rounded-full border-[3px] border-navy bg-brass flex items-center justify-center shadow-md animate-seal-stamp">
        <div className="absolute inset-0 bg-navy/10 mix-blend-overlay rounded-full"></div>
        <div className="text-navy font-display font-black text-2xl z-10 seal-check relative"><Check size={32} /></div>
    </div>
);

const AdmissionDetail = () => {
    const { id } = useParams();
    const navigate = useNavigate();
    const [status, setStatus] = useState('pending');
    const [showModal, setShowModal] = useState(false);

    const handleApprove = () => {
        setStatus('approved');
        setTimeout(() => {
            setShowModal(false);
            // navigate('/admin/admissions');
        }, 1500);
    };

    return (
        <div className="w-full max-w-4xl mx-auto pb-12 animate-in fade-in">
            <h1 className="text-2xl font-bold font-display text-navy mb-6">Admission Review #{id?.substring(0, 6) || '883921'}</h1>

            <div className="bg-paper p-6 sm:p-8 rounded-lg shadow-sm border border-mist mb-8">
                <div className="flex justify-between items-start border-b border-mist pb-6 mb-6">
                    <div>
                        <h2 className="text-xl font-bold text-ink">Shaikh Kasim</h2>
                        <p className="text-slate text-sm font-mono mt-1">Applied for 11th Science</p>
                    </div>
                    {status === 'approved' ? (
                        <span className="bg-success-soft text-success-text px-3 py-1 text-xs font-bold uppercase tracking-widest rounded-full border border-success-text/20 flex items-center gap-2">
                            <Check size={14} /> Approved
                        </span>
                    ) : (
                        <span className="bg-warning-soft text-warning-text px-3 py-1 text-xs font-bold uppercase tracking-widest rounded-full border border-warning-text/20 flex items-center gap-2">
                            Pending Review
                        </span>
                    )}
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-8">
                    <div>
                        <h3 className="text-sm font-semibold text-slate uppercase tracking-wider mb-4">Applicant Data</h3>
                        <div className="space-y-4 text-sm">
                            <div className="grid grid-cols-2">
                                <span className="text-slate font-medium">Date of Birth</span>
                                <span className="text-ink font-mono font-medium">12-08-2008</span>
                            </div>
                            <div className="grid grid-cols-2">
                                <span className="text-slate font-medium">Previous School</span>
                                <span className="text-ink font-medium">RDMP High School</span>
                            </div>
                            <div className="grid grid-cols-2">
                                <span className="text-slate font-medium">Board Marks</span>
                                <span className="text-ink font-mono font-medium">88.40%</span>
                            </div>
                        </div>
                    </div>
                    <div>
                        <h3 className="text-sm font-semibold text-slate uppercase tracking-wider mb-4">Official Documents</h3>
                        <div className="space-y-2">
                            <div className="flex justify-between items-center p-3 border border-mist rounded bg-cloud">
                                <span className="text-sm text-ink font-medium">10th Marksheet</span>
                                <span className="text-[10px] text-success-text font-bold uppercase tracking-widest bg-success-soft px-2 py-0.5 rounded flex items-center gap-1"><Check size={10} /> Verified</span>
                            </div>
                            <div className="flex justify-between items-center p-3 border border-mist rounded bg-cloud">
                                <span className="text-sm text-ink font-medium">Leaving Certificate</span>
                                <span className="text-[10px] text-warning-text font-bold uppercase tracking-widest bg-warning-soft px-2 py-0.5 rounded">Pending Upload</span>
                            </div>
                        </div>
                    </div>
                </div>

                {status === 'pending' && (
                    <div className="flex gap-4 border-t border-mist pt-6">
                        <button onClick={() => setShowModal(true)} className="bg-brass text-ink font-bold px-6 py-2.5 rounded shadow-sm hover:shadow-md transition active:scale-95 flex items-center gap-2">
                            <Check size={18} /> Approve Admission
                        </button>
                        <button className="bg-paper border border-danger-text text-danger-text hover:bg-danger-soft font-semibold px-6 py-2.5 rounded transition">
                            Reject
                        </button>
                    </div>
                )}
            </div>

            {/* Approval Modal */}
            {showModal && (
                <div className="fixed inset-0 bg-navy/80 z-50 flex items-center justify-center p-4">
                    <div className="bg-paper w-full max-w-sm rounded-lg shadow-xl border border-mist p-6 relative animate-in zoom-in-95 duration-200">
                        {status === 'pending' ? (
                            <>
                                <button onClick={() => setShowModal(false)} className="absolute top-4 right-4 text-slate hover:text-ink transition"><X size={20} /></button>
                                <h3 className="text-lg font-bold text-ink mb-2">Confirm Approval</h3>
                                <p className="text-sm text-slate mb-6">Are you sure you want to approve this admission? This will generate a permanent institutional record.</p>
                                <div className="flex justify-end gap-3">
                                    <button onClick={() => setShowModal(false)} className="px-4 py-2 text-sm font-semibold text-slate hover:text-ink transition">Cancel</button>
                                    <button onClick={handleApprove} className="bg-brass text-ink px-4 py-2 rounded text-sm font-bold shadow transition">Verify & Approve</button>
                                </div>
                            </>
                        ) : (
                            <div className="py-8 flex flex-col items-center justify-center text-center">
                                <Seal />
                                <h3 className="text-xl font-bold font-display text-navy mt-4 mb-1">Institution Verified</h3>
                                <p className="text-sm text-slate">Admission Officially Approved</p>
                            </div>
                        )}
                    </div>
                </div>
            )}

            <style>{`
                @keyframes seal-stamp {
                    0% { transform: scale(3) rotate(-15deg); opacity: 0; }
                    50% { transform: scale(0.9) rotate(5deg); opacity: 1; }
                    100% { transform: scale(1) rotate(0deg); opacity: 1; }
                }
                .animate-seal-stamp { animation: seal-stamp 0.4s cubic-bezier(0.175, 0.885, 0.32, 1.275) forwards; }
            `}</style>
        </div>
    );
};

export default AdmissionDetail;