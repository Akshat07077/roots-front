// import React, { useState } from 'react';
// import {
//   Box,
//   Drawer,
//   AppBar,
//   Toolbar,
//   List,
//   Typography,
//   Divider,
//   IconButton,
//   ListItem,
//   ListItemButton,
//   ListItemIcon,
//   ListItemText,
//   Card,
//   CardContent,
//   Grid,
//   Button,
//   Chip,
//   Table,
//   TableBody,
//   TableCell,
//   TableContainer,
//   TableHead,
//   TableRow,
//   Paper,
//   TablePagination,
//   Avatar,
//   TextField,
//   Dialog,
//   DialogTitle,
//   DialogContent,
//   DialogActions,
//   Container,
// } from '@mui/material';
// import {
//   Menu as MenuIcon,
//   Article as ArticleIcon,
//   People as PeopleIcon,
//   CheckCircle as CheckCircleIcon,
//   Cancel as CancelIcon,
//   AccessTime as AccessTimeIcon,
//   CloudDownload as CloudDownloadIcon,
//   Visibility as VisibilityIcon,
//   Add as AddIcon,
// } from '@mui/icons-material';
// import { useNavigate } from 'react-router-dom';

// const drawerWidth = 260;

// function AdminDashboard() {
//   const [mobileOpen, setMobileOpen] = useState(false);
//   const [selectedMenu, setSelectedMenu] = useState('articles');
//   const [page, setPage] = useState(0);
//   const [rowsPerPage, setRowsPerPage] = useState(5);
//   const [openDialog, setOpenDialog] = useState(false);
//   const [editorialMember, setEditorialMember] = useState({
//     name: '',
//     profession: '',
//     email: '',
//     phone: '',
//     bio: '',
//     profilePhoto: null,
//   });
// const navigate = useNavigate();
//   const articles = [
//     {
//       id: 'ae522f93-b665-42dd-9609-f6b8e8dd8e6a',
//       title: 'aa',
//       author: 'AKSHAT s',
//       created: '10/20/2025',
//       status: 'pending',
//     },
//     {
//       id: '4915ad6a-d667-409e-9567-b2c2aeeb4a47',
//       title: 'AA',
//       author: 'AKSHAT',
//       created: '10/20/2025',
//       status: 'pending',
//     },
//     {
//       id: 'ae522f93-b665-42dd-9609-f6b8e8dd8e6b',
//       title: 'Sample Article 1',
//       author: 'John Doe',
//       created: '10/19/2025',
//       status: 'approved',
//     },
//     {
//       id: '4915ad6a-d667-409e-9567-b2c2aeeb4a48',
//       title: 'Sample Article 2',
//       author: 'Jane Smith',
//       created: '10/18/2025',
//       status: 'rejected',
//     },
//     {
//       id: 'ae522f93-b665-42dd-9609-f6b8e8dd8e6c',
//       title: 'Research Paper',
//       author: 'Alice Johnson',
//       created: '10/17/2025',
//       status: 'pending',
//     },
//     {
//       id: '4915ad6a-d667-409e-9567-b2c2aeeb4a49',
//       title: 'Case Study',
//       author: 'Bob Williams',
//       created: '10/16/2025',
//       status: 'approved',
//     },
//   ];

//   const stats = {
//     pending: articles.filter(a => a.status === 'pending').length,
//     approved: articles.filter(a => a.status === 'approved').length,
//     rejected: articles.filter(a => a.status === 'rejected').length,
//   };

//   const handleDrawerToggle = () => {
//     setMobileOpen(!mobileOpen);
//   };

//   const handleChangePage = (event, newPage) => {
//     setPage(newPage);
//   };

//   const handleChangeRowsPerPage = (event) => {
//     setRowsPerPage(parseInt(event.target.value, 10));
//     setPage(0);
//   };

//   const handleOpenDialog = () => {
//     setOpenDialog(true);
//   };

//   const handleCloseDialog = () => {
//     setOpenDialog(false);
//     setEditorialMember({
//       name: '',
//       profession: '',
//       email: '',
//       phone: '',
//       bio: '',
//       profilePhoto: null,
//     });
//   };

