import React from "react";
import { createBrowserRouter } from "react-router-dom";
import Dashboard from "../layout/dashboard/Dashboard";
import AboutUs from "../pages/AboutUs";
import Audios from "../pages/Audio";
import Category_Management from "../pages/Category_Management";
import ChangePassword from "../pages/ChangePassword";
import DasboardHome from "../pages/DasboardHome";
import Documents from "../pages/Documents";
import ErrorPage from "../pages/ErrorPage";
import ForgetPassword from "../pages/ForgetPassword";
import Login from "../pages/Login";
import Managelinks from "../pages/Manage-links";
import PhotoLibrary from "../pages/PhotoLibrary";
import SetNewPassword from "../pages/SetNewPassword";
import SettingsPage from "../pages/Settings";
import TermsAndConditions from "../pages/TermsAndConditions";
import Users from "../pages/Users";
import VerifyEmail from "../pages/VerifyEmail";
import Videos from "../pages/Videos";
import Auth from "./../layout/auth/Auth";
import PrivateRoutes from "./PrivateRoutes";

const handleNotifications = (event: React.MouseEvent<HTMLDivElement>) => {
  console.log("16++++++++++++++Notification clicked!");
  // Add your notification handling logic here
};

const router = createBrowserRouter([
  {
    path: "*",
    element: <ErrorPage />,
  },
  {
    path: "/",
    element: (
      <PrivateRoutes>
        <Dashboard />
      </PrivateRoutes>
    ),
    children: [
      {
        path: "/",
        element: <DasboardHome />,
      },
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
        element: <Videos />,
      },
      {
        path: "/audio",
        element: <Audios />,
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
        path: "/settings/termsAndCondition",
        element: <TermsAndConditions />,
      },
      {
        path: "/settings/profile",
        element: <ChangePassword />,
      },
      // {
      //     path: "settings/termsAndCondition/edittermsAndConditions",
      //     element: <EditTermsAndCondition />
      // },
    ],
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
]);

export default router;
