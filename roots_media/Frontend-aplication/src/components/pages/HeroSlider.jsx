import React from "react";
import { Card, CardMedia } from "@mui/material";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, Pagination } from "swiper/modules";
import "swiper/css";
import "swiper/css/pagination";

export default function HeroSlider({ articles }) {
  return (
    <Swiper
      modules={[Autoplay, Pagination]}
      autoplay={{ delay: 4000 }}
      pagination={{ clickable: true }}
      loop
      slidesPerView={1}
      direction="horizontal"
    //   style={{ width: "100%", height: "100%" }}
    >
      {articles.slice(0, 3).map((article) => (
        <SwiperSlide key={article.id}>
          <Card
            sx={{
              borderRadius: 0,
              overflow: "hidden",
              height: { xs: 300, md: 500 },
            }}
          >
            <CardMedia
              component="img"
              image={article.image}
              alt={article.title}
              sx={{
                height: "100%",
                width: "100%",
                objectFit: "cover",
                objectPosition: "center",
              }}
            />
          </Card>
        </SwiperSlide>
      ))}
    </Swiper>
  );
}
