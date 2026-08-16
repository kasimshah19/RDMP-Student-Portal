import React, { useState, useEffect } from 'react';
import { useToast } from '../../context/ToastContext';
import Loader from '../../components/common/Loader';
import EmptyState from '../../components/common/EmptyState';
import { getMySubjectAttendance } from '../../services/studentService';
import {
    CalendarCheck, UserCheck, UserX, UserMinus,
    Download, AlertTriangle, Calendar, List,
    CheckCircle2, XCircle, FileSpreadsheet, Search
} from 'lucide-react';

const StatCard = ({ label, value, sub, icon: Icon, tone }) => {
    const toneMap = {
        success: { bg: "var(--success-soft)", fg: "var(--success-text)" },
        info: { bg: "var(--info-soft)", fg: "var(--info-text)" },
        warning: { bg: "var(--warning-soft)", fg: "var(--warning-text)" },
        danger: { bg: "var(--danger-soft)", fg: "var(--danger-text)" },
        brass: { bg: "#F3E9D8", fg: "var(--brass)" },
        navy: { bg: "rgba(30,42,71,0.1)", fg: "var(--navy)" }
    }[tone] || { bg: "var(--cloud)", fg: "var(--ink)" };

    return (
        <div className="sdp-card p-4 sm:p-5">
            <div className="flex items-start justify-between gap-3">
                <div>
                    <p className="sdp-eyebrow">{sub}</p>
                    <p className="sdp-data-xl mt-1">{value}</p>
                </div>
                <div
                    className="flex items-center justify-center rounded-full shrink-0"
                    style={{ width: 40, height: 40, background: toneMap.bg, color: toneMap.fg }}
                >
                    <Icon size={20} />
                </div>
            </div>
            <p className="mt-2 text-xs sm:text-[13px] text-slate-500 font-medium">
                {label}
            </p>
        </div>
    );
};

