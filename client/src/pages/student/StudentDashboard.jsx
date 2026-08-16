import { useContext } from "react";
import { AuthContext } from "../../context/AuthContext";
import {
    FileText,
    Award,
    BookOpen,
    CalendarClock,
    Users,
    FileCheck2,
    Pin,
    CreditCard,
    Receipt,
    CalendarPlus,
    GraduationCap,
    Quote,
    Phone,
    Cake,
    Hash,
    LifeBuoy,
    Megaphone,
    ChevronLeft,
    ChevronRight
} from "lucide-react";
import {
    LineChart,
    Line,
    XAxis,
    YAxis,
    CartesianGrid,
    Tooltip,
    ResponsiveContainer,
} from "recharts";

/* ---------------------------------------------------------------------- */
/* Sample data — wire this up to your real API/store later                */
/* ---------------------------------------------------------------------- */

const STATS = [
    { label: "Overall Attendance", value: "92%", sub: "Attendance", icon: Users, tone: "success" },
    { label: "Total Subjects", value: "6", sub: "Subjects", icon: BookOpen, tone: "info" },
    { label: "In Next 7 Days", value: "2", sub: "Upcoming Exams", icon: CalendarClock, tone: "warning" },
    { label: "Verified", value: "5/6", sub: "Documents", icon: FileCheck2, tone: "info" },
    { label: "In Term I", value: "78.45%", sub: "Overall Average", icon: Award, tone: "brass" },
];

const ATTENDANCE_TREND = [
    { date: "1 May", value: 82 },
    { date: "5 May", value: 74 },
    { date: "10 May", value: 90 },
    { date: "15 May", value: 78 },
    { date: "20 May", value: 95 },
    { date: "25 May", value: 88 },
    { date: "31 May", value: 92 },
];

const SUBJECT_ATTENDANCE = [
    { subject: "Physics", pct: 95 },
    { subject: "Chemistry", pct: 93 },
    { subject: "Mathematics", pct: 90 },
    { subject: "English", pct: 92 },
    { subject: "Computer Science", pct: 88 },
    { subject: "Physical Education", pct: 100 },
];

const SUBJECTS = [
    { name: "Physics", teacher: "Mr. A. B. Patil", icon: "⚛️" },
    { name: "Chemistry", teacher: "Mrs. S. R. More", icon: "🧪" },
    { name: "Mathematics", teacher: "Mr. R. K. Pawar", icon: "📐" },
    { name: "English", teacher: "Mrs. P. S. Jadhav", icon: "📖" },
    { name: "Computer Science", teacher: "Mr. K. M. Patil", icon: "💻" },
    { name: "Physical Education", teacher: "Mr. D. L. Shinde", icon: "🏃" },
];

const UPCOMING_EXAMS = [
    {
        subject: "Unit Test 1 – Physics",
        date: "MAY 20",
        time: "10:00 AM – 11:30 AM",
        venue: "Room No. 12",
        daysLeft: 2,
    },
    {
        subject: "Unit Test 1 – Chemistry",
        date: "MAY 23",
        time: "10:00 AM – 11:30 AM",
        venue: "Room No. 14",
        daysLeft: 5,
    },
];

const RECENT_MARKS = [
    { subject: "Physics", max: 100, obtained: 82 },
    { subject: "Chemistry", max: 100, obtained: 75 },
    { subject: "Mathematics", max: 100, obtained: 78 },
    { subject: "English", max: 100, obtained: 80 },
];

const NOTICES = [
    { title: "Unit Test Schedule (11th & 12th)", date: "08 May 2026", pinned: true },
    { title: "Parent Meeting – 16 May 2026", date: "07 May 2026", pinned: true },
    { title: "Admissions Open for Class 11th", date: "10 May 2026", pinned: false },
    { title: "College Reopens After Summer Vacation", date: "05 May 2026", pinned: false },
    { title: "Independence Day Celebration", date: "02 May 2026", pinned: false },
];

const TODAYS_EVENTS = [
    { title: "Unit Test 1 (Physics)", time: "10:00 AM" },
    { title: "Extra Lecture (Maths)", time: "2:00 PM" },
];

const QUICK_LINKS = [
    { label: "Download ID Card", icon: CreditCard },
    { label: "Fee Receipt", icon: Receipt },
    { label: "Apply Leave", icon: CalendarPlus },
    { label: "Library Resources", icon: BookOpen },
    { label: "Scholarship Info", icon: GraduationCap },
];

