const fs = require('fs');
let code = fs.readFileSync('client/src/components/layout/AdminTeacherLayout.jsx', 'utf8');
const startTrigger = '{/* 3. Bottom User Card */}';
const endTrigger = '</aside>';
const split1 = code.split(startTrigger);
const split2 = split1[1].split(endTrigger);

const newCard = `{/* 3. Bottom User Card Expanded Visual */}
                <div className="p-3 shrink-0 mt-auto">
                    <div className="rounded-2xl border border-white/10 bg-white/5 p-4 flex flex-col gap-4">
                        {/* Avatar & Name */}
                        <div className="flex items-center gap-3">
                            <div className="w-11 h-11 rounded-full bg-white flex shrink-0 items-center justify-center text-navy font-bold shadow-sm overflow-hidden border-2 border-white/20">
                                {isAdmin ? (
                                    <div className="w-full h-full bg-brass/20 text-brass flex items-center justify-center">{getInitials(user?.name)}</div>
                                ) : (
                                    <img src={\`https://ui-avatars.com/api/?name=\${user?.name || 'Patil'}&background=ffffff&color=0f172a&bold=true\`} alt="Avatar" className="w-full h-full object-cover" />
                                )}
                            </div>
                            <div className="overflow-hidden flex-1">
                                <p className="text-white font-semibold truncate text-[14px] leading-tight mb-1">{isAdmin ? (user?.name || 'Admin') : 'Mr. A. B. Patil'}</p>
                                <span className="text-[11px] text-white/70 tracking-wide font-medium">
                                    {isAdmin ? 'System Administrator' : 'Physics Teacher'}
                                </span>
                            </div>
                        </div>

                        {/* Details */}
                        {!isAdmin && (
                            <div className="text-[12px] text-white/80 space-y-2 font-medium mt-1">
                                <div className="flex">
                                    <span className="w-[85px]">Employee ID</span>
                                    <span className="mx-1">:</span>
                                    <span className="text-white">TCH1023</span>
                                </div>
                                <div className="flex">
                                    <span className="w-[85px]">Department</span>
                                    <span className="mx-1">:</span>
                                    <span className="text-white">Science</span>
                                </div>
                            </div>
                        )}

                        {/* Action Buttons */}
                        <div className="flex flex-col mt-1">
                            <Link to={isAdmin ? "/admin/dashboard" : "/teacher/dashboard"} className="w-full flex items-center justify-center py-2.5 bg-blue-700 hover:bg-blue-600 text-white rounded-lg transition-colors text-[13px] font-semibold shadow-sm">
                                View Profile
                            </Link>
                            <button onClick={logout} className="w-full flex items-center justify-center gap-2 py-2 text-white/30 hover:text-red-400 rounded-lg transition-colors text-[10px] uppercase font-bold tracking-widest mt-2">
                                <LogOut size={12} /> Logout
                            </button>
                        </div>
                    </div>
                </div>
            `;

const finalCode = split1[0] + newCard + '</aside>' + split2[1];
fs.writeFileSync('client/src/components/layout/AdminTeacherLayout.jsx', finalCode);
console.log('Sidebar bottom card replaced successfully');
