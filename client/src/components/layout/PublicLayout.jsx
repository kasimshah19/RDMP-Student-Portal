import { useState, useContext, useEffect } from "react";
import { AuthContext } from "../../context/AuthContext";
import { Outlet, Link, useLocation } from "react-router-dom";
import {
    Menu, X, ChevronDown, MapPin, Phone, Mail, Home as HomeIcon, User
} from "lucide-react";

export default function PublicLayout() {
    const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
    const { isAuthenticated, user } = useContext(AuthContext);
    const location = useLocation();

    // Close menu on route change
    useEffect(() => {
        setMobileMenuOpen(false);
    }, [location.pathname]);

    const NAV_LINKS = [
        { label: "Home", path: "/", real: true, icon: true },
        { label: "About Us", path: "#" },
        { label: "Admissions", dropdown: true, path: "#" },
        { label: "Academics", dropdown: true, path: "#" },
        { label: "Students", dropdown: true, path: "#" },
        { label: "Notices", path: "/notices", real: true },
        { label: "Gallery", path: "#" },
        { label: "Contact Us", path: "#" }
    ];

    return (
        <div className="sdp-root bg-white min-h-screen flex flex-col font-sans">
            <style>{`
                .sdp-public-header {}
                .sdp-public-topnav {
                    background: white;
                    padding: 16px 32px;
                    display: flex;
                    align-items: center;
                    justify-content: space-between;
                    gap: 24px;
                    max-width: 1440px;
                    margin: 0 auto;
                }
                .sdp-public-mainnav { background: #111827; }
                .sdp-public-mainnav-inner {
                    display: flex;
                    align-items: center;
                    justify-content: center;
                    padding: 0 24px;
                    max-width: 1440px;
                    margin: 0 auto;
                    height: 54px;
                    gap: 32px;
                }
                
                .sdp-navItem {
                    color: rgba(255,255,255,0.85);
                    font-size: 14.5px;
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
                    position: fixed; inset: 0; z-index: 50; transform: translateX(-100%);
                    transition: transform 200ms ease-out; display: flex; flex-direction: column;
                }
                .sdp-mobile-menu.open { transform: translateX(0); }
                
                .sdp-footer { background: #0F172A; color: white; padding: 60px 32px 20px; }
                .sdp-footer-grid { max-width: 1300px; margin: 0 auto; display: grid; gap: 40px; grid-template-columns: 1fr; }
                @media (min-width: 768px) { .sdp-footer-grid { grid-template-columns: repeat(2, 1fr); } }
                @media (min-width: 1024px) { .sdp-footer-grid { grid-template-columns: 1.2fr 1fr 1fr 1.2fr; } }
            `}</style>

            {/* Mobile Menu Overlay */}
            <div className={`sdp-mobile-menu ${mobileMenuOpen ? 'open' : ''}`}>
                <div className="flex-1 bg-gray-900 text-white p-5">
                    <div className="flex justify-between items-center mb-8">
                        <span className="text-lg font-bold">Menu</span>
                        <button onClick={() => setMobileMenuOpen(false)}><X size={24} /></button>
                    </div>
                    <nav className="flex flex-col gap-4">
                        {NAV_LINKS.map((nav, idx) => (
                            <div key={idx}>
                                {nav.real ? (
                                    <Link to={nav.path} className={`text-base font-medium opacity-90 ${location.pathname === nav.path ? 'text-brass' : ''}`}>{nav.label}</Link>
                                ) : (
                                    <span className="text-base font-medium opacity-60 flex items-center gap-1 cursor-default">
                                        {nav.label} {nav.dropdown && <ChevronDown size={14} />}
                                    </span>
                                )}
                            </div>
                        ))}
                    </nav>
                </div>
                <div className="bg-black/50 flex-1" onClick={() => setMobileMenuOpen(false)}></div>
            </div>

            <header className="sdp-public-header border-b border-gray-200 lg:border-none">
                {/* Top Bar */}
                <div className="sdp-public-topnav flex-col lg:flex-row py-4 lg:py-5">
                    {/* Brand */}
                    <div className="flex items-center gap-4">
                        <div className="w-[52px] h-[52px] rounded-full border border-gray-300 flex items-center justify-center shrink-0 overflow-hidden">
                            {/* Dummy Seal Logo */}
                            <svg className="w-10 h-10 text-gray-800" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                                <circle cx="12" cy="12" r="10"></circle>
                                <path d="M12 16v-4"></path>
                                <path d="M12 8h.01"></path>
                            </svg>
                        </div>
                        <div>
                            <h1 className="text-[17px] font-bold text-gray-900 leading-tight">
                                Raul Daultsinhji Multipurpose <br className="hidden lg:block" />
                                High School &amp; Jr. College of Science
                            </h1>
                            <p className="text-[12.5px] text-gray-600 mt-1">Dondaicha, Dist. Dhule, Maharashtra &nbsp;<span className="text-gray-400">|</span>&nbsp; Est. 1929</p>
                        </div>
                    </div>

                    {/* Controls */}
                    <div className="flex items-center gap-5 w-full lg:w-auto justify-between lg:justify-end mt-4 lg:mt-0">
                        <div className="hidden lg:flex items-center gap-2 cursor-pointer border border-gray-100 px-3 py-1.5 rounded bg-gray-50/50">
                            <span className="text-xs text-gray-500 font-medium">Academic Year</span>
                            <span className="text-sm font-semibold text-gray-800">2026–27</span>
                            <ChevronDown size={14} className="text-gray-500" />
                        </div>

                        <div className="flex items-center gap-3">
                            <Link to="/login" className="sdp-btn-outline">
                                <User size={16} /> Login
                            </Link>
                            <Link to={isAuthenticated && user ? `/${user.role}/dashboard` : "/login"}
                                className="sdp-btn-primary-solid hidden xs:block">
                                Student Portal
                            </Link>
                        </div>
                        <button className="lg:hidden" onClick={() => setMobileMenuOpen(true)}>
                            <Menu size={24} className="text-gray-800" />
                        </button>
                    </div>
                </div>

                {/* Main Nav */}
                <div className="sdp-public-mainnav hidden lg:block">
                    <div className="sdp-public-mainnav-inner">
                        {NAV_LINKS.map((nav, idx) => (
                            nav.real ? (
                                <Link key={idx} to={nav.path} className={`sdp-navItem ${location.pathname === nav.path ? 'active' : ''}`}>
                                    {nav.icon && <HomeIcon size={16} className="mb-[2px]" />}
                                    {nav.label}
                                </Link>
                            ) : (
                                <span key={idx} className="sdp-navItem opacity-80" title="Coming soon">
                                    {nav.label} {nav.dropdown && <ChevronDown size={14} className="opacity-60" />}
                                </span>
                            )
                        ))}
                    </div>
                </div>
            </header>

            <main className="flex-1">
                <Outlet />
            </main>

            {/* Footer */}
            <footer className="sdp-footer">
                <div className="sdp-footer-grid mb-12">
                    <div>
                        <div className="flex items-center gap-3 mb-6">
                            <div className="w-10 h-10 rounded-full border border-gray-600 flex items-center justify-center shrink-0">
                                <svg className="w-6 h-6 text-gray-300" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                                    <circle cx="12" cy="12" r="10"></circle>
                                </svg>
                            </div>
                            <h2 className="text-[15px] font-bold leading-snug">
                                Raul Daultsinhji Multipurpose<br />High School &amp; Jr. College of Science
                            </h2>
                        </div>
                        <p className="text-[13px] opacity-75 mb-6 leading-relaxed">
                            Dondaicha, Dist. Dhule, Maharashtra<br />Est. 1929
                        </p>
                        <div className="flex gap-4">
                            <a href="#" className="opacity-70 hover:opacity-100 transition-opacity">
                                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z"></path></svg>
                            </a>
                            <a href="#" className="opacity-70 hover:opacity-100 transition-opacity">
                                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect x="2" y="2" width="20" height="20" rx="5" ry="5"></rect><path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"></path><line x1="17.5" y1="6.5" x2="17.51" y2="6.5"></line></svg>
                            </a>
                            <a href="#" className="opacity-70 hover:opacity-100 transition-opacity">
                                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M22.54 6.42a2.78 2.78 0 0 0-1.94-2C18.88 4 12 4 12 4s-6.88 0-8.6.46a2.78 2.78 0 0 0-1.94 2A29 29 0 0 0 1 11.75a29 29 0 0 0 .46 5.33A2.78 2.78 0 0 0 3.4 19c1.72.46 8.6.46 8.6.46s6.88 0 8.6-.46a2.78 2.78 0 0 0 1.94-2 29 29 0 0 0 .46-5.25 29 29 0 0 0-.46-5.33z"></path><polygon points="9.75 15.02 15.5 11.75 9.75 8.48 9.75 15.02"></polygon></svg>
                            </a>
                        </div>
                    </div>

                    <div>
                        <h3 className="font-semibold mb-5 text-[14px]">Quick Links</h3>
                        <ul className="space-y-3 text-[13px] opacity-75 flex flex-col">
                            <Link to="/" className="hover:text-white transition-colors">Home</Link>
                            <a href="#" className="hover:text-white transition-colors">About Us</a>
                            <a href="#" className="hover:text-white transition-colors">Admissions</a>
                            <a href="#" className="hover:text-white transition-colors">Academics</a>
                            <a href="#" className="hover:text-white transition-colors">Students</a>
                        </ul>
                    </div>

                    <div>
                        <h3 className="font-semibold mb-5 text-[14px]">Important Links</h3>
                        <ul className="space-y-3 text-[13px] opacity-75 flex flex-col">
                            <a href="#" className="hover:text-white transition-colors">Academic Calendar</a>
                            <a href="#" className="hover:text-white transition-colors">Fee Structure</a>
                            <a href="#" className="hover:text-white transition-colors">Downloads</a>
                            <a href="#" className="hover:text-white transition-colors">Exam Timetable</a>
                            <a href="#" className="hover:text-white transition-colors">Results</a>
                        </ul>
                    </div>

                    <div>
                        <h3 className="font-semibold mb-5 text-[14px]">Contact Us</h3>
                        <ul className="space-y-4 text-[13px] opacity-75">
                            <li className="flex items-start gap-3">
                                <MapPin size={16} className="shrink-0 mt-0.5" />
                                <span>Dondaicha, Dist. Dhule,<br />Maharashtra - 425408</span>
                            </li>
                            <li className="flex items-center gap-3">
                                <Phone size={16} className="shrink-0" />
                                <span>(02566) 244 123</span>
                            </li>
                            <li className="flex items-center gap-3">
                                <Mail size={16} className="shrink-0" />
                                <span>rdmpcollege@gmail.com</span>
                            </li>
                        </ul>
                    </div>
                </div>

                <div className="max-w-[1300px] mx-auto border-t border-white/10 pt-6 pb-2 flex flex-col md:flex-row justify-between items-center text-[12px] opacity-50">
                    <p>© 2026 Raul Daultsinhji Multipurpose High School &amp; Jr. College of Science. All Rights Reserved.</p>
                    <p className="mt-2 md:mt-0 flex items-center gap-1">Designed &amp; Developed with <span className="text-red-400">♥</span></p>
                </div>
            </footer>
        </div>
    );
}
