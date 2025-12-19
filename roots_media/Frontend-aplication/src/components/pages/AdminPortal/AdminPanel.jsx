import React, { useState, useEffect, useRef } from 'react';
import {
  Box, Drawer, AppBar, Toolbar, List, Typography, Divider, IconButton,
  ListItem, ListItemButton, ListItemIcon, ListItemText, Card, CardContent,
  Grid, Button, Chip, Table, TableBody, TableCell, TableContainer,
  TableHead, TableRow, Paper, TablePagination, Avatar, TextField, Dialog,
  DialogTitle, DialogContent, DialogActions, Container, CircularProgress,
  Tooltip,
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
  Edit,
  Delete,
  CloudUpload as CloudUploadIcon
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
  const [members, setMembers] = useState([]);
  const [isEditing, setIsEditing] = useState(false);
  const [editingMemberId, setEditingMemberId] = useState(null);
  const [volumeTitle, setVolumeTitle] = useState('');
  const [issueTitle, setIssueTitle] = useState('');
  const [magazinePDF, setMagazinePDF] = useState(null);
  const pdfInputRef = useRef(null);
  const [magazines, setMagazines] = useState([]);
  const [magazineLoading, setMagazineLoading] = useState(false);
  const [editingMagazineId, setEditingMagazineId] = useState(null);
  const fetchMagazines = async () => {
    try {
      setMagazineLoading(true);

      const response = await fetch("https://roots-back-td3h.vercel.app/api/articles");
      const data = await response.json();

      if (response.ok) {
        // Correct key is data.articles
        setMagazines(data.articles || []);
      }
    } catch (err) {
      console.error("Error fetching magazines:", err);
    } finally {
      setMagazineLoading(false);
    }
  };

  useEffect(() => {
    if (selectedMenu === "magazineTable") fetchMagazines();
  }, [selectedMenu]);

  const deleteMagazine = async (id) => {
    if (!window.confirm("Delete this magazine?")) return;

    try {
      const res = await fetch(
        `https://roots-back-td3h.vercel.app/api/admin/articles/${id}`,
        { method: "DELETE" }
      );

      if (res.ok) {
        fetchMagazines();
      }
    } catch (err) {
      console.error("Delete error:", err);
    }
  };

  const editMagazine = (mag) => {
    setEditingMagazineId(mag.id);
    setVolumeTitle(mag.volume);
    setIssueTitle(mag.issue);
    setMagazinePDF(null);
    setSelectedMenu('magazine');
  };

  const [magazineErrors, setMagazineErrors] = useState({
    volume: "",
    issue: "",
    pdf: "",
  });


  const [editorialMember, setEditorialMember] = useState({
    name: '',
    profession: '',
    email: '',
    phone: '',
    bio: '',
    profilePhoto: null,
  });
  const [errors, setErrors] = useState({
    name: "",
    profession: "",
    profilePhoto: "",
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

  // const handleOpenDialog = () => setOpenDialog(true);
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
      const newErrors = { name: "", profession: "", profilePhoto: "" };
      let hasError = false;

      if (!editorialMember.name.trim()) {
        newErrors.name = "Name is required.";
        hasError = true;
      }
      if (!editorialMember.profession.trim()) {
        newErrors.profession = "Profession is required.";
        hasError = true;
      }
      if (!isEditing && !editorialMember.profilePhoto) {
        newErrors.profilePhoto = "Profile photo is required.";
        hasError = true;
      }

      setErrors(newErrors);

      if (hasError) return;
      let uploadedPhotoUrl = "";
      if (editorialMember.profilePhoto) {
        const photoFormData = new FormData();
        photoFormData.append("file", editorialMember.profilePhoto);

        const uploadResponse = await fetch("https://roots-back-td3h.vercel.app/api/editorial-board/upload", {
          method: "POST",
          body: photoFormData,
        });

        const uploadData = await uploadResponse.json();

        if (!uploadResponse.ok || !uploadData.success) {
          console.error("Photo upload failed.");
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

      let url = "https://roots-back-td3h.vercel.app/api/editorial-board";
      let method = "POST";
      if (isEditing && editingMemberId) {
        url = `https://roots-back-td3h.vercel.app/api/editorial-board/${editingMemberId}`;
        method = "PATCH";
      }

      const response = await fetch(url, {
        method,
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(memberData),
      });

      const data = await response.json();

      if (response.ok) {
        fetchMembers(); // refresh list
        handleCloseDialog();
      } else {
        console.error("Error:", data);
      }
    } catch (error) {
      console.error("Error:", error);
    }
  };

  const handleSubmitMazine = async () => {
    const newErrors = {
      volume: volumeTitle ? "" : "Volume Title is required.",
      issue: issueTitle ? "" : "Issue Title is required.",
      pdf: editingMagazineId ? "" : (magazinePDF ? "" : "PDF file is required."),
    };

    setMagazineErrors(newErrors);
    if (newErrors.volume || newErrors.issue || newErrors.pdf) return;

    try {
      const formData = new FormData();
      formData.append('volume', volumeTitle);
      formData.append('issue', issueTitle);
      if (magazinePDF) {
        formData.append('pdf', magazinePDF);
      }

      let url = 'https://roots-back-td3h.vercel.app/api/admin/publish';
      let method = 'POST';

      if (editingMagazineId) {
        url = `https://roots-back-td3h.vercel.app/api/admin/articles/${editingMagazineId}`;
        method = 'PATCH';
      }

      const response = await fetch(url, {
        method,
        body: formData,
      });

      const data = await response.json();

      if (response.ok && data.success) {
        setVolumeTitle('');
        setIssueTitle('');
        setMagazinePDF(null);
        setEditingMagazineId(null);
        handleClear();
        fetchMagazines();
        setSelectedMenu('magazineTable');
      } else {
        console.error('Error:', data);
      }
    } catch (error) {
      console.error('Error uploading magazine:', error);
    }
  };

  const fetchMembers = async () => {
    setLoading(true);
    try {
      const res = await fetch("https://roots-back-td3h.vercel.app/api/editorial-board");
      const data = await res.json();
      setMembers(data.members || []);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchMembers();
  }, []);
  const handleDelete = async (id) => {
    if (!window.confirm("Are you sure you want to delete this member?")) return;
    try {
      const res = await fetch(`https://roots-back-td3h.vercel.app/api/editorial-board/${id}`, {
        method: "DELETE",
      });
      const data = await res.json();
      if (res.ok) {
        fetchMembers();
      } else {
      }
    } catch (err) {
      console.error(err);
    }
  };

  const handleOpenDialog = () => {
    setIsEditing(false);
    setEditingMemberId(null);
    setOpenDialog(true);
    setEditorialMember({
      name: '',
      profession: '',
      email: '',
      phone: '',
      bio: '',
      profilePhoto: null,
    });
  };
const handleExcelDocs = async () => {
  try {
    const response = await fetch('https://roots-back-td3h.vercel.app/api/admin/export-excel');

    if (!response.ok) {
      throw new Error('Download failed');
    }

    const blob = await response.blob();

    const url = window.URL.createObjectURL(
      new Blob([blob], { type: 'text/csv' })
    );

    const a = document.createElement('a');
    a.href = url;
    a.download = 'excel-docs.csv'; 
    document.body.appendChild(a);
    a.click();
    a.remove();

    window.URL.revokeObjectURL(url);
  } catch (error) {
    console.error('CSV download failed:', error);
  }
};




  const handleEdit = (member) => {
    setIsEditing(true);
    setEditingMemberId(member.id);
    setOpenDialog(true);
    setEditorialMember({
      name: member.name || '',
      profession: member.title || member.affiliation || '',
      email: member.email || '',
      phone: member.phone_number || '',
      bio: member.bio || '',
      profilePhoto: null,
    });
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
    }
  };
  const handleClear = () => {
    setVolumeTitle("");
    setIssueTitle("");
    setMagazinePDF(null);
    setEditingMagazineId(null);

    setMagazineErrors({
      volume: "",
      issue: "",
      pdf: "",
    });
    if (pdfInputRef.current) {
      pdfInputRef.current.value = "";
    }
  };
const downloadFile = async (url) => {
  const res = await fetch(url);
  const blob = await res.blob();
  const link = document.createElement("a");
  link.href = window.URL.createObjectURL(blob);
  link.download = "article.docx";
  link.click();
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
          { id: 'magazine', label: 'Upload Magazine', icon: <CloudUploadIcon /> },
          { id: 'magazineTable', label: 'Magazines', icon: <ArticleIcon /> },
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
            {selectedMenu === 'articles'
              ? 'Articles Dashboard'
              : selectedMenu === 'editorial'
                ? 'Editorial Members'
                : 'Upload Magazine'}
          </Typography>
          <Button color="inherit" variant="outlined" onClick={handleLogout}>
            Logout
          </Button>
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
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}><Typography variant="h5" gutterBottom fontWeight="bold">All Articles</Typography>
                      <Button variant="contained"
                        color="success"
                        size="small"
                        onClick={() => handleExcelDocs()}
                        sx={{ textTransform: "none" }}>Download CSV File</Button></div>
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
                                <TableCell sx={{ padding: "8px" }}>{article.title}</TableCell>
                                <TableCell sx={{ padding: "8px" }}>{article.author_name}</TableCell>
                                <TableCell sx={{ padding: "8px" }}>{new Date(article.created_at).toLocaleDateString()}</TableCell>
                                <TableCell sx={{ padding: "8px" }}>
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
                                <TableCell align="center" sx={{ padding: "8px" }}>
                                  <Box sx={{ display: 'flex', gap: 1, justifyContent: 'center', flexWrap: 'wrap' }}>
                                    <Button
                                      variant="contained"
                                      color="success"
                                      size="small"
                                      disabled={article.status !== 'pending'}
                                      onClick={() => handleApprove(article.id)}
                                      sx={{ textTransform: "none" }}
                                    >
                                      Approve
                                    </Button>
                                    <Button
                                      variant="contained"
                                      color="error"
                                      size="small"
                                      disabled={article.status !== 'pending'}
                                      onClick={() => handleReject(article.id)}
                                      sx={{ textTransform: "none" }}
                                    >
                                      Reject
                                    </Button>
                                    <Button
                                      variant="outlined"
                                      size="small"
                                      startIcon={<CloudDownloadIcon />}
                                    onClick={() => downloadFile(article.docx_url)}
                                      sx={{ textTransform: "none" }}
                                    >
                                      Download DOCX
                                    </Button>
                                    <Tooltip title={!article.payment_screenshot_url ? "Screenshot not available" : ""}>
                                      <span>
                                        <Button
                                          variant="outlined"
                                          size="small"
                                          startIcon={<VisibilityIcon />}
                                          component="a"
                                          href={article.payment_screenshot_url || "#"}
                                          target="_blank"
                                          rel="noopener noreferrer"
                                          disabled={!article.payment_screenshot_url}
                                          sx={{ textTransform: "none" }}
                                        >
                                          {article.payment_screenshot_url ? "View Payment" : "Screenshot Missing"}
                                        </Button>
                                      </span>
                                    </Tooltip>
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
                <Box sx={{ mt: 4 }}>
                  <Typography variant="h6" sx={{ mb: 2 }}>
                    Editorial Board Members
                  </Typography>

                  {loading ? (
                    <Box sx={{ display: "flex", justifyContent: "center", py: 5 }}>
                      <CircularProgress />
                    </Box>
                  ) : (
                    <Grid container spacing={2}>
                      {members.map((member) => (
                        <Grid item xs={12} sm={6} md={4} key={member.id}>
                          <Card
                            sx={{
                              display: "flex",
                              alignItems: "center",
                              p: 2,
                              borderRadius: 2,
                              boxShadow: "0 2px 10px rgba(0,0,0,0.1)",
                            }}
                          >
                            <Avatar
                              src={member.photo_url || "/images/default-avatar.png"}
                              alt={member.name}
                              sx={{ width: 70, height: 70, mr: 2 }}
                            />
                            <CardContent sx={{ flex: 1, p: 0 }}>
                              <Typography variant="subtitle1" sx={{ fontWeight: 600 }}>
                                {member.name}
                              </Typography>
                              <Typography variant="body2" color="text.secondary">
                                {member.title || ""}
                              </Typography>
                              <Typography variant="body2" color="text.secondary">
                                {member.email}
                              </Typography>
                              <Box sx={{ display: "flex", mt: 1 }}>
                                <Tooltip title="Edit">
                                  <IconButton
                                    onClick={() => handleEdit(member)}
                                    size="small"
                                    color="primary"
                                  >
                                    <Edit fontSize="small" />
                                  </IconButton>
                                </Tooltip>
                                <Tooltip title="Delete">
                                  <IconButton
                                    onClick={() => handleDelete(member.id)}
                                    size="small"
                                    color="error"
                                  >
                                    <Delete fontSize="small" />
                                  </IconButton>
                                </Tooltip>
                              </Box>
                            </CardContent>
                          </Card>
                        </Grid>
                      ))}
                    </Grid>
                  )}
                </Box>
              </CardContent>
            </Card>
            <Dialog open={openDialog} onClose={handleCloseDialog} maxWidth="sm" fullWidth>
              <DialogTitle>{isEditing ? "Edit Editorial Member" : "Add Editorial Member"}</DialogTitle>
              <DialogContent>
                <TextField
                  label="Name"
                  margin='dense'
                  fullWidth
                  value={editorialMember.name}
                  onChange={(e) => setEditorialMember({ ...editorialMember, name: e.target.value })}
                  error={!!errors.name}
                  helperText={errors.name}
                />

                <TextField
                  label="Profession"
                  fullWidth
                  value={editorialMember.profession}
                  onChange={(e) => setEditorialMember({ ...editorialMember, profession: e.target.value })}
                  error={!!errors.profession}
                  helperText={errors.profession}
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
                >
                  Upload Profile Photo
                  <input
                    type="file"
                    hidden
                    accept="image/*"
                    onChange={(e) =>
                      setEditorialMember({ ...editorialMember, profilePhoto: e.target.files[0] })
                    }
                  />
                </Button>
                {errors.profilePhoto && (
                  <Typography color="error" variant="caption" sx={{ ml: 1 }}>
                    {errors.profilePhoto}
                  </Typography>
                )}

                {editorialMember.profilePhoto && (
                  <Typography variant="body2" sx={{ mt: 1 }}>
                    Selected file: {editorialMember.profilePhoto.name}
                  </Typography>
                )}
              </DialogContent>
              <DialogActions>
                <Button onClick={handleCloseDialog}>Cancel</Button>
                <Button onClick={handleSubmitMember} variant="contained">
                  {isEditing ? "Update Member" : "Add Member"}
                </Button>
              </DialogActions>
            </Dialog>
          </Container>
        )}
        {selectedMenu === 'magazine' && (
          <Container maxWidth="md">
            <Card elevation={2} sx={{ p: 3 }}>
              <Typography variant="h5" fontWeight="bold" gutterBottom>
                {editingMagazineId ? 'Edit Magazine' : 'Upload Magazine'}
              </Typography>
              <TextField
                margin="dense"
                fullWidth
                label="Volume Title"
                value={volumeTitle}
                onChange={(e) => { setVolumeTitle(e.target.value); setMagazineErrors(prev => ({ ...prev, volume: "" })); }}
                error={!!magazineErrors.volume}
                helperText={magazineErrors.volume}
              />

              <TextField
                margin="dense"
                fullWidth
                label="Issue Title"
                value={issueTitle}
                onChange={(e) => { setIssueTitle(e.target.value), setMagazineErrors(prev => ({ ...prev, issue: "" })); }}

                error={!!magazineErrors.issue}
                helperText={magazineErrors.issue}
              />

              <div style={{ display: "flex", flexDirection: "column", margin: "5px 0px" }}>
                <Button variant="outlined" component="label" sx={{ textTransform: "none", maxWidth: "120px" }}>
                  {editingMagazineId ? 'Update PDF' : 'Upload PDF'}
                  <input
                    margin="dense"
                    type="file"
                    hidden
                    ref={pdfInputRef}
                    accept="application/pdf"
                    onChange={(e) => {
                      setMagazinePDF(e.target.files[0]);
                      setMagazineErrors((prev) => ({ ...prev, pdf: "" }));
                    }}
                  />
                </Button>
                {magazineErrors.pdf && (
                  <Typography variant='caption' color="error" >
                    {magazineErrors.pdf}
                  </Typography>
                )}
              </div>

              <div style={{ display: "flex", justifyContent: "space-between", margin: "8px 0px" }}>
                <Button variant="contained"
                  sx={{ textTransform: "none" }}
                  onClick={handleClear}>Clear All</Button>
                <Button
                  variant="contained"
                  // fullWidth
                  sx={{ textTransform: "none" }}
                  onClick={handleSubmitMazine}
                >
                  {editingMagazineId ? 'Update Magazine' : 'Upload Magazine'}
                </Button>
              </div>
            </Card>
          </Container>
        )}
        {selectedMenu === "magazineTable" && (
          <Container maxWidth="xl">
            <Card elevation={2}>
              <CardContent>
                <Typography variant="h5" gutterBottom fontWeight="bold">
                  Magazines List
                </Typography>

                {magazineLoading ? (
                  <Box
                    display="flex"
                    justifyContent="center"
                    alignItems="center"
                    height="40vh"
                  >
                    <CircularProgress />
                  </Box>
                ) : (
                  <TableContainer component={Paper} variant="outlined">
                    <Table>
                      <TableHead>
                        <TableRow sx={{ backgroundColor: "#f5f5f5" }}>
                          <TableCell><strong>Magazine Name</strong></TableCell>
                          <TableCell><strong>Volume</strong></TableCell>
                          <TableCell><strong>Issue</strong></TableCell>
                          <TableCell align="center"><strong>Actions</strong></TableCell>
                        </TableRow>
                      </TableHead>

                      <TableBody>
                        {magazines.length === 0 ? (
                          <TableRow>
                            <TableCell colSpan={5} align="center">
                              No magazines found
                            </TableCell>
                          </TableRow>
                        ) : (
                          magazines.map((mag) => (
                            <TableRow key={mag.id} hover>
                              <TableCell sx={{ padding: "8px" }}>
                                {mag.magazine_name || "ROOTS Magazine"}
                              </TableCell>

                              <TableCell sx={{ padding: "8px" }}>{mag.volume}</TableCell>
                              <TableCell sx={{ padding: "8px" }}>{mag.issue}</TableCell>
                              <TableCell align="center" sx={{ padding: "8px" }}>
                                <Box
                                  sx={{
                                    display: "flex",
                                    gap: 1,
                                    justifyContent: "center",
                                    flexWrap: "wrap",
                                  }}
                                >
                                  <Tooltip title="Edit Magazine">
                                    <IconButton
                                      color="primary"
                                      onClick={() => editMagazine(mag)}
                                    >
                                      <Edit />
                                    </IconButton>
                                  </Tooltip>
                                  <Tooltip title="Delete Magazine">
                                    <IconButton
                                      color="error"
                                      onClick={() => deleteMagazine(mag.id)}
                                    >
                                      <Delete />
                                    </IconButton>
                                  </Tooltip>
                                  <Tooltip title="Download PDF">
                                    <IconButton
                                      color="success"
                                      href={mag.pdf_url}
                                      target="_blank"
                                    >
                                      <CloudDownloadIcon />
                                    </IconButton>
                                  </Tooltip>
                                </Box>
                              </TableCell>
                            </TableRow>
                          ))
                        )}
                      </TableBody>
                    </Table>
                  </TableContainer>
                )}
              </CardContent>
            </Card>
          </Container>
        )}
      </Box>
    </Box>
  );
}

export default AdminDashboard;