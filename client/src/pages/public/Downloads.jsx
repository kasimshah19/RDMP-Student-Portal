import React, { useEffect } from 'react';
import { Helmet } from 'react-helmet-async';
import { DownloadCloud, ChevronRight, FileText, Calendar, FileBadge, BookOpen, ShieldCheck } from 'lucide-react';
import { Link, useLocation } from 'react-router-dom';

const DOWNLOAD_CATEGORIES = [
    {
        title: "Admission Forms",
        icon: FileBadge,
        color: "text-amber-500",
        bgColor: "bg-amber-100",
        borderColor: "border-amber-200",
        files: [
            { name: "Common Admission Form 2026-27", desc: "For new enrollments in Junior College", size: "7.6 KB", format: "PDF", date: "May 10, 2026", url: "/downloads/Common_Admission_Form_2026_27.pdf" },
            { name: "Scholarship Application Form", desc: "Merit and category-based scholarships", size: "5.0 KB", format: "PDF", date: "Apr 22, 2026", url: "/downloads/Scholarship_Application_Form.pdf" },
            { name: "Transfer Certificate (TC) Request Form", desc: "For migrating students", size: "2.7 KB", format: "PDF", date: "Jan 15, 2026", url: "/downloads/Transfer_Certificate_Request_Form.pdf" }
        ]
    },
    {
        title: "Academic Documents",
        icon: Calendar,
        color: "text-blue-500",
        bgColor: "bg-blue-100",
        borderColor: "border-blue-200",
        files: [
            { name: "Academic Calendar 2026-27", desc: "Official schedule of events and exams", size: "2.8 KB", format: "PDF", date: "Jun 01, 2026", url: "/downloads/Academic_Calendar_2026_27.pdf" },
            { name: "Holiday List 2026", desc: "Public and institutional holidays", size: "3.0 KB", format: "PDF", date: "Jan 05, 2026", url: "/downloads/Holiday_List_2026.pdf" },
            { name: "Examination Internal Assessment Format", desc: "Grading rubrics and submission standards", size: "1.1 MB", format: "PDF", date: "Jul 10, 2026" }
        ]
    },
    {
        title: "Syllabus & Curriculum",
        icon: BookOpen,
        color: "text-purple-500",
        bgColor: "bg-purple-100",
        borderColor: "border-purple-200",
        files: [
            { name: "Class 11 Science Syllabus (HSC Board)", desc: "Physics, Chemistry, Maths, Biology", size: "3.5 MB", format: "PDF", date: "Jun 15, 2026" },
            { name: "Class 12 Science Syllabus (HSC Board)", desc: "HSC Board examination curriculum", size: "3.8 MB", format: "PDF", date: "Jun 15, 2026" },
            { name: "Practical Examination Journals Format", desc: "Standardized format for science practicals", size: "1.8 MB", format: "PDF", date: "Aug 02, 2026" }
        ]
    },
    {
        title: "Rules & Guidelines",
        icon: ShieldCheck,
        color: "text-emerald-500",
        bgColor: "bg-emerald-100",
        borderColor: "border-emerald-200",
        files: [
            { name: "Student Code of Conduct", desc: "Official behavioral policies", size: "900 KB", format: "PDF", date: "Jan 10, 2026" },
            { name: "Hostel Rules & Regulations", desc: "For boarding students", size: "1.5 MB", format: "PDF", date: "Apr 05, 2026" },
            { name: "Library Membership Form & Policy", desc: "Book circulation and fines structure", size: "600 KB", format: "PDF", date: "May 20, 2026" }
        ]
    }
];

