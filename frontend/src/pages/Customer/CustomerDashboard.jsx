import React from "react";
import SplitLayout from "../../Layouts/SplitLayout.jsx";


export default function CustomerDashboard() {

    return (
        <SplitLayout showOrganizerSignup={true}
            organizerSignupPath="/organizerForm"
            sidebarItems={[
                {
                    label: "Home",
                    to: "/customer/dashboard"
                },
                {
                    label: "Notifications",
                    to: "/customer/notifications"
                },
                {
                    label: "History",
                    to: "/customer/history"
                },
                {
                    label: "Profile",
                    to: "/customer/profile"
                }
            ]}>

            {/* CUSTOMER DASHBOARD CONTENT */}

            <div className="mt-8">

                <h1 className="text-3xl font-bold">
                    Customer Dashboard
                </h1>

                <p className="mt-2 text-gray-600">
                    Welcome back! What would you like to do today?
                </p>

                {/* Add your dashboard sections here */}

            </div>

        </SplitLayout>
    );
}
