import React, { useState, useEffect } from 'react';
import { CreditCard, Download, ExternalLink, Receipt, AlertCircle, CheckCircle } from 'lucide-react';
import Loader from '../../components/common/Loader';
import EmptyState from '../../components/common/EmptyState';
import { getFees } from '../../services/studentService';
import { useToast } from '../../context/ToastContext';

const Fees = () => {
    const { addToast } = useToast();
    const [loading, setLoading] = useState(true);
    const [fees, setFees] = useState(null);

    useEffect(() => {
        const fetchFees = async () => {
            try {
                const res = await getFees();
                if (res.success) {
                    setFees(res.data);
                }
            } catch (err) {
                addToast("Failed to fetch fee details", "error");
            } finally {
                setLoading(false);
            }
        };
        fetchFees();
    }, []);

    const handlePayNow = () => {
        addToast("Payment gateway integration is under setup mode", "warning");
    };

    const handleReceipt = (inv) => {
        addToast(`Downloading receipt for ${inv.item}...`, "info");
    };

    if (loading) {
        return (
            <main className="px-4 lg:px-8 py-6 w-full max-w-[1200px] mx-auto flex-1 flex flex-col">
                <div className="flex h-[400px] w-full justify-center items-center"><Loader /></div>
            </main>
        );
    }

    if (!fees || !fees.invoices || fees.invoices.length === 0) {
        return (
            <main className="px-4 lg:px-8 py-6 w-full max-w-[1200px] mx-auto flex-1 flex flex-col">
                <div className="mb-6">
                    <h1 className="text-2xl lg:text-3xl font-bold sdp-font-display text-[var(--navy)]">Fees & Payments</h1>
                </div>
                <EmptyState title="No Fee Records" description="You have no generated invoices." icon={Receipt} />
            </main>
        );
    }

    const { summary, invoices } = fees;

    return (
        <main className="px-4 lg:px-8 py-6 w-full max-w-[1200px] mx-auto flex-1 flex flex-col">
            <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 mb-6">
                <div>
                    <h1 className="text-2xl lg:text-3xl font-bold sdp-font-display text-[var(--navy)]">
                        Fees & Due Payments
                    </h1>
                    <p className="text-sm font-medium mt-1 text-[var(--slate)]">
                        Track your academic fee structure and outstanding balances
                    </p>
                </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
                <div className="sdp-card p-5 border-l-4 border-l-[var(--brass)]">
                    <p className="text-sm font-bold text-[var(--slate)] uppercase tracking-wide">Total Fees</p>
                    <p className="text-3xl font-bold text-[var(--navy)] mt-2">₹ {summary.totalAmount.toLocaleString()}</p>
                </div>
                <div className="sdp-card p-5 border-l-4 border-l-[var(--success)]">
                    <p className="text-sm font-bold text-[var(--slate)] uppercase tracking-wide">Total Paid</p>
                    <p className="text-3xl font-bold text-[var(--success)] mt-2">₹ {summary.totalPaid.toLocaleString()}</p>
                </div>
                <div className="sdp-card p-5 border-l-4 border-l-[var(--danger)] bg-red-50/20">
                    <p className="text-sm font-bold text-[var(--slate)] uppercase tracking-wide">Balance Due</p>
                    <p className="text-3xl font-bold text-[var(--danger)] mt-2">₹ {summary.totalDue.toLocaleString()}</p>
                    {summary.totalDue > 0 && (
                        <button onClick={handlePayNow} className="mt-4 w-full bg-[var(--danger)] hover:bg-red-700 text-white py-2 rounded-lg text-sm font-bold shadow-sm transition-colors flex items-center justify-center gap-2">
                            <CreditCard size={16} /> Pay Outstanding
                        </button>
                    )}
                </div>
            </div>

            <h3 className="font-bold text-lg text-[var(--navy)] mb-4">Invoice Ledger</h3>
            <div className="sdp-card overflow-hidden">
                <div className="overflow-x-auto">
                    <table className="sdp-table w-full border-collapse">
                        <thead>
                            <tr>
                                <th>Invoice ID</th>
                                <th>Description</th>
                                <th>Due Date</th>
                                <th className="text-right">Amount</th>
                                <th>Status</th>
                                <th className="text-right">Actions</th>
                            </tr>
                        </thead>
                        <tbody>
                            {invoices.map((inv, idx) => (
                                <tr key={idx} className="hover:bg-[var(--cloud)]/40 transition-colors">
                                    <td className="font-semibold text-[var(--ink)]">#{inv.id}</td>
                                    <td className="text-[var(--slate)] font-medium text-sm">{inv.item}</td>
                                    <td className="text-[var(--slate)] font-medium text-[13.5px]">
                                        {new Date(inv.dueDate).toLocaleDateString('en-GB', { day: '2-digit', month: 'short', year: 'numeric' })}
                                    </td>
                                    <td className="text-right font-bold text-[var(--navy)]">₹ {inv.amount.toLocaleString()}</td>
                                    <td>
                                        {inv.status === 'Paid' ? (
                                            <span className="sdp-badge bg-[var(--success-soft)] text-[var(--success-text)] font-semibold border border-green-200">
                                                <CheckCircle size={12} className="mr-1" inline="true" /> Paid
                                            </span>
                                        ) : inv.status === 'Partially Paid' ? (
                                            <span className="sdp-badge bg-[var(--info-soft)] text-[var(--info-text)] font-semibold border border-blue-200">
                                                <AlertCircle size={12} className="mr-1" inline="true" /> Partial
                                            </span>
                                        ) : (
                                            <span className="sdp-badge bg-[var(--danger-soft)] text-[var(--danger-text)] font-semibold border border-red-200">
                                                <AlertCircle size={12} className="mr-1" inline="true" /> Unpaid
                                            </span>
                                        )}
                                    </td>
                                    <td className="text-right">
                                        {inv.status !== 'Unpaid' ? (
                                            <button onClick={() => handleReceipt(inv)} className="p-1.5 text-[var(--slate)] hover:text-[var(--success)] bg-[var(--cloud)] hover:bg-green-50 rounded transition-colors" title="Download Receipt">
                                                <Download size={16} />
                                            </button>
                                        ) : (
                                            <button onClick={handlePayNow} className="px-3 py-1.5 bg-[var(--navy)] text-white text-[11px] uppercase tracking-wide font-bold rounded shadow-sm hover:opacity-90 transition-opacity">
                                                Pay Now
                                            </button>
                                        )}
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>
        </main>
    );
};

export default Fees;
