import React, { useState, useEffect, useContext } from 'react';
import { useToast } from '../../context/ToastContext';
import { AuthContext } from '../../context/AuthContext';
import Loader from '../../components/common/Loader';
import EmptyState from '../../components/common/EmptyState';
import { getMyResults } from '../../services/studentService';
import { Award, Download, Calendar, ExternalLink } from 'lucide-react';

const MyResults = () => {
    const { addToast } = useToast();
    const { user } = useContext(AuthContext);
    const [loading, setLoading] = useState(true);
    const [results, setResults] = useState([]);

    const fetchResults = async () => {
        setLoading(true);
        try {
            const res = await getMyResults();
            if (res.success) {
                // Determine order: descending by exam ID or name roughly maps to recency
                const sorted = [...res.data].sort((a, b) =>
                    b.exam.name.localeCompare(a.exam.name)
                );
                setResults(sorted);
            }
        } catch (err) {
            addToast("Failed to fetch academic results", "error");
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchResults();
        // eslint-disable-next-line
    }, []);

    const handleDownload = (examId, examName) => {
        addToast(`Generating marksheet for ${examName}...`, "info");
        // Using window.open allows the browser to handle the blob download stream efficiently
        window.open(`/api/marks/marksheet/${user.id}/${examId}`, "_blank");
    };

    const ResultCard = ({ item }) => {
        const { exam, stats } = item;
        const toneColor = stats.isFail ? "var(--danger)" :
            stats.grade === 'A+' || stats.grade === 'A' ? "var(--success)" :
                stats.grade === 'B+' || stats.grade === 'B' ? "var(--info-text)" :
                    "var(--warning)";

        return (
            <div className="sdp-card p-6 border-mist transition-all duration-300 hover:shadow-md hover:border-[var(--brass)] flex flex-col">
                <div className="flex items-start justify-between mb-5">
                    <div>
                        <div className="sdp-badge bg-[var(--cloud)] text-[var(--slate)] mb-2">
                            {exam.academicYear} • {exam.term}
                        </div>
                        <h3 className="sdp-font-display text-xl font-bold" style={{ color: "var(--navy)" }}>
                            {exam.name}
                        </h3>
                    </div>

                    <div
                        className="flex flex-col items-center justify-center rounded-xl p-3 shrink-0 sdp-font-display"
                        style={{ background: `${toneColor}15`, border: `1px solid ${toneColor}40` }}
                    >
                        <span className="text-2xl font-bold" style={{ color: toneColor }}>
                            {stats.grade}
                        </span>
                    </div>
                </div>

                <div className="grid grid-cols-2 gap-4 mb-6 pt-4 border-t border-mist/60 bg-[var(--cloud)]/30 rounded-xl p-4">
                    <div className="flex flex-col items-start">
                        <span className="text-[12px] font-semibold tracking-wide uppercase" style={{ color: "var(--slate)" }}>Percentage</span>
                        <span className="text-xl font-bold sdp-font-mono" style={{ color: "var(--ink)" }}>{stats.percentage}%</span>
                    </div>
                    <div className="flex flex-col items-start border-l border-mist/60 pl-4">
                        <span className="text-[12px] font-semibold tracking-wide uppercase" style={{ color: "var(--slate)" }}>Total Marks</span>
                        <span className="text-xl font-bold sdp-font-mono" style={{ color: "var(--ink)" }}>
                            {stats.totalObtained}
                            <span className="text-sm text-[var(--slate)] font-medium">/{stats.maxOverall}</span>
                        </span>
                    </div>
                </div>

                <div className="flex items-center justify-between mt-auto">
                    <span
                        className="font-medium text-sm flex items-center gap-1.5"
                        style={{ color: stats.isFail ? "var(--danger)" : "var(--success)" }}
                    >
                        <Award size={16} />
                        {stats.isFail ? 'Needs Improvement' : 'Passed Successfully'}
                    </span>

                    <button
                        onClick={() => handleDownload(exam._id, exam.name)}
                        className="sdp-btn-primary flex items-center gap-2 py-2 px-4 shadow-sm"
                    >
                        <Download size={14} /> Marksheet
                    </button>
                </div>
            </div>
        );
    };

    return (
        <main className="px-4 lg:px-8 py-6 w-full max-w-[1200px] mx-auto flex-1 flex flex-col">
            <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 mb-6">
                <div>
                    <h1 className="text-2xl lg:text-3xl font-bold sdp-font-display" style={{ color: "var(--navy)" }}>
                        My Results
                    </h1>
                    <p className="text-sm font-medium mt-1" style={{ color: "var(--slate)" }}>
                        Academic performance and transcripts
                    </p>
                </div>
            </div>

            <div className="flex-1">
                {loading ? (
                    <div className="flex justify-center items-center h-64 w-full">
                        <Loader />
                    </div>
                ) : results.length === 0 ? (
                    <div className="mt-8">
                        <EmptyState
                            title="No Results Published"
                            description="Your exam evaluations have not been compiled yet. Please check back later."
                            icon={Award}
                        />
                    </div>
                ) : (
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                        {results.map((item, i) => (
                            <ResultCard key={i} item={item} />
                        ))}
                    </div>
                )}
            </div>
        </main>
    );
};

export default MyResults;