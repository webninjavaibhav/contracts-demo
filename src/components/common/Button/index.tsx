import { Button as MUIButton } from "@mui/material";
import { ButtonProps } from "@mui/material";

export const Button = (props: ButtonProps) => {
  const { children, ...rest } = props;
  return <MUIButton {...rest}>{children}</MUIButton>;
};
