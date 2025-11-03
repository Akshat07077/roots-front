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
} from "@mui/material";
import MainLayout from "../templates/MainLayout";

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
    <Grid container spacing={3} justifyContent="center">
      {members.map((member) => (
        <Grid item xs={12} sm={6} md={4} key={member.id}>
          <Card
            sx={{
              textAlign: "center",
              borderRadius: 3,
              boxShadow: "0px 2px 10px rgba(0,0,0,0.1)",
              transition: "transform 0.3s ease",
              "&:hover": { transform: "translateY(-5px)" },
            }}
          >
            <CardContent>
              <Avatar
                src={member.photo_url || "/images/default-avatar.png"}
                alt={member.name}
                sx={{
                  width: 100,
                  height: 100,
                  margin: "0 auto 10px auto",
                  border: `2px solid ${theme.palette.primary.main}`,
                }}
              />
              <Typography
                variant="h6"
                sx={{ fontWeight: 600, color: theme.palette.text.primary }}
              >
                {member.name}
              </Typography>
              <Typography variant="body2" color="text.secondary">
                {member.title ? `${member.title}, ` : ""}
                {member.affiliation}
              </Typography>
              {member.email && (
                <Typography variant="body2" color="text.secondary">
                  📧 {member.email}
                </Typography>
              )}
              {member.phone_number && (
                <Typography variant="body2" color="text.secondary">
                  📞 {member.phone_number}
                </Typography>
              )}
            </CardContent>
          </Card>
        </Grid>
      ))}
    </Grid>
  );

  return (
    <MainLayout>
      <Container sx={{ py: 6 }}>
        {loading ? (
          <Box sx={{ display: "flex", justifyContent: "center", py: 10 }}>
            <CircularProgress />
          </Box>
        ) : (
          <Box sx={{ textAlign: "center" }}>
            <Typography
              variant="h4"
              sx={{
                fontWeight: "bold",
                mb: 2,
                color: theme.palette.primary.main,
                textTransform: "uppercase",
              }}
            >
              Editorial & Advisory Board
            </Typography>
            <Typography
              variant="body1"
              color="text.secondary"
              sx={{ maxWidth: 600, mx: "auto", mb: 4 }}
            >
              Our distinguished board members contribute their expertise and
              experience to maintain the highest academic standards.
            </Typography>
            {renderMembers(members)}
          </Box>
        )}
      </Container>
    </MainLayout>
  );
}
