import React from 'react';

const Loader = ({ fullScreen = false, message = "Processing securely..." }) => {
    const loaderBody = (
        <div className="flex flex-col items-center justify-center gap-4 p-8">
            <div className="w-10 h-10 border-4 border-prime-blue border-t-transparent rounded-full animate-spin"></div>
            <p className="font-bold text-gray-500 uppercase tracking-widest text-xs">{message}</p>
        </div>
    );

    if (fullScreen) {
        return (
            <div className="min-h-screen w-full bg-gray-50 flex items-center justify-center z-50">
                {loaderBody}
            </div>
        );
    }

    return (
        <div className="w-full flex items-center justify-center py-12">
            {loaderBody}
        </div>
    );
};

export default Loader;
