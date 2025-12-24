import React from 'react';
import { Navigate } from 'react-router-dom';
import { Box, Typography, Button, Container, Paper } from '@mui/material';
import LockIcon from '@mui/icons-material/Lock';

function ProtectedRoute({ children, requiredRole = 'admin' }) {
  const userRole = sessionStorage.getItem('userRole');
  const token = sessionStorage.getItem('token');

  if (!token || !userRole) {
    return <Navigate to="/login" replace />;
  }

  if (userRole !== requiredRole) {
    return (
      <Box
        sx={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          minHeight: '100vh',
          backgroundColor: '#f5f5f5',
        }}
      >
        <Container maxWidth="xs">
          <Paper
            elevation={10}
            sx={{
              p: 4,
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              borderRadius: 3,
            }}
          >
            <Box
              sx={{
                width: 80,
                height: 80,
                borderRadius: '50%',
                backgroundColor: '#ffebee',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                mb: 2,
              }}
            >
              <LockIcon sx={{ fontSize: 40, color: '#d32f2f' }} />
            </Box>

            <Typography variant="h5" fontWeight="bold" gutterBottom>
              Access Denied
            </Typography>

            <Typography variant="body2" color="text.secondary" sx={{ mb: 3, textAlign: 'center' }}>
              You do not have permission to access the admin panel. Only admin users can access this page.
            </Typography>

            <Button
              variant="contained"
              onClick={() => window.location.href = '/'}
              sx={{
                mt: 2,
                textTransform: 'none',
                fontSize: '1rem',
                fontWeight: 'bold',
              }}
            >
              Go to Home
            </Button>
          </Paper>
        </Container>
      </Box>
    );
  }

  return children;
}

export default ProtectedRoute;
