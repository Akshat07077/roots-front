import React, { useState, useEffect } from "react";
import MainLayout from "../templates/MainLayout";
import {
  Typography,
  Card,
  CardContent,
  CardMedia,
  Grid,
  Box,
  Chip,
  Container,
  Divider,
  Modal,
  IconButton,
  Button,
} from "@mui/material";
import { Link, useNavigate } from "react-router-dom";
import CloseIcon from "@mui/icons-material/Close";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, Pagination } from "swiper/modules";
import "swiper/css";
import "swiper/css/pagination";
import AboutUs from "./AboutUs";

const archiveData = {
  "September 2025": {
    file: "./Volume-05-Issue-09-September-2025.pdf",
    articles: 12,
  },
  "August 2025": {
    file: "./Volume-05-Issue-08-August-2025.pdf",
    articles: 15,
  },
  "July 2025": {
    file: "./Volume-05-Issue-07-July-2025.pdf",
    articles: 10,
  },
  "June 2025": {
    file: "./Volume-05-Issue-06-June-2025.pdf",
    articles: 14,
  },
  "May 2025": {
    file: "./Volume-05-Issue-05-May-2025.pdf",
    articles: 11,
  },
  "April 2025": {
    file: "./Volume-05-Issue-04-April-2025.pdf",
    articles: 13,
  },
  "March 2025": {
    file: "./Volume-05-Issue-03-March-2025.pdf",
    articles: 9,
  },
  "February 2025": {
    file: "./Volume-05-Issue-02-February-2025.pdf",
    articles: 16,
  },
  "January 2025": {
    file: "./Volume-05-Issue-01-January-2025.pdf",
    articles: 8,
  },
};

