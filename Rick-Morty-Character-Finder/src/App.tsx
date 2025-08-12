import { Routes, Route } from "react-router-dom";
import CharacterList from "./pages/CharacterList";
import CharacterDetail from "./pages/CharacterDetail";
import Header from "./components/Header";
import Footer from "./components/Footer";

export default function App() {
  return (

    <div className="flex flex-col min-h-screen">
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
