import React from "react";

export default function ProfileCircle({
                                          imageSrc,
                                          name = "User",
                                          position = "top-right", // Options: 'top-left', 'top-right', 'bottom-left', 'bottom-right'
                                          onClick,
                                      }) {
    // Positioning अनुसार Tailwind CSS classes map गरिएको
    const positionClasses = {
        "top-left": "top-4 left-4",
        "top-right": "top-4 right-4",
        "bottom-left": "bottom-4 left-4",
        "bottom-right": "bottom-4 right-4",
    };

    // Name बाट First Letter (Initial) निकाल्न (यदि Image नभए)
    const initial = name ? name.charAt(0).toUpperCase() : "U";

    return (
        <div
            onClick={onClick}
            className={`${positionClasses[position] || positionClasses["top-right"]}`}
        >
            <div
                className="w-12 h-12 rounded-full border-2 border-emerald-400 bg-emerald-600 text-white flex items-center justify-center font-bold text-xl cursor-pointer shadow-lg hover:scale-105 hover:shadow-emerald-300/50 transition-all duration-200 overflow-hidden">
                {imageSrc ? (
                    <img
                        src={imageSrc}
                        alt={name}
                        className="w-full h-full object-cover"
                    />
                ) : (
                    <span>{initial}</span>
                )}
            </div>
        </div>
    );
}