const SubmissionDeadlineModal = ({ open, handleClose }) => {
  const [timeLeft, setTimeLeft] = useState({
    days: 0,
    hours: 0,
    minutes: 0,
    seconds: 0,
  });

  const deadline = new Date("September 25, 2025 12:00:00");

  useEffect(() => {
    const timer = setInterval(() => {
      const now = new Date();
      const diff = deadline - now;

      if (diff <= 0) {
        clearInterval(timer);
        setTimeLeft({ days: 0, hours: 0, minutes: 0, seconds: 0 });
        return;
      }

      const days = Math.floor(diff / (1000 * 60 * 60 * 24));
      const hours = Math.floor((diff / (1000 * 60 * 60)) % 24);
      const minutes = Math.floor((diff / (1000 * 60)) % 60);
      const seconds = Math.floor((diff / 1000) % 60);

      setTimeLeft({ days, hours, minutes, seconds });
    }, 1000);

    return () => clearInterval(timer);
  }, [deadline]);

  return (
    <Modal open={open} onClose={handleClose}>
      <Box
        sx={{
          position: "absolute",
          top: "50%",
          left: "50%",
          transform: "translate(-50%, -50%)",
          bgcolor: "#27382e",
          color: "white",
          boxShadow: 24,
          borderRadius: 2,
          p: 4,
          maxWidth: 500,
          textAlign: "center",
        }}
      >
        <IconButton
          onClick={handleClose}
          sx={{ position: "absolute", top: 10, right: 10, color: "white" }}
        >
          <CloseIcon />
        </IconButton>

        <Typography variant="h5" fontWeight={700} sx={{ mb: 2 }}>
          Submission deadline for October 2025 issue
        </Typography>
        <Typography variant="body2" sx={{ mb: 2 }}>
          (Articles submitted after deadline won't be considered)
        </Typography>

        <Divider sx={{ borderColor: "rgba(255,255,255,0.3)", mb: 3 }} />

        {/* Countdown */}
        <Box sx={{ display: "flex", justifyContent: "center", gap: 3, mb: 3 }}>
          <Box>
            <Typography variant="h4">{timeLeft.days}</Typography>
            <Typography variant="caption">Days</Typography>
          </Box>
          <Box>
            <Typography variant="h4">{timeLeft.hours}</Typography>
            <Typography variant="caption">Hours</Typography>
          </Box>
          <Box>
            <Typography variant="h4">{timeLeft.minutes}</Typography>
            <Typography variant="caption">Minutes</Typography>
          </Box>
          <Box>
            <Typography variant="h4">{timeLeft.seconds}</Typography>
            <Typography variant="caption">Seconds</Typography>
          </Box>
        </Box>

        <Divider sx={{ borderColor: "rgba(255,255,255,0.3)", mb: 3 }} />

        {/* Instructions */}
        <Typography sx={{ mb: 2 }}>
          Submit your article to <br />
          <strong>agriindiatoday@gmail.com</strong>
        </Typography>

        {/* Download Button */}
        <Button
          variant="contained"
          color="secondary"
          href="./Volume-05-Issue-09-September-2025.pdf"
          target="_blank"
        >
          Download September 2025 Issue
        </Button>
      </Box>
    </Modal>
  );
};

const featuredArticles = [
  {
    id: 1,
    title: "Precision Agriculture: IoT-Based Smart Farming Solutions",
    author: "Dr. Rajesh Kumar",
    date: "Aug 20, 2025",
    uploadedDate: new Date("2025-08-20"),
    readTime: "12 min read",
    category: "Agricultural Engineering",
    image:
      "https://images.unsplash.com/photo-1625246333195-78d9c38ad449?w=1200&h=500&fit=crop",
  },
  {
    id: 2,
    title: "Climate-Resilient Horticulture: Drought-Tolerant Vegetables",
    author: "Prof. Sunita Sharma",
    date: "Aug 18, 2025",
    uploadedDate: new Date("2025-08-18"),
    readTime: "10 min read",
    category: "Horticulture",
    image:
      "https://images.unsplash.com/photo-1574323347407-f5e1ad6d020b?w=1200&h=500&fit=crop",
  },
  {
    id: 4,
    title: "Dairy Tech: Automated Milking Systems",
    author: "Dr. Priya Patel",
    date: "Aug 16, 2025",
    uploadedDate: new Date("2025-08-16"),
    readTime: "8 min read",
    category: "Dairy Technology",
    image:
      "https://images.unsplash.com/photo-1559827260-dc66d52bef19?w=1200&h=500&fit=crop",
  },
];

const getLastMonthArticles = (articles) => {
  const now = new Date();
  const oneMonthAgo = new Date(now.setMonth(now.getMonth() - 1));
  
  return articles
    .filter((article) => article.uploadedDate >= oneMonthAgo)
    .sort((a, b) => b.uploadedDate - a.uploadedDate);
};

export default function Home() {
  const [showModal, setShowModal] = useState(true);
  const [lastMonthArticles, setLastMonthArticles] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const dismissed = sessionStorage.getItem("modalDismissed");
    if (!dismissed) {
      setShowModal(true);
    }
    const filtered = getLastMonthArticles(featuredArticles);
    setLastMonthArticles(filtered);
  }, []);

  const handleCloseModal = () => {
    setShowModal(false);
    sessionStorage.setItem("modalDismissed", "true");
  };

  const handleArchiveClick = (month) => {
    const encodedMonth = month.replace(/\s+/g, "-");
    navigate(`/articles/${encodedMonth}`);
  };
