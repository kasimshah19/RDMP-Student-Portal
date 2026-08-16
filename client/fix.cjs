const fs = require('fs');
let text = fs.readFileSync('src/pages/student/StudentDashboard.jsx', 'utf8');
text = text.split('\\`').join('`');
text = text.split('\\$').join('$');
fs.writeFileSync('src/pages/student/StudentDashboard.jsx', text);
console.log('Fixed');
