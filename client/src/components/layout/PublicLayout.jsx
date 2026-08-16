import { useState, useContext, useEffect } from "react";
import { AuthContext } from "../../context/AuthContext";
import { Outlet, Link, useLocation } from "react-router-dom";
import {
    Menu,
    X,
    ChevronDown,
    MapPin,
    Phone,
    Mail
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
        { label: "Home", path: "/", real: true },
        { label: "About Us", path: "#" },
        { label: "Admissions", dropdown: true, path: "#" },
        { label: "Academics", dropdown: true, path: "#" },
        { label: "Students", dropdown: true, path: "#" },
        { label: "Notices", path: "/notices", real: true },
        { label: "Gallery", path: "#" },
        { label: "Contact Us", path: "#" }
    ];

    return (
        <div className="sdp-root bg-cloud">
            <style>{`
                /* Reuse SDP typography and colors */
                .sdp-public-header { border-bottom: 2px solid var(--navy); }
                .sdp-public-topnav { background: white; padding: 16px 24px; display: flex; align-items: center; justify-content: space-between; gap: 16px; }
                .sdp-public-mainnav { background: var(--navy); }
                .sdp-public-mainnav-inner { display: flex; align-items: center; justify-content: space-between; padding: 0 24px; max-width: 1280px; margin: 0 auto; height: 50px; }
                
                .sdp-navItem {
                    color: rgba(255,255,255,0.85); font-size: 14px; font-weight: 500; height: 100%;
                    display: flex; align-items: center; padding: 0 16px; border-bottom: 3px solid transparent;
                    transition: color 150ms, border 150ms; cursor: pointer; text-decoration: none;
                }
                .sdp-navItem:hover { color: white; }
                .sdp-navItem.active { color: white; border-bottom-color: var(--brass); background: rgba(255,255,255,0.05); }
                
                .sdp-btn-outline {
                    border: 1px solid var(--navy); color: var(--navy); background: transparent;
                    padding: 8px 16px; border-radius: 6px; font-size: 13.5px; font-weight: 600; cursor: pointer;
                    transition: background 150ms;
                }
                .sdp-btn-outline:hover { background: rgba(30, 42, 71, 0.05); }

                .sdp-mobile-menu {
                    position: fixed; inset: 0; z-index: 50; transform: translateX(-100%);
                    transition: transform 200ms ease-out; display: flex; flex-direction: column;
                }
                .sdp-mobile-menu.open { transform: translateX(0); }
                
                .sdp-footer { background: var(--navy-deep); color: white; padding: 60px 24px 24px; }
                .sdp-footer-grid { max-width: 1280px; margin: 0 auto; display: grid; gap: 40px; grid-template-columns: 1fr; }
                @media (min-width: 768px) { .sdp-footer-grid { grid-template-columns: repeat(2, 1fr); } }
                @media (min-width: 1024px) { .sdp-footer-grid { grid-template-columns: 2fr 1fr 1fr 1fr; } }
            `}</style>

            {/* Mobile Menu Overlay */}
            <div className={`sdp-mobile-menu ${mobileMenuOpen ? 'open' : ''}`}>
                <div className="flex-1 bg-navy text-white p-5">
                    <div className="flex justify-between items-center mb-8">
                        <span className="sdp-font-display text-lg font-bold">RDMP College</span>
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

            <header className="sdp-public-header">
                {/* Top Bar */}
                <div className="sdp-public-topnav flex-col lg:flex-row">
                    {/* Brand */}
                    <div className="flex items-center gap-3">
                        <div className="sdp-font-display flex items-center justify-center rounded-full shrink-0"
                            style={{ width: 46, height: 46, background: "var(--brass)", color: "var(--navy)", fontWeight: 700, fontSize: 16 }}>
                            RD
                        </div>
                        <div>
                            <h1 className="sdp-font-display" style={{ fontSize: 16, fontWeight: 700, color: "var(--navy)", lineHeight: 1.15 }}>
                                Raul Daultsinhji Multipurpose High School <br className="hidden lg:block" /> &amp; Jr. College of Science
                            </h1>
                            <p style={{ fontSize: 12, color: "var(--slate)", marginTop: 2 }}>Dondaicha, Dist. Dhule, Maharashtra · Est. 1929</p>
                        </div>
                    </div>

                    {/* Controls */}
                    <div className="flex items-center gap-4 w-full lg:w-auto justify-between lg:justify-end">
                        <button className="flex items-center gap-2 rounded-lg"
                            style={{ border: "1px solid var(--mist)", padding: "8px 12px", fontSize: 13, background: "#fff" }}>
                            <span style={{ color: "var(--slate)" }}>Academic Year</span>
                            <span style={{ fontWeight: 600 }}>2026–27</span>
                            <ChevronDown size={14} color="var(--slate)" />
                        </button>

                        <div className="hidden lg:flex items-center gap-3">
                            <Link to="/login" className="sdp-btn-outline">Login</Link>
                            <Link to={isAuthenticated && user ? `/${user.role}/dashboard` : "/login"}
                                className="sdp-btn-primary" style={{ textDecoration: 'none', display: 'inline-block' }}>
                                Student Portal
                            </Link>
                        </div>
                        <button className="lg:hidden" onClick={() => setMobileMenuOpen(true)}>
                            <Menu size={24} color="var(--navy)" />
                        </button>
                    </div>
                </div>

                {/* Main Nav */}
                <div className="sdp-public-mainnav hidden lg:block">
                    <div className="sdp-public-mainnav-inner">
                        <nav className="flex items-center h-full">
                            {NAV_LINKS.map((nav, idx) => (
                                nav.real ? (
                                    <Link key={idx} to={nav.path} className={`sdp-navItem ${location.pathname === nav.path ? 'active' : ''}`}>
                                        {nav.label}
                                    </Link>
                                ) : (
                                    <span key={idx} className="sdp-navItem opacity-70" title="Coming soon">
                                        {nav.label} {nav.dropdown && <ChevronDown size={14} className="ml-1 opacity-60" />}
                                    </span>
                                )
                            ))}
                        </nav>
                        <div className="flex gap-2">
                            {/* Optional secondary actions can go here */}
                        </div>
                    </div>
                </div>
            </header>

            <main className="min-h-screen">
                <Outlet />
            </main>

            {/* Footer */}
            <footer className="sdp-footer">
                <div className="sdp-footer-grid mb-12">
                    <div>
                        <div className="flex items-center gap-3 mb-4">
                            <div className="sdp-font-display flex items-center justify-center rounded-full shrink-0"
                                style={{ width: 40, height: 40, background: "var(--brass)", color: "var(--navy)", fontWeight: 700 }}>RD</div>
                            <h2 className="sdp-font-display text-white text-lg font-bold leading-tight">
                                RDMP High School &<br />Jr. College of Science
                            </h2>
                        </div>
                        <p className="text-sm opacity-75 mb-6 leading-relaxed max-w-sm">
                            Empowering education and enriching lives since 1929. Committed to academic excellence and holistic student development.
                        </p>
                        <div className="flex gap-3">
                            <a href="#" className="w-11 h-11 rounded-full bg-white/10 flex flex-col justify-center items-center hover:bg-brass hover:text-navy transition-colors">
                                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z"></path></svg>
                            </a>
                            <a href="#" className="w-11 h-11 rounded-full bg-white/10 flex flex-col justify-center items-center hover:bg-brass hover:text-navy transition-colors">
                                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect x="2" y="2" width="20" height="20" rx="5" ry="5"></rect><path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"></path><line x1="17.5" y1="6.5" x2="17.51" y2="6.5"></line></svg>
                            </a>
                            <a href="#" className="w-11 h-11 rounded-full bg-white/10 flex flex-col justify-center items-center hover:bg-brass hover:text-navy transition-colors">
                                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M22.54 6.42a2.78 2.78 0 0 0-1.94-2C18.88 4 12 4 12 4s-6.88 0-8.6.46a2.78 2.78 0 0 0-1.94 2A29 29 0 0 0 1 11.75a29 29 0 0 0 .46 5.33A2.78 2.78 0 0 0 3.4 19c1.72.46 8.6.46 8.6.46s6.88 0 8.6-.46a2.78 2.78 0 0 0 1.94-2 29 29 0 0 0 .46-5.25 29 29 0 0 0-.46-5.33z"></path><polygon points="9.75 15.02 15.5 11.75 9.75 8.48 9.75 15.02"></polygon></svg>
                            </a>
                        </div>
                    </div>

                    <div>
                        <h3 className="font-semibold mb-4 text-white uppercase tracking-wider text-sm opacity-90">Quick Links</h3>
                        <ul className="space-y-3 text-sm opacity-75 flex flex-col">
                            <Link to="/" className="hover:text-brass transition-colors">Home</Link>
                            <a href="#" className="hover:text-brass transition-colors">About Us</a>
                            <a href="#" className="hover:text-brass transition-colors">Academics</a>
                            <a href="#" className="hover:text-brass transition-colors">Admissions 2026</a>
                            <a href="#" className="hover:text-brass transition-colors">Student Gallery</a>
                        </ul>
                    </div>

                    <div>
                        <h3 className="font-semibold mb-4 text-white uppercase tracking-wider text-sm opacity-90">Important Links</h3>
                        <ul className="space-y-3 text-sm opacity-75 flex flex-col">
                            <Link to="/notices" className="hover:text-brass transition-colors">Notice Board</Link>
                            <a href="#" className="hover:text-brass transition-colors">Academic Calendar</a>
                            <a href="#" className="hover:text-brass transition-colors">Fee Structure</a>
                            <a href="#" className="hover:text-brass transition-colors">Rules & Regulations</a>
                            <Link to="/login" className="hover:text-brass transition-colors">Student Portal Login</Link>
                        </ul>
                    </div>

                    <div>
                        <h3 className="font-semibold mb-4 text-white uppercase tracking-wider text-sm opacity-90">Contact Us</h3>
                        <ul className="space-y-4 text-sm opacity-75">
                            <li className="flex items-start gap-3">
                                <MapPin size={18} className="shrink-0 mt-0.5 text-brass" />
                                <span>Shahada Road, Dondaicha<br />Dist. Dhule, Maharashtra 425408</span>
                            </li>
                            <li className="flex items-center gap-3">
                                <Phone size={18} className="shrink-0 text-brass" />
                                <span>+91 (02566) 244 556</span>
                            </li>
                            <li className="flex items-center gap-3">
                                <Mail size={18} className="shrink-0 text-brass" />
                                <span>info@rdmpcollege.edu.in</span>
                            </li>
                        </ul>
                    </div>
                </div>

                <div className="max-w-[1280px] mx-auto border-t border-white/10 pt-6 flex flex-col md:flex-row justify-between items-center text-xs opacity-60">
                    <p>© {new Date().getFullYear()} RDMP College. All rights reserved.</p>
                    <p className="mt-2 md:mt-0">Designed & Developed with ♥</p>
                </div>
            </footer>
        </div>
    );
}
