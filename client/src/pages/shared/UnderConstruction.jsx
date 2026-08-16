import React from 'react';
import { Construction, ArrowLeft } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

const UnderConstruction = () => {
    const navigate = useNavigate();
    return (
        <div className="flex flex-col items-center justify-center min-h-[70vh] text-center">
            <div className="w-20 h-20 bg-mist rounded-full flex items-center justify-center text-slate mb-6 shadow-inner">
                <Construction size={40} />
            </div>
            <h2 className="text-3xl font-display font-bold text-navy mb-3">Module Under Construction</h2>
            <p className="text-slate max-w-md mx-auto mb-8 leading-relaxed">
                This section of the portal is currently being built and will be available in a future update. Check back later!
            </p>
            <button
                onClick={() => navigate(-1)}
                className="flex items-center gap-2 px-6 py-2.5 bg-white border border-mist text-ink hover:bg-cloud hover:border-slate/30 rounded-xl transition-all font-semibold shadow-sm"
            >
                <ArrowLeft size={18} /> Go Back
            </button>
        </div>
    );
};

export default UnderConstruction;
