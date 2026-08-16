const fs = require('fs');
const content = `import React, { useContext, useEffect, useState } from 'react';
import { AuthContext } from '../../context/AuthContext';
import { Link } from 'react-router-dom';
import { getTeacherDashboard } from '../../services/dashboardService';
import NoticeBoard from '../../components/common/NoticeBoard';
import Loader from '../../components/common/Loader';
import EmptyState from '../../components/common/EmptyState';
import { Calendar, Users, FileText, CheckCircle2, Clock, AlertCircle, ChevronRight, BookOpen, Layers } from 'lucide-react';

// Reusable Circular Progress Ring for Attendance
const PercentRing = ({ percentage }) => {
    const isSuccess = percentage >= 90;
    const isWarning = percentage >= 75 && percentage < 90;
    const colorClass = isSuccess ? 'text-[var(--success)]' : isWarning ? 'text-[var(--warning)]' : 'text-[var(--danger)]';
    const radius = 16;
    const circumference = 2 * Math.PI * radius;
    const strokeDashoffset = circumference - (percentage / 100) * circumference;

    return (
        <div className="relative flex items-center justify-center w-12 h-12">
            <svg className="w-full h-full transform -rotate-90" viewBox="0 0 36 36">
                <circle cx="18" cy="18" r={radius} className="stroke-mist fill-none" strokeWidth="3" />
                <circle 
                    cx="18" cy="18" r={radius} 
                    className={\`\${colorClass} fill-none\`} 
                    strokeWidth="3" 
                    strokeLinecap="round"
                    strokeDasharray={circumference}
                    strokeDashoffset={strokeDashoffset}
                />
            </svg>
            <span className={\`absolute text-[10px] font-bold font-mono \${colorClass}\`}>{Math.round(percentage)}%</span>
        </div>
    );
};

const TeacherDashboard = () => {
    const { user } = useContext(AuthContext);
    const [data, setData] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchDash = async () => {
            try {
                const res = await getTeacherDashboard();
                if (res.success) setData(res.data);
            } catch (error) { console.error(error); }
            setLoading(false);
        };
        fetchDash();
    }, []);

    if (loading) return <Loader fullScreen message="Loading Faculty Workspace" />;

    const teacherName = data?.teacher?.name || user?.name || 'Instructor';
    const summary = data?.summary || { totalDivisions: 0, totalStudents: 0, attendanceMarkedToday: 0, averageAttendanceThisWeek: 0, pendingMarksEntryCount: 0 };
    const myClasses = data?.myClasses || [];
    const recentAttendance = data?.recentAttendance || [];
    const recentMarksEntry = data?.recentMarksEntry || [];
    const pendingTasks = data?.pendingTasks || [];
    const upcomingExams = data?.upcomingExams || [];
    const notices = data?.notices?.recent || [];

    // KPI Semantic Colors
    const attWeekColor = summary.averageAttendanceThisWeek >= 90 ? 'text-[var(--success-text)]' : summary.averageAttendanceThisWeek >= 75 ? 'text-[var(--info-text)]' : 'text-[var(--danger-text)]';
    const pendingColor = (summary.pendingMarksEntryCount + pendingTasks.filter(t => t.type === 'attendance').length) > 0 ? 'text-[var(--warning-text)]' : 'text-slate-600';

    return (
        <div className="w-full pb-12 animate-in fade-in duration-300">
            <div className="flex justify-between items-end mb-6 border-b border-mist pb-4">
                <div>
                    <h1 className="text-3xl font-bold font-display text-[var(--navy)] tracking-tight">Faculty Workspace</h1>
                    <p className="text-[var(--slate)] font-medium text-sm mt-1">Welcome back, {teacherName} 👋</p>
                </div>
            </div>

            {/* KPI ROW - 5 Cards */}
            <div className="grid grid-cols-2 md:grid-cols-3 xl:grid-cols-5 gap-4 mb-8">
                <div className="sdp-card p-4 flex flex-col justify-between h-[100px] group overflow-hidden relative">
                    <div className="absolute right-3 top-3 text-[var(--navy)] opacity-10 group-hover:opacity-20 transition-opacity"><Layers size={28} /></div>
                    <p className="text-[10px] font-bold text-[var(--slate)] uppercase tracking-wider">Total Classes</p>
                    <div className="flex items-end justify-between">
                        <span className="text-3xl font-mono font-bold text-[var(--navy)]">{summary.totalDivisions}</span>
                        <span className="text-[10px] pb-1 text-[var(--slate)] font-semibold border-b border-[var(--brass)] cursor-help">Divisions</span>
                    </div>
                </div>
                
                <div className="sdp-card p-4 flex flex-col justify-between h-[100px] group overflow-hidden relative">
                    <div className="absolute right-3 top-3 text-[var(--navy)] opacity-10 group-hover:opacity-20 transition-opacity"><Users size={28} /></div>
                    <p className="text-[10px] font-bold text-[var(--slate)] uppercase tracking-wider">Total Students</p>
                    <div className="flex items-end justify-between">
                        <span className="text-3xl font-mono font-bold text-[var(--navy)]">{summary.totalStudents}</span>
                        <span className="text-[10px] pb-1 text-[var(--slate)] font-semibold border-b border-[var(--brass)] cursor-help">Roll Count</span>
                    </div>
                </div>

                <Link to="/teacher/attendance/mark" className="sdp-card p-4 flex flex-col justify-between h-[100px] group overflow-hidden relative hover:border-[var(--brass)] transition-colors">
                    <div className="absolute right-3 top-3 text-[var(--navy)] opacity-10 group-hover:text-[var(--brass)] group-hover:opacity-30 transition-colors"><CheckCircle2 size={28} /></div>
                    <p className="text-[10px] font-bold text-[var(--slate)] uppercase tracking-wider">Attendance Today</p>
                    <div className="flex items-end justify-between">
                        <span className="text-3xl font-mono font-bold text-[var(--navy)]">{summary.attendanceMarkedToday}</span>
                        <span className="text-[10px] pb-1 font-bold text-[var(--brass)] group-hover:underline">Mark Now</span>
                    </div>
                </Link>

                <div className="sdp-card p-4 flex flex-col justify-between h-[100px] group overflow-hidden relative">
                    <div className="absolute right-3 top-3 text-[var(--navy)] opacity-10 group-hover:opacity-20 transition-opacity"><Clock size={28} /></div>
                    <p className="text-[10px] font-bold text-[var(--slate)] uppercase tracking-wider">Avg. Attd (7D)</p>
                    <div className="flex items-end justify-between">
                        <span className={\`text-3xl font-mono font-bold \${attWeekColor}\`}>{summary.averageAttendanceThisWeek}%</span>
                        <span className="text-[10px] pb-1 text-[var(--slate)] font-semibold">Across classes</span>
                    </div>
                </div>

                <div className="sdp-card p-4 flex flex-col justify-between h-[100px] group overflow-hidden relative col-span-2 xl:col-span-1">
                    <div className="absolute right-3 top-3 text-[var(--navy)] opacity-10 group-hover:opacity-20 transition-opacity"><AlertCircle size={28} /></div>
                    <p className="text-[10px] font-bold text-[var(--slate)] uppercase tracking-wider">Pending Work</p>
                    <div className="flex items-end justify-between">
                        <span className={\`text-3xl font-mono font-bold \${pendingColor}\`}>{summary.pendingMarksEntryCount + pendingTasks.filter(t=>t.type==='attendance').length}</span>
                        <span className="text-[10px] pb-1 text-[var(--slate)] font-semibold border-b border-[var(--brass)] cursor-help">Actions</span>
                    </div>
                </div>
            </div>

            {/* TWO-COLUMN LAYOUT */}
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                
                {/* LEFT COLUMN (lg:col-span-2) */}
                <div className="lg:col-span-2 space-y-6 flex flex-col">
                    
                    {/* My Classes */}
                    <div className="sdp-card p-5">
                        <div className="flex justify-between items-center mb-4">
                            <h3 className="font-bold text-[var(--navy)]">My Classes</h3>
                            <button className="text-[11px] font-bold text-[var(--brass)] uppercase tracking-widest hover:underline">View All</button>
                        </div>
                        {myClasses.length === 0 ? (
                            <EmptyState title="No Classes Maped" description="You have not been assigned core divisions yet." icon={BookOpen}/>
                        ) : (
                            <div className="divide-y divide-mist">
                                {myClasses.map((cls, idx) => (
                                    <div key={idx} className="py-3 flex items-center justify-between group hover:bg-[var(--cloud)] rounded px-2 -mx-2 transition-colors cursor-pointer">
                                        <div className="flex items-center gap-4">
                                            <div className="w-10 h-10 rounded-lg bg-[var(--navy)]/5 text-[var(--navy)] flex items-center justify-center font-bold">
                                                <Users size={18} />
                                            </div>
                                            <div>
                                                <p className="font-bold text-[14px] text-[var(--ink)] tracking-tight">
                                                    {cls.classGroupName} {cls.divisionName} <span className="font-medium text-[var(--slate)]">({cls.stream || 'General'})</span>
                                                </p>
                                                <p className="text-[11px] font-medium text-[var(--slate)] mt-0.5">
                                                    {cls.subjectNames.join(', ')} • {cls.studentCount} Students
                                                </p>
                                            </div>
                                        </div>
                                        <div className="flex items-center gap-3">
                                            <PercentRing percentage={cls.attendancePercentage} />
                                            <ChevronRight size={16} className="text-gray-300 group-hover:text-[var(--brass)]" />
                                        </div>
                                    </div>
                                ))}
                            </div>
                        )}
                    </div>

                    {/* Quick Analytics Dual Lists */}
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        {/* Recent Attendance */}
                        <div className="sdp-card p-5">
                            <div className="flex justify-between items-center mb-4">
                                <h3 className="font-bold text-[var(--navy)] text-sm">Recent Attendance Taken</h3>
                            </div>
                            {recentAttendance.length === 0 ? (
                                <EmptyState title="No Logs" description="You haven't marked attendance recently." icon={CheckCircle2}/>
                            ) : (
                                <div className="space-y-4">
                                    {recentAttendance.map((ra, idx) => (
                                        <div key={idx} className="flex justify-between items-center bg-gray-50 border border-mist rounded p-3">
                                            <div>
                                                <p className="text-xs font-bold text-[var(--ink)]">{ra.classGroupName} {ra.divisionName}</p>
                                                <p className="text-[10px] font-mono mt-1 text-gray-500">{ra.date}</p>
                                            </div>
                                            <div className="text-right">
                                                <p className={\`text-xs font-bold \${ra.percentage >= 75 ? 'text-green-600' : 'text-red-500'}\`}>{ra.percentage}%</p>
                                                <p className="text-[10px] text-gray-400 mt-1 font-medium">{ra.presentCount}/{ra.totalCount}</p>
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            )}
                        </div>

                        {/* Recent Marks Entry */}
                        <div className="sdp-card p-5">
                            <div className="flex justify-between items-center mb-4">
                                <h3 className="font-bold text-[var(--navy)] text-sm">Recent Marks Entry</h3>
                            </div>
                            {recentMarksEntry.length === 0 ? (
                                <EmptyState title="No Entries" description="You haven't submitted marks recently." icon={FileText}/>
                            ) : (
                                <div className="space-y-4">
                                    {recentMarksEntry.map((rm, idx) => (
                                        <div key={idx} className="flex justify-between items-center bg-gray-50 border border-mist rounded p-3">
                                            <div>
                                                <p className="text-xs font-bold text-[var(--ink)] truncate w-[140px]">{rm.examName}</p>
                                                <p className="text-[10px] font-medium mt-1 text-gray-500">{rm.subjectName} • {rm.divisionName}</p>
                                            </div>
                                            <div className="text-right">
                                                <p className="text-[10px] font-bold text-[var(--success)] bg-green-50 px-2 py-0.5 rounded border border-green-100">Completed</p>
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            )}
                        </div>
                    </div>

                    {/* Quick Actions / Directives */}
                    <div className="sdp-card p-5">
                        <h3 className="font-bold text-[var(--navy)] text-sm mb-4">Quick Actions</h3>
                        <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
                            <Link to="/teacher/attendance/mark" className="flex flex-col items-center gap-2 p-3 bg-white border border-mist hover:border-[var(--brass)] hover:bg-[var(--cloud)] rounded-lg text-center transition-colors">
                                <div className="w-10 h-10 rounded-full bg-green-50 text-green-600 flex items-center justify-center"><CheckCircle2 size={18} /></div>
                                <span className="text-[10px] font-bold text-[var(--ink)]">Take<br/>Attendance</span>
                            </Link>
                            <Link to="/teacher/marks/enter" className="flex flex-col items-center gap-2 p-3 bg-white border border-mist hover:border-[var(--brass)] hover:bg-[var(--cloud)] rounded-lg text-center transition-colors">
                                <div className="w-10 h-10 rounded-full bg-orange-50 text-orange-600 flex items-center justify-center"><FileText size={18} /></div>
                                <span className="text-[10px] font-bold text-[var(--ink)]">Enter<br/>Marks</span>
                            </Link>
                            <Link to="/teacher/attendance/report" className="flex flex-col items-center gap-2 p-3 bg-white border border-mist hover:border-[var(--brass)] hover:bg-[var(--cloud)] rounded-lg text-center transition-colors">
                                <div className="w-10 h-10 rounded-full bg-blue-50 text-blue-600 flex items-center justify-center"><Calendar size={18} /></div>
                                <span className="text-[10px] font-bold text-[var(--ink)]">Attendance<br/>Report</span>
                            </Link>
                            <Link to="/teacher/marks/summary" className="flex flex-col items-center gap-2 p-3 bg-white border border-mist hover:border-[var(--brass)] hover:bg-[var(--cloud)] rounded-lg text-center transition-colors">
                                <div className="w-10 h-10 rounded-full bg-purple-50 text-purple-600 flex items-center justify-center"><BookOpen size={18} /></div>
                                <span className="text-[10px] font-bold text-[var(--ink)]">Exam<br/>Summary</span>
                            </Link>
                        </div>
                    </div>
                </div>

                {/* RIGHT COLUMN */}
                <div className="space-y-6 flex flex-col">
                    
                    {/* Pending Tasks */}
                    <div className="sdp-card p-5 border-t-4 border-[var(--warning)]">
                        <div className="flex justify-between items-center mb-4">
                            <h3 className="font-bold text-[var(--navy)]">Pending Tasks</h3>
                            <span className="bg-[var(--warning)] text-white text-[10px] font-bold px-2 py-0.5 rounded-full">{pendingTasks.length}</span>
                        </div>
                        
                        {pendingTasks.length === 0 ? (
                            <EmptyState title="All Caught Up!" description="No pending operational tasks." icon={CheckCircle2}/>
                        ) : (
                            <div className="space-y-3">
                                {pendingTasks.map((task, idx) => (
                                    <Link key={idx} to={task.link} className="flex items-center gap-3 p-3 bg-yellow-50/50 hover:bg-yellow-50 border border-yellow-100 rounded-lg group transition-colors">
                                        <div className="text-[var(--warning)] shrink-0">
                                            {task.type === 'attendance' ? <CheckCircle2 size={16}/> : <FileText size={16}/>}
                                        </div>
                                        <div className="flex-1 text-[11px] font-bold text-[var(--ink)] group-hover:text-[var(--warning-text)] transition-colors leading-snug">
                                            {task.label}
                                        </div>
                                        <ChevronRight size={14} className="text-gray-300 group-hover:text-[var(--warning)]" />
                                    </Link>
                                ))}
                            </div>
                        )}
                    </div>

                    {/* Upcoming Exams */}
                    <div className="sdp-card p-5">
                        <h3 className="font-bold text-[var(--navy)] mb-4">Upcoming Exams</h3>
                        {upcomingExams.length === 0 ? (
                            <EmptyState title="No Exams" description="No exams scheduled for your assigned streams." icon={Calendar}/>
                        ) : (
                            <div className="space-y-3">
                                {upcomingExams.map((exam, idx) => {
                                    const exDate = new Date(exam.startDate);
                                    const m = exDate.toLocaleDateString('en-US', { month: 'short' }).toUpperCase();
                                    const d = exDate.getDate();
                                    return (
                                        <div key={idx} className="flex items-center gap-4 bg-gray-50 border border-mist rounded-lg p-3 hover:bg-[var(--cloud)] transition-colors">
                                            <div className="flex flex-col items-center justify-center bg-white border border-mist rounded w-10 h-10 shrink-0">
                                                <span className="text-[8px] font-bold text-[var(--slate)] uppercase">{m}</span>
                                                <span className="text-[14px] font-bold text-[var(--navy)] leading-none">{d}</span>
                                            </div>
                                            <div className="flex-1 truncate">
                                                <p className="text-[12px] font-bold text-[var(--ink)] truncate w-full">{exam.examName}</p>
                                                <p className="text-[10px] text-gray-500 mt-1 font-medium">{exam.classGroupName}</p>
                                            </div>
                                        </div>
                                    );
                                })}
                            </div>
                        )}
                    </div>

                    {/* Notice Board Widget */}
                    <NoticeBoard notices={notices} title="Administration Notices" />
                </div>
            </div>
        </div>
    );
};

export default TeacherDashboard;
`;
fs.writeFileSync('client/src/pages/teacher/TeacherDashboard.jsx', content);
console.log('TeacherDashboard rewritten cleanly');
