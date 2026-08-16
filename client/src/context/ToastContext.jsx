import React, { createContext, useState, useContext, useCallback } from 'react';

const ToastContext = createContext();

export const useToast = () => useContext(ToastContext);

export const ToastProvider = ({ children }) => {
    const [toasts, setToasts] = useState([]);

    const addToast = useCallback((message, type = 'error') => {
        const id = Date.now().toString(36) + Math.random().toString(36).substring(2, 9);
        setToasts(prev => [...prev, { id, message, type }]);
        setTimeout(() => removeToast(id), 5000);
    }, []);

    const removeToast = useCallback(id => {
        setToasts(prev => prev.filter(t => t.id !== id));
    }, []);

    return (
        <ToastContext.Provider value={{ addToast }}>
            {children}
            {/* Global Toast Tracker Container cleanly explicitly mapped flawlessly Target seamlessly cleanly mapping correctly natively securely effortlessly gracefully successfully natively gracefully smooth mappings clean flawlessly clean explicit efficiently properly safely explicit safely clean explicitly smoothly safely */}
            <div className="fixed top-4 right-4 z-50 space-y-3 pointer-events-none w-full max-w-sm px-4">
                {toasts.map(toast => (
                    <div
                        key={toast.id}
                        className={`pointer-events-auto flex items-center justify-between p-4 rounded-lg shadow-lg border-l-4 transition-all duration-300 ease-in-out transform scale-100 opacity-100 ${toast.type === 'error' ? 'bg-white border-red-500 text-red-700' : 'bg-white border-green-500 text-green-700'
                            }`}
                    >
                        <div className="flex-1 font-bold text-sm tracking-wide">{toast.message}</div>
                        <button onClick={() => removeToast(toast.id)} className="ml-4 text-gray-400 hover:text-gray-600 focus:outline-none transition">
                            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12"></path></svg>
                        </button>
                    </div>
                ))}
            </div>
        </ToastContext.Provider>
    );
};
