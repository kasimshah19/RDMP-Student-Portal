const fs = require('fs');
const path = require('path');

// 1. UPDATE ROUTES
const routesPath = 'server/routes/studentRoutes.js';
let routes = fs.readFileSync(routesPath, 'utf8');
const routeInjections = `
router.get('/timetable', protect, authorizeRoles('student'), studentController.getStudentTimetable);
router.get('/fees', protect, authorizeRoles('student'), studentController.getStudentFees);
router.get('/library', protect, authorizeRoles('student'), studentController.getStudentLibrary);
router.get('/leave', protect, authorizeRoles('student'), studentController.getStudentLeave);
`;
routes = routes.replace(
    "router.get('/examinations', protect, authorizeRoles('student'), studentController.getStudentExaminations);",
    "router.get('/examinations', protect, authorizeRoles('student'), studentController.getStudentExaminations);" + routeInjections
);
fs.writeFileSync(routesPath, routes);

// 2. UPDATE CONTROLLERS
const controllersPath = 'server/controllers/studentController.js';
let controllers = fs.readFileSync(controllersPath, 'utf8');
const controllerInjections = `
exports.getStudentTimetable = async (req, res) => {
    try {
        const days = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday'];
        const periods = [
            { time: '09:00 AM - 09:45 AM', type: 'Lecture' },
            { time: '09:45 AM - 10:30 AM', type: 'Lecture' },
            { time: '10:30 AM - 10:45 AM', type: 'Break' },
            { time: '10:45 AM - 11:30 AM', type: 'Lecture' },
            { time: '11:30 AM - 12:15 PM', type: 'Lecture' },
            { time: '12:15 PM - 01:00 PM', type: 'Lunch' },
            { time: '01:00 PM - 02:45 PM', type: 'Practical' }
        ];
        const subjects = ['Physics', 'Chemistry', 'Mathematics', 'English', 'Computer Science'];
        const timeline = days.map(d => {
            return {
                day: d,
                classes: periods.map(p => {
                    if (p.type === 'Break' || p.type === 'Lunch') return { ...p, subject: p.type, room: '' };
                    let sub = subjects[Math.floor(Math.random() * subjects.length)];
                    return { ...p, subject: p.type === 'Practical' ? sub + ' Lab' : sub, room: 'Room ' + (101 + Math.floor(Math.random() * 5)) };
                })
            };
        });
        res.json({ success: true, data: timeline });
    } catch(err) { res.status(500).json({ success: false, message: err.message }); }
};

exports.getStudentFees = async (req, res) => {
    try {
        res.json({
            success: true,
            data: [
                { id: 'INV-2025-01', term: 'Term 1', amount: 45000, status: 'paid', date: '2025-04-15' },
                { id: 'INV-2025-02', term: 'Term 2', amount: 45000, status: 'pending', date: '2025-10-15', dueDate: '2025-11-01' }
            ]
        });
    } catch(err) { res.status(500).json({ success: false, message: err.message }); }
};

exports.getStudentLibrary = async (req, res) => {
    try {
        res.json({
            success: true,
            data: [
                { id: 'BK-1012', title: 'Advanced Calculus', author: 'Spivak', issueDate: '2026-08-01', dueDate: '2026-08-15', status: 'overdue' },
                { id: 'BK-3044', title: 'University Physics', author: 'Young', issueDate: '2026-08-10', dueDate: '2026-08-24', status: 'issued' }
            ]
        });
    } catch(err) { res.status(500).json({ success: false, message: err.message }); }
};

exports.getStudentLeave = async (req, res) => {
    try {
        res.json({
            success: true,
            data: [
                { id: 'LV-101', fromDate: '2026-07-15', toDate: '2026-07-16', reason: 'Fever', status: 'approved' },
                { id: 'LV-102', fromDate: '2026-08-20', toDate: '2026-08-21', reason: 'Family Function', status: 'pending' }
            ]
        });
    } catch(err) { res.status(500).json({ success: false, message: err.message }); }
};
`;
controllers = controllers.replace(
    "// @desc Get all students (filter by class/division)",
    controllerInjections + "\n// @desc Get all students (filter by class/division)"
);
fs.writeFileSync(controllersPath, controllers);

// 3. UPDATE API SERVICE
const servicePath = 'client/src/services/studentService.js';
let service = fs.readFileSync(servicePath, 'utf8');
const serviceInjections = `
export const getMyTimetable = async () => { const res = await api.get('/student/timetable'); return res.data; };
export const getMyFees = async () => { const res = await api.get('/student/fees'); return res.data; };
export const getMyLibrary = async () => { const res = await api.get('/student/library'); return res.data; };
export const getMyLeave = async () => { const res = await api.get('/student/leave'); return res.data; };
export const getNotices = async () => { const res = await api.get('/notices'); return res.data; };
export const getDocuments = async () => { const res = await api.get('/document/student/me'); return res.data; };
`;
service += serviceInjections;
fs.writeFileSync(servicePath, service);

console.log('Backend virtualizations and API bindings injected completely.');
