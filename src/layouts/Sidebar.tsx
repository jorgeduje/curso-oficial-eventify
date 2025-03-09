import { FC } from "react";
import { SidebarProps } from "../types";
import { CalendarMonth, Dashboard, Logout } from "@mui/icons-material";
import { Link, useLocation, useNavigate } from "react-router";
import { useAuth } from "../context/auth/useAuth";
import {
  Box,
  Divider,
  Drawer,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  Typography,
} from "@mui/material";

export const Sidebar: FC<SidebarProps> = ({
  mobileOpen,
  handleDrawerToggle,
  drawerWidth,
}) => {
  const navigationItems = [
    {
      name: "Calendario",
      path: "/",
      icon: CalendarMonth,
    },
    {
      name: "Dashboard",
      path: "/dashboard",
      icon: Dashboard,
    },
  ];
  const navigate = useNavigate();
  const location = useLocation();
  const { signOut } = useAuth();

  const isActive = (path: string) => {
    if (path === "/") {
      return location.pathname === "/";
    }

    return location.pathname.startsWith(path);
  };

  const handleLogout = async () => {
    await signOut();
    navigate("/login");
  };
  const drawer = (
    <Box sx={{ height: "100%", display: "flex", flexDirection: "column" }}>
      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          p: 3,
          pt: 4,
          pb: 2,
        }}
      >
        <Box
          sx={{
            display: "flex",
            alignItems: "center",
            mb: 1,
            cursor: "pointer",
          }}
          onClick={() => {
            navigate("/");
            handleDrawerToggle();
          }}
        >
          <CalendarMonth sx={{ fontSize: 32, color: "primary.main", mr: 1 }} />
          <Typography variant="h6" color="primary.main" fontWeight="bold">
            Calendar App
          </Typography>
        </Box>
        <Typography variant="body2" color="text.secondary" textAlign="center">
          Organiza tus eventos de forma sencilla
        </Typography>
      </Box>
      <Divider />
      <Box sx={{ p: 2, flexGrow: 1 }}>
        <Typography
          variant="caption"
          color="text.secondary"
          sx={{
            pl: 2,
            textTransform: "uppercase",
            fontWeight: "bold",
            letterSpacing: "1px",
            fontSize: "0.7rem",
          }}
        >
          Principal
        </Typography>
        <List sx={{ mt: 1 }}>
          {navigationItems.map((item) => (
            <ListItem
              key={item.path}
              component={Link}
              to={item.path}
              onClick={handleDrawerToggle}
              sx={{
                borderRadius: 1,
                mb: 1,
                backgroundColor: isActive(item.path)
                  ? "rgba(0, 92, 120, 0.08)"
                  : "transparent",
                color: isActive(item.path) ? "primary.main" : "text.primary",
                cursor: "pointer",
                "&:hover": {
                  backgroundColor: "rgba(0, 92, 120, 0.08)",
                },
              }}
            >
              <ListItemIcon>
                <item.icon color={isActive(item.path) ? "primary" : "action"} />
              </ListItemIcon>
              <ListItemText
                primary={
                  <Typography
                    variant="body2"
                    fontWeight={isActive(item.path) ? 600 : 500}
                    color={isActive(item.path) ? "primary.main" : "inherit"}
                  >
                    {item.name}
                  </Typography>
                }
              />
            </ListItem>
          ))}
        </List>
      </Box>

      {/* Info de usuario en la parte inferior */}
      <Box
        sx={{
          width: "100%",
          borderTop: "1px solid",
          borderTopColor: "divider",
          backgroundColor: "rgba(248, 249, 253, 0.7)",
          backdropFilter: "blur(8px)",
          marginTop: "auto",
        }}
      >
        <List>
          <ListItem
            onClick={() => {
              handleLogout();
              handleDrawerToggle();
            }}
            sx={{
              borderRadius: 1,
              color: "error.main",
              cursor: "pointer",
              "&:hover": {
                backgroundColor: "rgba(255, 61, 113, 0.08)",
              },
            }}
          >
            <ListItemIcon>
              <Logout color="error" />
            </ListItemIcon>
            <ListItemText
              primary={
                <Typography variant="body2" fontWeight={500} color="error.main">
                  Cerrar sesión
                </Typography>
              }
            />
          </ListItem>
        </List>
      </Box>
    </Box>
  );

  return (
    <Box component="nav">
      {/* Drawer para móviles */}
      <Drawer
        variant="temporary"
        open={mobileOpen}
        onClose={handleDrawerToggle}
        ModalProps={{
          keepMounted: true, // Mejor rendimiento en dispositivos móviles
        }}
        sx={{
          display: { xs: "block", sm: "none" },
          "& .MuiDrawer-paper": {
            boxSizing: "border-box",
            width: drawerWidth,
          },
        }}
      >
        {drawer}
      </Drawer>

      {/* Drawer permanente para pantallas grandes */}
      <Drawer
        variant="permanent"
        sx={{
          display: { xs: "none", sm: "block" },
          "& .MuiDrawer-paper": {
            boxSizing: "border-box",
            width: drawerWidth,
            position: "fixed",
            height: "100%",
            borderRight: "1px solid",
            borderColor: "divider",
          },
        }}
        open
      >
        {drawer}
      </Drawer>
    </Box>
  );
};
