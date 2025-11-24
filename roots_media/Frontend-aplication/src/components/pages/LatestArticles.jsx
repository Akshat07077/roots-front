import React, { useEffect, useState } from "react";
import { Box, Grid, Card, CardContent, Typography, Chip } from "@mui/material";
import { useNavigate } from "react-router-dom";
import { BookOpen, Calendar, FileText } from "lucide-react";

export default function LatestArticles() {
  const navigate = useNavigate();

  const [volumes, setVolumes] = useState([]);
  const effectRun = React.useRef(false);

  useEffect(() => {
    if (!effectRun.current) {
      effectRun.current = true;

      fetch("https://roots-back-td3h.vercel.app/api/articles")
        .then((res) => res.json())
        .then((data) => {
          const grouped = {};

          data.articles.forEach((item) => {
            const year = new Date(item.created_at).getFullYear();

            if (!grouped[year]) {
              grouped[year] = {
                year,
                volume: year,
                issues: 0,
              };
            }

            grouped[year].issues += 1;
          });

          const result = Object.values(grouped).sort((a, b) => b.year - a.year);
          setVolumes(result);
        })
        .catch((err) => console.error("Failed to fetch:", err));
    }
  }, []);

  const handleNavigate = (vol) => {
    navigate(`/volume/${vol.volume}`);
  };

  return (
    <Box sx={{ py: 6, px: 2 }}>
      <Box maxWidth="lg" mx="auto">
        <Typography
          variant="h3"
          sx={{
            textAlign: "center",
            mb: 3,
            fontWeight: "bold",
            color: "#2e4638",
          }}
        >
          Publications
        </Typography>

        {volumes.length === 0 ? (
          <Typography
            variant="h6"
            sx={{
              textAlign: "center",
              mt: 4,
              color: "gray",
              fontWeight: 500,
            }}
          >
            No records found
          </Typography>
        ) : (
          <Grid container spacing={3}>
            {volumes.map((vol, index) => (
              <Grid item xs={12} sm={6} md={6} key={index}>
                <Card
                  onClick={() => handleNavigate(vol)}
                  sx={{
                    cursor: "pointer",
                    transition: "all 0.3s ease",
                    border: "1px solid #e5e7eb",
                    boxShadow: "0 1px 3px rgba(0,0,0,0.1)",
                    "&:hover": {
                      boxShadow: "0 10px 25px rgba(0,0,0,0.15)",
                      transform: "translateY(-4px)",
                      borderColor: "#3b82f6",
                    },
                  }}
                >
                  <CardContent sx={{ p: 3 }}>
                    <Box sx={{ display: "flex", alignItems: "center", mb: 2 }}>
                      <Box
                        sx={{
                          backgroundColor: "#eff6ff",
                          borderRadius: "50%",
                          p: 1.5,
                          mr: 2,
                        }}
                      >
                        <BookOpen size={24} color="#3b82f6" />
                      </Box>
                      <Typography variant="h5" sx={{ fontWeight: 600, color: "#111827" }}>
                        Year {vol.year}
                      </Typography>
                    </Box>

                    <Box sx={{ display: "flex", alignItems: "center", mb: 1 }}>
                      <FileText size={18} color="#6b7280" style={{ marginRight: 8 }} />
                      <Typography variant="body1" color="text.secondary">
                        Issues {vol.issues}
                      </Typography>
                    </Box>

                    <Box sx={{ display: "flex", alignItems: "center", mb: 2 }}>
                      <Calendar size={18} color="#6b7280" style={{ marginRight: 8 }} />
                      <Typography variant="body1" color="text.secondary">
                        {vol.year}
                      </Typography>
                    </Box>

                    <Chip
                      label={index === 0 ? "Latest" : "Archive"}
                      size="small"
                      sx={{
                        backgroundColor: index === 0 ? "#dcfce7" : "#f3f4f6",
                        color: index === 0 ? "#166534" : "#4b5563",
                        fontWeight: 500,
                      }}
                    />
                  </CardContent>
                </Card>
              </Grid>
            ))}
          </Grid>
        )}
      </Box>
    </Box>
  );
}
