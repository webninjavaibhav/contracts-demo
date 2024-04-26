"use client";

import React, { useState } from "react";
import { Divider, List, ListItemText } from "@mui/material";
import { usePathname, useRouter } from "next/navigation";
import Icons from "../Icons";
import BrandLogo from "../../../../public/images/brand-logo.png";
import Image from "next/image";
import Avatar from "@mui/material/Avatar";

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
      icon: <Icons.analysisIcon fontSize="small" />,
    },
    {
      name: "Contract Comparison",
      route: "/compare-contracts",
      icon: <Icons.compareContracts fontSize="small" />,
    },
    {
      name: "Version Comparison",
      route: "/compare-versions",
      icon: <Icons.compareVersions fontSize="small" />,
    },
    {
      name: "Legal Wiki",
      route: "/search",
      icon: <Icons.searchIcon fontSize="small" />,
    },
    {
      name: "People Tasks",
      route: "/people-tasks",
      icon: <Icons.peopleIcon fontSize="small" />,
    },
    {
      name: "Connectors",
      route: "/connectors",
      icon: <Icons.connectorIcon fontSize="small" />,
    },
    {
      name: "Flow Manager",
      route: "/flow-manager",
      icon: <Icons.flowManagerIcon fontSize="small" />,
    },
    // {
    //   name: "Designer",
    //   route: "/designer",
    //   icon: <Icons.designerIcon fontSize="small" />,
    // },
    // {
    //   name: "Integrations",
    //   route: "/integrations",
    //   icon: <Icons.integrationIcon fontSize="small" />,
    // },
    {
      name: "Insights Logs",
      route: "/insights-logs",
      icon: <Icons.insightIcon fontSize="small" />,
    },
  ];

  const settingNav = [
    {
      name: "Customer Support",
      route: "/customer-support",
      icon: <Icons.customerIcon fontSize="small" />,
    },
    {
      name: "Settings",
      route: "/settings",
      icon: <Icons.settingIcon fontSize="small" />,
    },
    {
      name: "Logout",
      route: "/logout",
      icon: <Icons.logoutIcon fontSize="small" />,
    },
  ];

  return (
    <div
      className={`${
        fullNavigation ? "w-[260px] " : "w-[78px]"
      } transition-all duration-[500ms] ease-in-out text-[#fff] min-h-[100vh] bg-[#233353] flex flex-col justify-between`}
    >
      <div className="flex flex-col gap-5">
        <div className="flex justify-around bg-[#17243A] p-[20px]">
          <div className="w-[30px] h-[30px]">
            <Image
              src={BrandLogo}
              alt="brand-logo"
              width={57}
              height={57}
            />
          </div>
        </div>
        <div className="flex flex-col gap-2">
          {routeNav?.map((nav) => (
            <div key={nav?.name}>
              <div
                className="cursor-pointer p-0"
                onClick={() => handleNavigation(nav?.route)}
              >
                <div className="flex items-center">
                  <div className="flex items-center justify-center min-w-[78px] h-[50px]">
                    <div
                      className={`flex items-center justify-center w-[40px] h-[40px] ${
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
                  <div className="flex items-center justify-center min-w-[78px] h-[50px]">
                    <div
                      className={`flex items-center justify-center w-[40px] h-[40px] ${
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
        <div className={`flex justify-end mr-[-18px] pb-[40px] relative z-10`}>
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
          <div className="flex items-center justify-center min-w-[78px] h-[50px]">
            <Avatar
              alt="User"
              src=""
              sx={{ backgroundColor: "#f0bd46", color: "#000000" }}
            />
          </div>
          <div
            className={`${
              fullNavigation ? "opacity-1" : "opacity-0"
            } whitespace-nowrap overflow-hidden transition-all duration-[700ms] ease-in-out`}
          >
            User
          </div>
        </div>
      </div>
    </div>
  );
};

export default Navigation;
