import React from 'react';
import { useParams, Link as RouterLink } from 'react-router-dom';
import { Container, Typography, Grid, Card, CardContent, CardActions, Button, Box } from '@mui/material';
import DownloadIcon from '@mui/icons-material/Download';
import MainLayout from '../templates/MainLayout';

const articlesData = {
  'September-2025': [
    { id: 1, title: "Precision Agriculture: IoT-Based Smart Farming Solutions", pdf: "./Volume-05-Issue-09-September-2025.pdf" },
    { id: 2, title: "Climate-Resilient Horticulture: Drought-Tolerant Vegetables", pdf: "./Volume-05-Issue-09-September-2025.pdf" },
    { id: 3, title: "Dairy Tech: Automated Milking Systems", pdf: "./Volume-05-Issue-09-September-2025.pdf" },
  ],
  'August-2025': [
    { id: 1, title: "Soil Health and Management Practices", pdf: "./Volume-05-Issue-08-August-2025.pdf" },
  ],
  // other months...
};

export default function Articles() {
  const { month } = useParams(); 
  const articles = articlesData[month] || [];

  if (!articles.length) {
    return (

      <Container maxWidth="md" sx={{ py: 8 }}>
        <Typography variant="h4" align="center" color="error">
          No articles found for this month
        </Typography>
      </Container>
    );
  }

  return (
     <MainLayout>
    <Container maxWidth="lg" sx={{ py: 6 }}>
      <Typography
        variant="h4"
        align="center"
        sx={{
          fontWeight: 700,
          background: "linear-gradient(135deg, #2e4638, #1f3127)",
          WebkitBackgroundClip: "text",
          WebkitTextFillColor: "transparent",
          mb: 4,
        }}
      >
        {month.replace('-', ' ')} - Articles
      </Typography>

      <Grid container spacing={4}>
          <Grid item xs={12} sm={6} md={4} key={article.id}>
            <Card sx={{ borderRadius: 4, boxShadow: '0 8px 24px rgba(46, 70, 56, 0.08)', overflow: 'hidden' }}>
              <Box
                sx={{
                  height: 200,
                  position: "relative",
                  overflow: "hidden",
                  background: "#f5f5f5",
                }}
              >
                <iframe
                  src={`${article.pdf}#toolbar=0&navpanes=0&scrollbar=0&view=FitH`}
                  width="100%"
                  height="100%"
                  style={{ border: "none", pointerEvents: "none" }}
                  title={article.title}
                />
                <Box
                  component="a"
                  href={article.pdf}
                  target="_blank"
                  rel="noopener noreferrer"
                  sx={{
                    position: "absolute",
                    top: 0,
                    left: 0,
                    width: "100%",
                    height: "100%",
                    zIndex: 2,
                  }}
                />
              </Box>
              <CardContent>
                <Typography variant="h6" sx={{ fontWeight: 600, mb: 2 }}>
                  {article.title}
                </Typography>
              </CardContent>

              <CardActions sx={{ justifyContent: 'space-between', px: 2, pb: 2 }}>
                <Button
                  variant="outlined"
                  sx={{ textTransform: 'none', borderColor: '#2e4638', color: '#2e4638' }}
                  href={article.pdf}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  View PDF
                </Button>

                <Button
                  variant="contained"
                  sx={{ textTransform: 'none', backgroundColor: '#2e4638' }}
                  href={article.pdf}
                  download
                  startIcon={<DownloadIcon />}
                >
                  Download
                </Button>
              </CardActions>
            </Card>
          </Grid>
        ))}
      </Grid>

      {/* Back Button at the very end */}
      <Box sx={{ display: 'flex', justifyContent: 'flex-start', mt: 6 }}>
        <Button
          component={RouterLink}
          to="/"
          variant="outlined"
          sx={{
            px: 4,
            py: 1.5,
            textTransform: 'none',
            fontSize: '1rem',
            borderColor: '#2e4638',
            color: '#2e4638',
          }}
        >
          Back to home 
        </Button>
      </Box>
    </Container>
     </MainLayout>
  );
}
