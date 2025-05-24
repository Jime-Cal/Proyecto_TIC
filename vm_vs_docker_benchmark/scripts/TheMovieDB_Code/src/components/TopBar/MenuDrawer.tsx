import React from "react";
import {
  Drawer,
  List,
  ListItemButton,
  ListItemIcon,
  ListItemText,
} from "@mui/material";
import MovieIcon from "@mui/icons-material/Movie";
import TvIcon from "@mui/icons-material/Tv";

interface MenuDrawerProps {
  open: boolean;
  handleClose: () => void;
  isCollapsed: boolean;
}

const MenuDrawer: React.FC<MenuDrawerProps> = ({ open, isCollapsed }) => {
  const drawerWidth = isCollapsed ? 60 : 250;

  return (
    <Drawer
      variant="persistent"
      anchor="left"
      open={open}
      sx={{
        width: drawerWidth,
        flexShrink: 0,
        "& .MuiDrawer-paper": {
          width: drawerWidth,
          boxSizing: "border-box",
          height: "calc(100% - 64px)",
          top: "64px",
          overflowX: "hidden",
          transition: (theme) =>
            theme.transitions.create("width", {
              easing: theme.transitions.easing.sharp,
              duration: theme.transitions.duration.leavingScreen,
            }),
        },
      }}
    >
      <div style={{ padding: "10px 20px" }}>
        <List>
          <ListItemButton
            sx={{
              minHeight: 48,
              justifyContent: isCollapsed ? "center" : "initial",
              px: 2.5,
            }}
          >
            <ListItemIcon
              sx={{
                minWidth: 0,
                mr: isCollapsed ? "auto" : 3,
                justifyContent: "center",
              }}
            >
              <MovieIcon />
            </ListItemIcon>
            <ListItemText
              primary="Movies"
              sx={{ opacity: isCollapsed ? 0 : 1 }}
            />
          </ListItemButton>
          <ListItemButton
            sx={{
              minHeight: 48,
              justifyContent: isCollapsed ? "center" : "initial",
              px: 2.5,
            }}
          >
            <ListItemIcon
              sx={{
                minWidth: 0,
                mr: isCollapsed ? "auto" : 3,
                justifyContent: "center",
              }}
            >
              <TvIcon />
            </ListItemIcon>
            <ListItemText
              primary="Series"
              sx={{ opacity: isCollapsed ? 0 : 1 }}
            />
          </ListItemButton>
        </List>
      </div>
    </Drawer>
  );
};

export default MenuDrawer;
