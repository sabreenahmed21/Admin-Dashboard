import { Stack, Typography, Button, useTheme } from "@mui/material";
import { Link } from "react-router-dom";

export default function NotFound() {
  const theme = useTheme();
  return (
    <Stack gap={3} sx={{ m: "50px" }}>
      <Typography variant="h2">sorry, page not found</Typography>
      <Typography variant="body1">
        the requested resource could not be found. please check the URL and try
        again.
      </Typography>
      <Button variant="contained" color="primary" sx={{ width: "120px" }}>
        <Link to="/" className="text-link">
          <Typography variant="body2" sx={{color: theme.palette.text.primary}} > Go To Home</Typography>
        </Link>
      </Button>
    </Stack>
  );
}
