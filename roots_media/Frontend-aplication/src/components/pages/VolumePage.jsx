import React, { useEffect, useState, useRef } from "react";
import {
  Box,
  Grid,
  Button,
  Typography,
  Card,
  CardMedia,
  Container,
  CardContent,
} from "@mui/material";
import { useParams, useNavigate } from "react-router-dom";
import { Calendar } from "lucide-react";
import MainLayout from "../templates/MainLayout";

export default function VolumeDetails() {
  const { volumeId } = useParams(); // This is the year
  const navigate = useNavigate();

  const [magazines, setMagazines] = useState([]);
  const [loading, setLoading] = useState(true);

  const effectRun = useRef(false);

useEffect(() => {
  if (!effectRun.current) {
    effectRun.current = true;

    fetch("https://roots-back-td3h.vercel.app/api/articles")
      .then((res) => res.json())
      .then((data) => {
        // filter by YEAR (volumeId is year)
        const filtered = data.articles.filter(
          (item) =>
            new Date(item.created_at)
              .getFullYear()
              .toString() === volumeId
        );

        const mapped = filtered.map((item) => ({
          issue: item.issue,
          month: new Date(item.created_at).toLocaleString("en-US", {
            month: "long",
          }),
          year: new Date(item.created_at).getFullYear(),
          image:
            "https://images.unsplash.com/photo-1553531888-a3d6c2c7e5d0?w=400&h=300&fit=crop",
          pdf: item.pdf_url,
        }));

        setMagazines(mapped);
        setLoading(false);
      });
  }
}, [volumeId]);


  if (loading) {
    return (
      <MainLayout withSidebar>
        <Container maxWidth="lg">
          <Typography sx={{ py: 8, textAlign: "center" }}>Loading...</Typography>
        </Container>
      </MainLayout>
    );
  }

  return (
    <MainLayout withSidebar>
      <Container maxWidth="lg" sx={{ py: 4 }}>
        <Typography
          variant="h3"
          sx={{
            fontWeight: 700,
            color: "#c3a36b",
            mb: 3,
            textAlign: "center",
          }}
        >
          Publications of {volumeId}
        </Typography>

        {magazines.length === 0 ? (
          <Typography sx={{ textAlign: "center", mt: 5 }} color="error">
            No magazines found for the year {volumeId}
          </Typography>
        ) : (
          <Grid container spacing={3}>
            {magazines.map((mag, i) => (
              <Grid item xs={12} sm={6} md={4} lg={3} key={i}>
                <Card sx={{ borderRadius: 2, overflow: "hidden" }}>
                  <CardMedia component="img" height="230" image={mag.image} />

                  <CardContent>
                    <Typography variant="h6" sx={{ fontWeight: 600 }}>
                      Issue {mag.issue}
                    </Typography>

                    <Box sx={{ display: "flex", mt: 1 }}>
                      <Calendar size={16} style={{ marginRight: 8 }} />
                      {mag.month} {mag.year}
                    </Box>

                    <Button
                      fullWidth
                      variant="contained"
                      href={mag.pdf}
                      target="_blank"
                      sx={{
                        mt: 2,
                        borderRadius: 2,
                        py: 1,
                        background: "linear-gradient(135deg, #2e4638, #3d5a48)",
                      }}
                    >
                      Read Magazine
                    </Button>
                  </CardContent>
                </Card>
              </Grid>
            ))}
          </Grid>
        )}

        <Box sx={{ display: "flex", justifyContent: "flex-end" }}>
          <Button
            onClick={() => navigate("/")}
            sx={{
              mt: 3,
              color: "#fff",
              background: "linear-gradient(135deg, #2e4638, #1f3127)",
            }}
          >
            Back
          </Button>
        </Box>
      </Container>
    </MainLayout>
  );
}
