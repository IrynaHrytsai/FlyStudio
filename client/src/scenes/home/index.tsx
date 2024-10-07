import React, { useEffect } from 'react';
import { SelectedPage } from "@/shared/types";
import AnchorLink from "react-anchor-link-smooth-scroll";
import { motion } from "framer-motion";
import HText from "@/shared/HText";
import Home_Page from "@/assets/home-page.jpg";
import useMediaQuery from '@/hooks/useMediaQuery';

type Props = {
  setSelectedPage: (value: SelectedPage) => void;
};

const Home: React.FC<Props> = ({ setSelectedPage }) => {
  const isAboveMediumScreens = useMediaQuery("(min-width:1060px)");

  useEffect(() => {
    setSelectedPage(SelectedPage.Home);
  }, [setSelectedPage]);

  const homeImageSrc: string = Home_Page as unknown as string;

  return (
    <section id="home" className="gap-20 bg-slate-100 py-10 md:h-full md:pb-0">

   
      <motion.div
        className="mx-auto w-5/6 items-center justify-center mt-10 md:flex md:h-5/6"
        onViewportEnter={() => setSelectedPage(SelectedPage.Home)}
      >
    
        <div className="z-10 mt-32 md:basis-3/5">
    
          <motion.div
            className="md:-mt-20"
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.5 }}
            transition={{ duration: 0.5 }}
            variants={{
              hidden: { opacity: 0, x: -50 },
              visible: { opacity: 1, x: 0 },
            }}
          >
            <HText>FLYSTUDIO</HText>

            <p className="mt-8 text-2xl text-slate-900">
            We believe that fitness should be an inspiring journey, not just a destination. Nestled in the heart of the city,
             our state-of-the-art studio offers a vibrant and welcoming atmosphere, designed to motivate and uplift every individual who walks through our doors.
            </p>
          </motion.div>

        
          <motion.div
            className="mt-8 flex items-center gap-8"
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.5 }}
            transition={{ delay: 0.2, duration: 0.5 }}
            variants={{
              hidden: { opacity: 0, x: -50 },
              visible: { opacity: 1, x: 0 },
            }}
          >
            <AnchorLink
              href="#ourclasses" 
              className="rounded-md bg-light-pink px-14 py-2 text-white hover:bg-pink"
              onClick={() => setSelectedPage(SelectedPage.OurClasses)}
            >
              Join Now
            </AnchorLink>
            <AnchorLink
              className="text-sm font-bold text-light-pink underline hover:text-pink"
              onClick={() => setSelectedPage(SelectedPage.Benefits)}
              href="#benefits"
            >
              <p>Learn More</p>
            </AnchorLink>
          </motion.div>
        </div>

       
        <div className="flex basis-3/5 justify-center mt-10 md:z-10 md:ml-40 md:mt-24 md:justify-items-end">
          <img alt="home-page" src={homeImageSrc} className="w-4/5 md:w-3/5 rounded-lg" /> 
        </div>
      </motion.div>
    </section>
  );
};

export default Home;