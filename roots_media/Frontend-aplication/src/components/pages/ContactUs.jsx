import React, { useState } from "react";
import {
  Box,
  Typography,
  TextField,
  Button,
  Card,
  CardContent,
  IconButton,
  Container,
  Snackbar,
  Alert,
} from "@mui/material";
import {
  Email,
  Phone,
  LocationOn,
  Facebook,
  Twitter,
  LinkedIn,
  Instagram,
} from "@mui/icons-material";
import contact_us from "../../assets/contact-us.png";
import MainLayout from "../templates/MainLayout";

function ContactUs() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    message: "",
  });
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [snackbar, setSnackbar] = useState({ open: false, message: "", severity: "" });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await fetch("https://roots-back-td3h.vercel.app/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });

      if (response.ok) {
        setIsSubmitted(true);
        setFormData({ name: "", email: "", message: "" });
        setTimeout(() => setIsSubmitted(false), 3000);
        setSnackbar({ open: true, message: "Message sent successfully!", severity: "success" });
      } else {
        console.error("Failed to send message");
      }
    } catch (error) {
      console.error("Error submitting contact form:", error);
    }
  };


  return (
    <MainLayout withSidebar>
      <Container maxWidth="lg">
        {/* Title */}
        <Typography
          variant="h4"
          sx={{
            textAlign: "center",
            mb: 2,
            fontWeight: "bold",
            background: "linear-gradient(135deg, #2e4638, #1f3127)",
            WebkitBackgroundClip: "text",
            WebkitTextFillColor: "transparent",
          }}
        >
          Contact Us
        </Typography>
        <Typography
          variant="body1"
          sx={{
            mb: 4,
            textAlign: "center",
            color: "#2e4638",
            maxWidth: "600px",
            mx: "auto",
          }}
        >
          We'd love to hear from you! Whether you have a question, need support, or simply want to share your thoughts, we are here and ready to help.
        </Typography>
        {/* Main Layout */}
        <Box
          sx={{
            display: "flex",
            flexDirection: { xs: "column", md: "row" },
            gap: 6,
            alignItems: "center",
            mb: 6,
          }}
        >
          <Box
            sx={{
              flex: 1,
              display: "flex",
              justifyContent: "center",
            }}
          >
            <img
              src={contact_us}
              alt="Contact Us"
              style={{
                width: "100%",
                maxWidth: "450px",
                borderRadius: "16px",
                boxShadow: "0px 10px 30px rgba(0,0,0,0.15)",
              }}
            />
          </Box>

          {/* Right Side Form */}
          <Card
            sx={{
              flex: 1,
              p: 2,
              borderRadius: 4,
              boxShadow: "0 8px 24px rgba(46, 70, 56, 0.08)",
            }}
          >
            <Typography
              variant="h5"
              sx={{ mb: 3, fontWeight: "bold", color: "#2e4638" }}
            >
              Send us a Message
            </Typography>
            <Box component="form" onSubmit={handleSubmit}>
              <TextField
                fullWidth
                label="Your Name"
                name="name"
                value={formData.name}
                onChange={handleChange}
                required
                variant="outlined"
                sx={{ mb: 2 }}
              />
              <TextField
                fullWidth
                label="Email Address"
                name="email"
                type="email"
                value={formData.email}
                onChange={handleChange}
                required
                variant="outlined"
                sx={{ mb: 2 }}
              />
              <TextField
                fullWidth
                label="Your Message"
                name="message"
                value={formData.message}
                onChange={handleChange}
                required
                multiline
                rows={4}
                variant="outlined"
                sx={{ mb: 1 }}
              />
              <div style={{ display: "flex", justifyContent: "end" }}><Button
                type="submit"
                variant="contained"
                sx={{
                  textTransform: "none",
                  fontWeight: "bold",
                  borderRadius: 2,
                  background: "linear-gradient(135deg, #2e4638, #1f3127)",
                  color: "white",
                  maxWidth: "fit-content",

                }}
              >
                {isSubmitted ? "Message Sent!" : "Submit"}
              </Button></div>
            </Box>
          </Card>
        </Box>
        <Box
          sx={{
            display: "grid",
            gridTemplateColumns: { xs: "1fr", md: "repeat(3, 1fr)" },
            gap: 3,
            mb: 4,
          }}
        >
          <Card
            sx={{
              p: 3,
              borderRadius: 4,
              textAlign: "center",
              boxShadow: "0 8px 24px rgba(46, 70, 56, 0.08)",
            }}
          >
            <CardContent>
              <Box sx={{ color: "#c3a36b", mb: 1 }}>
                <Email fontSize="large" />
              </Box>
              <Typography
                variant="h6"
                sx={{ fontWeight: "bold", mb: 1, color: "#2e4638" }}
              >
                Email Us
              </Typography>
              <Typography variant="body2" sx={{ color: "#666" }}>
                rootsmedia.publications@gmail.com
              </Typography>
            </CardContent>
          </Card>
          {[
            {
              name: "Shaik Allamalik Ansari",
              title: "Founder",
              phone: "+91 6305807610",
              email: "Shaikansari1999@gmail.com",
              emailHref: "mailto:Shaikansari1999@gmail.com",
              phoneHref: "tel:+916305807610",
            },
            {
              name: "Garlapati Arun",
              title: "Co - Founder",
              phone: "+91 6302 286 595",
              email: "arungarlapati.126@gmail.com",
              emailHref: "mailto:arungarlapati.126@gmail.com",
              phoneHref: "tel:+916302286595",
            },
          ].map((person, i) => (
            <Card
              key={i}
              sx={{
                p: 3,
                borderRadius: 4,
                textAlign: "center",
                boxShadow: "0 8px 24px rgba(46, 70, 56, 0.08)",
              }}
            >
              <CardContent>
                <Typography variant="h6" sx={{  fontWeight: "bold" }}>
                  {person.name}
                </Typography>
                <Typography variant="body1" sx={{ mb: 1 }}>
                  {person.title}
                </Typography>
                <Box sx={{ display: "flex", alignItems: "center", mb: 1 }}>
                  <Phone sx={{ mr: 1 }} />
                  <Typography variant="body2">
                    <a
                      href={person.phoneHref}
                      style={{ textDecoration: "none", color: "inherit" }}
                    >
                      {person.phone}
                    </a>
                  </Typography>
                </Box>
                <Box sx={{ display: "flex", alignItems: "center" }}>
                  <Email sx={{ mr: 1 }} />
                  <Typography variant="body2">
                    <a
                      href={person.emailHref}
                      style={{ textDecoration: "none", color: "inherit" }}
                    >
                      {person.email}
                    </a>
                  </Typography>
                </Box>
              </CardContent>
            </Card>
          ))}
        </Box>

        {/* Social Media */}
        {/* Optional: uncomment and customize if needed */}
        {/* <Box sx={{ textAlign: "center" }}>
          <Typography
            variant="h6"
            sx={{ fontWeight: "bold", mb: 2, color: "#2e4638" }}
          >
            Follow Us
          </Typography>
          <Box sx={{ display: "flex", justifyContent: "center", gap: 2 }}>
            {[Facebook, Twitter, LinkedIn, Instagram].map((Icon, i) => (
              <IconButton
                key={i}
                sx={{
                  color: "#2e4638",
                  backgroundColor: "rgba(46, 70, 56, 0.1)",
                  transition: "all 0.3s",
                  "&:hover": {
                    backgroundColor: "#c3a36b",
                    color: "white",
                    transform: "scale(1.15)",
                  },
                }}
              >
                <Icon />
              </IconButton>
            ))}
          </Box>
        </Box> */}

        {/* New Section: Contact Persons Details */}
        {/* <Box
          sx={{
            mt: 8,
            mb: 4,
            display: "flex",
            flexDirection: { xs: "column", md: "row" },
            gap: 4,
            justifyContent: "center",
          }}
        >
          <Card
            sx={{
              maxWidth: 350,
              p: 2,
              borderRadius: 3,
              boxShadow: "0 4px 15px rgba(0,0,0,0.1)",
            }}
          >
            <CardContent>
              <Typography variant="h6" sx={{ mb: 1, fontWeight: "bold" }}>
                Shaik Allamalik Ansari
              </Typography>
              <Typography variant="body2" sx={{ mb: 1 }}>
                Founder and CEO <br />
                Editor in Chief
              </Typography>
              <Box sx={{ display: "flex", alignItems: "center", mb: 1 }}>
                <Email sx={{ mr: 1 }} />
                <Typography variant="body2">
                  <a
                    href="mailto:Shaikansari1999@gmail.com"
                    style={{ textDecoration: "none", color: "inherit" }}
                  >
                    Shaikansari1999@gmail.com
                  </a>
                </Typography>
              </Box>
              <Box sx={{ display: "flex", alignItems: "center" }}>
                <Phone sx={{ mr: 1 }} />
                <Typography variant="body2">
                  <a
                    href="tel:+916305807610"
                    style={{ textDecoration: "none", color: "inherit" }}
                  >
                    +91 6305807610
                  </a>
                </Typography>
              </Box>
            </CardContent>
          </Card>
          <Card
            sx={{
              maxWidth: 350,
              p: 2,
              borderRadius: 3,
              boxShadow: "0 4px 15px rgba(0,0,0,0.1)",
            }}
          >
            <CardContent>
              <Typography variant="h6" sx={{ mb: 1, fontWeight: "bold" }}>
                Garlapati Arun
              </Typography>
              <Typography variant="body2" sx={{ mb: 1 }}>
                Editor in Chief
              </Typography>
              <Box sx={{ display: "flex", alignItems: "center", mb: 1 }}>
                <Phone sx={{ mr: 1 }} />
                <Typography variant="body2">
                  <a
                    href="tel:+916302286595"
                    style={{ textDecoration: "none", color: "inherit" }}
                  >
                    +91 6302 286 595
                  </a>
                </Typography>
              </Box>
              <Box sx={{ display: "flex", alignItems: "center" }}>
                <Email sx={{ mr: 1 }} />
                <Typography variant="body2">
                  <a
                    href="mailto:arungarlapati.126@gmail.com"
                    style={{ textDecoration: "none", color: "inherit" }}
                  >
                    arungarlapati.126@gmail.com
                  </a>
                </Typography>
              </Box>
            </CardContent>
          </Card>
        </Box> */}
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

export default ContactUs;