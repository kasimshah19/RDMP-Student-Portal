const fs = require('fs');
const path = require('path');

const filesToReset = [
    'src/pages/admin/AdmissionDetail.jsx',
    'src/pages/admin/AdmissionList.jsx',
    'src/pages/admin/AttendanceOverview.jsx',
    'src/pages/admin/ClassManagement.jsx',
    'src/pages/admin/ExamManagement.jsx',
    'src/pages/admin/NoticeManagement.jsx',
    'src/pages/admin/Reports.jsx',
    'src/pages/admin/StudentDetail.jsx',
    'src/pages/admin/StudentList.jsx',
    'src/pages/admin/TeacherList.jsx',

    'src/pages/student/MyAttendance.jsx',
    'src/pages/student/MyResults.jsx',
    'src/pages/student/Profile.jsx',

    'src/pages/teacher/AttendanceReport.jsx',
    'src/pages/teacher/EnterMarks.jsx',
    'src/pages/teacher/ExamSummary.jsx',
    'src/pages/teacher/MarkAttendance.jsx',
];

filesToReset.forEach(f => {
    const compName = path.basename(f, '.jsx');
    const code = `import React from 'react';
import { Link } from 'react-router-dom';

const ${compName} = () => {
    return (
        <div className="w-full">
            <h1 className="text-2xl font-bold font-display text-navy mb-6">${compName}</h1>
            <div className="bg-white p-6 rounded-lg shadow-sm border border-mist">
                <p className="text-slate mb-4">This view has been modernized for the official RDMP layout. Functionality is being populated.</p>
            </div>
        </div>
    );
};

export default ${compName};`;

    fs.writeFileSync(f, code);
});
console.log('Reset ' + filesToReset.length + ' files to minimal state.');
