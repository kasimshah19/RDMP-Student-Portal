import React, { useState, useContext } from 'react';
import { AuthContext } from '../../context/AuthContext';
import { useNavigate, Link, useLocation } from 'react-router-dom';
import { useToast } from '../../context/ToastContext';

const Login = () => {
    const [role, setRole] = useState('student');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [errorMsg, setErrorMsg] = useState('');
    const [isSubmitting, setIsSubmitting] = useState(false);

    const { login } = useContext(AuthContext);
    const { addToast } = useToast();
    const navigate = useNavigate();
    const location = useLocation();

    const handleSubmit = async (e) => {
        e.preventDefault();
        setIsSubmitting(true);
        setErrorMsg('');

        try {
            const res = await login(role, { email, password });
            if (res.success) {
                addToast(`Successfully authenticated as ${role.toUpperCase()}`, 'success');

                // Navigate back to the originally requested URL, if it exists.
                // React Router ProtectedRoute handles validation if they switch roles mid-auth.
                const destination = location.state?.from?.pathname || `/${role}/dashboard`;
                navigate(destination, { replace: true });
            } else {
                setErrorMsg(res.message || 'Error occurred during login');
            }
        } catch (err) {
            setErrorMsg('An unexpected error occurred');
        } finally {
            setIsSubmitting(false);
        }
    };

    return (
        <div className="min-h-screen flex items-center justify-center bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
            <div className="max-w-md w-full space-y-8 bg-white p-8 rounded-xl shadow border border-gray-100">
                <div>
                    <h2 className="text-center text-3xl font-extrabold text-prime-blue">
                        RDMP Student Portal
                    </h2>
                    <p className="mt-2 text-center text-sm text-gray-600">
                        Sign in to your account
                    </p>
                </div>

                {/* Role Selector Tabs */}
                <div className="flex border-b border-gray-200">
                    {['student', 'teacher', 'admin'].map((tabRole) => (
                        <button
                            key={tabRole}
                            type="button"
                            onClick={() => {
                                setRole(tabRole);
                                setErrorMsg('');
                            }}
                            className={`flex-1 py-2 text-sm font-medium text-center capitalize transition-colors duration-200 border-b-2 
                ${role === tabRole
                                    ? 'border-prime-blue text-prime-blue'
                                    : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'}`}
                        >
                            {tabRole}
                        </button>
                    ))}
                </div>

                <form className="mt-6 space-y-6" onSubmit={handleSubmit}>
                    {errorMsg && (
                        <div className="bg-red-50 border border-red-200 text-red-600 px-4 py-2 rounded text-sm text-center">
                            {errorMsg}
                        </div>
                    )}

                    <div className="space-y-4">
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1" htmlFor="email-address">
                                Email Address
                            </label>
                            <input
                                id="email-address"
                                name="email"
                                type="email"
                                autoComplete="email"
                                required
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                className="appearance-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded focus:outline-none focus:ring-prime-blue focus:border-prime-blue focus:z-10 sm:text-sm"
                                placeholder="name@rdmpcollege.edu.in"
                            />
                        </div>
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1" htmlFor="password">
                                Password
                            </label>
                            <input
                                id="password"
                                name="password"
                                type="password"
                                autoComplete="current-password"
                                required
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                                className="appearance-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded focus:outline-none focus:ring-prime-blue focus:border-prime-blue focus:z-10 sm:text-sm"
                                placeholder="••••••••"
                            />
                        </div>
                    </div>

                    <div>
                        <button
                            type="submit"
                            disabled={isSubmitting}
                            className="group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded text-white bg-prime-blue hover:bg-blue-800 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-prime-blue transition duration-150 ease-in-out disabled:opacity-70 disabled:cursor-not-allowed"
                        >
                            {isSubmitting ? 'Signing in...' : 'Sign in'}
                        </button>
                    </div>
                </form>

                <div className="mt-6 text-center">
                    <Link to="/admission/apply" className="text-prime-blue hover:underline font-medium">
                        New Applicant? Apply for Admission
                    </Link>
                    <span className="mx-2 text-gray-300">|</span>
                    <Link to="/admission/status" className="text-gray-500 hover:underline">
                        Check Status
                    </Link>
                </div>
            </div>
        </div>
    );
};

export default Login;