useEffect(() => {
  const dismissed = sessionStorage.getItem("modalDismissed");
  if (!dismissed) {
    setShowModal(true);
  }
  const fetchArticles = async () => {
    try {
      const response = await fetch("http://192.168.1.10:3000/api/articles");
      const data = await response.json();

      if (data?.articles) {
        const approvedArticles = data.articles.filter(
          (a) => a.status === "approved"
        );
        const sortedArticles = approvedArticles.sort(
          (a, b) => new Date(b.created_at) - new Date(a.created_at)
        );

        setLastMonthArticles(sortedArticles);
      }
    } catch (error) {
      console.error("Error fetching articles:", error);
    }
  };

  fetchArticles();
}, []);


  return (
    <MainLayout withSidebar>
      <SubmissionDeadlineModal
        open={showModal}
        handleClose={handleCloseModal}
      />
      <Box>
        <Swiper
          modules={[Autoplay, Pagination]}
          autoplay={{ delay: 4000, disableOnInteraction: false }}
          pagination={{ clickable: true }}
          loop
          slidesPerView={1}
        >
          {featuredArticles.slice(0, 3).map((article) => (
            <SwiperSlide key={article.id}>
              <Card
                sx={{
                  borderRadius: 0,
                  overflow: "hidden",
                  position: "relative",
                  height: { xs: 300, md: 500 },
                }}
              >
                <CardMedia
                  component="img"
                  image={article.image}
                  alt={article.title}
                  sx={{ width: "100%", height: "100%", objectFit: "cover" }}
                />
              </Card>
            </SwiperSlide>
          ))}
        </Swiper>
      </Box>
      
      <Box
        sx={{
          background: "#2e4638",
          color: "white",
          fontWeight: "bold",
          fontSize: "1.1rem",
          py: 1,
          borderRadius: 1,
        }}
      >
        <marquee behavior="scroll" direction="left" scrollamount="6">
          🌱 Welcome to Roots Media — Empowering Agricultural Innovation 🌱
        </marquee>
      </Box>
      
    <Container maxWidth="xl" sx={{ py: 4 }}>
  <AboutUs />
  <Box sx={{ borderRadius: 2 }}>
    <Typography
      variant="h4"
      fontWeight={700}
      sx={{ mb: 4, color: "#2e4638", textAlign: "center" }}
    >
      Latest Articles
    </Typography>
    {lastMonthArticles.length === 0 ? (
      <Typography
        variant="body1"
        color="text.secondary"
        sx={{ textAlign: "center", py: 5 }}
      >
        No approved articles available at the moment.
      </Typography>
    ) : (
      <Grid container spacing={4}>
        {lastMonthArticles.slice(0, 5).map((article) => (
          <Grid item xs={12} sm={6} md={4} key={article.id}>
            <Card
              sx={{
                borderRadius: 3,
                boxShadow: "0 4px 15px rgba(0,0,0,0.08)",
                transition: "0.3s",
                cursor: "pointer",
                "&:hover": {
                  transform: "translateY(-6px)",
                  boxShadow: "0 8px 25px rgba(0,0,0,0.12)",
                },
              }}
            >
              <CardMedia
                component="img"
                height="180"
                image={
                  article.image_url ||
                  "https://via.placeholder.com/400x180?text=No+Image"
                }
                alt={article.title}
              />
              <CardContent>
                <Typography
                  variant="h6"
                  fontWeight={600}
                  sx={{ color: "#1a3a1e" }}
                >
                  {article.title}
                </Typography>
                <Typography variant="body2" color="text.secondary" sx={{ mt: 1 }}>
                  {article.author_name || "Unknown Author"}
                </Typography>
                <Typography
                  variant="caption"
                  color="text.secondary"
                  sx={{ display: "block", mt: 1 }}
                >
                  {new Date(article.created_at).toLocaleDateString()}
                </Typography>

                <Button
                  variant="outlined"
                  sx={{
                    mt: 2,
                    textTransform: "none",
                    color: "#2c5530",
                    borderColor: "#2c5530",
                    "&:hover": {
                      borderColor: "#1a3a1e",
                      bgcolor: "rgba(44,85,48,0.04)",
                    },
                  }}
                  component={Link}
                  to={`/article/${article.id}`}
                >
                  Read More
                </Button>
              </CardContent>
            </Card>
          </Grid>
        ))}
      </Grid>
    )}

    {/* ✅ View More button if more than 5 */}
    {lastMonthArticles.length > 5 && (
      <Box sx={{ mt: 6, textAlign: "center" }}>
        <Button
          variant="outlined"
          sx={{
            px: 4,
            py: 1.5,
            textTransform: "none",
            fontSize: "1rem",
            borderColor: "#2c5530",
            color: "#2c5530",
            "&:hover": {
              borderColor: "#1a3a1e",
              bgcolor: "rgba(44, 85, 48, 0.04)",
            },
          }}
          component={Link}
          to="/all_articles"
        >
          View More Articles
        </Button>
      </Box>
    )}
  </Box>
</Container>

    </MainLayout>
  );
}