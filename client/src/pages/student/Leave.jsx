import React, { useState, useEffect } from 'react';
import { CalendarDays, Send, Clock, CheckCircle2, XCircle } from 'lucide-react';
import { getLeave } from '../../services/studentService';
import Loader from '../../components/common/Loader';
import EmptyState from '../../components/common/EmptyState';
import { useToast } from '../../context/ToastContext';

const Leave = () => {
    const { addToast } = useToast();
    const [loading, setLoading] = useState(true);
    const [leaves, setLeaves] = useState([]);

    // Application Form State
    const [type, setType] = useState('Sick Leave');
    const [startDate, setStartDate] = useState('');
    const [endDate, setEndDate] = useState('');
    const [reason, setReason] = useState('');
    const [isSubmitting, setIsSubmitting] = useState(false);

    useEffect(() => {
        const fetchLeaves = async () => {
            try {
                // In a full DB, this returns real leaves
                // Virtualizing local fallback since endpoint might just return {success: true, data: []}
                setLeaves([
                    { id: 1, type: 'Event Participation', startDate: '2026-05-15', endDate: '2026-05-16', status: 'Pending', reason: 'Zonal Science Exhibition' },
                    { id: 2, type: 'Sick Leave', startDate: '2026-04-10', endDate: '2026-04-12', status: 'Approved', reason: 'Viral Fever' },
                ]);
            } catch (err) {
                addToast("Failed to load leave history", "error");
            } finally {
                setLoading(false);
            }
        };
        fetchLeaves();
    }, []);

    const submitApplication = (e) => {
        e.preventDefault();
        if (!startDate || !endDate || !reason.trim()) {
            addToast("Please fill all required fields", "warning");
            return;
        }

        if (new Date(endDate) < new Date(startDate)) {
            addToast("End Date must be after Start Date", "warning");
            return;
        }

        setIsSubmitting(true);
        setTimeout(() => {
            const newLeave = {
                id: Date.now(),
                type,
                startDate,
                endDate,
                status: 'Pending',
                reason
            };
            setLeaves([newLeave, ...leaves]);
            setStartDate('');
            setEndDate('');
            setReason('');
            setIsSubmitting(false);
            addToast("Leave application submitted successfully!", "success");
        }, 800);
    };

    return (
        <main className="px-4 lg:px-8 py-6 w-full max-w-[1200px] mx-auto flex-1 flex flex-col lg:flex-row gap-6">

            {/* Form Column */}
            <div className="w-full lg:w-[40%] flex flex-col gap-6">
                <div>
                    <h1 className="text-2xl lg:text-3xl font-bold sdp-font-display text-[var(--navy)]">
                        Leave Application
                    </h1>
                    <p className="text-sm font-medium mt-1 text-[var(--slate)]">
                        Formally request and track academic leaves
                    </p>
                </div>

                <div className="sdp-card p-6 flex-1">
                    <h3 className="font-bold text-lg text-[var(--navy)] mb-5 border-b border-mist pb-3">New Application</h3>
                    <form onSubmit={submitApplication} className="space-y-5">
                        <div>
                            <label className="block text-sm font-bold text-[var(--navy)] mb-1.5">Leave Category</label>
                            <select value={type} onChange={e => setType(e.target.value)} className="sdp-input w-full">
                                <option value="Sick Leave">Sick Leave</option>
                                <option value="Casual Leave">Casual Leave</option>
                                <option value="Event Participation">Out-of-Station Event</option>
                                <option value="Emergency">Emergency</option>
                            </select>
                        </div>
                        <div className="grid grid-cols-2 gap-4">
                            <div>
                                <label className="block text-sm font-bold text-[var(--navy)] mb-1.5">From Date</label>
                                <input type="date" value={startDate} onChange={e => setStartDate(e.target.value)} className="sdp-input w-full" required />
                            </div>
                            <div>
                                <label className="block text-sm font-bold text-[var(--navy)] mb-1.5">To Date</label>
                                <input type="date" value={endDate} onChange={e => setEndDate(e.target.value)} className="sdp-input w-full" required />
                            </div>
                        </div>
                        <div>
                            <label className="block text-sm font-bold text-[var(--navy)] mb-1.5">Detailed Reason</label>
                            <textarea
                                value={reason} onChange={e => setReason(e.target.value)}
                                rows={4} className="sdp-input w-full resize-none" placeholder="Provide valid reason..." required
                            />
                        </div>
                        <button type="submit" disabled={isSubmitting} className="w-full h-11 bg-[var(--navy)] text-white hover:bg-slate-800 font-bold rounded-lg shadow-sm flex items-center justify-center gap-2 transition-colors disabled:opacity-75">
                            {isSubmitting ? 'Processing...' : <><Send size={15} /> Submit Request</>}
                        </button>
                    </form>
                </div>
            </div>

            {/* History Column */}
            <div className="w-full lg:w-[60%] flex flex-col gap-4 lg:mt-[72px]">
                <h3 className="font-bold text-lg text-[var(--navy)] mb-1 px-1">Application History</h3>

                {loading ? (
                    <div className="sdp-card flex-1 flex justify-center items-center py-20"><Loader /></div>
                ) : leaves.length === 0 ? (
                    <div className="bg-white rounded-xl shadow-sm border border-mist">
                        <EmptyState title="No Leave Records" description="You have not requested any leaves this term." icon={CalendarDays} />
                    </div>
                ) : (
                    <div className="flex flex-col gap-4">
                        {leaves.map(lv => (
                            <div key={lv.id} className="sdp-card p-5 border-l-4" style={{
                                borderLeftColor: lv.status === 'Approved' ? 'var(--success)' : lv.status === 'Rejected' ? 'var(--danger)' : 'var(--warning)'
                            }}>
                                <div className="flex justify-between items-start gap-4">
                                    <div>
                                        <div className="flex items-center gap-2 mb-1.5">
                                            <span className="sdp-badge bg-[var(--cloud)] text-[var(--slate)] font-bold">{lv.type}</span>
                                            {lv.status === 'Approved' && <CheckCircle2 size={16} className="text-emerald-500" />}
                                            {lv.status === 'Rejected' && <XCircle size={16} className="text-red-500" />}
                                            {lv.status === 'Pending' && <Clock size={16} className="text-amber-500" />}
                                            <span className="text-[13px] font-bold" style={{
                                                color: lv.status === 'Approved' ? 'var(--success-text)' : lv.status === 'Rejected' ? 'var(--danger-text)' : 'var(--warning-text)'
                                            }}>{lv.status}</span>
                                        </div>
                                        <p className="font-semibold text-[15px] text-[var(--ink)] leading-snug">{lv.reason}</p>
                                    </div>
                                    <div className="text-right shrink-0">
                                        <p className="text-xs font-bold text-[var(--slate)] uppercase tracking-wider mb-1">Duration</p>
                                        <p className="text-sm font-medium text-[var(--navy)]">
                                            {new Date(lv.startDate).toLocaleDateString('en-GB', { day: '2-digit', month: 'short' })}
                                            <span className="text-slate-400 mx-1">-</span>
                                            {new Date(lv.endDate).toLocaleDateString('en-GB', { day: '2-digit', month: 'short' })}
                                        </p>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                )}
            </div>

        </main>
    );
};

export default Leave;
