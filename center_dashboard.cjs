const fs = require('fs');
let code = fs.readFileSync('client/src/components/layout/AdminTeacherLayout.jsx', 'utf8');
const startTrigger = '{/* Main Content Area */}';
const split1 = code.split(startTrigger);

const newMain = `{/* Main Content Area */}
            <div className="flex-1 md:ml-64 flex flex-col h-screen overflow-hidden bg-cloud">
                {/* Topbar (Mobile Hamburger & Global Actions) */}
                <header className="h-16 bg-paper border-b border-mist flex flex-col shrink-0 z-20">
                    <div className="flex-1 w-full max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-8 flex items-center justify-between">
                        <div className="flex items-center gap-3">
                            {/* Mobile Menu Button */}
                            <div className="md:hidden text-xl font-display font-bold text-navy">RDMP Portal</div>
                            {/* Admin / Desktop global reference header left */}
                            <div className="hidden md:block font-display font-semibold text-lg text-ink">Dashboard Overview</div>
                        </div>
                        <div className="flex items-center gap-4">
                            <span className="hidden sm:inline-flex items-center gap-2 bg-mist rounded-full px-3 py-1">
                                <span className="w-2 h-2 rounded-full bg-success"></span>
                                <span className="text-xs font-bold text-slate">Live</span>
                            </span>
                        </div>
                    </div>
                </header>

                <main className="flex-1 overflow-y-auto w-full">
                    <div className="max-w-[1440px] mx-auto w-full h-full p-4 sm:p-6 lg:p-8">
                        <Outlet />
                    </div>
                </main>
            </div>
        </div>
    );
};

export default AdminTeacherLayout;
`;

const finalCode = split1[0] + newMain;
fs.writeFileSync('client/src/components/layout/AdminTeacherLayout.jsx', finalCode);
console.log('Main Content Area wrapped inside 1440px mx-auto properly');
