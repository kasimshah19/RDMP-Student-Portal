import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { ChevronDown, GraduationCap, ChevronRight } from 'lucide-react';
import { academicConfig } from '../../pages/public/academics/academicConfig';

export const AcademicsMegaMenu = () => {
    const [isOpen, setIsOpen] = useState(false);
    const location = useLocation();

    // The dropdown remains active if the current path starts with /academics
    const isActive = location.pathname.startsWith('/academics');

    // Split the items into two columns
    const half = Math.ceil(academicConfig.menuItems.length / 2);
    const leftColumn = academicConfig.menuItems.slice(0, half);
    const rightColumn = academicConfig.menuItems.slice(half);

    return (
        <div
            className="relative font-sans"
            onMouseEnter={() => setIsOpen(true)}
            onMouseLeave={() => setIsOpen(false)}
        >
            <Link
                to="/academics"
                className={`py-3 px-1 md:py-8 flex items-center gap-1.5 font-medium transition-colors border-b-2
                    ${isActive
                        ? 'text-blue-500 border-blue-500' // Using existing tint rules
                        : 'text-slate-300 border-transparent hover:text-white'
                    }`}
            >
                Academics
                <ChevronDown size={14} className={`transition-transform duration-200 opacity-60 ${isOpen ? 'rotate-180' : ''}`} />
            </Link>

            {/* Desktop Dropdown Container */}
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
                    <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-blue-500 via-indigo-500 to-blue-500"></div>

                    <div className="flex">
                        {/* Summary Sidebar inside Dropdown */}
                        <div className="w-[200px] bg-slate-50 p-6 border-r border-slate-100 hidden sm:block">
                            <div className="w-10 h-10 rounded-xl bg-blue-100 flex items-center justify-center text-blue-600 mb-4">
                                <GraduationCap size={20} />
                            </div>
                            <h3 className="font-bold text-slate-800 text-sm mb-2 uppercase tracking-widest">Academics</h3>
                            <p className="text-xs text-slate-500 leading-relaxed">
                                Academic resources, curriculum guides, timetables, and college examination structural information.
                            </p>
                        </div>

                        {/* Navigation Grid */}
                        <div className="flex-1 p-6 grid grid-cols-2 gap-x-6 gap-y-2">
                            <div className="space-y-1">
                                {leftColumn.map((item, idx) => (
                                    <DropdownItem key={idx} item={item} />
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
            <style>{`
                @keyframes dropdownIn {
                    from { opacity: 0; transform: translateY(10px) scale(0.98); }
                    to { opacity: 1; transform: translateY(0) scale(1); }
                }
            `}</style>
        </div>
    );
};

// Extracted Dropdown Item Component for cleanliness
const DropdownItem = ({ item }) => (
    <Link
        to={item.path}
        className="group flex gap-3 p-3 pt-3.5 pb-3.5 rounded-xl hover:bg-slate-50 transition-colors border border-transparent hover:border-slate-100 relative"
    >
        <div className="w-9 h-9 rounded-lg bg-slate-50 border border-slate-100 flex items-center justify-center text-slate-500 shrink-0 group-hover:bg-blue-50 group-hover:text-blue-600 transition-colors">
            <item.icon size={18} />
        </div>
        <div>
            <div className="font-bold text-slate-800 text-[13px] flex items-center gap-1">
                {item.title}
                <ChevronRight size={14} className="opacity-0 -translate-x-2 transition-all duration-300 group-hover:opacity-100 group-hover:translate-x-0 group-hover:text-blue-500" />
            </div>
            <div className="text-[11px] text-slate-500 mt-0.5 max-w-[180px] truncate">{item.desc}</div>
        </div>
    </Link>
);

// Mobile Accordion Version
export const AcademicsMobileMenu = ({ closeMobileMenu }) => {
    const [isOpen, setIsOpen] = useState(false);
    const location = useLocation();
    const isActive = location.pathname.startsWith('/academics');

    return (
        <div className="border-b border-slate-800 last:border-0 overflow-hidden">
            <button
                onClick={() => setIsOpen(!isOpen)}
                className={`w-full py-4 px-6 flex items-center justify-between font-semibold transition-colors focus:outline-none min-h-[44px]
                    ${isActive ? 'text-blue-400 bg-slate-800/50' : 'text-slate-300 hover:text-white hover:bg-slate-800/30'}
                `}
            >
                Academics
                <ChevronDown size={18} className={`transition-transform duration-300 ${isOpen ? 'rotate-180 text-blue-400' : 'opacity-50'}`} />
            </button>

            <div
                className={`overflow-hidden transition-all duration-300 ease-in-out bg-slate-900/50 ${isOpen ? 'max-h-[800px] opacity-100' : 'max-h-0 opacity-0'}`}
            >
                <div className="py-2 px-6 flex flex-col space-y-1 relative">
                    {/* Vertical tracking line */}
                    <div className="absolute left-[33px] top-4 bottom-4 w-px bg-slate-800"></div>

                    {academicConfig.menuItems.map((item, idx) => (
                        <Link
                            key={idx}
                            to={item.path}
                            onClick={closeMobileMenu}
                            className="flex items-center gap-4 py-3 min-h-[44px] group relative"
                        >
                            <div className="w-4 h-4 bg-slate-800 rounded-full border-2 border-slate-900 flex items-center justify-center relative z-10 group-hover:bg-blue-500 group-hover:border-blue-500 transition-colors">
                                <div className="w-1.5 h-1.5 bg-slate-500 rounded-full group-hover:bg-white"></div>
                            </div>
                            <div>
                                <span className="block font-medium text-slate-300 group-hover:text-white transition-colors">{item.title}</span>
                                <span className="block text-xs text-slate-500 group-hover:text-slate-400">{item.desc}</span>
                            </div>
                        </Link>
                    ))}
                </div>
            </div>
        </div>
    );
};
