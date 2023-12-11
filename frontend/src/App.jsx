import Hero from "./components/Hero";
import Catalogue from "./components/Catalogue";
import Form from "./components/Form";
import { Route, Routes } from "react-router-dom";

function App() {
  return (
    <Routes>
      <Route path="/" element={<Hero />} />
      <Route path="/katalog/*" element={<Catalogue />} />
      <Route path="/rez/*" element={<Form />} />
    </Routes>
  );
}

export default App;
