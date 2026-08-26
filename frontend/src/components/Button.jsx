export default function Button({children, index, className, ...props}) {


    const colors = ["bg-green-500", 'bg-blue-500', 'bg-red-500']

    return (
        <>

            <button

                className={`${colors[index]} cursor-pointer border border-solid border-pink-200 p-2 font-bold ${className || ""}`}
                {...props}

            >
                {children}
            </button>

        </>
    )
}