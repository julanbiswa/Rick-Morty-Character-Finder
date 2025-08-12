import { Routes, Route } from "react-router-dom";
import CharacterList from "./pages/CharacterList";
import CharacterDetail from "./pages/CharacterDetail";
import Header from "./components/Header";
import Footer from "./components/Footer";
import { useTheme } from "./context/useTheme";

export default function App() {

  const {Dark}=useTheme()

const root = document.documentElement; // <-- access the <html> element
    if (Dark) {
      root.classList.add("dark");
    } else {
      root.classList.remove("dark");
    }

  return (
    <div className={`flex flex-col min-h-screen  bg-gray-200 dark:bg-gray-800`}>
      <Header />

      <main className="flex-1">
        <Routes>
          <Route path="/" element={<CharacterList />} />
          <Route path="/character/:id" element={<CharacterDetail />} />
        </Routes>
      </main>

      <Footer />
    </div>
  );
}
