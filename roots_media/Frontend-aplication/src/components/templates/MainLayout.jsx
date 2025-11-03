import Navbar from "../organisms/Navbar/Navbar";
import Footer from "../organisms/Footer/Footer";
import { Box, Grid } from "@mui/material";
import Sidebar from "../organisms/Sidebar/Sidebar";

export default function MainLayout({ children, withSidebar = false }) {
  return (
    <Box
      sx={{
        width: "100%",
        minHeight: "100vh",
        display: "flex",
        flexDirection: "column",
      }}
    >
      <Navbar />
      <Box component="main" sx={{ flex: 1, width: "100%", px: 2, py: 4 }}>
        {/* <Grid container spacing={4}> */}
        <Grid item xs={12} md={withSidebar ? 8 : 12}>
          {children}
        </Grid>
        {/* {withSidebar && (
            <Grid item xs={12} md={4}>
              <Sidebar />
            </Grid>
          )} */}
        {/* </Grid> */}
      </Box>
      <Footer />
    </Box>
  );
}
