import React from "react";
import { Box, Typography, Grid, Card, CardContent } from "@mui/material";
import qr_link from "../../assets/qr_code.jpg";
import MainLayout from "../templates/MainLayout";
import { Star } from "@mui/icons-material";

function PublicationFees() {
  return (
    <MainLayout withSidebar>
      <Box sx={{ width: "100%", p: { xs: 2, md: 3 } }}>
        {/* Title */}
        <Typography
          variant="h4"
          fontWeight="bold"
          sx={{
            textAlign: "center",
            mb: 4,
            background: "linear-gradient(135deg, #2e4638, #1f3127)",
            WebkitBackgroundClip: "text",
            WebkitTextFillColor: "transparent",
          }}
        >
          Publication & Membership Fees
        </Typography>
        <Grid container spacing={{ xs: 2, md: 3 }} justifyContent="center" alignItems="stretch" mb={4}>
          <Grid item xs={12} md={4}>
            <Card
              sx={{
                borderRadius: 4,
                p: 3.5,
                background: "linear-gradient(135deg, #2e4638, #1f3127)",
                color: "white",
                height: "100%",
                display: "flex",
                flexDirection: "column",
                boxShadow: "0 8px 24px rgba(46, 70, 56, 0.15)",
              }}
            >
              <Box sx={{ mb: 1.5, borderBottom: "1px solid rgba(255,255,255,0.3)", pb: 1 }}>
                <Typography
                  variant="body1"
                  fontWeight="600"
                  sx={{ mb: 0.5 }}
                >
                  Single Article - Bachelors Students
                </Typography>
                <Typography
                  variant="caption"
                  sx={{ mb: 1, opacity: 0.85, display: "block" }}
                >
                  For Bachelors Students
                </Typography>
                <Typography
                  variant="h6"
                  fontWeight="bold"
                  sx={{ color: "#d4af37" }}
                >
                  Rs. 99/-
                </Typography>
              </Box>
              <Box sx={{ mb: 1.5, borderBottom: "1px solid rgba(255,255,255,0.3)", pb: 1 }}>
                <Typography
                  variant="body1"
                  fontWeight="600"
                  sx={{ mb: 0.5 }}
                >
                  Single Article - Researcher Scholars
                </Typography>
                <Typography
                  variant="caption"
                  sx={{ mb: 1, opacity: 0.85, display: "block" }}
                >
                  For Researcher Scholars
                </Typography>
                <Typography
                  variant="h6"
                  fontWeight="bold"
                  sx={{ color: "#d4af37" }}
                >
                  Rs. 149/-
                </Typography>
              </Box>
              <Box>
                <Typography
                  variant="body1"
                  fontWeight="600"
                  sx={{ mb: 0.5 }}
                >
                  Single Article - Asst.Professors / Professors
                </Typography>
                <Typography
                  variant="caption"
                  sx={{ mb: 1, opacity: 0.85, display: "block" }}
                >
                  Asst.Professors / Professors
                </Typography>
                <Typography
                  variant="h6"
                  fontWeight="bold"
                  sx={{ color: "#d4af37" }}
                >
                  Rs. 199/-
                </Typography>
              </Box>
            </Card>
          </Grid>
          <Grid item xs={12} md={4}>
            <Card
              sx={{
                bgcolor: "#f4f8f6",
                borderRadius: 4,
                p: 3.5,
                height: "100%",
                display: "flex",
                flexDirection: "column",
                boxShadow: "0 8px 24px rgba(46, 70, 56, 0.08)",
              }}
            >
              <Typography
                variant="h5"
                gutterBottom
                sx={{
                  color: "#2e4638",
                  fontWeight: "bold",
                  mb: 3,
                  pb: 2,
                  borderBottom: "3px solid #2e4638",
                }}
              >
                Payment Details
              </Typography>
              <Grid container spacing={2}>
                <Grid item xs={12} sm={6}>
                  <Typography variant="body2" fontWeight="600" sx={{ color: "#2e4638", mb: 0.5 }}>Account Holder's Name:</Typography>
                  <Typography variant="body2" sx={{ mb: 1.5 }}>SHAIK ALLAMALIK ANSARI</Typography>
                  <Typography variant="body2" fontWeight="600" sx={{ color: "#2e4638", mb: 0.5 }}>Account Number:</Typography>
                  <Typography variant="caption" sx={{ mb: 0, fontFamily: "monospace", backgroundColor: "#e8f4f0", p: 1, borderRadius: 1, display: "block", fontWeight: 600 }}>322402010027995</Typography>
                </Grid>
                <Grid item xs={12} sm={6}>
                  <Typography variant="body2" fontWeight="600" sx={{ color: "#2e4638", mb: 0.5 }}>Bank and Branch:</Typography>
                  <Typography variant="body2" sx={{ mb: 1.5 }}>Union Bank of India, Yerragondapalem</Typography>
                  <Typography variant="body2" fontWeight="600" sx={{ color: "#2e4638", mb: 0.5 }}>Bank IFSC Code:</Typography>
                  <Typography variant="caption" sx={{ fontFamily: "monospace", backgroundColor: "#e8f4f0", p: 1, borderRadius: 1, display: "block", fontWeight: 600 }}>UBIN0819417</Typography>
                </Grid>
              </Grid>
            </Card>
          </Grid>

          <Grid item xs={12} md={4}>
            <Card
              sx={{
                bgcolor: "white",
                borderRadius: 4,
                p: 3.5,
                height: "100%",
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                justifyContent: "center",
                textAlign: "center",
                boxShadow: "0 8px 24px rgba(46, 70, 56, 0.08)",
              }}
            >
              <Typography
                variant="h6"
                sx={{
                  color: "#2e4638",
                  fontWeight: "bold",
                  mb: 2,
                }}
              >
                Scan to Pay
              </Typography>
              <Box
                sx={{
                  bgcolor: "#f9fafb",
                  p: 1.5,
                  borderRadius: 2,
                  mb: 2,
                  border: "1px solid #e0e8e3",
                }}
              >
                <img
                  src={qr_link}
                  alt="Payment QR Code"
                  style={{
                    width: "180px",
                    height: "180px",
                    display: "block",
                    borderRadius: "8px",
                  }}
                />
              </Box>
              <Typography
                variant="caption"
                sx={{
                  color: "#2e4638",
                  fontWeight: "600",
                  fontFamily: "monospace",
                  backgroundColor: "#e8f4f0",
                  px: 1.5,
                  py: 0.8,
                  borderRadius: 1.5,
                  width: "100%",
                  textAlign: "center",
                  display: "block",
                }}
              >
                Rootsmedia2025@axl
              </Typography>
            </Card>
          </Grid>
        </Grid>
        <Box sx={{ display: "grid", gridTemplateColumns: { xs: "1fr", md: "1fr 1fr" }, gap: { xs: 2, md: 3 }, mt: 3 }}>
          <Card
            sx={{
              borderLeft: "5px solid #d4af37",
              borderRadius: 3,
              p: 3,
              background: "linear-gradient(135deg, #fffdf7 0%, #faf8f3 100%)",
              boxShadow: "0 4px 16px rgba(212, 175, 55, 0.1)",
            }}
          >
            <Box sx={{ display: "flex", gap: 2, alignItems: "flex-start" }}>
              <Typography
                sx={{
                  fontSize: "1.5rem",
                  fontWeight: "bold",
                  color: "#d4af37",
                }}
              >
                ⚠️
              </Typography>
              <Box sx={{ flex: 1 }}>
                <Box sx={{ display: "flex", alignItems: "center", gap: 1, mb: 2 }}>
                  <Typography
                    variant="h6"
                    sx={{ fontWeight: "bold", color: "#2e4638", m: 0 }}
                  >
                    Important Notes:
                  </Typography>
                 
                </Box>
                <Box sx={{ display: "flex", flexDirection: "column", gap: 1.5 }}>
                  <Box sx={{ display: "flex", gap: 1.5, alignItems: "flex-start" }}>
                    <Star style={{color:"#d4af37"}}/>
                    <Typography variant="body2" sx={{ color: "#2e4638", lineHeight: 1.6 }}>
                      Transaction ID and receipt are mandatory and must be sent at{" "}
                      <Typography
                        component="span"
                        sx={{
                          fontWeight: "600",
                          backgroundColor: "#e8f4f0",
                          px: 1,
                          py: 0.3,
                          borderRadius: 1,
                          fontFamily: "monospace",
                          fontSize: "0.85rem",
                        }}
                      >
                        rootsmedia.publications@gmail.com
                      </Typography>{" "}
                      after payment.
                    </Typography>
                  </Box>
                  <Box sx={{ display: "flex", gap: 1.5, alignItems: "flex-start" }}>
                     <Star style={{color:"#d4af37"}}/>
                    <Typography variant="body2" sx={{ color: "#2e4638", lineHeight: 1.6 }}>
                      An additional charge of <strong>₹50</strong> will be applied for each author after the third article.
                    </Typography>
                  </Box>
                </Box>
              </Box>
            </Box>
          </Card>

          <Card
            sx={{
              borderLeft: "5px solid #2e4638",
              borderRadius: 3,
              p: 3,
              background: "linear-gradient(135deg, #f0f7f3 0%, #e8f2ed 100%)",
              boxShadow: "0 4px 16px rgba(46, 70, 56, 0.1)",
            }}
          >
            <Box sx={{ display: "flex", gap: 2, alignItems: "flex-start" }}>
              <Typography
                sx={{
                  fontSize: "1.5rem",
                  fontWeight: "bold",
                  color: "#2e4638",
                }}
              >
                📖
              </Typography>
              <Box>
                <Typography
                  variant="h6"
                  sx={{ fontWeight: "bold", color: "#2e4638", mb: 1 }}
                >
                  About Roots Media
                </Typography>
                <Typography variant="body2" sx={{ color: "#2e4638", lineHeight: 1.6 }}>
                  Roots Media is an open-access magazine. Publication fees support website maintenance, page design, and operational costs to provide quality academic content.
                </Typography>
              </Box>
            </Box>
          </Card>
        </Box>
      </Box>
    </MainLayout>
  );
}

export default PublicationFees;