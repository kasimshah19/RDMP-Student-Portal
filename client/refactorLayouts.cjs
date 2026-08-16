const fs = require('fs');
const path = require('path');

let routes = fs.readFileSync('src/routes/AppRoutes.jsx', 'utf8');

const imports = `import AdminTeacherLayout from '../components/layout/AdminTeacherLayout';\nimport StudentLayout from '../components/layout/StudentLayout';\n`;

if (!routes.includes('AdminTeacherLayout')) {
    routes = routes.replace(
        "import { AuthContext } from '../context/AuthContext';",
        "import { AuthContext } from '../context/AuthContext';\n" + imports
    );
}

// Quick string replacement magic for wrapping Layout routes
const regexAdmin = /(<Route path="\/admin\/[^>]+ element=\{\s*<ProtectedRoute[^>]+>\s*<[a-zA-Z]+ \/>\s*<\/ProtectedRoute>\s*\}[^\/]*\/>)/g;
const regexTeacher = /(<Route path="\/teacher\/[^>]+ element=\{\s*<ProtectedRoute[^>]+>\s*<[a-zA-Z]+ \/>\s*<\/ProtectedRoute>\s*\}[^\/]*\/>)/g;
const regexStudent = /(<Route path="\/student\/[^>]+ element=\{\s*<ProtectedRoute[^>]+>\s*<[a-zA-Z]+ \/>\s*<\/ProtectedRoute>\s*\}[^\/]*\/>)/g;

let adminRoutesMatch = routes.match(regexAdmin) || [];
let teacherRoutesMatch = routes.match(regexTeacher) || [];
let studentRoutesMatch = routes.match(regexStudent) || [];

let adminBlock = adminRoutesMatch.join('\n            ');
let teacherBlock = teacherRoutesMatch.join('\n            ');
let studentBlock = studentRoutesMatch.join('\n            ');

let newRoutesBlock = `
            {/* Admin & Teacher Layout */}
            <Route element={<AdminTeacherLayout />}>
            ${adminBlock}
            ${teacherBlock}
            </Route>

            {/* Student Layout */}
            <Route element={<StudentLayout />}>
            ${studentBlock}
            </Route>
`;

if (adminBlock.length > 0) {
    adminRoutesMatch.forEach(m => { routes = routes.replace(m, ''); });
    teacherRoutesMatch.forEach(m => { routes = routes.replace(m, ''); });
    studentRoutesMatch.forEach(m => { routes = routes.replace(m, ''); });

    routes = routes.replace(
        "{/* Public Admission Routes */}",
        "{/* Public Admission Routes */}"
    );

    let insertIndex = routes.indexOf('<Route path="/admin/dashboard"');
    if (insertIndex === -1 && routes.indexOf('Fallback for unknown routes') !== -1) {
        routes = routes.replace('{/* Fallback for unknown routes */}', newRoutesBlock + '\n            {/* Fallback for unknown routes */}');
    } else if (insertIndex > -1) {
        // Should not hit because we just deleted those
    }
}

// Clean up blank lines if needed
routes = routes.replace(/\n\s*\n\s*\n/g, '\n\n');

fs.writeFileSync('src/routes/AppRoutes.jsx', routes);
console.log('AppRoutes successfully wrapped!');

// NOW REMOVE <Navbar /> and padding stuff from all pages
const pagesDir = ['admin', 'student', 'teacher', 'auth', 'public'];
function stripNavbar(dir) {
    const files = fs.readdirSync(path.join('src/pages', dir));
    for (const file of files) {
        if (file.endsWith('.jsx')) {
            const p = path.join('src/pages', dir, file);
            let content = fs.readFileSync(p, 'utf8');
            let original = content;

            content = content.replace(/import Navbar from '[^']+';\n?/g, '');
            content = content.replace(/<Navbar \/>\s*/g, '');

            // Convert <div className="min-h-screen bg-[gray]-... pb-12"> to just a div or remove min-h-screen
            // because Layout handles it 
            if (dir !== 'auth' && dir !== 'public') {
                content = content.replace(/className="min-h-screen bg-[a-z0-9-]+[^)]*"/g, 'className="pb-12"');
                content = content.replace(/className="max-w-7xl mx-auto py-8 px-4 sm:px-6"/g, 'className="w-full"');
            }

            if (original !== content) {
                fs.writeFileSync(p, content);
                console.log('Stripped Navbar from ' + file);
            }
        }
    }
}

pagesDir.forEach(stripNavbar);
