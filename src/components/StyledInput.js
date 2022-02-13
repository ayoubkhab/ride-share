import React from "react";
import { InputBase } from "@mui/material";
import { alpha, styled } from "@mui/material/styles";

const CustomInput = styled(InputBase)(({ theme }) => ({
   backgroundColor: alpha(theme.palette.common.black, 0.1),
   borderRadius: theme.spacing(0.5),
   padding: `${theme.spacing(1)} ${theme.spacing(2)}`,
   flexGrow: 1,
}));

export const StyledInput = (props) => {
   return <CustomInput {...props} />;
};
