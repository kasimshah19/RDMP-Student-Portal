import React, { useContext } from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import Login from '../pages/auth/Login';
import AdminDashboard from '../pages/admin/AdminDashboard';
import TeacherDashboard from '../pages/teacher/TeacherDashboard';
import StudentDashboard from '../pages/student/StudentDashboard';
import AdmissionForm from '../pages/public/AdmissionForm';
import DocumentUpload from '../pages/public/DocumentUpload';
import ApplicationStatus from '../pages/public/ApplicationStatus';
import AdmissionList from '../pages/admin/AdmissionList';
import AdmissionDetail from '../pages/admin/AdmissionDetail';
import ClassManagement from '../pages/admin/ClassManagement';
import StudentList from '../pages/admin/StudentList';
import StudentDetail from '../pages/admin/StudentDetail';
import TeacherList from '../pages/admin/TeacherList';
import AttendanceOverview from '../pages/admin/AttendanceOverview';
import Profile from '../pages/student/Profile';
import MyAttendance from '../pages/student/MyAttendance';
import MyExaminations from '../pages/student/MyExaminations';
import MyResults from '../pages/student/MyResults';
import TimeTable from '../pages/student/TimeTable';
import Notices from '../pages/student/Notices';
import Documents from '../pages/student/Documents';
import Fees from '../pages/student/Fees';
import Library from '../pages/student/Library';
import Feedback from '../pages/student/Feedback';
import Leave from '../pages/student/Leave';
import AccountSettings from '../pages/student/AccountSettings';
import MarkAttendance from '../pages/teacher/MarkAttendance';
import AttendanceReport from '../pages/teacher/AttendanceReport';
import EnterMarks from '../pages/teacher/EnterMarks';
import ExamSummary from '../pages/teacher/ExamSummary';
import ExamManagement from '../pages/admin/ExamManagement';
import NoticeManagement from '../pages/admin/NoticeManagement';
import Reports from '../pages/admin/Reports';
import DocumentVerification from '../pages/admin/DocumentVerification';
import { AuthContext } from '../context/AuthContext';
import AdminTeacherLayout from '../components/layout/AdminTeacherLayout';
import StudentLayout from '../components/layout/StudentLayout';
import PublicLayout from '../components/layout/PublicLayout';
import Home from '../pages/public/Home';
import UnderConstruction from '../pages/shared/UnderConstruction';

const ProtectedRoute = ({ children, allowedRoles }) => {
    const { isAuthenticated, user, loading } = useContext(AuthContext);
    if (loading) return <div className="min-h-screen flex items-center justify-center">Loading...</div>;
    if (!isAuthenticated) return <Navigate to="/login" replace />;
    if (!allowedRoles.includes(user.role)) return <Navigate to={`/${user.role}/dashboard`} replace />;
    return children;
};

const DefaultRedirect = () => {
    const { isAuthenticated, user, loading } = useContext(AuthContext);
    if (loading) return null;
    if (isAuthenticated && user) return <Navigate to={`/${user.role}/dashboard`} replace />;
    return <Navigate to="/login" replace />;
};

const LoginRoute = () => {
    const { isAuthenticated, user, loading } = useContext(AuthContext);
    if (loading) return null;
    if (isAuthenticated && user) return <Navigate to={`/${user.role}/dashboard`} replace />;
    return <Login />;
};

