const fs = require('fs');
let c = fs.readFileSync('client/src/routes/AppRoutes.jsx', 'utf8');
c = c.replace(
    "import MyResults from '../pages/student/MyResults';",
    "import MyExaminations from '../pages/student/MyExaminations';\nimport MyResults from '../pages/student/MyResults';"
);
c = c.replace(
    '<Route path="/student/results"',
    '<Route path="/student/examinations" element={ <ProtectedRoute allowedRoles={[\'student\']}> <MyExaminations /> </ProtectedRoute> } />\n            <Route path="/student/results"'
);
fs.writeFileSync('client/src/routes/AppRoutes.jsx', c);
console.log('AppRoutes modified successfully.');