//   const handleInputChange = (e) => {
//     setEditorialMember({
//       ...editorialMember,
//       [e.target.name]: e.target.value,
//     });
//   };

//   const handleSubmitMember = () => {
//     console.log('Editorial Member:', editorialMember);
//     // Add your API call here to save the member
//     handleCloseDialog();
//   };

//   const handleApprove = (articleId) => {
//     console.log('Approve article:', articleId);
//   };

//   const handleReject = (articleId) => {
//     console.log('Reject article:', articleId);

//   };

//   const handleLogout = () => {
//     console.log("hi");

//    navigate('/login');

//   };

//   const drawer = (
//     <Box>
//       <Toolbar sx={{ backgroundColor: '#2c5530', color: 'white' }}>
//         <Typography variant="h6" noWrap component="div" fontWeight="bold">
//           Admin Panel
//         </Typography>
//       </Toolbar>
//       <Divider />
//       <List sx={{ pt: 2 }}>
//         <ListItem disablePadding>
//           <ListItemButton
//             selected={selectedMenu === 'articles'}
//             onClick={() => setSelectedMenu('articles')}
//             sx={{
//               mx: 1,
//               borderRadius: 1,
//               '&.Mui-selected': {
//                 backgroundColor: '#2c5530',
//                 color: 'white',
//                 '&:hover': {
//                   backgroundColor: '#2c5530',
//                 },
//               },
//             }}
//           >
//             <ListItemIcon sx={{ color: selectedMenu === 'articles' ? 'white' : 'inherit' }}>
//               <ArticleIcon />
//             </ListItemIcon>
//             <ListItemText primary="Articles Management" />
//           </ListItemButton>
//         </ListItem>
//         <ListItem disablePadding>
//           <ListItemButton
//             selected={selectedMenu === 'editorial'}
//             onClick={() => setSelectedMenu('editorial')}
//             sx={{
//               mx: 1,
//               borderRadius: 1,
//               '&.Mui-selected': {
//                 backgroundColor: '#2c5530',
//                 color: 'white',
//                 '&:hover': {
//                   backgroundColor: '#2c5530',
//                 },
//               },
//             }}
//           >
//             <ListItemIcon sx={{ color: selectedMenu === 'editorial' ? 'white' : 'inherit' }}>
//               <PeopleIcon />
//             </ListItemIcon>
//             <ListItemText primary="Editorial Members" />
//           </ListItemButton>
//         </ListItem>
//       </List>
//     </Box>
//   );

//   return (
//     <Box sx={{ display: 'flex' }}>
//       <AppBar
//         position="fixed"
//         sx={{
//           width: { sm: `calc(100% - ${drawerWidth}px)` },
//           ml: { sm: `${drawerWidth}px` },
//           background:"#2c5530"
//         }}
//       >
//         <Toolbar>
//           <IconButton
//             color="inherit"
//             edge="start"
//             onClick={handleDrawerToggle}
//             sx={{ mr: 2, display: { sm: 'none' } }}
//           >
//             <MenuIcon />
//           </IconButton>
//           <Typography variant="h6" noWrap component="div" sx={{ flexGrow: 1 }}>
//             {selectedMenu === 'articles' ? 'Articles Dashboard' : 'Editorial Members'}
//           </Typography>
//           <Button
//             color="inherit"
//             variant="outlined"
//             onClick={handleLogout}
//             sx={{ ml: 2 }}
//           >
//             Logout
//           </Button>
//         </Toolbar>
//       </AppBar>
//       <Box
//         component="nav"
//         sx={{ width: { sm: drawerWidth }, flexShrink: { sm: 0 } }}
//       >
//         <Drawer
//           variant="temporary"
//           open={mobileOpen}
//           onClose={handleDrawerToggle}
//           ModalProps={{ keepMounted: true }}
//           sx={{
//             display: { xs: 'block', sm: 'none' },
//             '& .MuiDrawer-paper': { boxSizing: 'border-box', width: drawerWidth },
//           }}
//         >
//           {drawer}
//         </Drawer>
//         <Drawer
//           variant="permanent"
//           sx={{
//             display: { xs: 'none', sm: 'block' },
//             '& .MuiDrawer-paper': { boxSizing: 'border-box', width: drawerWidth },
//           }}
//           open
//         >
//           {drawer}
//         </Drawer>
//       </Box>

