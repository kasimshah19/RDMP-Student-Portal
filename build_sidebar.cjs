const fs = require('fs');
const content = `import React, { useContext } from 'react';
import { Outlet, Link, useLocation } from 'react-router-dom';
import { AuthContext } from '../../context/AuthContext';
import { LayoutDashboard, Users, UserCheck, BookOpen, Calendar, FileText, LogOut, Bell, CheckCircle2 } from 'lucide-react';

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
        { path: '/teacher/dashboard', icon: <LayoutDashboard size={20} />, label: 'Dashboard' },
        { path: '/teacher/attendance/mark', icon: <CheckCircle2 size={20} />, label: 'Mark Attendance' },
        { path: '/teacher/attendance/report', icon: <Calendar size={20} />, label: 'Attendance Report' },
        { path: '/teacher/marks/enter', icon: <FileText size={20} />, label: 'Enter Marks' },
        { path: '/teacher/marks/summary', icon: <BookOpen size={20} />, label: 'Exam Summary' },
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
                <div className="p-5 border-b border-navy-deep flex flex-col items-center text-center shrink-0">
                    <div className="w-12 h-12 bg-white rounded-full flex items-center justify-center text-navy font-bold text-xl mb-3 shadow-md">
                        RD
                    </div>
                    <h2 className="text-white font-display font-medium text-[13px] leading-tight mb-2">
                        Raul Daulatsinhji Multipurpose<br/>High School & Jr. College of Science
                    </h2>
                    <p className="text-white/60 text-[10px] leading-tight">
                        Dondaicha, Dist. Dhule, Maharashtra<br/>Est. 1929
                    </p>
                </div>

                {/* 2. Nav List */}
                <div className="py-6 px-3 flex-1 space-y-1 overflow-y-auto">
                    <p className="text-[10px] font-bold text-white/50 uppercase tracking-widest mb-4 px-3">Menu</p>
                    {menuItems.map((item) => {
                        const isActive = location.pathname === item.path || location.pathname.startsWith(item.path + '/');
                        return (
                            <Link
                                key={item.path}
                                to={item.path}
                                className={\`flex items-center gap-3 py-2.5 rounded-lg transition-colors font-medium text-sm \${
                                    isActive 
                                    ? 'bg-navy-deep text-white border-l-4 border-brass pl-[12px] pr-4' 
                                    : 'text-white/70 hover:text-white hover:bg-navy-deep px-4'
                                }\`}
                            >
                                <div className={\`\${isActive ? 'text-white' : 'text-white/70'}\`}>
                                    {item.icon}
                                </div>
                                {item.label}
                            </Link>
                        );
                    })}
                </div>

                {/* 3. Bottom User Card */}
                <div className="p-4 border-t border-navy-deep shrink-0 bg-navy-deep/30">
                    <div className="flex items-center gap-3 mb-4">
                        <div className="w-10 h-10 rounded-full bg-brass/20 flex shrink-0 items-center justify-center text-brass font-bold shadow-sm">
                            {getInitials(user?.name)}
                        </div>
                        <div className="overflow-hidden flex-1">
                            <p className="text-white font-semibold truncate text-sm leading-tight mb-1">{user?.name || 'Faculty Member'}</p>
                            <span className="text-[9px] bg-brass/20 text-brass px-2 py-0.5 rounded shadow-sm border border-brass/20 uppercase tracking-widest font-black inline-block">
                                {isAdmin ? 'System Admin' : 'Teacher'}
                            </span>
                        </div>
                    </div>
                    <button 
                        onClick={logout} 
                        className="w-full flex items-center justify-center gap-2 px-3 py-2 bg-navy border border-mist/10 text-white/70 hover:text-red-400 hover:bg-red-500/10 hover:border-red-500/20 rounded-lg transition-colors text-sm font-semibold"
                    >
                        <LogOut size={16} /> Logout
                    </button>
                </div>
            </aside>

            {/* Main Content Area */}
            <div className="flex-1 md:ml-64 flex flex-col min-h-screen">
                {/* Topbar (Mobile Hamburger & Global Actions) */}
                <header className="h-16 bg-paper border-b border-mist flex items-center justify-between px-4 sm:px-6 sticky top-0 z-20">
                    <div className="flex items-center gap-3">
                        {/* Mobile Menu Button - Preserved native behavior */}
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
                </header>

                <main className="flex-1 p-4 sm:p-6 lg:p-8 overflow-x-hidden max-w-[1280px] w-full mx-auto">
                    <Outlet />
                </main>
            </div>
        </div>
    );
};

export default AdminTeacherLayout;
`;
fs.writeFileSync('client/src/components/layout/AdminTeacherLayout.jsx', content);
console.log('Sidebar UI written successfully');
