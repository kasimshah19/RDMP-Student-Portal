import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { ChevronDown, GraduationCap, ChevronRight, User, FileText, ClipboardList, Database, Bell, Download, ShieldCheck } from 'lucide-react';

export const STUDENTS_MENU_ITEMS = [
    {
        title: "Student Portal",
        desc: "Personal dashboard & services",
        icon: GraduationCap,
        path: "/student/dashboard"
    },
    {
        title: "My Profile",
        desc: "View personal information",
        icon: User,
        path: "/student/profile"
    },
    {
        title: "Attendance",
        desc: "Track daily presence",
        icon: ClipboardList,
        path: "/student/attendance"
    },
    {
        title: "My Documents",
        desc: "Manage uploaded records",
        icon: FileText,
        path: "/student/documents"
    },
    {
        title: "Academic Records",
        desc: "View exam performance",
        icon: Database,
        path: "/student/results"
    },
    {
        title: "Notices & Announcements",
        desc: "Important student updates",
        icon: Bell,
        path: "/student/notices"
    },
    {
        title: "Downloads",
        desc: "Forms and resources",
        icon: Download,
        path: "/downloads"
    },
    {
        title: "Student Guidelines",
        desc: "Important college rules",
        icon: ShieldCheck,
        path: "/students/guidelines"
    }
];

