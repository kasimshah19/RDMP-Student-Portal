import React from 'react';
import { Pin, Calendar, Tag, BellOff } from 'lucide-react';

const Seal = ({ type = 'pin' }) => (
    <div className="flex-shrink-0 w-7 h-7 rounded-full border-2 border-navy bg-brass flex items-center justify-center shadow-sm relative overflow-hidden group-hover:scale-110 transition-transform">
        <div className="absolute inset-0 bg-navy/10 mix-blend-overlay"></div>
        {type === 'pin' ? <Pin size={12} className="text-navy" fill="currentColor" /> : <div className="text-navy font-display font-bold text-[10px]">✓</div>}
    </div>
);

const NoticeBoard = ({ notices = [], title = "Official Directives" }) => {
    // Sort so pinned notices are always on top
    const sortedNotices = [...notices].sort((a, b) => {
        if (a.isPinned && !b.isPinned) return -1;
        if (!a.isPinned && b.isPinned) return 1;
        return new Date(b.createdAt) - new Date(a.createdAt);
    });

    return (
        <div className="bg-paper shadow-sm rounded-lg border border-mist overflow-hidden h-full flex flex-col">
            <div className="p-4 bg-cloud border-b border-mist flex justify-between items-center">
                <h3 className="font-semibold tracking-wide uppercase text-sm text-ink">{title}</h3>
                <span className="text-xs bg-navy text-white font-mono px-2 py-0.5 rounded-full">{notices.length} Updates</span>
            </div>
            <div className="divide-y divide-mist overflow-y-auto flex-1">
                {sortedNotices.length === 0 ? (
                    <div className="p-12 text-center flex flex-col items-center">
                        <div className="w-12 h-12 bg-cloud rounded-lg flex items-center justify-center text-slate mb-3 border border-mist">
                            <BellOff size={24} />
                        </div>
                        <p className="text-slate font-medium text-sm">No institutional directives are currently active.</p>
                    </div>
                ) : (
                    sortedNotices.map(notice => (
                        <div key={notice._id} className={`p-5 transition flex flex-col sm:flex-row gap-4 group hover:bg-cloud/50 cursor-default ${notice.isPinned ? 'bg-cloud/30 border-l-4 border-brass' : ''}`}>
                            {notice.isPinned && (
                                <div className="mt-0.5 z-10" title="System Verified Directive">
                                    <Seal type="pin" />
                                </div>
                            )}
                            <div className="flex-1">
                                <h4 className={`text-ink ${notice.isPinned ? 'font-display font-semibold text-lg' : 'font-semibold text-base'}`}>{notice.title}</h4>
                                <p className="text-sm text-slate mt-1.5 leading-relaxed whitespace-pre-wrap">{notice.description}</p>

                                <div className="mt-4 flex flex-wrap gap-4 items-center">
                                    <div className="text-[11px] font-mono font-medium text-slate flex items-center gap-1.5">
                                        <Calendar size={12} className="text-slate" />
                                        <span>{new Date(notice.createdAt).toLocaleDateString(undefined, { year: 'numeric', month: 'short', day: 'numeric' })}</span>
                                    </div>
                                    {notice.targetAudience !== 'all' && (
                                        <div className="text-[10px] font-semibold text-info-text bg-info-soft px-2 py-0.5 rounded-full border border-info-text/10 uppercase tracking-widest flex items-center gap-1">
                                            <Tag size={10} /> {notice.targetAudience}
                                        </div>
                                    )}
                                </div>
                            </div>
                        </div>
                    ))
                )}
            </div>
        </div>
    );
};

export default NoticeBoard;
