import React from "react";
import {
  Box,
  Typography,
  Container,
  Paper,
  Divider,
} from "@mui/material";

const JournalDetails = () => {
  const details = [
    { label: "Title", value: "Roots Media" },
    { label: "Frequency", value: "Monthly" },
    { label: "ISSN", value: "", highlight: true },
    { label: "Publisher", value: "Roots Media" },
    { label: "Chief-Editor", value: "" },
    { label: "Copyright", value: "Roots Media" },
    { label: "Starting Year", value: "2025" },
    { label: "Subject", value: "Agriculture and Allied Science" },
    { label: "Language", value: "English" },
    { label: "Publication Format", value: "Online" },
    { label: "E-mail", value: "rootsmedia.publications@gmail.com " },
    { label: "Mobile", value: "6305807610 / 6302286595" },
    { label: "Website", value: "https://rootsmedia.co.in/ " }
  ];

  return (
    <Container maxWidth="sm" sx={{ py: 4 }}>
      <Paper
        sx={{
          background: "#174634",
          borderRadius: "18px",
          p: 3,
          color: "#EAF5EE",
          boxShadow: "0 16px 36px rgba(0,0,0,0.3)",
          border: "1px solid rgba(180,220,200,0.25)",
        }}
      >
        <Typography
          variant="h6"
          sx={{
            textAlign: "center",
            fontWeight: 700,
            mb: 2,
          }}
        >
          Journal Information
        </Typography>

        <Divider sx={{ mb: 2, borderColor: "rgba(255,255,255,0.2)" }} />

        {details.map((item, index) => (
          <Box key={index}>
            <Box
              sx={{
                display: "grid",
                gridTemplateColumns: "160px 14px 1fr",
                alignItems: "flex-start",
                py: 0.8,
              }}
            >
              {/* LABEL */}
              <Typography
                sx={{
                  fontSize: "0.9rem",
                  fontWeight: 600,
                  whiteSpace: "nowrap",
                }}
              >
                {item.label}
              </Typography>

              {/* COLON */}
              <Typography
                sx={{
                  fontSize: "0.9rem",
                  fontWeight: 600,
                }}
              >
                :
              </Typography>

              {/* VALUE */}
              <Typography
                sx={{
                  fontSize: "0.9rem",
                  fontWeight: item.highlight ? 700 : 500,
                  color: item.highlight ? "#FFD84D" : "#EAF5EE",
                  lineHeight: 1.45,
                  wordBreak: "break-word",
                }}
              >
                {item.value}
              </Typography>
            </Box>

            {index !== details.length - 1 && (
              <Divider sx={{ borderColor: "rgba(255,255,255,0.08)" }} />
            )}
          </Box>
        ))}
      </Paper>
    </Container>
  );
};

export default JournalDetails;