/* May 2026 grid — Sun-first, 6 weeks. May 1 2026 falls on a Friday. */
const CALENDAR_DAYS = [
    26, 27, 28, 29, 30, 1, 2,
    3, 4, 5, 6, 7, 8, 9,
    10, 11, 12, 13, 14, 15, 16,
    17, 18, 19, 20, 21, 22, 23,
    24, 25, 26, 27, 28, 29, 30,
    31, 1, 2, 3, 4, 5, 6,
].map((day, i) => ({
    day,
    inMonth: i >= 5 && i <= 34,
    isToday: i === 20, // 16 May, Saturday
}));

/* ---------------------------------------------------------------------- */

function initials(name) {
    if (!name) return "S";
    return name
        .split(" ")
        .map((p) => p[0])
        .slice(0, 2)
        .join("")
        .toUpperCase();
}

function StatCard({ label, value, sub, icon: Icon, tone }) {
    const toneMap = {
        success: { bg: "var(--success-soft)", fg: "var(--success-text)" },
        info: { bg: "var(--info-soft)", fg: "var(--info-text)" },
        warning: { bg: "var(--warning-soft)", fg: "var(--warning-text)" },
        brass: { bg: "#F3E9D8", fg: "var(--brass)" },
    }[tone];

    return (
        <div className="sdp-card" style={{ padding: "18px" }}>
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
            <p className="mt-2" style={{ fontSize: 12, color: "var(--slate)" }}>
                {label}
            </p>
        </div>
    );
}

