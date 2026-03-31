import React, { useEffect, useState } from "react";
import {
  Container,
  Typography,
  Grid,
  Card,
  CardContent,
  Button,
  Box,
  Accordion,
  AccordionSummary,
  AccordionDetails,
  TextField,
  InputAdornment,
} from "@mui/material";
import { Calendar, ChevronDown, Search } from "lucide-react";
import { useLocation } from "react-router-dom";
import MainLayout from "../templates/MainLayout";

export default function Archives() {
  const [articlesByYearMonth, setArticlesByYearMonth] = useState({});
  const [loading, setLoading] = useState(true);
  const location = useLocation();
  const openMonth = location.state?.openMonth;
  const [expanded, setExpanded] = useState({});
  const [searchTerms, setSearchTerms] = useState({});
  const [pdfViewer, setPdfViewer] = useState({
    open: false,
    url: "",
  });

  useEffect(() => {
    fetch("https://roots-back-td3h.vercel.app/api/articles")
      .then((res) => res.json())
      .then((data) => {
        const approved = data.articles.filter((a) => a.status === "approved");
        const grouped = {};

        approved.forEach((article) => {
          const date = new Date(article.created_at);
          const year = date.getFullYear();
          const month = date.toLocaleString("en-US", { month: "long" });
          const monthYear = `${month} ${year}`;

          if (!grouped[year]) grouped[year] = {};
          if (!grouped[year][monthYear]) grouped[year][monthYear] = [];
          grouped[year][monthYear].push(article);
        });

        const sortedYears = Object.keys(grouped).sort((a, b) => b - a);
        const finalGrouped = {};
        const initialExpanded = {};

        sortedYears.forEach((year) => {
          finalGrouped[year] = {};

          const months = Object.keys(grouped[year]).sort(
            (a, b) =>
              new Date(grouped[year][b][0].created_at) -
              new Date(grouped[year][a][0].created_at)
          );

          months.forEach((my) => {
            finalGrouped[year][my] = grouped[year][my];

            if (openMonth && openMonth === my) {
              initialExpanded[my] = true;
            }
          });
        });

        setArticlesByYearMonth(finalGrouped);
        setExpanded(initialExpanded);
        setLoading(false);
      })
      .catch((err) => {
        console.error("Failed to fetch:", err);
        setLoading(false);
      });
  }, [openMonth]);

  const handleChange = (panel) => (event, isExpanded) => {
    setExpanded((prev) => ({ ...prev, [panel]: isExpanded }));
  };

  const handleSearchChange = (monthYear, value) => {
    setSearchTerms((prev) => ({ ...prev, [monthYear]: value }));
  };

  const getFilteredArticles = (articles, monthYear) => {
    const term = searchTerms[monthYear]?.toLowerCase() || "";
    if (!term) return articles;

    return articles.filter(
      (a) =>
        `Issue ${a.issue}`.toLowerCase().includes(term) ||
        (a.title && a.title.toLowerCase().includes(term))
    );
  };

  // ✅ OPEN PDF IN SAME PAGE
  const handleOpenPdf = async (url) => {
    try {
      const res = await fetch(url);
      const blob = await res.blob();
      const blobUrl = URL.createObjectURL(blob);

      setPdfViewer({
        open: true,
        url: blobUrl,
      });
    } catch (err) {
      console.error("PDF error:", err);
    }
  };

  return (
    <MainLayout withSidebar>
      <Container maxWidth="lg" sx={{ py: 6 }}>
        <Typography
          variant="h4"
          align="center"
          sx={{
            fontWeight: 700,
            background: "linear-gradient(135deg, #2e4638, #1f3127)",
            WebkitBackgroundClip: "text",
            WebkitTextFillColor: "transparent",
            mb: 4,
          }}
        >
          Archives
        </Typography>

        {loading ? (
          <Typography align="center">Loading archives...</Typography>
        ) : Object.keys(articlesByYearMonth).length === 0 ? (
          <Typography variant="h6" align="center" color="gray">
            No issues found in the archive.
          </Typography>
        ) : (
          Object.keys(articlesByYearMonth).map((year) => (
            <Box key={year} sx={{ mb: 6 }}>
              <Typography
                variant="h5"
                sx={{
                  fontWeight: 700,
                  color: "#2e4638",
                  mb: 3,
                  display: "flex",
                  alignItems: "center",
                }}
              >
                <Calendar style={{ marginRight: "12px" }} /> Year {year}
              </Typography>

              {Object.keys(articlesByYearMonth[year]).map((monthYear) => (
                <Accordion
                  key={monthYear}
                  expanded={!!expanded[monthYear]}
                  onChange={handleChange(monthYear)}
                >
                  <AccordionSummary expandIcon={<ChevronDown />}>
                    <Typography fontWeight={600}>
                      {monthYear} (
                      {articlesByYearMonth[year][monthYear].length} Articles)
                    </Typography>
                  </AccordionSummary>

                  <AccordionDetails>
                    <Grid container spacing={3}>
                      {getFilteredArticles(
                        articlesByYearMonth[year][monthYear],
                        monthYear
                      ).map((article) => (
                        <Grid item xs={12} sm={6} md={4} lg={3} key={article.id}>
                          <Card sx={{ height: "100%" }}>
                            {/* PDF PREVIEW BOX */}
                            <Box
                              sx={{
                                height: 250,
                                position: "relative",
                                overflow: "hidden",
                                cursor: "pointer",
                                background: "#f5f5f5",
                              }}
                              onClick={() => handleOpenPdf(article.pdf_url)}
                            >
                              <iframe
                                src={`${article.pdf_url}#toolbar=0&navpanes=0&scrollbar=0&view=FitH`}
                                width="100%"
                                height="100%"
                                style={{ border: "none", pointerEvents: "none" }}
                                title={`Issue ${article.issue}`}
                              />
                              {/* Overlay to ensure clickability and disable internal interaction */}
                              <Box
                                sx={{
                                  position: "absolute",
                                  top: 0,
                                  left: 0,
                                  width: "100%",
                                  height: "100%",
                                  zIndex: 2,
                                }}
                              />
                            </Box>

                            <CardContent>
                              <Typography fontWeight={600}>
                                Issue {article.issue}
                              </Typography>

                              <Button
                                fullWidth
                                variant="contained"
                                sx={{ mt: 2 , textTransform:"none"}}
                                onClick={() =>
                                  handleOpenPdf(article.pdf_url)
                                }
                              >
                                Read Magazine
                              </Button>
                            </CardContent>
                          </Card>
                        </Grid>
                      ))}
                    </Grid>
                  </AccordionDetails>
                </Accordion>
              ))}
            </Box>
          ))
        )}
      </Container>

      {/* ✅ PDF VIEWER MODAL */}
      {pdfViewer.open && (
        <Box
          sx={{
            position: "fixed",
            top: 0,
            left: 0,
            width: "100%",
            height: "100%",
            background: "rgba(0,0,0,0.8)",
            zIndex: 9999,
            display: "flex",
            flexDirection: "column",
          }}
        >
          {/* Header */}
          <Box
            sx={{
              display: "flex",
              justifyContent: "space-between",
              p: 2,
              background: "#fff",
            }}
          >
            <Typography fontWeight={600}>Magazine Viewer</Typography>

            <Box>
              <Button
                onClick={() => {
                  const a = document.createElement("a");
                  a.href = pdfViewer.url;
                  a.download = "magazine.pdf";
                  a.click();
                }}
                sx={{textTransform:"none"}}
              >
                Download
              </Button>
              <Button
                onClick={() =>
                  setPdfViewer({ open: false, url: "" })
                }
                sx={{textTransform:"none"}}
              >
                Close
              </Button>
            </Box>
          </Box>

          {/* PDF */}
          <iframe
            src={pdfViewer.url}
            style={{ flex: 1, border: "none" }}
          />
        </Box>
      )}
    </MainLayout>
  );
}