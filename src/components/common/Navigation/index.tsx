"use client";

import React, { useState } from "react";
import { Divider } from "@mui/material";
import { usePathname, useRouter } from "next/navigation";
import Icons from "../Icons";
import Image from "next/image";
import Avatar from "@mui/material/Avatar";
import FlowIcon from "../../../../public/images/flowIcon";
import SearchIcon from "../../../../public/images/searchIcon";
import CompareIcon from "../../../../public/images/compareIcon";
import ConnectorIcon from "../../../../public/images/connectorIcon";
import VersionIcon from "../../../../public/images/versionIcon";
import LogoIcon from "../../../../public/images/logo";
import AnalysisIcon from "../../../../public/images/analysis";
import UserImage from "../../../../public/images/userImage.jpeg";

const Navigation = () => {
  const path = usePathname();
  const [activeSection, setActiveSection] = useState<string>(path);
  const [fullNavigation, setFullNavigation] = useState<boolean>(false);

  const router = useRouter();

  const handleNavigation = (path: string) => {
    setActiveSection(path);
    router.push(path);
  };

  const toggleHandler = () => {
    setFullNavigation(!fullNavigation);
  };

  const logoutHandler = () => {
    localStorage.clear();
    router.replace("/");
  };

  const routeNav = [
    {
      name: "Contract Analysis",
      route: "/contract-analysis",
      icon: <AnalysisIcon />,
    },
    {
      name: "Contract Comparison",
      route: "/compare-contracts",
      icon: <CompareIcon />,
    },
    {
      name: "Version Comparison",
      route: "/compare-versions",
      icon: <VersionIcon />,
    },
    {
      name: "Legal Wiki",
      route: "/search",
      icon: <SearchIcon />,
    },
    {
      name: "Generate Lesson",
      route: "/generate-lesson",
      icon: <Icons.generateLessonIcon fontSize="medium" />,
    },
    {
      name: "People Tasks",
      route: "/people-tasks",
      icon: <Icons.peopleIcon fontSize="medium" />,
    },
    {
      name: "Connectors",
      route: "/connectors",
      icon: <ConnectorIcon />,
    },
    {
      name: "Flow Manager",
      route: "/flow-manager",
      icon: <FlowIcon />,
    },
    // {
    //   name: "Designer",
    //   route: "/designer",
    //   icon: <Icons.designerIcon fontSize="medium" />,
    // },
    // {
    //   name: "Integrations",
    //   route: "/integrations",
    //   icon: <Icons.integrationIcon fontSize="medium" />,
    // },
    {
      name: "Insights Logs",
      route: "/insights-logs",
      icon: <Icons.insightIcon fontSize="medium" />,
    },
  ];

  const settingNav = [
    {
      name: "Customer Support",
      route: "/customer-support",
      icon: <Icons.customerIcon fontSize="medium" />,
    },
    {
      name: "Settings",
      route: "/settings",
      icon: <Icons.settingIcon fontSize="medium" />,
    },
    {
      name: "Logout",
      route: "/logout",
      icon: <Icons.logoutIcon fontSize="medium" />,
    },
  ];

  return (
    <div
      className={`${
        fullNavigation ? "w-[350px]" : "w-[90px]"
      } transition-all duration-[500ms] ease-in-out rounded-2xl text-[#fff] bg-[#233353] flex flex-col justify-between`}
    >
      <div className="flex flex-col gap-3 menu-list-container">
        <div className="flex justify-around bg-[#17243A] p-[20px] rounded-t-2xl">
          <LogoIcon />
        </div>
        <div className="flex flex-col gap-2">
          {routeNav?.map((nav) => (
            <div key={nav?.name}>
              <div
                className="cursor-pointer p-0"
                onClick={() => handleNavigation(nav?.route)}
              >
                <div className="flex items-center">
                  <div className="flex items-center justify-center min-w-[90px] h-[52px] menu-list-item">
                    <div
                      className={`flex items-center justify-center w-[50px] h-[50px] menu-list-item-active ${
                        activeSection === nav?.route
                          ? "bg-[#00D3AF] rounded-lg"
                          : "bg-transparent"
                      }`}
                    >
                      {nav.icon}
                    </div>
                  </div>
                  <div
                    className={`${fullNavigation ? "opacity-1" : "opacity-0"} 
                    ${
                      activeSection === nav?.route
                        ? "text-[#fff]"
                        : "opacity-[0.6]"
                    } whitespace-nowrap overflow-hidden transition-all duration-[700ms] ease-in-out`}
                  >
                    {nav?.name}
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
        <Divider
          variant="middle"
          sx={{ background: "#5D5C6B" }}
        />
        <div className="flex flex-col gap-2">
          {settingNav?.map((nav) => (
            <div key={nav?.name}>
              <div
                className="cursor-pointer p-0"
                onClick={nav?.name === "Logout" ? logoutHandler : () => {}}
              >
                <div className="flex items-center">
                  <div className="flex items-center justify-center min-w-[90px] h-[52px] menu-list-item">
                    <div
                      className={`flex items-center justify-center w-[50px] h-[50px] menu-list-item-active ${
                        activeSection === nav?.route
                          ? "bg-[#00D3AF] rounded-lg"
                          : "bg-transparent"
                      }`}
                    >
                      {nav.icon}
                    </div>
                  </div>
                  <div
                    className={`${fullNavigation ? "opacity-1" : "opacity-0"} 
                    ${
                      activeSection === nav?.route
                        ? "text-[#fff]"
                        : "opacity-[0.6]"
                    } whitespace-nowrap overflow-hidden transition-all duration-[700ms] ease-in-out`}
                  >
                    {nav?.name}
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
      <div className="flex flex-col justify-around">
        <div
          className={`flex justify-end mr-[-18px] pb-[30px] relative z-10 menu-list-arrow`}
        >
          <Icons.rightArrow
            sx={{
              fontSize: 35,
              cursor: "pointer",
              color: "white",
              backgroundColor: "#00D3AF",
              borderRadius: 50,
              padding: 1,
              transform: fullNavigation ? "scaleX(-1)" : "",
            }}
            onClick={toggleHandler}
          />
        </div>
        <div className="flex items-center pb-5">
          <div className="flex items-center justify-center min-w-[90px] h-[52px] menu-list-item">
            <Avatar sx={{ backgroundColor: "#f0bd46", color: "#000000" }}>
              <Image
                src={UserImage}
                alt="User"
                layout="fill"
              />
            </Avatar>
          </div>
          <div
            className={`${
              fullNavigation ? "opacity-1" : "opacity-0"
            } whitespace-nowrap overflow-hidden transition-all duration-[700ms] ease-in-out`}
          >
            John Doe
          </div>
        </div>
      </div>
    </div>
  );
};

export default Navigation;