//       {/* Main Content */}
//       <Box
//         component="main"
//         sx={{
//           flexGrow: 1,
//           p: 3,
//           width: { sm: `calc(100% - ${drawerWidth}px)` },
//           backgroundColor: '#f5f5f5',
//           minHeight: '100vh',
//         }}
//       >
//         <Toolbar />

//         {selectedMenu === 'articles' && (
//           <Container maxWidth="xl">
//             <Typography variant="h4" gutterBottom fontWeight="bold" sx={{ mb: 3 }}>
//               Admin Test Dashboard
//             </Typography>

//             <Grid container spacing={3} sx={{ mb: 4 }}>
//               <Grid item xs={12} sm={4}>
//                 <Card elevation={2}>
//                   <CardContent sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
//                     <Avatar sx={{ bgcolor: '#fff3cd', color: '#856404', width: 56, height: 56 }}>
//                       <AccessTimeIcon fontSize="large" />
//                     </Avatar>
//                     <Box>
//                       <Typography color="text.secondary" variant="body2">
//                         Pending
//                       </Typography>
//                       <Typography variant="h3" fontWeight="bold">
//                         {stats.pending}
//                       </Typography>
//                     </Box>
//                   </CardContent>
//                 </Card>
//               </Grid>
//               {/* Other cards for Approved and Rejected */}
//               <Grid item xs={12} sm={4}>
//                 <Card elevation={2}>
//                   <CardContent sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
//                     <Avatar sx={{ bgcolor: '#d4edda', color: '#155724', width: 56, height: 56 }}>
//                       <CheckCircleIcon fontSize="large" />
//                     </Avatar>
//                     <Box>
//                       <Typography color="text.secondary" variant="body2">
//                         Approved
//                       </Typography>
//                       <Typography variant="h3" fontWeight="bold">
//                         {stats.approved}
//                       </Typography>
//                     </Box>
//                   </CardContent>
//                 </Card>
//               </Grid>
//               {/* Rejected */}
//               <Grid item xs={12} sm={4}>
//                 <Card elevation={2}>
//                   <CardContent sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
//                     <Avatar sx={{ bgcolor: '#f8d7da', color: '#721c24', width: 56, height: 56 }}>
//                       <CancelIcon fontSize="large" />
//                     </Avatar>
//                     <Box>
//                       <Typography color="text.secondary" variant="body2">
//                         Rejected
//                       </Typography>
//                       <Typography variant="h3" fontWeight="bold">
//                         {stats.rejected}
//                       </Typography>
//                     </Box>
//                   </CardContent>
//                 </Card>
//               </Grid>
//             </Grid>

