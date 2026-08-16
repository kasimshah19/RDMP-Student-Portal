const fs = require('fs');
const filePath = 'client/src/pages/teacher/TeacherDashboard.jsx';
let code = fs.readFileSync(filePath, 'utf8');

// Replace \` with `
code = code.split('\\`').join('`');

// Replace \$ with $
code = code.split('\\$').join('$');

fs.writeFileSync(filePath, code);
console.log('Fixed escape characters in TeacherDashboard.jsx');
