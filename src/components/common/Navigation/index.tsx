"use client";

import React, { useState } from "react";
import { List, ListItem, ListItemText, Typography } from "@mui/material";
import { useParams, usePathname, useRouter } from "next/navigation";
import { Button } from "../Button";
import Icons from "../Icons";
import BrandLogo from "../../../../public/images/brand-logo.png";
import Image from "next/image";

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

  const navList = [
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
  ];

  return (
    <div
      className={`${
        fullNavigation ? "w-[260px] " : "w-[78px]"
      } transition-all duration-[500ms] ease-in-out text-[#fff] min-h-[100vh] bg-[#233353] flex flex-col justify-between pb-5`}
    >
      <div>
        <div className="flex justify-around bg-[#17243A]">
          <Image
            src={BrandLogo}
            alt="brand-logo"
            width={50}
            height={50}
          />
        </div>
        <List>
          {navList?.map((nav) => (
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
                          ? "bg-[#68BA82] rounded-lg"
                          : "bg-transparent"
                      }`}
                    >
                      {nav.icon}
                    </div>
                  </div>
                  <ListItemText
                    primary={nav?.name}
                    className={`${fullNavigation ? "opacity-1" : "opacity-0"} 
                    ${
                      activeSection === nav?.route
                        ? "text-[#fff]"
                        : "opacity-[0.6]"
                    } whitespace-nowrap overflow-hidden transition-all duration-[700ms] ease-in-out`}
                  />
                </div>
              </div>
            </div>
          ))}
        </List>
      </div>
      <div className={`flex justify-end mr-[-18px] pb-[40px] relative z-10`}>
        <Icons.rightArrow
          sx={{
            fontSize: 40,
            cursor: "pointer",
            color: "white",
            backgroundColor: "green",
            borderRadius: 50,
            padding: 1,
            transform: fullNavigation ? "scaleX(-1)" : "",
          }}
          onClick={toggleHandler}
        />
      </div>
    </div>
  );
};

export default Navigation;
