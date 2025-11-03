import { Box, Typography, TextField, Button, Divider } from "@mui/material";
import { useState } from "react";

export default function FeedbackPage() {
  const [feedback, setFeedback] = useState("");
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = () => {
    if (feedback.trim() !== "") {
      // You can send this feedback to backend API here
      console.log("Submitted Feedback:", feedback);
      setSubmitted(true);
      setFeedback("");
    }
  };

  return (
    <Box sx={{ mt: 6, maxWidth: 700, mx: "auto", px: 2 }}>
      {/* Page Title */}
      <Typography variant="h4" fontWeight="700" gutterBottom>
        We Value Your Feedback
      </Typography>
      <Typography variant="body1" color="text.secondary" sx={{ mb: 4 }}>
        Your thoughts help us improve. Please share your feedback below.
      </Typography>

      <Divider sx={{ mb: 3 }} />

      {!submitted ? (
        <>
          <TextField
            placeholder="Write your feedback here..."
            multiline
            rows={5}
            variant="outlined"
            value={feedback}
            onChange={(e) => setFeedback(e.target.value)}
            sx={{
              mb: 2,
              width: "100%",
              "& .MuiOutlinedInput-root": {
                borderRadius: 2,
              },
            }}
          />
          <Box sx={{ display: "flex", justifyContent: "flex-end" }}>
            <Button
              variant="contained"
              color="primary"
              onClick={handleSubmit}
              sx={{ borderRadius: 2, textTransform: "none", px: 3 }}
            >
              Submit Feedback
            </Button>
          </Box>
        </>
      ) : (
        <Box sx={{ textAlign: "center", mt: 4 }}>
          <Typography variant="h6" color="primary" fontWeight="600">
            🎉 Thank you for your feedback!
          </Typography>
          <Typography variant="body2" color="text.secondary" sx={{ mt: 1 }}>
            We appreciate your time and effort in helping us improve.
          </Typography>
        </Box>
      )}
    </Box>
  );
}
