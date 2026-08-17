import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import {
    ChevronRight, BookOpen, Clock, AlertCircle,
    Calendar, CheckCircle2, ChevronDown, Download, Lock, FileCheck
} from 'lucide-react';
import { academicConfig } from './academicConfig';

// --- Shared Academic Layout Wrapper ---
const AcademicLayout = ({ title, subtitle, children }) => {
    const location = useLocation();

    // Scroll to top on mount
    React.useEffect(() => {
        window.scrollTo({ top: 0, behavior: 'instant' });
    }, [location.pathname]);

    return (
        <div className="bg-slate-50 min-h-screen text-slate-800 font-sans pb-24">
            {/* Header Hero */}
            <div className="bg-[#0f172a] text-white pt-12 pb-20 px-6 lg:px-8 relative overflow-hidden">
                <div className="absolute inset-0 opacity-10 pointer-events-none">
                    <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-indigo-500 rounded-full blur-[120px] transform translate-x-1/3 -translate-y-1/3"></div>
                    <div className="absolute bottom-0 left-0 w-[400px] h-[400px] bg-blue-500 rounded-full blur-[100px] transform -translate-x-1/3 translate-y-1/3"></div>
                </div>

                <div className="max-w-[1280px] mx-auto relative z-10">
                    <nav className="flex items-center text-sm font-medium text-slate-300 mb-6 opacity-90 overflow-x-auto whitespace-nowrap pb-2">
                        <Link to="/" className="hover:text-white transition-colors">Home</Link>
                        <ChevronRight size={16} className="mx-2 opacity-50 shrink-0" />
                        <Link to="/academics" className="hover:text-white transition-colors">Academics</Link>
                        {location.pathname !== '/academics' && (
                            <>
                                <ChevronRight size={16} className="mx-2 opacity-50 shrink-0" />
                                <span className="text-white font-semibold">{title}</span>
                            </>
                        )}
                    </nav>

                    <h1 className="text-3xl lg:text-4xl font-extrabold mb-4">{title}</h1>
                    <p className="text-slate-300 max-w-2xl text-lg leading-relaxed">
                        {subtitle}
                    </p>
                </div>
            </div>

            {/* Main Content Area */}
            <main className="max-w-[1280px] mx-auto px-6 lg:px-10 -mt-10 relative z-20">
                <div className="bg-white rounded-[24px] p-8 lg:p-12 border border-slate-200 shadow-xl shadow-slate-200/20">
                    {children}
                </div>
            </main>
        </div>
    );
};

// --- Page Components ---

export const AcademicOverview = () => (
    <AcademicLayout title="Academic Overview" subtitle="Discover how academic life is structured at our institution.">
        <div className="max-w-4xl mx-auto">
            <h2 className="text-2xl font-bold text-slate-900 mb-6">{academicConfig.overview.title}</h2>

            <div className="prose prose-slate max-w-none mb-12 text-slate-600 leading-relaxed space-y-4">
                {academicConfig.overview.content.split('\n\n').map((para, i) => (
                    <p key={i}>{para}</p>
                ))}
            </div>

            <div className="grid md:grid-cols-2 gap-8">
                {['class11', 'class12'].map((key) => (
                    <div key={key} className="bg-slate-50 border border-slate-200 p-8 rounded-2xl group hover:border-blue-300 transition-colors">
                        <h3 className="text-xl font-bold text-slate-900 mb-3">{academicConfig.classes[key].title}</h3>
                        <p className="text-slate-600 mb-6 text-sm leading-relaxed">{academicConfig.classes[key].intro}</p>
                        <Link to={`/academics/class-${key === 'class11' ? '11' : '12'}`} className="inline-flex items-center text-blue-600 font-semibold group-hover:text-blue-700">
                            Explore {key === 'class11' ? 'Class 11' : 'Class 12'} Information <ChevronRight size={16} className="ml-1" />
                        </Link>
                    </div>
                ))}
            </div>
        </div>
    </AcademicLayout>
);

export const Class11Academics = () => (
    <AcademicLayout title="Class 11th Academics" subtitle="Information and guidelines for Class 11th students.">
        <div className="max-w-4xl mx-auto">
            <h2 className="text-2xl font-bold text-slate-900 mb-4">Class 11 Overview</h2>
            <p className="text-slate-600 leading-relaxed mb-10">{academicConfig.classes.class11.intro}</p>

            <h3 className="text-xl font-bold text-slate-900 mb-6">Important Guidelines</h3>
            <ul className="space-y-4 mb-10">
                {academicConfig.classes.class11.guidelines.map((guide, i) => (
                    <li key={i} className="flex gap-3 text-slate-700 bg-slate-50 p-4 rounded-xl border border-slate-100">
                        <CheckCircle2 size={20} className="text-blue-500 shrink-0 mt-0.5" />
                        {guide}
                    </li>
                ))}
            </ul>

            <div className="bg-indigo-50 border border-indigo-100 p-6 rounded-2xl flex gap-4">
                <BookOpen size={24} className="text-indigo-600 shrink-0 mt-1" />
                <div>
                    <h4 className="font-bold text-indigo-900 mb-2">Syllabus Information</h4>
                    <p className="text-indigo-800/80 text-sm leading-relaxed">{academicConfig.subjects.placeholder}</p>
                </div>
            </div>
        </div>
    </AcademicLayout>
);