//             {/* Articles Table */}
//             <Card elevation={2}>
//               <CardContent>
//                 <Typography variant="h5" gutterBottom fontWeight="bold" sx={{ mb: 2 }}>
//                   All Articles
//                 </Typography>
//                 <TableContainer component={Paper} variant="outlined">
//                   <Table>
//                     <TableHead>
//                       <TableRow sx={{ backgroundColor: '#f5f5f5' }}>
//                         <TableCell><strong>Title</strong></TableCell>
//                         <TableCell><strong>Author</strong></TableCell>
//                         <TableCell><strong>ID</strong></TableCell>
//                         <TableCell><strong>Created</strong></TableCell>
//                         <TableCell><strong>Status</strong></TableCell>
//                         <TableCell align="center"><strong>Actions</strong></TableCell>
//                       </TableRow>
//                     </TableHead>
//                     <TableBody>
//                       {articles
//                         .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
//                         .map((article) => (
//                           <TableRow key={article.id} hover>
//                             <TableCell>{article.title}</TableCell>
//                             <TableCell>
//                               <Typography variant="body2">Author: {article.author}</Typography>
//                             </TableCell>
//                             <TableCell>
//                               <Typography variant="caption" color="text.secondary">
//                                 ID: {article.id}
//                               </Typography>
//                             </TableCell>
//                             <TableCell>
//                               <Typography variant="body2">Created:</Typography>
//                               <Typography variant="body2">{article.created}</Typography>
//                             </TableCell>
//                             <TableCell>
//                               <Chip
//                                 label={article.status}
//                                 color={
//                                   article.status === 'approved'
//                                     ? 'success'
//                                     : article.status === 'rejected'
//                                     ? 'error'
//                                     : 'warning'
//                                 }
//                                 size="small"
//                               />
//                             </TableCell>
//                             <TableCell>
//                               <Box sx={{ display: 'flex', gap: 1, flexWrap: 'wrap', justifyContent: 'center' }}>
//                                 <Button
//                                   variant="contained"
//                                   color="success"
//                                   size="small"
//                                   disabled={article.status !== 'pending'}
//                                   onClick={() => handleApprove(article.id)}
//                                 >
//                                   Approve
//                                 </Button>
//                                 <Button
//                                   variant="contained"
//                                   color="error"
//                                   size="small"
//                                   disabled={article.status !== 'pending'}
//                                   onClick={() => handleReject(article.id)}
//                                 >
//                                   Reject
//                                 </Button>
//                                 <Button
//                                   variant="outlined"
//                                   size="small"
//                                   startIcon={<CloudDownloadIcon />}
//                                 >
//                                   Download DOCX
//                                 </Button>
//                                 <Button
//                                   variant="outlined"
//                                   size="small"
//                                   startIcon={<VisibilityIcon />}
//                                 >
//                                   View Payment
//                                 </Button>
//                               </Box>
//                             </TableCell>
//                           </TableRow>
//                         ))}
//                     </TableBody>
//                   </Table>
//                 </TableContainer>
//                 <TablePagination
//                   rowsPerPageOptions={[5, 10, 25]}
//                   component="div"
//                   count={articles.length}
//                   rowsPerPage={rowsPerPage}
//                   page={page}
//                   onPageChange={handleChangePage}
//                   onRowsPerPageChange={handleChangeRowsPerPage}
//                 />
//               </CardContent>
//             </Card>
//           </Container>
//         )}

//     {selectedMenu === 'editorial' && (
//       <Container maxWidth="xl">
//         <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 3 }}>
//           <Typography variant="h4" fontWeight="bold">
//             Editorial Members
//           </Typography>
//           <Button
//             variant="contained"
//             startIcon={<AddIcon />}
//             onClick={handleOpenDialog}
//             size="large"
//           >
//             Add New Member
//           </Button>
//         </Box>

//         <Card elevation={2}>
//           <CardContent>
//             <Typography variant="h6" gutterBottom>
//               Current Editorial Board Members
//             </Typography>
//             <Typography color="text.secondary">
//               Manage your editorial team members here. Add new members or edit existing profiles.
//             </Typography>
//           </CardContent>
//         </Card>

//         {/* Add Editorial Member Dialog */}
//         <Dialog open={openDialog} onClose={handleCloseDialog} maxWidth="sm" fullWidth>
//           <DialogTitle>Add Editorial Member</DialogTitle>
//           <DialogContent>
//             <TextField
//               autoFocus
//               margin="dense"
//               name="name"
//               label="Full Name"
//               type="text"
//               fullWidth
//               variant="outlined"
//               value={editorialMember.name}
//               onChange={handleInputChange}
//             />
//             <TextField
//               margin="dense"
//               name="profession"
//               label="Profession/Title"
//               type="text"
//               fullWidth
//               variant="outlined"
//               value={editorialMember.profession}
//               onChange={handleInputChange}
//             />
//             <TextField
//               margin="dense"
//               name="email"
//               label="Email Address"
//               type="email"
//               fullWidth
//               variant="outlined"
//               value={editorialMember.email}
//               onChange={handleInputChange}
//             />
//             <TextField
//               margin="dense"
//               name="phone"
//               label="Phone Number"
//               type="tel"
//               fullWidth
//               variant="outlined"
//               value={editorialMember.phone}
//               onChange={handleInputChange}
//             />
//             {/* Profile Photo Upload */}
//             <Button
//               variant="outlined"
//               component="label"
//               sx={{ mt: 2 }}
//             >
//               Upload Profile Photo
//               <input
//                 type="file"
//                 accept="image/*"
//                 hidden
//                 onChange={(e) => {
//                   if (e.target.files && e.target.files[0]) {
//                     setEditorialMember({
//                       ...editorialMember,
//                       profilePhoto: e.target.files[0],
//                     });
//                   }
//                 }}
//               />
//             </Button>
//             {/* Show selected file name */}
//             {editorialMember.profilePhoto && (
//               <Typography variant="body2" sx={{ mt: 1 }}>
//                 Selected file: {editorialMember.profilePhoto.name}
//               </Typography>
//             )}
//           </DialogContent>
//           <DialogActions>
//             <Button onClick={handleCloseDialog}>Cancel</Button>
//             <Button onClick={handleSubmitMember} variant="contained">
//               Add Member
//             </Button>
//           </DialogActions>
//         </Dialog>
//       </Container>
//     )}
//   </Box>
// </Box>
//   );
// }

