import React from "react";
import {
  Container,
  Typography,
  Box,
  Paper,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  Button,
} from "@mui/material";
import { CheckCircleOutline } from "@mui/icons-material";
import MainLayout from "../templates/MainLayout";
function AuthorsGuidelines() {
  const handleDownload = () => {
    const link = document.createElement("a");
    link.href = "/Documents/article_manual_script.docx";
    link.download = "Manuscript_Template.docx"; 
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  const guidelines = [
    "Articles must be written in English using Microsoft Word, with Times New Roman font throughout.",
    "The document should be single-spaced with 1-inch (2.54 cm) margins on all sides.",
    "The total length should not exceed 2000 words. However, in cases where additional clarity is needed, up to 2500 words may be accepted.",
    "The title should be concise and clearly reflect the content of the article. Use 14-point bold Times New Roman font.",
    "Author details, including full names and affiliations, should appear below the title in 12-point Times New Roman.",
    "The corresponding author's email must follow the addresses and be written in 11-point bold Times New Roman.",
    "The main body text should be in 12-point Times New Roman. Use 14-point bold for main headings and 12-point bold for subheadings.",
    "Articles once accepted cannot be corrected, so authors are requested to make sure of all correction before submitting.",
    "Articles must be free of plagiarism.",
    "Articles should be prepared in MS words format.",
    "Articles in Pdf format will not be accepted.",
    "Write in clear, simple English, providing complete details relevant to the topic.",
  ];

  return (
    <MainLayout withSidebar>
      <Container >
        {/* Title */}
        <Typography
          variant="h4"
          align="center"
          gutterBottom
          sx={{
            fontWeight: "bold",
            mb: 5,
            background: "linear-gradient(135deg, #2e4638, #1f3127)",
            WebkitBackgroundClip: "text",
            WebkitTextFillColor: "transparent",
          }}
        >
          Authors Guidelines
        </Typography>
        {/* Guidelines Box */}
        <Paper
          elevation={3}
          sx={{
            p: 4,
            borderRadius: 3,
            background: "linear-gradient(135deg, #fdfdfd, #f5f8f6)",
          }}
        >
          <Typography variant="subtitle1" sx={{p:1, color: "#2e4638"}}><strong>Authors are requested to check following points before submission of their articles to Rootsmedia:</strong></Typography>
          <List>
            {guidelines.map((text, index) => (
              <ListItem
                key={index}
                sx={{
                  alignItems: "flex-start",
                  mb: 1,
                }}
              >
                {/* <ListItemIcon> */}
                  {/* <CheckCircleOutline sx={{ color: "#2e4638" }} /> */}
                {/* </ListItemIcon> */}
                <ListItemText
                  primaryTypographyProps={{
                    fontSize: "1rem",
                    color: "#333",
                  }}
                  primary={`${index + 1}. ${text}`}
                />
              </ListItem>
            ))}
          </List>
        </Paper>

        {/* Download Button */}
        <Box sx={{ display: "flex", justifyContent: "center", mt: 5 }}>
          <Button
            variant="contained"
            size="large"
            onClick={handleDownload}
            sx={{
              textTransform: "none",
              borderRadius: 2,
              px: 4,
              py: 1.2,
              fontWeight: "bold",
              background: "linear-gradient(135deg, #2e4638, #1f3127)",
              "&:hover": {
                background: "linear-gradient(135deg, #1f3127, #2e4638)",
                transform: "translateY(-2px)",
              },
            }}
          >
            Download Manuscript Template
          </Button>
        </Box>
      </Container>
    </MainLayout>
  );
}

export default AuthorsGuidelines;
