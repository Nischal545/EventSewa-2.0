import React from "react";

export default function Button({
                                   children,
                                   index = 0,
                                   icon: Icon,
                                   iconPosition = "left",
                                   className = "",
                                   variant,
                                   as: Component = "button",
                                   type = "button",
                                   ...props
                               }) {
    // Backward-compatible colors using your original index prop
    const colors = [
        "bg-green-500 text-white hover:bg-green-600",
        "bg-blue-500 text-white hover:bg-blue-600",
        "bg-red-500 text-white hover:bg-red-600"
    ];

    const variants = {
        primary: "bg-blue-600 text-white hover:bg-blue-700",
        secondary: "bg-gray-200 text-gray-800 hover:bg-gray-300",
        danger: "bg-red-500 text-white hover:bg-red-600",
        sidebar: "bg-transparent text-gray-700 hover:bg-blue-50",
        ghost: "bg-transparent text-gray-700 hover:bg-gray-100"
    };

    const buttonStyle = variant
        ? variants[variant] || colors[index] || ""
        : colors[index] || "";

    return (
        <Component
            type={Component === "button" ? type : undefined}
            className={`
                ${buttonStyle}
                inline-flex items-center justify-center gap-2
                rounded-lg px-4 py-2 font-semibold
                cursor-pointer transition-all duration-200
                hover:shadow-md
                ${className}
            `}
            {...props}
        >
            {Icon && iconPosition === "left" && (
                <Icon className="text-xl shrink-0"/>
            )}

            <span>{children}</span>

            {Icon && iconPosition === "right" && (
                <Icon className="text-xl shrink-0"/>
            )}
        </Component>
    );
}
