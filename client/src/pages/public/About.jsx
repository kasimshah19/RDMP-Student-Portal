import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';
import {
    ChevronRight, BookOpen, Clock, MapPin,
    GraduationCap, Award, Building, Users,
    Target, Eye, Shield, CheckCircle2, ArrowRight,
    MessageCircle, Lightbulb, UserCheck, CheckSquare, BarChart, BookMarked
} from 'lucide-react';

// --- DATA CONFIGURATION ---
const aboutConfig = {
    institution: {
        name: "Raul Daultsinhji Multipurpose High School & Jr. College of Science",
        location: "Dondaicha, Dist. Dhule, Maharashtra - 425408",
        established: "1929",
        level: "High School & Junior College"
    },
    hero: {
        title: "ABOUT OUR COLLEGE",
        subtitle: "Learn about our institution, our educational journey, academic environment, values and commitment to student development.",
    },
    overview: `Raul Daultsinhji Multipurpose High School & Jr. College of Science is an educational institution located in Dondaicha, Dist. Dhule, Maharashtra. 

Established in 1929, the institution has a long-standing presence in the local educational community. 

The institution provides an academic environment for students and supports their educational and overall development.`,

    quickStats: [
        { icon: Clock, value: "1929", label: "Established" },
        { icon: MapPin, value: "Dondaicha", label: "Location" },
        { icon: Building, value: "High School", label: "School Level" },
        { icon: GraduationCap, value: "Junior College", label: "Higher Secondary" }
    ],

    legacyTimeline: [
        { year: "1929", title: "Institution Established", desc: "Foundation of the institution." },
        { year: "Growth", title: "Educational Growth", desc: "Expanding facilities and academic reach." },
        { year: "Expansion", title: "School & Junior College Development", desc: "Introducing advanced science curriculum." },
        { year: "Present", title: "Present Day", desc: "Continuing the legacy of education." }
    ],

    message: {
        title: "Message from the Institution",
        text: "\"Education is not only about academic achievement; it is also about developing responsibility, discipline, confidence and a positive approach toward life.\"",
        author: "— Administration"
    },

    vision: {
        title: "Our Vision",
        desc: "To provide an encouraging academic environment that supports learning, character development and the overall growth of students.",
        icon: Eye
    },

    mission: {
        title: "Our Mission",
        desc: "To support students through quality education, academic guidance, discipline, responsible values and opportunities for personal development.",
        icon: Target
    },

    coreValues: [
        { icon: Award, title: "Excellence", desc: "Encouraging students to strive for continuous improvement." },
        { icon: CheckSquare, title: "Discipline", desc: "Building responsibility, punctuality and respect." },
        { icon: Shield, title: "Integrity", desc: "Promoting honesty and ethical conduct." },
        { icon: UserCheck, title: "Respect", desc: "Creating a respectful environment for students, teachers and staff." },
        { icon: Lightbulb, title: "Learning", desc: "Encouraging curiosity and lifelong learning." },
        { icon: Target, title: "Responsibility", desc: "Preparing students to become responsible members of society." }
    ],

    academicEnvironment: [
        { title: "Academic Learning", desc: "Subject-focused education and structured learning." },
        { title: "Teacher Guidance", desc: "Academic support and classroom interaction." },
        { title: "Practical Learning", desc: "Learning through practical and academic activities." },
        { title: "Student Development", desc: "Encouraging confidence, discipline and participation." }
    ],

    studentDevelopment: [
        { title: "Academic Activities", icon: BookOpen },
        { title: "Practical Learning", icon: BarChart },
        { title: "Cultural Activities", icon: Users },
        { title: "Sports & Physical Activities", icon: Award },
        { title: "Student Participation", icon: MessageCircle },
        { title: "Competitions", icon: BookMarked }
    ],

    whyChooseUs: [
        { title: "Long-standing Educational Presence", desc: "Established in 1929." },
        { title: "Academic Focus", desc: "A structured environment focused on student learning." },
        { title: "Student-Centred Approach", desc: "Supporting students throughout their academic journey." },
        { title: "Experienced Guidance", desc: "Teachers and staff supporting academic development." },
        { title: "Discipline & Values", desc: "Encouraging responsible and respectful behaviour." },
        { title: "School & Junior College", desc: "A connected educational environment for students." }
    ],

    portal: [
        { role: "Students", items: "Attendance • Marks • Documents • Results" },
        { role: "Teachers", items: "Attendance • Marks • Classes • Academic Records" },
        { role: "Office Staff", items: "Admissions • Documents • Student Records" },
        { role: "Administration", items: "Academic Management • Reports • College Operations" }
    ]
};

