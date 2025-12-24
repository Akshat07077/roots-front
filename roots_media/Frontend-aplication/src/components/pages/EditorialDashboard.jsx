import React, { useEffect, useState, useRef } from "react";
import {
  Box,
  Typography,
  Card,
  CardContent,
  Container,
  Avatar,
  Grid,
  useTheme,
  CircularProgress,
  Divider,
} from "@mui/material";
import MainLayout from "../templates/MainLayout";
import { Email, Phone } from "@mui/icons-material";

export default function EditorialAndAdvisoryBoard() {
  const theme = useTheme();

  const [members, setMembers] = useState([]);
  const [loading, setLoading] = useState(true);

  // ✅ useRef guard to prevent duplicate API calls in Strict Mode
  const hasFetched = useRef(false);

  useEffect(() => {
    if (hasFetched.current) return; // prevents second call in StrictMode
    hasFetched.current = true;

    const fetchMembers = async () => {
      try {
        const response = await fetch(
          "https://roots-back-td3h.vercel.app/api/editorial-board"
        );
        const data = await response.json();
        setMembers(data.members || []);
      } catch (error) {
        console.error("Error fetching members:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchMembers();
  }, []);

  const renderMembers = (members) => (
    <Grid container spacing={3}>
      {members.map((member) => (
        <Grid item xs={4} key={member.id}>
          <Card
            sx={{
              textAlign: "center",
              borderRadius: 3,
              boxShadow: "0 8px 24px rgba(46, 70, 56, 0.08)",
              p: 3,
              height: "100%",
              maxWidth: 300,
              display: "flex",
              flexDirection: "column",
              mx:"auto"
            }}
          >
            <CardContent sx={{ p: 0, flex: 1, display: "flex", flexDirection: "column" }}>
              <Avatar
                src={member.photo_url || "/images/default-avatar.png"}
                alt={member.name}
                sx={{
                  width: 100,
                  height: 100,
                  margin: "0 auto 1.5rem",
                  border: "2px solid #2e4638",
                }}
              />

              <Typography
                variant="h6"
                sx={{
                  fontWeight: 700,
                  color: "#2e4638",
                  mb: 0.5,
                }}
              >
                {member.name}
              </Typography>

              {member.title && (
                <Typography
                  variant="body2"
                  sx={{
                    color: "#666",
                    mb: 1.5,
                    fontSize: "0.9rem",
                  }}
                >
                  {member.title}
                </Typography>
              )}

              {member.bio && (
                <Typography
                  variant="body2"
                  sx={{
                    color: "#666",
                    mb: 1.5,
                    fontSize: "0.85rem",
                    lineHeight: 1.5,
                  }}
                >
                  {member.bio}
                </Typography>
              )}

              <Box sx={{ display: "flex", flexDirection: "column", gap: 0.8, mt: "auto" }}>
                {member.email && (
                  <Box
                    sx={{
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      gap: 0.5,
                    }}
                  >
                    <Email sx={{ fontSize: "16px", color: "#2e4638" }} />
                    <Typography
                      variant="body2"
                      sx={{
                        color: "#2e4638",
                        fontSize: "0.8rem",
                      }}
                    >
                      {member.email}
                    </Typography>
                  </Box>
                )}
                {member.phone_number && (
                  <Box
                    sx={{
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      gap: 0.5,
                    }}
                  >
                    <Phone sx={{ fontSize: "16px", color: "#2e4638" }} />
                    <Typography
                      variant="body2"
                      sx={{
                        color: "#2e4638",
                        fontSize: "0.8rem",
                      }}
                    >
                      {member.phone_number}
                    </Typography>
                  </Box>
                )}
              </Box>
            </CardContent>
          </Card>
        </Grid>
      ))}
    </Grid>
  );

  return (
    <MainLayout>
      <Container maxWidth="lg" sx={{ py: 4 }}>
        {loading ? (
          <Box sx={{ display: "flex", justifyContent: "center", py: 10 }}>
            <CircularProgress />
          </Box>
        ) : (
          <Box>
            <Box sx={{ textAlign: "center", mb: 5 }}>
              <Typography
                variant="h4"
                sx={{
                  fontWeight: "bold",
                  mb: 1.5,
                  background: "linear-gradient(135deg, #2e4638, #1f3127)",
                  WebkitBackgroundClip: "text",
                  WebkitTextFillColor: "transparent",
                }}
              >
                Editorial & Advisory Board
              </Typography>

              <Typography
                variant="body2"
                sx={{
                  maxWidth: 600,
                  mx: "auto",
                  color: "#666",
                  fontSize: "0.95rem",
                  lineHeight: 1.6,
                }}
              >
                Our distinguished board members contribute their expertise and experience to maintain the highest academic standards.
              </Typography>
            </Box>

            {renderMembers(members)}
          </Box>
        )}
      </Container>
    </MainLayout>
  );
}
