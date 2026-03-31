import React, { useEffect, useState } from "react";
import { Box, Grid, Card, CardContent, Typography, Button } from "@mui/material";
import { Calendar, ChevronRight } from "lucide-react";
import { useNavigate } from "react-router-dom";

export default function LatestArticles() {
  const [monthGroups, setMonthGroups] = useState([]);
  const [loading, setLoading] = useState(true);
  const effectRun = React.useRef(false);
  const navigate = useNavigate();

  useEffect(() => {
    if (!effectRun.current) {
      effectRun.current = true;

      fetch("https://roots-back-td3h.vercel.app/api/articles")
        .then((res) => res.json())
        .then((data) => {
          const approved = data.articles.filter((a) => a.status === "approved");
          
          // Group by Month and Year
          const groups = {};
          approved.forEach((article) => {
            const date = new Date(article.created_at);
            const key = `${date.toLocaleString("en-US", { month: "long" })} ${date.getFullYear()}`;
            if (!groups[key]) {
              groups[key] = {
                monthYear: key,
                articles: [],
                date: date, // For sorting
              };
            }
            groups[key].articles.push(article);
          });

          // Sort groups by date descending
          const sortedGroups = Object.values(groups).sort((a, b) => b.date - a.date);
          
          setMonthGroups(sortedGroups);
          setLoading(false);
        })
        .catch((err) => {
          console.error("Failed to fetch:", err);
          setLoading(false);
        });
    }
  }, []);

  const handleMonthClick = (monthYear) => {
    navigate("/archives_page", { state: { openMonth: monthYear } });
  };

  return (
    <Box sx={{ py: 6, px: 2 }}>
      <Box maxWidth="lg">
        <Typography
          variant="h4"
          sx={{
            textAlign: "center",
            mb: 4,
            fontWeight: "bold",
            background: "linear-gradient(135deg, #2e4638, #1f3127)",
            WebkitBackgroundClip: "text",
            WebkitTextFillColor: "transparent",
          }}
        >
          Latest Publications
        </Typography>

        {loading ? (
          <Typography align="center">Loading latest publications...</Typography>
        ) : monthGroups.length === 0 ? (
          <Typography
            variant="h6"
            sx={{
              textAlign: "center",
              mt: 4,
              color: "gray",
              fontWeight: 500,
            }}
          >
            No publications found
          </Typography>
        ) : (
          <Grid container justifyContent="center">
            {monthGroups.slice(0, 1).map((group) => (
              <Grid item xs={12} sm={8} md={6} lg={4} key={group.monthYear}>
                <Card
                  sx={{
                    borderRadius: 4,
                    overflow: "hidden",
                    boxShadow: "0 8px 24px rgba(46, 70, 56, 0.08)",
                    transition: "transform 0.2s",
                    "&:hover": {
                      transform: "translateY(-4px)",
                      boxShadow: "0 12px 32px rgba(46, 70, 56, 0.12)",
                    },
                    cursor: "pointer",
                  }}
                  onClick={() => handleMonthClick(group.monthYear)}
                >
                  <CardContent sx={{ p: 3 }}>
                    <Box sx={{ display: "flex", alignItems: "center", mb: 2, color: "#2e4638" }}>
                      <Calendar size={24} style={{ marginRight: 12 }} />
                      <Typography variant="h6" sx={{ fontWeight: 700 }}>
                        {group.monthYear}
                      </Typography>
                    </Box>
                    
                    <Typography variant="body2" color="text.secondary" sx={{ mb: 2 }}>
                      {group.articles.length} {group.articles.length === 1 ? "Article" : "Articles"} Published
                    </Typography>

                    <Button
                      variant="text"
                      endIcon={<ChevronRight size={18} />}
                      sx={{
                        p: 0,
                        textTransform: "none",
                        fontWeight: 600,
                        color: "#2e4638",
                        "&:hover": { background: "transparent", textDecoration: "underline" },
                      }}
                    >
                      View Archive
                    </Button>
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