const MyAttendance = () => {
    const { addToast } = useToast();
    const [loading, setLoading] = useState(true);

    // Filters
    const [subject, setSubject] = useState('All Subjects');

    // Defaults to current month boundaries
    const today = new Date();
    const [currentMonth, setCurrentMonth] = useState(new Date(today.getFullYear(), today.getMonth(), 1));
    const [fromDate, setFromDate] = useState('');
    const [toDate, setToDate] = useState('');

    const [viewMode, setViewMode] = useState('list'); // 'list' | 'calendar'

    const [data, setData] = useState({
        records: [],
        aggregate: {
            overall: { present: 0, absent: 0, leave: 0, total: 0, percentage: 0 },
            subjects: []
        }
    });

    const fetchAttendance = async () => {
        setLoading(true);
        try {
            let filters = {};
            if (subject !== 'All Subjects') filters.subject = subject;
            if (fromDate) filters.from = fromDate;
            if (toDate) filters.to = toDate;

            const res = await getMySubjectAttendance(filters);
            if (res.success) {
                setData(res.data);
            }
        } catch (err) {
            addToast("Failed to fetch attendance records.", "error");
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchAttendance();
        // eslint-disable-next-line
    }, [subject, fromDate, toDate]);

    const handleDownload = () => {
        addToast("Download Report feature coming soon", "info");
    };

    const getStatusUI = (status) => {
        switch (status) {
            case 'present':
                return { badge: 'var(--success-soft)', text: 'var(--success-text)', icon: <CheckCircle2 size={13} />, label: 'Present' };
            case 'absent':
                return { badge: 'var(--danger-soft)', text: 'var(--danger-text)', icon: <XCircle size={13} />, label: 'Absent' };
            case 'leave':
                return { badge: 'var(--info-soft)', text: 'var(--info-text)', icon: <FileSpreadsheet size={13} />, label: 'Leave' };
            default:
                return { badge: 'var(--cloud)', text: 'var(--slate)', icon: <Search size={13} />, label: 'Unknown' };
        }
    };

    // Calendar Generation
    const daysInMonth = new Date(currentMonth.getFullYear(), currentMonth.getMonth() + 1, 0).getDate();
    const firstDayIndex = new Date(currentMonth.getFullYear(), currentMonth.getMonth(), 1).getDay();

    // Create mapping of dates to aggregated daily statuses
    // For Calendar, if any subject is marked absent that day, show it as absent for that calendar day
    const calendarMapping = {};
    data.records.forEach(rc => {
        const dStr = new Date(rc.date).toISOString().split('T')[0];
        if (!calendarMapping[dStr]) calendarMapping[dStr] = { status: 'present' };
        if (rc.status === 'absent') calendarMapping[dStr].status = 'absent';
        if (rc.status === 'leave' && calendarMapping[dStr].status !== 'absent') calendarMapping[dStr].status = 'leave';
    });

    const renderCalendar = () => {
        const blanks = Array.from({ length: firstDayIndex }).map((_, i) => <div key={`b-${i}`} className="p-2 border border-mist/30 bg-cloud/50 min-h-[80px]"></div>);
        const days = Array.from({ length: daysInMonth }).map((_, i) => {
            const dayNum = i + 1;
            const dateStr = `${currentMonth.getFullYear()}-${String(currentMonth.getMonth() + 1).padStart(2, '0')}-${String(dayNum).padStart(2, '0')}`;
            const isToday = today.toISOString().split('T')[0] === dateStr;
            const record = calendarMapping[dateStr];

            let cellStyle = {};
            let IconTag = null;

            if (record) {
                const ui = getStatusUI(record.status);
                cellStyle = { background: ui.badge, color: ui.text };
                IconTag = ui.icon;
            }

            return (
                <div key={dayNum} className="p-2 border border-mist/50 min-h-[80px] flex flex-col items-center justify-start rounded-md m-0.5 relative transition-colors">
                    <span className={`text-xs font-semibold ${isToday ? 'bg-navy text-white w-6 h-6 rounded-full flex items-center justify-center' : 'text-slate-600'}`}>
                        {dayNum}
                    </span>
                    {record && (
                        <div className="mt-2 flex flex-col justify-center items-center gap-1 w-full rounded-md py-1" style={cellStyle}>
                            {IconTag}
                            <span className="text-[10px] font-bold uppercase">{record.status}</span>
                        </div>
                    )}
                </div>
            );
        });

        return (
            <div className="w-full">
                <div className="grid grid-cols-7 gap-0 mb-2">
                    {['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'].map(d => (
                        <div key={d} className="text-center text-xs font-semibold uppercase text-slate tracking-wider">{d}</div>
                    ))}
                </div>
                <div className="grid grid-cols-7 gap-0 border border-mist/50 rounded-lg overflow-hidden bg-white p-1">
                    {blanks}
                    {days}
                </div>
            </div>
        );
    };

    return (
        <main className="px-4 lg:px-8 py-6 w-full max-w-[1400px] mx-auto flex-1 flex flex-col">

            {/* Danger Banner */}
            {!loading && data.aggregate.overall.percentage > 0 && data.aggregate.overall.percentage < 75 && (
                <div className="mb-6 p-4 rounded-xl flex items-start gap-3" style={{ background: "var(--danger-soft)", border: "1px solid rgba(162, 49, 49, 0.2)" }}>
                    <AlertTriangle size={20} style={{ color: "var(--danger-text)", marginTop: 2 }} className="shrink-0" />
                    <div>
                        <h3 className="font-semibold" style={{ color: "var(--danger-text)", fontSize: 14.5 }}>Attendance is below the required 75%</h3>
                        <p style={{ color: "var(--danger-text)", fontSize: 13, marginTop: 2, opacity: 0.9 }}>
                            Please contact your class teacher immediately to discuss your attendance shortfall.
                        </p>
                    </div>
                </div>
            )}

            {/* Stat Row */}
            <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
                <StatCard
                    label="Academic Year" value={`${data.aggregate.overall.percentage}%`} sub="Overall %"
                    icon={CalendarCheck} tone={data.aggregate.overall.percentage >= 75 ? "navy" : "danger"}
                />
                <StatCard
                    label="Total Days" value={data.aggregate.overall.present} sub="Present"
                    icon={UserCheck} tone="success"
                />
                <StatCard
                    label="Total Days" value={data.aggregate.overall.absent} sub="Absent"
                    icon={UserX} tone="danger"
                />
                <StatCard
                    label="Total Days" value={data.aggregate.overall.leave} sub="Leave"
                    icon={UserMinus} tone="info"
                />
            </div>

            <div className="grid grid-cols-1 xl:grid-cols-[300px_1fr] gap-6 items-start flex-1">

                {/* Left Side: Subject-wise Bars */}
                <div className="sdp-card p-5 xl:sticky xl:top-24">
                    <h2 className="sdp-font-display text-lg font-semibold mb-4" style={{ color: "var(--navy)" }}>
                        Subject-wise Overview
                    </h2>

                    {loading && data.aggregate.subjects.length === 0 ? (
                        <div className="py-10"><Loader /></div>
                    ) : (
                        <div className="flex flex-col gap-4">
                            <button
                                onClick={() => setSubject('All Subjects')}
                                className={`text-left p-2 -mx-2 rounded-lg transition-colors ${subject === 'All Subjects' ? 'bg-[var(--cloud)]' : 'hover:bg-[var(--cloud)]/50'}`}
                            >
                                <div className="flex items-center justify-between mb-1">
                                    <span style={{ fontSize: 13, color: "var(--ink)", fontWeight: subject === 'All Subjects' ? 600 : 500 }}>All Subjects</span>
                                    <span className="sdp-font-mono font-medium" style={{ fontSize: 12.5, color: "var(--navy)" }}>{data.aggregate.overall.percentage}%</span>
                                </div>
                                <div className="sdp-progress-track">
                                    <div
                                        className="sdp-progress-fill" style={{ width: `${data.aggregate.overall.percentage}%`, background: "var(--navy)" }}
                                    />
                                </div>
                            </button>

                            {data.aggregate.subjects.map(sub => (
                                <button
                                    key={sub.name}
                                    onClick={() => setSubject(sub.name)}
                                    className={`text-left p-2 -mx-2 rounded-lg transition-colors ${subject === sub.name ? 'bg-[var(--cloud)]' : 'hover:bg-[var(--cloud)]/50'}`}
                                >
                                    <div className="flex items-center justify-between mb-1">
                                        <span style={{ fontSize: 13, color: "var(--ink)", fontWeight: subject === sub.name ? 600 : 500 }}>{sub.name}</span>
                                        <span className="sdp-font-mono font-medium" style={{ fontSize: 12.5, color: "var(--slate)" }}>{sub.percentage}%</span>
                                    </div>
                                    <div className="sdp-progress-track">
                                        <div
                                            className="sdp-progress-fill transition-all duration-300"
                                            style={{
                                                width: `${sub.percentage}%`,
                                                background: sub.percentage >= 90 ? "var(--success)" : sub.percentage >= 75 ? "#C9A227" : "var(--danger)",
                                            }}
                                        />
                                    </div>
                                </button>
                            ))}
                        </div>
                    )}
                </div>

                {/* Right Side: Filters and Data Views */}
                <div className="flex flex-col gap-5 min-w-0 flex-1">
                    <div className="sdp-card p-4 flex flex-col lg:flex-row lg:items-center justify-between gap-4 border-mist">
                        <div className="flex flex-col sm:flex-row items-start sm:items-center gap-3 w-full lg:w-auto">
                            <select
                                value={subject}
                                onChange={(e) => setSubject(e.target.value)}
                                className="w-full sm:w-auto px-3 py-2 border border-mist rounded-lg focus:outline-none focus:border-[var(--brass)] text-sm"
                            >
                                <option value="All Subjects">All Subjects</option>
                                {['Physics', 'Chemistry', 'Mathematics', 'English', 'Computer Science', 'Physical Education'].map(s => (
                                    <option key={s} value={s}>{s}</option>
                                ))}
                            </select>

                            <div className="flex items-center gap-2 w-full sm:w-auto">
                                <input
                                    type="date"
                                    value={fromDate}
                                    onChange={(e) => {
                                        setFromDate(e.target.value);
                                        setViewMode('list');
                                    }}
                                    className="w-full sm:w-auto px-3 py-2 border border-mist rounded-lg focus:outline-none focus:border-[var(--brass)] text-sm"
                                />
                                <span className="text-slate-400">to</span>
                                <input
                                    type="date"
                                    value={toDate}
                                    onChange={(e) => {
                                        setToDate(e.target.value);
                                        setViewMode('list');
                                    }}
                                    className="w-full sm:w-auto px-3 py-2 border border-mist rounded-lg focus:outline-none focus:border-[var(--brass)] text-sm"
                                />
                            </div>
                        </div>

                        <div className="flex items-center justify-between lg:justify-end gap-4">
                            <div className="flex items-center bg-[var(--cloud)] rounded-lg p-1 border border-mist shrink-0">
                                <button
                                    onClick={() => setViewMode('list')}
                                    className={`p-1.5 rounded-md flex items-center gap-1.5 transition-colors ${viewMode === 'list' ? 'bg-white shadow-sm font-medium' : 'text-slate-500'}`}
                                >
                                    <List size={16} /> <span className="hidden sm:inline text-xs">List</span>
                                </button>
                                <button
                                    onClick={() => setViewMode('calendar')}
                                    className={`p-1.5 rounded-md flex items-center gap-1.5 transition-colors ${viewMode === 'calendar' ? 'bg-white shadow-sm font-medium' : 'text-slate-500'}`}
                                >
                                    <Calendar size={16} /> <span className="hidden sm:inline text-xs">Calendar</span>
                                </button>
                            </div>

                            <button
                                onClick={handleDownload}
                                className="sdp-badge whitespace-nowrap bg-[var(--brass)] hover:bg-[#8F6633] text-white py-2 px-4 shadow-sm shrink-0"
                            >
                                <Download size={14} className="mr-1" /> Request Report
                            </button>
                        </div>
                    </div>

                    <div className="sdp-card flex-1 min-h-[400px] border-mist overflow-hidden">
                        {loading ? (
                            <div className="h-full w-full flex items-center justify-center p-12"><Loader /></div>
                        ) : data.records.length === 0 ? (
                            <EmptyState
                                title="No attendance records found"
                                description={`There are no records for ${subject !== 'All Subjects' ? subject : 'this period'}.`}
                            />
                        ) : viewMode === 'list' ? (
                            <div className="overflow-x-auto">
                                <table className="sdp-table w-full border-collapse">
                                    <thead>
                                        <tr>
                                            <th>Date</th>
                                            <th>Subject</th>
                                            <th>Status</th>
                                            <th>Marked By</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {data.records.map((r, i) => {
                                            const ui = getStatusUI(r.status);
                                            return (
                                                <tr key={i}>
                                                    <td className="font-medium" style={{ color: "var(--ink)" }}>
                                                        {new Date(r.date).toLocaleDateString('en-GB', { day: '2-digit', month: 'short', year: 'numeric' })}
                                                    </td>
                                                    <td style={{ color: "var(--slate)", fontSize: '13.5px' }}>{r.subject}</td>
                                                    <td>
                                                        <span className="sdp-badge" style={{ background: ui.badge, color: ui.text }}>
                                                            {ui.icon} {ui.label}
                                                        </span>
                                                    </td>
                                                    <td style={{ color: "var(--slate)", fontSize: '13.5px' }}>{r.markedBy}</td>
                                                </tr>
                                            );
                                        })}
                                    </tbody>
                                </table>
                            </div>
                        ) : (
                            <div className="p-4 sm:p-6 overflow-hidden max-w-full">
                                <div className="flex items-center justify-between mb-4">
                                    <h3 className="font-semibold text-[color:var(--navy)] sdp-font-display text-lg px-2">
                                        {currentMonth.toLocaleString('default', { month: 'long', year: 'numeric' })} - Overview
                                    </h3>
                                    <div className="flex gap-2">
                                        <button
                                            onClick={() => setCurrentMonth(new Date(currentMonth.getFullYear(), currentMonth.getMonth() - 1, 1))}
                                            className="px-3 py-1 bg-cloud rounded border border-mist text-sm font-medium text-slate-700"
                                        >
                                            Prev
                                        </button>
                                        <button
                                            onClick={() => setCurrentMonth(new Date(currentMonth.getFullYear(), currentMonth.getMonth() + 1, 1))}
                                            className="px-3 py-1 bg-cloud rounded border border-mist text-sm font-medium text-slate-700"
                                        >
                                            Next
                                        </button>
                                    </div>
                                </div>
                                {renderCalendar()}
                            </div>
                        )}
                    </div>
                </div>

            </div>
        </main>
    );
};

export default MyAttendance;