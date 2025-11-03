import React from "react";
import { Box, Typography, Button, Container } from "@mui/material";
import { Search, Home } from "lucide-react";
import { useNavigate } from "react-router-dom";

export default function NotFound() {
  const navigate = useNavigate();

  return (
    <Box
      sx={{
        minHeight: "100vh",
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",
        textAlign: "center",
        background: "linear-gradient(135deg, #0f2818 0%, #1a3d2e 50%, #0d1f17 100%)",
        position: "relative",
        overflow: "hidden",
        px: 2,
        
        "&::before": {
          content: '""',
          position: "absolute",
          width: "400px",
          height: "400px",
          background: "radial-gradient(circle, rgba(139, 195, 74, 0.1) 0%, transparent 70%)",
          borderRadius: "50%",
          top: "-100px",
          left: "-100px",
          pointerEvents: "none",
        },
        
        "&::after": {
          content: '""',
          position: "absolute",
          width: "300px",
          height: "300px",
          background: "radial-gradient(circle, rgba(76, 175, 80, 0.08) 0%, transparent 70%)",
          borderRadius: "50%",
          bottom: "-50px",
          right: "-50px",
          pointerEvents: "none",
        },
      }}
    >
      <Container maxWidth="md" sx={{ position: "relative", zIndex: 1 }}>
        {/* Animated 404 Number */}
        <Box
          sx={{
            mt: 4,
            mb: 2,
            animation: "float 3s ease-in-out infinite",
            "@keyframes float": {
              "0%, 100%": { transform: "translateY(0px)" },
              "50%": { transform: "translateY(-20px)" },
            },
          }}
        >
          <Typography
            component="h1"
            sx={{
              fontSize: "clamp(80px, 20vw, 180px)",
              fontWeight: 900,
              background: "linear-gradient(135deg, #8bc34a 0%, #4caf50 100%)",
              WebkitBackgroundClip: "text",
              WebkitTextFillColor: "transparent",
              backgroundClip: "text",
              letterSpacing: "-2px",
              lineHeight: 1,
              m: 0,
            }}
          >
            404
          </Typography>
        </Box>
        <Typography
          variant="h3"
          component="h2"
          sx={{
            color: "#e8f5e9",
            mb: 2,
            fontWeight: 700,
            fontSize: "clamp(24px, 6vw, 42px)",
            letterSpacing: "-0.5px",
          }}
        >
          Page Not Found
        </Typography>

        {/* Description */}
        <Typography
          variant="body1"
          sx={{
            color: "#b7d9b5",
            mb: 4,
            maxWidth: "500px",
            mx: "auto",
            fontSize: "clamp(14px, 4vw, 18px)",
            lineHeight: 1.8,
            fontWeight: 300,
          }}
        >
          The page you're looking for doesn't exist or has been moved.
        </Typography>

        {/* Buttons Container */}
        <Box
          sx={{
            display: "flex",
            gap: 2,
            justifyContent: "center",
            flexWrap: "wrap",
            mt: 3,
            mb: 6,
          }}
        >
          {/* Go Back Home Button */}
          <Button
            variant="contained"
            startIcon={<Home size={20} />}
            onClick={() => navigate("/")}
            sx={{
              backgroundColor: "#4caf50",
              color: "#ffffff",
              px: 4,
              py: 1.5,
              fontSize: "16px",
              fontWeight: 600,
              textTransform: "none",
              borderRadius: "8px",
              boxShadow: "0 4px 15px rgba(76, 175, 80, 0.3)",
              transition: "all 0.3s cubic-bezier(0.4, 0, 0.2, 1)",
              
              "&:hover": {
                backgroundColor: "#45a049",
                boxShadow: "0 6px 20px rgba(76, 175, 80, 0.4)",
                transform: "translateY(-2px)",
              },
              
              "&:active": {
                transform: "translateY(0)",
              },
            }}
          >
            Go Back Home
          </Button>
        </Box>
      </Container>

      {/* Animations */}
      <style>{`
        @keyframes pulse {
          0%, 100% { opacity: 0.7; }
          50% { opacity: 1; }
        }
      `}</style>
    </Box>
  );
}