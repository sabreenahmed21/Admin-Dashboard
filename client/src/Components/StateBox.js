// @ts-nocheck

import { Box, Typography, useTheme } from "@mui/material";
import FlexBetween from "./FlexBetween";

export const StateBox = ({ title, value, increase, icon, description }) => {
  const theme = useTheme();
  return (
    <Box
      display="flex"
      flexDirection="column"
      justifyContent="space-between"
      p="1rem"
      backgroundColor={theme.palette.background.alt}
      borderRadius="0.55rem"
    >
      <FlexBetween m='10px 0'>
        <Typography variant="h6" sx={{ color: theme.palette.secondary[100] , fontWeight:'semibold'}}>
          {title}
        </Typography>
        {icon}
      </FlexBetween>

      <Typography
        variant="h3"
        fontWeight="600"
        sx={{ color: theme.palette.secondary[200] , mt:'12px', mb:'12px'}}
      >
        {value}
      </Typography>

      <FlexBetween gap="1rem" m='10px 0'>
        <Typography
          variant="h5"
          fontStyle="italic"
          sx={{ color: theme.palette.secondary.light }}
        >
          {increase}
        </Typography>
        <Typography>{description}</Typography>
      </FlexBetween>
    </Box>
  );
};