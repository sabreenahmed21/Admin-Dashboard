/* eslint-disable no-unused-expressions */
// @ts-nocheck
import {
  AppBar,
  IconButton,
  InputBase,
  Toolbar,
  useTheme,
} from "@mui/material";
import { useDispatch } from "react-redux";
import FlexBetween from "./FlexBetween";
import MenuIcon from "@mui/icons-material/Menu";
import SearchIcon from "@mui/icons-material/Search";
import { setMode } from "Slices/GlobalSlice";
import DarkModeIcon from "@mui/icons-material/DarkMode";
import LightModeIcon from "@mui/icons-material/LightMode";


function Navbar({user, isSidebarOpen, setIsSidebarOpen }) {
  const dispatch = useDispatch();
  const theme = useTheme();
  return (
    <AppBar position="static" sx={{ background: "none", boxShadow: "none" }}>
      <Toolbar sx={{ justifyContent: "space-between" }}>
        <FlexBetween>
          <IconButton onClick={() => setIsSidebarOpen(!isSidebarOpen)}>
            <MenuIcon />
          </IconButton>
          <FlexBetween
            bgcolor={theme.palette.background.alt}
            borderRadius="9px"
            gap="3rem"
            p="0.1rem 1.5rem"
          >
            <InputBase placeholder="Search..." />
            <IconButton>
              <SearchIcon />
            </IconButton>
          </FlexBetween>
        </FlexBetween>
        <FlexBetween gap="1rem">
          <IconButton
            onClick={() => {
              const newMode = theme.palette.mode === "dark" ? "light" : "dark";
              dispatch(setMode(newMode)); 
              localStorage.setItem("currentMode", newMode);
            }}
          >
            {theme.palette.mode === "dark" ? (
              <DarkModeIcon />
            ) : (
              <LightModeIcon />
            )}
          </IconButton>
        </FlexBetween>
      </Toolbar>
    </AppBar>
  );
}

export default Navbar;