// --- COMPONENTS ---

const About = () => {
    // Scroll to top on mount
    useEffect(() => {
        window.scrollTo({ top: 0, behavior: 'instant' });
    }, []);

    return (
        <div className="bg-slate-50 min-h-screen text-slate-800 font-sans">

            {/* 1. BREADCRUMB & HERO */}
            <section className="bg-navy-900 text-white pt-12 pb-20 px-6 lg:px-8 relative overflow-hidden bg-[#0f172a]">
                {/* Decorative Background */}
                <div className="absolute inset-0 opacity-10 pointer-events-none">
                    <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-blue-500 rounded-full blur-[120px] transform translate-x-1/3 -translate-y-1/3"></div>
                    <div className="absolute bottom-0 left-0 w-[400px] h-[400px] bg-indigo-500 rounded-full blur-[100px] transform -translate-x-1/3 translate-y-1/3"></div>
                </div>

                <div className="max-w-[1300px] mx-auto relative z-10">
                    <nav className="flex items-center text-sm font-medium text-slate-300 mb-8 opacity-90">
                        <Link to="/" className="hover:text-white transition-colors">Home</Link>
                        <ChevronRight size={16} className="mx-2 opacity-50" />
                        <span className="text-white font-semibold">About Us</span>
                    </nav>

                    <div className="grid lg:grid-cols-2 gap-12 items-center">
                        <div>
                            <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-blue-500/20 text-blue-300 text-xs font-bold tracking-wider mb-6 border border-blue-500/30">
                                <Building size={14} />
                                {aboutConfig.hero.title}
                            </div>
                            <h1 className="text-4xl lg:text-5xl font-extrabold leading-tight mb-6">
                                {aboutConfig.institution.name}
                            </h1>
                            <div className="space-y-2 mb-8 text-blue-100 opacity-90">
                                <div className="flex items-center gap-2">
                                    <MapPin size={18} className="text-blue-400" />
                                    <span>{aboutConfig.institution.location}</span>
                                </div>
                                <div className="flex items-center gap-2">
                                    <Clock size={18} className="text-blue-400" />
                                    <span>Established in {aboutConfig.institution.established}</span>
                                </div>
                            </div>
                            <p className="text-lg text-slate-300 leading-relaxed mb-10 max-w-xl">
                                {aboutConfig.hero.subtitle}
                            </p>
                            <div className="flex flex-col sm:flex-row gap-4">
                                <Link to="/academics" className="px-6 py-3 bg-blue-600 hover:bg-blue-500 text-white font-medium rounded-lg transition-all shadow-lg shadow-blue-500/30 flex items-center justify-center gap-2 group w-full sm:w-auto">
                                    Explore Academics
                                    <ArrowRight size={18} className="group-hover:translate-x-1 transition-transform" />
                                </Link>
                                <Link to="/admissions" className="px-6 py-3 bg-white/10 hover:bg-white/20 text-white font-medium rounded-lg transition-all border border-white/20 backdrop-blur-sm flex justify-center w-full sm:w-auto">
                                    View Admissions
                                </Link>
                            </div>
                        </div>

                        <div className="hidden lg:block">
                            {/* Placeholder for Campus Image - Structured elegantly to not look broken */}
                            <div className="aspect-[4/3] rounded-2xl bg-gradient-to-tr from-slate-800 to-slate-700 border border-slate-600/50 shadow-2xl overflow-hidden relative flex flex-col items-center justify-center p-8 text-center group">
                                <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/cubes.png')] opacity-10 mix-blend-overlay"></div>
                                <Building size={64} className="text-slate-500 mb-4 group-hover:scale-110 transition-transform duration-500" />
                                <h3 className="text-xl font-bold text-slate-300 mb-2">Campus View</h3>
                                <p className="text-sm text-slate-400">Image configuration placeholder</p>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* 2. ABOUT OUR COLLEGE & QUICK STATS */}
            <section className="py-20 px-6 lg:px-8 bg-white">
                <div className="max-w-[1300px] mx-auto">
                    <div className="grid lg:grid-cols-2 gap-16 items-center">
                        <div className="order-2 lg:order-1">
                            {/* Left Image Placeholder */}
                            <div className="relative">
                                <div className="aspect-square lg:aspect-[4/5] rounded-2xl bg-slate-100 overflow-hidden relative shadow-lg ring-1 ring-slate-200">
                                    <div className="absolute inset-0 flex flex-col items-center justify-center text-slate-400">
                                        <Building size={48} className="mb-3 opacity-50" />
                                        <span className="text-sm font-medium">Institution Photography Placeholder</span>
                                    </div>
                                </div>
                                {/* Decorative floating badge */}
                                <div className="absolute -bottom-6 -right-6 bg-white p-6 rounded-2xl shadow-xl ring-1 ring-slate-100 hidden md:block max-w-[200px]">
                                    <div className="text-blue-600 font-bold justify-center items-center flex mb-2 gap-2">
                                        <Award size={24} />
                                    </div>
                                    <p className="text-center font-bold text-slate-800 leading-tight">Decades of Educational Excellence</p>
                                </div>
                            </div>
                        </div>

                        <div className="order-1 lg:order-2">
                            <h2 className="text-3xl lg:text-4xl font-extrabold text-[#0f172a] mb-8 relative inline-block">
                                About Our College
                                <div className="absolute -bottom-3 left-0 w-1/3 h-1.5 bg-blue-600 rounded-full"></div>
                            </h2>
                            <div className="space-y-6 text-lg text-slate-600 leading-relaxed">
                                {aboutConfig.overview.split('\n\n').map((para, i) => (
                                    <p key={i}>{para}</p>
                                ))}
                            </div>

                            {/* Quick Info Grid */}
                            <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mt-12">
                                {aboutConfig.quickStats.map((stat, idx) => (
                                    <div key={idx} className="bg-slate-50 p-4 rounded-xl border border-slate-200 text-center hover:shadow-md transition-shadow">
                                        <div className="inline-flex p-3 rounded-lg bg-blue-100 text-blue-700 mb-3">
                                            <stat.icon size={20} />
                                        </div>
                                        <p className="font-bold text-slate-800">{stat.value}</p>
                                        <p className="text-xs text-slate-500 mt-1 uppercase font-semibold tracking-wide">{stat.label}</p>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* 3. OUR LEGACY (TIMELINE) */}
            <section className="py-20 px-6 lg:px-8 bg-slate-50 border-y border-slate-200 overflow-hidden relative">
                <div className="absolute right-0 top-0 w-1/3 h-full bg-gradient-to-l from-blue-50 to-transparent"></div>
                <div className="max-w-[1300px] mx-auto relative z-10">
                    <div className="text-center mb-16">
                        <h2 className="text-3xl font-extrabold text-[#0f172a] mb-4">Our Legacy</h2>
                        <p className="text-slate-500 max-w-2xl mx-auto text-lg">Since {aboutConfig.institution.established}, building a foundation for academic excellence and student success.</p>
                    </div>

                    <div className="relative">
                        {/* Connecting Line */}
                        <div className="hidden md:block absolute top-1/2 left-0 w-full h-1 bg-slate-200 -translate-y-1/2 rounded-full"></div>

                        <div className="grid md:grid-cols-4 gap-8">
                            {aboutConfig.legacyTimeline.map((item, idx) => (
                                <div key={idx} className="relative group perspective">
                                    <div className="md:absolute top-1/2 left-1/2 md:-translate-x-1/2 md:-translate-y-1/2 w-4 h-4 rounded-full bg-blue-600 border-4 border-white shadow-sm z-10 hidden md:block group-hover:scale-150 transition-transform"></div>
                                    <div className={`bg-white p-6 rounded-2xl shadow-sm border border-slate-100 relative z-0 md:mt-20 group-hover:shadow-xl group-hover:border-blue-100 transition-all duration-300 md:group-hover:-translate-y-2 ${idx % 2 === 0 ? 'md:mt-0 md:mb-20' : 'md:mt-20'}`}>
                                        <div className="text-blue-600 font-black text-xl mb-2">{item.year}</div>
                                        <h4 className="font-bold text-slate-800 mb-2">{item.title}</h4>
                                        <p className="text-sm text-slate-500 leading-relaxed">{item.desc}</p>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            </section>

            {/* 4. MESSAGE & VISION MISSION */}
            <section className="py-20 px-6 lg:px-8 bg-white relative">
                <div className="max-w-[1300px] mx-auto">
                    {/* Message */}
                    <div className="bg-[#0f172a] text-white rounded-[2rem] p-8 md:p-16 mb-20 shadow-2xl relative overflow-hidden">
                        <div className="absolute top-0 right-0 p-8 opacity-10">
                            <svg width="120" height="120" viewBox="0 0 24 24" fill="currentColor"><path d="M14.017 21v-7.391c0-5.704 3.731-9.57 8.983-10.609l.995 2.151c-2.432.917-3.995 3.638-3.995 5.849h4v10h-9.983zm-14.017 0v-7.391c0-5.704 3.748-9.57 9-10.609l.996 2.151c-2.433.917-3.996 3.638-3.996 5.849h3.983v10h-9.983z" /></svg>
                        </div>
                        <div className="relative z-10 max-w-4xl mx-auto text-center">
                            <h3 className="text-2xl font-bold text-blue-400 mb-8">{aboutConfig.message.title}</h3>
                            <p className="text-2xl md:text-3xl font-medium leading-relaxed mb-8 italic">
                                {aboutConfig.message.text}
                            </p>
                            <p className="text-xl font-bold text-slate-300">{aboutConfig.message.author}</p>
                        </div>
                    </div>

                    {/* V & M */}
                    <div className="grid md:grid-cols-2 gap-8">
                        <div className="bg-slate-50 p-10 rounded-3xl border border-slate-200 group hover:border-blue-300 transition-colors">
                            <div className="w-16 h-16 bg-blue-100 text-blue-600 rounded-2xl flex items-center justify-center mb-8 group-hover:scale-110 transition-transform">
                                <aboutConfig.vision.icon size={32} />
                            </div>
                            <h3 className="text-3xl font-extrabold text-slate-800 mb-6">{aboutConfig.vision.title}</h3>
                            <p className="text-lg text-slate-600 leading-relaxed">{aboutConfig.vision.desc}</p>
                        </div>
                        <div className="bg-slate-50 p-10 rounded-3xl border border-slate-200 group hover:border-blue-300 transition-colors">
                            <div className="w-16 h-16 bg-blue-100 text-blue-600 rounded-2xl flex items-center justify-center mb-8 group-hover:scale-110 transition-transform">
                                <aboutConfig.mission.icon size={32} />
                            </div>
                            <h3 className="text-3xl font-extrabold text-slate-800 mb-6">{aboutConfig.mission.title}</h3>
                            <p className="text-lg text-slate-600 leading-relaxed">{aboutConfig.mission.desc}</p>
                        </div>
                    </div>
                </div>
            </section>

            {/* 5. CORE VALUES */}
            <section className="py-20 px-6 lg:px-8 bg-slate-50 border-t border-slate-200">
                <div className="max-w-[1300px] mx-auto">
                    <div className="text-center mb-16">
                        <h2 className="text-3xl font-extrabold text-[#0f172a] mb-4">Our Core Values</h2>
                        <p className="text-slate-500 max-w-2xl mx-auto text-lg">The foundational principles that guide our academic environment and student development.</p>
                    </div>

                    <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                        {aboutConfig.coreValues.map((val, idx) => (
                            <div key={idx} className="bg-white p-8 rounded-2xl border border-slate-100 shadow-sm hover:shadow-lg hover:-translate-y-1 transition-all duration-300 group">
                                <div className="flex items-center gap-4 mb-4">
                                    <div className="p-3 bg-blue-50 text-blue-600 rounded-xl group-hover:bg-blue-600 group-hover:text-white transition-colors">
                                        <val.icon size={24} />
                                    </div>
                                    <h3 className="text-xl font-bold text-slate-800">{val.title}</h3>
                                </div>
                                <p className="text-slate-600 leading-relaxed">{val.desc}</p>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* 6. ACADEMIC & BEYOND CLASSROOM */}
            <section className="py-20 px-6 lg:px-8 bg-white">
                <div className="max-w-[1300px] mx-auto">

                    <div className="grid lg:grid-cols-2 gap-16 mb-24">
                        <div>
                            <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-blue-50 text-blue-600 text-xs font-bold tracking-wider mb-6">
                                <GraduationCap size={14} /> ACADEMICS
                            </div>
                            <h2 className="text-3xl lg:text-4xl font-extrabold text-[#0f172a] mb-6">Our Academic Environment</h2>
                            <p className="text-lg text-slate-600 leading-relaxed mb-8">
                                We focus on creating a structured tracking of student learning. Our approach focuses on subject mastery, active classroom dialogue, and reliable assessments to assure quality educational standards.
                            </p>
                            <div className="grid sm:grid-cols-2 gap-6">
                                {aboutConfig.academicEnvironment.map((item, idx) => (
                                    <div key={idx} className="flex gap-4">
                                        <div className="mt-1 flex-shrink-0 text-blue-600">
                                            <CheckCircle2 size={24} />
                                        </div>
                                        <div>
                                            <h4 className="font-bold text-slate-800 mb-1">{item.title}</h4>
                                            <p className="text-sm text-slate-600 leading-relaxed">{item.desc}</p>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>
                        <div className="bg-slate-50 rounded-[2rem] p-10 border border-slate-100">
                            <h3 className="text-2xl font-bold text-[#0f172a] mb-8">Beyond The Classroom</h3>
                            <div className="space-y-4">
                                {aboutConfig.studentDevelopment.map((item, idx) => (
                                    <div key={idx} className="flex items-center gap-4 bg-white p-4 rounded-xl shadow-sm border border-slate-100">
                                        <div className="p-2 bg-blue-50 text-blue-600 rounded-lg">
                                            <item.icon size={20} />
                                        </div>
                                        <span className="font-semibold text-slate-700">{item.title}</span>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* 7. CAMPUS & WHY CHOOSE US */}
            <section className="py-20 px-6 lg:px-8 bg-slate-50 border-t border-slate-200">
                <div className="max-w-[1300px] mx-auto">
                    <div className="text-center mb-16">
                        <h2 className="text-3xl font-extrabold text-[#0f172a] mb-4">Campus & Learning Environment</h2>
                        <p className="text-slate-500 max-w-2xl mx-auto text-lg mb-8">Experience a campus dedicated to education and academic growth.</p>
                        <Link to="/gallery" className="inline-flex items-center gap-2 px-6 py-2.5 bg-white border border-slate-300 text-slate-700 hover:bg-slate-100 hover:border-slate-400 rounded-xl transition-all font-semibold shadow-sm">
                            View Campus Gallery <ArrowRight size={18} />
                        </Link>
                    </div>

                    {/* Image Grid Placeholder */}
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-24">
                        <div className="col-span-2 row-span-2 aspect-square md:aspect-auto bg-slate-200 rounded-2xl flex flex-col items-center justify-center text-slate-500 shadow-inner">
                            <Building size={48} className="mb-2 opacity-50" />
                            <span className="font-medium text-sm">Large Campus Image</span>
                        </div>
                        <div className="aspect-square bg-slate-200 rounded-2xl flex flex-col items-center justify-center text-slate-500 shadow-inner">
                            <BookOpen size={32} className="mb-2 opacity-50" />
                            <span className="font-medium text-xs">Library</span>
                        </div>
                        <div className="aspect-square bg-slate-200 rounded-2xl flex flex-col items-center justify-center text-slate-500 shadow-inner">
                            <Target size={32} className="mb-2 opacity-50" />
                            <span className="font-medium text-xs">Classroom</span>
                        </div>
                        <div className="aspect-square bg-slate-200 rounded-2xl flex flex-col items-center justify-center text-slate-500 shadow-inner">
                            <BarChart size={32} className="mb-2 opacity-50" />
                            <span className="font-medium text-xs">Laboratory</span>
                        </div>
                        <div className="aspect-square bg-slate-200 rounded-2xl flex flex-col items-center justify-center text-slate-500 shadow-inner">
                            <Users size={32} className="mb-2 opacity-50" />
                            <span className="font-medium text-xs">Grounds</span>
                        </div>
                    </div>

                    <div className="mb-16">
                        <h2 className="text-3xl font-extrabold text-[#0f172a] mb-12 text-center">Why Choose Our Institution?</h2>
                        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                            {aboutConfig.whyChooseUs.map((reason, idx) => (
                                <div key={idx} className="bg-white p-6 rounded-2xl border border-slate-200 hover:border-blue-300 transition-colors">
                                    <div className="w-10 h-10 bg-blue-50 text-blue-600 rounded-full flex items-center justify-center font-bold mb-4">
                                        {idx + 1}
                                    </div>
                                    <h4 className="font-bold text-slate-800 text-lg mb-2">{reason.title}</h4>
                                    <p className="text-slate-600 text-sm leading-relaxed">{reason.desc}</p>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            </section>

            {/* 8. LEVELS & PORTAL */}
            <section className="py-20 px-6 lg:px-8 bg-white border-t border-slate-200">
                <div className="max-w-[1300px] mx-auto">
                    <div className="grid lg:grid-cols-2 gap-16 items-center">
                        <div>
                            <h2 className="text-3xl font-extrabold text-[#0f172a] mb-8">Our Educational Structure</h2>

                            <div className="space-y-4 relative before:absolute before:inset-0 before:ml-6 before:-translate-x-px md:before:mx-auto md:before:translate-x-0 before:h-full before:w-0.5 before:bg-gradient-to-b before:from-transparent before:via-slate-300 before:to-transparent hidden"></div>
                            {/* Simple Vertical Flow */}
                            <div className="flex flex-col gap-6">
                                <div className="bg-slate-50 border border-slate-200 p-6 rounded-2xl flex items-center gap-6">
                                    <div className="w-12 h-12 bg-blue-100 text-blue-600 rounded-xl flex items-center justify-center shrink-0">
                                        <Building size={24} />
                                    </div>
                                    <div>
                                        <h4 className="font-bold text-slate-800 text-lg">School Education</h4>
                                        <p className="text-slate-500">High School Classes</p>
                                    </div>
                                </div>

                                <div className="text-slate-300 pl-12"><ArrowRight size={24} className="rotate-90" /></div>

                                <div className="bg-slate-50 border border-slate-200 p-6 rounded-2xl flex items-center gap-6">
                                    <div className="w-12 h-12 bg-indigo-100 text-indigo-600 rounded-xl flex items-center justify-center shrink-0">
                                        <GraduationCap size={24} />
                                    </div>
                                    <div>
                                        <h4 className="font-bold text-slate-800 text-lg">Higher Secondary Education</h4>
                                        <p className="text-slate-500">Junior College (Class 11th & 12th)</p>
                                    </div>
                                </div>

                                <div className="text-slate-300 pl-12"><ArrowRight size={24} className="rotate-90" /></div>

                                <div className="bg-[#0f172a] border border-slate-700 p-6 rounded-2xl flex items-center gap-6 shadow-xl">
                                    <div className="w-12 h-12 bg-white/10 text-white rounded-xl flex items-center justify-center shrink-0">
                                        <BookOpen size={24} />
                                    </div>
                                    <div>
                                        <h4 className="font-bold text-white text-lg">Academic Management</h4>
                                        <p className="text-slate-400">Digital Student Portal</p>
                                    </div>
                                </div>
                            </div>
                        </div>

                        <div>
                            <div className="bg-blue-50 border border-blue-100 p-10 rounded-[2rem]">
                                <h3 className="text-2xl font-bold text-blue-900 mb-4">Our Digital Student Portal</h3>
                                <p className="text-blue-800/80 mb-8 leading-relaxed">
                                    Our digital student portal helps students, teachers and authorized college staff access academic and administrative services through a centralized platform.
                                </p>
                                <div className="space-y-4 mb-8">
                                    {aboutConfig.portal.map((roleInfo, idx) => (
                                        <div key={idx} className="bg-white p-4 rounded-xl border border-blue-100/50 shadow-sm">
                                            <span className="font-bold text-blue-900 block mb-1">{roleInfo.role}</span>
                                            <span className="text-sm text-slate-500">{roleInfo.items}</span>
                                        </div>
                                    ))}
                                </div>
                                <Link to="/login" className="inline-flex items-center gap-2 px-6 py-3 bg-blue-600 hover:bg-blue-500 text-white font-medium rounded-xl transition-all shadow-md">
                                    Open Student Portal <ArrowRight size={18} />
                                </Link>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* 9. IMPORTANT INFO & CTA */}
            <section className="py-20 px-6 lg:px-8 bg-[#0f172a] text-white overflow-hidden relative">
                {/* Decorative BG */}
                <div className="absolute top-0 right-0 w-full h-full opacity-10 pointer-events-none">
                    <svg viewBox="0 0 100 100" preserveAspectRatio="none" className="w-full h-full">
                        <polygon fill="currentColor" points="100,0 100,100 0,100" />
                    </svg>
                </div>

                <div className="max-w-[1300px] mx-auto relative z-10">
                    <div className="grid lg:grid-cols-5 gap-12 items-center">
                        <div className="lg:col-span-2 bg-white/5 border border-white/10 p-8 rounded-[2rem] backdrop-blur-sm">
                            <h3 className="text-xl font-bold mb-6 text-blue-400">Important Information</h3>
                            <ul className="space-y-6">
                                <li>
                                    <span className="block text-xs uppercase tracking-wider text-slate-400 font-semibold mb-1">Institution</span>
                                    <span className="font-medium text-slate-200">{aboutConfig.institution.name}</span>
                                </li>
                                <li>
                                    <span className="block text-xs uppercase tracking-wider text-slate-400 font-semibold mb-1">Location</span>
                                    <span className="font-medium text-slate-200">{aboutConfig.institution.location}</span>
                                </li>
                                <li>
                                    <span className="block text-xs uppercase tracking-wider text-slate-400 font-semibold mb-1">Academic Levels</span>
                                    <span className="font-medium text-slate-200">{aboutConfig.institution.level}</span>
                                </li>
                                <li>
                                    <span className="block text-xs uppercase tracking-wider text-slate-400 font-semibold mb-1">Established</span>
                                    <span className="font-medium text-slate-200">{aboutConfig.institution.established}</span>
                                </li>
                            </ul>
                        </div>

                        <div className="lg:col-span-3 lg:pl-10 text-center lg:text-left">
                            <h2 className="text-4xl md:text-5xl font-extrabold mb-6 leading-tight">Be Part of Our <br /><span className="text-blue-400">Educational Community</span></h2>
                            <p className="text-xl text-slate-300 mb-10 max-w-2xl mx-auto lg:mx-0 leading-relaxed">
                                Explore admissions, academics and important information about our institution. Start your academic journey with us today.
                            </p>
                            <div className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start">
                                <Link to="/admissions" className="px-8 py-3.5 bg-blue-500 hover:bg-blue-400 text-white font-bold rounded-xl transition-all shadow-lg shadow-blue-500/30 flex items-center justify-center gap-2 w-full sm:w-auto">
                                    View Admissions <ArrowRight size={18} />
                                </Link>
                                <Link to="/contact" className="px-8 py-3.5 bg-white/10 hover:bg-white/20 text-white font-medium rounded-xl transition-all border border-white/20 backdrop-blur-sm flex justify-center w-full sm:w-auto">
                                    Contact Us
                                </Link>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
        </div>
    );
};

export default About;
