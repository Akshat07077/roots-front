import React from "react";
import { Box, Typography, Container } from "@mui/material";
import MainLayout from "../templates/MainLayout";
import about_us from "../../assets/about_us.png";
import our_vission from "../../assets/our_vission.png";

function AboutUs() {
   const imageSize = { width: 450, height: 400 };
  return (
    <Container maxWidth="lg" sx={{ py: 2 }}>
      <Typography
        variant="h3"
        sx={{
          textAlign: "center",
          mb: 6,
          fontWeight: "bold",
          color: "#2e4638",
        }}
      >
        About Us
      </Typography>
      <Box
        sx={{
          display: "flex",
          flexDirection: { xs: "column", md: "row" },
          alignItems: "center",
          justifyContent: "space-between",
          gap: 4,
          mb: 10,
        }}
      >
        <Box sx={{ flex: 1 }}>
          <Typography
            variant="h4"
            sx={{ mb: 2, fontWeight: "bold", color: "#2e4638" }}
          >
            Who We Are
          </Typography>
          <Typography variant="body1" paragraph>
            We are a passionate team dedicated to creating innovative
            solutions that bring value to our customers. Our mission is to
            deliver high quality products while maintaining trust and
            transparency.
          </Typography>
          <Typography variant="body1" >
            With years of experience, we specialize in providing services that
            empower businesses and individuals to achieve their goals.
          </Typography>
        </Box>
        <Box sx={{ flex: 1, display: 'flex', justifyContent: 'center' }}>
          <Box
            sx={{
              width: `${imageSize.width}px`,
              height: `${imageSize.height}px`,
              overflow: 'hidden',
              borderRadius: '12px',
              boxShadow: '0px 8px 20px rgba(0,0,0,0.1)',
            }}
          >
            <img
              src={about_us}
              alt="Who We Are"
              style={{
                width: '100%',
                height: "100%",
                // objectFit: 'cover',
              }}
            />
          </Box>
        </Box>
      </Box>

      {/* Section 2 - Image Left / Content Right */}
      <Box
        sx={{
          display: "flex",
          flexDirection: { xs: "column", md: "row-reverse" },
          alignItems: "center",
          justifyContent: "space-between",
          gap: 4,
          mb: 10,
        }}
      >
        <Box sx={{ flex: 1 }}>
          <Typography
            variant="h4"
            sx={{ mb: 2, fontWeight: "bold", color: "#2e4638" }}
          >
            Our Vision
          </Typography>
          <Typography variant="body1" paragraph>
            Our vision is to transform industries by introducing
            next-generation solutions that enhance efficiency, foster
            collaboration, and create long-term sustainability.
          </Typography>
          <Typography variant="body1" paragraph>
            We believe in innovation driven by purpose, and we constantly
            strive to adapt to the evolving needs of our clients.
          </Typography>
        </Box>
        <Box sx={{ flex: 1, textAlign: "center" }}>
          <img
            src={our_vission}
            // alt="Our Vision"
            style={{
              width: `${imageSize.width}px`,
              height: `${imageSize.height}px`,
              objectFit: "cover",
              borderRadius: "12px",
              boxShadow: "0px 8px 20px rgba(0,0,0,0.1)",
            }}
          />
        </Box>
      </Box>
    </Container>
  );
}

export default AboutUs;