const AppRoutes = () => {
    return (
        <Routes>
            <Route path="/login" element={<LoginRoute />} />

            {/* Public */}
            <Route element={<PublicLayout />}>
                <Route path="/" element={<Home />} />
                <Route path="/about" element={<UnderConstruction />} />
                <Route path="/admissions" element={<UnderConstruction />} />
                <Route path="/academics" element={<UnderConstruction />} />
                <Route path="/students" element={<UnderConstruction />} />
                <Route path="/notices" element={<UnderConstruction />} />
                <Route path="/gallery" element={<UnderConstruction />} />
                <Route path="/contact" element={<UnderConstruction />} />
            </Route>

            <Route path="/admission/apply" element={<AdmissionForm />} />
            <Route path="/admission/:applicationId/documents" element={<DocumentUpload />} />
            <Route path="/admission/status" element={<ApplicationStatus />} />

            {/* Admin & Teacher */}
            <Route element={<AdminTeacherLayout />}>
                <Route path="/admin/dashboard" element={<ProtectedRoute allowedRoles={['admin']}><AdminDashboard /></ProtectedRoute>} />
                <Route path="/admin/admissions" element={<ProtectedRoute allowedRoles={['admin']}><AdmissionList /></ProtectedRoute>} />
                <Route path="/admin/admissions/:id" element={<ProtectedRoute allowedRoles={['admin']}><AdmissionDetail /></ProtectedRoute>} />
                <Route path="/admin/classes" element={<ProtectedRoute allowedRoles={['admin']}><ClassManagement /></ProtectedRoute>} />
                <Route path="/admin/students" element={<ProtectedRoute allowedRoles={['admin']}><StudentList /></ProtectedRoute>} />
                <Route path="/admin/students/:id" element={<ProtectedRoute allowedRoles={['admin']}><StudentDetail /></ProtectedRoute>} />
                <Route path="/admin/teachers" element={<ProtectedRoute allowedRoles={['admin']}><TeacherList /></ProtectedRoute>} />
                <Route path="/admin/attendance" element={<ProtectedRoute allowedRoles={['admin']}><AttendanceOverview /></ProtectedRoute>} />
                <Route path="/admin/exams" element={<ProtectedRoute allowedRoles={['admin']}><ExamManagement /></ProtectedRoute>} />
                <Route path="/admin/notices" element={<ProtectedRoute allowedRoles={['admin']}><NoticeManagement /></ProtectedRoute>} />
                <Route path="/admin/reports" element={<ProtectedRoute allowedRoles={['admin']}><Reports /></ProtectedRoute>} />
                <Route path="/admin/documents" element={<ProtectedRoute allowedRoles={['admin']}><DocumentVerification /></ProtectedRoute>} />

                <Route path="/teacher/dashboard" element={<ProtectedRoute allowedRoles={['teacher']}><TeacherDashboard /></ProtectedRoute>} />
                <Route path="/teacher/attendance/mark" element={<ProtectedRoute allowedRoles={['teacher']}><MarkAttendance /></ProtectedRoute>} />
                <Route path="/teacher/attendance/report" element={<ProtectedRoute allowedRoles={['teacher']}><AttendanceReport /></ProtectedRoute>} />
                <Route path="/teacher/marks/enter" element={<ProtectedRoute allowedRoles={['teacher']}><EnterMarks /></ProtectedRoute>} />
                <Route path="/teacher/marks/summary" element={<ProtectedRoute allowedRoles={['teacher']}><ExamSummary /></ProtectedRoute>} />
                <Route path="/teacher/my-classes" element={<ProtectedRoute allowedRoles={['teacher']}><UnderConstruction /></ProtectedRoute>} />
                <Route path="/teacher/timetable" element={<ProtectedRoute allowedRoles={['teacher']}><UnderConstruction /></ProtectedRoute>} />
                <Route path="/teacher/assignments" element={<ProtectedRoute allowedRoles={['teacher']}><UnderConstruction /></ProtectedRoute>} />
                <Route path="/teacher/notices" element={<ProtectedRoute allowedRoles={['teacher']}><UnderConstruction /></ProtectedRoute>} />
                <Route path="/teacher/reports" element={<ProtectedRoute allowedRoles={['teacher']}><UnderConstruction /></ProtectedRoute>} />
                <Route path="/teacher/library" element={<ProtectedRoute allowedRoles={['teacher']}><UnderConstruction /></ProtectedRoute>} />
                <Route path="/teacher/messages" element={<ProtectedRoute allowedRoles={['teacher']}><UnderConstruction /></ProtectedRoute>} />
                <Route path="/teacher/settings" element={<ProtectedRoute allowedRoles={['teacher']}><UnderConstruction /></ProtectedRoute>} />
                <Route path="/teacher/students" element={<ProtectedRoute allowedRoles={['teacher']}><UnderConstruction /></ProtectedRoute>} />
                <Route path="/teacher/examinations" element={<ProtectedRoute allowedRoles={['teacher']}><UnderConstruction /></ProtectedRoute>} />

                {/* Visual View Profile Button Fallbacks */}
                <Route path="/teacher/profile" element={<ProtectedRoute allowedRoles={['teacher']}><UnderConstruction /></ProtectedRoute>} />
                <Route path="/admin/profile" element={<ProtectedRoute allowedRoles={['admin']}><UnderConstruction /></ProtectedRoute>} />
            </Route>

            {/* Student */}
            <Route element={<StudentLayout />}>
                <Route path="/student/dashboard" element={<ProtectedRoute allowedRoles={['student']}><StudentDashboard /></ProtectedRoute>} />
                <Route path="/student/profile" element={<ProtectedRoute allowedRoles={['student']}><Profile /></ProtectedRoute>} />
                <Route path="/student/attendance" element={<ProtectedRoute allowedRoles={['student']}><MyAttendance /></ProtectedRoute>} />
                <Route path="/student/examinations" element={<ProtectedRoute allowedRoles={['student']}><MyExaminations /></ProtectedRoute>} />
                <Route path="/student/results" element={<ProtectedRoute allowedRoles={['student']}><MyResults /></ProtectedRoute>} />
                <Route path="/student/timetable" element={<ProtectedRoute allowedRoles={['student']}><TimeTable /></ProtectedRoute>} />
                <Route path="/student/notices" element={<ProtectedRoute allowedRoles={['student']}><Notices /></ProtectedRoute>} />
                <Route path="/student/documents" element={<ProtectedRoute allowedRoles={['student']}><Documents /></ProtectedRoute>} />
                <Route path="/student/fees" element={<ProtectedRoute allowedRoles={['student']}><Fees /></ProtectedRoute>} />
                <Route path="/student/library" element={<ProtectedRoute allowedRoles={['student']}><Library /></ProtectedRoute>} />
                <Route path="/student/feedback" element={<ProtectedRoute allowedRoles={['student']}><Feedback /></ProtectedRoute>} />
                <Route path="/student/leave" element={<ProtectedRoute allowedRoles={['student']}><Leave /></ProtectedRoute>} />
                <Route path="/student/settings" element={<ProtectedRoute allowedRoles={['student']}><AccountSettings /></ProtectedRoute>} />
            </Route>

            <Route path="*" element={<DefaultRedirect />} />
        </Routes>
    );
};

export default AppRoutes;
