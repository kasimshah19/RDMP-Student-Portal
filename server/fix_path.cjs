const fs = require('fs');
let code = fs.readFileSync('updateTeacherDashboard.cjs', 'utf8');
code = code.replace(/server\/controllers\/dashboardController\.js/g, 'controllers/dashboardController.js');
fs.writeFileSync('updateTeacherDashboard.cjs', code);
console.log('Fixed path');
