import { Routes, Route } from "react-router-dom";
import { ProgressProvider } from "@/lib/progressStore";
import Layout from "@/components/Layout";
import HomePage from "@/pages/HomePage";
import WeekNotesPage from "@/pages/WeekNotesPage";
import StudyPage from "@/pages/StudyPage";
import ConceptsPage from "@/pages/ConceptsPage";
import WrongNotePage from "@/pages/WrongNotePage";

export default function App() {
  return (
    <ProgressProvider>
      <Routes>
        <Route element={<Layout />}>
          <Route index element={<HomePage />} />
          <Route path="weeks" element={<WeekNotesPage />} />
          <Route path="study" element={<StudyPage />} />
          <Route path="concepts" element={<ConceptsPage />} />
          <Route path="wrong" element={<WrongNotePage />} />
        </Route>
      </Routes>
    </ProgressProvider>
  );
}
