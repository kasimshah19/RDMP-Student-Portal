import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import {
    ArrowRight,
    GraduationCap,
    BookOpen,
    Users,
    MonitorCog,
    Eye,
    Target,
    MapPin,
    Calendar,
    Clock,
    FileText,
    Beaker,
    Microscope,
    Laptop,
    Trophy,
    Award
} from 'lucide-react';
import api from '../../utils/api';

const STUDENT_ACHIEVEMENTS = [
    { rank: 'gold', name: 'Riya Sharma', class: '12th Science', detail: '1st in State Physics Olympiad' },
    { rank: 'silver', name: 'Aman Patel', class: '11th Science', detail: 'National Debate Championship - Finalist' },
    { rank: 'bronze', name: 'Kavya Desai', class: '12th Arts', detail: 'State Level Athletics - 100m Sprint' }
];

const GROUP_ACHIEVEMENTS = {
    eventName: 'Annual Science Exhibition 2025',
    result: 'Best Innovation Trophy'
};

const UPCOMING_EVENTS = [
    { date: 'MAY 20', title: 'Annual Science Fair', time: '10:00 AM', venue: 'Main Auditorium' },
    { date: 'JUN 05', title: 'Environment Day Plantation', time: '08:30 AM', venue: 'College Campus' },
    { date: 'JUL 12', title: 'Freshers Orientation', time: '09:00 AM', venue: 'Main Auditorium' }
];

