const fs = require('fs');
let code = fs.readFileSync('client/src/components/layout/AdminTeacherLayout.jsx', 'utf8');

code = code.replace(
    '<main className="flex-1 overflow-y-auto w-full">\\n                    <div className="w-full h-full">',
    '<main className="flex-1 overflow-y-auto w-full p-4 sm:p-6 lg:p-8">\\n                    <div className="w-full h-full">'
);

fs.writeFileSync('client/src/components/layout/AdminTeacherLayout.jsx', code);
console.log('Restored padding on main layer.');
