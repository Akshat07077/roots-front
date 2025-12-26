import React, { useState, useEffect } from "react";
import MainLayout from "../templates/MainLayout";
import { Box, Container } from "@mui/material";
import AboutUs from "./AboutUs";

import banner1 from "../../assets/banner1.webp";
import banner2 from "../../assets/banner2.jpg";
import banner3 from "../../assets/banner3.jpg";
import banner4 from "../../assets/banner4.jpg";
import banner5 from "../../assets/banner5.jpg";
import SubmissionDeadLine from "./SubmissionDeadline";
import HeroSlider from "./HeroSlider";
import LatestArticles from "./LatestArticles";

const featuredArticles = [
  { id: 1, title: "", image: banner1 },
  { id: 2, title: "", image: banner2 },
  { id: 3, title: "", image: banner3 },
  { id: 4, title: "", image: banner4 },
  { id: 5, title: "", image: banner5 },
];

export default function Home() {
  const [showModal, setShowModal] = useState(true);
  const [lastMonthArticles, setLastMonthArticles] = useState([]);

  // useEffect(() => {
  //   const dismissed = sessionStorage.getItem("modalDismissed");
  //   if (!dismissed) setShowModal(true);

  //   const fetchArticles = async () => {
  //     const res = await fetch("https://roots-back-td3h.vercel.app/api/articles");
  //     const data = await res.json();
  //     const approved = data.articles.filter((a) => a.status === "approved");
  //     const sorted = approved.sort((a, b) => new Date(b.created_at) - new Date(a.created_at));
  //     setLastMonthArticles(sorted);
  //   };

  //   fetchArticles();
  // }, []);

  return (
    <MainLayout withSidebar>
      <SubmissionDeadLine open={showModal} handleClose={() => {
        setShowModal(false);
        sessionStorage.setItem("modalDismissed", "true");
      }} />

      <HeroSlider articles={featuredArticles} />
       <Box
      sx={{
        background: "#2e4638",
        color: "white",
        py: 1,
        fontWeight: "bold",
        fontSize: "1.1rem",
        // borderRadius: 1,
      }}
    >
      <marquee behavior="scroll" direction="left" scrollamount="6">
        🌱 Welcome to Roots Media — Empowering Agricultural Innovation 🌱
      </marquee>
    </Box>

      <Container>
        <AboutUs />
        <LatestArticles  />
      </Container>
    </MainLayout>
  );
}
