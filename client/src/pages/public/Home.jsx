import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import {
    ArrowRight, GraduationCap, Users, User, ShieldCheck,
    Eye, Target, MapPin, Clock, Calendar, FileText, Megaphone,
    Laptop, Beaker, BookOpen, Monitor, Award, Image as ImageIcon,
    ClipboardCheck
} from 'lucide-react';
import api from '../../services/api';

const STUDENT_ACHIEVEMENTS = [
    { rank: '1', name: 'Rahul Patil', class: 'Class 12th (Science)', detail: '1st Rank in District in HSC Board Exam 2024-25', avatar: 'https://api.dicebear.com/7.x/notionists/svg?seed=Rahul' },
    { rank: '2', name: 'Sneha More', class: 'Class 11th (Science)', detail: '2nd Rank in District in HSC Board Exam 2024-25', avatar: 'https://api.dicebear.com/7.x/notionists/svg?seed=Sneha' },
    { rank: '3', name: 'Aditya Patil', class: 'Class 12th (Commerce)', detail: 'Best Performer in Commerce Stream 2024-25', avatar: 'https://api.dicebear.com/7.x/notionists/svg?seed=Aditya' }
];

const UPCOMING_EVENTS = [
    { month: 'MAY', date: '16', title: 'Parent Meeting', time: '11:00 AM - 12:30 PM', venue: 'Seminar Hall' },
    { month: 'MAY', date: '26', title: 'Unit Test 1 Begins', time: '09:00 AM', venue: 'Respective Classrooms' },
    { month: 'JUN', date: '15', title: 'College Reopens', time: '08:00 AM', venue: 'College Campus' }
];