export default function Downloads() {
    const location = useLocation();

    const handleDownload = async (e, file) => {
        e.preventDefault(); // Prevent default anchor routing to stop SPA redirects

        try {
            let blob;
            if (file.url) {
                // Fetch the actual physical file from the server
                const response = await fetch(file.url);
                if (!response.ok) throw new Error('File not found');
                blob = await response.blob();
            } else {
                // Dummy file generator bypass
                const pdfData = "%PDF-1.0\n1 0 obj<</Type/Catalog/Pages 2 0 R>>endobj 2 0 obj<</Type/Pages/Kids[3 0 R]/Count 1>>endobj 3 0 obj<</Type/Page/MediaBox[0 0 3 3]>>endobj\ntrailer<</Size 4/Root 1 0 R>>\n%%EOF";
                blob = new Blob([pdfData], { type: 'application/pdf' });
            }

            const url = URL.createObjectURL(blob);
            const a = document.createElement('a');
            a.href = url;
            a.download = file.url ? file.url.split('/').pop() : file.name.replace(/[^a-zA-Z0-9-]/g, '_') + '.pdf';

            document.body.appendChild(a);
            a.click();

            document.body.removeChild(a);
            URL.revokeObjectURL(url);
        } catch (error) {
            console.error("Error downloading file:", error);
            alert("Sorry, the document could not be downloaded right now. Please try again later.");
        }
    };

    useEffect(() => {
        window.scrollTo({ top: 0, behavior: 'instant' });
    }, [location.pathname]);

    return (
        <div className="bg-slate-50 min-h-screen text-slate-800 font-sans pb-24">
            <Helmet>
                <title>Downloads & Resources | RDMP Student Portal</title>
                <meta name="description" content="Download official admission forms, academic calendars, syllabus copies, and institutional guidelines from Raul Daultsinhji Multipurpose High School & Jr. College." />
            </Helmet>

            {/* Header Hero */}
            <div className="bg-[#0f172a] text-white pt-12 pb-20 px-6 lg:px-8 relative overflow-hidden">
                <div className="absolute inset-0 opacity-10 pointer-events-none">
                    <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-blue-500 rounded-full blur-[120px] transform translate-x-1/3 -translate-y-1/3"></div>
                    <div className="absolute bottom-0 left-0 w-[400px] h-[400px] bg-purple-500 rounded-full blur-[100px] transform -translate-x-1/3 translate-y-1/3"></div>
                </div>

                <div className="max-w-[1280px] mx-auto relative z-10">
                    <nav className="flex flex-wrap items-center text-sm font-medium text-slate-300 mb-6 opacity-90 overflow-x-auto pb-2">
                        <Link to="/" className="hover:text-white transition-colors shrink-0">Home</Link>
                        <ChevronRight size={16} className="mx-2 opacity-50 shrink-0" />
                        <span className="text-white font-semibold shrink-0">Downloads &amp; Forms</span>
                    </nav>

                    <h1 className="text-3xl lg:text-4xl font-extrabold mb-4 flex items-center gap-3">
                        <DownloadCloud size={36} className="text-blue-400" /> Downloads &amp; Resources
                    </h1>
                    <p className="text-slate-300 max-w-2xl text-lg leading-relaxed">
                        Access official institutional forms, academic calendars, curriculum structures, and policy documents securely in one place.
                    </p>
                </div>
            </div>

            {/* Main Content Area */}
            <main className="max-w-[1280px] mx-auto px-6 lg:px-10 -mt-10 relative z-20">
                <div className="bg-white rounded-[24px] p-8 lg:p-12 border border-slate-200 shadow-xl shadow-slate-200/20">

                    <div className="grid lg:grid-cols-2 gap-12">
                        {DOWNLOAD_CATEGORIES.map((category, idx) => (
                            <div key={idx} className="flex flex-col">
                                <div className="flex items-center gap-3 mb-6">
                                    <div className={`w-12 h-12 rounded-xl flex items-center justify-center ${category.bgColor} ${category.color} ${category.borderColor} border`}>
                                        <category.icon size={24} />
                                    </div>
                                    <h2 className="text-2xl font-bold text-slate-800">{category.title}</h2>
                                </div>

                                <div className="space-y-4 flex-1">
                                    {category.files.map((file, fileIdx) => (
                                        <a
                                            key={fileIdx}
                                            href={file.url || "#"}
                                            onClick={(e) => handleDownload(e, file)}
                                            className="group flex items-start gap-4 p-5 rounded-2xl border border-slate-200 bg-white shadow-sm hover:border-blue-300 hover:shadow-[0_12px_40px_-10px_rgba(37,99,235,0.2)] hover:-translate-y-1.5 hover:bg-slate-50 relative overflow-hidden transition-all duration-300 ease-out"
                                        >
                                            <div className="absolute top-0 right-0 w-32 h-32 bg-blue-500/5 rounded-full blur-2xl group-hover:bg-blue-500/10 transition-colors"></div>
                                            <div className="w-10 h-10 rounded-lg bg-red-50 text-red-500 flex items-center justify-center shrink-0 border border-red-100 mt-1">
                                                <FileText size={20} />
                                            </div>
                                            <div className="flex-1">
                                                <h3 className="font-bold text-slate-800 group-hover:text-blue-600 transition-colors">{file.name}</h3>
                                                <p className="text-sm text-slate-500 mt-1 line-clamp-2">{file.desc}</p>

                                                <div className="flex items-center gap-4 mt-4 text-xs font-medium text-slate-400">
                                                    <span className="flex items-center gap-1.5"><span className="w-1.5 h-1.5 rounded-full bg-slate-300"></span> {file.format}</span>
                                                    <span className="flex items-center gap-1.5"><span className="w-1.5 h-1.5 rounded-full bg-slate-300"></span> {file.size}</span>
                                                    <span className="flex items-center gap-1.5"><span className="w-1.5 h-1.5 rounded-full bg-slate-300"></span> {file.date}</span>
                                                </div>
                                            </div>
                                            <div className="w-10 h-10 rounded-full bg-slate-100 flex items-center justify-center text-slate-400 group-hover:bg-blue-500 group-hover:text-white transition-colors shrink-0 self-center">
                                                <FileDown size={18} />
                                            </div>
                                        </a>
                                    ))}
                                </div>
                            </div>
                        ))}
                    </div>

                    <div className="mt-16 bg-blue-50 border border-blue-100 rounded-2xl p-8 text-center max-w-3xl mx-auto">
                        <h3 className="text-lg font-bold text-blue-900 mb-3">Looking for Specific Student Records?</h3>
                        <p className="text-blue-800 mb-6 font-medium">Personalized documents such as Bonafide Certificates, Marksheets, and Receipts are available inside your student portal.</p>
                        <Link to="/student/documents" className="bg-blue-600 hover:bg-blue-700 text-white font-bold py-3 px-8 rounded-xl transition-colors inline-block shadow-lg shadow-blue-500/30">
                            Log In to Student Portal
                        </Link>
                    </div>

                </div>
            </main>
        </div>
    );
}
