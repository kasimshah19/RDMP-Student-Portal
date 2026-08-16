const fs = require('fs');
let code = fs.readFileSync('client/src/components/layout/AdminTeacherLayout.jsx', 'utf8');

code = code.replace(
    '<div className="flex-1 w-full max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-8 flex items-center justify-between">',
    '<div className="flex-1 w-full px-4 sm:px-6 lg:px-8 flex items-center justify-between">'
);

code = code.replace(
    '<div className="max-w-[1440px] mx-auto w-full h-full p-4 sm:p-6 lg:p-8">',
    '<div className="w-full h-full">'
);

fs.writeFileSync('client/src/components/layout/AdminTeacherLayout.jsx', code);
console.log('Cleared mx-auto');
