import { useState, useContext, useEffect } from "react";
import { AuthContext } from "../../context/AuthContext";
import { Outlet, Link, useLocation } from "react-router-dom";
import {
    LayoutDashboard,
    User,
    ClipboardCheck,
    FileText,
    Award,
    Clock,
    FolderOpen,
    Megaphone,
    Wallet,
    BookOpen,
    MessageSquare,
    CalendarClock,
    Settings,
    Menu,
    X,
    Bell,
    ChevronDown
} from "lucide-react";

const NAV_ITEMS = [
    { label: "Dashboard", icon: LayoutDashboard, path: "/student/dashboard" },
    { label: "My Profile", icon: User, path: "/student/profile" },
    { label: "Attendance", icon: ClipboardCheck, path: "/student/attendance" },
    { label: "Examinations", icon: FileText, path: "/student/examinations" },
    { label: "Marks & Results", icon: Award, path: "/student/results" },
    { label: "Time Table", icon: Clock, path: "/student/timetable" },
    { label: "Documents", icon: FolderOpen, path: "/student/documents" },
    { label: "Notices", icon: Megaphone, path: "/student/notices" },
    { label: "Fees (if any)", icon: Wallet, path: "/student/fees" },
    { label: "Library", icon: BookOpen, path: "/student/library" },
    { label: "Feedback", icon: MessageSquare, path: "/student/feedback" },
    { label: "Leave Application", icon: CalendarClock, path: "/student/leave" },
    { label: "Settings", icon: Settings, path: "/student/settings" },
];

function initials(name) {
    if (!name) return "S";
    return name
        .split(" ")
        .map((p) => p[0])
        .slice(0, 2)
        .join("")
        .toUpperCase();
}