export const Class12Academics = () => (
    <AcademicLayout title="Class 12th Academics" subtitle="Board examination rules and crucial academic protocols for Class 12th.">
        <div className="max-w-4xl mx-auto">
            <h2 className="text-2xl font-bold text-slate-900 mb-4">Class 12 Board Preparation</h2>
            <p className="text-slate-600 leading-relaxed mb-10">{academicConfig.classes.class12.intro}</p>

            <h3 className="text-xl font-bold text-slate-900 mb-6">Mandatory Academic Guidelines</h3>
            <ul className="space-y-4 mb-10">
                {academicConfig.classes.class12.guidelines.map((guide, i) => (
                    <li key={i} className="flex gap-3 text-slate-700 bg-slate-50 p-4 rounded-xl border border-slate-100">
                        <AlertCircle size={20} className="text-red-500 shrink-0 mt-0.5" />
                        {guide}
                    </li>
                ))}
            </ul>

            <div className="bg-blue-900 text-white p-8 rounded-2xl">
                <h4 className="font-bold text-xl mb-4 text-blue-300">Examination Focus</h4>
                <p className="text-slate-300 leading-relaxed">
                    Class 12 students are expected to clear all internal exams and submit valid practical journals to be eligible for board examinations.
                    Keep track of updates via the Academic Notices board.
                </p>
                <div className="mt-6 flex flex-col sm:flex-row gap-4">
                    <Link to="/academics/examinations" className="bg-blue-600 hover:bg-blue-500 text-white px-6 py-2.5 rounded-lg font-semibold inline-flex items-center justify-center transition-colors">
                        View Examination Rules
                    </Link>
                </div>
            </div>
        </div>
    </AcademicLayout>
);

export const SubjectsCurriculum = () => (
    <AcademicLayout title="Subjects & Curriculum" subtitle="Details of available subjects and the approved board syllabus.">
        <div className="text-center py-16 px-4">
            <div className="w-20 h-20 bg-slate-100 text-slate-400 rounded-full flex items-center justify-center mx-auto mb-6">
                <BookOpen size={36} />
            </div>
            <h2 className="text-2xl font-bold text-slate-800 mb-4">Curriculum Database Setup</h2>
            <p className="text-slate-500 max-w-lg mx-auto mb-8">
                {academicConfig.subjects.placeholder}
            </p>
            <div className="inline-flex items-center gap-2 bg-blue-50 text-blue-700 px-4 py-2 rounded-lg font-medium text-sm">
                Subject details will be populated by administration.
            </div>
        </div>
    </AcademicLayout>
);

