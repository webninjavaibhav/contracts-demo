import * as React from "react";
import OutlinedInput from "@mui/material/OutlinedInput";
import MenuItem from "@mui/material/MenuItem";
import Select, { SelectChangeEvent } from "@mui/material/Select";
import { Checkbox } from "@mui/material";

const ITEM_HEIGHT = 48;
const ITEM_PADDING_TOP = 0;
const MenuProps = {
  PaperProps: {
    style: {
      maxHeight: ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP,
      width: 250,
    },
  },
};

function CustomSelect({
  options,
  handleSelect,
  selected,
}: {
  options: string[];
  handleSelect: (data: any) => void;
  selected: string[];
}) {
  const handleChange = (event: SelectChangeEvent<typeof selected>) => {
    const {
      target: { value },
    } = event;
    handleSelect(typeof value === "string" ? value.split(",") : value);
  };

  return (
    <Select
      multiple
      sx={{
        width: 250,
        height: 35,
      }}
      displayEmpty
      value={selected}
      onChange={handleChange}
      input={<OutlinedInput />}
      renderValue={(selected) => {
        if (selected.length === 0) {
          return <span>Please select source</span>;
        }
        return selected.join(", ");
      }}
      MenuProps={MenuProps}
      inputProps={{ "aria-label": "Without label" }}
    >
      {options.map((name) => (
        <MenuItem
          sx={{ height: 35 }}
          key={name}
          value={name}
        >
          <Checkbox checked={selected.indexOf(name) > -1} />
          {name}
        </MenuItem>
      ))}
    </Select>
  );
}

export default CustomSelect;