export const StudentsMegaMenu = () => {
    const [isOpen, setIsOpen] = useState(false);
    const location = useLocation();

    // Determine active if base matches
    const isActive = location.pathname.startsWith('/student') || location.pathname.startsWith('/downloads');

    const half = Math.ceil(STUDENTS_MENU_ITEMS.length / 2);
    const leftColumn = STUDENTS_MENU_ITEMS.slice(0, half);
    const rightColumn = STUDENTS_MENU_ITEMS.slice(half);

    return (
        <div
            className="relative font-sans"
            onMouseEnter={() => setIsOpen(true)}
            onMouseLeave={() => setIsOpen(false)}
        >
            <Link
                to="/student/dashboard"
                className={`py-3 px-1 md:py-8 flex items-center gap-1.5 font-medium transition-colors border-b-2
                    ${isActive
                        ? 'text-blue-500 border-blue-500'
                        : 'text-slate-300 border-transparent hover:text-white'
                    }`}
            >
                Students
                <ChevronDown size={14} className={`transition-transform duration-200 opacity-60 ${isOpen ? 'rotate-180' : ''}`} />
            </Link>

            <div
                className={`absolute top-full left-1/2 -translate-x-1/2 pt-2 transition-all duration-300 ease-out z-[100] ${isOpen
                    ? 'opacity-100 translate-y-0 visible'
                    : 'opacity-0 translate-y-2 invisible'
                    }`}
            >
                <div
                    className="w-[720px] bg-white rounded-2xl shadow-[0_12px_40px_rgba(15,23,42,0.12)] border border-slate-200 overflow-hidden relative"
                    style={{
                        transformOrigin: 'top center',
                        animation: isOpen ? 'dropdownIn 0.2s cubic-bezier(0.16, 1, 0.3, 1)' : 'none'
                    }}
                >
                    {/* Top Accent Line */}
                    <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-emerald-500 via-teal-500 to-emerald-500"></div>

                    <div className="flex">
                        {/* Sidebar Info */}
                        <div className="w-[180px] bg-slate-50 p-6 border-r border-slate-100 hidden sm:flex flex-col justify-between">
                            <div>
                                <div className="w-10 h-10 rounded-xl bg-teal-100 flex items-center justify-center text-teal-600 mb-4">
                                    <GraduationCap size={20} />
                                </div>
                                <h3 className="font-bold text-slate-800 text-sm mb-2 uppercase tracking-tight">Students</h3>
                                <p className="text-xs text-slate-500 leading-relaxed">
                                    Access individual services, daily attendance, verified records, and official portal resources securely.
                                </p>
                            </div>

                            <Link to="/student/dashboard" className="text-xs font-bold text-teal-600 flex items-center gap-1 hover:text-teal-700 mt-4 group">
                                Access Portal <ChevronRight size={14} className="group-hover:translate-x-1 transition-transform" />
                            </Link>
                        </div>

                        {/* Navigation Grid */}
                        <div className="flex-1 p-6 grid grid-cols-2 gap-x-6 gap-y-2">
                            <div className="space-y-1">
                                {leftColumn.map((item, idx) => (
                                    <DropdownItem key={idx} item={item} highlight={item.title === 'Student Portal'} />
                                ))}
                            </div>
                            <div className="space-y-1">
                                {rightColumn.map((item, idx) => (
                                    <DropdownItem key={idx} item={item} />
                                ))}
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

const DropdownItem = ({ item, highlight }) => (
    <Link
        to={item.path}
        className={`group flex gap-3 p-3 pt-3.5 pb-3.5 rounded-xl transition-colors border relative
            ${highlight
                ? 'bg-blue-50/50 hover:bg-blue-50 border-blue-100/50'
                : 'border-transparent hover:border-slate-100 hover:bg-slate-50'
            }`}
    >
        <div className={`w-9 h-9 rounded-lg border flex items-center justify-center shrink-0 transition-colors
             ${highlight
                ? 'bg-blue-100 border-blue-200 text-blue-600 group-hover:bg-blue-600 group-hover:text-white'
                : 'bg-slate-50 border-slate-100 text-slate-500 group-hover:bg-teal-50 group-hover:text-teal-600'
            }`}>
            <item.icon size={18} />
        </div>
        <div>
            <div className={`font-bold text-[13px] flex items-center gap-1 ${highlight ? 'text-blue-900' : 'text-slate-800'}`}>
                {item.title}
                <ChevronRight size={14} className="opacity-0 -translate-x-2 transition-all duration-300 group-hover:opacity-100 group-hover:translate-x-0 group-hover:text-teal-500" />
            </div>
            <div className="text-[11px] text-slate-500 mt-0.5 max-w-[170px] truncate">{item.desc}</div>
        </div>
    </Link>
);


// Mobile Accordion View
export const StudentsMobileMenu = ({ closeMobileMenu }) => {
    const [isOpen, setIsOpen] = useState(false);
    const location = useLocation();
    const isActive = location.pathname.startsWith('/student');

    return (
        <div className="border-b border-slate-800 last:border-0 overflow-hidden">
            <button
                onClick={() => setIsOpen(!isOpen)}
                className={`w-full py-4 px-6 flex items-center justify-between font-semibold transition-colors focus:outline-none min-h-[44px]
                    ${isActive ? 'text-teal-400 bg-slate-800/50' : 'text-slate-300 hover:text-white hover:bg-slate-800/30'}
                `}
            >
                Students
                <ChevronDown size={18} className={`transition-transform duration-300 ${isOpen ? 'rotate-180 text-teal-400' : 'opacity-50'}`} />
            </button>

            <div
                className={`overflow-hidden transition-all duration-300 ease-in-out bg-slate-900/50 ${isOpen ? 'max-h-[800px] opacity-100' : 'max-h-0 opacity-0'}`}
            >
                <div className="py-2 px-6 flex flex-col space-y-1 relative">
                    <div className="absolute left-[33px] top-4 bottom-4 w-px bg-slate-800"></div>

                    {STUDENTS_MENU_ITEMS.map((item, idx) => (
                        <Link
                            key={idx}
                            to={item.path}
                            onClick={closeMobileMenu}
                            className="flex items-center gap-4 py-3 min-h-[44px] group relative"
                        >
                            <div className="w-4 h-4 bg-slate-800 rounded-full border-2 border-slate-900 flex items-center justify-center relative z-10 group-hover:bg-teal-500 group-hover:border-teal-500 transition-colors">
                                <div className="w-1.5 h-1.5 bg-slate-500 rounded-full group-hover:bg-white"></div>
                            </div>
                            <div>
                                <span className={`block font-medium transition-colors ${item.title === 'Student Portal' ? 'text-blue-400 group-hover:text-blue-300' : 'text-slate-300 group-hover:text-white'}`}>
                                    {item.title}
                                </span>
                                <span className="block text-xs text-slate-500 group-hover:text-slate-400">{item.desc}</span>
                            </div>
                        </Link>
                    ))}
                </div>
            </div>
        </div>
    );
};
