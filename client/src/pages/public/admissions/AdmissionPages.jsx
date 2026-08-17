import React, { useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { ChevronRight, ArrowRight, Phone, Mail, ExternalLink, Calendar as CalendarIcon, CheckSquare, Clock, GraduationCap, BookOpen, CheckCircle2, Check, MapPin } from 'lucide-react';
import { admissionConfig } from './admissionConfig';

const Layout = ({ title, subtitle, children }) => {
    useEffect(() => {
        window.scrollTo({ top: 0, behavior: 'instant' });
    }, []);

    return (
        <div className="bg-[#F8FAFC] min-h-screen font-sans pb-24">
            {/* Header Hero */}
            <section className="bg-[#0f172a] text-white pt-16 pb-24 relative overflow-hidden">
                {/* Subtle Background Pattern */}
                <div className="absolute inset-0 opacity-[0.03] pointer-events-none" style={{ backgroundImage: 'radial-gradient(circle at 2px 2px, white 1px, transparent 0)', backgroundSize: '32px 32px' }}></div>

                <div className="max-w-[1280px] mx-auto px-6 lg:px-10 relative z-10 flex flex-col lg:flex-row items-center justify-between gap-12">
                    <div className="lg:w-3/5 w-full">
                        <nav className="flex items-center text-xs font-semibold tracking-wide text-slate-400 mb-8 uppercase">
                            <Link to="/" className="hover:text-white transition-colors">Home</Link>
                            <ChevronRight size={14} className="mx-2 opacity-50" />
                            <Link to="/admissions" className="hover:text-white transition-colors">Admissions</Link>
                            {title !== admissionConfig.overview.title && (
                                <>
                                    <ChevronRight size={14} className="mx-2 opacity-50" />
                                    <span className="text-white">{title}</span>
                                </>
                            )}
                        </nav>

                        <div className="inline-flex items-center gap-2 px-3 py-1 bg-white/5 border border-white/10 rounded-full text-blue-300 text-xs font-bold tracking-wider mb-6">
                            ADMISSIONS &bull; 2026–27
                        </div>

                        <h1 className="text-4xl lg:text-5xl font-extrabold mb-5 tracking-tight">{title}</h1>
                        <p className="text-lg text-slate-300 max-w-2xl leading-relaxed">
                            {subtitle}
                            {title === admissionConfig.overview.title && (
                                <span className="block mt-2 text-slate-400">Guidance, requirements, important dates and college information — all in one place.</span>
                            )}
                        </p>
                    </div>

                    {/* Right side Abstract Academic Visual */}
                    <div className="hidden lg:block lg:w-2/5 relative">
                        <div className="absolute right-0 top-1/2 -translate-y-[50%] w-[400px] h-[400px]">
                            {/* Abstract Geometric Academic Illustration */}
                            <svg viewBox="0 0 400 400" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-full h-full opacity-60">
                                <circle cx="200" cy="200" r="180" stroke="#1e293b" strokeWidth="2" strokeDasharray="4 8" />
                                <circle cx="200" cy="200" r="140" stroke="#334155" strokeWidth="1" />
                                <path d="M120 200 L200 120 L280 200 L200 280 Z" stroke="#3b82f6" strokeWidth="2" fill="rgba(59, 130, 246, 0.1)" strokeLinejoin="round" />
                                <rect x="170" y="170" width="60" height="60" rx="8" stroke="#94a3b8" strokeWidth="2" transform="rotate(45 200 200)" />
                                <circle cx="200" cy="200" r="8" fill="#60a5fa" />
                            </svg>
                        </div>
                    </div>
                </div>
            </section>

            <main className="max-w-[1280px] mx-auto px-6 lg:px-10 -mt-10 relative z-20">
                <div className="bg-white rounded-[24px] p-8 lg:p-12 border border-[#E2E8F0] shadow-[0_4px_20px_rgba(15,23,42,0.03)]">
                    {children}
                </div>
            </main>

            {/* Global Admissions Footer CTA Banner */}
            <div className="max-w-[1280px] mx-auto px-6 lg:px-10 mt-16">
                <div className="bg-[#0f172a] rounded-[24px] p-8 md:p-12 shadow-[0_12px_40px_rgba(15,23,42,0.12)] relative overflow-hidden border border-slate-800 flex flex-col md:flex-row items-center justify-between gap-8">
                    {/* Decorative Elements */}
                    <div className="absolute inset-0 opacity-[0.03] pointer-events-none" style={{ backgroundImage: 'radial-gradient(circle at 2px 2px, white 1px, transparent 0)', backgroundSize: '24px 24px' }}></div>
                    <div className="absolute top-0 right-0 w-[400px] h-[400px] bg-blue-600 rounded-full blur-[100px] transform translate-x-1/2 -translate-y-1/2 opacity-15 pointer-events-none"></div>

                    <div className="relative z-10 text-center md:text-left flex-1 flex gap-6 items-start">
                        <div className="hidden md:flex w-14 h-14 rounded-2xl bg-slate-800 border border-slate-700 items-center justify-center shrink-0">
                            <Phone className="text-blue-400" size={24} />
                        </div>
                        <div>
                            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-slate-800 text-slate-300 text-[11px] font-bold tracking-widest uppercase mb-4 border border-slate-700">
                                <span className="w-1.5 h-1.5 rounded-full bg-blue-400 animate-pulse"></span>
                                Admission Support
                            </div>
                            <h3 className="text-2xl md:text-3xl font-extrabold text-white mb-3 tracking-tight">Need Help With Your Admission?</h3>
                            <p className="text-slate-400 text-sm md:text-base max-w-lg mx-auto md:mx-0 leading-relaxed">
                                Our admission office is available to assist students and parents with admission information, documents and eligibility-queries.
                            </p>
                        </div>
                    </div>

                    <div className="relative z-10 flex flex-col sm:flex-row gap-4 w-full md:w-auto shrink-0">
                        <Link to="/admissions/contact" className="px-7 py-3.5 bg-blue-600 hover:bg-blue-500 text-white font-bold rounded-xl transition-all shadow-[0_0_20px_rgba(37,99,235,0.2)] hover:shadow-[0_0_30px_rgba(37,99,235,0.4)] flex items-center justify-center gap-2">
                            Contact Admission Office
                        </Link>
                        <Link to="/admissions/faqs" className="px-7 py-3.5 bg-slate-800 hover:bg-slate-700 text-white font-semibold rounded-xl transition-all border border-slate-700 flex items-center justify-center">
                            View FAQs
                        </Link>
                    </div>
                </div>
            </div>
        </div>
    );
};

export const AdmissionsOverview = () => (
    <Layout title={admissionConfig.overview.title} subtitle={admissionConfig.overview.subtitle}>
        <div className="mb-10 text-center max-w-2xl mx-auto">
            <h2 className="text-2xl md:text-3xl font-extrabold text-[#0f172a] mb-3 tracking-tight">Everything You Need for Admission</h2>
            <p className="text-[#64748B] text-base">Access essential admission information, requirements and guidance for the academic year {admissionConfig.institute.academicYear}.</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {admissionConfig.overview.cards.map((card, i) => {
                const isFeatured = card.id === '11';
                return (
                    <Link key={i} to={card.path} className={`p-8 rounded-[18px] border transition-all duration-250 group relative hover:-translate-y-1 block ${isFeatured
                        ? 'bg-[#F8FAFF] border-blue-200 hover:shadow-[0_12px_32px_rgba(37,99,235,0.12)]'
                        : 'bg-white border-[#E2E8F0] shadow-[0_4px_20px_rgba(15,23,42,0.02)] hover:shadow-[0_12px_32px_rgba(15,23,42,0.08)]'
                        }`}>
                        {isFeatured && (
                            <div className="absolute top-6 right-6 px-2.5 py-1 bg-blue-100 text-blue-700 text-[10px] font-bold uppercase tracking-widest rounded-full">
                                FYJC
                            </div>
                        )}
                        <div className={`w-[44px] h-[44px] rounded-xl flex items-center justify-center mb-6 transition-colors duration-250 ${isFeatured ? 'bg-blue-600 text-white shadow-md' : 'bg-[#F1F5F9] text-[#0f172a] group-hover:bg-blue-50 group-hover:text-blue-600'
                            }`}>
                            <card.icon size={20} strokeWidth={2.5} />
                        </div>
                        <h3 className="font-bold text-[#0f172a] text-[17px] mb-2">{card.title}</h3>
                        <p className={`text-sm mb-6 ${isFeatured ? 'text-blue-900/70' : 'text-[#64748B]'}`}>{card.desc}</p>

                        <div className={`text-sm font-bold flex items-center transition-all duration-250 ${isFeatured ? 'text-blue-600' : 'text-slate-400 group-hover:text-blue-600'
                            }`}>
                            {isFeatured ? 'Explore Admission' : 'View Details'}
                            <ArrowRight size={16} className="ml-1 opacity-0 -translate-x-2 transition-all duration-250 group-hover:opacity-100 group-hover:translate-x-1" />
                        </div>
                    </Link>
                );
            })}
        </div>

        <div className="mt-16 p-10 md:p-12 bg-[#0f172a] text-white rounded-[24px] border border-[#1e293b] text-center shadow-[0_16px_48px_rgba(15,23,42,0.15)] relative overflow-hidden">
            {/* Subtle Line Pattern */}
            <div className="absolute inset-0 opacity-10 pointer-events-none" style={{ backgroundImage: 'linear-gradient(#334155 1px, transparent 1px), linear-gradient(90deg, #334155 1px, transparent 1px)', backgroundSize: '40px 40px' }}></div>

            <div className="relative z-10">
                <h3 className="text-2xl md:text-[28px] font-extrabold mb-4 tracking-tight text-white">Ready to Begin Your Admission Journey?</h3>
                <p className="text-slate-400 mb-8 text-base max-w-xl mx-auto leading-relaxed">
                    Find the right admission information, understand the requirements and get assistance from the college office.
                </p>
                <div className="flex flex-col sm:flex-row justify-center gap-4">
                    <Link to="/admissions/class-11" className="px-7 py-3.5 bg-blue-600 font-bold text-white rounded-xl transition-all hover:bg-blue-500 hover:shadow-[0_0_25px_rgba(37,99,235,0.4)] flex items-center justify-center gap-2">
                        View Class 11 Admission Info <ArrowRight size={18} />
                    </Link>
                    <Link to="/admissions/contact" className="px-7 py-3.5 bg-white/5 hover:bg-white/10 text-white font-semibold rounded-xl transition-all border border-white/10 flex items-center justify-center">
                        Contact Admission Office
                    </Link>
                </div>
            </div>
        </div>
    </Layout>
);

export const Class11Admission = () => (
    <Layout title={admissionConfig.class11.title} subtitle={admissionConfig.class11.badge}>
        <section className="prose prose-slate max-w-none">
            <h3 className="text-xl font-bold text-[#0f172a] mb-4">Introduction</h3>
            <p className="text-slate-600 leading-relaxed mb-8">{admissionConfig.class11.intro}</p>

            <h3 className="text-xl font-bold text-[#0f172a] mb-6">Admission Pathway</h3>
            <div className="flex flex-col gap-4 mb-12">
                {admissionConfig.class11.pathway.map((step, idx) => (
                    <div key={idx} className="flex gap-4 items-center">
                        <div className="w-8 h-8 rounded-full bg-blue-100 text-blue-600 font-bold flex items-center justify-center shrink-0">
                            {idx + 1}
                        </div>
                        <div className="font-medium text-slate-700 bg-slate-50 pl-4 py-3 pr-8 rounded-xl border border-slate-100 flex-1 relative">
                            {step}
                            {idx !== admissionConfig.class11.pathway.length - 1 && (
                                <div className="absolute top-full left-1/2 -ml-0.5 w-[2px] h-6 bg-blue-100 mt-1 sm:hidden"></div>
                            )}
                        </div>
                    </div>
                ))}
            </div>

            <div className="bg-yellow-50 border border-yellow-200 p-6 rounded-2xl relative overflow-hidden">
                <div className="absolute top-0 right-0 w-24 h-24 bg-yellow-400 opacity-10 rounded-bl-[100px]"></div>
                <h4 className="font-bold text-yellow-800 text-lg mb-2 relative z-10 flex items-center gap-2">
                    Official Std. 11 Admission Process
                </h4>
                <p className="text-yellow-800/80 mb-6 relative z-10 max-w-2xl">
                    For students applying for Class 11, please follow the applicable official Maharashtra FYJC admission process and instructions strictly.
                </p>
                <a href={admissionConfig.class11.externalPortal} target="_blank" rel="noopener noreferrer"
                    className="flex relative z-10 items-center justify-center gap-2 px-6 py-3 bg-yellow-500 hover:bg-yellow-400 text-white font-bold rounded-xl transition-all shadow-sm w-full sm:w-auto">
                    Visit Official Admission Portal <ExternalLink size={18} />
                </a>
            </div>
        </section>
    </Layout>
);

export const Class12Continuation = () => (
    <Layout title={admissionConfig.class12.title} subtitle="Information for existing Class 11 students progressing to Class 12.">
        <section className="prose prose-slate max-w-none">
            <h3 className="text-xl font-bold text-[#0f172a] mb-6">Continuation Policy & Academic Progress</h3>
            <div className="space-y-4 mb-8">
                {admissionConfig.class12.rules.map((rule, idx) => (
                    <div key={idx} className="flex gap-4 p-4 rounded-xl border border-slate-100 bg-slate-50">
                        <CheckSquare size={20} className="text-indigo-500 shrink-0 mt-0.5" />
                        <span className="text-slate-700">{rule}</span>
                    </div>
                ))}
            </div>

            <div className="bg-slate-900 border border-slate-800 text-white p-6 rounded-2xl">
                <h4 className="font-bold mb-2 text-indigo-300">Office Instructions</h4>
                <p className="text-slate-400 text-sm mb-4">Please collect the continuation forms from the college office during the designated dates matching your standard division timing.</p>
                <Link to="/admissions/contact" className="text-sm font-semibold text-white underline decoration-white/30 underline-offset-4 hover:decoration-white transition-all">
                    Contact Office Details
                </Link>
            </div>
        </section>
    </Layout>
);

export const AdmissionProcess = () => (
    <Layout title="Admission Process" subtitle="Detailed step-by-step guidance for admissions.">
        <div className="relative pt-4">
            <div className="hidden sm:block absolute left-8 top-8 bottom-8 w-px bg-slate-200"></div>

            <div className="space-y-8 relative">
                {admissionConfig.processSteps.map((step, idx) => (
                    <div key={idx} className="flex flex-col sm:flex-row gap-4 sm:gap-8 group">
                        <div className="w-16 h-16 rounded-full bg-white border-2 border-slate-200 flex items-center justify-center shrink-0 z-10 font-bold text-slate-500 group-hover:border-blue-500 group-hover:bg-blue-50 group-hover:text-blue-600 transition-all shadow-sm">
                            {String(idx + 1).padStart(2, '0')}
                        </div>
                        <div className="pt-2 sm:pt-4">
                            <h4 className="text-xl font-bold text-slate-800 mb-2">{step.title}</h4>
                            <p className="text-slate-600 leading-relaxed">{step.desc}</p>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    </Layout>
);

export const Eligibility = () => (
    <Layout title="Eligibility & Requirements" subtitle="Check the academic and baseline requirements for admission.">
        <div className="grid md:grid-cols-2 gap-8">
            <div className="bg-slate-50 border border-slate-200 p-8 rounded-2xl">
                <div className="inline-block p-3 rounded-lg bg-blue-100 text-blue-600 mb-6">
                    <GraduationCap size={24} />
                </div>
                <h3 className="text-2xl font-extrabold text-[#0f172a] mb-6">Class 11th Requirements</h3>
                <ul className="space-y-4">
                    {admissionConfig.eligibility.class11.map((item, idx) => (
                        <li key={idx} className="flex gap-3 text-slate-600">
                            <CheckCircle2 size={20} className="text-blue-500 shrink-0 mt-0.5" />
                            <span>{item}</span>
                        </li>
                    ))}
                </ul>
            </div>

            <div className="bg-slate-50 border border-slate-200 p-8 rounded-2xl">
                <div className="inline-block p-3 rounded-lg bg-indigo-100 text-indigo-600 mb-6">
                    <BookOpen size={24} />
                </div>
                <h3 className="text-2xl font-extrabold text-[#0f172a] mb-6">Class 12th Requirements</h3>
                <ul className="space-y-4">
                    {admissionConfig.eligibility.class12.map((item, idx) => (
                        <li key={idx} className="flex gap-3 text-slate-600">
                            <CheckCircle2 size={20} className="text-indigo-500 shrink-0 mt-0.5" />
                            <span>{item}</span>
                        </li>
                    ))}
                </ul>
            </div>
        </div>
    </Layout>
);

export const DocumentsRequired = () => (
    <Layout title="Documents Required" subtitle="Mandatory lists of required paperwork for submission.">
        <div className="space-y-8">
            <div>
                <h3 className="text-xl font-bold text-[#0f172a] mb-6 flex items-center gap-2">
                    <div className="w-1.5 h-6 bg-blue-500 rounded-sm"></div> General Documents
                </h3>
                <div className="grid sm:grid-cols-2 gap-4">
                    {admissionConfig.documents.general.map((doc, idx) => (
                        <div key={idx} className="flex items-center justify-between p-4 bg-slate-50 border border-slate-200 rounded-xl">
                            <span className="font-medium text-slate-700">{doc.name}</span>
                            <span className="text-xs bg-slate-800 text-white px-2 py-1 flex items-center gap-1 rounded font-bold uppercase tracking-wider">
                                <Check size={12} /> Required
                            </span>
                        </div>
                    ))}
                </div>
            </div>

            <div>
                <h3 className="text-xl font-bold text-[#0f172a] mb-6 flex items-center gap-2">
                    <div className="w-1.5 h-6 bg-orange-500 rounded-sm"></div> Category / Reservation (If Applicable)
                </h3>
                <div className="grid sm:grid-cols-2 gap-4">
                    {admissionConfig.documents.category.map((doc, idx) => (
                        <div key={idx} className="flex items-center justify-between p-4 bg-orange-50/50 border border-orange-100 rounded-xl">
                            <span className="font-medium text-slate-700">{doc.name}</span>
                            <span className="text-xs bg-orange-100 text-orange-700 border border-orange-200 px-2 py-1 flex items-center gap-1 rounded font-semibold uppercase tracking-wider">
                                ○ If Applicable
                            </span>
                        </div>
                    ))}
                </div>
            </div>

            <div>
                <h3 className="text-xl font-bold text-[#0f172a] mb-6 flex items-center gap-2">
                    <div className="w-1.5 h-6 bg-indigo-500 rounded-sm"></div> College-Specific Forms
                </h3>
                <div className="grid sm:grid-cols-2 gap-4">
                    {admissionConfig.documents.college.map((doc, idx) => (
                        <div key={idx} className="flex items-center justify-between p-4 bg-slate-50 border border-slate-200 rounded-xl">
                            <span className="font-medium text-slate-700">{doc.name}</span>
                            <span className="text-xs bg-slate-800 text-white px-2 py-1 flex items-center gap-1 rounded font-bold uppercase tracking-wider">
                                <Check size={12} /> Required
                            </span>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    </Layout>
);

export const ImportantDates = () => (
    <Layout title="Important Dates" subtitle={`Academic Year ${admissionConfig.institute.academicYear}`}>
        <div className="max-w-3xl mx-auto">
            {admissionConfig.dates.map((dateItem, idx) => (
                <div key={idx} className="flex gap-4 sm:gap-6 mb-6 group relative">
                    {/* Line connection */}
                    {idx !== admissionConfig.dates.length - 1 && (
                        <div className="absolute left-[23px] sm:left-[27px] top-[50px] bottom-[-24px] w-px bg-slate-100 group-hover:bg-blue-200 transition-colors"></div>
                    )}

                    <div className="w-12 h-12 sm:w-14 sm:h-14 rounded-2xl bg-slate-50 border border-slate-200 flex items-center justify-center shrink-0 text-slate-400 group-hover:border-blue-500 group-hover:text-blue-500 group-hover:bg-blue-50 transition-colors z-10 shadow-sm relative">
                        <Clock size={24} />
                    </div>

                    <div className="bg-white border border-slate-100 rounded-2xl p-5 flex-1 shadow-sm group-hover:shadow-md transition-shadow group-hover:border-blue-100">
                        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 mb-2">
                            <h4 className="text-lg font-bold text-slate-800">{dateItem.event}</h4>
                            <span className="inline-block px-2.5 py-1 bg-slate-100 text-slate-600 text-xs font-semibold uppercase tracking-wider rounded-md border border-slate-200 rounded shrink-0">
                                {dateItem.status}
                            </span>
                        </div>
                        <p className="text-slate-500 flex items-center gap-2">
                            <CalendarIcon size={16} className="text-slate-400" />
                            {dateItem.date}
                        </p>
                    </div>
                </div>
            ))}
        </div>
    </Layout>
);

export const FeesPayment = () => (
    <Layout title="Fees & Payment" subtitle="Applicable fee structures and details.">
        <div className="bg-blue-50 border border-blue-200 p-6 rounded-xl mb-8 flex items-start gap-4">
            <Clock size={24} className="text-blue-600 shrink-0 mt-0.5" />
            <p className="text-blue-900 font-medium">{admissionConfig.fees.note}</p>
        </div>

        <div className="grid md:grid-cols-2 gap-6">
            {admissionConfig.fees.sections.map((sec, idx) => (
                <div key={idx} className="border border-slate-200 bg-white shadow-sm p-6 rounded-2xl">
                    <h4 className="font-bold text-xl text-slate-800 mb-2 border-b border-slate-100 pb-4">{sec.name}</h4>
                    <p className="text-slate-600 mt-4 leading-relaxed bg-slate-50 p-4 rounded-xl text-sm">{sec.details}</p>
                </div>
            ))}
        </div>
    </Layout>
);

export const FAQs = () => {
    const [openIdx, setOpenIdx] = React.useState(0);
    return (
        <Layout title="Admission FAQs" subtitle="Common questions regarding the admission process.">
            <div className="space-y-4 max-w-3xl mx-auto">
                {admissionConfig.faqs.map((faq, idx) => {
                    const isOpen = openIdx === idx;
                    return (
                        <div key={idx} className={`border rounded-xl overflow-hidden transition-all duration-200 ${isOpen ? 'border-blue-400 bg-blue-50/30 shadow-md ring-2 ring-blue-100' : 'border-slate-200 bg-white hover:border-slate-300'}`}>
                            <button
                                onClick={() => setOpenIdx(isOpen ? -1 : idx)}
                                className="w-full text-left p-5 flex items-center justify-between gap-4 focus:outline-none"
                            >
                                <span className={`font-semibold text-lg ${isOpen ? 'text-blue-900' : 'text-slate-700'}`}>{faq.q}</span>
                                <ChevronRight size={20} className={`shrink-0 transition-transform ${isOpen ? 'rotate-90 text-blue-500' : 'text-slate-400'}`} />
                            </button>
                            <div
                                className={`overflow-hidden transition-all duration-300 ease-in-out ${isOpen ? 'max-h-[500px] opacity-100' : 'max-h-0 opacity-0'}`}
                            >
                                <div className="p-5 pt-0 text-slate-600 leading-relaxed border-t border-slate-100">
                                    {faq.a}
                                </div>
                            </div>
                        </div>
                    );
                })}
            </div>
        </Layout>
    );
};

export const ContactAdmission = () => (
    <Layout title="Contact Admission Office" subtitle="Get assistance for your admissions queries.">
        <div className="bg-[#0f172a] text-white rounded-[2rem] p-10 md:p-14 relative overflow-hidden shadow-2xl">
            <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-blue-500 rounded-full blur-[100px] transform translate-x-1/2 -translate-y-1/2 opacity-20 pointer-events-none"></div>

            <div className="relative z-10 md:w-2/3">
                <span className="inline-flex px-3 py-1 bg-white/10 border border-white/20 text-blue-200 rounded-full text-sm font-semibold uppercase tracking-wider mb-8">
                    Admission Office
                </span>

                <h3 className="text-3xl font-bold mb-8">Raul Daultsinhji Multipurpose High School <br /><span className="text-slate-400 font-medium text-2xl mt-2 block">&amp; Jr. College of Science</span></h3>

                <div className="space-y-6">
                    <div className="flex items-start gap-4">
                        <MapPin size={24} className="text-blue-400 shrink-0 mt-1" />
                        <div>
                            <p className="font-semibold text-lg text-slate-200">Location</p>
                            <p className="text-slate-400 mt-1 leading-relaxed">Dondaicha, Dist. Dhule, Maharashtra</p>
                        </div>
                    </div>
                    <div className="flex items-center gap-4">
                        <Phone size={24} className="text-blue-400 shrink-0" />
                        <div>
                            <p className="font-semibold text-lg text-slate-200">Phone</p>
                            <p className="text-slate-400 mt-1">{admissionConfig.institute.contactPhone}</p>
                        </div>
                    </div>
                    <div className="flex items-center gap-4">
                        <Mail size={24} className="text-blue-400 shrink-0" />
                        <div>
                            <p className="font-semibold text-lg text-slate-200">Email</p>
                            <p className="text-slate-400 mt-1">{admissionConfig.institute.contactEmail}</p>
                        </div>
                    </div>
                </div>

                <div className="mt-12 pt-10 border-t border-slate-700">
                    <Link to="/contact" className="flex justify-center items-center gap-2 px-8 py-4 bg-blue-600 hover:bg-blue-500 transition-colors rounded-xl font-bold text-lg w-full sm:w-auto sm:inline-flex">
                        Go to Main Contact Page <ArrowRight size={20} />
                    </Link>
                </div>
            </div>
        </div>
    </Layout>
);
