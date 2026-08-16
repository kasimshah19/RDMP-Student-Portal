import React, { useState, useEffect } from 'react';
import { getNotices } from '../../services/studentService';
import Loader from '../../components/common/Loader';
import EmptyState from '../../components/common/EmptyState';
import { Bell, Calendar, ChevronRight, Pin } from 'lucide-react';
import { useToast } from '../../context/ToastContext';

const Notices = () => {
    const { addToast } = useToast();
    const [loading, setLoading] = useState(true);
    const [notices, setNotices] = useState([]);

    useEffect(() => {
        const fetchNotices = async () => {
            try {
                const res = await getNotices();
                if (res.success) {
                    setNotices(res.data);
                }
            } catch (err) {
                addToast("Failed to fetch notices", "error");
            } finally {
                setLoading(false);
            }
        };
        fetchNotices();
    }, []);

    const handleReadMore = () => {
        addToast("Notice details mapped cleanly natively.", "info");
    };

    return (
        <main className="px-4 lg:px-8 py-6 w-full max-w-[1200px] mx-auto flex-1 flex flex-col">
            <div className="mb-6">
                <h1 className="text-2xl lg:text-3xl font-bold sdp-font-display text-[var(--navy)]">
                    Notice Board
                </h1>
                <p className="text-sm font-medium mt-1 text-[var(--slate)]">
                    Stay updated with college announcements
                </p>
            </div>

            <div className="flex-1 w-full">
                {loading ? (
                    <div className="flex h-[400px] w-full justify-center items-center bg-white rounded-xl shadow-sm border border-mist">
                        <Loader />
                    </div>
                ) : notices.length === 0 ? (
                    <div className="bg-white rounded-xl shadow-sm border border-mist">
                        <EmptyState
                            title="No Active Notices"
                            description="There are currently no announcements broadcasted to your division."
                            icon={Bell}
                        />
                    </div>
                ) : (
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4 lg:gap-6">
                        {notices.map((notice) => (
                            <div
                                key={notice._id}
                                className={`sdp-card p-5 border-l-4 flex flex-col justify-between hover:translate-y-[-2px] transition-transform duration-300 ${notice.isPinned || notice.priority === 'high'
                                        ? 'border-l-[var(--danger)] bg-red-50/20'
                                        : 'border-l-[var(--brass)] bg-white'
                                    }`}
                            >
                                <div>
                                    <div className="flex justify-between items-start gap-3 mb-3">
                                        <h3 className="font-bold text-[17px] leading-snug text-[var(--navy)] flex-1">
                                            {notice.title}
                                        </h3>
                                        {notice.isPinned && (
                                            <div className="flex items-center gap-1 bg-[var(--danger-soft)] text-[var(--danger-text)] px-2 py-1 rounded text-[10px] font-bold tracking-wide uppercase shrink-0">
                                                <Pin size={12} fill="currentColor" /> Pinned
                                            </div>
                                        )}
                                    </div>
                                    <p className="text-sm text-[var(--slate)] font-medium mb-4 line-clamp-2">
                                        {notice.content}
                                    </p>
                                </div>
                                <div className="flex items-center justify-between border-t border-mist pt-4 mt-auto">
                                    <div className="flex items-center gap-2 text-xs font-semibold text-[var(--slate)]">
                                        <Calendar size={14} />
                                        {new Date(notice.createdAt || Date.now()).toLocaleDateString('en-GB', { day: '2-digit', month: 'short', year: 'numeric' })}
                                    </div>
                                    <button onClick={handleReadMore} className="flex items-center gap-1.5 text-sm font-semibold text-[var(--brass)] hover:text-amber-700 transition-colors">
                                        Read More <ChevronRight size={16} />
                                    </button>
                                </div>
                            </div>
                        ))}
                    </div>
                )}
            </div>
        </main>
    );
};

export default Notices;
