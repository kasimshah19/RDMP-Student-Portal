import React, { useEffect } from 'react';
import { Helmet } from 'react-helmet-async';
import { ShieldCheck, ChevronRight, CheckCircle2, AlertCircle, UserCheck, BookOpen } from 'lucide-react';
import { Link, useLocation } from 'react-router-dom';

export default function StudentGuidelines() {
    const location = useLocation();

    useEffect(() => {
        window.scrollTo({ top: 0, behavior: 'instant' });
    }, [location.pathname]);

    return (
        <div className="bg-slate-50 min-h-screen text-slate-800 font-sans pb-24">
            <Helmet>
                <title>Student Guidelines | RDMP Student Portal</title>
                <meta name="description" content="Official guidelines and code of conduct for students of Raul Daultsinhji Multipurpose High School & Jr. College." />
            </Helmet>

            {/* Header Hero */}
            <div className="bg-[#0f172a] text-white pt-12 pb-20 px-6 lg:px-8 relative overflow-hidden">
                <div className="absolute inset-0 opacity-10 pointer-events-none">
                    <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-teal-500 rounded-full blur-[120px] transform translate-x-1/3 -translate-y-1/3"></div>
                    <div className="absolute bottom-0 left-0 w-[400px] h-[400px] bg-emerald-500 rounded-full blur-[100px] transform -translate-x-1/3 translate-y-1/3"></div>
                </div>

                <div className="max-w-[1280px] mx-auto relative z-10">
                    <nav className="flex items-center text-sm font-medium text-slate-300 mb-6 opacity-90 overflow-x-auto whitespace-nowrap pb-2">
                        <Link to="/" className="hover:text-white transition-colors">Home</Link>
                        <ChevronRight size={16} className="mx-2 opacity-50 shrink-0" />
                        <span className="text-slate-300 cursor-default">Students</span>
                        <ChevronRight size={16} className="mx-2 opacity-50 shrink-0" />
                        <span className="text-white font-semibold">Guidelines</span>
                    </nav>

                    <h1 className="text-3xl lg:text-4xl font-extrabold mb-4 flex items-center gap-3">
                        <ShieldCheck size={36} className="text-teal-400" /> Student Guidelines
                    </h1>
                    <p className="text-slate-300 max-w-2xl text-lg leading-relaxed">
                        Official code of conduct, digital portal usage policies, and general campus instructions for enrolled students.
                    </p>
                </div>
            </div>

            {/* Main Content Area */}
            <main className="max-w-[1280px] mx-auto px-6 lg:px-10 -mt-10 relative z-20">
                <div className="bg-white rounded-[24px] p-8 lg:p-12 border border-slate-200 shadow-xl shadow-slate-200/20">

                    <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
                        {/* Attendance */}
                        <div className="bg-slate-50 border border-slate-200 rounded-2xl p-6 hover:border-teal-300 transition-colors">
                            <div className="w-12 h-12 bg-blue-100 text-blue-600 rounded-xl flex items-center justify-center mb-5">
                                <UserCheck size={24} />
                            </div>
                            <h3 className="text-xl font-bold text-slate-800 mb-3">Attendance Criteria</h3>
                            <ul className="space-y-3">
                                <li className="flex gap-2 text-slate-600 text-[15px] leading-relaxed">
                                    <CheckCircle2 size={18} className="text-teal-500 shrink-0 mt-0.5" />
                                    <span>A minimum of <strong>75% attendance</strong> is strictly mandated by the board to qualify for examinations.</span>
                                </li>
                                <li className="flex gap-2 text-slate-600 text-[15px] leading-relaxed">
                                    <CheckCircle2 size={18} className="text-teal-500 shrink-0 mt-0.5" />
                                    <span>Medical leaves must be supported by valid medical certificates submitted within 3 days.</span>
                                </li>
                            </ul>
                        </div>

                        {/* Digital Portal Usage */}
                        <div className="bg-slate-50 border border-slate-200 rounded-2xl p-6 hover:border-teal-300 transition-colors">
                            <div className="w-12 h-12 bg-amber-100 text-amber-600 rounded-xl flex items-center justify-center mb-5">
                                <ShieldCheck size={24} />
                            </div>
                            <h3 className="text-xl font-bold text-slate-800 mb-3">Digital Portal Security</h3>
                            <ul className="space-y-3">
                                <li className="flex gap-2 text-slate-600 text-[15px] leading-relaxed">
                                    <AlertCircle size={18} className="text-amber-500 shrink-0 mt-0.5" />
                                    <span>Do not share your Student Portal credentials (email and password) with anyone.</span>
                                </li>
                                <li className="flex gap-2 text-slate-600 text-[15px] leading-relaxed">
                                    <AlertCircle size={18} className="text-amber-500 shrink-0 mt-0.5" />
                                    <span>Any unauthorized modification to digital documents via the portal will lead to strict disciplinary action.</span>
                                </li>
                            </ul>
                        </div>

                        {/* Examinations */}
                        <div className="bg-slate-50 border border-slate-200 rounded-2xl p-6 hover:border-teal-300 transition-colors">
                            <div className="w-12 h-12 bg-purple-100 text-purple-600 rounded-xl flex items-center justify-center mb-5">
                                <BookOpen size={24} />
                            </div>
                            <h3 className="text-xl font-bold text-slate-800 mb-3">Examinations</h3>
                            <ul className="space-y-3">
                                <li className="flex gap-2 text-slate-600 text-[15px] leading-relaxed">
                                    <CheckCircle2 size={18} className="text-teal-500 shrink-0 mt-0.5" />
                                    <span>Identity cards are mandatory for entry into examination halls.</span>
                                </li>
                                <li className="flex gap-2 text-slate-600 text-[15px] leading-relaxed">
                                    <CheckCircle2 size={18} className="text-teal-500 shrink-0 mt-0.5" />
                                    <span>Mobile phones and smartwatches are strictly prohibited during all internal and board exams.</span>
                                </li>
                            </ul>
                        </div>
                    </div>

                    <div className="mt-12 bg-teal-50 border border-teal-100 rounded-2xl p-8 text-center max-w-3xl mx-auto">
                        <h3 className="text-lg font-bold text-teal-900 mb-3">Access Your Information</h3>
                        <p className="text-teal-800 mb-6 font-medium">To view your personal attendance, academic records, and verified documents, log in to your student dashboard.</p>
                        <Link to="/login" className="bg-teal-600 hover:bg-teal-700 text-white font-bold py-3 px-8 rounded-xl transition-colors inline-block shadow-lg shadow-teal-500/30">
                            Proceed to Student Portal
                        </Link>
                    </div>

                </div>
            </main>
        </div>
    );
}
