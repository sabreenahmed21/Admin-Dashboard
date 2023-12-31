// @ts-nocheck
import { Box } from "@mui/material";
import Navbar from "Components/Navbar";
import { Outlet } from "react-router-dom";
import useMediaQuery from "@mui/material/useMediaQuery";
import { useState } from "react";
import Sidebar from "Components/Sidebar";
import { useGetUserQuery } from "../Services/JsonServerApi";
import { useSelector } from "react-redux";

function Layout() {
  const isNonMobile = useMediaQuery("(min-width:1200px)");
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);
  const userId = useSelector((state) => state.global.userId);
  const { data } = useGetUserQuery(userId);
  return (
    <Box width="100%" height="100%" display={isNonMobile ? "flex" : "block"}>
      <Sidebar
        user={data || {}}
        isNonMobile={isNonMobile}
        isSidebarOpen={isSidebarOpen}
        setIsSidebarOpen={setIsSidebarOpen}
        drawerWidth="250px"
      />
      <Box flexGrow={1}>
        <Navbar
          user={data || {}}
          isSidebarOpen={isSidebarOpen}
          setIsSidebarOpen={setIsSidebarOpen}
        />
        <Outlet />
      </Box>
    </Box>
  );
}

export default Layout;
