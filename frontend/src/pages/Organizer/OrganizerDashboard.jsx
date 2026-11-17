import React from "react";
import {useNavigate} from "react-router-dom";

import SplitLayout from "../../Layouts/SplitLayout.jsx";

import {
    MdDashboard,
    MdEvent,
    MdAddCircleOutline,
    MdConfirmationNumber,
    MdPerson,
    MdSettings,
    MdLogout
} from "react-icons/md";

function OrganizerDashboard() {
    const navigate = useNavigate();

    // Sidebar configuration
    const organizerMenu = [
        {
            label: "Overview",
            icon: MdDashboard,
            to: "/organizer/dashboard"
        },
        {
            label: "My Events",
            icon: MdEvent,
            to: "/organizer/events"
        },
        {
            label: "Create Event",
            icon: MdAddCircleOutline,
            to: "/organizer/create-event"
        },
        {
            label: "Bookings",
            icon: MdConfirmationNumber,
            to: "/organizer/bookings"
        },
        {
            label: "Profile",
            icon: MdPerson,
            to: "/organizer/profile"
        },
        {
            label: "Settings",
            icon: MdSettings,
            to: "/organizer/settings"
        },
        {
            label: "Logout",
            icon: MdLogout,
            onClick: () => {
                localStorage.removeItem("organizerFormCompleted");
                navigate("/organizerForm");
            }
        }
    ];

    return (
        <SplitLayout
            sidebarItems={organizerMenu}
            showOrganizerSignup={false}
            showProfile={true}
        >

            <div className="p-5 sm:p-8">

                {/* WELCOME */}
                <div className="mb-8">
                    <h1 className="text-2xl font-bold text-gray-800">
                        Welcome, Organizer!
                    </h1>

                    <p className="text-gray-500 mt-2">
                        Here's what's happening with your organization.
                    </p>
                </div>

                {/* STATISTICS */}
                <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-5 mb-8">

                    <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-100">
                        <p className="text-gray-500 text-sm">
                            Total Events
                        </p>

                        <h2 className="text-3xl font-bold text-gray-800 mt-2">
                            0
                        </h2>

                        <p className="text-xs text-gray-400 mt-2">
                            All your events
                        </p>
                    </div>

                    <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-100">
                        <p className="text-gray-500 text-sm">
                            Total Bookings
                        </p>

                        <h2 className="text-3xl font-bold text-gray-800 mt-2">
                            0
                        </h2>

                        <p className="text-xs text-gray-400 mt-2">
                            Across all events
                        </p>
                    </div>

                    <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-100">
                        <p className="text-gray-500 text-sm">
                            Upcoming Events
                        </p>

                        <h2 className="text-3xl font-bold text-gray-800 mt-2">
                            0
                        </h2>

                        <p className="text-xs text-gray-400 mt-2">
                            Events scheduled
                        </p>
                    </div>

                    <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-100">
                        <p className="text-gray-500 text-sm">
                            Total Revenue
                        </p>

                        <h2 className="text-3xl font-bold text-gray-800 mt-2">
                            Rs. 0
                        </h2>

                        <p className="text-xs text-gray-400 mt-2">
                            Overall earnings
                        </p>
                    </div>

                </div>

                {/* VERIFICATION STATUS */}
                <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-100 mb-8">

                    <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center gap-4">

                        <div>
                            <h3 className="text-lg font-semibold text-gray-800">
                                Organizer Verification
                            </h3>

                            <p className="text-sm text-gray-500 mt-1">
                                Your submitted documents will be reviewed
                                by our administration team.
                            </p>
                        </div>

                        <span
                            className="px-4 py-2 bg-yellow-100 text-yellow-700 rounded-full text-sm font-semibold w-fit">
                            Pending Verification
                        </span>

                    </div>

                </div>

                {/* RECENT EVENTS */}
                <div className="bg-white rounded-xl shadow-sm border border-gray-100">

                    <div
                        className="p-6 border-b border-gray-100 flex flex-col sm:flex-row sm:justify-between sm:items-center gap-4">

                        <div>
                            <h3 className="text-lg font-semibold text-gray-800">
                                Recent Events
                            </h3>

                            <p className="text-sm text-gray-500 mt-1">
                                Keep track of your latest events.
                            </p>
                        </div>

                        <button
                            onClick={() => navigate("/organizer/create-event")}
                            className="px-4 py-2 bg-blue-600 text-white rounded-lg text-sm font-semibold hover:bg-blue-700 transition"
                        >
                            + Create Event
                        </button>

                    </div>

                    <div className="p-10 text-center">

                        <div className="text-5xl mb-4">
                            🎟️
                        </div>

                        <h3 className="text-lg font-semibold text-gray-700">
                            No events yet
                        </h3>

                        <p className="text-gray-500 text-sm mt-2">
                            You haven't created any events.
                            Start by creating your first event.
                        </p>

                        <button
                            onClick={() => navigate("/organizer/create-event")}
                            className="mt-5 px-6 py-3 bg-blue-600 text-white rounded-lg font-semibold hover:bg-blue-700 transition"
                        >
                            Create Your First Event
                        </button>

                    </div>

                </div>

            </div>

        </SplitLayout>
    );
}

export default OrganizerDashboard;
