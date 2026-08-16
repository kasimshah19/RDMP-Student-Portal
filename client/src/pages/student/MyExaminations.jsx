import React, { useState, useEffect } from 'react';
import { useToast } from '../../context/ToastContext';
import Loader from '../../components/common/Loader';
import EmptyState from '../../components/common/EmptyState';
import { getMyExaminations } from '../../services/studentService';
import {
    Calendar, Clock, FileText, Download, CheckCircle,
    AlertCircle, MapPin
} from 'lucide-react';

const MyExaminations = () => {
    const { addToast } = useToast();
    const [loading, setLoading] = useState(true);
    const [statusTab, setStatusTab] = useState('upcoming'); // 'upcoming' | 'completed'
    const [exams, setExams] = useState([]);

    const fetchExams = async () => {
        setLoading(true);
        try {
            const res = await getMyExaminations({ status: statusTab });
            if (res.success) {
                setExams(res.data);
            }
        } catch (err) {
            addToast("Failed to fetch examinations data", "error");
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchExams();
        // eslint-disable-next-line
    }, [statusTab]);

    const handleDownloadHT = (exam) => {
        if (!exam.hallTicketUrl) return;
        addToast(`Downloading Hall Ticket for ${exam.subject}...`, 'info');
        // In a real app we'd trigger a blob download or window.open
        setTimeout(() => addToast("Download complete", "success"), 1000);
    };

    const UpcomingCard = ({ exam }) => {
        const examDate = new Date(exam.date);
        const today = new Date();
        const diffTime = examDate - today;
        const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));

        let countdownBadge = null;
        if (diffDays === 0) {
            countdownBadge = <span className="sdp-badge bg-[var(--danger)] text-white animate-pulse shadow-sm">Today!</span>;
        } else if (diffDays === 1) {
            countdownBadge = <span className="sdp-badge bg-[var(--warning)] text-white shadow-sm">Tomorrow</span>;
        } else if (diffDays > 0 && diffDays <= 7) {
            countdownBadge = <span className="sdp-badge bg-[var(--info-soft)]" style={{ color: "var(--info-text)" }}>In {diffDays} days</span>;
        }

        return (
            <div className="sdp-card p-5 border-mist hover:border-[var(--brass)] transition-colors group">
                <div className="flex items-start justify-between gap-4 mb-4">
                    <div>
                        <div className="flex items-center gap-2 mb-1.5">
                            <span className="sdp-badge bg-[var(--cloud)]" style={{ color: "var(--slate)" }}>
                                {exam.examName} • {exam.term}
                            </span>
                            {countdownBadge}
                        </div>
                        <h3 className="sdp-font-display text-xl font-semibold" style={{ color: "var(--navy)" }}>
                            {exam.subject}
                        </h3>
                    </div>
                </div>

                <div className="grid grid-cols-2 gap-y-4 gap-x-2 mb-5">
                    <div className="flex items-center gap-2 text-sm text-[var(--ink)]">
                        <Calendar size={16} className="text-[var(--slate)]" />
                        <span className="font-medium">{examDate.toLocaleDateString('en-GB', { day: '2-digit', month: 'short', year: 'numeric' })}</span>
                    </div>
                    <div className="flex items-center gap-2 text-sm text-[var(--ink)]">
                        <Clock size={16} className="text-[var(--slate)]" />
                        <span className="font-medium">{exam.startTime} - {exam.endTime}</span>
                    </div>
                    <div className="col-span-2 flex items-center gap-2 text-sm text-[var(--ink)]">
                        <MapPin size={16} className="text-[var(--slate)]" />
                        <span className="font-medium">{exam.room}</span>
                    </div>
                </div>

                <div className="p-3 rounded-lg bg-[var(--cloud)]/50 mb-5 text-sm flex items-start gap-2" style={{ color: "var(--slate)" }}>
                    <AlertCircle size={15} className="mt-0.5 shrink-0 text-[var(--brass)]" />
                    <p>{exam.instructions}</p>
                </div>

                <div className="pt-4 border-t border-mist flex justify-end">
                    <button
                        onClick={() => handleDownloadHT(exam)}
                        disabled={!exam.hallTicketUrl}
                        className={`flex items-center justify-center gap-2 w-full sm:w-auto px-4 py-2.5 rounded-lg text-sm font-medium transition-colors ${exam.hallTicketUrl
                                ? 'bg-[var(--navy)] text-white hover:opacity-90 shadow-sm'
                                : 'bg-[var(--cloud)] text-[var(--slate)] cursor-not-allowed border border-mist'
                            }`}
                    >
                        <FileText size={16} />
                        {exam.hallTicketUrl ? 'Download Hall Ticket' : 'Hall Ticket Unavailable'}
                    </button>
                </div>
            </div>
        );
    };

    return (
        <main className="px-4 lg:px-8 py-6 w-full max-w-[1200px] mx-auto flex-1 flex flex-col">
            <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 mb-6">
                <h1 className="text-2xl lg:text-3xl font-bold sdp-font-display text-[var(--navy)]">
                    My Examinations
                </h1>

                <div className="flex bg-[var(--cloud)] p-1 rounded-lg border border-mist w-full sm:w-auto">
                    <button
                        onClick={() => setStatusTab('upcoming')}
                        className={`flex-1 sm:flex-none px-5 py-2 text-sm font-medium rounded-md transition-colors ${statusTab === 'upcoming'
                                ? 'bg-white text-[var(--navy)] shadow-sm'
                                : 'text-[var(--slate)] hover:text-[var(--ink)]'
                            }`}
                    >
                        Upcoming
                    </button>
                    <button
                        onClick={() => setStatusTab('completed')}
                        className={`flex-1 sm:flex-none px-5 py-2 text-sm font-medium rounded-md transition-colors ${statusTab === 'completed'
                                ? 'bg-white text-[var(--navy)] shadow-sm'
                                : 'text-[var(--slate)] hover:text-[var(--ink)]'
                            }`}
                    >
                        Completed
                    </button>
                </div>
            </div>

            <div className="flex-1 min-h-[400px]">
                {loading ? (
                    <div className="flex h-full w-full justify-center items-center py-20">
                        <Loader />
                    </div>
                ) : exams.length === 0 ? (
                    <div className="mt-8">
                        <EmptyState
                            title={`No ${statusTab} examinations`}
                            description={`You do not have any ${statusTab} exams scheduled at this time.`}
                        />
                    </div>
                ) : statusTab === 'upcoming' ? (
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                        {exams.map(exam => <UpcomingCard key={exam.id} exam={exam} />)}
                    </div>
                ) : (
                    <div className="sdp-card overflow-hidden border-mist">
                        <div className="overflow-x-auto">
                            <table className="sdp-table w-full border-collapse">
                                <thead>
                                    <tr>
                                        <th>Subject</th>
                                        <th>Exam Name</th>
                                        <th>Date</th>
                                        <th>Time</th>
                                        <th>Status</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {exams.map(exam => (
                                        <tr key={exam.id} className="hover:bg-[var(--cloud)]/30 transition-colors">
                                            <td className="font-semibold text-[var(--ink)]">{exam.subject}</td>
                                            <td className="text-[var(--slate)] text-[13.5px]">{exam.examName}</td>
                                            <td className="font-medium text-[var(--ink)]">
                                                {new Date(exam.date).toLocaleDateString('en-GB', { day: '2-digit', month: 'short', year: 'numeric' })}
                                            </td>
                                            <td className="text-[var(--slate)] text-[13.5px]">
                                                {exam.startTime} - {exam.endTime}
                                            </td>
                                            <td>
                                                <span className="sdp-badge bg-[var(--success-soft)]" style={{ color: "var(--success-text)" }}>
                                                    <CheckCircle size={13} className="mr-1" /> Completed
                                                </span>
                                            </td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>
                    </div>
                )}
            </div>
        </main>
    );
};

export default MyExaminations;
