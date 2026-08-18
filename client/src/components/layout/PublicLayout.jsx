import { useState, useContext, useEffect } from "react";
import { AuthContext } from "../../context/AuthContext";
import { Outlet, Link, useLocation } from "react-router-dom";
import {
    Menu, X, ChevronDown, MapPin, Phone, Mail, Home as HomeIcon, User
} from "lucide-react";
import AdmissionsMegaMenu, { ADMISSION_MENU_ITEMS } from './AdmissionsMegaMenu';
import { AcademicsMegaMenu, AcademicsMobileMenu } from './AcademicsMegaMenu';
import { StudentsMegaMenu, StudentsMobileMenu } from './StudentsMegaMenu';
import { admissionConfig } from '../../pages/public/admissions/admissionConfig';

export default function PublicLayout() {
    const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
    const [mobileAdmissionsOpen, setMobileAdmissionsOpen] = useState(false);
    const { isAuthenticated, user } = useContext(AuthContext);
    const location = useLocation();

    // Close menu on route change
    useEffect(() => {
        setMobileMenuOpen(false);
    }, [location.pathname]);

    const NAV_LINKS = [
        { label: "Home", path: "/", real: true, icon: true },
        { label: "About Us", path: "/about", real: true },
        { label: "Admissions", dropdown: true, path: "/admissions", real: true },
        { label: "Academics", dropdown: true, path: "/academics", real: true },
        { label: "Students", dropdown: true, path: "/students", real: true },
        { label: "Notices", path: "/notices", real: true },
        { label: "Gallery", path: "/gallery", real: true },
        { label: "Contact Us", path: "/contact", real: true }
    ];

    return (
        <div className="sdp-root bg-white min-h-screen flex flex-col font-sans">
            <style>{`
                .sdp-navItem {
                    color: rgba(255,255,255,0.85);
                    font-size: 14px;
                    font-weight: 500;
                    height: 100%;
                    display: flex;
                    align-items: center;
                    transition: color 150ms;
                    cursor: pointer;
                    text-decoration: none;
                    gap: 6px;
                }
                .sdp-navItem:hover { color: white; }
                .sdp-navItem.active { color: white; border-bottom: 2px solid white; margin-bottom: -2px; }
                
                .sdp-btn-outline {
                    border: 1.5px solid #111827;
                    color: #111827;
                    background: transparent;
                    padding: 8px 18px;
                    border-radius: 6px;
                    font-size: 14px;
                    font-weight: 600;
                    cursor: pointer;
                    display: flex;
                    align-items: center;
                    gap: 8px;
                    transition: background 150ms;
                }
                .sdp-btn-outline:hover { background: rgba(17, 24, 39, 0.05); }

                .sdp-btn-primary-solid {
                    background: #111827;
                    color: white;
                    padding: 8px 20px;
                    border-radius: 6px;
                    font-size: 14px;
                    font-weight: 600;
                    border: 1.5px solid #111827;
                    transition: opacity 150ms;
                }
                .sdp-btn-primary-solid:hover { opacity: 0.9; }

                .sdp-mobile-menu {
                    position: fixed; inset: 0; z-index: 500; transform: translateX(-100%);
                    transition: transform 300ms ease-in-out; display: flex; flex-direction: row;
                }
                .sdp-mobile-menu.open { transform: translateX(0); }
            `}</style>

            {/* Mobile Menu Overlay */}
            <div className={`sdp-mobile-menu ${mobileMenuOpen ? 'open' : ''}`}>
                <div className="w-[300px] max-w-[85vw] bg-white h-full shadow-2xl flex flex-col overflow-y-auto">
                    <div className="p-5 border-b border-gray-100 flex justify-between items-center bg-gray-50 shrink-0">
                        <span className="text-lg font-extrabold text-gray-900 tracking-tight">Menu</span>
                        <button className="p-1.5 rounded-md text-gray-500 hover:bg-gray-200 transition-colors" onClick={() => setMobileMenuOpen(false)}>
                            <X size={20} />
                        </button>
                    </div>
                    {/* Navigation Items */}
                    <nav className="flex-1 p-5 flex flex-col gap-4">
                        {NAV_LINKS.map((nav, idx) => (
                            nav.label === "Admissions" ? (
                                <div key={idx} className="flex flex-col gap-2">
                                    <button onClick={() => setMobileAdmissionsOpen(!mobileAdmissionsOpen)} className={`flex items-center gap-2 text-base font-semibold w-full text-left opacity-90 hover:opacity-100 ${location.pathname.startsWith('/admissions') ? 'text-blue-600' : 'text-gray-800'}`}>
                                        {nav.label} <ChevronDown size={14} className={`opacity-60 transition-transform ${mobileAdmissionsOpen ? 'rotate-180' : ''}`} />
                                    </button>
                                    {mobileAdmissionsOpen && (
                                        <div className="pl-4 flex flex-col gap-3 mt-1 border-l-2 border-slate-100">
                                            {ADMISSION_MENU_ITEMS.map((item, i) => (
                                                <Link key={i} to={item.path} onClick={() => setMobileMenuOpen(false)} className="text-[13px] text-gray-600 hover:text-blue-600 font-medium tracking-wide">
                                                    {item.title}
                                                </Link>
                                            ))}
                                            <Link to="/admissions" onClick={() => setMobileMenuOpen(false)} className="text-[13px] font-bold text-blue-600 mt-2 flex items-center">
                                                Start Admission Guidance <span className="ml-1">&rarr;</span>
                                            </Link>
                                        </div>
                                    )}
                                </div>
                            ) : nav.label === "Academics" ? (
                                <AcademicsMobileMenu key={idx} closeMobileMenu={() => setMobileMenuOpen(false)} />
                            ) : nav.label === "Students" ? (
                                <StudentsMobileMenu key={idx} closeMobileMenu={() => setMobileMenuOpen(false)} />
                            ) : (
                                <div key={idx}>
                                    <Link to={nav.path || "#"} onClick={() => setMobileMenuOpen(false)} className={`flex items-center gap-2 text-base font-semibold opacity-90 hover:opacity-100 ${location.pathname === nav.path && nav.path !== '#' ? 'text-blue-600' : 'text-gray-800'}`}>
                                        {nav.icon && <HomeIcon size={16} className={location.pathname === nav.path ? 'text-blue-600' : 'text-gray-500'} />}
                                        {nav.label} {nav.dropdown && <ChevronDown size={14} className="opacity-60" />}
                                    </Link>
                                </div>
                            )
                        ))}
                    </nav>
                    {/* Application / Portal Actions (Moved inside Mobile drawer for mobile devices) */}
                    <div className="p-5 border-t border-gray-100 flex flex-col gap-3 bg-gray-50 shrink-0">
                        <Link to="/login" className="sdp-btn-outline w-full justify-center">
                            <User size={16} /> Login
                        </Link>
                        <Link to={isAuthenticated && user ? `/${user.role}/dashboard` : "/login"}
                            className="sdp-btn-primary-solid w-full text-center">
                            Student Portal
                        </Link>
                    </div>
                </div>
                {/* Drawer Backdrop */}
                <div className="flex-1 bg-black/60 backdrop-blur-sm cursor-pointer" onClick={() => setMobileMenuOpen(false)}></div>
            </div>

            <header className="bg-white border-b border-gray-200 lg:border-none relative z-40">
                {/* Top Bar */}
                <div className="max-w-[1280px] mx-auto px-4 sm:px-6 lg:px-8 py-3.5 sm:py-4 flex items-center justify-between">
                    {/* Brand */}
                    <div className="flex items-center gap-3 md:gap-4 shrink-1 min-w-0">
                        <div className="w-[40px] h-[40px] sm:w-[48px] sm:h-[48px] lg:w-[52px] lg:h-[52px] rounded-full border border-gray-300 bg-gray-50 flex items-center justify-center shrink-0 overflow-hidden shadow-sm">
                            <svg className="w-7 h-7 sm:w-8 sm:h-8 lg:w-10 lg:h-10 text-gray-800" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                                <circle cx="12" cy="12" r="10"></circle>
                                <path d="M12 16v-4"></path>
                                <path d="M12 8h.01"></path>
                            </svg>
                        </div>
                        <div className="min-w-0 pr-2">
                            <h1 className="text-[14px] sm:text-[15px] lg:text-[17px] font-bold text-gray-900 leading-[1.25] max-w-[200px] sm:max-w-none">
                                Raul Daultsinhji Multipurpose <br className="hidden sm:block" />
                                High School &amp; Jr. College
                            </h1>
                            <p className="text-[10px] sm:text-[11px] lg:text-[12px] text-gray-500 mt-0.5 truncate max-w-[200px] sm:max-w-none">
                                Dondaicha, Maharashtra <span className="hidden sm:inline">&nbsp;&bull;&nbsp; Est. 1929</span>
                            </p>
                        </div>
                    </div>

                    {/* Controls */}
                    <div className="flex items-center gap-3 sm:gap-4 shrink-0">
                        {/* Desktop Only Content */}
                        <div className="hidden lg:flex items-center gap-4">
                            <div className="flex items-center gap-2 cursor-pointer border border-gray-100 px-3 py-1.5 rounded bg-gray-50">
                                <span className="text-xs text-gray-500 font-medium">Academic Year</span>
                                <span className="text-sm font-semibold text-gray-800 tracking-wide text-center pt-[1px]">{admissionConfig.institute.academicYear}</span>
                                <ChevronDown size={14} className="text-gray-500" />
                            </div>
                            <div className="w-[1px] h-[24px] bg-gray-200"></div>
                            <div className="flex items-center gap-3">
                                <Link to="/login" className="sdp-btn-outline">
                                    <User size={16} /> Login
                                </Link>
                                <Link to={isAuthenticated && user ? `/${user.role}/dashboard` : "/login"}
                                    className="sdp-btn-primary-solid">
                                    Student Portal
                                </Link>
                            </div>
                        </div>

                        {/* Mobile Hamburger explicitly on right edge */}
                        <button className="lg:hidden p-2 rounded-lg bg-gray-50 border border-gray-200 text-gray-700 hover:bg-gray-100 transition-colors" aria-label="Open menu" onClick={() => setMobileMenuOpen(true)}>
                            <Menu size={20} />
                        </button>
                    </div>
                </div>

                {/* Main Nav (Desktop) */}
                <div className="hidden lg:block bg-[#0f172a] shadow-md border-b border-[#1e293b]">
                    <div className="max-w-[1280px] mx-auto px-6 lg:px-8 h-[52px] flex items-center justify-center gap-8">
                        {NAV_LINKS.map((nav, idx) => (
                            nav.label === "Admissions" ? (
                                <div key={idx} className="relative group/nav h-full flex items-center shrink-0">
                                    <Link to={nav.path} className={`sdp-navItem ${location.pathname.startsWith('/admissions') ? 'active' : ''}`}>
                                        {nav.label} <ChevronDown size={12} className="opacity-60 ml-0.5 group-hover/nav:rotate-180 transition-transform" />
                                    </Link>
                                    <AdmissionsMegaMenu />
                                </div>
                            ) : nav.label === "Academics" ? (
                                <div key={idx} className="relative h-full flex items-center shrink-0">
                                    <AcademicsMegaMenu />
                                </div>
                            ) : nav.label === "Students" ? (
                                <div key={idx} className="relative h-full flex items-center shrink-0">
                                    <StudentsMegaMenu />
                                </div>
                            ) : (
                                <Link key={idx} to={nav.path || "#"} className={`sdp-navItem ${nav.real ? '' : 'opacity-80'} ${location.pathname === nav.path && nav.path !== '#' ? 'active' : ''}`}>
                                    {nav.icon && <HomeIcon size={15} className="mb-[1px]" />}
                                    {nav.label}
                                    {nav.dropdown && <ChevronDown size={12} className="opacity-60 ml-0.5" />}
                                </Link>
                            )
                        ))}
                    </div>
                </div>
            </header>

            <main className="flex-1">
                <Outlet />
            </main>

            {/* Footer */}
            <footer className="bg-[#0f172a] border-t border-[#1e293b] pt-16 pb-6 text-slate-300 relative overflow-hidden">
                {/* Very subtle glow effect */}
                <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[800px] h-[1px] bg-gradient-to-r from-transparent via-blue-500/20 to-transparent"></div>

                <div className="max-w-[1280px] mx-auto px-6 lg:px-10">
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-10 lg:gap-8 mb-16">
                        {/* Institution Info - Takes up 4 columns on large */}
                        <div className="lg:col-span-4 pr-4">
                            <div className="flex items-center gap-4 mb-6">
                                <div className="w-12 h-12 rounded-full border border-slate-700 bg-slate-800 flex items-center justify-center shrink-0">
                                    <svg className="w-6 h-6 text-blue-400" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                                        <path strokeLinecap="round" strokeLinejoin="round" d="M12 21v-8m0 0V3m0 10h8.25m-8.25 0H3.75" />
                                    </svg>
                                </div>
                                <h2 className="text-[16px] font-bold leading-tight text-white tracking-tight">
                                    Raul Daultsinhji Multipurpose<br />High School &amp; Jr. College of Science
                                </h2>
                            </div>
                            <p className="text-sm text-slate-400 mb-6 leading-relaxed max-w-xs">
                                Dondaicha, Dist. Dhule, Maharashtra<br />Established in 1929
                            </p>
                            <div className="flex gap-4">
                                <a href="#" className="w-9 h-9 rounded-full bg-slate-800 border border-slate-700 flex items-center justify-center text-slate-400 hover:text-white hover:border-slate-500 hover:bg-slate-700 transition-all duration-300">
                                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z"></path></svg>
                                </a>
                                <a href="#" className="w-9 h-9 rounded-full bg-slate-800 border border-slate-700 flex items-center justify-center text-slate-400 hover:text-white hover:border-slate-500 hover:bg-slate-700 transition-all duration-300">
                                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect x="2" y="2" width="20" height="20" rx="5" ry="5"></rect><path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"></path><line x1="17.5" y1="6.5" x2="17.51" y2="6.5"></line></svg>
                                </a>
                                <a href="#" className="w-9 h-9 rounded-full bg-slate-800 border border-slate-700 flex items-center justify-center text-slate-400 hover:text-white hover:border-slate-500 hover:bg-slate-700 transition-all duration-300">
                                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M22.54 6.42a2.78 2.78 0 0 0-1.94-2C18.88 4 12 4 12 4s-6.88 0-8.6.46a2.78 2.78 0 0 0-1.94 2A29 29 0 0 0 1 11.75a29 29 0 0 0 .46 5.33A2.78 2.78 0 0 0 3.4 19c1.72.46 8.6.46 8.6.46s6.88 0 8.6-.46a2.78 2.78 0 0 0 1.94-2 29 29 0 0 0 .46-5.25 29 29 0 0 0-.46-5.33z"></path><polygon points="9.75 15.02 15.5 11.75 9.75 8.48 9.75 15.02"></polygon></svg>
                                </a>
                            </div>
                        </div>

                        {/* Quick Links - Takes up 2 columns on large */}
                        <div className="lg:col-span-2">
                            <h3 className="text-sm font-bold text-white mb-6 uppercase tracking-wider">Quick Links</h3>
                            <ul className="space-y-3 text-sm text-slate-400 flex flex-col">
                                <Link to="/" className="w-fit hover:text-blue-400 hover:translate-x-1 transition-all duration-300 flex items-center">Home</Link>
                                <Link to="/about" className="w-fit hover:text-blue-400 hover:translate-x-1 transition-all duration-300 flex items-center">About Us</Link>
                                <Link to="/admissions" className="w-fit hover:text-blue-400 hover:translate-x-1 transition-all duration-300 flex items-center">Admissions</Link>
                                <Link to="/academics" className="w-fit hover:text-blue-400 hover:translate-x-1 transition-all duration-300 flex items-center">Academics</Link>
                                <Link to="/student/dashboard" className="w-fit hover:text-blue-400 hover:translate-x-1 transition-all duration-300 flex items-center">Students</Link>
                            </ul>
                        </div>

                        {/* Important Links - Takes up 3 columns on large */}
                        <div className="lg:col-span-3">
                            <h3 className="text-sm font-bold text-white mb-6 uppercase tracking-wider">Important Links</h3>
                            <ul className="space-y-3 text-sm text-slate-400 flex flex-col">
                                <Link to="/calendar" className="w-fit hover:text-blue-400 hover:translate-x-1 transition-all duration-300 flex items-center">Academic Calendar</Link>
                                <Link to="/fee-structure" className="w-fit hover:text-blue-400 hover:translate-x-1 transition-all duration-300 flex items-center">Fee Structure</Link>
                                <Link to="/downloads" className="w-fit hover:text-blue-400 hover:translate-x-1 transition-all duration-300 flex items-center">Downloads &amp; Forms</Link>
                                <Link to="/exam-timetable" className="w-fit hover:text-blue-400 hover:translate-x-1 transition-all duration-300 flex items-center">Exam Timetable</Link>
                                <Link to="/results" className="w-fit hover:text-blue-400 hover:translate-x-1 transition-all duration-300 flex items-center">Results &amp; Notices</Link>
                            </ul>
                        </div>

                        {/* Contact Us - Takes up 3 columns on large */}
                        <div className="lg:col-span-3">
                            <h3 className="text-sm font-bold text-white mb-6 uppercase tracking-wider">Contact Us</h3>
                            <ul className="space-y-4 text-sm text-slate-400">
                                <li className="flex items-start gap-4 group">
                                    <div className="w-8 h-8 rounded-lg bg-slate-800 border border-slate-700 flex items-center justify-center shrink-0 group-hover:bg-blue-600/20 group-hover:border-blue-500/30 group-hover:text-blue-400 transition-colors">
                                        <MapPin size={14} />
                                    </div>
                                    <span className="leading-relaxed pt-1">Dondaicha, Dist. Dhule,<br />Maharashtra - 425408</span>
                                </li>
                                <li className="flex items-center gap-4 group">
                                    <div className="w-8 h-8 rounded-lg bg-slate-800 border border-slate-700 flex items-center justify-center shrink-0 group-hover:bg-blue-600/20 group-hover:border-blue-500/30 group-hover:text-blue-400 transition-colors">
                                        <Phone size={14} />
                                    </div>
                                    <span>(02566) 244 123</span>
                                </li>
                                <li className="flex items-center gap-4 group">
                                    <div className="w-8 h-8 rounded-lg bg-slate-800 border border-slate-700 flex items-center justify-center shrink-0 group-hover:bg-blue-600/20 group-hover:border-blue-500/30 group-hover:text-blue-400 transition-colors">
                                        <Mail size={14} />
                                    </div>
                                    <span>rdmpcollege@gmail.com</span>
                                </li>
                            </ul>
                        </div>
                    </div>

                    <div className="border-t border-[#1e293b] pt-8 flex flex-col md:flex-row justify-between items-center text-xs text-slate-500 gap-4">
                        <p>© {admissionConfig.institute.academicYear.substring(0, 4)} Raul Daultsinhji Multipurpose High School &amp; Jr. College of Science. All Rights Reserved.</p>
                        <p className="flex items-center gap-1 font-medium tracking-wide">
                            Designed &amp; Developed with <span className="text-red-500 mx-0.5">&hearts;</span>
                        </p>
                    </div>
                </div>
            </footer>
        </div>
    );
}
