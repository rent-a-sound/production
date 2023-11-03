import Nav from "./components/Nav";
import Hero from "./components/Hero";

function App() {
  return (
    <div className="bg-neutral-800">
      <Nav />
      <Hero />
      <div className="bg-neutral-800 w-full h-screen"></div>
    </div>
  );
}

export default App;
