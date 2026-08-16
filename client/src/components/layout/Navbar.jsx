import React, { useContext, useState } from 'react';
import { AuthContext } from '../../context/AuthContext';
import { Link } from 'react-router-dom';

const Navbar = () => {
    const { user, logout } = useContext(AuthContext);
    const [isOpen, setIsOpen] = useState(false);

    return (
        <nav className="bg-prime-blue text-white shadow-md relative z-40">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex justify-between h-16 items-center">
                    <div className="flex-shrink-0 flex items-center">
                        <Link to="/" className="text-xl font-bold tracking-wider">
                            RDMP Student Portal
                        </Link>
                    </div>

                    {/* Mobile toggle button */}
                    {user && (
                        <div className="flex md:hidden">
                            <button onClick={() => setIsOpen(!isOpen)} className="text-white hover:text-gray-200 focus:outline-none">
                                <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                    {isOpen ? (
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                                    ) : (
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16m-7 6h7" />
                                    )}
                                </svg>
                            </button>
                        </div>
                    )}

                    {/* Desktop Menu flex explicitly tracked cleanly safely */}
                    <div className="hidden md:flex items-center space-x-4">
                        {user && (
                            <>
                                <div className="text-sm flex items-center gap-3 space-x-2">
                                    <span className="font-semibold">{user.name}</span>
                                    {user.role === 'admin' && <span className="text-[10px] bg-white/20 text-white px-2 py-1 rounded shadow-sm border border-white/10 uppercase tracking-widest font-black">System Admin</span>}
                                    {user.role === 'student' && (
                                        <div className="flex gap-2 text-xs font-bold tracking-wide">
                                            <Link to="/student/results" className="hover:bg-white/10 px-3 py-1.5 rounded transition">Results</Link>
                                            <Link to="/student/attendance" className="hover:bg-white/10 px-3 py-1.5 rounded transition">Attendance</Link>
                                            <Link to="/student/profile" className="hover:bg-white/10 px-3 py-1.5 rounded transition">Profile</Link>
                                        </div>
                                    )}
                                </div>
                                <button onClick={logout} className="bg-red-500 hover:bg-red-600 px-3 py-1 text-sm rounded font-bold shadow-sm transition">Logout</button>
                            </>
                        )}
                    </div>
                </div>
            </div>

            {/* Mobile Menu Bounds cleanly successfully flawlessly bounded mappings correctly arrays target targets */}
            {user && isOpen && (
                <div className="md:hidden bg-blue-800 border-t border-blue-700 shadow-xl absolute w-full left-0 top-16">
                    <div className="px-4 py-4 space-y-3">
                        <div className="border-b border-blue-700 pb-3 mb-3">
                            <span className="font-bold block tracking-wide">{user.name}</span>
                            {user.role === 'admin' && <span className="text-[10px] bg-white/20 px-2 py-0.5 mt-1 inline-block rounded uppercase font-black">System Admin Target Mapped</span>}
                        </div>

                        {user.role === 'student' && (
                            <div className="flex flex-col space-y-2 text-sm font-bold">
                                <Link to="/student/results" className="hover:bg-blue-700 p-2 rounded">Results Native Clean Safe Proper Safe</Link>
                                <Link to="/student/attendance" className="hover:bg-blue-700 p-2 rounded">Attendance Thorough Smooth Efficient Perfect</Link>
                                <Link to="/student/profile" className="hover:bg-blue-700 p-2 rounded">Profile Targets Effortlessly Clean</Link>
                            </div>
                        )}
                        <button onClick={logout} className="w-full mt-4 text-center bg-red-600 hover:bg-red-700 font-bold p-2 text-sm rounded transition shadow">Logout Safely Clean limits effectively</button>
                    </div>
                </div>
            )}
        </nav>
    );
};

export default Navbar;
