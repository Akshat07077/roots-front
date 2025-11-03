import React from "react";
import { Box, Typography, Grid, Card, CardContent } from "@mui/material";
import qr_link from "../../assets/qr_code.jpg";
import MainLayout from "../templates/MainLayout";

function PublicationFees() {
  return (
    <MainLayout withSidebar>
      <Box sx={{ width: "100%", p: { xs: 3, md: 3 } }}>
        {/* Title */}
        <Typography
          variant="h4"
          fontWeight="bold"
          sx={{
            textAlign: "center",
            mb: 6,
            background: "linear-gradient(135deg, #2e4638, #1f3127)",
            WebkitBackgroundClip: "text",
            WebkitTextFillColor: "transparent",
          }}
        >
          Publication & Membership Fees
        </Typography>

        {/* Main Content Grid */}
        <Grid container spacing={4} justifyContent="center" alignItems="flex-start" mb={6}>
          
          {/* Left: Plans within a single card */}
          <Grid item xs={12} md={4}>
            <Card
              sx={{
                borderRadius: 4,
                p: 4,
                background: "linear-gradient(135deg, #2e4638, #1f3127)",
                color: "white",
                mb: 3,
              }}
            >
<Box sx={{ mb: 2, borderBottom: "1px solid rgba(255,255,255,0.3)", pb: 1 }}>
  <Typography
    variant="subtitle1"
    fontWeight="bold"
    sx={{ mb: 1, letterSpacing: 0.5, fontSize: "0.8rem" }}
  >
    Single Article - Bachelors Students
  </Typography>
  <Typography
    variant="body2"
    sx={{ mb: 1, whiteSpace: "pre-line", opacity: 0.9, fontSize: "0.7rem" }} 
  >
    For Bachelors Students:
  </Typography>
  <Typography
    variant="h4"
    fontWeight="bold"
    sx={{ fontSize: "1rem" }} 
  >
    Rs. 99/-
  </Typography>
</Box>
<Box>
  <Typography
    variant="subtitle1"
    fontWeight="bold"
    sx={{ mb: 1, letterSpacing: 0.5, fontSize: "0.8rem" }} 
  >
    Single Article - Researcher Scholars
  </Typography>
  <Typography
    variant="body2"
    sx={{ mb: 1, whiteSpace: "pre-line", opacity: 0.9, fontSize: "0.7rem" }} // Reduced font size
  >
    For Researcher Scholars:
  </Typography>
  <Typography
    variant="h4"
    fontWeight="bold"
    sx={{ fontSize: "1rem" }} 
  >
    Rs. 149/-
  </Typography>
</Box>
            </Card>
          </Grid>
          <Grid item xs={12} md={4}>
            <Card elevation={3} sx={{ bgcolor: "#f4f8f6", borderRadius: 3, p: 4 }}>
              <Typography variant="h5" gutterBottom sx={{ color: "#2e4638", fontWeight: "bold" }}>
                Payment Details
              </Typography>
              <Grid container spacing={3}>
                <Grid item xs={12} sm={6}>
                  <Typography fontWeight="bold" sx={{ color: "#2e4638" }}>Account Holder's Name:</Typography>
                  <Typography sx={{ mb: 2 }}>******</Typography>
                  <Typography fontWeight="bold" sx={{ color: "#2e4638" }}>Account Number:</Typography>
                  <Typography sx={{ mb: 2, fontFamily: "monospace", fontSize: "1.1rem" }}>35843617265</Typography>
                </Grid>
                <Grid item xs={12} sm={6}>
                  <Typography fontWeight="bold" sx={{ color: "#2e4638" }}>Bank and Branch:</Typography>
                  <Typography sx={{ mb: 2 }}>State Bank of India, Teesta Bazar</Typography>
                  <Typography fontWeight="bold" sx={{ color: "#2e4638" }}>Bank IFSC Code:</Typography>
                  <Typography sx={{ fontFamily: "monospace", fontSize: "1.1rem" }}>SBIN0009324</Typography>
                </Grid>
              </Grid>
            </Card>
          </Grid>

          <Grid item xs={12} md={4} sx={{ display: "flex", justifyContent: "center", alignItems: "flex-start" }}>
            <Box sx={{ textAlign: "center" }}>
              <Box
                sx={{
                  bgcolor: "white",
                  p: 1,
                  borderRadius: 3,
                  boxShadow: 3,
                  width: 190,
                }}
              >
                 <Typography variant="body2" sx={{ color: "#2e4638"}}>UPI Id: Rootsmedia2025@axl </Typography>
                <img src={qr_link} alt="Payment QR Code" style={{ width: "100%", height: "auto", display: "block" }} />
              </Box>
            </Box>
          </Grid>
        </Grid>

        {/* Important Note */}
        <Card
          elevation={1}
          sx={{
            borderLeft: "6px solid #2e4638",
            borderRadius: 2,
            p: 3,
            bgcolor: "#edf2ef",
            mb: 4,
          }}
        >
          <Typography
            variant="subtitle1"
            sx={{ fontWeight: "bold", color: "#2e4638" }}
          >
            Important Note:
          </Typography>
          <Typography variant="body2" sx={{ my: 1, mx: 1 }}>
            Transaction id + Receipt is mandatory and to be sent at <strong>rootsmedia.publications@gmail.com</strong> after payment.
          </Typography>
          <Typography
            variant="subtitle1"
            sx={{ fontWeight: "bold", color: "#2e4638", mb: 1 }}
          >
            About Roots Media
          </Typography>
          <Typography variant="body2">
            Rootsmedia is an open access magazine. Publication fees as mentioned are generally asked from the authors to meet up the expenditure for website maintenance and designing the pages of our magazine.
          </Typography>
        </Card>
      </Box>
    </MainLayout>
  );
}

export default PublicationFees;