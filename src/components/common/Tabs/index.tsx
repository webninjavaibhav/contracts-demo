import React from "react";
import { Tab, Tabs as TabsComponent, Typography } from "@mui/material";

interface TabsComponentProps {
  tabs: string[];
  value: number;
  onChange: (event: React.SyntheticEvent, value: number) => void;
}

const Tabs: React.FC<TabsComponentProps> = ({ tabs, value, onChange }) => {
  return (
    <TabsComponent
      value={value}
      onChange={onChange}
    >
      {tabs?.map((tab, index) => (
        <Tab
          key={index}
          label={
            <Typography
              variant="subtitle1"
              className={`capitalize ${
                index === value ? "px-14" : ""
              } text-nowrap`}
            >
              {index === value ? tab : tab.split(":")[0]}
            </Typography>
          }
        />
      ))}
    </TabsComponent>
  );
};

export default Tabs;
