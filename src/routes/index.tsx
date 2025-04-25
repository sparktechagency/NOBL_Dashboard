import { createBrowserRouter } from "react-router-dom";
import Dashboard from "../layout/dashboard/Dashboard";
import React from "react";
import DasboardHome from "../pages/DasboardHome";
import ProductListing from "../pages/Users";
import Category_Management from "../pages/Category_Management";
import Manage_Users from "../pages/Manage_Users";
import Love from "../pages/Love";
import SettingsPage from "../pages/Settings";
import Notifications from "../pages/Notifications";
import Auth from './../layout/auth/Auth';
import Login from "../pages/Login";
import ForgetPassword from "../pages/ForgetPassword";
import VerifyEmail from "../pages/VerifyEmail";
import SetNewPassword from "../pages/SetNewPassword";
import Settings_personalInformation from "../pages/Settings_personalInformation";
import SettingsFaq from "../pages/SettingsFaq";
import SettingsTermsAndConditions from "../pages/SettingsTermsAndConditions";
import EditTermsAndCondition from "../pages/EditTermsAndConditions";
import Managelinks from "../pages/Manage-links";
import Users from "../pages/Users";
import PhotoLibrary from "../pages/PhotoLibrary";
import Videos from "../pages/Videos";
import Documents from "../pages/Documents";
import AboutUs from "../pages/AboutUs";
import TermsAndConditions from "../pages/TermsAndConditions";
import ChangePassword from "../pages/ChangePassword";



const handleNotifications = (event: React.MouseEvent<HTMLDivElement>) => {
    console.log("16++++++++++++++Notification clicked!");
    // Add your notification handling logic here
};

const router = createBrowserRouter([
    {
        path: "/",
        element: <Dashboard handleNotifications={handleNotifications} />,
        children: [
            {
                path: "/",
                element: <DasboardHome />,
            },
            // {
            //     path: "/notifications",
            //     element: <Notifications />,
            // },
            {
                path: "/users",
                element: <Users />,
            },
            {
                path: "/manage-category",
                element: <Category_Management />,
            },
            {
                path: "/photo-library",
                element: <PhotoLibrary />,
            },
            {
                path: "/videos",
                element: <Videos/>,
            },
            {
                path: "/documents",
                element: <Documents />,
            },
            {
                path: "/manage-links",
                element: <Managelinks />,
            },
            {
                path: "/settings",
                element: <SettingsPage />,
            },
            {
                path: "/settings/aboutUS",
                element: <AboutUs />,
            },
            {
                path: "/settings/termsAndCondintion",
                element: <TermsAndConditions />,
            },
            {
                path: "/settings/chagePassword",
                element: <ChangePassword />
            },
            // {
            //     path: "settings/termsAndCondition/edittermsAndConditions",
            //     element: <EditTermsAndCondition />
            // },
        ]
    },
    {
        path: "/auth",
        element: <Auth />,
        children: [
          {
            path: "/auth",
            element: <Login />,
          },
          {
            path: "/auth/login",
            element: <Login />,
          },
          {
            path: "/auth/forget-password",
            element: <ForgetPassword />,
          },
          {
            path: "/auth/verify",
            element: <VerifyEmail />,
          },
          {
            path: "/auth/set-new-password",
            element: <SetNewPassword />,
          },      
        ],
      },
])

export default router;