import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { submitAdmission } from '../../services/admissionService';

const AdmissionForm = () => {
    const navigate = useNavigate();
    const [formData, setFormData] = useState({
        fullName: '', dob: '', gender: 'Male', email: '', phone: '', address: '',
        appliedClass: '11th', previousSchool: '', previousPercentage: '', previousBoard: ''
    });
    const [step, setStep] = useState(1);
    const [errorMsg, setErrorMsg] = useState('');
    const [isSubmitting, setIsSubmitting] = useState(false);

    const handleSubmit = async (e) => {
        e.preventDefault();
        setIsSubmitting(true);
        setErrorMsg('');
        try {
            const res = await submitAdmission(formData);
            if (res.success) {
                navigate(`/admission/${res.applicationId}/documents`);
            } else {
                setErrorMsg(res.message);
            }
        } catch (err) {
            setErrorMsg(err.response?.data?.message || 'Failed to submit application');
        }
        setIsSubmitting(false);
    };

    const nextStep = () => setStep(step + 1);
    const prevStep = () => setStep(step - 1);

    return (
        <div className="min-h-screen bg-gray-50 flex flex-col">
            <header className="bg-prime-blue text-white shadow-md p-4 flex items-center justify-between">
                <h1 className="text-xl font-bold">RDMP Student Portal</h1>
                <Link to="/login" className="text-sm underline hover:text-gray-200">Go to Login</Link>
            </header>

            <main className="flex-1 flex justify-center py-10 px-4 sm:px-6">
                <div className="bg-white p-8 rounded-xl shadow-lg w-full max-w-2xl border border-gray-100">
                    <h2 className="text-2xl font-bold text-prime-blue mb-6">New Application</h2>

                    {errorMsg && <div className="mb-4 bg-red-50 text-red-600 p-3 rounded text-sm">{errorMsg}</div>}

                    <form onSubmit={step === 2 ? handleSubmit : (e) => { e.preventDefault(); nextStep(); }}>
                        {step === 1 && (
                            <div className="space-y-4">
                                <h3 className="text-lg font-medium text-gray-700 border-b pb-2">Step 1: Personal Information</h3>
                                <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                                    <div>
                                        <label className="block text-sm font-medium text-gray-700">Full Name</label>
                                        <input required type="text" className="mt-1 block w-full p-2 border border-gray-300 rounded"
                                            value={formData.fullName} onChange={e => setFormData({ ...formData, fullName: e.target.value })} />
                                    </div>
                                    <div>
                                        <label className="block text-sm font-medium text-gray-700">Date of Birth</label>
                                        <input required type="date" className="mt-1 block w-full p-2 border border-gray-300 rounded"
                                            value={formData.dob} onChange={e => setFormData({ ...formData, dob: e.target.value })} />
                                    </div>
                                    <div>
                                        <label className="block text-sm font-medium text-gray-700">Gender</label>
                                        <select className="mt-1 block w-full p-2 border border-gray-300 rounded"
                                            value={formData.gender} onChange={e => setFormData({ ...formData, gender: e.target.value })}>
                                            <option>Male</option><option>Female</option><option>Other</option>
                                        </select>
                                    </div>
                                    <div>
                                        <label className="block text-sm font-medium text-gray-700">Phone Number</label>
                                        <input required type="tel" className="mt-1 block w-full p-2 border border-gray-300 rounded"
                                            value={formData.phone} onChange={e => setFormData({ ...formData, phone: e.target.value })} />
                                    </div>
                                </div>
                                <div>
                                    <label className="block text-sm font-medium text-gray-700">Email Address</label>
                                    <input required type="email" className="mt-1 block w-full p-2 border border-gray-300 rounded"
                                        value={formData.email} onChange={e => setFormData({ ...formData, email: e.target.value })} />
                                </div>
                                <div>
                                    <label className="block text-sm font-medium text-gray-700">Full Address</label>
                                    <textarea required className="mt-1 block w-full p-2 border border-gray-300 rounded" rows="3"
                                        value={formData.address} onChange={e => setFormData({ ...formData, address: e.target.value })}></textarea>
                                </div>
                                <div className="flex justify-end pt-4">
                                    <button type="submit" className="bg-prime-blue text-white px-6 py-2 rounded shadow hover:bg-blue-800 transition">Next Step</button>
                                </div>
                            </div>
                        )}

                        {step === 2 && (
                            <div className="space-y-4">
                                <h3 className="text-lg font-medium text-gray-700 border-b pb-2">Step 2: Academic Information</h3>
                                <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                                    <div>
                                        <label className="block text-sm font-medium text-gray-700">Applying for Class</label>
                                        <select className="mt-1 block w-full p-2 border border-gray-300 rounded"
                                            value={formData.appliedClass} onChange={e => setFormData({ ...formData, appliedClass: e.target.value })}>
                                            <option>11th</option><option>12th</option>
                                        </select>
                                    </div>
                                    <div>
                                        <label className="block text-sm font-medium text-gray-700">Previous School Name</label>
                                        <input required type="text" className="mt-1 block w-full p-2 border border-gray-300 rounded"
                                            value={formData.previousSchool} onChange={e => setFormData({ ...formData, previousSchool: e.target.value })} />
                                    </div>
                                    <div>
                                        <label className="block text-sm font-medium text-gray-700">Previous Board</label>
                                        <input required type="text" className="mt-1 block w-full p-2 border border-gray-300 rounded" placeholder="e.g. State Board"
                                            value={formData.previousBoard} onChange={e => setFormData({ ...formData, previousBoard: e.target.value })} />
                                    </div>
                                    <div>
                                        <label className="block text-sm font-medium text-gray-700">Pass Percentage (%)</label>
                                        <input required type="number" step="0.01" className="mt-1 block w-full p-2 border border-gray-300 rounded"
                                            value={formData.previousPercentage} onChange={e => setFormData({ ...formData, previousPercentage: e.target.value })} />
                                    </div>
                                </div>
                                <div className="flex justify-between pt-6">
                                    <button type="button" onClick={prevStep} className="bg-gray-200 text-gray-700 px-6 py-2 rounded hover:bg-gray-300 transition">Back</button>
                                    <button type="submit" disabled={isSubmitting} className="bg-green-600 text-white px-6 py-2 rounded shadow hover:bg-green-700 transition disabled:opacity-50">
                                        {isSubmitting ? 'Submitting...' : 'Submit Form'}
                                    </button>
                                </div>
                            </div>
                        )}
                    </form>
                </div>
            </main>
        </div>
    );
};

export default AdmissionForm;
