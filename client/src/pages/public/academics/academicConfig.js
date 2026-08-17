import {
    BookOpen, GraduationCap, LayoutDashboard, Calendar,
    CalendarClock, FileCheck, FileBarChart, School, FileText
} from 'lucide-react';

export const academicConfig = {
    overview: {
        title: "Academic Structure",
        subtitle: "Information regarding the academic framework for Class 11th and 12th.",
        content: `Raul Daultsinhji Multipurpose High School & Jr. College of Science provides a structured academic framework for Class 11th and Class 12th students, following the official state curriculum guidelines. 
        
Our institution focuses on dedicated classroom instruction, practical laboratory learning for science streams, and continuous internal assessments to ensure comprehensive academic development.`
    },
    menuItems: [
        {
            title: "Academic Overview",
            desc: "Academic structure & information",
            icon: School,
            path: "/academics"
        },
        {
            title: "Class 11th",
            desc: "Class 11 academic information",
            icon: GraduationCap,
            path: "/academics/class-11"
        },
        {
            title: "Class 12th",
            desc: "Class 12 academic information",
            icon: GraduationCap,
            path: "/academics/class-12"
        },
        {
            title: "Subjects & Curriculum",
            desc: "Subjects and syllabus",
            icon: BookOpen,
            path: "/academics/curriculum"
        },
        {
            title: "Academic Calendar",
            desc: "Academic schedule & events",
            icon: Calendar,
            path: "/academics/calendar"
        },
        {
            title: "Class Timetable",
            desc: "Daily lecture schedule",
            icon: CalendarClock,
            path: "/academics/timetable"
        },
        {
            title: "Examinations",
            desc: "Exam and assessment info",
            icon: FileCheck,
            path: "/academics/examinations"
        },
        {
            title: "Results & Marksheet",
            desc: "Academic results and marksheets",
            icon: FileBarChart,
            path: "/academics/results"
        },
        {
            title: "Academic Notices",
            desc: "Academic announcements",
            icon: FileText,
            path: "/academics/notices"
        }
    ],
    classes: {
        class11: {
            title: "Class 11th Academics",
            intro: "Class 11th serves as the foundational year for the higher secondary curriculum. Students are introduced to advanced subjects and fundamental concepts required for their board examinations.",
            guidelines: [
                "Focus on building core concepts in primary subjects.",
                "Mandatory attendance in all practical laboratory sessions.",
                "Active participation in continuous internal assessments.",
                "Completion of all assigned projects and journal work."
            ]
        },
        class12: {
            title: "Class 12th Academics",
            intro: "Class 12th is the pivotal board examination year. Academic instruction is strictly aligned with the state board syllabus, focusing on exam preparation, revision, and rigorous testing.",
            guidelines: [
                "Strict adherence to board syllabus and guidelines.",
                "Mandatory preliminary examinations prior to boards.",
                "Submission of practical journals certified by faculty.",
                "Hall tickets issued subject to academic clearance."
            ]
        }
    },
    subjects: {
        placeholder: "The exact subject combinations (Science, Arts, Commerce) and syllabus details are managed by the academic administration. Detailed subject syllabi will be made available through the internal portal."
    },
    calendar: {
        events: [
            { type: "Start of Academic Year", date: "June (First Term)" },
            { type: "First Unit Test", date: "August" },
            { type: "Terminal Examination", date: "October / November" },
            { type: "Diwali Vacation", date: "November" },
            { type: "Second Unit Test", date: "January" },
            { type: "Preliminary / Annual Practical Exams", date: "February" },
            { type: "Annual Written Exams", date: "March / April" },
            { type: "Result Declaration", date: "May" }
        ],
        note: "Note: The above calendar represents a standard academic flow. Exact configured dates for the current academic year will be published via Academic Notices."
    },
    timetable: {
        note: "Class-wise and division-wise daily timetables are generated dynamically. Registered students can view their specific lecture schedules from their portal dashboards."
    },
    examinations: {
        types: [
            { name: "Unit Tests", desc: "Periodic assessments to track continuous learning progress." },
            { name: "Terminal Exams", desc: "End of first term comprehensive examinations." },
            { name: "Practical Exams", desc: "Laboratory and journal-based assessments for applicable subjects." },
            { name: "Preliminary Exams", desc: "Full-syllabus board pattern practice exams for Class 12." },
            { name: "Annual Exams", desc: "Final promotional examinations for Class 11." }
        ]
    }
};
