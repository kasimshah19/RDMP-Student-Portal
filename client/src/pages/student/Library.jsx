import React, { useState, useEffect } from 'react';
import { BookOpen, Calendar, Clock, AlertTriangle } from 'lucide-react';
import Loader from '../../components/common/Loader';
import EmptyState from '../../components/common/EmptyState';
import { getLibrary } from '../../services/studentService';
import { useToast } from '../../context/ToastContext';

const Library = () => {
    const { addToast } = useToast();
    const [loading, setLoading] = useState(true);
    const [library, setLibrary] = useState(null);

    useEffect(() => {
        const fetchLibrary = async () => {
            try {
                const res = await getLibrary();
                if (res.success) {
                    setLibrary(res.data);
                }
            } catch (err) {
                addToast("Failed to fetch library records", "error");
            } finally {
                setLoading(false);
            }
        };
        fetchLibrary();
    }, []);

    if (loading) {
        return (
            <main className="px-4 lg:px-8 py-6 w-full max-w-[1200px] mx-auto flex-1 flex flex-col">
                <div className="flex h-[400px] w-full justify-center items-center"><Loader /></div>
            </main>
        );
    }

    if (!library || !library.issuedBooks || library.issuedBooks.length === 0) {
        return (
            <main className="px-4 lg:px-8 py-6 w-full max-w-[1200px] mx-auto flex-1 flex flex-col">
                <div className="mb-6">
                    <h1 className="text-2xl lg:text-3xl font-bold sdp-font-display text-[var(--navy)]">Digital Library</h1>
                </div>
                <EmptyState title="No Books Issued" description="You have not borrowed any books from the college library." icon={BookOpen} />
            </main>
        );
    }

    const { summary, issuedBooks } = library;

    const BookCard = ({ book }) => {
        const due = new Date(book.dueDate);
        const today = new Date();
        const diffDays = Math.ceil((due - today) / (1000 * 60 * 60 * 24));

        const isOverdue = diffDays < 0;

        return (
            <div className={`sdp-card p-5 border-t-4 flex flex-col gap-3 transition-colors ${isOverdue ? 'border-t-[var(--danger)] bg-red-50/10 hover:border-l-[var(--danger)]' : 'border-t-[var(--brass)] hover:border-l-4 hover:border-l-[var(--brass)]'
                }`}>
                <div>
                    <h4 className="font-bold text-[17px] leading-tight text-[var(--navy)]">{book.title}</h4>
                    <p className="text-sm font-medium text-[var(--slate)] mt-1">{book.author}</p>
                </div>

                <div className="flex items-center gap-2 text-xs font-semibold px-3 py-1.5 rounded bg-[var(--cloud)] text-[var(--slate)] max-w-fit">
                    <span className="opacity-70">ISBN:</span> {book.isbn}
                </div>

                <div className="mt-auto pt-4 border-t border-mist flex flex-col gap-2">
                    <div className="flex justify-between items-center text-sm font-medium text-[var(--ink)]">
                        <span className="flex items-center gap-1.5"><Calendar size={15} className="text-slate-400" /> Issued:</span>
                        <span>{new Date(book.issuedDate).toLocaleDateString('en-GB', { day: '2-digit', month: 'short' })}</span>
                    </div>
                    <div className={`flex justify-between items-center text-sm font-bold ${isOverdue ? 'text-[var(--danger)]' : 'text-[var(--ink)]'}`}>
                        <span className="flex items-center gap-1.5">
                            {isOverdue ? <AlertTriangle size={15} /> : <Clock size={15} className="text-slate-400" />}
                            Due:
                        </span>
                        <span>{new Date(book.dueDate).toLocaleDateString('en-GB', { day: '2-digit', month: 'short' })}</span>
                    </div>
                </div>

                {isOverdue && (
                    <div className="mt-2 bg-[var(--danger-soft)] text-[var(--danger-text)] text-xs font-bold text-center py-2 rounded">
                        Overdue by {Math.abs(diffDays)} days. Fine expanding.
                    </div>
                )}
            </div>
        );
    };

    return (
        <main className="px-4 lg:px-8 py-6 w-full max-w-[1200px] mx-auto flex-1 flex flex-col">
            <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 mb-6">
                <div>
                    <h1 className="text-2xl lg:text-3xl font-bold sdp-font-display text-[var(--navy)]">
                        Digital Library
                    </h1>
                    <p className="text-sm font-medium mt-1 text-[var(--slate)]">
                        Track your borrowed resources and return deadlines
                    </p>
                </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
                <div className="sdp-card p-5 border-l-4 border-l-[var(--info)] bg-blue-50/30">
                    <p className="text-sm font-bold text-[var(--slate)] uppercase tracking-wide">Books Held</p>
                    <p className="text-3xl font-bold text-[var(--navy)] mt-2">{summary.booksHeld}/{summary.allowedLimit}</p>
                </div>
                <div className="sdp-card p-5 border-l-4 border-l-[var(--danger)] bg-red-50/20">
                    <p className="text-sm font-bold text-[var(--slate)] uppercase tracking-wide">Pending Fines</p>
                    <p className="text-3xl font-bold text-[var(--danger)] mt-2">₹ {summary.totalFines.toLocaleString()}</p>
                </div>
                <div className="sdp-card p-5 border-l-4 border-l-[var(--warning)] bg-amber-50/20">
                    <p className="text-sm font-bold text-[var(--slate)] uppercase tracking-wide">Overdue Items</p>
                    <p className="text-3xl font-bold text-amber-600 mt-2">{issuedBooks.filter(b => new Date(b.dueDate) < new Date()).length}</p>
                </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {issuedBooks.map((book, idx) => (
                    <BookCard key={idx} book={book} />
                ))}
            </div>
        </main>
    );
};

export default Library;