export const AcademicCalendar = () => (
    <AcademicLayout title="Academic Calendar" subtitle="Key dates and events for the current academic year.">
        <div className="max-w-4xl mx-auto">
            <div className="bg-yellow-50 text-yellow-800 text-sm p-4 rounded-xl mb-8 flex gap-3 border border-yellow-200">
                <AlertCircle size={20} className="shrink-0" />
                <p>{academicConfig.calendar.note}</p>
            </div>

            <div className="space-y-4 relative before:absolute before:inset-0 before:ml-5 before:-translate-x-px md:before:mx-auto md:before:translate-x-0 before:h-full before:w-0.5 before:bg-gradient-to-b before:from-transparent before:via-slate-200 before:to-transparent">
                {academicConfig.calendar.events.map((event, idx) => (
                    <div key={idx} className="relative flex items-center justify-between md:justify-normal md:odd:flex-row-reverse group">
                        <div className="flex items-center justify-center w-10 h-10 rounded-full border-4 border-white bg-blue-100 text-blue-600 z-10 shrink-0 md:order-1 md:group-odd:-translate-x-1/2 md:group-even:translate-x-1/2 shadow-sm">
                            <Calendar size={16} />
                        </div>
                        <div className="w-[calc(100%-3rem)] md:w-[calc(50%-2.5rem)] bg-slate-50 border border-slate-200 p-5 rounded-2xl shadow-sm hover:border-blue-300 transition-colors">
                            <h4 className="font-bold text-slate-800 text-lg mb-1">{event.type}</h4>
                            <p className="text-blue-600 font-semibold text-sm">{event.date}</p>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    </AcademicLayout>
);

export const ClassTimetable = () => (
    <AcademicLayout title="Class Timetable" subtitle="Daily lecture schedule and period timings.">
        <div className="text-center py-20 px-4 border-2 border-dashed border-slate-200 rounded-3xl bg-slate-50/50">
            <div className="w-16 h-16 bg-blue-100 text-blue-500 rounded-2xl flex items-center justify-center mx-auto mb-6 transform rotate-3">
                <Clock size={32} />
            </div>
            <h2 className="text-2xl font-bold text-slate-800 mb-4">Timetable Integration</h2>
            <p className="text-slate-500 max-w-md mx-auto mb-8 leading-relaxed">
                {academicConfig.timetable.note}
            </p>
            <Link to="/login" className="bg-slate-900 text-white px-6 py-2.5 rounded-xl font-semibold inline-flex items-center gap-2 hover:bg-slate-800 transition-colors">
                <Lock size={16} /> Login to Student Portal
            </Link>
        </div>
    </AcademicLayout>
);

export const Examinations = () => (
    <AcademicLayout title="Examinations & Assessments" subtitle="Information regarding internal tests and final exams.">
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {academicConfig.examinations.types.map((exam, idx) => (
                <div key={idx} className="bg-white border border-slate-200 shadow-sm p-6 rounded-2xl hover:shadow-lg transition-all hover:-translate-y-1 group">
                    <div className="w-12 h-12 bg-indigo-50 text-indigo-600 rounded-xl flex items-center justify-center mb-6 group-hover:bg-indigo-600 group-hover:text-white transition-colors">
                        <FileCheck size={24} />
                    </div>
                    <h3 className="text-xl font-bold text-slate-800 mb-2">{exam.name}</h3>
                    <p className="text-slate-600 text-sm leading-relaxed">{exam.desc}</p>
                </div>
            ))}
        </div>

        <div className="mt-12 bg-slate-50 border border-slate-200 p-8 rounded-2xl">
            <h3 className="text-xl font-bold text-slate-900 mb-4 flex items-center gap-2">
                <AlertCircle className="text-blue-500" /> Exam Regulations
            </h3>
            <p className="text-slate-600 mb-4">Students must carry their valid ID cards during all examinations. Use of unfair means is strictly dealt with according to board regulations.</p>
            <p className="text-slate-600">The detailed subject-wise schedule for each examination is released 2-3 weeks prior to commencement.</p>
        </div>
    </AcademicLayout>
);

export const ResultsMarksheets = () => (
    <AcademicLayout title="Results & Marksheets" subtitle="Check official grades and download academic marksheets.">
        <div className="max-w-2xl mx-auto bg-white rounded-3xl border border-slate-200 shadow-xl overflow-hidden p-10 text-center relative">
            <div className="absolute top-0 right-0 w-32 h-32 bg-blue-100 rounded-full blur-[50px] -translate-y-1/2 translate-x-1/2 pointer-events-none"></div>

            <Lock size={48} className="text-slate-300 mx-auto mb-6" />
            <h2 className="text-3xl font-extrabold text-slate-900 mb-4 tracking-tight">Protected Content</h2>
            <p className="text-slate-500 mb-10 text-lg">
                Marksheets and results are strictly confidential. Students must authenticate to view their personal academic records.
            </p>

            <Link to="/login" className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-8 py-4 bg-blue-600 hover:bg-blue-500 text-white font-bold rounded-xl transition-all shadow-[0_4px_14px_0_rgba(37,99,235,0.39)] hover:-translate-y-0.5">
                Login to Student Portal <ChevronRight size={18} />
            </Link>
        </div>
    </AcademicLayout>
);

export const AcademicNotices = () => {
    // Standard notice page design for academic announcements placeholder
    // Ideally this would fetch from /api/public/notices mapped specifically for academics
    return (
        <AcademicLayout title="Academic Notices" subtitle="Important updates related to schedules, exams, and curriculum.">
            <div className="max-w-3xl mx-auto">
                <div className="bg-blue-50 border border-blue-200 p-6 rounded-xl flex items-start gap-4 mb-10">
                    <AlertCircle size={24} className="text-blue-600 shrink-0 mt-0.5" />
                    <div>
                        <h4 className="font-bold text-blue-900">Official Notice Board</h4>
                        <p className="text-blue-800/80 text-sm mt-1 mb-3">All public academic announcements are routed through the institution's main notice system.</p>
                        <Link to="/notices" className="inline-flex items-center text-sm font-semibold text-blue-700 bg-white px-4 py-2 rounded-lg border border-blue-200 hover:bg-blue-100 transition-colors">
                            View All Recent Notices <ChevronRight size={16} className="ml-1" />
                        </Link>
                    </div>
                </div>

                <div className="text-center py-12 text-slate-400">
                    <p>Archived academic notices will appear here.</p>
                </div>
            </div>
        </AcademicLayout>
    );
};
