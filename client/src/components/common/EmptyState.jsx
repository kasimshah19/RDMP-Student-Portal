import React from 'react';

const EmptyState = ({
    title = "No records located",
    description = "",
    message = "",
    icon = null
}) => {
    // Lucide icons are forwardRef objects, they have a render function
    const isComponent = typeof icon === 'function' || (icon && typeof icon === 'object' && icon.render);
    const IconComponent = isComponent ? icon : null;

    return (
        <div className="flex flex-col items-center justify-center py-16 px-4 bg-white border border-gray-100 rounded-lg shadow-sm w-full mx-auto my-4 text-center">
            <div className="text-gray-400 mb-4 bg-gray-50 p-4 rounded-full shadow-inner flex items-center justify-center">
                {IconComponent ? (
                    <IconComponent size={48} strokeWidth={1.5} />
                ) : icon ? (
                    icon
                ) : (
                    <svg className="w-12 h-12" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 002-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10"></path>
                    </svg>
                )}
            </div>
            <h3 className="text-gray-800 font-bold text-lg mb-1">{title}</h3>
            {(description || message) && (
                <p className="text-gray-500 text-sm max-w-sm mx-auto">{description || message}</p>
            )}
        </div>
    );
};

export default EmptyState;
