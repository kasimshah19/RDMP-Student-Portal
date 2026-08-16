const fs = require('fs');
let code = fs.readFileSync('client/src/components/layout/AdminTeacherLayout.jsx', 'utf8');

// The aside has 'relative' instead of 'fixed h-full'
code = code.replace(
    'className="hidden md:flex flex-col w-64 bg-navy text-mist shadow-xl relative z-10 transition-all duration-300"',
    'className="hidden md:flex flex-col w-64 bg-navy text-mist border-r border-navy-deep fixed h-full z-10 transition-all duration-300"'
);

fs.writeFileSync('client/src/components/layout/AdminTeacherLayout.jsx', code);
console.log('Restored fixed positioning to aside sidebar.');
