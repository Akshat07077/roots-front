import React from 'react';
import { useParams, Link as RouterLink } from 'react-router-dom';
import { Container, Typography, Grid, Card, CardContent, CardActions, Button } from '@mui/material';
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
    <Container maxWidth="lg">
      <Typography variant="h4" align="center" sx={{ fontWeight: 700, color: '#2c5530', mb: 4 }}>
        {month.replace('-', ' ')} - Articles
      </Typography>

      <Grid container spacing={4}>
        {articles.map((article) => (
          <Grid item xs={12} sm={6} md={4} key={article.id}>
            <Card sx={{ borderRadius: 3, boxShadow: '0 4px 15px rgba(0,0,0,0.08)' }}>
              <CardContent>
                <Typography variant="h6" sx={{ fontWeight: 600, mb: 2 }}>
                  {article.title}
                </Typography>
              </CardContent>

              <CardActions sx={{ justifyContent: 'space-between', px: 2, pb: 2 }}>
                <Button
                  variant="outlined"
                  sx={{ textTransform: 'none', borderColor: '#2c5530', color: '#2c5530' }}
                  href={article.pdf}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  View PDF
                </Button>

                <Button
                  variant="contained"
                  sx={{ textTransform: 'none', backgroundColor: '#2c5530' }}
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
      <Button
        component={RouterLink}
        to="/"
        variant="outlined"
        sx={{
        alignItems:"end",
        //   mx: 'auto',
          mt: 6,
          px: 4,
          py: 1.5,
          textTransform: 'none',
          fontSize: '1rem',
          borderColor: '#2c5530',
          color: '#2c5530',
          '&:hover': {
            borderColor: '#1a3a1e',
            bgcolor: 'rgba(44, 85, 48, 0.04)',
          },
        }}
      >
        Back to home 
      </Button>
    </Container>
     </MainLayout>
  );
}
