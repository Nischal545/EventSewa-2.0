import {Link} from "react-router-dom";
import Logo from "../assets/Logo.png";
import {MdMenu, MdClose} from "react-icons/md";
import React from "react";
import Button from "../components/Button.jsx";
import ProfileCircle from "../components/ProfileCircle.jsx";
import {HiOutlineBuildingOffice2} from "react-icons/hi2";

export default function SplitLayout({children}) {
    const [open, setOpen] = React.useState(false);

    function handleOpen() {
        setOpen(true);
    }

    function handleClose() {
        setOpen(false);
    }

    const handleProfileClick = () => {
        console.log("Profile clicked!");
    };

    return (
        <>
            <div className={"mt-4 p-4 border-top overflow-x-hidden"}>
                {/*    container */}
                <header>{/*    AD or maybe signup as organizer*/}
                    <div className={"flex justify-center w-full"}>
                        <img
                            src={Logo}
                            alt={"logo"}
                            className={"h-10 w-auto object-contain"}
                        />

                        <Button index={1} icon={HiOutlineBuildingOffice2}>
                            SignUp to Organise
                        </Button>

                    </div>
                </header>


                <main>
                    {/*   main view*/}
                    <div>
                        {/*    SIDEBAR TRIGGER*/}

                        {!open && (
                            <div className={"flex items-center justify-between gap-3 mt-9"}>
                                <MdMenu
                                    className="text-5xl cursor-pointer"
                                    onClick={handleOpen}
                                />

                                {/*    profile cirlce*/}
                                {/*    profile*/}
                                <ProfileCircle
                                    onClick={handleProfileClick}
                                    imageSrc="https://i.pravatar.cc/150?img=3"
                                    position={"top-right"}
                                />

                            </div>
                        )}

                        {/*    OVERLAY - click outside to close */}
                        <div
                            className={`fixed inset-0 bg-black/40 z-30 transition-opacity duration-300 ease-in-out ${
                                open
                                    ? "opacity-100 pointer-events-auto"
                                    : "opacity-0 pointer-events-none"
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
                            <div
                                className={
                                    "flex items-center justify-center mt-6 pb-2 border-b border-emerald-400"
                                }
                            >
                                <img
                                    src={Logo}
                                    alt={"logo"}
                                    className={"h-12 w-auto object-contain ml-2"}
                                />
                            </div>
                            <MdClose
                                className="text-4xl m-4 cursor-pointer"
                                onClick={handleClose}
                            />

                            {/*SIDEBAR MENU BUTTONS*/}
                            <div className={"flex flex-col items-center gap-4"}>
                                <Button index={2} className={"w-50"}>Home</Button>
                                <Button index={2} className={"w-50"}>Notifications</Button>
                                <Button index={2} className={"w-50"}>History</Button>
                                <Button index={2} className={"w-50"}>Profile</Button>

                            </div>
                            <p>Here will go the User Id in the bottom</p>
                        </div>

                    </div>
                </main>

                {/*<footer>*/}
                {/*/!*    only for some pages not global one*!/*/}
                {/*</footer>*/}
            </div>
        </>
    );
}
