import React, { useState, useEffect, useContext } from 'react';
import { useToast } from '../../context/ToastContext';
import Loader from '../../components/common/Loader';
import { getMyProfile, updateMyProfile, updateMyPassword } from '../../services/studentService';
import { User, Lock, Edit2, Info, Check, X, Shield, Phone, Mail, MapPin, Contact2, GraduationCap, Hash } from 'lucide-react';

function initials(name) {
    if (!name) return "S";
    return name.split(" ").map((p) => p[0]).slice(0, 2).join("").toUpperCase();
}

const Profile = () => {
    const { addToast } = useToast();
    const [loading, setLoading] = useState(true);
    const [saving, setSaving] = useState(false);

    // Data structures
    const [profile, setProfile] = useState(null);
    const [formData, setFormData] = useState({
        phone: '',
        email: '',
        address: '',
        emergencyContact: ''
    });

    // Original data for comparison (to disable save button if unchanged)
    const [originalData, setOriginalData] = useState({});

    // Password forms
    const [showPasswordForm, setShowPasswordForm] = useState(false);
    const [pwdData, setPwdData] = useState({
        currentPassword: '',
        newPassword: '',
        confirmPassword: ''
    });
    const [pwdSaving, setPwdSaving] = useState(false);
    const [pwdErrors, setPwdErrors] = useState({});
    const [formErrors, setFormErrors] = useState({});

    useEffect(() => {
        const fetchProfile = async () => {
            try {
                const res = await getMyProfile();
                if (res.success && res.data) {
                    setProfile(res.data);

                    const editable = {
                        phone: res.data.phone || '',
                        email: res.data.email || '',
                        address: res.data.address || '',
                        emergencyContact: res.data.emergencyContact || ''
                    };

                    setFormData(editable);
                    setOriginalData(editable);
                }
            } catch (err) {
                addToast("Failed to fetch profile details", "error");
            } finally {
                setLoading(false);
            }
        };

        fetchProfile();
    }, [addToast]);

    const hasChanges = JSON.stringify(formData) !== JSON.stringify(originalData);

    const handleFormChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({ ...prev, [name]: value }));
        // Clean error
        if (formErrors[name]) {
            setFormErrors(prev => ({ ...prev, [name]: null }));
        }
    };

    const handlePwdChange = (e) => {
        const { name, value } = e.target;
        setPwdData(prev => ({ ...prev, [name]: value }));
        // Clean error
        if (pwdErrors[name]) {
            setPwdErrors(prev => ({ ...prev, [name]: null }));
        }
    };

    const validateForm = () => {
        const errors = {};

        // Basic Phone validation
        if (formData.phone && !/^\d{10}$/.test(formData.phone)) {
            errors.phone = "Must be a valid 10-digit number.";
        }

        if (formData.email && !/\S+@\S+\.\S+/.test(formData.email)) {
            errors.email = "Must be a valid email address.";
        }

        setFormErrors(errors);
        return Object.keys(errors).length === 0;
    };

    const handleProfileSubmit = async (e) => {
        e.preventDefault();

        if (!validateForm()) return;

        setSaving(true);
        try {
            const res = await updateMyProfile(formData);
            if (res.success) {
                addToast("Profile updated successfully", "success");
                setOriginalData(formData); // Reset comparison

                // Keep local state in sync
                setProfile(prev => ({ ...prev, ...formData }));
            }
        } catch (err) {
            addToast(err.response?.data?.message || "Failed to update profile", "error");
        } finally {
            setSaving(false);
        }
    };

    const handlePasswordSubmit = async (e) => {
        e.preventDefault();

        const errors = {};
        if (pwdData.newPassword.length < 6) {
            errors.newPassword = "Password must be at least 6 characters long.";
        }
        if (pwdData.newPassword !== pwdData.confirmPassword) {
            errors.confirmPassword = "Passwords do not match.";
        }

        if (Object.keys(errors).length > 0) {
            setPwdErrors(errors);
            return;
        }

        setPwdSaving(true);
        try {
            const res = await updateMyPassword({
                currentPassword: pwdData.currentPassword,
                newPassword: pwdData.newPassword
            });
            if (res.success) {
                addToast("Password updated successfully", "success");
                setPwdData({ currentPassword: '', newPassword: '', confirmPassword: '' });
                setShowPasswordForm(false);
            }
        } catch (err) {
            // Check specifically for incorrect current password 
            if (err.response?.status === 400 && err.response?.data?.message?.includes("current password")) {
                setPwdErrors({ currentPassword: "Incorrect current password" });
            } else {
                addToast(err.response?.data?.message || "Failed to change password", "error");
            }
        } finally {
            setPwdSaving(false);
        }
    };

    if (loading) return <Loader />;

    return (
        <main className="px-4 lg:px-8 py-6 w-full max-w-[1200px] mx-auto flex-1">
            {/* Header Card */}
            <div className="sdp-card p-6 lg:p-8 mb-6 flex flex-col sm:flex-row items-center sm:items-start gap-6 border-mist">
                <div
                    className="flex items-center justify-center rounded-full shrink-0 sdp-font-display"
                    style={{
                        width: 90, height: 90,
                        background: "var(--navy)",
                        color: "var(--brass)",
                        fontSize: 32,
                        fontWeight: 600,
                        border: "4px solid #fff",
                        boxShadow: "0 0 0 2px var(--brass)"
                    }}
                >
                    {profile ? initials(profile.name) : "S"}
                </div>

                <div className="text-center sm:text-left flex-1 min-w-0">
                    <h1 className="sdp-font-display text-2xl lg:text-3xl font-bold" style={{ color: "var(--navy)" }}>
                        {profile?.name}
                    </h1>

                    <div className="flex flex-wrap items-center justify-center sm:justify-start gap-3 mt-4">
                        <span className="sdp-badge sdp-font-mono" style={{ background: "var(--navy)", color: "#fff" }}>
                            <Hash size={13} /> {profile?.rollNumber || "N/A"}
                        </span>
                        <span className="sdp-badge sdp-font-mono" style={{ background: "var(--info-soft)", color: "var(--info-text)" }}>
                            <Info size={13} /> {profile?.admissionNumber || "N/A"}
                        </span>
                        <span className="sdp-badge" style={{ background: "var(--success-soft)", color: "var(--success-text)" }}>
                            <GraduationCap size={13} /> {profile?.classGroupId?.name || "N/A"} - {profile?.divisionId?.name || "N/A"}
                        </span>
                    </div>
                </div>
            </div>

            {/* Grid Layout */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 items-start">

                {/* Left Column - Read Only Academic */}
                <div className="sdp-card p-6 h-full border-mist" style={{ background: "rgba(244, 246, 249, 0.4)" }}>
                    <div className="flex items-center gap-2 mb-1">
                        <h2 className="sdp-font-display text-lg font-semibold" style={{ color: "var(--navy)" }}>
                            Academic Record
                        </h2>
                    </div>
                    <p className="text-xs mb-6 flex items-center gap-1.5" style={{ color: "var(--slate)" }}>
                        <Lock size={12} /> Locked — contact office to change
                    </p>

                    <div className="space-y-5">
                        <div className="grid grid-cols-2 gap-4">
                            <div>
                                <p className="sdp-eyebrow mb-1">Admission No.</p>
                                <p className="font-medium text-[15px]" style={{ color: "var(--ink)" }}>{profile?.admissionNumber || "N/A"}</p>
                            </div>
                            <div>
                                <p className="sdp-eyebrow mb-1">Roll / Seat No.</p>
                                <p className="font-medium text-[15px]" style={{ color: "var(--ink)" }}>{profile?.rollNumber || "N/A"}</p>
                            </div>
                        </div>

                        <div className="grid grid-cols-2 gap-4">
                            <div>
                                <p className="sdp-eyebrow mb-1">Class & Stream</p>
                                <p className="font-medium text-[15px]" style={{ color: "var(--ink)" }}>{profile?.classGroupId?.name || "N/A"}</p>
                            </div>
                            <div>
                                <p className="sdp-eyebrow mb-1">Division</p>
                                <p className="font-medium text-[15px]" style={{ color: "var(--ink)" }}>{profile?.divisionId?.name || "N/A"}</p>
                            </div>
                        </div>

                        <div className="grid grid-cols-2 gap-4">
                            <div>
                                <p className="sdp-eyebrow mb-1">Date of Birth</p>
                                <p className="font-medium text-[15px]" style={{ color: "var(--ink)" }}>
                                    {profile?.dob ? new Date(profile.dob).toLocaleDateString() : "N/A"}
                                </p>
                            </div>
                            <div>
                                <p className="sdp-eyebrow mb-1">Blood Group</p>
                                <p className="font-medium text-[15px]" style={{ color: "var(--ink)" }}>{profile?.bloodGroup || "N/A"}</p>
                            </div>
                        </div>

                        <div className="pt-4 mt-2" style={{ borderTop: "1px solid var(--mist)" }}>
                            <div>
                                <p className="sdp-eyebrow mb-1">Primary Guardian / Parent</p>
                                <p className="font-medium text-[15px]" style={{ color: "var(--ink)" }}>{profile?.guardianName || "N/A"}</p>
                                {profile?.guardianPhone && (
                                    <p className="text-sm mt-1" style={{ color: "var(--slate)" }}>{profile?.guardianPhone}</p>
                                )}
                            </div>
                        </div>
                    </div>
                </div>

                {/* Right Column - Editable Form */}
                <div className="flex flex-col gap-6">
                    <form onSubmit={handleProfileSubmit} className="sdp-card p-6 border-mist">
                        <div className="flex items-center gap-2 mb-6">
                            <h2 className="sdp-font-display text-lg font-semibold" style={{ color: "var(--navy)" }}>
                                Contact Information
                            </h2>
                        </div>

                        <div className="space-y-4">
                            <div>
                                <label className="block text-sm font-medium mb-1.5" style={{ color: "var(--ink)" }}>
                                    Mobile Number
                                </label>
                                <div className="relative">
                                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                                        <Phone size={16} color="var(--slate)" />
                                    </div>
                                    <input
                                        type="tel"
                                        name="phone"
                                        value={formData.phone}
                                        onChange={handleFormChange}
                                        className={`w-full pl-10 pr-3 py-2.5 rounded-lg border focus:outline-none transition-colors duration-200 ${formErrors.phone ? 'border-[var(--danger)]' : 'border-mist focus:border-[var(--brass)] bg-[var(--paper)]'
                                            }`}
                                        style={{ fontSize: 14 }}
                                        placeholder="10-digit mobile number"
                                    />
                                </div>
                                {formErrors.phone && (
                                    <p className="text-xs mt-1 font-medium" style={{ color: "var(--danger)" }}>{formErrors.phone}</p>
                                )}
                            </div>

                            <div>
                                <label className="block text-sm font-medium mb-1.5" style={{ color: "var(--ink)" }}>
                                    Email Address
                                </label>
                                <div className="relative">
                                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                                        <Mail size={16} color="var(--slate)" />
                                    </div>
                                    <input
                                        type="email"
                                        name="email"
                                        value={formData.email}
                                        onChange={handleFormChange}
                                        className={`w-full pl-10 pr-3 py-2.5 rounded-lg border focus:outline-none transition-colors duration-200 ${formErrors.email ? 'border-[var(--danger)]' : 'border-mist focus:border-[var(--brass)] bg-[var(--paper)]'
                                            }`}
                                        style={{ fontSize: 14 }}
                                        placeholder="Email address"
                                    />
                                </div>
                                {formErrors.email && (
                                    <p className="text-xs mt-1 font-medium" style={{ color: "var(--danger)" }}>{formErrors.email}</p>
                                )}
                            </div>

                            <div>
                                <label className="block text-sm font-medium mb-1.5" style={{ color: "var(--ink)" }}>
                                    Current Address
                                </label>
                                <div className="relative">
                                    <div className="absolute top-3 left-3 flex items-center pointer-events-none">
                                        <MapPin size={16} color="var(--slate)" />
                                    </div>
                                    <textarea
                                        name="address"
                                        value={formData.address}
                                        onChange={handleFormChange}
                                        className="w-full pl-10 pr-3 py-2.5 rounded-lg border border-mist focus:border-[var(--brass)] focus:outline-none bg-[var(--paper)] transition-colors duration-200"
                                        style={{ fontSize: 14, minHeight: 80, resize: 'yes' }}
                                        placeholder="Full residential address"
                                    />
                                </div>
                            </div>

                            <div>
                                <label className="block text-sm font-medium mb-1.5" style={{ color: "var(--ink)" }}>
                                    Emergency Contact
                                </label>
                                <div className="relative">
                                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                                        <Contact2 size={16} color="var(--slate)" />
                                    </div>
                                    <input
                                        type="text"
                                        name="emergencyContact"
                                        value={formData.emergencyContact}
                                        onChange={handleFormChange}
                                        className="w-full pl-10 pr-3 py-2.5 rounded-lg border border-mist focus:border-[var(--brass)] focus:outline-none bg-[var(--paper)] transition-colors duration-200"
                                        style={{ fontSize: 14 }}
                                        placeholder="Name / Relationship / Phone"
                                    />
                                </div>
                            </div>
                        </div>

                        <div className="mt-6 pt-5 flex justify-end" style={{ borderTop: "1px solid var(--mist)" }}>
                            <button
                                type="submit"
                                disabled={!hasChanges || saving}
                                className={`sdp-btn-primary flex items-center gap-2 ${!hasChanges ? 'opacity-50 cursor-not-allowed' : ''}`}
                            >
                                {saving ? (
                                    <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                                ) : (
                                    <Check size={16} />
                                )}
                                Save Changes
                            </button>
                        </div>
                    </form>

                    {/* Password Card */}
                    <div className="sdp-card border-mist overflow-hidden">
                        <button
                            className="w-full p-6 flex items-center justify-between text-left hover:bg-[var(--cloud)] transition-colors"
                            onClick={() => setShowPasswordForm(!showPasswordForm)}
                        >
                            <div className="flex items-center gap-2">
                                <Shield size={20} color="var(--navy)" />
                                <h2 className="sdp-font-display text-lg font-semibold" style={{ color: "var(--navy)" }}>
                                    Security & Password
                                </h2>
                            </div>
                            <span className="text-sm font-medium" style={{ color: "var(--brass)" }}>
                                {showPasswordForm ? 'Close' : 'Change Password'}
                            </span>
                        </button>

                        {showPasswordForm && (
                            <form onSubmit={handlePasswordSubmit} className="p-6 pt-0 border-t border-mist bg-[var(--cloud)]/30">
                                <div className="space-y-4 pt-4">
                                    <div>
                                        <label className="block text-sm font-medium mb-1.5" style={{ color: "var(--ink)" }}>
                                            Current Password
                                        </label>
                                        <input
                                            type="password"
                                            name="currentPassword"
                                            required
                                            value={pwdData.currentPassword}
                                            onChange={handlePwdChange}
                                            className={`w-full px-3 py-2.5 rounded-lg border focus:outline-none transition-colors duration-200 ${pwdErrors.currentPassword ? 'border-[var(--danger)]' : 'border-mist focus:border-[var(--brass)] bg-[var(--paper)]'
                                                }`}
                                            style={{ fontSize: 14 }}
                                        />
                                        {pwdErrors.currentPassword && (
                                            <p className="text-xs mt-1 font-medium" style={{ color: "var(--danger)" }}>{pwdErrors.currentPassword}</p>
                                        )}
                                    </div>

                                    <div>
                                        <label className="block text-sm font-medium mb-1.5" style={{ color: "var(--ink)" }}>
                                            New Password
                                        </label>
                                        <input
                                            type="password"
                                            name="newPassword"
                                            required
                                            value={pwdData.newPassword}
                                            onChange={handlePwdChange}
                                            className={`w-full px-3 py-2.5 rounded-lg border focus:outline-none transition-colors duration-200 ${pwdErrors.newPassword ? 'border-[var(--danger)]' : 'border-mist focus:border-[var(--brass)] bg-[var(--paper)]'
                                                }`}
                                            style={{ fontSize: 14 }}
                                        />
                                        {pwdErrors.newPassword && (
                                            <p className="text-xs mt-1 font-medium" style={{ color: "var(--danger)" }}>{pwdErrors.newPassword}</p>
                                        )}
                                    </div>

                                    <div>
                                        <label className="block text-sm font-medium mb-1.5" style={{ color: "var(--ink)" }}>
                                            Confirm New Password
                                        </label>
                                        <input
                                            type="password"
                                            name="confirmPassword"
                                            required
                                            value={pwdData.confirmPassword}
                                            onChange={handlePwdChange}
                                            className={`w-full px-3 py-2.5 rounded-lg border focus:outline-none transition-colors duration-200 ${pwdErrors.confirmPassword ? 'border-[var(--danger)]' : 'border-mist focus:border-[var(--brass)] bg-[var(--paper)]'
                                                }`}
                                            style={{ fontSize: 14 }}
                                        />
                                        {pwdErrors.confirmPassword && (
                                            <p className="text-xs mt-1 font-medium" style={{ color: "var(--danger)" }}>{pwdErrors.confirmPassword}</p>
                                        )}
                                    </div>
                                </div>

                                <div className="mt-5 flex justify-end">
                                    <button
                                        type="submit"
                                        disabled={pwdSaving || !pwdData.currentPassword || !pwdData.newPassword}
                                        className="rounded-lg px-4 py-2 text-sm font-medium text-white shadow-sm transition-colors"
                                        style={{ background: pwdSaving ? 'var(--slate)' : 'var(--navy)' }}
                                    >
                                        {pwdSaving ? 'Updating...' : 'Update Password'}
                                    </button>
                                </div>
                            </form>
                        )}
                    </div>
                </div>
            </div>
        </main>
    );
};

export default Profile;