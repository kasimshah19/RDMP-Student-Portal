import { GraduationCap, BookOpen, Clock, FileText, CreditCard, HelpCircle, MapPin, CheckCircle2, ChevronRight, Check, Calendar } from 'lucide-react';

export const admissionConfig = {
    institute: {
        name: "Raul Daultsinhji Multipurpose High School & Jr. College of Science",
        location: "Dondaicha, Dist. Dhule, Maharashtra",
        contactEmail: "admission@rdmpcollege.edu.in",
        contactPhone: "(02566) 244 123",
        academicYear: "2026–27"
    },
    overview: {
        title: "Admissions",
        subtitle: "Explore admission information for Class 11th and Class 12th at Raul Daultsinhji Multipurpose High School & Jr. College of Science.",
        cards: [
            { id: '11', title: "Class 11th Admission", desc: "First Year Junior College (FYJC)", icon: GraduationCap, path: "/admissions/class-11" },
            { id: '12', title: "Class 12th Continuation", desc: "Existing Student Progression", icon: BookOpen, path: "/admissions/class-12" },
            { id: 'process', title: "Admission Process", desc: "Step-by-step guidance", icon: Clock, path: "/admissions/process" },
            { id: 'eligibility', title: "Eligibility", desc: "Admission requirements", icon: CheckCircle2, path: "/admissions/eligibility" },
            { id: 'documents', title: "Documents Required", desc: "Mandatory certificates", icon: FileText, path: "/admissions/documents" },
            { id: 'dates', title: "Important Dates", desc: "Academic schedule", icon: Calendar, path: "/admissions/dates" },
            { id: 'fees', title: "Fees & Payment", desc: "Fee structures", icon: CreditCard, path: "/admissions/fees" },
            { id: 'faqs', title: "Admission FAQs", desc: "Frequently asked questions", icon: HelpCircle, path: "/admissions/faqs" }
        ]
    },
    class11: {
        title: "Class 11th Admission",
        badge: "First Year Junior College (FYJC)",
        intro: "Students seeking admission to Class 11 should follow the applicable official Maharashtra FYJC admission procedure and college instructions.",
        pathway: ["Class 10 / SSC Results", "Official Centralized Application", "Merit / Allotment Output", "College Document Verification", "Admission Confirmation"],
        externalPortal: "https://11thadmission.org.in/"
    },
    class12: {
        title: "Class 12th Continuation",
        intro: "Information for existing Class 11 students progressing to Class 12.",
        rules: [
            "Students must have secured passing marks in the 11th grade annual exams.",
            "Must maintain a minimum attendance of 75% in the previous academic year.",
            "Subjects selected in 11th grade will be continued in 12th.",
            "Library & Laboratory dues from 11th must be cleared before continuation."
        ]
    },
    processSteps: [
        { title: "Understand Eligibility", desc: "Check academic requirements matching your profile." },
        { title: "Complete Applicable Application", desc: "For FYJC, use the state centralized portal. For Class 12, fill the continuation form." },
        { title: "Submit Required Information", desc: "Upload or provide standard background details and marks." },
        { title: "Document Verification", desc: "Visit the college admission office with original documents." },
        { title: "Admission / Allotment Confirmation", desc: "Acknowledge your seat allocation." },
        { title: "Complete College Formalities", desc: "Pay the required fees and sign undertakings." },
        { title: "Student Record Created", desc: "You will receive credentials for the Student Digital Portal." }
    ],
    eligibility: {
        class11: [
            "Passed 10th Standard (SSC) or equivalent examination from a recognized Board.",
            "Minimum marks requirements as prescribed by the State Board for the Science stream.",
            "Valid certificate applicability for reserved categories (if claiming quota)."
        ],
        class12: [
            "Must have successfully completed Class 11 Science from this institution.",
            "Cleared all financial and administrative dues of the previous year."
        ]
    },
    documents: {
        general: [
            { name: "Class 10 Marksheet", required: true },
            { name: "School Leaving Certificate / Transfer Certificate", required: true },
            { name: "Aadhaar Card Copy", required: true },
            { name: "Recent Passport-size Photographs", required: true }
        ],
        category: [
            { name: "Caste Certificate", required: false },
            { name: "Caste Validity Certificate", required: false },
            { name: "Non-Creamy Layer Certificate", required: false }
        ],
        college: [
            { name: "Completed College Admission Form", required: true },
            { name: "Student Undertaking Form", required: true },
            { name: "Parent/Guardian Declaration", required: true }
        ]
    },
    dates: [
        { event: "Application Process Begins", date: "To be announced", status: "upcoming" },
        { event: "Document Verification window", date: "To be announced", status: "upcoming" },
        { event: "General Merit List Display", date: "To be announced", status: "upcoming" },
        { event: "Fee Payment Deadline", date: "To be announced", status: "upcoming" },
        { event: "Academic Session Starts", date: "To be announced", status: "upcoming" }
    ],
    fees: {
        note: "Fee information will be officially updated by the college administration.",
        sections: [
            { name: "Class 11th Science", details: "Standard state-board prescribed fees + college laboratory and term fees." },
            { name: "Class 12th Science", details: "Standard state-board prescribed fees + college laboratory and term fees." }
        ]
    },
    faqs: [
        { q: "Who can apply for Class 11th Science?", a: "Any student who has passed their 10th Standard exam from a recognized board can apply, subject to merit list cut-offs." },
        { q: "What is the admission procedure?", a: "For Class 11, admission is through the state's centralized FYJC process. For Class 12, it is a continuation for our existing students." },
        { q: "Where should I submit my documents?", a: "Original and attested copies must be submitted physically at the college's admission office during the verification schedule." },
        { q: "How can I contact the admission office?", a: "You can email us at our official admission email or reach out to the campus directly during working hours." }
    ]
};