export default function Home() {
    const [stats, setStats] = useState({
        totalStudents: 0,
        totalTeachers: 0,
        totalClasses: 0,
        upcomingExams: 0,
        attendancePercentage: 0
    });
    const [notices, setNotices] = useState([]);
    const [loadingStats, setLoadingStats] = useState(true);

    useEffect(() => {
        const fetchData = async () => {
            try {
                // Fetch public stats
                const statsRes = await api.get('/public/stats');
                if (statsRes.data?.success) {
                    setStats(statsRes.data.data);
                }
            } catch (err) {
                console.error('Failed to fetch public stats', err);
            } finally {
                setLoadingStats(false);
            }

            try {
                // Fetch notices (top 4 for public)
                const noticesRes = await api.get('/notices');
                if (noticesRes.data?.success) {
                    // Filter or just slice if they are all public. Assume top 4 for now.
                    setNotices(noticesRes.data.data.slice(0, 4));
                }
            } catch (err) {
                console.error('Failed to fetch notices', err);
            }
        };
        fetchData();
    }, []);

    return (
        <div className="w-full">
            <style>{`
                .home-accent-purple { background: #F3E8FF; color: #6B21A8; }
                .home-accent-blue { background: var(--info-soft); color: var(--info-text); }
                .home-accent-green { background: var(--success-soft); color: var(--success-text); }
                .home-accent-brass { background: #FDF6E3; color: var(--brass); }

                .gallery-scroll::-webkit-scrollbar { display: none; }
                .gallery-scroll { scrollbar-width: none; }
            `}</style>

            {/* 3. Hero */}
            <section className="max-w-[1280px] mx-auto px-6 py-12 lg:py-20 grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-8 items-center">
                <div className="flex flex-col items-start">
                    <span className="sdp-eyebrow" style={{ color: 'var(--brass)' }}>Welcome to our college</span>
                    <h1 className="sdp-font-display text-4xl lg:text-5xl font-bold mt-4 mb-6 leading-[1.15]" style={{ color: 'var(--navy)' }}>
                        Empowering Education, <br className="hidden lg:block" />
                        Enriching Lives Since 1929
                    </h1>
                    <p className="text-base mb-8 opacity-80 leading-relaxed max-w-lg">
                        Raul Daultsinhji Multipurpose High School & Jr. College of Science is committed to fostering academic excellence, innovation, and character building. Step into a campus that prepares you for tomorrow's challenges.
                    </p>
                    <div className="flex flex-wrap items-center gap-4">
                        <a href="#about" className="sdp-btn-primary px-6 py-3 text-base">About Our College</a>
                        <Link to="#" className="sdp-btn-outline px-6 py-3 text-base pointer-events-none opacity-50" title="Coming soon">Admission Information</Link>
                    </div>
                </div>
                <div className="relative">
                    <img
                        src="https://images.unsplash.com/photo-1541339907198-e08756dedf3f?ixlib=rb-4.0.3&auto=format&fit=crop&w=1200&q=80"
                        alt="College Campus"
                        className="w-full h-auto rounded-2xl object-cover shadow-xl aspect-[4/3] lg:aspect-square"
                        loading="lazy"
                    />
                </div>
            </section>

            {/* 4. Role Cards + Latest Notices */}
            <section className="bg-white border-y border-mist">
                <div className="max-w-[1280px] mx-auto grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 divide-y md:divide-y-0 lg:divide-x divide-mist">

                    <div className="p-8 flex flex-col items-start hover:bg-cloud transition-colors">
                        <div className="w-12 h-12 rounded-full home-accent-blue flex items-center justify-center mb-5">
                            <GraduationCap size={24} />
                        </div>
                        <h3 className="font-semibold text-lg mb-2">For Students</h3>
                        <p className="text-sm opacity-70 mb-5 leading-relaxed flex-1">Access attendance, timetable, results, and e-learning resources securely.</p>
                        <Link to="/login" className="text-sm font-semibold flex items-center gap-1 text-[var(--info-text)] group">
                            Student Login <ArrowRight size={14} className="group-hover:translate-x-1 transition-transform" />
                        </Link>
                    </div>

                    <div className="p-8 flex flex-col items-start hover:bg-cloud transition-colors">
                        <div className="w-12 h-12 rounded-full home-accent-green flex items-center justify-center mb-5">
                            <BookOpen size={24} />
                        </div>
                        <h3 className="font-semibold text-lg mb-2">For Teachers</h3>
                        <p className="text-sm opacity-70 mb-5 leading-relaxed flex-1">Manage classes, mark attendance, enter marks, and track student progress.</p>
                        <Link to="/login" className="text-sm font-semibold flex items-center gap-1 text-[var(--success-text)] group">
                            Teacher Login <ArrowRight size={14} className="group-hover:translate-x-1 transition-transform" />
                        </Link>
                    </div>

                    <div className="p-8 flex flex-col items-start hover:bg-cloud transition-colors">
                        <div className="w-12 h-12 rounded-full home-accent-purple flex items-center justify-center mb-5">
                            <Users size={24} />
                        </div>
                        <h3 className="font-semibold text-lg mb-2">Office Staff</h3>
                        <p className="text-sm opacity-70 mb-5 leading-relaxed flex-1">Streamline admissions, fee collection, document verification, and records.</p>
                        <Link to="/login" className="text-sm font-semibold flex items-center gap-1 text-purple-700 group">
                            Staff Login <ArrowRight size={14} className="group-hover:translate-x-1 transition-transform" />
                        </Link>
                    </div>

                    <div className="p-8 flex flex-col items-start hover:bg-cloud transition-colors">
                        <div className="w-12 h-12 rounded-full home-accent-brass flex items-center justify-center mb-5">
                            <MonitorCog size={24} />
                        </div>
                        <h3 className="font-semibold text-lg mb-2">Administrators</h3>
                        <p className="text-sm opacity-70 mb-5 leading-relaxed flex-1">Oversee institution operations, analytical reports, and system configurations.</p>
                        <Link to="/login" className="text-sm font-semibold flex items-center gap-1 text-[var(--brass)] group">
                            Admin Login <ArrowRight size={14} className="group-hover:translate-x-1 transition-transform" />
                        </Link>
                    </div>

                    <div className="p-8 flex flex-col bg-cloud/50">
                        <div className="flex justify-between items-center mb-6">
                            <h3 className="font-semibold text-lg whitespace-nowrap">Latest Notices</h3>
                            <Link to="/notices" className="text-[11px] font-bold text-[var(--navy)] uppercase tracking-wider hover:underline flex-shrink-0">View All</Link>
                        </div>
                        <div className="flex-1 flex flex-col gap-4">
                            {notices.length > 0 ? notices.map(notice => (
                                <Link to="/notices" key={notice._id} className="block group">
                                    <p className="text-sm font-medium leading-tight group-hover:text-[var(--navy)]">{notice.title}</p>
                                    <span className="text-[11px] text-[var(--slate)] mt-1.5 block">
                                        {new Date(notice.createdAt).toLocaleDateString('en-GB', { day: '2-digit', month: 'short', year: 'numeric' })}
                                    </span>
                                </Link>
                            )) : (
                                <p className="text-sm text-slate opacity-70">No latest notices</p>
                            )}
                        </div>
                    </div>
                </div>
            </section>

            {/* 5. Stats band */}
            <section className="bg-navy text-white text-center">
                <div className="max-w-[1280px] mx-auto px-6 py-12 lg:py-16 grid grid-cols-2 lg:grid-cols-5 gap-8 lg:gap-4 divide-x-0 lg:divide-x divide-white/10">

                    <div className="flex flex-col items-center">
                        {loadingStats ? (
                            <div className="w-16 h-8 bg-white/20 rounded animate-pulse mb-3" />
                        ) : (
                            <span className="sdp-data-xl text-4xl text-white mb-2">{stats.totalStudents || 0}</span>
                        )}
                        <span className="text-xs uppercase tracking-wider font-semibold opacity-70">Total Students</span>
                    </div>

                    <div className="flex flex-col items-center">
                        {loadingStats ? (
                            <div className="w-16 h-8 bg-white/20 rounded animate-pulse mb-3" />
                        ) : (
                            <span className="sdp-data-xl text-4xl text-white mb-2">{stats.totalTeachers || 0}</span>
                        )}
                        <span className="text-xs uppercase tracking-wider font-semibold opacity-70">Expert Teachers</span>
                    </div>

                    <div className="flex flex-col items-center">
                        {loadingStats ? (
                            <div className="w-16 h-8 bg-white/20 rounded animate-pulse mb-3" />
                        ) : (
                            <span className="sdp-data-xl text-4xl text-white mb-2">{stats.totalClasses || 0}</span>
                        )}
                        <span className="text-xs uppercase tracking-wider font-semibold opacity-70">Active Classes</span>
                    </div>

                    <div className="flex flex-col items-center">
                        {loadingStats ? (
                            <div className="w-16 h-8 bg-white/20 rounded animate-pulse mb-3" />
                        ) : (
                            <span className="sdp-data-xl text-4xl text-white mb-2">{stats.attendancePercentage}%</span>
                        )}
                        <span className="text-xs uppercase tracking-wider font-semibold opacity-70">Attendance Today</span>
                    </div>

                    <div className="flex flex-col items-center col-span-2 lg:col-span-1">
                        {loadingStats ? (
                            <div className="w-16 h-8 bg-white/20 rounded animate-pulse mb-3" />
                        ) : (
                            <span className="sdp-data-xl text-4xl text-white mb-2">{stats.upcomingExams || 0}</span>
                        )}
                        <span className="text-xs uppercase tracking-wider font-semibold opacity-70">Upcoming Exams</span>
                    </div>

                </div>
            </section>

            {/* 6. About Our College */}
            <section id="about" className="py-20 px-6">
                <div className="max-w-[1280px] mx-auto grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
                    <div className="col-span-1 lg:col-span-5 flex flex-col items-start order-1 lg:order-1">
                        <span className="sdp-eyebrow text-brass mb-3">About Our College</span>
                        <h2 className="sdp-font-display text-3xl font-bold mb-6 text-navy">Building Foundations for a Brighter Future</h2>
                        <p className="text-[15px] opacity-80 leading-relaxed max-w-lg mb-8">
                            Since 1929, RDMP High School & Jr. College of Science has transformed the educational landscape in Dhule district. We offer specialized science and vocational courses designed to nurture curiosity, foster intellectual growth, and equip students with essential life skills.
                        </p>
                        <a href="#" className="sdp-btn-primary">Read More <ArrowRight className="inline ml-2" size={16} /></a>
                    </div>

                    <div className="col-span-1 lg:col-span-4 order-2 lg:order-3">
                        <img
                            src="https://images.unsplash.com/photo-1523050854058-8df90110c9f1?auto=format&fit=crop&q=80&w=800"
                            alt="Students studying"
                            className="w-full h-auto rounded-2xl shadow-lg object-cover aspect-[4/5] lg:aspect-auto lg:h-[400px]"
                            loading="lazy"
                        />
                    </div>

                    <div className="col-span-1 lg:col-span-3 flex flex-col gap-6 order-3 lg:order-2">
                        <div className="sdp-card p-6 flex flex-col gap-3">
                            <div className="w-10 h-10 rounded-full bg-navy/5 flex items-center justify-center text-navy shrink-0"><Eye size={20} /></div>
                            <h3 className="font-semibold text-lg">Our Vision</h3>
                            <p className="text-sm opacity-75">To be a premier institution that ignites young minds and prepares them to lead with integrity in a dynamic global society.</p>
                        </div>
                        <div className="sdp-card p-6 flex flex-col gap-3">
                            <div className="w-10 h-10 rounded-full bg-brass/10 flex items-center justify-center text-brass shrink-0"><Target size={20} /></div>
                            <h3 className="font-semibold text-lg">Our Mission</h3>
                            <p className="text-sm opacity-75">Deliver comprehensive, science-driven education through dedicated faculty, modern infrastructure, and inclusive pedagogy.</p>
                        </div>
                    </div>
                </div>
            </section>

            {/* 7. Announcements / Events / Calendar */}
            <section className="bg-cloud py-20 px-6 border-y border-mist">
                <div className="max-w-[1280px] mx-auto grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">

                    <div className="sdp-card p-6">
                        <div className="flex justify-between items-center mb-6">
                            <h3 className="font-semibold text-lg">Announcements</h3>
                            <Link to="/notices" className="text-[11px] font-bold text-navy uppercase tracking-wider hover:underline">View All</Link>
                        </div>
                        <div className="space-y-5">
                            {notices.map(notice => (
                                <div key={notice._id} className="flex gap-4 items-start">
                                    <div className="mt-0.5"><FileText size={18} className="text-brass" /></div>
                                    <div className="flex-1">
                                        <h4 className="text-sm font-semibold leading-tight line-clamp-1 mb-1">{notice.title}</h4>
                                        <p className="text-xs opacity-75 line-clamp-1">{notice.content}</p>
                                    </div>
                                    <div className="text-[11px] opacity-60 font-medium whitespace-nowrap pt-0.5">
                                        {new Date(notice.createdAt).toLocaleDateString('en-GB', { day: 'numeric', month: 'short' })}
                                    </div>
                                </div>
                            ))}
                            {notices.length === 0 && <p className="text-sm opacity-75">No new announcements at this time.</p>}
                        </div>
                    </div>

                    <div className="sdp-card p-6">
                        <div className="flex justify-between items-center mb-6">
                            <h3 className="font-semibold text-lg">Upcoming Events</h3>
                            <a href="#" className="text-[11px] font-bold text-navy uppercase tracking-wider hover:underline">View All</a>
                        </div>
                        <div className="space-y-6">
                            {UPCOMING_EVENTS.map((event, idx) => (
                                <div key={idx} className="flex gap-5 items-start">
                                    <div className="w-12 h-14 shrink-0 bg-info-soft rounded-lg border border-mist flex flex-col items-center justify-center">
                                        <span className="text-[10px] uppercase font-bold text-info-text tracking-widest">{event.date.split(' ')[0]}</span>
                                        <span className="text-base font-bold text-navy leading-none mt-1">{event.date.split(' ')[1]}</span>
                                    </div>
                                    <div>
                                        <h4 className="text-sm font-semibold mb-1.5">{event.title}</h4>
                                        <div className="flex gap-3 text-xs opacity-70 font-medium">
                                            <span className="flex items-center gap-1"><Clock size={12} /> {event.time}</span>
                                            <span className="flex items-center gap-1"><MapPin size={12} /> {event.venue}</span>
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>

                    <div className="flex flex-col gap-6">
                        <div className="bg-navy text-white p-6 rounded-xl relative overflow-hidden h-[180px] flex flex-col justify-end">
                            <div className="absolute top-4 right-4 opacity-10"><Calendar size={100} /></div>
                            <div className="relative z-10 w-full h-full flex flex-col justify-between">
                                <div>
                                    <div className="w-10 h-10 rounded-full bg-white/10 flex flex-center items-center justify-center mb-1"><Calendar size={20} /></div>
                                </div>
                                <div>
                                    <h3 className="font-semibold text-lg">Academic Calendar</h3>
                                    <a href="#" className="text-sm mt-1 inline-block opacity-80 hover:opacity-100 font-medium">View Calendar &rarr;</a>
                                </div>
                            </div>
                        </div>

                        <div className="bg-success-soft border border-[#CFE7D9] text-success-text p-6 rounded-xl flex-1 flex flex-col justify-between relative">
                            <div>
                                <span className="sdp-badge bg-success text-white mb-4">Now Open</span>
                                <h3 className="font-bold text-lg leading-tight mb-2">Online Admission<br />2026-27</h3>
                            </div>
                            <Link to="#" className="text-sm font-bold flex items-center gap-1 opacity-90 hover:opacity-100 pointer-events-none" title="Opening Shortly">
                                Apply Online <ArrowRight size={16} />
                            </Link>
                        </div>
                    </div>

                </div>
            </section>

            {/* 8. Our Facilities */}
            <section className="py-20 px-6">
                <div className="max-w-[1280px] mx-auto">
                    <div className="text-center mb-12">
                        <span className="sdp-eyebrow text-slate mb-2">Campus Infrastructure</span>
                        <h2 className="sdp-font-display text-3xl font-bold text-navy">Our Facilities</h2>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-6">
                        {[
                            { icon: Laptop, title: 'Smart Classrooms', desc: 'Interactive boards and digital learning tools.' },
                            { icon: Microscope, title: 'Science Labs', desc: 'Fully equipped Physics, Chemistry & Bio labs.' },
                            { icon: BookOpen, title: 'Library', desc: 'Vast collection of books, journals, and e-resources.' },
                            { icon: MonitorCog, title: 'Computer Lab', desc: 'High-speed internet and latest software suites.' },
                            { icon: Trophy, title: 'Sports & Arts', desc: 'Playgrounds and spaces for extracurricular excellence.' }
                        ].map((fac, i) => (
                            <div key={i} className="text-center p-6 sdp-card hover:-translate-y-1 transition-transform">
                                <div className="w-14 h-14 mx-auto bg-navy text-white rounded-full flex items-center justify-center mb-4">
                                    <fac.icon size={26} strokeWidth={1.5} />
                                </div>
                                <h3 className="font-semibold text-[15px] mb-2">{fac.title}</h3>
                                <p className="text-xs opacity-75">{fac.desc}</p>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* 9. Student Achievements & 10. Campus Life */}
            <section className="py-20 px-6 bg-cloud border-t border-mist">
                <div className="max-w-[1280px] mx-auto grid grid-cols-1 lg:grid-cols-2 gap-16">

                    {/* Achievements */}
                    <div>
                        <div className="flex justify-between items-end mb-8">
                            <div>
                                <span className="sdp-eyebrow text-slate mb-2 block">Wall of Fame</span>
                                <h2 className="sdp-font-display text-2xl font-bold text-navy">Student Achievements</h2>
                            </div>
                            <a href="#" className="text-[11px] font-bold text-navy uppercase tracking-wider hover:underline mb-1">View All</a>
                        </div>

                        <div className="flex flex-col gap-4">
                            {STUDENT_ACHIEVEMENTS.map((ach, i) => (
                                <div key={i} className="sdp-card p-4 flex items-center gap-4 relative overflow-hidden">
                                    <div className="absolute top-0 right-0 p-2 opacity-5">
                                        <Award size={64} />
                                    </div>
                                    <div className="w-14 h-14 rounded-full bg-slate flex items-center justify-center shrink-0 border-2 border-white shadow-sm overflow-hidden relative">
                                        {/* Placeholder Avatar */}
                                        <div className="w-full h-full bg-[#DFE3EA] flex items-center justify-center text-slate font-bold text-lg">{ach.name[0]}</div>
                                        <div className={`absolute bottom-0 right-0 w-4 h-4 rounded-full border-2 border-white
                                            ${ach.rank === 'gold' ? 'bg-[#FFD700]' : ach.rank === 'silver' ? 'bg-[#C0C0C0]' : 'bg-[#CD7F32]'}`}
                                        />
                                    </div>
                                    <div className="z-10">
                                        <h4 className="font-semibold text-[15px] leading-tight">{ach.name}</h4>
                                        <span className="text-[11px] text-slate font-medium uppercase tracking-wider">{ach.class}</span>
                                        <p className="text-sm font-medium mt-1">{ach.detail}</p>
                                    </div>
                                </div>
                            ))}
                            <div className="sdp-card p-4 flex items-center gap-4 bg-navy text-white border-navy mt-2">
                                <div className="w-14 h-14 rounded-full bg-white/10 flex items-center justify-center shrink-0">
                                    <Trophy size={24} className="text-brass" />
                                </div>
                                <div>
                                    <h4 className="font-semibold text-[15px] leading-tight text-brass">Group Achievement</h4>
                                    <span className="text-[11px] opacity-70 font-medium uppercase tracking-wider">{GROUP_ACHIEVEMENTS.eventName}</span>
                                    <p className="text-sm font-bold mt-1">{GROUP_ACHIEVEMENTS.result}</p>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Gallery */}
                    <div>
                        <div className="flex justify-between items-end mb-8">
                            <div>
                                <span className="sdp-eyebrow text-slate mb-2 block">Moments</span>
                                <h2 className="sdp-font-display text-2xl font-bold text-navy">Campus Life</h2>
                            </div>
                            <a href="#" className="text-[11px] font-bold text-navy uppercase tracking-wider hover:underline mb-1">View Gallery</a>
                        </div>

                        <div className="flex gap-4 overflow-x-auto gallery-scroll pb-4 -mx-6 px-6 lg:mx-0 lg:px-0 lg:grid lg:grid-cols-2 lg:gap-4 snap-x">
                            {[
                                "https://images.unsplash.com/photo-1577896851231-70ef18881754?auto=format&fit=crop&w=600&q=80",
                                "https://images.unsplash.com/photo-1627556592933-ffe99c1c9cd8?auto=format&fit=crop&w=600&q=80",
                                "https://images.unsplash.com/photo-1519452327705-59b3defcda93?auto=format&fit=crop&w=600&q=80",
                                "https://images.unsplash.com/photo-1509062522246-3755977927d7?auto=format&fit=crop&w=600&q=80"
                            ].map((src, i) => (
                                <div key={i} className="w-[260px] lg:w-full shrink-0 snap-center rounded-xl overflow-hidden aspect-[4/3] relative group shadow-sm border border-mist">
                                    <div className="absolute inset-0 bg-navy/20 group-hover:bg-transparent transition-colors z-10" />
                                    <img src={src} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" alt="Campus Life" loading="lazy" />
                                </div>
                            ))}
                        </div>
                    </div>

                </div>
            </section>

            {/* 11. Join CTA banner */}
            <section className="bg-navy-deep py-20 px-6 text-center text-white">
                <div className="max-w-2xl mx-auto flex flex-col items-center">
                    <div className="w-16 h-16 rounded-full bg-brass/20 flex items-center justify-center mb-6">
                        <GraduationCap size={32} className="text-brass" />
                    </div>
                    <h2 className="sdp-font-display text-3xl md:text-4xl font-bold mb-4">Join Our College Family</h2>
                    <p className="opacity-80 mb-8 max-w-lg mx-auto text-base">
                        Take the first step towards a bright academic future. Applications for the upcoming academic session are now being accepted.
                    </p>
                    <Link to="#" className="bg-brass hover:bg-[#b98748] transition-colors text-navy font-bold px-8 py-3.5 rounded-lg flex items-center gap-2 pointer-events-none opacity-50" title="Coming soon">
                        Apply Now <ArrowRight size={18} />
                    </Link>
                </div>
            </section>

        </div>
    );
}
