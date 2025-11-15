import React, { useState } from "react";
import {
  Box,
  Button,
  Container,
  TextField,
  Typography,
  Paper,
  Alert,
  LinearProgress,
  Divider,
  Snackbar,
} from "@mui/material";
import CloudUploadIcon from "@mui/icons-material/CloudUpload";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";
import ErrorIcon from "@mui/icons-material/Error";
import MainLayout from "../templates/MainLayout";

function DocumentUpload() {
  const [formData, setFormData] = useState({
    title: "",
    authorName: "",
    email: "",
    mobileNumber: "",
    file: null,
    paymentScreenshot: null,
  });

  const [errors, setErrors] = useState({});
  const [successMsg, setSuccessMsg] = useState("");
  const [errorMsg, setErrorMsg] = useState("");
  const [loading, setLoading] = useState(false);
  const [dragActive, setDragActive] = useState({
    file: false,
    paymentScreenshot: false,
  });
  const [snackbar, setSnackbar] = useState({ open: false, message: "", severity: "" });
  const handleDrag = (e, type) => {
    e.preventDefault();
    e.stopPropagation();
    if (e.type === "dragenter" || e.type === "dragover") {
      setDragActive((prev) => ({ ...prev, [type]: true }));
    } else if (e.type === "dragleave") {
      setDragActive((prev) => ({ ...prev, [type]: false }));
    }
  };

  const handleDrop = (e, type) => {
    e.preventDefault();
    e.stopPropagation();
    setDragActive((prev) => ({ ...prev, [type]: false }));

    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      const file = e.dataTransfer.files[0];
      const fakeEvent = { target: { name: type, files: e.dataTransfer.files } };
      handleChange(fakeEvent);
    }
  };
  const handleChange = (e) => {
    const { name, value, files } = e.target;
    if (files) {
      const file = files[0];
      if (name === "file" && !/\.docx$/i.test(file.name)) {
        setErrors((prev) => ({
          ...prev,
          file: "Upload a valid Word document (.docx only)",
        }));
        return;
      } else if (
        name === "paymentScreenshot" &&
        !/\.(jpg|jpeg|png)$/i.test(file.name)
      ) {
        setErrors((prev) => ({
          ...prev,
          paymentScreenshot: "Upload a valid image (.jpg, .jpeg, or .png)",
        }));
        return;
      } else {
        setErrors((prev) => ({ ...prev, [name]: "" }));
      }
      setFormData((prev) => ({ ...prev, [name]: file }));
    } else {
      setFormData((prev) => ({ ...prev, [name]: value }));
      setErrors((prev) => ({ ...prev, [name]: "" }));
    }
  };
  const validateForm = () => {
    const newErrors = {};
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    const mobileRegex = /^[0-9]{10}$/;

    if (!formData.title.trim()) newErrors.title = "Title is required.";
    if (!formData.authorName.trim())
      newErrors.authorName = "Author name is required.";
    if (!emailRegex.test(formData.email))
      newErrors.email = "Enter a valid email address.";
    if (!mobileRegex.test(formData.mobileNumber))
      newErrors.mobileNumber = "Enter a valid 10-digit mobile number.";
    if (!formData.file)
      newErrors.file = "Please upload your article (.docx only).";
    if (!formData.paymentScreenshot)
      newErrors.paymentScreenshot = "Please upload the payment screenshot.";
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };
  const handleSubmit = async (e) => {
    e.preventDefault();

    setSuccessMsg("");
    setErrorMsg("");

    if (!validateForm()) return;

    setLoading(true);

    const data = new FormData();
    data.append("title", formData.title);
    data.append("authorName", formData.authorName);
    data.append("email", formData.email);
    data.append("mobileNumber", formData.mobileNumber);
    data.append("file", formData.file);

    if (formData.paymentScreenshot) {
      data.append("paymentScreenshot", formData.paymentScreenshot);
    }

    try {
      const response = await fetch("https://roots-back-td3h.vercel.app/api/upload", {
        method: "POST",
        body: data,
      });

      const text = await response.text();

      if (response.ok) {
        setSuccessMsg("Paper uploaded successfully!");
        setSnackbar({ open: true, message: "Upload successful!", severity: "success" });
        handleClear();
      } else {
        setErrorMsg("Upload failed. Please try again.");
        setSnackbar({ open: true, message: "Upload failed.", severity: "error" });
      }
    } catch (error) {
      setErrorMsg("Something went wrong. Please try again later.");
    } finally {
      setLoading(false);
    }
  };

  const handleClear = () => {
    setFormData({
      title: "",
      authorName: "",
      email: "",
      mobileNumber: "",
      file: null,
      paymentScreenshot: null,
    });
    setErrors({});
    setSuccessMsg("");
    setErrorMsg("");
  };

  const uploadBoxStyle = {
    p: 3,
    borderRadius: "16px",
    border: "2px dashed",
    textAlign: "center",
    transition: "all 0.3s ease",
    cursor: "pointer",
    backgroundColor: "#fafdfb",
    "&:hover": {
      backgroundColor: "#f0f7f3",
      transform: "translateY(-2px)",
      boxShadow: "0 8px 24px rgba(46,70,56,0.1)",
    },
  };
  return (
    <MainLayout>
      <Container maxWidth="md" sx={{ py: 4 }}>
        <Typography
          variant="h4"
          sx={{
            textAlign: "center",
            fontWeight: "bold",
            mb: 3,
            background: "linear-gradient(135deg, #2e4638, #1f3127)",
            WebkitBackgroundClip: "text",
            WebkitTextFillColor: "transparent",
          }}
        >
          Upload Article
        </Typography>

        <Paper
          elevation={0}
          sx={{
            p: 4,
            borderRadius: "24px",
            boxShadow: "0 10px 40px rgba(46,70,56,0.08)",
          }}
        >
          {loading && (
            <LinearProgress
              sx={{
                mb: 3,
                "& .MuiLinearProgress-bar": {
                  background: "linear-gradient(135deg, #2e4638, #1f3127)",
                },
              }}
            />
          )}
          {successMsg && (
            <Alert
              severity="success"
              icon={<CheckCircleIcon />}
              sx={{ mb: 2, borderRadius: "12px" }}
            >
              {successMsg}
            </Alert>
          )}
          {errorMsg && (
            <Alert
              severity="error"
              icon={<ErrorIcon />}
              sx={{ mb: 2, borderRadius: "12px" }}
            >
              {errorMsg}
            </Alert>
          )}

          <Box
            component="form"
            onSubmit={handleSubmit}
            sx={{ display: "flex", flexDirection: "column", gap: 3 }}
          >
            <TextField
              label={
                <span>
                  Paper Title <span style={{ color: "red" }}>*</span>
                </span>
              }
              name="title"
              fullWidth
              value={formData.title}
              onChange={handleChange}
              error={!!errors.title}
              helperText={errors.title}
            />
            <TextField
              label={
                <span>
                  Author Name <span style={{ color: "red" }}>*</span>
                </span>
              }
              name="authorName"
              fullWidth
              value={formData.authorName}
              onChange={handleChange}
              error={!!errors.authorName}
              helperText={errors.authorName}
            />
            <TextField
              label={
                <span>
                  Email Address <span style={{ color: "red" }}>*</span>
                </span>
              }
              name="email"
              type="email"
              fullWidth
              value={formData.email}
              onChange={handleChange}
              error={!!errors.email}
              helperText={errors.email}
            />
            <TextField
              label={
                <span>
                  Mobile Number <span style={{ color: "red" }}>*</span>
                </span>
              }
              name="mobileNumber"
              type="tel"
              fullWidth
              value={formData.mobileNumber}
              onChange={handleChange}
              error={!!errors.mobileNumber}
              helperText={errors.mobileNumber}
            />

            <Divider sx={{ my: 1 }} />
            <Box>
              <Typography
                variant="subtitle1"
                fontWeight="bold"
                color="#2e4638"
                mb={1}
              >
                Upload Article (.docx only)
                <span style={{ color: "red", marginLeft: 4 }}>*</span>
              </Typography>
              <Box
                sx={{
                  ...uploadBoxStyle,
                  borderColor: dragActive.file
                    ? "#2e4638"
                    : errors.file
                      ? "#d32f2f"
                      : "#c5d2ca",
                  backgroundColor: dragActive.file
                    ? "#f0f7f3"
                    : errors.file
                      ? "#ffebee"
                      : "#fafdfb",
                }}
                onDragEnter={(e) => handleDrag(e, "file")}
                onDragLeave={(e) => handleDrag(e, "file")}
                onDragOver={(e) => handleDrag(e, "file")}
                onDrop={(e) => handleDrop(e, "file")}
              >
                <input
                  type="file"
                  name="file"
                  hidden
                  accept=".docx"
                  onChange={handleChange}
                  id="file-input"
                />
                <label
                  htmlFor="file-input"
                  style={{ cursor: "pointer", display: "block" }}
                >
                  <CloudUploadIcon
                    sx={{
                      fontSize: 40,
                      color: errors.file ? "#d32f2f" : "#2e4638",
                    }}
                  />
                  <Typography sx={{ fontWeight: 600, mt: 1 }}>
                    {formData.file ? (
                      <>
                        <CheckCircleIcon sx={{ color: "#4caf50", mr: 1 }} />
                        {formData.file.name}
                      </>
                    ) : (
                      "Click to upload or drag & drop"
                    )}
                  </Typography>
                </label>
              </Box>
              {errors.file && (
                <Typography variant="caption" color="error">
                  {errors.file}
                </Typography>
              )}
            </Box>
            <Box>
              <Typography
                variant="subtitle1"
                fontWeight="bold"
                color="#2e4638"
                mb={1}
              >
                Upload Payment Screenshot (.jpg / .png)
                <span style={{ color: "red", marginLeft: 4 }}>*</span>
              </Typography>
              <Box
                sx={{
                  ...uploadBoxStyle,
                  borderColor: dragActive.paymentScreenshot
                    ? "#2e4638"
                    : errors.paymentScreenshot
                      ? "#d32f2f"
                      : "#c5d2ca",
                }}
                onDragEnter={(e) => handleDrag(e, "paymentScreenshot")}
                onDragLeave={(e) => handleDrag(e, "paymentScreenshot")}
                onDragOver={(e) => handleDrag(e, "paymentScreenshot")}
                onDrop={(e) => handleDrop(e, "paymentScreenshot")}
              >
                <input
                  type="file"
                  name="paymentScreenshot"
                  hidden
                  accept=".jpg,.jpeg,.png"
                  onChange={handleChange}
                  id="payment-input"
                />
                <label
                  htmlFor="payment-input"
                  style={{ cursor: "pointer", display: "block" }}
                >
                  <CloudUploadIcon
                    sx={{
                      fontSize: 40,
                      color: errors.file ? "#d32f2f" : "#2e4638",
                    }}
                  />
                  <Typography sx={{ fontWeight: 600, mt: 1 }}>
                    {formData.paymentScreenshot ? (
                      <>
                        <CheckCircleIcon sx={{ color: "#4caf50", mr: 1 }} />
                        {formData.paymentScreenshot.name}
                      </>
                    ) : (
                      "Click to upload or drag & drop"
                    )}
                  </Typography>
                </label>
              </Box>
            </Box>
            <Box sx={{ display: "flex", justifyContent: "center", gap: 2 }}>
              <Button
                type="submit"
                variant="contained"
                disabled={loading}
                sx={{
                  px: 4,
                  fontWeight: "bold",
                  borderRadius: "50px",
                  background: "linear-gradient(135deg, #2e4638, #1f3127)",
                  color: "#fff",
                  "&:hover": {
                    transform: "translateY(-2px)",
                    color: "#fff",
                  },
                }}
              >
                {loading ? "Uploading..." : "Submit"}
              </Button>
              <Button
                variant="outlined"
                onClick={handleClear}
                sx={{
                  px: 4,
                  borderRadius: "50px",
                  borderColor: "#2e4638",
                  color: "#2e4638",
                  "&:hover": { backgroundColor: "#f0f7f3" },
                }}
              >
                Clear All
              </Button>
            </Box>
          </Box>
        </Paper>
        <Snackbar
          open={snackbar.open}
          autoHideDuration={6000}
          onClose={() => setSnackbar({ ...snackbar, open: false })}
          anchorOrigin={{ vertical: "bottom", horizontal: "center" }}
        >
          <Alert
            onClose={() => setSnackbar({ ...snackbar, open: false })}
            severity={snackbar.severity}
            sx={{ width: "100%" }}
          >
            {snackbar.message}
          </Alert>
        </Snackbar>
      </Container>
    </MainLayout>
  );
}

export default DocumentUpload;