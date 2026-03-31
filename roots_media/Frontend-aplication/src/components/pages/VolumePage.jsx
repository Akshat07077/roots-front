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
          variant="h4"
          sx={{
            fontWeight: 700,
            background: "linear-gradient(135deg, #2e4638, #1f3127)",
            WebkitBackgroundClip: "text",
            WebkitTextFillColor: "transparent",
            mb: 4,
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
                <Card sx={{ borderRadius: 4, overflow: "hidden", boxShadow: "0 8px 24px rgba(46, 70, 56, 0.08)" }}>
                  <Box sx={{ height: 250, overflow: "hidden", position: "relative" }}>
                    <iframe
                      src={`${mag.pdf}#toolbar=0&navpanes=0&scrollbar=0&view=FitH`}
                      width="100%"
                      height="100%"
                      style={{ border: "none", pointerEvents: "none" }}
                      title={`Issue ${mag.issue}`}
                    />
                    <Box
                      sx={{
                        position: "absolute",
                        top: 0,
                        left: 0,
                        width: "100%",
                        height: "100%",
                        zIndex: 2,
                        cursor: "pointer",
                        
                      }}
                      onClick={() => window.open(mag.pdf, "_blank")}
                    />
                  </Box>

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
                        background: "linear-gradient(135deg, #2e4638, #1f3127)",
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
