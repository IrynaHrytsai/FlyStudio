import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navbar from "@/scenes/navbar";
import Home from "@/scenes/home";
import Benefits from "@/scenes/benefits";
import OurClasses from "@/scenes/ourClasses";
import Footer from "@/scenes/footer";
import ContactUs from "@/scenes/contactUs";
import FAQ from "@/scenes/FAQ/faq";
import { SelectedPage } from "@/shared/types";
import AerialSilks from "@/scenes/ourClasses/ClassesInfo/AerialSilks";
import AerialYoga from '@/scenes/ourClasses/ClassesInfo/AerialYoga';
import Stretching from '@/scenes/ourClasses/ClassesInfo/Stretching';
import AerialHoop from '@/scenes/ourClasses/ClassesInfo/AerialHoop';
import Promotions from '@/scenes/promotions/index';  


function App() {
  const [selectedPage, setSelectedPage] = useState<SelectedPage>(SelectedPage.Home);
  const [isTopOfPage, setIsTopOfPage] = useState<boolean>(true);
  const [showOnlyClasses, setShowOnlyClasses] = useState<boolean>(false);

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY === 0) {
        setIsTopOfPage(true);
        setSelectedPage(SelectedPage.Home);
      }
      if (window.scrollY !== 0) setIsTopOfPage(false);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <Router>
      <div className="app bg-slate-100">
        <Navbar
          isTopOfPage={isTopOfPage}
          selectedPage={selectedPage}
          setSelectedPage={setSelectedPage}
        />
        <Routes>
          <Route path="/" element={
            <>
              {!showOnlyClasses && (
                <>
                  <Home setSelectedPage={setSelectedPage} />
                  <Benefits setSelectedPage={setSelectedPage} />
                </>
              )}
              <OurClasses
                setSelectedPage={setSelectedPage}
                showOnlyClasses={showOnlyClasses}
                setShowOnlyClasses={setShowOnlyClasses}
              />
              {!showOnlyClasses && <ContactUs setSelectedPage={setSelectedPage} />}
            </>
          } />
          <Route path="/faq" element={<FAQ />} />
          <Route path="/promotions" element={<Promotions />} /> 
          <Route path="/classes/aerial-silks" element={<AerialSilks />} />
          <Route path="/classes/aerial-yoga" element={<AerialYoga />} />
          <Route path="/classes/stretching" element={<Stretching />} />
          <Route path="/classes/aerial-hoop" element={<AerialHoop />} />
        </Routes>
        <Footer />
      </div>
    </Router>
  );
}

export default App;