export default function StudentLayout() {
    const [sidebarOpen, setSidebarOpen] = useState(false);
    const { user, logout } = useContext(AuthContext);
    const location = useLocation();

    // Close sidebar on route change
    useEffect(() => {
        setSidebarOpen(false);
    }, [location.pathname]);

    const STUDENT = {
        name: user?.name || "Rahul Sanjay Patil",
        className: "Class 11th (Science)",
    };

    const getPageTitle = () => {
        const item = NAV_ITEMS.find((n) => n.path === location.pathname);
        return item ? item.label : "Student Portal";
    };

    return (
        <div className="sdp-root">
            <style>{`
        @import url('https://fonts.googleapis.com/css2?family=IBM+Plex+Serif:wght@500;600;700&family=IBM+Plex+Sans:wght@400;500;600;700&family=IBM+Plex+Mono:wght@400;500&display=swap');

        .sdp-root {
          --navy: #1E2A47;
          --navy-deep: #14213A;
          --brass: #A9793D;
          --cloud: #F4F6F9;
          --paper: #FFFFFF;
          --mist: #DFE3EA;
          --slate: #5B6478;
          --ink: #1B2233;
          --success: #237A50;
          --success-soft: #E6F4EC;
          --success-text: #1D5C3E;
          --warning-soft: #FBEEDB;
          --warning-text: #8A5313;
          --danger: #A23131;
          --danger-soft: #FBEAEA;
          --danger-text: #7E2727;
          --info: #275E82;
          --info-soft: #E7F1F7;
          --info-text: #1F4C67;

          font-family: 'IBM Plex Sans', sans-serif;
          color: var(--ink);
          background: var(--cloud);
          min-height: 100vh;
          position: relative;
        }
        .sdp-root * { box-sizing: border-box; }
        .sdp-font-display { font-family: 'IBM Plex Serif', serif; }
        .sdp-font-mono { font-family: 'IBM Plex Mono', monospace; font-variant-numeric: tabular-nums; }

        .sdp-eyebrow {
          font-size: 11px;
          font-weight: 500;
          letter-spacing: 0.04em;
          text-transform: uppercase;
          color: var(--slate);
        }
        .sdp-data-xl { font-family: 'IBM Plex Mono', monospace; font-size: 26px; font-weight: 500; color: var(--navy); }

        .sdp-card {
          background: var(--paper);
          border: 1px solid var(--mist);
          border-radius: 12px;
        }

        .sdp-sidebar {
          background: var(--navy);
          width: 264px;
          position: fixed;
          top: 0; left: 0; bottom: 0;
          display: flex;
          flex-direction: column;
          transform: translateX(-100%);
          transition: transform 200ms ease-out;
          z-index: 40;
        }
        .sdp-sidebar.open { transform: translateX(0); }
        @media (min-width: 1024px) {
          .sdp-sidebar { transform: translateX(0); }
        }

        .sdp-overlay {
          position: fixed; inset: 0; background: rgba(20,33,58,0.5);
          z-index: 30;
        }
        @media (min-width: 1024px) { .sdp-overlay { display: none; } }

        .sdp-navlink {
          display: flex; align-items: center; gap: 12px;
          padding: 10px 20px;
          color: #C7CEDD;
          font-size: 14px;
          font-weight: 500;
          border-left: 3px solid transparent;
          cursor: pointer;
          transition: background 150ms ease-out, color 150ms ease-out;
        }
        .sdp-navlink:hover { background: rgba(255,255,255,0.06); color: #FFFFFF; }
        .sdp-navlink.active {
          background: rgba(255,255,255,0.08);
          border-left-color: var(--brass);
          color: #FFFFFF;
        }

        .sdp-main { min-height: 100vh; display: flex; flex-direction: column; }
        @media (min-width: 1024px) { .sdp-main { margin-left: 264px; } }

        .sdp-topbar {
          position: sticky; top: 0; z-index: 20;
          background: var(--paper);
          border-bottom: 1px solid var(--mist);
        }

        .sdp-btn-primary {
          background: var(--navy); color: #fff; border: none;
          border-radius: 8px; padding: 9px 16px; font-size: 14px; font-weight: 500;
          cursor: pointer; transition: background 150ms ease-out;
        }
        .sdp-btn-primary:hover { background: var(--navy-deep); }

        .sdp-badge {
          display: inline-flex; align-items: center; gap: 6px;
          padding: 3px 10px; border-radius: 999px; font-size: 11px; font-weight: 600;
          text-transform: uppercase; letter-spacing: 0.03em;
        }

        .sdp-progress-track { background: var(--mist); border-radius: 999px; height: 7px; overflow: hidden; }
        .sdp-progress-fill { background: var(--success); height: 100%; border-radius: 999px; }

        .sdp-table th {
          text-align: left; font-size: 11px; font-weight: 600; text-transform: uppercase;
          letter-spacing: 0.03em; color: var(--slate); background: var(--cloud);
          padding: 10px 14px; white-space: nowrap;
        }
        .sdp-table td { padding: 10px 14px; font-size: 14px; border-top: 1px solid var(--mist); white-space: nowrap; }
        .sdp-table tr:nth-child(even) td { background: var(--cloud); }

        .sdp-cal-cell {
          aspect-ratio: 1; display: flex; align-items: center; justify-content: center;
          font-size: 12.5px; border-radius: 8px; color: var(--ink);
        }
        .sdp-cal-cell.muted { color: #B8BFCC; }
        .sdp-cal-cell.today { background: var(--navy); color: #fff; font-weight: 600; }
      `}</style>

            {sidebarOpen && (
                <div className="sdp-overlay" onClick={() => setSidebarOpen(false)} />
            )}

            {/* Sidebar */}
            <aside className={`sdp-sidebar ${sidebarOpen ? "open" : ""}`}>
                <div className="flex items-center justify-between px-5 pt-6 pb-5" style={{ borderBottom: "1px solid rgba(255,255,255,0.1)" }}>
                    <div className="flex items-center gap-3">
                        <div
                            className="sdp-font-display flex items-center justify-center rounded-full shrink-0"
                            style={{ width: 42, height: 42, background: "var(--brass)", color: "var(--navy)", fontWeight: 700, fontSize: 15 }}
                        >
                            RD
                        </div>
                        <div style={{ color: "#fff" }}>
                            <p className="sdp-font-display" style={{ fontSize: 13.5, fontWeight: 600, lineHeight: 1.25 }}>
                                Raul Daultsinhji Multipurpose High School &amp; Jr. College of Science
                            </p>
                            <p style={{ fontSize: 11, color: "#9AA4BA", marginTop: 4 }}>Dondaicha, Dist. Dhule · Est. 1929</p>
                        </div>
                    </div>
                    <button className="lg:hidden" style={{ color: "#fff" }} onClick={() => setSidebarOpen(false)} aria-label="Close menu">
                        <X size={20} />
                    </button>
                </div>

                <nav className="flex-1 overflow-y-auto py-3">
                    {NAV_ITEMS.map(({ label, icon: Icon, path }) => (
                        <Link
                            to={path}
                            key={label}
                            className={`sdp-navlink ${location.pathname === path ? "active" : ""}`}
                        >
                            <Icon size={17} />
                            <span>{label}</span>
                        </Link>
                    ))}
                </nav>

                <div className="m-4 p-4 rounded-xl" style={{ background: "rgba(255,255,255,0.06)" }}>
                    <p style={{ color: "#fff", fontWeight: 600, fontSize: 13.5 }}>Need Help?</p>
                    <p style={{ color: "#9AA4BA", fontSize: 12.5, marginTop: 4, lineHeight: 1.5 }}>
                        If you have any questions or need support, feel free to contact us.
                    </p>
                    <button onClick={logout} className="sdp-btn-primary mt-3 w-full" style={{ background: "transparent", border: "1px solid rgba(255,255,255,0.2)", color: "#fff" }}>
                        Logout safely
                    </button>
                </div>
            </aside>

            {/* Main Container */}
            <div className="sdp-main min-h-screen flex flex-col">
                {/* Topbar */}
                <header className="sdp-topbar">
                    <div className="flex items-center justify-between gap-4 px-4 lg:px-8 py-3.5">
                        <div className="flex items-center gap-3">
                            <button className="lg:hidden" onClick={() => setSidebarOpen(true)} aria-label="Open menu">
                                <Menu size={22} color="var(--ink)" />
                            </button>
                            <h1 className="sdp-font-display" style={{ fontSize: 20, fontWeight: 600 }}>
                                {getPageTitle()}
                            </h1>
                        </div>

                        <div className="flex items-center gap-3 lg:gap-5">
                            <button
                                className="hidden sm:flex items-center gap-2 rounded-lg"
                                style={{ border: "1px solid var(--mist)", padding: "7px 12px", fontSize: 13, color: "var(--ink)", background: "#fff" }}
                            >
                                <span style={{ color: "var(--slate)", fontSize: 11 }}>Academic Year</span>
                                <span style={{ fontWeight: 600 }}>2026–27</span>
                                <ChevronDown size={14} color="var(--slate)" />
                            </button>

                            <button className="relative" aria-label="Notifications">
                                <Bell size={20} color="var(--ink)" />
                                <span
                                    className="absolute flex items-center justify-center"
                                    style={{ top: -6, right: -6, width: 16, height: 16, borderRadius: "50%", background: "var(--danger)", color: "#fff", fontSize: 9.5, fontWeight: 700 }}
                                >
                                    3
                                </span>
                            </button>

                            <div className="flex items-center gap-2.5 cursor-pointer">
                                <div
                                    className="flex items-center justify-center rounded-full shrink-0"
                                    style={{ width: 36, height: 36, background: "var(--info-soft)", color: "var(--info-text)", fontWeight: 600, fontSize: 13 }}
                                >
                                    {initials(STUDENT.name)}
                                </div>
                                <div className="hidden sm:block">
                                    <p style={{ fontSize: 13, fontWeight: 600, lineHeight: 1.2 }}>{STUDENT.name}</p>
                                    <p style={{ fontSize: 11.5, color: "var(--slate)" }}>{STUDENT.className}</p>
                                </div>
                                <ChevronDown size={14} color="var(--slate)" className="hidden sm:block" />
                            </div>
                        </div>
                    </div>
                </header>

                {/* Child Pages Outlet */}
                <Outlet />

                {/* Footer */}
                <footer className="text-center mt-auto py-8" style={{ fontSize: 12, color: "var(--slate)" }}>
                    © 2026 Raul Daultsinhji Multipurpose High School &amp; Jr. College of Science. All rights reserved.
                </footer>
            </div>
        </div>
    );
}
