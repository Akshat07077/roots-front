import React, { useState, useEffect } from "react";
import { Modal, Box, IconButton, Typography, Divider, Button } from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";

export default function SubmissionDeadLine({ open, handleClose }) {
  const getMonthlyDeadline = () => {
    const today = new Date();
      let deadline = new Date(today.getFullYear(), today.getMonth(), 25, 23, 59, 59);
    if (today > deadline) {
    deadline = new Date(today.getFullYear(), today.getMonth() + 1, 25, 23, 59, 59);
  }

    return deadline;
  };

  const [deadline, setDeadline] = useState(getMonthlyDeadline());

  const [timeLeft, setTimeLeft] = useState({
    days: 0, hours: 0, minutes: 0, seconds: 0,
  });

useEffect(() => {
const calculateTimeLeft = () => {
  const now = new Date();

  const thisMonth25 = new Date(now.getFullYear(), now.getMonth(), 25, 23, 59, 59);
  const nextMonth25 = new Date(now.getFullYear(), now.getMonth() + 1, 25, 23, 59, 59);
  const nextMonthStart = new Date(now.getFullYear(), now.getMonth() + 1, 1);
  if (now > thisMonth25 && now < nextMonthStart) {
    const negativeDays = Math.floor((now - thisMonth25) / (1000 * 60 * 60 * 24));

    setTimeLeft({
      days: -negativeDays,
      hours: 0,
      minutes: 0,
      seconds: 0,
    });

    return;
  }

  let activeDeadline =
    now > thisMonth25 ? nextMonth25 : thisMonth25;

  const diff = activeDeadline - now;

  if (diff <= 0) {
    setDeadline(getMonthlyDeadline());
    return;
  }

  setTimeLeft({
    days: Math.floor(diff / (1000 * 60 * 60 * 24)),
    hours: Math.floor((diff / (1000 * 60 * 60)) % 24),
    minutes: Math.floor((diff / (1000 * 60)) % 60),
    seconds: Math.floor((diff / 1000) % 60),
  });
};

  calculateTimeLeft();

  const timer = setInterval(() => {
    calculateTimeLeft();
  }, 1000);

  return () => clearInterval(timer);
}, [deadline]);


  return (
    <Modal open={open} onClose={handleClose}>
      <Box sx={{
        position: "absolute", top: "50%", left: "50%",
        transform: "translate(-50%, -50%)", bgcolor: "#27382e",
        color: "white", p: 2, borderRadius: 2, maxWidth: 500,
      }}>
        <IconButton onClick={handleClose} sx={{ position: "absolute", top: 10, right: 10, color: "white" }}>
          <CloseIcon />
        </IconButton>

        <Typography variant="h5" fontWeight={700} sx={{ mb: 2, textAlign:"center" }}>
          Submission Deadline for {deadline.toLocaleString("default", { month: "long" })} Issue
        </Typography>
        <Typography variant="body2" sx={{ mb: 2, textAlign:"center" }}>
          (Articles submitted after deadline won't be considered)
        </Typography>

        <Divider sx={{ borderColor: "rgba(255,255,255,0.3)", my: 3 }} />

        <Box sx={{ display: "flex", justifyContent: "center", gap: 3, mb: 3 }}>
          {["days", "hours", "minutes", "seconds"].map((key) => (
            <Box key={key} sx={{ textAlign: "center" }}>
              <Typography variant="h4">{timeLeft[key]}</Typography>
              <Typography variant="caption">{key.toUpperCase()}</Typography>
            </Box>
          ))}
        </Box>

        <Divider sx={{ borderColor: "rgba(255,255,255,0.3)", mb: 3 }} />

        <Typography sx={{ mb: 2, textAlign:"center" }}>
          Submit your article to <br />
          <strong>rootsmedia.publications@gmail.com</strong>
        </Typography>

       {/* <Box sx={{display:"flex", justifyContent:"center"}}>
         <Button
          variant="contained"
          color="secondary"
          href="./Volume-05-Issue-09-September-2025.pdf"
          target="_blank"
          sx={{textTransform:"none"}}
        >
          Download Latest Issue
        </Button>
       </Box> */}
      </Box>
    </Modal>
  );
}
