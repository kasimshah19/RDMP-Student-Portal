import React, { useContext } from 'react';
import { Outlet, Link, useLocation } from 'react-router-dom';
import { AuthContext } from '../../context/AuthContext';
import {
    LayoutDashboard, Users, UserCheck, BookOpen, Calendar,
    FileText, LogOut, Bell, CheckCircle2, User, ClipboardList,
    FileBarChart, Book, MessageSquare, Settings, CalendarCheck
} from 'lucide-react';

const AdminTeacherLayout = () => {
    const { user, logout } = useContext(AuthContext);
    const location = useLocation();
    const isAdmin = user?.role === 'admin';

    const menuItems = isAdmin ? [
        { path: '/admin/dashboard', icon: <LayoutDashboard size={20} />, label: 'Dashboard' },
        { path: '/admin/admissions', icon: <UserCheck size={20} />, label: 'Admissions' },
        { path: '/admin/documents', icon: <FileText size={20} />, label: 'Verification Center' },
        { path: '/admin/students', icon: <Users size={20} />, label: 'Students' },
        { path: '/admin/teachers', icon: <Users size={20} />, label: 'Teachers' },
        { path: '/admin/classes', icon: <BookOpen size={20} />, label: 'Classes' },
        { path: '/admin/attendance', icon: <Calendar size={20} />, label: 'Attendance' },
        { path: '/admin/exams', icon: <FileText size={20} />, label: 'Exams' },
        { path: '/admin/notices', icon: <Bell size={20} />, label: 'Notices' },
        { path: '/admin/reports', icon: <FileText size={20} />, label: 'Reports' },
    ] : [
        { path: '/teacher/dashboard', icon: <LayoutDashboard size={18} />, label: 'Dashboard' },
        { path: '/teacher/my-classes', icon: <Users size={18} />, label: 'My Classes' },
        { path: '/teacher/attendance/mark', icon: <CalendarCheck size={18} />, label: 'Attendance' },
        { path: '/teacher/examinations', icon: <FileText size={18} />, label: 'Examinations' },
        { path: '/teacher/marks/enter', icon: <BookOpen size={18} />, label: 'Marks Entry' },
        { path: '/teacher/students', icon: <User size={18} />, label: 'Students' },
        { path: '/teacher/timetable', icon: <Calendar size={18} />, label: 'Time Table' },
        { path: '/teacher/assignments', icon: <ClipboardList size={18} />, label: 'Assignments' },
        { path: '/teacher/notices', icon: <Bell size={18} />, label: 'Notices' },
        { path: '/teacher/reports', icon: <FileBarChart size={18} />, label: 'Reports' },
        { path: '/teacher/library', icon: <Book size={18} />, label: 'Library' },
        { path: '/teacher/messages', icon: <MessageSquare size={18} />, label: 'Messages', badge: 3 },
        { path: '/teacher/settings', icon: <Settings size={18} />, label: 'Settings' },
    ];

    const getInitials = (name) => {
        if (!name) return 'U';
        return name.split(' ').map(n => n[0]).join('').substring(0, 2).toUpperCase();
    };

    return (
        <div className="min-h-screen bg-cloud flex">
            {/* Sidebar Desktop */}
            <aside className="hidden md:flex flex-col w-64 bg-navy text-mist border-r border-navy-deep fixed h-full z-10 transition-all duration-300">

                {/* 1. College Header */}
                <div className="p-5 flex flex-col items-center text-center shrink-0">
                    <div className="w-12 h-12 bg-white rounded-full flex items-center justify-center text-navy font-bold text-xl mb-3 shadow-md">
                        RD
                    </div>
                    <h2 className="text-white font-display font-medium text-[13px] leading-tight mb-2">
                        Raul Daulatsinhji Multipurpose<br />High School & Jr. College of Science
                    </h2>
                    <p className="text-white/60 text-[10px] leading-tight">
                        Dondaicha, Dist. Dhule, Maharashtra<br />Est. 1929
                    </p>
                </div>

                {/* 2. Nav List */}
                <div className="py-2 px-4 flex-1 space-y-1 overflow-y-auto no-scrollbar pb-6">
                    {menuItems.map((item) => {
                        const isActive = location.pathname === item.path || (location.pathname.startsWith(item.path + '/') && item.path !== '/teacher/dashboard');
                        return (
                            <Link
                                key={item.path}
                                to={item.path}
                                className={`flex items-center justify-between py-3 px-4 rounded-xl transition-all font-medium text-sm ${isActive
                                        ? 'bg-blue-600 text-white shadow-md'
                                        : 'text-white/80 hover:text-white hover:bg-white/5'
                                    }`}
                            >
                                <div className="flex items-center gap-3">
                                    <div className={`${isActive ? 'text-white' : 'text-white/80'}`}>
                                        {item.icon}
                                    </div>
                                    {item.label}
                                </div>
                                {item.badge && (
                                    <span className="bg-red-500 text-white text-[10px] font-bold w-5 h-5 flex items-center justify-center rounded-full">
                                        {item.badge}
                                    </span>
                                )}
                            </Link>
                        );
                    })}
                </div>

                {/* 3. Bottom User Card Expanded Visual */}
                <div className="p-3 shrink-0 mt-auto">
                    <div className="rounded-2xl border border-white/10 bg-white/5 p-4 flex flex-col gap-4">
                        {/* Avatar & Name */}
                        <div className="flex items-center gap-3">
                            <div className="w-11 h-11 rounded-full bg-white flex shrink-0 items-center justify-center text-navy font-bold shadow-sm overflow-hidden border-2 border-white/20">
                                {isAdmin ? (
                                    <div className="w-full h-full bg-brass/20 text-brass flex items-center justify-center">{getInitials(user?.name)}</div>
                                ) : (
                                    <img src={`https://ui-avatars.com/api/?name=${user?.name || 'Patil'}&background=ffffff&color=0f172a&bold=true`} alt="Avatar" className="w-full h-full object-cover" />
                                )}
                            </div>
                            <div className="overflow-hidden flex-1">
                                <p className="text-white font-semibold truncate text-[14px] leading-tight mb-1">{isAdmin ? (user?.name || 'Admin') : 'Mr. A. B. Patil'}</p>
                                <span className="text-[11px] text-white/70 tracking-wide font-medium">
                                    {isAdmin ? 'System Administrator' : 'Physics Teacher'}
                                </span>
                            </div>
                        </div>

                        {/* Details */}
                        {!isAdmin && (
                            <div className="text-[12px] text-white/80 space-y-2 font-medium mt-1">
                                <div className="flex">
                                    <span className="w-[85px]">Employee ID</span>
                                    <span className="mx-1">:</span>
                                    <span className="text-white">TCH1023</span>
                                </div>
                                <div className="flex">
                                    <span className="w-[85px]">Department</span>
                                    <span className="mx-1">:</span>
                                    <span className="text-white">Science</span>
                                </div>
                            </div>
                        )}

                        {/* Action Buttons */}
                        <div className="flex flex-col mt-1">
                            <Link to={isAdmin ? "/admin/profile" : "/teacher/profile"} className="w-full flex items-center justify-center py-2.5 bg-blue-700 hover:bg-blue-600 text-white rounded-lg transition-colors text-[13px] font-semibold shadow-sm">
                                View Profile
                            </Link>
                            <button onClick={logout} className="w-full flex items-center justify-center gap-2 py-2 text-white/30 hover:text-red-400 rounded-lg transition-colors text-[10px] uppercase font-bold tracking-widest mt-2">
                                <LogOut size={12} /> Logout
                            </button>
                        </div>
                    </div>
                </div>
            </aside>

            {/* Main Content Area */}
            <div className="flex-1 md:ml-64 flex flex-col h-screen overflow-hidden bg-cloud">
                {/* Topbar (Mobile Hamburger & Global Actions) */}
                <header className="h-16 bg-paper border-b border-mist flex flex-col shrink-0 z-20">
                    <div className="flex-1 w-full px-4 sm:px-6 lg:px-8 flex items-center justify-between">
                        <div className="flex items-center gap-3">
                            {/* Mobile Menu Button */}
                            <div className="md:hidden text-xl font-display font-bold text-navy">RDMP Portal</div>
                            {/* Admin / Desktop global reference header left */}
                            <div className="hidden md:block font-display font-semibold text-lg text-ink">Dashboard Overview</div>
                        </div>
                        <div className="flex items-center gap-4">
                            <span className="hidden sm:inline-flex items-center gap-2 bg-mist rounded-full px-3 py-1">
                                <span className="w-2 h-2 rounded-full bg-success"></span>
                                <span className="text-xs font-bold text-slate">Live</span>
                            </span>
                        </div>
                    </div>
                </header>

                <main className="flex-1 overflow-y-auto w-full">
                    <div className="w-full h-full">
                        <Outlet />
                    </div>
                </main>
            </div>
        </div>
    );
};

export default AdminTeacherLayout;
