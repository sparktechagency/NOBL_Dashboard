import "./Styled_components.css";

import { Button, Drawer, Layout, Menu, Popover } from "antd";
import {
  Blocks,
  FileText,
  Gavel,
  Image,
  Info,
  KeyRound,
  LayoutDashboard,
  Link as LinkIcon,
  Lock,
  LogOut,
  MenuIcon,
  Music4,
  Settings,
  User2Icon,
  Users,
  Video,
} from "lucide-react";
import React, { useEffect, useState } from "react";
import { Link, Outlet, useLocation, useNavigate } from "react-router-dom";

import SubMenu from "antd/es/menu/SubMenu";
import { useGetProfileQuery } from "../../../redux/apiSlices/authApiSlices";
import logo from "../../assets/Images/NOBLLogo.png";

const { Header, Sider, Content } = Layout;
const SIDER_WIDTH = 300;
const MOBILE_BREAKPOINT = 768;

// --- INTERFACES AND DATA ---

interface MenuItem {
  path: string;
  title: string;
  icon: React.ElementType; // Use the icon component directly
  description?: string;
  children?: MenuItem[];
}

// Replaced bulky SVGs with clean Lucide icons
const menuItems: MenuItem[] = [
  {
    path: "/",
    title: "Dashboard",
    icon: LayoutDashboard,
    description:
      "You can manage and monitor all of the statistics of your app from here.",
  },
  {
    path: "/users",
    title: "Users",
    icon: Users,
    description: "You can manage all the users of your app from here.",
  },
  {
    path: "/manage-category",
    title: "Manage Category",
    icon: Blocks,
    description: "You can manage your category system of your app from here.",
  },
  {
    path: "/photo-library",
    title: "Photo Library",
    icon: Image,
    description: "You can upload & manage your photos from here.",
  },
  {
    path: "/videos",
    title: "Videos",
    icon: Video,
    description: "You can upload & manage videos from here.",
  },
  {
    path: "/audio",
    title: "Audios",
    icon: Music4,
    description: "You can upload & manage audios from here.",
  },
  {
    path: "/documents",
    title: "Documents",
    icon: FileText,
    description: "You can upload & manage documents from here.",
  },
  {
    path: "/manage-links",
    title: "Manage Links",
    icon: LinkIcon,
    description: "You can upload & manage the links from here.",
  },
  {
    path: "/settings",
    title: "Settings",
    icon: Settings,
    description: "Manage your application settings.",
    children: [
      {
        path: "/settings/aboutUS",
        title: "About Us",
        icon: Info,
        description:
          "You can manage the about us section of your app from here.",
      },
      {
        path: "/settings/termsAndCondition", // Fixed typo
        title: "Terms & Conditions",
        icon: Gavel,
        description:
          "You can manage the terms & conditions section of your app from here.",
      },
      {
        path: "/settings/profile", // Fixed typo
        title: "Change Password",
        icon: KeyRound,
        description: "You can manage your admin profile from here.",
      },
    ],
  },
];

// --- MAIN COMPONENT ---

