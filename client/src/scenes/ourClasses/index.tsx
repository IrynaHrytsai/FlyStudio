import React, { useEffect, useState } from 'react';
import { SelectedPage, ClassType } from "@/shared/types";
import { motion } from "framer-motion";
import HText from "@/shared/HText";
import { Carousel } from "react-responsive-carousel";
import "react-responsive-carousel/lib/styles/carousel.min.css";
import NavigateBeforeIcon from "@mui/icons-material/NavigateBefore";
import NavigateNextIcon from "@mui/icons-material/NavigateNext";
import AerialSilks from '@/scenes/ourClasses/ClassesInfo/AerialSilks';
import AerialHoopImage from "@/assets/Aerial_Hoop.jpg";
import AerialSilksImage from "@/assets/Aerial_Silks.jpg";
import AerialYogaImage from "@/assets/Aerial_Yoga.jpg";
import StretchingImage from "@/assets/Stretching.jpg";
import AerialYoga from './ClassesInfo/AerialYoga';
import AerialHoop from './ClassesInfo/AerialHoop';
import Stretching from './ClassesInfo/Stretching';

type Props = {
  setSelectedPage: (value: SelectedPage) => void;
  showOnlyClasses: boolean;
  setShowOnlyClasses: (value: boolean) => void;
};

const classesData: ClassType[] = [
  {
    name: "Aerial Hoop",
    description: "Description for Aerial Hoop",
    image: AerialHoopImage,
    component: AerialHoop
  },
  {
    name: "Aerial Silks",
    description: "Description for Aerial Silks",
    image: AerialSilksImage,
    component: AerialSilks
  },
  {
    name: "Aerial Yoga",
    description: "Description for Aerial Yoga",
    image: AerialYogaImage,
    component: AerialYoga
  },
  {
    name: "Stretching",
    description: "Description for Stretching",
    image: StretchingImage,
    component: Stretching
  }
];

const ClassComponent: React.FC<ClassType & { handleShowOnlyClasses: () => void }> = ({ name, description, image, handleShowOnlyClasses }) => {
  const [hovered, setHovered] = useState(false);

  const handleMouseEnter = () => setHovered(true);
  const handleMouseLeave = () => setHovered(false);

  return (
    <div className="relative mx-12 inline-block h-[380px] w-[450px]">
      <div className={`p-5 absolute z-30 flex h-full w-full flex-col items-center justify-center bg-pink text-center text-white transition-opacity duration-500 ${hovered ? 'opacity-90' : 'opacity-0'}`} onMouseEnter={handleMouseEnter} onMouseLeave={handleMouseLeave}>
        <div className="mt-[-70px]"> 
          <p className="text-2xl">{name}</p>
          {description && <p className="mt-2">{description}</p>}
          {hovered && (
            <button onClick={handleShowOnlyClasses} className="mt-4 bg-white px-4 py-2 text-pink rounded-full transition-transform duration-200 transform hover:scale-105">
              Learn more
            </button>
          )}
        </div>
      </div>
      <img alt={name} src={image as string} className="h-full w-full object-cover rounded-lg transition-transform duration-500 hover:scale-105" />
    </div>
  );
};

const OurClasses: React.FC<Props> = ({ setSelectedPage, showOnlyClasses, setShowOnlyClasses }) => {
  const [centerSlidePercentage, setCenterSlidePercentage] = useState(33.3);
  const [selectedClassIndex, setSelectedClassIndex] = useState<number | null>(null);

  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth >= 1024) {
        setCenterSlidePercentage(33.3);
      } else if (window.innerWidth >= 768) {
        setCenterSlidePercentage(50);
      } else {
        setCenterSlidePercentage(100);
      }
    };

    handleResize();
    window.addEventListener('resize', handleResize);

    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  const handleClassClick = (index: number) => {
    setSelectedClassIndex(index);
    setShowOnlyClasses(true);
  };

  const resetSelectedClass = () => {
    setSelectedClassIndex(null);
    setShowOnlyClasses(false);
  };

  return (
    <section id="ourclasses" className="w-full bg-slate-200 py-40">
      <motion.div onViewportEnter={() => setSelectedPage(SelectedPage.OurClasses)}>
        {!showOnlyClasses && (
          <motion.div
            className="mx-auto w-5/6"
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.5 }}
            transition={{ duration: 0.5 }}
            variants={{
              hidden: { opacity: 0, x: -50 },
              visible: { opacity: 1, x: 0 },
            }}
          >
            <div className="md:w-3/5">
            <HText>Our Classes</HText>
            <p className="py-5">
            At Flystudio, we offer a diverse range of classes designed to cater to all fitness levels and interests. 
            Whether you are looking to build strength, enhance flexibility, or find inner peace, we have the perfect class for you.
            From dynamic aerial silks and invigorating yoga sessions to energizing group fitness classes, our curriculum promotes a holistic 
            approach to health and wellness.
            </p>
            </div>

          </motion.div>
        )}
        {selectedClassIndex === null ? (
          <div className="mt-10 mx-24">
            <Carousel
              showThumbs={false}
              showStatus={false}
              showArrows={true}
              infiniteLoop={true}
              centerMode={true}
              centerSlidePercentage={centerSlidePercentage}
              swipeable={true}
              emulateTouch={true}
              renderArrowPrev={(onClickHandler, hasPrev, label) =>
                hasPrev && (
                  <button
                    type="button"
                    onClick={onClickHandler}
                    title={label}
                    className="absolute left-0 z-10 p-4 top-1/2 transform -translate-y-1/2 bg-white rounded-full shadow-md transition-transform duration-200 hover:scale-105"
                  >
                    <NavigateBeforeIcon style={{ fontSize: 28, color: '#333' }} />
                  </button>
                )
              }
              renderArrowNext={(onClickHandler, hasNext, label) =>
                hasNext && (
                  <button
                    type="button"
                    onClick={onClickHandler}
                    title={label}
                    className="absolute right-0 z-10 p-4 top-1/2 transform -translate-y-1/2 bg-white rounded-full shadow-md transition-transform duration-200 hover:scale-105"
                  >
                    <NavigateNextIcon style={{ fontSize: 28, color: '#333' }} />
                  </button>
                )
              }
              renderIndicator={() => null} 
              showIndicators={false} 
            >
              {classesData.map((item, index) => (
                <div key={index}>
                  <ClassComponent {...item} handleShowOnlyClasses={() => handleClassClick(index)} />
                </div>
              ))}
            </Carousel>
          </div>
        ) : (
          <div className="mt-10">
            {selectedClassIndex !== null && classesData[selectedClassIndex].component && (
              React.createElement(classesData[selectedClassIndex].component, { resetSelectedClass })
            )}
          </div>
        )}
      </motion.div>
    </section>
  );
};

export default OurClasses;
