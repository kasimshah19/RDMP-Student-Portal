import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { BookOpen, GraduationCap, ArrowRight, FileText, Calendar, CheckSquare, HelpCircle, Phone, IndianRupee } from 'lucide-react';

export const ADMISSION_MENU_ITEMS = [
    {
        title: "Class 11th Admission",
        desc: "FYJC admission information",
        icon: GraduationCap,
        path: "/admissions/class-11"
    },
    {
        title: "Class 12th Continuation",
        desc: "Existing students",
        icon: BookOpen,
        path: "/admissions/class-12"
    },
    {
        title: "Admission Process",
        desc: "Step-by-step guidance",
        icon: ArrowRight,
        path: "/admissions/process"
    },
    {
        title: "Eligibility & Requirements",
        desc: "Admission requirements",
        icon: CheckSquare,
        path: "/admissions/eligibility"
    },
    {
        title: "Documents Required",
        desc: "View document checklist",
        icon: FileText,
        path: "/admissions/documents"
    },
    {
        title: "Important Dates",
        desc: "Admission schedule",
        icon: Calendar,
        path: "/admissions/dates"
    },
    {
        title: "Fees & Payment",
        desc: "Fee information",
        icon: IndianRupee,
        path: "/admissions/fees"
    },
    {
        title: "Admission FAQs",
        desc: "Common questions",
        icon: HelpCircle,
        path: "/admissions/faqs"
    },
    {
        title: "Contact Admission Office",
        desc: "Get admission assistance",
        icon: Phone,
        path: "/admissions/contact"
    }
];

const AdmissionsMegaMenu = () => {
    return (
        <div className="absolute top-full left-1/2 -translate-x-1/3 pt-4 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-300 z-50">
            <div className="bg-white rounded-2xl shadow-2xl border border-slate-100 w-[700px] overflow-hidden flex flex-col text-left cursor-default">

                {/* Header Area */}
                <div className="bg-slate-50 p-6 border-b border-slate-100 flex items-center justify-between">
                    <div>
                        <h3 className="text-xl font-extrabold text-[#0f172a] tracking-tight">ADMISSIONS</h3>
                        <p className="text-sm text-slate-500 mt-1">Admission information for students and parents</p>
                    </div>
                </div>

                {/* Links Grid */}
                <div className="p-6 grid grid-cols-2 gap-x-6 gap-y-6">
                    {ADMISSION_MENU_ITEMS.map((item, idx) => (
                        <Link key={idx} to={item.path} className="flex gap-4 p-2 -m-2 rounded-xl hover:bg-slate-50 transition-colors group/link">
                            <div className="mt-0.5 text-blue-500">
                                <item.icon size={20} />
                            </div>
                            <div>
                                <h4 className="font-bold text-slate-800 mb-0.5 group-hover/link:text-blue-600 transition-colors">{item.title}</h4>
                                <p className="text-xs text-slate-500">{item.desc}</p>
                            </div>
                        </Link>
                    ))}
                </div>

                {/* Bottom CTA */}
                <div className="bg-blue-600 p-4 mt-2">
                    <Link to="/admissions" className="flex items-center justify-between text-white hover:text-blue-100 transition-colors font-medium text-sm px-2">
                        <span>Start Admission Guidance</span>
                        <ArrowRight size={16} />
                    </Link>
                </div>
            </div>
        </div>
    );
};

export default AdmissionsMegaMenu;