const Dashboard: React.FC = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { data: userData } = useGetProfileQuery({});

  // State for responsive design
  const [isMobile, setIsMobile] = useState(
    window.innerWidth < MOBILE_BREAKPOINT
  );
  const [drawerVisible, setDrawerVisible] = useState(false);

  // Effect to handle window resizing for responsiveness
  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth < MOBILE_BREAKPOINT);
    };
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const handleLogout = () => {
    localStorage.removeItem("token");
    navigate("/auth");
  };

  const showDrawer = () => setDrawerVisible(true);
  const closeDrawer = () => setDrawerVisible(false);

  // --- Reusable Menu Component ---
  const MenuContent = ({ inDrawer = false }) => (
    <div className="flex flex-col h-full">
      <div className="flex-1">
        <img
          src={logo}
          alt="Logo"
          className="mx-auto py-6 hidden lg:block w-[264px]"
        />
        <Menu
          mode="inline"
          selectedKeys={[location.pathname]}
          defaultOpenKeys={[`/${location.pathname.split("/")[1]}`]} // Auto-open submenu
          onClick={inDrawer ? closeDrawer : undefined} // Close drawer on item click
        >
          {menuItems.map((item) => {
            const isActive = location.pathname === item.path;
            const isParentActive =
              location.pathname.startsWith(item.path) && item.path !== "/";

            if (item.children) {
              return (
                <SubMenu
                  key={item.path}
                  title={item.title}
                  icon={
                    <item.icon
                      color={isParentActive ? "white" : "black"}
                      size={20}
                    />
                  }
                >
                  {item.children.map((child) => {
                    const isChildActive = location.pathname === child.path;
                    console.log(isChildActive);
                    return (
                      <Menu.Item
                        key={child.path}
                        icon={
                          <child.icon
                            color={isChildActive ? "white" : "black"}
                            size={18}
                          />
                        }
                      >
                        <Link to={child.path}>{child.title}</Link>
                      </Menu.Item>
                    );
                  })}
                </SubMenu>
              );
            } else {
              return (
                <Menu.Item
                  key={item.path}
                  icon={
                    <item.icon color={isActive ? "white" : "black"} size={20} />
                  }
                >
                  <Link to={item.path}>{item.title}</Link>
                </Menu.Item>
              );
            }
          })}
        </Menu>
        <div className="p-4">
          <Button
            onClick={handleLogout}
            icon={<LogOut size={20} color="#FF0000" />}
            className="gap-3 w-full flex justify-start items-center p-6 bg-[#FFE8E8] text-base font-popping font-semibold text-[#FF0000]"
          >
            Logout
          </Button>
        </div>
      </div>
    </div>
  );

  // --- Dynamic Header Title ---
  const getPageTitle = () => {
    const allItems = menuItems.flatMap((item) =>
      item.children ? [item, ...item.children] : [item]
    );
    const currentItem = allItems.find(
      (item) => item.path === location.pathname
    );

    if (currentItem) {
      return (
        <>
          <h1 className="text-[#333333] font-semibold pb-4 text-2xl md:text-[30px]">
            {currentItem.title}
          </h1>
          <p className="font-normal text-md md:text-lg -mt-3  text-gray-600">
            {currentItem.description}
          </p>
        </>
      );
    }
    // Fallback for routes not in menuItems, like profile pages
    if (location.pathname === "/profile") {
      return (
        <h1 className="text-[#333333] font-semibold text-[30px]">My Profile</h1>
      );
    }
    return null;
  };

  const userProfileContent = (
    <div className="w-40">
      <p className="mb-2">
        <Link
          to="/settings/profile?tab=profile"
          className="flex items-center gap-2 text-gray-700 hover:text-black"
        >
          <User2Icon size={18} /> <span className="text-md">Profile</span>
        </Link>
      </p>
      <p>
        <Link
          to="/settings/profile?tab=password"
          className="flex items-center gap-2 text-gray-700 hover:text-black"
        >
          <Lock size={18} /> <span className="text-md">Change password</span>
        </Link>
      </p>
    </div>
  );

  return (
    <Layout>
      {isMobile ? (
        <Drawer
          title={
            <div>
              <img src={logo} alt="Logo" className="mx-auto py-6 w-[264px]" />
            </div>
          }
          placement="left"
          onClose={closeDrawer}
          open={drawerVisible}
          bodyStyle={{ padding: 0 }}
          width={SIDER_WIDTH}
        >
          <MenuContent inDrawer={true} />
        </Drawer>
      ) : (
        <Sider width={SIDER_WIDTH} className="!bg-white" trigger={null}>
          <MenuContent />
        </Sider>
      )}

      <Layout
        style={{
          // marginLeft: isMobile ? 0 : SIDER_WIDTH,
          transition: "margin-left 0.2s",
        }}
      >
        <Header
          className="!bg-white !px-6 !h-20 lg:!h-28 "
          style={{
            position: "fixed",
            width: isMobile ? "100%" : `calc(100% - ${SIDER_WIDTH}px)`,
            top: 0,
            left: isMobile ? 0 : SIDER_WIDTH,
            zIndex: 10,
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            transition: "all 0.2s",
            borderBottom: "1px solid #f0f0f0",
          }}
        >
          <div className="flex items-center">
            {isMobile && (
              <Button
                type="text"
                icon={<MenuIcon size={30} />}
                onClick={showDrawer}
                className="mr-4"
              />
            )}
            <div className="hidden lg:block">{getPageTitle()}</div>
          </div>

          <Popover
            content={userProfileContent}
            trigger="click"
            placement="bottomRight"
          >
            <div className="flex justify-center  items-center gap-4 cursor-pointer">
              <img
                src={userData?.data?.photo || "https://via.placeholder.com/150"} // Fallback image
                alt={userData?.data?.name}
                className=" h-11 lg:h-12 aspect-square rounded-full object-cover"
              />
              <h2 className="font-roboto font-semibold text-lg hidden md:block">
                {userData?.data?.name}
              </h2>
            </div>
          </Popover>
        </Header>

        <div className="bg-[#f5f8e4]">
          <Content
            // style={{
            //   marginTop: 114, // Match header height
            //   padding: "24px",
            //   overflow: "auto",
            //   // height: "calc(100vh - 114px)",
            //   background: "#f5f8e4",
            // }}
            className="bg-[#f5f8e4] min-h-screen mt-20 lg:mt-32 px-6"
          >
            <Outlet />
          </Content>
        </div>
      </Layout>
    </Layout>
  );
};

export default Dashboard;
