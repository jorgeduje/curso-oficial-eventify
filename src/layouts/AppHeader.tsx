import { FC, MouseEvent, useState } from "react";
import { AppHeaderProps } from "../types";
import { useNavigate } from "react-router";
import { useAuth } from "../context/auth/useAuth";
import {
  AppBar,
  Avatar,
  Box,
  IconButton,
  ListItemIcon,
  Menu,
  MenuItem,
  Toolbar,
  Tooltip,
  Typography,
  useTheme,
} from "@mui/material";
import {
  Menu as MenuIcon,
  CalendarMonth,
  Settings,
  Logout,
} from "@mui/icons-material";
export const AppHeader: FC<AppHeaderProps> = ({ handleDrawerToggle }) => {
  const navigate = useNavigate();
  const { user, signOut } = useAuth();
  const theme = useTheme();
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const handleMenu = (event: MouseEvent<HTMLElement>) => {
    setAnchorEl(event?.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleLogout = async () => {
    await signOut();
    navigate("/login");
    handleClose();
  };

  const userEmail = user?.email || "";
  const userInitial = userEmail ? userEmail[0].toUpperCase() : "?";
  const avatarUrl = user?.user_metadata?.avatar_url;
  return (
    <AppBar
      position="fixed"
      elevation={0}
      sx={{
        zIndex: theme.zIndex.drawer + 1,
        boxShadow: "0 2px 10px rgba(0, 0, 0, 0.05)",
      }}
    >
      <Toolbar>
        <IconButton
          color="inherit"
          aria-label="open drawer"
          edge="start"
          onClick={handleDrawerToggle}
          sx={{ mr: 2, display: { sm: "none" } }}
        >
          <MenuIcon />
        </IconButton>
        <CalendarMonth sx={{ mr: 1, fontSize: 28 }} />
        <Typography
          variant="h6"
          component="div"
          sx={{
            flexGrow: 1,
            fontWeight: 600,
            letterSpacing: "0.5px",
          }}
        >
          Eventify
        </Typography>

        <Box sx={{ display: "flex", alignItems: "center" }}>
          <Tooltip title={userEmail}>
            <IconButton
              size="large"
              aria-label="cuenta del usuario"
              aria-controls="menu-appbar"
              aria-haspopup="true"
              onClick={handleMenu}
              color="inherit"
              sx={{
                transition: "transform 0.2s",
                "&:hover": {
                  transform: "scale(1.05)",
                },
              }}
            >
              <Avatar
                src={avatarUrl || undefined}
                sx={{
                  width: 38,
                  height: 38,
                  background:
                    "linear-gradient(45deg, #79D7BE 30%, #1de9b6 90%)",
                  boxShadow: "0 3px 10px rgba(0, 191, 165, 0.4)",
                  border: "2px solid #ffffff",
                }}
              >
                {!avatarUrl && userInitial}
              </Avatar>
            </IconButton>
          </Tooltip>
          <Menu
            id="menu-appbar"
            anchorEl={anchorEl}
            anchorOrigin={{
              vertical: "bottom",
              horizontal: "right",
            }}
            keepMounted
            transformOrigin={{
              vertical: "top",
              horizontal: "right",
            }}
            open={Boolean(anchorEl)}
            onClose={handleClose}
            slotProps={{
              paper: {
                elevation: 3,
                sx: {
                  mt: 1.5,
                  minWidth: 180,
                  overflow: "visible",
                  "&:before": {
                    content: '""',
                    display: "block",
                    position: "absolute",
                    top: 0,
                    right: 14,
                    width: 10,
                    height: 10,
                    bgcolor: "background.paper",
                    transform: "translateY(-50%) rotate(45deg)",
                    zIndex: 0,
                  },
                },
              },
            }}
          >
            <MenuItem
              onClick={() => {
                navigate("/settings");
                handleClose();
              }}
            >
              <ListItemIcon>
                <Settings fontSize="small" color="primary" />
              </ListItemIcon>
              <Typography variant="body2">Configuración</Typography>
            </MenuItem>
            <MenuItem onClick={handleLogout}>
              <ListItemIcon>
                <Logout fontSize="small" color="error" />
              </ListItemIcon>
              <Typography variant="body2">Cerrar sesión</Typography>
            </MenuItem>
          </Menu>
        </Box>
      </Toolbar>
    </AppBar>
  );
};
