import { Routes, Route } from "react-router-dom";
import { ProgressProvider } from "@/lib/progressStore";
import ScrollToTop from "@/components/ScrollToTop";
import Layout from "@/components/Layout";
import HomePage from "@/pages/HomePage";
import WeekNotesPage from "@/pages/WeekNotesPage";
import StudyPage from "@/pages/StudyPage";
import ConceptsPage from "@/pages/ConceptsPage";
import WrongNotePage from "@/pages/WrongNotePage";
import AboutPage from "@/pages/AboutPage";
import NotFoundPage from "@/pages/NotFoundPage";

export default function App() {
  return (
    <ProgressProvider>
      <ScrollToTop />
      <Routes>
        <Route element={<Layout />}>
          <Route index element={<HomePage />} />
          <Route path="weeks" element={<WeekNotesPage />} />
          <Route path="study" element={<StudyPage />} />
          <Route path="concepts" element={<ConceptsPage />} />
          <Route path="wrong" element={<WrongNotePage />} />
          <Route path="about" element={<AboutPage />} />
          <Route path="*" element={<NotFoundPage />} />
        </Route>
      </Routes>
    </ProgressProvider>
  );
}
