import React, { useContext, useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { AuthContext } from '../../context/AuthContext';
import { getAdminDashboard } from '../../services/dashboardService';
import NoticeBoard from '../../components/common/NoticeBoard';
import Loader from '../../components/common/Loader';
import { Users, FileText, AlertCircle, Bell, ShieldCheck } from 'lucide-react';

const AdminDashboard = () => {
    const { user, logout } = useContext(AuthContext);
    const navigate = useNavigate();

    const [data, setData] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchDash = async () => {
            try {
                const res = await getAdminDashboard();
                if (res.success) setData(res.data);
            } catch (error) {
                console.error(error);
            }
            setLoading(false);
        };
        fetchDash();
    }, []);

    if (loading) return <Loader fullScreen message="Loading Internal Dashboard Targets" />;

    // Fallback data if service fails
    const defaultData = data || {
        students: { total: 0 },
        admissions: { pending: 0, total: 0 },
        attendance: { lowAttendanceAlerts: 0, divisionsMarkedToday: 0, totalDivisions: 1 },
        notices: { total: 0, recent: [] }
    };

    return (
        <div className="w-full pb-12 animate-in fade-in duration-300">
            <div className="flex justify-between items-end mb-8 border-b border-mist pb-4">
                <div>
                    <h1 className="text-3xl font-bold font-display text-navy tracking-tight">System Control Matrix</h1>
                    <p className="text-slate font-medium text-sm mt-1">Official institutional record management panel</p>
                </div>
            </div>

            {/* KPI Tier */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
                <Link to="/admin/students" className="bg-paper p-6 rounded-lg shadow-sm border border-mist hover:border-navy/20 transition group flex flex-col justify-between h-32 relative overflow-hidden">
                    <div className="absolute right-4 top-4 text-slate opacity-20 group-hover:opacity-100 transition-opacity"><Users size={32} /></div>
                    <p className="text-xs font-semibold text-slate uppercase tracking-wider">Total Enrolled</p>
                    <p className="text-4xl font-mono text-navy font-bold">{defaultData.students.total}</p>
                </Link>

                <Link to="/admin/admissions" className="bg-paper p-6 rounded-lg shadow-sm border border-mist hover:border-navy/20 transition group flex flex-col justify-between h-32 relative overflow-hidden">
                    <div className="absolute right-4 top-4 text-warning-text opacity-20 group-hover:opacity-100 transition-opacity"><FileText size={32} /></div>
                    <p className="text-xs font-semibold text-slate uppercase tracking-wider">Pending Admissions</p>
                    <div className="flex items-baseline gap-2">
                        <p className="text-4xl font-mono text-ink font-bold">{defaultData.admissions.pending}</p>
                        <p className="text-xs font-mono text-slate">/ {defaultData.admissions.total}</p>
                    </div>
                </Link>

                <Link to="/admin/attendance" className="bg-paper p-6 rounded-lg shadow-sm border border-mist hover:border-danger transition group flex flex-col justify-between h-32 relative overflow-hidden">
                    <div className="absolute right-4 top-4 text-danger opacity-20 group-hover:opacity-100 transition-opacity"><AlertCircle size={32} /></div>
                    <p className="text-xs font-semibold text-danger uppercase tracking-wider">Attendance Deficits</p>
                    <p className="text-4xl font-mono text-danger font-bold">{defaultData.attendance.lowAttendanceAlerts}</p>
                </Link>

                <Link to="/admin/notices" className="bg-paper p-6 rounded-lg shadow-sm border border-mist hover:border-brass transition group flex flex-col justify-between h-32 relative overflow-hidden">
                    <div className="absolute right-4 top-4 text-brass opacity-20 group-hover:opacity-100 transition-opacity"><Bell size={32} /></div>
                    <p className="text-xs font-semibold text-slate uppercase tracking-wider">Active Notices</p>
                    <p className="text-4xl font-mono text-ink font-bold">{defaultData.notices.total}</p>
                </Link>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                {/* Left Column */}
                <div className="lg:col-span-2 space-y-8">

                    {/* Attendance Status Snapshot */}
                    <div className="bg-paper shadow-sm rounded-lg border border-mist overflow-hidden">
                        <div className="p-4 border-b border-mist flex justify-between items-center bg-cloud">
                            <h3 className="font-semibold text-ink text-sm uppercase tracking-wide flex items-center gap-2">
                                <ShieldCheck size={18} className="text-navy" /> Daily Core Compliance
                            </h3>
                            <Link to="/admin/attendance" className="text-xs font-medium text-navy hover:underline">View Ledger &rarr;</Link>
                        </div>
                        <div className="p-8 flex items-center justify-center gap-16">
                            <div className="text-center">
                                <div className="text-5xl font-mono font-bold text-navy">{defaultData.attendance.divisionsMarkedToday}</div>
                                <p className="text-xs font-semibold text-slate mt-2 uppercase tracking-widest">Registers Filed</p>
                            </div>
                            <div className="w-px h-16 bg-mist"></div>
                            <div className="text-center">
                                <div className="text-5xl font-mono font-bold text-slate/50">{Math.max(0, defaultData.attendance.totalDivisions - defaultData.attendance.divisionsMarkedToday)}</div>
                                <p className="text-xs font-semibold text-slate mt-2 uppercase tracking-widest">Registers Pending</p>
                            </div>
                        </div>
                    </div>

                    <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                        {['Admissions', 'Students', 'Teachers', 'Classes', 'Exams', 'Reports'].map(mod => (
                            <Link key={mod} to={`/admin/${mod.toLowerCase()}`} className="bg-paper border border-mist hover:border-navy hover:bg-cloud p-4 rounded-lg flex flex-col items-center justify-center transition-all group">
                                <span className="font-semibold text-sm text-ink group-hover:text-navy">{mod} Vault</span>
                            </Link>
                        ))}
                    </div>
                </div>

                {/* Right Column */}
                <div className="space-y-6">
                    <NoticeBoard notices={defaultData.notices.recent} title="Recent Directives" />
                </div>
            </div>
        </div>
    );
};

export default AdminDashboard;
