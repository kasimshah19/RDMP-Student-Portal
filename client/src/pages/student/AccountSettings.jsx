import React, { useState } from 'react';
import { Settings, Shield, Bell, Key, Smartphone, Save } from 'lucide-react';
import { useToast } from '../../context/ToastContext';

const AccountSettings = () => {
    const { addToast } = useToast();

    const [notifications, setNotifications] = useState({
        email: true,
        sms: false,
        whatsapp: true,
        push: true
    });
    const [privacy, setPrivacy] = useState({
        profileVisibility: 'Classmates',
        showPhone: false,
        showEmail: true
    });
    const [isSaving, setIsSaving] = useState(false);

    const handleSave = () => {
        setIsSaving(true);
        setTimeout(() => {
            setIsSaving(false);
            addToast("Settings updated successfully", "success");
        }, 600);
    };

    return (
        <main className="px-4 lg:px-8 py-6 w-full max-w-[1000px] mx-auto flex-1 flex flex-col">
            <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 mb-6">
                <div>
                    <h1 className="text-2xl lg:text-3xl font-bold sdp-font-display text-[var(--navy)]">
                        Account Settings
                    </h1>
                    <p className="text-sm font-medium mt-1 text-[var(--slate)]">
                        Manage your preferences and portal configuration
                    </p>
                </div>
                <button onClick={handleSave} disabled={isSaving} className="flex items-center gap-2 px-6 py-2 bg-[var(--navy)] text-white hover:bg-slate-800 font-bold rounded-lg shadow-sm transition-colors disabled:opacity-75">
                    {isSaving ? 'Saving...' : <><Save size={16} /> Save Changes</>}
                </button>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {/* Notifications */}
                <div className="sdp-card p-6">
                    <div className="flex items-center gap-2 text-[var(--navy)] font-bold text-lg mb-5 border-b border-mist pb-3">
                        <Bell size={20} className="text-[var(--brass)]" /> Notification Preferences
                    </div>
                    <div className="space-y-4">
                        {Object.entries(notifications).map(([key, value]) => (
                            <label key={key} className="flex items-center justify-between cursor-pointer group">
                                <span className="text-sm font-semibold capitalize text-[var(--ink)] group-hover:text-[var(--navy)] transition-colors">
                                    {key} Alerts
                                </span>
                                <div className="relative">
                                    <input
                                        type="checkbox"
                                        className="sr-only peer"
                                        checked={value}
                                        onChange={() => setNotifications(prev => ({ ...prev, [key]: !prev[key] }))}
                                    />
                                    <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-[var(--success)]"></div>
                                </div>
                            </label>
                        ))}
                    </div>
                </div>

                {/* Privacy & Visibility */}
                <div className="sdp-card p-6">
                    <div className="flex items-center gap-2 text-[var(--navy)] font-bold text-lg mb-5 border-b border-mist pb-3">
                        <Shield size={20} className="text-[var(--brass)]" /> Privacy & Visibility
                    </div>
                    <div className="space-y-5">
                        <div>
                            <label className="block text-xs font-bold text-[var(--slate)] uppercase tracking-wide mb-2">Profile Visibility</label>
                            <select
                                value={privacy.profileVisibility}
                                onChange={e => setPrivacy(prev => ({ ...prev, profileVisibility: e.target.value }))}
                                className="sdp-input w-full shadow-sm"
                            >
                                <option>Public (Entire College)</option>
                                <option>Classmates Only</option>
                                <option>Teachers & Staff Only</option>
                            </select>
                        </div>
                        <div className="space-y-3 pt-2">
                            <label className="flex items-center gap-3 cursor-pointer">
                                <input type="checkbox" checked={privacy.showPhone} onChange={() => setPrivacy(prev => ({ ...prev, showPhone: !prev.showPhone }))} className="w-4 h-4 text-[var(--navy)] rounded border-gray-300 focus:ring-[var(--brass)] cursor-pointer" />
                                <span className="text-sm font-medium text-[var(--ink)]">Display Phone Number to Classmates</span>
                            </label>
                            <label className="flex items-center gap-3 cursor-pointer">
                                <input type="checkbox" checked={privacy.showEmail} onChange={() => setPrivacy(prev => ({ ...prev, showEmail: !prev.showEmail }))} className="w-4 h-4 text-[var(--navy)] rounded border-gray-300 focus:ring-[var(--brass)] cursor-pointer" />
                                <span className="text-sm font-medium text-[var(--ink)]">Display Email ID to Classmates</span>
                            </label>
                        </div>
                    </div>
                </div>

                {/* Security (Read-Only Shortcut) */}
                <div className="sdp-card p-6 md:col-span-2 flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 bg-[var(--cloud)] border border-mist shadow-none">
                    <div className="flex items-start gap-4">
                        <div className="p-3 bg-white rounded-full shadow-sm border border-mist shrink-0">
                            <Key size={24} className="text-[var(--navy)]" />
                        </div>
                        <div>
                            <h4 className="font-bold text-[var(--navy)] text-[15px]">Authentication & Password</h4>
                            <p className="text-sm text-[var(--slate)] font-medium mt-0.5">Your password and 2FA settings are managed directly under your My Profile tab for security reasons.</p>
                        </div>
                    </div>
                    <a href="/student/profile" className="px-5 py-2 bg-white border border-mist text-[var(--navy)] font-bold text-sm rounded transition-colors hover:border-[var(--brass)] shrink-0 shadow-sm text-center w-full sm:w-auto">
                        Go to Profile
                    </a>
                </div>
            </div>
        </main>
    );
};

export default AccountSettings;
