import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "../components/pages/Home";
import ContactUs from "../components/pages/ContactUs";
import PublicationFees from "../components/pages/PublicationFees";
import AuthorsGuidelines from "../components/pages/AuthorsGuidelines";
import NotFound from "../components/pages/NotFound";
import DocumentUpload from "../components/pages/DocumentUpload";
import EditorialBoard from "../components/pages/EditorialDashboard";
import LoginPage from "../components/pages/AdminPortal/LoginPage";
import AdminDashboard from "../components/pages/AdminPortal/AdminPanel";
import AllArticles from "../components/pages/AllAricles";
import Articles from "../components/pages/Articles";

export default function AppRouter() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        {/* <Route path="/articles/:id" element={<ArticlePage />} /> */}
        <Route path="/contact-us" element={<ContactUs />} />
        <Route path="/publication-fees" element={<PublicationFees />} />
        <Route path="/authors-guidelines" element={<AuthorsGuidelines />} />
        <Route path="/document-upload" element={<DocumentUpload />} />
        <Route path="/editorial_board" element={<EditorialBoard />} />
        <Route path="/all_articles" element={<AllArticles />} />
         <Route path="/articles/:month" element={<Articles/>} />
         <Route path="/login" element={<LoginPage />} />
         <Route path="/admin" element={<AdminDashboard />} />
        <Route path="*" element={<NotFound />} />
      </Routes>
    </BrowserRouter>
  );
}

