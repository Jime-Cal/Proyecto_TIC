import * as React from "react";
import {
  AppBar,
  Toolbar,
  Typography,
  IconButton,
  Menu,
  MenuItem,
  Divider,
  ListItemIcon,
} from "@mui/material";
import PersonIcon from "@mui/icons-material/Person";
import AccountBoxIcon from "@mui/icons-material/AccountBox";
import LogoutIcon from "@mui/icons-material/Logout";
import MenuIcon from "@mui/icons-material/Menu";
import ProfileModal from "./ProfileModal";

interface NavbarProps {
  handleMenuToggle: () => void;
  handleDrawerToggle: () => void;
}

const Navbar: React.FC<NavbarProps> = ({ handleDrawerToggle }) => {
  const [anchorElProfileIcon, setAnchorElProfileIcon] =
    React.useState<null | HTMLElement>(null);
  const [profileOpen, setProfileOpen] = React.useState(false);

  const handleProfileIconClick = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorElProfileIcon(event.currentTarget);
  };

  const handleCloseProfileIcon = () => {
    setAnchorElProfileIcon(null);
  };

  const handleOpenProfile = () => {
    setProfileOpen(true);
    handleCloseProfileIcon();
  };

  const handleCloseProfile = () => {
    setProfileOpen(false);
  };

  return (
    <>
      <AppBar
        position="fixed"
        sx={{
          backgroundColor: "rgb(1, 87, 155)",
          zIndex: (theme) => theme.zIndex.drawer + 1,
        }}
      >
        <Toolbar sx={{ display: "flex", justifyContent: "space-between" }}>
          <div style={{ display: "flex", alignItems: "center" }}>
            <IconButton color="inherit" onClick={handleDrawerToggle}>
              <MenuIcon />
            </IconButton>
            <Typography variant="h5" sx={{ marginLeft: 1 }}>
              The Movie DB
            </Typography>
          </div>
          <IconButton color="inherit" onClick={handleProfileIconClick}>
            <PersonIcon />
          </IconButton>
        </Toolbar>
      </AppBar>

      <Menu
        anchorEl={anchorElProfileIcon}
        open={Boolean(anchorElProfileIcon)}
        onClose={handleCloseProfileIcon}
        PaperProps={{
          sx: {
            minWidth: 180,
            borderRadius: 2,
          },
        }}
      >
        <MenuItem onClick={handleOpenProfile} sx={{ padding: "10px 20px" }}>
          <ListItemIcon>
            <AccountBoxIcon fontSize="small" />
          </ListItemIcon>
          Profile
        </MenuItem>
        <Divider />
        <MenuItem sx={{ padding: "10px 20px", color: "red" }}>
          <ListItemIcon>
            <LogoutIcon fontSize="small" color="error" />
          </ListItemIcon>
          Exit
        </MenuItem>
      </Menu>

      <ProfileModal
        open={profileOpen}
        onClose={handleCloseProfile}
        user={{ name: "Jimena", email: "jimena@example.com" }}
      />
    </>
  );
};

export default Navbar;
