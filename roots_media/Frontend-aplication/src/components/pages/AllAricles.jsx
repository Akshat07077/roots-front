import React from 'react';
import { Link as RouterLink } from 'react-router-dom';
import { 
  Container, 
  Typography, 
  Grid, 
  Card, 
  CardContent, 
  Button,
  Box,
  Divider
} from '@mui/material';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import MainLayout from '../templates/MainLayout';

const articleData = {
  'September-2025': {
    displayName: 'September 2025',
    pdf: './Volume-05-Issue-09-September-2025.pdf',
    articleCount: 12
  },
  'August-2025': {
    displayName: 'August 2025',
    pdf: './Volume-05-Issue-08-August-2025.pdf',
    articleCount: 15
  },
  'July-2025': {
    displayName: 'July 2025',
    pdf: './Volume-05-Issue-07-July-2025.pdf',
    articleCount: 10
  },
  'June-2025': {
    displayName: 'June 2025',
    pdf: './Volume-05-Issue-06-June-2025.pdf',
    articleCount: 14
  },
  'May-2025': {
    displayName: 'May 2025',
    pdf: './Volume-05-Issue-05-May-2025.pdf',
    articleCount: 11
  },
  'April-2025': {
    displayName: 'April 2025',
    pdf: './Volume-05-Issue-04-April-2025.pdf',
    articleCount: 13
  },
  'March-2025': {
    displayName: 'March 2025',
    pdf: './Volume-05-Issue-03-March-2025.pdf',
    articleCount: 9
  },
  'February-2025': {
    displayName: 'February 2025',
    pdf: './Volume-05-Issue-02-February-2025.pdf',
    articleCount: 16
  },
  'January-2025': {
    displayName: 'January 2025',
    pdf: './Volume-05-Issue-01-January-2025.pdf',
    articleCount: 8
  },
};

export default function AllArticles() {
  return (
    <MainLayout withSidebar>
      <Container maxWidth="lg" sx={{ py: 6 }}>
        <Typography 
          variant="h4" 
          align="center" 
          sx={{
            fontWeight: 700,
            background: "linear-gradient(135deg, #2e4638, #1f3127)",
            WebkitBackgroundClip: "text",
            WebkitTextFillColor: "transparent",
            mb: 2,
          }}
        >
          All Archives
        </Typography>
        
        <Typography 
          variant="body1" 
          align="center" 
          sx={{ color: '#2e4638', mb: 4 }}
        >
          Browse all published issues
        </Typography>

        <Divider sx={{ mb: 5, maxWidth: 200, mx: 'auto', borderColor: '#d4af37' }} />

        <Grid container spacing={4}>
          {Object.entries(articleData).map(([monthKey, monthData]) => (
            <Grid item xs={12} sm={6} md={4} key={monthKey}>
              <Card
                sx={{
                  borderRadius: 4,
                  boxShadow: '0 8px 24px rgba(46, 70, 56, 0.08)',
                  height: '100%',
                  display: 'flex',
                  flexDirection: 'column',
                }}
              >
                <CardContent
                  sx={{
                    textAlign: 'center',
                    p: 4,
                    flexGrow: 1,
                    display: 'flex',
                    flexDirection: 'column',
                    justifyContent: 'space-between',
                  }}
                >
                  <Box
                    sx={{
                      width: 80,
                      height: 100,
                      bgcolor: '#f0f7f2',
                      borderRadius: 2,
                      mx: 'auto',
                      mb: 2,
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      fontWeight: 700,
                      fontSize: '2rem',
                      color: '#2e4638',
                    }}
                  >
                    {monthData.articleCount}
                  </Box>

                  <Typography
                    variant="h6"
                    fontWeight={600}
                    sx={{ color: '#2e4638', mb: 1 }}
                  >
                    {monthData.displayName}
                  </Typography>

                  <Typography
                    variant="body2"
                    sx={{ color: '#666', mb: 3 }}
                  >
                    {monthData.articleCount} {monthData.articleCount === 1 ? 'Article' : 'Articles'}
                  </Typography>

                  <Button
                    component={RouterLink}
                    to={`/articles/${monthKey}`}
                    variant="contained"
                    sx={{
                      px: 3,
                      py: 1,
                      textTransform: 'none',
                      fontSize: '0.9rem',
                      background: 'linear-gradient(135deg, #2e4638, #1f3127)',
                    }}
                  >
                    View Articles
                  </Button>
                </CardContent>
              </Card>
            </Grid>
          ))}
        </Grid>

        <Box sx={{ textAlign: 'center', mt: 6 }}>
          <Button
            component={RouterLink}
            to="/"
            variant="outlined"
            startIcon={<ArrowBackIcon />}
            sx={{
              px: 4,
              py: 1.5,
              textTransform: 'none',
              fontSize: '1rem',
              borderColor: '#2e4638',
              color: '#2e4638',
            }}
          >
            Back to Home
          </Button>
        </Box>
      </Container>
    </MainLayout>
  );
}