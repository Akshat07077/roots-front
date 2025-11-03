import {
  AppBar,
  Toolbar,
  Typography,
  Button,
  Box,
  IconButton,
} from "@mui/material";
import SearchIcon from "@mui/icons-material/Search";
import { Link } from "react-router-dom";
import { NotificationAdd } from "@mui/icons-material";
import main_logo from "../../../assets/roots_main.png"

export default function Navbar() {
  return (
    <AppBar position="sticky" color="primary" elevation={3}>
      <Toolbar sx={{display:"flex", justifyContent:"space-between"}}>
      <Box component={Link} to="/" sx={{ cursor: "pointer" }}>
       <img
          src={main_logo}
          alt="Contact Us"
          style={{ width: "150px"}}
        />
       </Box>
        <Box sx={{ display: "flex", gap: 2}}>
          <Button component={Link} to="/" color="inherit" sx={{ textTransform: 'none' }}>
            Home
          </Button>
           <Button component={Link} to="/editorial_board" color="inherit" sx={{ textTransform: 'none' }}>
            Editorial Board
          </Button>
          <Button component={Link} to="/authors-guidelines" color="inherit" sx={{ textTransform: 'none' }}>
            Authors Guidelines
          </Button>
          <Button component={Link} to="/publication-fees" color="inherit" sx={{ textTransform: 'none' }}>
            Publication Fees
          </Button>
           <Button component={Link} to="/document-upload" color="inherit" sx={{ textTransform: 'none' }}>
            Article Upload
          </Button>
          <Button component={Link} to="/contact-us" color="inherit" sx={{ textTransform: 'none' }}>
            Contact Us
          </Button>
        </Box>
      </Toolbar>
    </AppBar>
  );
}