// export default AdminDashboard;
import React, { useState, useEffect, useRef } from 'react';
import {
  Box, Drawer, AppBar, Toolbar, List, Typography, Divider, IconButton,
  ListItem, ListItemButton, ListItemIcon, ListItemText, Card, CardContent,
  Grid, Button, Chip, Table, TableBody, TableCell, TableContainer,
  TableHead, TableRow, Paper, TablePagination, Avatar, TextField, Dialog,
  DialogTitle, DialogContent, DialogActions, Container, CircularProgress,
} from '@mui/material';
import {
  Menu as MenuIcon,
  Article as ArticleIcon,
  People as PeopleIcon,
  CheckCircle as CheckCircleIcon,
  Cancel as CancelIcon,
  AccessTime as AccessTimeIcon,
  CloudDownload as CloudDownloadIcon,
  Visibility as VisibilityIcon,
  Add as AddIcon,
} from '@mui/icons-material';
import { useNavigate } from 'react-router-dom';

const drawerWidth = 260;

function AdminDashboard() {
  const navigate = useNavigate();
  const [mobileOpen, setMobileOpen] = useState(false);
  const [selectedMenu, setSelectedMenu] = useState('articles');
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(5);
  const [openDialog, setOpenDialog] = useState(false);
  const [articles, setArticles] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const [editorialMember, setEditorialMember] = useState({
    name: '',
    profession: '',
    email: '',
    phone: '',
    bio: '',
    profilePhoto: null,
  });
  const didFetch = useRef(false);
  const getAllArticles = async () => {
    try {
      setLoading(true);
      setError('');
      const response = await fetch('https://roots-back-td3h.vercel.app/api/admin/approve');
      const data = await response.json();

      if (response.ok && data.articles) {
        setArticles(data.articles);
      } else {
        console.error('Failed to fetch articles:', data.error);
        setError(data.error || 'Failed to load articles');
      }
    } catch (err) {
      console.error('Error fetching articles:', err);
      setError('Network error. Please try again later.');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (!didFetch.current) {
      getAllArticles();
      didFetch.current = true;
    }
  }, []);
  const stats = {
    pending: articles.filter(a => a.status === 'pending').length,
    approved: articles.filter(a => a.status === 'approved').length,
    rejected: articles.filter(a => a.status === 'rejected').length,
  };
  const handleDrawerToggle = () => setMobileOpen(!mobileOpen);
  const handleChangePage = (_, newPage) => setPage(newPage);
  const handleChangeRowsPerPage = (e) => {
    setRowsPerPage(parseInt(e.target.value, 10));
    setPage(0);
  };
  const handleLogout = () => navigate('/login');

  const handleOpenDialog = () => setOpenDialog(true);
  const handleCloseDialog = () => {
    setOpenDialog(false);
    setEditorialMember({
      name: '', profession: '', email: '', phone: '', bio: '', profilePhoto: null,
    });
  };
  const handleInputChange = (e) => {
    setEditorialMember({ ...editorialMember, [e.target.name]: e.target.value });
  };
const handleSubmitMember = async () => {
  try {
    let uploadedPhotoUrl = "";

    if (editorialMember.profilePhoto) {
      const photoFormData = new FormData();
      photoFormData.append("photo", editorialMember.profilePhoto);

      const uploadResponse = await fetch("https://roots-back-td3h.vercel.app/api/editorial-board/upload", {
        method: "POST",
        body: photoFormData,
      });

      const uploadData = await uploadResponse.json();

      if (!uploadResponse.ok || !uploadData.success) {
        alert("Photo upload failed. Please try again.");
        return;
      }

      uploadedPhotoUrl = uploadData.photo_url;
    }

    const memberData = {
      name: editorialMember.name,
      phone_number: editorialMember.phone,
      email: editorialMember.email,
      title: editorialMember.profession,
      affiliation: editorialMember.profession, 
      photo_url: uploadedPhotoUrl || "",
      bio: editorialMember.bio || "",
    };

    const response = await fetch("https://roots-back-td3h.vercel.app/api/editorial-board", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(memberData),
    });

    const data = await response.json();

    if (response.ok) {
      alert("Member added successfully!");
      console.log("Response:", data);
      handleCloseDialog();
    } else {
      alert(`Failed to add member: ${data.error || "Unknown error"}`);
      console.error("Error response:", data);
    }
  } catch (error) {
    console.error("Error:", error);
    alert("Something went wrong. Please try again later.");
  }
};


  const updateArticleStatus = async (articleId, status) => {
    try {
      const response = await fetch('https://roots-back-td3h.vercel.app/api/admin/approve', {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ id: articleId, status }),
      });

      const data = await response.json();

      if (response.ok) {
        console.log('Status updated:', data.article);
        setArticles(prev =>
          prev.map(a => (a.id === articleId ? { ...a, status: data.article.status } : a))
        );
      } else {
        console.error('Update failed:', data.error);
        alert(data.error || 'Failed to update article status');
      }
    } catch (err) {
      console.error('Network error:', err);
      alert('Network error. Please try again.');
    }
  };
  const handleApprove = (articleId) => updateArticleStatus(articleId, 'approved');

  const handleReject = (articleId) => updateArticleStatus(articleId, 'rejected');

  const drawer = (
    <Box>
      <Toolbar sx={{ backgroundColor: '#2c5530', color: 'white' }}>
        <Typography variant="h6" fontWeight="bold">Admin Panel</Typography>
      </Toolbar>
      <Divider />
      <List sx={{ pt: 2 }}>
        {[
          { id: 'articles', label: 'Articles Management', icon: <ArticleIcon /> },
          { id: 'editorial', label: 'Editorial Members', icon: <PeopleIcon /> },
        ].map((item) => (
          <ListItem disablePadding key={item.id}>
            <ListItemButton
              selected={selectedMenu === item.id}
              onClick={() => setSelectedMenu(item.id)}
              sx={{
                mx: 1,
                borderRadius: 1,
                '&.Mui-selected': {
                  backgroundColor: '#2c5530',
                  color: 'white',
                  '&:hover': { backgroundColor: '#2c5530' },
                },
              }}
            >
              <ListItemIcon sx={{ color: selectedMenu === item.id ? 'white' : 'inherit' }}>
                {item.icon}
              </ListItemIcon>
              <ListItemText primary={item.label} />
            </ListItemButton>
          </ListItem>
        ))}
      </List>
    </Box>
  );

  return (
    <Box sx={{ display: 'flex' }}>
      <AppBar
        position="fixed"
        sx={{
          width: { sm: `calc(100% - ${drawerWidth}px)` },
          ml: { sm: `${drawerWidth}px` },
          background: '#2c5530',
        }}
      >
        <Toolbar>
          <IconButton
            color="inherit"
            edge="start"
            onClick={handleDrawerToggle}
            sx={{ mr: 2, display: { sm: 'none' } }}
          >
            <MenuIcon />
          </IconButton>
          <Typography variant="h6" sx={{ flexGrow: 1 }}>
            {selectedMenu === 'articles' ? 'Articles Dashboard' : 'Editorial Members'}
          </Typography>
          <Button color="inherit" variant="outlined" onClick={handleLogout}>Logout</Button>
        </Toolbar>
      </AppBar>
      <Box component="nav" sx={{ width: { sm: drawerWidth }, flexShrink: { sm: 0 } }}>
        <Drawer
          variant="temporary"
          open={mobileOpen}
          onClose={handleDrawerToggle}
          ModalProps={{ keepMounted: true }}
          sx={{
            display: { xs: 'block', sm: 'none' },
            '& .MuiDrawer-paper': { boxSizing: 'border-box', width: drawerWidth },
          }}
        >
          {drawer}
        </Drawer>
        <Drawer
          variant="permanent"
          sx={{
            display: { xs: 'none', sm: 'block' },
            '& .MuiDrawer-paper': { boxSizing: 'border-box', width: drawerWidth },
          }}
          open
        >
          {drawer}
        </Drawer>
      </Box>
      <Box
        component="main"
        sx={{
          flexGrow: 1,
          p: 3,
          width: { sm: `calc(100% - ${drawerWidth}px)` },
          backgroundColor: '#f5f5f5',
          minHeight: '100vh',
        }}
      >
        <Toolbar />
        {selectedMenu === 'articles' && (
          <Container maxWidth="xl">
            {loading ? (
              <Box display="flex" justifyContent="center" alignItems="center" height="50vh">
                <CircularProgress />
              </Box>
            ) : error ? (
              <Typography color="error" align="center">{error}</Typography>
            ) : (
              <>
                <Grid container spacing={3} sx={{ mb: 4 }}>
                  {[
                    { label: 'Pending', count: stats.pending, icon: <AccessTimeIcon />, color: '#fff3cd', textColor: '#856404' },
                    { label: 'Approved', count: stats.approved, icon: <CheckCircleIcon />, color: '#d4edda', textColor: '#155724' },
                    { label: 'Rejected', count: stats.rejected, icon: <CancelIcon />, color: '#f8d7da', textColor: '#721c24' },
                  ].map((s) => (
                    <Grid item xs={12} sm={4} key={s.label}>
                      <Card elevation={2}>
                        <CardContent sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
                          <Avatar sx={{ bgcolor: s.color, color: s.textColor, width: 56, height: 56 }}>
                            {s.icon}
                          </Avatar>
                          <Box>
                            <Typography color="text.secondary" variant="body2">{s.label}</Typography>
                            <Typography variant="h3" fontWeight="bold">{s.count}</Typography>
                          </Box>
                        </CardContent>
                      </Card>
                    </Grid>
                  ))}
                </Grid>
                <Card elevation={2}>
                  <CardContent>
                    <Typography variant="h5" gutterBottom fontWeight="bold">All Articles</Typography>
                    <TableContainer component={Paper} variant="outlined">
                      <Table>
                        <TableHead>
                          <TableRow sx={{ backgroundColor: '#f5f5f5' }}>
                            <TableCell><strong>Title</strong></TableCell>
                            <TableCell><strong>Author</strong></TableCell>
                            <TableCell><strong>Created</strong></TableCell>
                            <TableCell><strong>Status</strong></TableCell>
                            <TableCell align="center"><strong>Actions</strong></TableCell>
                          </TableRow>
                        </TableHead>
                        <TableBody>
                          {articles
                            .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                            .map((article) => (
                              <TableRow key={article.id} hover>
                                <TableCell>{article.title}</TableCell>
                                <TableCell>{article.author_name}</TableCell>
                                <TableCell>{new Date(article.created_at).toLocaleDateString()}</TableCell>
                                <TableCell>
                                  <Chip
                                    label={article.status}
                                    color={
                                      article.status === 'approved'
                                        ? 'success'
                                        : article.status === 'rejected'
                                          ? 'error'
                                          : 'warning'
                                    }
                                    size="small"
                                  />
                                </TableCell>
                                <TableCell align="center">
                                  <Box sx={{ display: 'flex', gap: 1, justifyContent: 'center', flexWrap: 'wrap' }}>
                                    <Button
                                      variant="contained"
                                      color="success"
                                      size="small"
                                      disabled={article.status !== 'pending'}
                                      onClick={() => handleApprove(article.id)}
                                    >
                                      Approve
                                    </Button>
                                    <Button
                                      variant="contained"
                                      color="error"
                                      size="small"
                                      disabled={article.status !== 'pending'}
                                      onClick={() => handleReject(article.id)}
                                    >
                                      Reject
                                    </Button>
                                    <Button
                                      variant="outlined"
                                      size="small"
                                      startIcon={<CloudDownloadIcon />}
                                      href={article.docx_url}
                                      target="_blank"
                                    >
                                      Download DOCX
                                    </Button>
                                    <Button
                                      variant="outlined"
                                      size="small"
                                      startIcon={<VisibilityIcon />}
                                      href={article.payment_screenshot_url}
                                      target="_blank"
                                    >
                                      View Payment
                                    </Button>
                                  </Box>
                                </TableCell>
                              </TableRow>
                            ))}
                        </TableBody>
                      </Table>
                    </TableContainer>

                    <TablePagination
                      rowsPerPageOptions={[5, 10, 25]}
                      component="div"
                      count={articles.length}
                      rowsPerPage={rowsPerPage}
                      page={page}
                      onPageChange={handleChangePage}
                      onRowsPerPageChange={handleChangeRowsPerPage}
                    />
                  </CardContent>
                </Card>
              </>
            )}
          </Container>
        )}
        {selectedMenu === 'editorial' && (
          <Container maxWidth="xl">
            <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 3 }}>
              <Typography variant="h4" fontWeight="bold">
                Editorial Members
              </Typography>
              <Button
                variant="contained"
                startIcon={<AddIcon />}
                onClick={handleOpenDialog}
                size="large"
              >
                Add New Member
              </Button>
            </Box>

            <Card elevation={2}>
              <CardContent>
                <Typography variant="h6" gutterBottom>
                  Current Editorial Board Members
                </Typography>
                <Typography color="text.secondary">
                  Manage your editorial team members here. Add new members or edit existing profiles.
                </Typography>
              </CardContent>
            </Card>
            <Dialog open={openDialog} onClose={handleCloseDialog} maxWidth="sm" fullWidth>
              <DialogTitle>Add Editorial Member</DialogTitle>
              <DialogContent>
                <TextField
                  autoFocus
                  margin="dense"
                  name="name"
                  label="Full Name"
                  type="text"
                  fullWidth
                  variant="outlined"
                  value={editorialMember.name}
                  onChange={handleInputChange}
                />
                <TextField
                  margin="dense"
                  name="profession"
                  label="Profession/Title"
                  type="text"
                  fullWidth
                  variant="outlined"
                  value={editorialMember.profession}
                  onChange={handleInputChange}
                />
                <TextField
                  margin="dense"
                  name="email"
                  label="Email Address"
                  type="email"
                  fullWidth
                  variant="outlined"
                  value={editorialMember.email}
                  onChange={handleInputChange}
                />
                <TextField
                  margin="dense"
                  name="phone"
                  label="Phone Number"
                  type="tel"
                  fullWidth
                  variant="outlined"
                  value={editorialMember.phone}
                  onChange={handleInputChange}
                />
                <TextField
                  margin="dense"
                  name="bio"
                  label="Short Bio"
                  type="text"
                  multiline
                  rows={3}
                  fullWidth
                  variant="outlined"
                  value={editorialMember.bio}
                  onChange={handleInputChange}
                />

                <Button
                  variant="outlined"
                  component="label"
                  sx={{ mt: 2 }}
                >
                  Upload Profile Photo
                  <input
                    type="file"
                    accept="image/*"
                    hidden
                    onChange={(e) => {
                      if (e.target.files && e.target.files[0]) {
                        setEditorialMember({
                          ...editorialMember,
                          profilePhoto: e.target.files[0],
                        });
                      }
                    }}
                  />
                </Button>
                {editorialMember.profilePhoto && (
                  <Typography variant="body2" sx={{ mt: 1 }}>
                    Selected file: {editorialMember.profilePhoto.name}
                  </Typography>
                )}
              </DialogContent>
              <DialogActions>
                <Button onClick={handleCloseDialog}>Cancel</Button>
                <Button onClick={handleSubmitMember} variant="contained">
                  Add Member
                </Button>
              </DialogActions>
            </Dialog>
          </Container>
        )}
      </Box>
    </Box>
  );
}

export default AdminDashboard;
