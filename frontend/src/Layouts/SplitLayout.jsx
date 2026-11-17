import React from "react";
import { Link, useLocation } from "react-router-dom";

import Logo from "../assets/Logo.png";

import { MdMenu, MdClose } from "react-icons/md";

import Button from "../components/Button.jsx";
import ProfileCircle from "../components/ProfileCircle.jsx";
import { HiOutlineBuildingOffice2 } from "react-icons/hi2";

export default function SplitLayout({
  children,

  // Sidebar configuration
  sidebarItems = [],

  // Header configuration
  showOrganizerSignup = false,
  organizerSignupPath = "/organizerForm",

  // Profile configuration
  showProfile = true,
  profileImageSrc = "https://i.pravatar.cc/150?img=3",
  onProfileClick,

  // Optional user information
  userId,

  // Optional customization
  activeItem,
  logo = Logo,
}) {
  const [open, setOpen] = React.useState(false);

  const location = useLocation();

  const handleOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleProfileClick = () => {
    if (onProfileClick) {
      onProfileClick();
    } else {
      console.log("Profile clicked!");
    }
  };

  // Check whether a sidebar item is active
  const isActive = (item) => {
    if (activeItem) {
      return activeItem === item.label;
    }

    if (!item.to) return false;

    return (
      location.pathname === item.to ||
      location.pathname.startsWith(`${item.to}/`)
    );
  };

  // Handle sidebar item clicks
  const handleItemClick = (item) => {
    if (item.onClick) {
      item.onClick();
    }

    handleClose();
  };

  return (
    <div className="min-h-screen mt-4 p-4 overflow-x-hidden">
      {/* HEADER */}
      <header className="flex items-center justify-between gap-4">
        <Link to="/" className="flex items-center">
          <img
            src={logo}
            alt="EventSewa Logo"
            className="h-10 w-auto object-contain"
          />
        </Link>

        {showOrganizerSignup && (
          <Button
            as={Link}
            to={organizerSignupPath}
            variant="primary"
            icon={HiOutlineBuildingOffice2}
            className="text-sm sm:text-base"
          >
            SignUp to Organise
          </Button>
        )}
      </header>

      <main>
        {/* SIDEBAR TRIGGER */}
        <div className="flex items-center justify-between gap-3 mt-9">
          <button
            type="button"
            onClick={handleOpen}
            aria-label="Open sidebar"
            className="text-4xl cursor-pointer text-gray-700 hover:text-blue-600 transition"
          >
            <MdMenu />
          </button>

          {showProfile && (
            <ProfileCircle
              onClick={handleProfileClick}
              imageSrc={profileImageSrc}
              position="top-right"
            />
          )}
        </div>

        {/* OVERLAY */}
        <div
          className={`fixed inset-0 bg-black/40 z-30 transition-opacity duration-300 ease-in-out ${
            open
              ? "opacity-100 pointer-events-auto"
              : "opacity-0 pointer-events-none"
          }`}
          onClick={handleClose}
        />

        {/* SIDEBAR PANEL */}
        <aside
          className={`
                        fixed top-0 left-0 z-40
                        bg-white shadow-2xl
                        w-72 max-w-[85vw] min-h-screen
                        transform transition-transform duration-300 ease-in-out
                        ${open ? "translate-x-0" : "-translate-x-full"}
                    `}
        >
          {/* SIDEBAR HEADER */}
          <div className="flex items-center justify-between px-5 py-5 border-b border-gray-200">
            <img
              src={logo}
              alt="EventSewa Logo"
              className="h-10 w-auto object-contain"
            />

            <button
              type="button"
              onClick={handleClose}
              aria-label="Close sidebar"
              className="text-3xl text-gray-600 hover:text-red-500 cursor-pointer"
            >
              <MdClose />
            </button>
          </div>

          {/* SIDEBAR MENU */}
          <nav className="flex flex-col gap-2 p-4">
            {sidebarItems.map((item, index) => {
              const Icon = item.icon;
              const active = isActive(item);

              const buttonClass = `
                                w-full justify-start text-left
                                ${active ? "!bg-blue-600 !text-white" : ""}
                            `;

              return (
                <Button
                  key={item.id || item.label || index}
                  as={item.to ? Link : "button"}
                  to={item.to}
                  onClick={() => handleItemClick(item)}
                  icon={Icon}
                  variant="sidebar"
                  className={buttonClass}
                >
                  {item.label}
                </Button>
              );
            })}
          </nav>

          {/* SIDEBAR FOOTER */}
          {userId && (
            <div className="absolute bottom-0 left-0 w-full border-t border-gray-200 p-4">
              <p className="text-xs text-gray-500">User ID</p>

              <p className="text-sm font-semibold text-gray-700 break-all">
                {userId}
              </p>
            </div>
          )}
        </aside>

        {/* PAGE CONTENT */}
        {children}
      </main>
    </div>
  );
}
