"use client";

import React, { useState } from "react";
import { List, ListItem, ListItemText, Typography } from "@mui/material";
import { useParams, usePathname, useRouter } from "next/navigation";

const Navigation = () => {
  const path = usePathname();
  const [activeSection, setActiveSection] = useState<string>(path);
  const router = useRouter();

  const handleNavigation = (path: string) => {
    setActiveSection(path);
    router.push(path);
  };

  const navList = [
    {
      name: "Contract Analysis",
      route: "/contract-analysis",
    },
    {
      name: "Contract Comparison",
      route: "/compare-contracts",
    },
    {
      name: "Version Comparison",
      route: "/compare-versions",
    },
  ];

  return (
    <div className="w-[240px] bg-neutral-700 text-[#fff] min-h-[100vh] fixed top-0">
      <Typography
        variant="h5"
        className="p-5 text-center"
      >
        Navigation Menu
      </Typography>
      <List className="pt-2.5">
        {navList?.map((nav) => (
          <ListItem
            key={nav?.name}
            className={`cursor-pointer  ${
              activeSection === nav?.route
                ? " border-l-4 border-l-red-500"
                : "pl-5"
            }`}
            onClick={() => handleNavigation(nav?.route)}
          >
            <ListItemText primary={nav?.name} />
          </ListItem>
        ))}
      </List>
    </div>
  );
};

export default Navigation;
