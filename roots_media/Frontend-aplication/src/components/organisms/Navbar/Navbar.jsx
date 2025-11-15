import React, { useState } from "react";
import {
  AppBar,
  Toolbar,
  Typography,
  Button,
  Box,
  IconButton,
  Drawer,
  List,
  ListItem,
  ListItemButton,
  ListItemText,
  Divider,
} from "@mui/material";
import MenuIcon from "@mui/icons-material/Menu";
import { Link } from "react-router-dom";
import main_logo from "../../../assets/roots_main.png";

export default function Navbar() {
  const [mobileOpen, setMobileOpen] = useState(false);

  const handleDrawerToggle = () => {
    setMobileOpen(!mobileOpen);
  };

  const navItems = [
    { label: "Home", path: "/" },
    { label: "Editorial Board", path: "/editorial_board" },
    { label: "Authors Guidelines", path: "/authors-guidelines" },
    { label: "Publication Fees", path: "/publication-fees" },
    { label: "Article Upload", path: "/document-upload" },
    { label: "Contact Us", path: "/contact-us" },
  ];

  const drawer = (
    <Box onClick={handleDrawerToggle} sx={{ textAlign: "center" }}>
      {/* <Box sx={{ py: 2 }}>
        <img src={main_logo} alt="Roots Logo" style={{ width: "120px" }} />
      </Box> */}
      <Divider />
      <List>
        {navItems.map((item) => (
          <ListItem key={item.label} disablePadding>
            <ListItemButton
              component={Link}
              to={item.path}
              sx={{ textAlign: "center" }}
            >
              <ListItemText primary={item.label} />
            </ListItemButton>
          </ListItem>
        ))}
      </List>
    </Box>
  );

  return (
    <>
      <AppBar position="sticky" color="primary" elevation={3}>
        <Toolbar sx={{ display: "flex", justifyContent: "space-between" }}>
          <Box component={Link} to="/" sx={{ cursor: "pointer" }}>
            <img
              src={main_logo}
              alt="Roots Media"
              style={{ width: "150px" }}
            />
          </Box>
          <Box sx={{ display: { xs: "none", md: "flex" }, gap: 2 }}>
            {navItems.map((item) => (
              <Button
                key={item.label}
                component={Link}
                to={item.path}
                color="inherit"
                sx={{ textTransform: "none" }}
              >
                {item.label}
              </Button>
            ))}
          </Box>
          <IconButton
            color="inherit"
            edge="start"
            onClick={handleDrawerToggle}
            sx={{ display: { xs: "block", md: "none" } }}
          >
            <MenuIcon />
          </IconButton>
        </Toolbar>
      </AppBar>
      <Drawer
        anchor="right"
        open={mobileOpen}
        onClose={handleDrawerToggle}
        sx={{
          display: { xs: "block", md: "none" },
          "& .MuiDrawer-paper": { width: 240 },
        }}
      >
        {drawer}
      </Drawer>
    </>
  );
}