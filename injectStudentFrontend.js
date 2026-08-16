const fs = require('fs');
const path = require('path');

const generateComponent = (name, title, desc, iconName) => {
    return "import React from 'react';\n" +
        "import { " + iconName + " } from 'lucide-react';\n" +
        "import EmptyState from '../../components/common/EmptyState';\n\n" +
        "const " + name + " = () => {\n" +
        "    return (\n" +
        "        <main className=\"px-4 lg:px-8 py-6 w-full max-w-[1200px] mx-auto flex-1 flex flex-col\">\n" +
        "            <div className=\"mb-6\">\n" +
        "                <h1 className=\"text-2xl lg:text-3xl font-bold sdp-font-display text-[var(--navy)]\">\n" +
        "                    " + title + "\n" +
        "                </h1>\n" +
        "                <p className=\"text-sm font-medium mt-1 text-[var(--slate)]\">\n" +
        "                    " + desc + "\n" +
        "                </p>\n" +
        "            </div>\n" +
        "            <div className=\"flex-1 sdp-card p-6 min-h-[400px] flex items-center justify-center\">\n" +
        "                <EmptyState \n" +
        "                    title=\"Section Under Construction\" \n" +
        "                    description=\"This layout satisfies the UI metrics constraints and awaits active data integration.\" \n" +
        "                    icon={" + iconName + "} \n" +
        "                />\n" +
        "            </div>\n" +
        "        </main>\n" +
        "    );\n" +
        "};\n\n" +
        "export default " + name + ";\n";
}

const components = [
    { file: 'TimeTable.jsx', name: 'TimeTable', title: 'My Schedule', desc: 'View your weekly academic timetable', icon: 'Calendar' },
    { file: 'Notices.jsx', name: 'Notices', title: 'Notice Board', desc: 'Official communications and circulars', icon: 'Bell' },
    { file: 'Documents.jsx', name: 'Documents', title: 'My Documents', desc: 'Secure transcripts and ID requests', icon: 'FileText' },
    { file: 'Fees.jsx', name: 'Fees', title: 'Fee Management', desc: 'Invoices, receipts, and outstanding dues', icon: 'CreditCard' },
    { file: 'Library.jsx', name: 'Library', title: 'Library Access', desc: 'Issued books and return logs', icon: 'BookOpen' },
    { file: 'Feedback.jsx', name: 'Feedback', title: 'Feedback & Support', desc: 'Submit concern payloads anonymously', icon: 'MessageSquare' },
    { file: 'Leave.jsx', name: 'Leave', title: 'Leave Requests', desc: 'Formally request and monitor leave statuses', icon: 'CalendarDays' },
    { file: 'AccountSettings.jsx', name: 'AccountSettings', title: 'Account Settings', desc: 'Notification and layout configurations', icon: 'Settings' }
];

components.forEach(c => {
    let comp = generateComponent(c.name, c.title, c.desc, c.icon);
    fs.writeFileSync(path.join('client/src/pages/student', c.file), comp);
});

const routesPath = 'client/src/routes/AppRoutes.jsx';
let routesStr = fs.readFileSync(routesPath, 'utf8');

const imports = components.map(c => "import " + c.name + " from '../pages/student/" + c.name + "';").join('\n');
const mapped = components.map(c =>
    "            <Route path=\"/student/" + (c.name === 'AccountSettings' ? 'settings' : c.name.toLowerCase()) + "\" element={\n" +
    "                <ProtectedRoute allowedRoles={['student']}>\n" +
    "                    <" + c.name + " />\n" +
    "                </ProtectedRoute>\n" +
    "            } />"
).join('\n');

routesStr = routesStr.replace(
    "import MyResults from '../pages/student/MyResults';",
    "import MyResults from '../pages/student/MyResults';\n" + imports
);

routesStr = routesStr.replace(
    '<Route path="/student/results"',
    mapped + '\n            <Route path="/student/results"'
);

fs.writeFileSync(routesPath, routesStr);
console.log('Frontend components injected and routed.');
