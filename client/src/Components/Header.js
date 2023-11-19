import { Box, Typography, useTheme } from "@mui/material";

export default function Header({ title, subtitle }) {
  const theme = useTheme();
  return (
    <Box>
      <Typography
        variant="h2"
        sx={{
          color: theme.palette.secondary[100],
          mb: "5px",
          fontWeight: "bold",
        }}
      >
        {title}
      </Typography>
      <Typography
        variant="h5"
        color= {theme.palette.secondary[300]}
      >
        {subtitle}
      </Typography>
    </Box>
  );
}
