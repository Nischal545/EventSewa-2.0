import React from 'react'

export default function Button({children, index = 0, icon: Icon, iconPosition = "left", className, ...props}) {


    const colors = ["bg-green-500", 'bg-blue-500', 'bg-red-500']

    const hoverBorderColor = ["hover:border-yellow-500", "hover:border-black-500", "hover:border-blue-500"]


    return (
        <>

            <button

                className={`${colors[index] || ""} cursor-pointer hover: rounded-lg hover:border hover:border-solid hover:shadow-[0_0_1rem_rgba(34,211,238,1)] ${hoverBorderColor[index] || ""}font-bold transition-all duration-200 inline-flex flex-row items-center justify-center gap-2 px-4 py-2 ${className}`}
                {...props}

            >
                {Icon && iconPosition === "left" && <Icon className={"text-xl"}/>}

                <span>{children}</span>
            </button>

        </>
    )
}