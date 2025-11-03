import { Box, Typography, Link, Grid, IconButton } from "@mui/material";
import {
  Facebook,
  Twitter,
  LinkedIn,
  Instagram,
} from "@mui/icons-material";
import footer_icon from "../../../assets/roots_icon.png"

export default function Footer() {
  const handleSocialClick = (platform) => {
    const urls = {
      Facebook: "https://facebook.com/rootsmedia25",
      Twitter: "https://twitter.com/rootsmedia25",
      LinkedIn: "https://linkedin.com/rootsmedia25",
      Instagram: "https://instagram.com/rootsmedia25",
    };
    window.open(urls[platform], "_blank");
  };

  return (
    <Box
      sx={{
        bgcolor: "primary.main",
        color: "white",
        px: 2,
        mt: 4,
      }}
    >
      <Grid
        container
        spacing={2}
        justifyContent="space-between"
        alignItems="center"
      >
        <Grid item xs={12} sm={4}>
          <img
            src={footer_icon}
            alt="Contact Us"
            style={{ width: "60px" }}
          />
          <Typography variant="body2">Roots Media</Typography>
        </Grid>
        <Grid
          item
          xs={12}
          sm={4}
          sx={{ textAlign: "end", mt: { xs: 2, sm: 0 } }}
        >
          <Box sx={{ display: "flex", justifyContent: "center", gap: 1 }}>
            {[
              { Icon: Facebook, platform: "Facebook" },
              { Icon: Twitter, platform: "Twitter" },
              { Icon: LinkedIn, platform: "LinkedIn" },
              { Icon: Instagram, platform: "Instagram" },
            ].map(({ Icon, platform }, i) => (
              <IconButton
                key={i}
                sx={{
                  color: "#fff",
                  transition: "all 0.3s",
                  "&:hover": {
                    backgroundColor: "#c3a36b",
                    color: "white",
                    transform: "scale(1.1)",
                  },
                }}
                onClick={() => handleSocialClick(platform)}
              >
                <Icon />
              </IconButton>
            ))}
          </Box>
        </Grid>
        <Grid item xs={12} sm={4}>
          <Typography
            variant="body2"
            sx={{ textAlign: { xs: "center", sm: "right" } }}
          >
            © Copyright 2025 Rootsmedia All Rights Reserved
          </Typography>
        </Grid>
      </Grid>
    </Box>
  );
}