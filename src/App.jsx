import Contact from "./components/Contact";
import Footer from "./components/Footer";
import Navbar from "./components/Navbar";
import Story from "./components/Story";

import About from "./sections/About";
import Gallery from "./sections/Gallery";
import Hero from "./sections/Hero";
import Location from "./sections/Location";

const App = () => {
  return (
    <>
      <main className="relative min-h-screen w-screen">
        <Navbar />
        <Hero />
        <Gallery />
        <About />
        <Story />
        <Location />
        <Contact />
        <Footer />  
      </main>
    </>
  );
};

export default App;
