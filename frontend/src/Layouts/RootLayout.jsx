import {Link} from 'react-router-dom'
import Logo from '../assets/Logo.png'
import {MdMenu, MdClose} from 'react-icons/md';
import React from "react";
import Button from '../components/Button.jsx'

export default function RootLayout() {

    const [open, setOpen] = React.useState(false);

    function handleOpen() {
        setOpen(true);
    }

    function handleClose() {
        setOpen(false);
    }

    return (
        <>
            <div className={"mt-4 pt-4 border-top overflow-x-hidden"}>
                {/*    container */}
                <header>
                    {/*    AD or maybe signup as organizer*/}
                </header>

                <div>
                    {/*    SIDEBAR TRIGGER*/}
                    {!open && (
                        <MdMenu
                            className="text-5xl ml-4 mt-3 cursor-pointer"
                            onClick={handleOpen}
                        />
                    )}

                    {/*    OVERLAY - click outside to close */}
                    <div
                        className={`fixed inset-0 bg-black/40 z-30 transition-opacity duration-300 ease-in-out ${
                            open ? "opacity-100 pointer-events-auto" : "opacity-0 pointer-events-none"
                        }`}
                        onClick={handleClose}
                    />

                    {/*    SIDEBAR PANEL */}
                    <div
                        className={`fixed top-0 left-0 z-40 bg-emerald-300 w-2/5 min-h-screen
                        transform transition-transform duration-300 ease-in-out
                        ${open ? "translate-x-0" : "-translate-x-full"}`}
                    >
                        <MdClose
                            className="text-4xl m-4 cursor-pointer"
                            onClick={handleClose}
                        />

                        <div
                            className={"grid grid-cols-1 grid-rows-[3rem_3rem_3rem_3rem_3rem] gap-5"}>

                            <Button index={2} className={""}>Home</Button>
                            <Button index={2} className={""}>Home</Button>
                            <Button index={2} className={""}>Home</Button>
                            <Button index={2} className={""}>Home</Button>
                            <Button index={2} className={""}>Home</Button>

                        </div>
                    </div>

                </div>

                <main>
                    <div>
                        {/*    profile*/}
                    </div>
                    {/*   main view*/}
                </main>

                {/*<footer>*/}
                {/*/!*    only for some pages not global one*!/*/}
                {/*</footer>*/}
            </div>
        </>
    )
}