export default function StudentDashboard() {
    const { user } = useContext(AuthContext);

    const STUDENT = {
        name: user?.name || "Rahul Sanjay Patil",
        rollNo: user?.rollNumber || "101",
        admissionNo: "11A2026001",
        className: "Class 11th (Science)",
        division: "Division A",
        dob: "12 Jan 2010",
        mobile: "7498765432",
    };

    return (
        <main className="px-4 lg:px-8 py-6 w-full max-w-[1400px] mx-auto flex-1">
            {/* Welcome banner */}
            <div
                className="rounded-2xl p-6 lg:p-8 mb-6 relative overflow-hidden flex flex-col lg:flex-row lg:items-center justify-between gap-6"
                style={{ background: `linear-gradient(135deg, var(--navy), var(--navy-deep))` }}
            >
                <div className="flex items-center gap-4 relative z-10">
                    <div
                        className="sdp-font-display flex items-center justify-center rounded-full shrink-0"
                        style={{ width: 68, height: 68, background: "var(--brass)", color: "var(--navy)", fontWeight: 700, fontSize: 22, border: "3px solid rgba(255,255,255,0.25)" }}
                    >
                        {initials(STUDENT.name)}
                    </div>
                    <div style={{ color: "#fff" }}>
                        <p className="sdp-font-display" style={{ fontSize: 22, fontWeight: 700 }}>
                            Welcome back, {STUDENT.name.split(' ')[0]}! 👋
                        </p>
                        <p style={{ fontSize: 13, color: "#B7C0D6", marginTop: 2 }}>
                            Here&rsquo;s what&rsquo;s happening with your academics today.
                        </p>
                        <div className="flex flex-wrap gap-x-5 gap-y-1.5 mt-3" style={{ fontSize: 12.5, color: "#D6DBE8" }}>
                            <span className="flex items-center gap-1.5"><Hash size={13} /> Roll No. {STUDENT.rollNo}</span>
                            <span className="flex items-center gap-1.5"><FileText size={13} /> {STUDENT.admissionNo}</span>
                            <span className="flex items-center gap-1.5"><BookOpen size={13} /> {STUDENT.className} · {STUDENT.division}</span>
                            <span className="flex items-center gap-1.5"><Cake size={13} /> {STUDENT.dob}</span>
                            <span className="flex items-center gap-1.5"><Phone size={13} /> {STUDENT.mobile}</span>
                        </div>
                    </div>
                </div>

                <div
                    className="rounded-xl p-4 relative z-10 max-w-xs shrink-0"
                    style={{ background: "rgba(255,255,255,0.08)", border: "1px solid rgba(255,255,255,0.15)" }}
                >
                    <p className="sdp-eyebrow flex items-center gap-1.5" style={{ color: "var(--brass)" }}>
                        <Quote size={12} /> Today&rsquo;s Quote
                    </p>
                    <p className="sdp-font-display mt-2" style={{ color: "#fff", fontSize: 13.5, lineHeight: 1.5 }}>
                        &ldquo;Education is the most powerful weapon which you can use to change the world.&rdquo;
                    </p>
                    <p style={{ color: "#9AA4BA", fontSize: 12, marginTop: 6 }}>— Nelson Mandela</p>
                </div>

                <BookOpen
                    size={160}
                    className="absolute pointer-events-none hidden lg:block"
                    style={{ right: -20, top: -20, color: "rgba(255,255,255,0.05)" }}
                />
            </div>

            {/* Stats */}
            <div className="grid grid-cols-2 sm:grid-cols-3 xl:grid-cols-5 gap-4 mb-6">
                {STATS.map((s) => (
                    <StatCard key={s.sub} {...s} />
                ))}
            </div>

            {/* Body grid */}
            <div className="grid grid-cols-1 xl:grid-cols-[1fr_340px] gap-6">
                {/* Left column */}
                <div className="flex flex-col gap-6 min-w-0">
                    {/* Row 1: attendance overview + subjects */}
                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                        <div className="sdp-card p-5">
                            <div className="flex items-center justify-between mb-3">
                                <h2 className="sdp-font-display" style={{ fontSize: 16, fontWeight: 600 }}>
                                    Attendance Overview
                                </h2>
                                <span className="sdp-eyebrow">This Month</span>
                            </div>
                            <div style={{ height: 160 }}>
                                <ResponsiveContainer width="100%" height="100%">
                                    <LineChart data={ATTENDANCE_TREND} margin={{ top: 5, right: 8, left: -20, bottom: 0 }}>
                                        <CartesianGrid stroke="var(--mist)" vertical={false} />
                                        <XAxis dataKey="date" tick={{ fontSize: 10.5, fill: "var(--slate)" }} axisLine={{ stroke: "var(--mist)" }} tickLine={false} />
                                        <YAxis domain={[0, 100]} tick={{ fontSize: 10.5, fill: "var(--slate)" }} axisLine={false} tickLine={false} />
                                        <Tooltip
                                            contentStyle={{ borderRadius: 8, border: "1px solid var(--mist)", fontSize: 12 }}
                                            formatter={(v) => [`${v}%`, "Attendance"]}
                                        />
                                        <Line type="monotone" dataKey="value" stroke="var(--navy)" strokeWidth={2.5} dot={{ r: 3.5, fill: "var(--navy)" }} />
                                    </LineChart>
                                </ResponsiveContainer>
                            </div>

                            <p className="sdp-eyebrow mt-4 mb-3">Subject Wise Attendance</p>
                            <div className="flex flex-col gap-2.5">
                                {SUBJECT_ATTENDANCE.map((s) => (
                                    <div key={s.subject}>
                                        <div className="flex items-center justify-between mb-1">
                                            <span style={{ fontSize: 12.5, color: "var(--ink)" }}>{s.subject}</span>
                                            <span className="sdp-font-mono" style={{ fontSize: 12, color: "var(--slate)" }}>{s.pct}%</span>
                                        </div>
                                        <div className="sdp-progress-track">
                                            <div
                                                className="sdp-progress-fill"
                                                style={{
                                                    width: `${s.pct}%`,
                                                    background: s.pct >= 93 ? "var(--success)" : s.pct >= 90 ? "#C9A227" : "var(--info)",
                                                }}
                                            />
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>

                        <div className="sdp-card p-5">
                            <div className="flex items-center justify-between mb-3">
                                <h2 className="sdp-font-display" style={{ fontSize: 16, fontWeight: 600 }}>
                                    My Subjects
                                </h2>
                                <a href="#" style={{ fontSize: 12.5, color: "var(--navy)", fontWeight: 500 }}>View Time Table</a>
                            </div>
                            <div className="flex flex-col">
                                {SUBJECTS.map((s, i) => (
                                    <div
                                        key={s.name}
                                        className="flex items-center justify-between py-3"
                                        style={{ borderTop: i === 0 ? "none" : "1px solid var(--mist)" }}
                                    >
                                        <div className="flex items-center gap-3">
                                            <span
                                                className="flex items-center justify-center rounded-lg shrink-0"
                                                style={{ width: 34, height: 34, background: "var(--cloud)", fontSize: 15 }}
                                            >
                                                {s.icon}
                                            </span>
                                            <span style={{ fontSize: 13.5, fontWeight: 500 }}>{s.name}</span>
                                        </div>
                                        <span style={{ fontSize: 12.5, color: "var(--slate)" }}>{s.teacher}</span>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>

                    {/* Row 2: upcoming exams + recent marks */}
                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                        <div className="sdp-card p-5">
                            <div className="flex items-center justify-between mb-3">
                                <h2 className="sdp-font-display" style={{ fontSize: 16, fontWeight: 600 }}>
                                    Upcoming Exams
                                </h2>
                                <a href="#" style={{ fontSize: 12.5, color: "var(--navy)", fontWeight: 500 }}>View All</a>
                            </div>
                            <div className="flex flex-col gap-3">
                                {UPCOMING_EXAMS.map((e) => (
                                    <div key={e.subject} className="flex items-center justify-between gap-3 p-3 rounded-lg" style={{ border: "1px solid var(--mist)" }}>
                                        <div className="flex items-center gap-3 min-w-0">
                                            <div
                                                className="flex flex-col items-center justify-center rounded-lg shrink-0 sdp-font-mono"
                                                style={{ width: 46, height: 46, background: "var(--info-soft)", color: "var(--info-text)" }}
                                            >
                                                <span style={{ fontSize: 9.5, fontWeight: 600 }}>{e.date.split(" ")[0]}</span>
                                                <span style={{ fontSize: 15, fontWeight: 700 }}>{e.date.split(" ")[1]}</span>
                                            </div>
                                            <div className="min-w-0">
                                                <p style={{ fontSize: 13.5, fontWeight: 600 }} className="truncate">{e.subject}</p>
                                                <p style={{ fontSize: 11.5, color: "var(--slate)" }}>{e.time} · {e.venue}</p>
                                            </div>
                                        </div>
                                        <span className="sdp-badge shrink-0" style={{ background: "var(--warning-soft)", color: "var(--warning-text)" }}>
                                            {e.daysLeft} Days Left
                                        </span>
                                    </div>
                                ))}
                            </div>
                        </div>

                        <div className="sdp-card p-5">
                            <div className="flex items-center justify-between mb-3">
                                <h2 className="sdp-font-display" style={{ fontSize: 16, fontWeight: 600 }}>
                                    Recent Marks (Term I)
                                </h2>
                                <a href="#" style={{ fontSize: 12.5, color: "var(--navy)", fontWeight: 500 }}>View All</a>
                            </div>
                            <div className="overflow-x-auto -mx-1">
                                <table className="sdp-table w-full" style={{ borderCollapse: "collapse" }}>
                                    <thead>
                                        <tr>
                                            <th>Subject</th>
                                            <th className="text-right">Max</th>
                                            <th className="text-right">Obtained</th>
                                            <th className="text-right">%</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {RECENT_MARKS.map((m) => (
                                            <tr key={m.subject}>
                                                <td style={{ fontWeight: 500 }}>{m.subject}</td>
                                                <td className="sdp-font-mono text-right">{m.max}</td>
                                                <td className="sdp-font-mono text-right">{m.obtained}</td>
                                                <td className="sdp-font-mono text-right">{m.obtained}%</td>
                                            </tr>
                                        ))}
                                        <tr>
                                            <td style={{ fontWeight: 700, background: "var(--success-soft)" }}>Average</td>
                                            <td className="sdp-font-mono text-right" style={{ fontWeight: 700, background: "var(--success-soft)" }}>100</td>
                                            <td className="sdp-font-mono text-right" style={{ fontWeight: 700, background: "var(--success-soft)" }}>78.75</td>
                                            <td className="sdp-font-mono text-right" style={{ fontWeight: 700, background: "var(--success-soft)", color: "var(--success-text)" }}>78.75%</td>
                                        </tr>
                                    </tbody>
                                </table>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Right column */}
                <div className="flex flex-col gap-6 min-w-0">
                    {/* Notices */}
                    <div className="sdp-card p-5">
                        <div className="flex items-center justify-between mb-3">
                            <h2 className="sdp-font-display" style={{ fontSize: 15.5, fontWeight: 600 }}>
                                Latest Notices
                            </h2>
                            <a href="#" style={{ fontSize: 12.5, color: "var(--navy)", fontWeight: 500 }}>View All</a>
                        </div>
                        <div className="flex flex-col">
                            {NOTICES.map((n, i) => (
                                <div
                                    key={n.title}
                                    className="py-2.5 flex items-start gap-2"
                                    style={{ borderTop: i === 0 ? "none" : "1px solid var(--mist)" }}
                                >
                                    {n.pinned ? (
                                        <Pin size={13} style={{ color: "var(--brass)", marginTop: 3 }} className="shrink-0" />
                                    ) : (
                                        <Megaphone size={13} style={{ color: "var(--slate)", marginTop: 3 }} className="shrink-0" />
                                    )}
                                    <div className="min-w-0">
                                        <p style={{ fontSize: 13, fontWeight: n.pinned ? 600 : 500 }}>{n.title}</p>
                                        <p style={{ fontSize: 11, color: "var(--slate)", marginTop: 1 }}>{n.date}</p>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>

                    {/* Calendar */}
                    <div className="sdp-card p-5">
                        <div className="flex items-center justify-between mb-3">
                            <h2 className="sdp-font-display" style={{ fontSize: 15.5, fontWeight: 600 }}>
                                Academic Calendar
                            </h2>
                            <div className="flex items-center gap-2">
                                <ChevronLeft size={15} style={{ color: "var(--slate)", cursor: "pointer" }} />
                                <span style={{ fontSize: 12.5, fontWeight: 600 }}>May 2026</span>
                                <ChevronRight size={15} style={{ color: "var(--slate)", cursor: "pointer" }} />
                            </div>
                        </div>
                        <div className="grid grid-cols-7 gap-1 mb-1">
                            {["S", "M", "T", "W", "T", "F", "S"].map((d, i) => (
                                <div key={i} className="text-center" style={{ fontSize: 10.5, fontWeight: 600, color: "var(--slate)" }}>
                                    {d}
                                </div>
                            ))}
                        </div>
                        <div className="grid grid-cols-7 gap-1">
                            {CALENDAR_DAYS.map((c, i) => (
                                <div key={i} className={`sdp-cal-cell ${!c.inMonth ? "muted" : ""} ${c.isToday ? "today" : ""}`}>
                                    {c.day}
                                </div>
                            ))}
                        </div>
                        <p className="sdp-eyebrow mt-4 mb-2">Today&rsquo;s Events</p>
                        <div className="flex flex-col gap-2">
                            {TODAYS_EVENTS.map((e) => (
                                <div key={e.title} className="flex items-center justify-between" style={{ fontSize: 12.5 }}>
                                    <span>{e.title}</span>
                                    <span className="sdp-font-mono" style={{ color: "var(--slate)" }}>{e.time}</span>
                                </div>
                            ))}
                        </div>
                    </div>

                    {/* Quick links */}
                    <div className="sdp-card p-5">
                        <h2 className="sdp-font-display mb-3" style={{ fontSize: 15.5, fontWeight: 600 }}>
                            Quick Links
                        </h2>
                        <div className="grid grid-cols-3 gap-3">
                            {QUICK_LINKS.map(({ label, icon: Icon }) => (
                                <button
                                    key={label}
                                    className="flex flex-col items-center justify-center gap-2 rounded-xl py-3 px-1.5 text-center"
                                    style={{ background: "var(--cloud)", border: "1px solid var(--mist)" }}
                                >
                                    <Icon size={18} color="var(--navy)" />
                                    <span style={{ fontSize: 10.5, fontWeight: 500, lineHeight: 1.25 }}>{label}</span>
                                </button>
                            ))}
                        </div>
                    </div>

                    {/* Need help */}
                    <div className="sdp-card p-5 flex items-center gap-3" style={{ background: "var(--info-soft)", border: "1px solid var(--info-soft)" }}>
                        <div
                            className="flex items-center justify-center rounded-full shrink-0"
                            style={{ width: 40, height: 40, background: "var(--info)", color: "#fff" }}
                        >
                            <LifeBuoy size={19} />
                        </div>
                        <div className="min-w-0">
                            <p style={{ fontSize: 13, fontWeight: 600, color: "var(--info-text)" }}>Need Help?</p>
                            <p style={{ fontSize: 11.5, color: "var(--info-text)", marginTop: 1, lineHeight: 1.4 }}>
                                Have queries or issues? Reach out anytime.
                            </p>
                        </div>
                    </div>
                </div>
            </div>
        </main>
    );
}
