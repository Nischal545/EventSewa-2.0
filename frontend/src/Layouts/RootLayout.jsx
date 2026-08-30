import {Link} from 'react-router-dom'
import Logo from '../assets/Logo.png'
import {MdMenu, MdClose} from 'react-icons/md';
import React from "react";
import Button from '../components/Button.jsx'
import ProfileCircle from "../components/ProfileCircle.jsx";

export default function RootLayout({children}) {

    const [open, setOpen] = React.useState(false);

    function handleOpen() {
        setOpen(true);
    }

    function handleClose() {
        setOpen(false);
    }

    const handleProfileClick = () => {
        console.log("Profile clicked!");
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
                        <div className={"flex items-center gap-3 ml-4 mt-3"}>
                            <MdMenu
                                className="text-5xl ml-4 mt-3 cursor-pointer"
                                onClick={handleOpen}
                            />
                            <img src={Logo} alt={"logo"} className={"h-10 w-auto object-contain"}/>
                        </div>
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
                        // MISTAKE -> WHY ? FINDOUT :<img src={Logo}/>
                        className={`fixed top-0 left-0 z-40 bg-gray-300 w-2/5 min-h-screen
                        transform transition-transform duration-300 ease-in-out
                        ${open ? "translate-x-0" : "-translate-x-full"}`}
                    >
                        {/*{SIDEBAR HEADER (Logo + Close Button}*/}
                        <div className={"flex items-center justify-center mt-6 pb-2 border-b border-emerald-400"}>
                            <img src={Logo} alt={"logo"} className={"h-12 w-auto object-contain ml-2"}/>
                        </div>
                        <MdClose
                            className="text-4xl m-4 cursor-pointer"
                            onClick={handleClose}
                        />

                        {/*SIDEBAR MENU BUTTONS*/}
                        <div
                            className={"flex flex-col gap-4"}>

                            {/*<Button index={2} className={""}>Home</Button>*/}
                            {/*<Button index={2} className={""}>Home</Button>*/}
                            {/*<Button index={2} className={""}>Home</Button>*/}
                            {/*<Button index={2} className={""}>Home</Button>*/}
                            {/*<Button index={2} className={""}>Home</Button>*/}


                        </div>
                    </div>
                    <div className={"relative min-h-screen"}>
                        {/*    profile*/}
                        <ProfileCircle onClick={handleProfileClick}
                            imageSrc="https://i.pravatar.cc/150?img=3"
                            position={"top-right"}/>
                    </div>

                </div>

                <main>

                    {/*   main view*/}
                    {children}

                </main>

                {/*<footer>*/}
                {/*/!*    only for some pages not global one*!/*/}
                {/*</footer>*/}
            </div>
        </>
    )
}