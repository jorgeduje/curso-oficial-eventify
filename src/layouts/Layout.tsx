import { Box } from "@mui/material";
import { useState } from "react";
import { Outlet } from "react-router";
import { AppHeader } from "./AppHeader";
import { Sidebar } from "./Sidebar";

export const Layout = () => {
  const [mobileOpen, setMobileOpen] = useState(false);

  const drawerWidth = 240;

  const handleDrawerToggle = () => {
    setMobileOpen(!mobileOpen);
  };

  return (
    <Box
      sx={{
        display: "flex",
        height: "100vh",
      }}
    >
      {/* AppHeader */}
      <AppHeader handleDrawerToggle={handleDrawerToggle} />
      {/* Sidebar */}
      <Sidebar
        drawerWidth={2}
        handleDrawerToggle={handleDrawerToggle}
        mobileOpen={mobileOpen}
      />

      <Box
        component={"main"}
        sx={{
          flexGrow: 1,
          p: 3,
          width: { sm: `calc(100% - ${drawerWidth}px)` },
          ml: { sm: `${drawerWidth}px` },
          pt: 10,
          height: "100%",
          display: "flex",
          flexDirection: "column",
          overflow: "auto",
        }}
      >
        <Outlet />
      </Box>
    </Box>
  );
};