export default function Home() {
    const [stats, setStats] = useState({
        totalStudents: 856,
        totalTeachers: 42,
        totalClasses: 24,
        attendancePercentage: 98,
        upcomingExams: 3
    });
    const [notices, setNotices] = useState([
        { _id: '1', title: 'Admissions Open for Class 11th', createdAt: new Date() },
        { _id: '2', title: 'Unit Test 1 Schedule (11th & 12th)', createdAt: new Date() },
        { _id: '3', title: 'Parent Meeting - 16 May 2026', createdAt: new Date() },
        { _id: '4', title: 'Independence Day Celebration', createdAt: new Date() }
    ]);
    const [loadingStats, setLoadingStats] = useState(true);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const statsRes = await api.get('/public/stats');
                if (statsRes.data?.success) {
                    setStats({
                        totalStudents: statsRes.data.data.totalStudents || 856,
                        totalTeachers: statsRes.data.data.totalTeachers || 42,
                        totalClasses: statsRes.data.data.totalClasses || 24,
                        attendancePercentage: statsRes.data.data.attendancePercentage || 98,
                        upcomingExams: statsRes.data.data.upcomingExams || 3
                    });
                }
            } catch (err) {
                console.error('Failed to fetch stats', err);
            } finally {
                setLoadingStats(false);
            }

            try {
                const noticesRes = await api.get('/public/notices');
                if (noticesRes.data?.success && noticesRes.data.data.length > 0) {
                    setNotices(noticesRes.data.data.slice(0, 4));
                }
            } catch (err) {
                console.error('Failed to fetch notices', err);
            }
        };
        fetchData();
    }, []);

    return (
        <div className="w-full bg-[#f8fafc] font-sans pb-16">
            <style>{`
                .home-accent-blue { background: #E7F0FF; color: #1D4ED8; }
                .home-accent-green { background: #E8F5E9; color: #166534; }
                .home-accent-purple { background: #F3E8FF; color: #6B21A8; }
                .home-accent-orange { background: #FFF7ED; color: #C2410C; }
                
                .glass-card { background: white; border-radius: 12px; box-shadow: 0 4px 20px rgba(0,0,0,0.03); border: 1px solid #f1f5f9; }
                
                .gallery-scroll::-webkit-scrollbar { display: none; }
                .gallery-scroll { scrollbar-width: none; }
            `}</style>

            {/* 1. Hero Section */}
            <section className="relative w-full h-[450px] lg:h-[500px] bg-white overflow-hidden border-b border-gray-100">
                <div className="absolute inset-0 w-full h-full">
                    {/* Background Image on Right */}
                    <div className="absolute right-0 top-0 w-full lg:w-3/4 h-full">
                        <img
                            src="https://images.unsplash.com/photo-1541339907198-e08756dedf3f?auto=format&fit=crop&w=1200&q=80"
                            alt="College Campus"
                            className="w-full h-full object-cover"
                        />
                    </div>
                    {/* Gradient Overlay fading from left (white) to right (transparent) */}
                    <div className="absolute inset-0 bg-gradient-to-r from-white via-white/95 to-transparent w-full h-full"></div>
                </div>

                <div className="relative max-w-[1300px] mx-auto px-6 h-full flex flex-col justify-center z-10 w-full lg:w-2/3">
                    <span className="text-[#2563EB] text-[11px] font-bold tracking-wider uppercase mb-3 mt-12 lg:mt-0">WELCOME TO OUR COLLEGE</span>
                    <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold mt-2 mb-4 leading-tight text-[#0f172a] max-w-2xl">
                        Empowering Education, <br />
                        Enriching Lives Since 1929
                    </h1>
                    <p className="text-[14px] text-gray-600 mb-8 max-w-xl leading-relaxed">
                        Raul Daultsinhji Multipurpose High School & Jr. College of Science,
                        Dondaicha is committed to providing quality education, discipline and values to shape a better tomorrow.
                    </p>
                    <div className="flex flex-wrap items-center gap-4">
                        <a href="#about" className="bg-[#0f172a] text-white px-6 py-2.5 rounded text-sm font-semibold flex items-center gap-2 hover:bg-[#1e293b] transition-colors">
                            About Our College <ArrowRight size={16} />
                        </a>
                        <Link to="#" className="bg-white border border-[#0f172a] text-[#0f172a] px-6 py-2.5 rounded text-sm font-semibold flex items-center gap-2 hover:bg-gray-50 transition-colors">
                            Admission Information <ArrowRight size={16} />
                        </Link>
                    </div>
                </div>
            </section>

            <div className="max-w-[1300px] mx-auto px-6 -mt-8 relative z-20">
                {/* 2. Role Cards & Latest Notices */}
                <div className="grid grid-cols-1 lg:grid-cols-4 gap-4 mb-8">

                    {/* Role Cards (Take 3 columns) */}
                    <div className="lg:col-span-3 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4">
                        <div className="glass-card p-5 flex flex-col justify-between hover:-translate-y-1 transition-transform cursor-pointer">
                            <div>
                                <div className="w-10 h-10 rounded-full home-accent-blue flex items-center justify-center mb-3">
                                    <GraduationCap size={20} />
                                </div>
                                <h3 className="font-bold text-[14px] text-gray-900 mb-1.5">For Students</h3>
                                <p className="text-[12px] text-gray-500 leading-snug mb-4">Access your profile, attendance, marks, timetable and important announcements.</p>
                            </div>
                            <Link to="/login" className="text-[12px] font-bold text-[#1D4ED8] flex items-center gap-1 group">
                                Student Login <ArrowRight size={12} className="group-hover:translate-x-1 transition-transform" />
                            </Link>
                        </div>

                        <div className="glass-card p-5 flex flex-col justify-between hover:-translate-y-1 transition-transform cursor-pointer">
                            <div>
                                <div className="w-10 h-10 rounded-full home-accent-green flex items-center justify-center mb-3">
                                    <User size={20} />
                                </div>
                                <h3 className="font-bold text-[14px] text-gray-900 mb-1.5">For Teachers</h3>
                                <p className="text-[12px] text-gray-500 leading-snug mb-4">Mark attendance, enter marks, manage classes and access academic tools.</p>
                            </div>
                            <Link to="/login" className="text-[12px] font-bold text-[#166534] flex items-center gap-1 group">
                                Teacher Login <ArrowRight size={12} className="group-hover:translate-x-1 transition-transform" />
                            </Link>
                        </div>

                        <div className="glass-card p-5 flex flex-col justify-between hover:-translate-y-1 transition-transform cursor-pointer">
                            <div>
                                <div className="w-10 h-10 rounded-full home-accent-purple flex items-center justify-center mb-3">
                                    <Users size={20} />
                                </div>
                                <h3 className="font-bold text-[14px] text-gray-900 mb-1.5">For Office Staff</h3>
                                <p className="text-[12px] text-gray-500 leading-snug mb-4">Manage admissions, documents, students, reports and daily administrative tasks.</p>
                            </div>
                            <Link to="/login" className="text-[12px] font-bold text-[#6B21A8] flex items-center gap-1 group">
                                Staff Login <ArrowRight size={12} className="group-hover:translate-x-1 transition-transform" />
                            </Link>
                        </div>

                        <div className="glass-card p-5 flex flex-col justify-between hover:-translate-y-1 transition-transform cursor-pointer">
                            <div>
                                <div className="w-10 h-10 rounded-full home-accent-orange flex items-center justify-center mb-3">
                                    <ShieldCheck size={20} />
                                </div>
                                <h3 className="font-bold text-[14px] text-gray-900 mb-1.5">For Admin</h3>
                                <p className="text-[12px] text-gray-500 leading-snug mb-4">Full control over college operations, users, academics and system settings.</p>
                            </div>
                            <Link to="/login" className="text-[12px] font-bold text-[#C2410C] flex items-center gap-1 group">
                                Admin Login <ArrowRight size={12} className="group-hover:translate-x-1 transition-transform" />
                            </Link>
                        </div>
                    </div>

                    {/* Latest Notices */}
                    <div className="glass-card p-5 flex flex-col">
                        <div className="flex justify-between items-center mb-4 border-b border-gray-100 pb-2">
                            <h3 className="font-bold text-[14px] text-gray-900">Latest Notices</h3>
                            <Link to="/notices" className="text-[11px] font-bold text-[#2563EB] hover:underline">View All</Link>
                        </div>
                        <div className="flex-1 flex flex-col gap-3 justify-center">
                            {notices.map(notice => (
                                <Link to="/notices" key={notice._id} className="flex gap-3 items-center group">
                                    <div className="w-6 h-6 rounded-full bg-[#E7F0FF] flex items-center justify-center shrink-0">
                                        <Megaphone size={12} className="text-[#2563EB]" />
                                    </div>
                                    <p className="text-[12px] font-medium text-gray-700 truncate group-hover:text-[#2563EB] flex-1">{notice.title}</p>
                                    <span className="text-[10px] text-gray-400 shrink-0">
                                        {new Date(notice.createdAt).toLocaleDateString('en-GB', { day: '2-digit', month: 'short', year: 'numeric' })}
                                    </span>
                                </Link>
                            ))}
                        </div>
                    </div>
                </div>

                {/* 3. Stats Band */}
                <div className="bg-[#111827] rounded-xl flex flex-col sm:flex-row flex-wrap lg:flex-nowrap text-white py-6 px-4 sm:divide-x divide-gray-700 divide-y sm:divide-y-0 mb-12 shadow-lg gap-y-4 sm:gap-y-0">
                    {[
                        { icon: Users, count: stats.totalStudents, label: 'Total Students' },
                        { icon: BookOpen, count: stats.totalTeachers, label: 'Teachers' },
                        { icon: Clock, count: stats.totalClasses, label: 'Classes' }, // Reference uses a building/door icon, mapped to clock to match class time
                        { icon: ClipboardCheck, count: `${stats.attendancePercentage}%`, label: 'Attendance Today' },
                        { icon: Calendar, count: stats.upcomingExams, label: 'Upcoming Exams' }
                    ].map((stat, idx) => (
                        <div key={idx} className="w-full sm:w-1/3 lg:w-full py-2 sm:py-0 flex items-center justify-center gap-4">
                            <div className="w-10 h-10 rounded-full bg-white/10 flex items-center justify-center">
                                <stat.icon size={20} className="text-blue-200" />
                            </div>
                            <div className="flex flex-col">
                                {loadingStats ? (
                                    <div className="w-12 h-6 bg-white/20 rounded animate-pulse mb-1"></div>
                                ) : (
                                    <span className="text-2xl font-bold leading-none mb-1">{stat.count}</span>
                                )}
                                <span className="text-[11px] text-blue-100/70 font-medium">{stat.label}</span>
                            </div>
                        </div>
                    ))}
                </div>

                {/* 4. About Our College */}
                <div id="about" className="grid grid-cols-1 md:grid-cols-12 gap-8 mb-12 scroll-mt-24">
                    <div className="md:col-span-4 flex flex-col justify-center">
                        <h2 className="text-2xl font-bold text-gray-900 mb-3">About Our College</h2>
                        <p className="text-[13.5px] text-gray-600 leading-relaxed mb-6 pr-4">
                            Established in 1929, Raul Daultsinhji Multipurpose High School & Jr.
                            College of Science, Dondaicha has a glorious legacy of excellence
                            in education. We aim to nurture intellectual growth, character
                            building and overall development of every student.
                        </p>
                        <div>
                            <Link to="#" className="bg-[#0f172a] text-white px-5 py-2 rounded text-[13px] font-semibold inline-flex items-center gap-2 hover:bg-[#1e293b] transition-colors">
                                Read More <ArrowRight size={14} />
                            </Link>
                        </div>
                    </div>

                    <div className="md:col-span-4 flex flex-col gap-4 justify-center">
                        <div className="glass-card p-5 flex items-start gap-4">
                            <div className="w-12 h-12 rounded-full home-accent-blue flex items-center justify-center shrink-0">
                                <Eye size={24} />
                            </div>
                            <div>
                                <h3 className="font-bold text-[14px] text-gray-900 mb-1">Our Vision</h3>
                                <p className="text-[12px] text-gray-500 leading-snug">To provide quality education and create responsible global citizens.</p>
                            </div>
                        </div>
                        <div className="glass-card p-5 flex items-start gap-4">
                            <div className="w-12 h-12 rounded-full bg-[#FFE4E6] text-[#E11D48] flex items-center justify-center shrink-0">
                                <Target size={24} />
                            </div>
                            <div>
                                <h3 className="font-bold text-[14px] text-gray-900 mb-1">Our Mission</h3>
                                <p className="text-[12px] text-gray-500 leading-snug">To empower students with knowledge, skills, values and discipline for a better future.</p>
                            </div>
                        </div>
                    </div>

                    <div className="md:col-span-4">
                        <img
                            src="https://images.unsplash.com/photo-1523050854058-8df90110c9f1?auto=format&fit=crop&q=80&w=800"
                            alt="College Building"
                            className="w-full h-full object-cover rounded-xl shadow-sm min-h-[200px]"
                        />
                    </div>
                </div>

                {/* 5. Announcements & Events Row */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">

                    {/* Announcements */}
                    <div className="glass-card p-5">
                        <div className="flex justify-between items-center mb-6">
                            <h3 className="font-bold text-[15px] text-gray-900">Announcements</h3>
                            <Link to="/notices" className="text-[11px] font-bold text-[#2563EB] hover:underline">View All</Link>
                        </div>
                        <div className="flex flex-col gap-5">
                            {[
                                { title: "Admissions Open for Class 11th (Science & Commerce)", desc: "Apply now for the academic year 2026-27.", date: "10 May 2026" },
                                { title: "Unit Test 1 Schedule (11th & 12th)", desc: "Please check the exam timetable from notices section.", date: "08 May 2026" },
                                { title: "Parent Meeting - 16 May 2026", desc: "All parents are requested to attend the meeting.", date: "07 May 2026" },
                                { title: "College Reopens After Summer Vacation", desc: "College will reopen from 15th June 2026.", date: "05 May 2026" }
                            ].map((ann, i) => (
                                <div key={i} className="flex gap-4 items-start">
                                    <div className="w-8 h-8 rounded-full bg-[#E7F0FF] flex items-center justify-center shrink-0 mt-1">
                                        <Megaphone size={14} className="text-[#2563EB]" />
                                    </div>
                                    <div className="flex-1">
                                        <h4 className="font-bold text-[13px] text-gray-900 leading-tight mb-1">{ann.title}</h4>
                                        <p className="text-[11px] text-gray-500">{ann.desc}</p>
                                    </div>
                                    <div className="text-[10px] text-gray-400 font-medium whitespace-nowrap pl-2 pt-1">{ann.date}</div>
                                </div>
                            ))}
                        </div>
                    </div>

                    {/* Upcoming Events */}
                    <div id="academics" className="glass-card p-5 scroll-mt-24">
                        <div className="flex justify-between items-center mb-6">
                            <h3 className="font-bold text-[15px] text-gray-900">Upcoming Events</h3>
                            <Link to="#" className="text-[11px] font-bold text-[#2563EB] hover:underline">View All</Link>
                        </div>
                        <div className="flex flex-col gap-6">
                            {UPCOMING_EVENTS.map((event, i) => (
                                <div key={i} className="flex gap-4 items-start">
                                    <div className="flex flex-col items-center border border-[#E7F0FF] rounded-lg w-[46px] overflow-hidden shrink-0 mt-1">
                                        <div className="bg-[#E7F0FF] text-[#1D4ED8] text-[9px] font-bold uppercase w-full text-center py-1">{event.month}</div>
                                        <div className="text-gray-900 font-bold text-[16px] py-1">{event.date}</div>
                                    </div>
                                    <div className="flex-1">
                                        <h4 className="font-bold text-[13px] text-gray-900 mb-1">{event.title}</h4>
                                        <div className="text-[11px] text-gray-500 flex flex-col gap-0.5">
                                            <span>Time: {event.time}</span>
                                            <span>Venue: {event.venue}</span>
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>

                    {/* Quick Access Blocks */}
                    <div className="flex flex-col gap-4 h-full">
                        <div className="bg-[#1e3a8a] text-white rounded-xl p-5 flex flex-col md:flex-row md:items-center gap-4 flex-1 relative overflow-hidden transition-transform hover:-translate-y-1 shadow-sm cursor-pointer border border-[#1e3a8a]">
                            <div className="absolute right-0 top-0 opacity-[0.03] scale-150 -translate-y-4 translate-x-4">
                                <Calendar size={120} />
                            </div>
                            <div className="w-[50px] h-[50px] rounded-lg bg-white/10 border border-white/20 flex items-center justify-center shrink-0 z-10 hidden md:flex">
                                <Calendar size={24} className="text-white" />
                            </div>
                            <div className="z-10">
                                <h3 className="font-bold text-[15px] mb-1">Academic Calendar</h3>
                                <div className="text-[12px] font-medium flex items-center gap-1 text-blue-100 hover:text-white transition-colors">View Calendar <ArrowRight size={14} /></div>
                            </div>
                        </div>

                        <div id="admissions" className="bg-[#F0FDF4] border border-[#BBF7D0] rounded-xl p-5 flex flex-col md:flex-row md:items-center gap-4 flex-1 transition-transform hover:-translate-y-1 shadow-sm cursor-pointer scroll-mt-24">
                            <div className="w-[50px] h-[50px] rounded-lg bg-[#22C55E] text-white flex items-center justify-center shrink-0 shadow-md shadow-green-200 hidden md:flex">
                                <ClipboardCheck size={24} />
                            </div>
                            <div>
                                <h3 className="font-bold text-[15px] text-gray-900 mb-0.5 leading-tight">Online Admission<br className="hidden md:block" /> 2026-27</h3>
                                <span className="text-[10px] font-bold text-[#16A34A] uppercase tracking-wider block mb-1">Now Open</span>
                                <div className="text-[12px] font-bold flex items-center gap-1 text-[#2563EB] hover:text-[#1D4ED8] transition-colors">Apply Online <ArrowRight size={14} /></div>
                            </div>
                        </div>
                    </div>

                </div>

                {/* 6. Our Facilities */}
                <div className="mb-12">
                    <h2 className="text-[18px] font-bold text-gray-900 text-center mb-6">Our Facilities</h2>
                    <div className="flex flex-wrap lg:flex-nowrap justify-between gap-4">
                        {[
                            { icon: Laptop, title: 'Smart Classrooms', desc: 'Modern classrooms with digital learning infrastructure.', color: 'text-[#3B82F6]', bg: 'bg-[#EFF6FF]' },
                            { icon: Beaker, title: 'Science Laboratories', desc: 'Well-equipped labs for practical learning.', color: 'text-[#22C55E]', bg: 'bg-[#F0FDF4]' },
                            { icon: BookOpen, title: 'Library', desc: 'Rich collection of books and reference materials.', color: 'text-[#A855F7]', bg: 'bg-[#FAF5FF]' },
                            { icon: Monitor, title: 'Computer Lab', desc: 'High-speed computers and internet access.', color: 'text-[#F97316]', bg: 'bg-[#FFF7ED]' },
                            { icon: Award, title: 'Sports & Activities', desc: 'Encouraging sports, NCC, NSS and cultural activities.', color: 'text-[#E11D48]', bg: 'bg-[#FFF1F2]' }
                        ].map((fac, i) => (
                            <div key={i} className="glass-card p-4 flex gap-3 w-full sm:w-[calc(50%-8px)] lg:w-1/5 items-center lg:items-start text-left lg:flex-col lg:justify-start">
                                <div className={`w-12 h-12 rounded-lg flex items-center justify-center shrink-0 ${fac.bg} ${fac.color}`}>
                                    <fac.icon size={24} strokeWidth={1.5} />
                                </div>
                                <div>
                                    <h3 className="font-bold text-[13px] text-gray-900 mb-1 lg:mt-2">{fac.title}</h3>
                                    <p className="text-[11px] text-gray-500 leading-snug">{fac.desc}</p>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>

                {/* 7. Students Achievements */}
                <div id="students" className="mb-12 scroll-mt-24">
                    <div className="flex justify-between items-center mb-6 border-b border-gray-200 pb-2">
                        <h2 className="text-[18px] font-bold text-gray-900">Students Achievements</h2>
                        <Link to="#" className="text-[12px] font-bold text-[#2563EB] hover:underline">View All</Link>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                        {STUDENT_ACHIEVEMENTS.map((ach, i) => (
                            <div key={i} className="glass-card p-4 relative overflow-hidden flex items-center gap-3">
                                {/* Rank Ribbon/Badge */}
                                <div className="absolute -left-1 top-4 w-6 h-8 flex flex-col items-center">
                                    <div className={`w-6 h-6 rounded-full flex items-center justify-center text-white font-bold text-[11px] shadow-sm z-10 
                                         ${ach.rank === '1' ? 'bg-[#EAB308]' : ach.rank === '2' ? 'bg-[#94A3B8]' : 'bg-[#D97706]'}`}>
                                        {ach.rank}
                                    </div>
                                    <div className={`w-4 h-4 -mt-1 transform rotate-45 
                                         ${ach.rank === '1' ? 'bg-[#ca8a04]' : ach.rank === '2' ? 'bg-[#64748b]' : 'bg-[#b45309]'}`}></div>
                                </div>

                                <div className="ml-5 shrink-0">
                                    <img src={ach.avatar} alt={ach.name} className="w-12 h-12 rounded-full border-2 border-gray-100 bg-gray-50 object-cover" />
                                </div>
                                <div className="flex-1 min-w-0">
                                    <h4 className="font-bold text-[13px] text-gray-900">{ach.name}</h4>
                                    <div className="text-[10px] text-gray-500 mb-1">{ach.class}</div>
                                    <p className="text-[11px] font-medium text-gray-800 leading-snug">{ach.detail}</p>
                                </div>
                            </div>
                        ))}

                        {/* Science Exhibition Card */}
                        <div className="glass-card p-4 relative overflow-hidden flex items-center gap-3">
                            <div className="absolute -left-1 top-4 w-6 h-8 flex flex-col items-center">
                                <div className={`w-6 h-6 rounded-full flex items-center justify-center text-white font-bold text-[11px] shadow-sm z-10 bg-[#EAB308]`}>
                                    🏆
                                </div>
                                <div className={`w-4 h-4 -mt-1 transform rotate-45 bg-[#ca8a04]`}></div>
                            </div>
                            <div className="ml-5 shrink-0">
                                {/* Group photo abstraction */}
                                <div className="w-16 h-12 rounded bg-gray-200 overflow-hidden flex divide-x divide-white">
                                    <img src="https://api.dicebear.com/7.x/notionists/svg?seed=A" className="w-1/3 object-cover" />
                                    <img src="https://api.dicebear.com/7.x/notionists/svg?seed=B" className="w-1/3 object-cover" />
                                    <img src="https://api.dicebear.com/7.x/notionists/svg?seed=C" className="w-1/3 object-cover" />
                                </div>
                            </div>
                            <div className="flex-1 min-w-0">
                                <h4 className="font-bold text-[13px] text-gray-900">Science Exhibition 2024</h4>
                                <p className="text-[11px] font-medium text-gray-800 leading-snug mt-1">1st Prize in District Level Science Project Competition</p>
                            </div>
                        </div>
                    </div>
                </div>

                {/* 8. Campus Life */}
                <div id="gallery" className="mb-14 scroll-mt-24">
                    <div className="flex justify-between items-center mb-6 border-b border-gray-200 pb-2">
                        <h2 className="text-[18px] font-bold text-gray-900">Campus Life</h2>
                        <Link to="#" className="text-[12px] font-bold text-[#2563EB] hover:underline flex items-center gap-1">View Gallery <ArrowRight size={12} /></Link>
                    </div>

                    <div className="flex gap-3 overflow-x-auto gallery-scroll pb-2 -mx-6 px-6 lg:mx-0 lg:px-0 scroll-smooth">
                        {[
                            "https://images.unsplash.com/photo-1541339907198-e08756dedf3f?w=400&q=80",
                            "https://images.unsplash.com/photo-1577896851231-70ef18881754?w=400&q=80",
                            "https://images.unsplash.com/photo-1427504494785-3a9ca7044f45?w=400&q=80",
                            "https://images.unsplash.com/photo-1524901548305-08eeddc35080?w=400&q=80",
                            "https://images.unsplash.com/photo-1509062522246-3755977927d7?w=400&q=80"
                        ].map((src, i) => (
                            <div key={i} className="w-[200px] lg:w-1/5 shrink-0 aspect-[16/10] rounded-lg overflow-hidden border border-gray-100 shadow-sm group">
                                <img src={src} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500 cursor-pointer" alt="Campus Life" loading="lazy" />
                            </div>
                        ))}
                    </div>
                </div>

                {/* 9. Join Our College Family CTA */}
                <div className="bg-[#111827] rounded-xl flex flex-col md:flex-row items-center justify-between p-6 shadow-lg text-white">
                    <div className="flex items-center gap-5 mb-4 md:mb-0">
                        <div className="w-14 h-14 rounded-full bg-blue-500/20 flex items-center justify-center shrink-0">
                            <GraduationCap size={28} className="text-[#93c5fd]" />
                        </div>
                        <div>
                            <h2 className="text-[20px] font-bold mb-1">Join Our College Family</h2>
                            <p className="text-[13px] text-gray-300">Take the first step towards a bright future. Admissions for Class 11th are now open.</p>
                        </div>
                    </div>
                    <Link to="#" className="bg-white text-gray-900 border border-transparent shadow hover:bg-gray-100 transition-colors font-bold px-6 py-2.5 rounded-lg flex items-center gap-2 whitespace-nowrap text-[14px]">
                        Apply Now <ArrowRight size={16} />
                    </Link>
                </div>

            </div>
        </div>
    );
}
