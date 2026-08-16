const fs = require('fs');
let code = fs.readFileSync('client/src/components/layout/AdminTeacherLayout.jsx', 'utf8');
code = code.replace('<div className="flex-1 flex flex-col h-screen overflow-hidden">', '<div className="flex-1 md:ml-64 flex flex-col h-screen overflow-hidden">');
fs.writeFileSync('client/src/components/layout/AdminTeacherLayout.jsx', code);
console.log('Fixed ml-64');
