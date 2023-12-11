import Hero from "./components/Hero";
import Catalogue from "./components/Catalogue";
import { Route, Routes } from "react-router-dom";

function App() {
  return (
    <Routes>
      <Route path="/" element={<Hero />} />
      <Route path="/katalog" element={<Catalogue />} />
    </Routes>
  );
}

export default App;
