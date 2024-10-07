import React, { useState } from 'react';
import { Link as RouterLink, useNavigate } from 'react-router-dom';
import Logo from '@/assets/Logo.png';
import { SelectedPage } from '@/shared/types';
import useMediaQuery from '@/hooks/useMediaQuery';
import { Bars3Icon, XMarkIcon } from '@heroicons/react/24/solid';

type Props = {
  isTopOfPage: boolean;
  selectedPage: SelectedPage;
  setSelectedPage: (value: SelectedPage) => void;
};

const Navbar = ({ isTopOfPage, selectedPage, setSelectedPage }: Props) => {
  const flexBetween = 'flex items-center justify-between';
  const [isMenuToggled, setIsMenuToggled] = useState<boolean>(false);
  const [isClassesMenuToggled, setIsClassesMenuToggled] = useState<boolean>(false);
  const isAboveMediumScreens = useMediaQuery('(min-width: 1060px)');
  const navbarBackground = isTopOfPage ? '' : 'bg-slate-900 drop-shadow';
  const navigate = useNavigate();

  const handleLogoClick = () => {
    setSelectedPage(SelectedPage.Home);
    navigate('/');
    setIsMenuToggled(false);
    window.scrollTo(0, 0);
  };

  const handleNavLinkClick = (page: SelectedPage) => {
    setSelectedPage(page);
    navigate(`/${page.toLowerCase().replace(/ /g, '-')}`);
    setIsMenuToggled(false);
    window.scrollTo(0, 0);
    setIsClassesMenuToggled(false);
  };

  const toggleMenu = () => {
    setIsMenuToggled((prev) => !prev);
  };

  const toggleClassesMenu = () => {
    setIsClassesMenuToggled((prev) => !prev);
  };


  const handleContactUsClick = () => {
    if (selectedPage !== SelectedPage.Home) {

      navigate('/');

      setTimeout(() => {
        const contactSection = document.getElementById('contactus');
        if (contactSection) {
          contactSection.scrollIntoView({ behavior: 'smooth' });
        }
      }, 500); 
    } else {
     
      const contactSection = document.getElementById('contactus');
      if (contactSection) {
        contactSection.scrollIntoView({ behavior: 'smooth' });
      }
    }
  };

  return (
    <nav>
      <div className={`${navbarBackground} ${flexBetween} fixed top-0 z-20 w-full py-3 bg-slate-900`}>
        <div className={`${flexBetween} mx-auto w-5/6`}>
          <div className={`${flexBetween} w-full gap-16`}>
            <RouterLink to="/" className="cursor-pointer" onClick={handleLogoClick}>
              <img alt="logo" src={Logo as unknown as string} />
            </RouterLink>

            {isAboveMediumScreens ? (
              <div className={`${flexBetween} w-full text-white`}>
                <div className={`${flexBetween} gap-8 text-sm`}>
                  <RouterLink
                    to="/"
                    className={`${selectedPage === SelectedPage.Home ? 'text-pink' : ''}`}
                    onClick={() => handleNavLinkClick(SelectedPage.Home)}
                  >
                    Home
                  </RouterLink>
                  <div className="relative">
                    <button
                      className="text-sm text-white hover:text-pink focus:outline-none"
                      onClick={toggleClassesMenu}
                    >
                      Our Classes
                    </button>
                    {isClassesMenuToggled && (
                      <div className="absolute mt-3 px-4 ml-[-20px] bg-slate-900 rounded-md w-[105px]">
                        <RouterLink
                          to="/classes/aerial-silks"
                          className="block py-2 text-white hover:text-pink"
                          onClick={() => handleNavLinkClick(SelectedPage.AerialSilks)}
                        >
                          Aerial Silks
                        </RouterLink>
                        <RouterLink
                          to="/classes/aerial-yoga"
                          className="block py-2 text-white hover:text-pink"
                          onClick={() => handleNavLinkClick(SelectedPage.AerialYoga)}
                        >
                          Aerial Yoga
                        </RouterLink>
                        <RouterLink
                          to="/classes/stretching"
                          className="block py-2 text-white hover:text-pink"
                          onClick={() => handleNavLinkClick(SelectedPage.Stretching)}
                        >
                          Stretching
                        </RouterLink>
                        <RouterLink
                          to="/classes/aerial-hoop"
                          className="block py-2 text-white hover:text-pink"
                          onClick={() => handleNavLinkClick(SelectedPage.AerialHoop)}
                        >
                          Aerial Hoop
                        </RouterLink>
                      </div>
                    )}
                  </div>
                  <RouterLink
                    to="/promotions"
                    className="text-sm focus:outline-none"
                    onClick={() => handleNavLinkClick(SelectedPage.Promotions)}
                  >
                    Promotions
                  </RouterLink>
                  <RouterLink
                    to="/faq"
                    className={`${selectedPage === SelectedPage.FAQ ? 'text-pink' : ''}`}
                    onClick={() => handleNavLinkClick(SelectedPage.FAQ)}
                  >
                    FAQ
                  </RouterLink>
                </div>
                <div className={`${flexBetween} gap-8 text-sm`}>
                  <button
                    onClick={handleContactUsClick}
                    className="rounded-md bg-light-pink px-14 py-2 text-white hover:bg-pink"
                  >
                    Contact Us
                  </button>
                </div>
              </div>
            ) : (
              <button className="rounded-full bg-pink p-2" onClick={toggleMenu}>
                {!isMenuToggled ? <Bars3Icon className="h-6 w-6 text-white" /> : <XMarkIcon className="h-6 w-6 text-white" />}
              </button>
            )}
          </div>
        </div>
      </div>

      {!isAboveMediumScreens && isMenuToggled && (
        <div className="fixed right-0  bottom-0 z-40 h-full w-[300px] bg-slate-900 drop-shadow-lg">
          <div className="flex justify-end p-12">
            <button onClick={toggleMenu}>
              <XMarkIcon className="h-6 w-6 text-white" />
            </button>
          </div>
          <div className="ml-[33%] flex flex-col gap-10 text-2xl text-white">
            <RouterLink to="/" onClick={() => handleNavLinkClick(SelectedPage.Home)}>
              Home
            </RouterLink>
            <div>
              <button className="text-2xl" onClick={toggleClassesMenu}>
                Our Classes
              </button>
              {isClassesMenuToggled && (
                <div className="mt-2 space-y-2">
                  <RouterLink
                    to="/classes/aerial-silks"
                    className="block text-white hover:text-pink"
                    onClick={() => handleNavLinkClick(SelectedPage.AerialSilks)}
                  >
                    Aerial Silks
                  </RouterLink>
                  <RouterLink
                    to="/classes/aerial-yoga"
                    className="block text-white hover:text-pink"
                    onClick={() => handleNavLinkClick(SelectedPage.AerialYoga)}
                  >
                    Aerial Yoga
                  </RouterLink>
                  <RouterLink
                    to="/classes/stretching"
                    className="block text-white hover:text-pink"
                    onClick={() => handleNavLinkClick(SelectedPage.Stretching)}
                  >
                    Stretching
                  </RouterLink>
                  <RouterLink
                    to="/classes/aerial-hoop"
                    className="block text-white hover:text-pink"
                    onClick={() => handleNavLinkClick(SelectedPage.AerialHoop)}
                  >
                    Aerial Hoop
                  </RouterLink>
                </div>
              )}
            </div>
            <RouterLink
              to="/promotions"
              className="block text-white hover:text-pink"
              onClick={() => handleNavLinkClick(SelectedPage.Promotions)}
            >
              Promotions
            </RouterLink>
            <RouterLink
              to="/faq"
              className={`${selectedPage === SelectedPage.FAQ ? 'text-pink' : ''}`}
              onClick={() => handleNavLinkClick(SelectedPage.FAQ)}
            >
              FAQ
            </RouterLink>
            <button
              onClick={handleContactUsClick}
              className="rounded-md text-left px-2 bg-light-pink mr-8 py-2 text-white hover:bg-pink"
            >
              Contact Us
            </button>
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
