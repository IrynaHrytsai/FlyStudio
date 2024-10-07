import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Carousel from 'react-multi-carousel';
import 'react-multi-carousel/lib/styles.css';
import 'react-18-image-lightbox/style.css';
import Lightbox from 'react-18-image-lightbox';
import AerialHoopImage1 from '@/assets/Aerial_Hoop_1.jpg';
import AerialHoopImage2 from '@/assets/Aerial_Hoop_2.jpg';
import AerialHoopImage3 from '@/assets/Aerial_Hoop_3.jpg';
import AerialHoopImage4 from '@/assets/Aerial_Hoop_4.jpg';
import AerialHoopImage5 from '@/assets/Aerial_Hoop_5.jpg';
import Modal from 'react-modal';

interface ClassType {
  name: string;
  description: string;
  images: string[];
}

const AerialHoopData: ClassType = {
  name: 'Aerial Hoop',
  description: 'Aerial hoop is a circular steel apparatus suspended from the ceiling, which performers can sit on, hang from, and move around, combining acrobatics and dance...',
  images: [AerialHoopImage1, AerialHoopImage2, AerialHoopImage3, AerialHoopImage4, AerialHoopImage5],
};

interface BenefitProps {
  title: string;
  description: string;
}

const benefits: BenefitProps[] = [
  { title: 'Improves Core Strength', description: 'Aerial hoop strengthens your core, providing a full-body workout...' },
  { title: 'Increases Flexibility', description: 'Incorporates movements that help improve flexibility and coordination...' },
  { title: 'Boosts Confidence', description: 'Performing aerial hoop enhances self-confidence and body awareness...' },
  { title: 'Single Class - 350 UAH', description: 'Join us for a single session of aerial hoop...' },
];

const classTypes = ['Aerial Silks', 'Aerial Hoop', 'Yoga', 'Stretching'];

const TextFrame: React.FC<BenefitProps> = ({ title, description }) => (
  <div className="mt-5 rounded-md border-2 border-black px-5 py-6 text-center text-lg">
    <h4 className="font-bold">{title}</h4>
    <p className="my-2">{description}</p>
  </div>
);

const AerialHoop: React.FC = () => {
  const [photoIndex, setPhotoIndex] = useState(0);
  const [isOpen, setIsOpen] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [userName, setUserName] = useState('');
  const [userPhone, setUserPhone] = useState('');
  const [userClassType, setUserClassType] = useState(classTypes[1]); 
  const [errorMessage, setErrorMessage] = useState('');
  const [successMessage, setSuccessMessage] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);

  const buttonStyles = 'bg-pink text-white px-6 py-3 rounded-lg hover:bg-pink-600 transition-colors';
  const modalButtonStyles = 'bg-green-500 text-white px-4 py-2 rounded hover:bg-blue-600 transition-colors';
  const closeButtonStyles = 'bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600 transition-colors';
  const navigate = useNavigate();

  const responsive = {
    superLargeDesktop: { breakpoint: { max: 4000, min: 3000 }, items: 3 },
    desktop: { breakpoint: { max: 3000, min: 1024 }, items: 3 },
    tablet: { breakpoint: { max: 1024, min: 464 }, items: 2 },
    mobile: { breakpoint: { max: 464, min: 0 }, items: 1 },
  };

  const openLightbox = (index: number) => {
    setPhotoIndex(index);
    setIsOpen(true);
  };

  const closeLightbox = () => setIsOpen(false);

  const openModal = () => setIsModalOpen(true);

  const closeModal = () => {
    setIsModalOpen(false);
    setUserName('');
    setUserPhone('');
    setUserClassType(classTypes[1]); 
    setErrorMessage('');
    setSuccessMessage('');
  };

  const validatePhoneNumber = (phone: string): boolean => /^\+380\d{9}$/.test(phone);

  const handleRegister = async () => {
    setIsSubmitting(true);
    if (!userName || !userPhone) {
      setErrorMessage('Please fill in all fields.');
      setSuccessMessage('');
      setIsSubmitting(false);
      return;
    }

    if (!validatePhoneNumber(userPhone)) {
      setErrorMessage('Phone number must start with +380 and contain 10 digits.');
      setSuccessMessage('');
      setIsSubmitting(false);
      return;
    }

    setErrorMessage('');

    try {
      const response = await fetch('http://localhost:5000/api/register', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ name: userName, phone: userPhone, classType: userClassType }),
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || 'Network response was not ok');
      }

      const data = await response.json();
      if (data.success) {
        setSuccessMessage('Registration successful! Thank you for joining us.');
        setErrorMessage('');
        setUserName('');
        setUserPhone('');
        setUserClassType(classTypes[1]); 
      } else {
        setErrorMessage(data.message || 'Registration failed. Please try again later.');
        setSuccessMessage('');
      }
    } catch (error) {
      setErrorMessage('Registration failed. Please try again later.');
      setSuccessMessage('');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <section id="aerialhoop" className="w-full h-full scroll-py-20">
      <div className="mx-auto w-5/6">
        <Carousel responsive={responsive} showDots={true} infinite={true}>
          {AerialHoopData.images.map((image, index) => (
            <div key={index} onClick={() => openLightbox(index)}>
              <img
                src={image}
                alt={`Aerial Hoop ${index + 1}`}
                className="mt-32 w-full h-96 object-cover cursor-pointer"
              />
            </div>
          ))}
        </Carousel>
        <h2 className="text-2xl font-bold mt-8">{AerialHoopData.name}</h2>
        <p className="mt-4">{AerialHoopData.description}</p>
        <div className="mt-16 flex flex-col md:flex-row items-center justify-between gap-8">
          {benefits.map((benefit, index) => (
            <TextFrame key={index} title={benefit.title} description={benefit.description} />
          ))}
        </div>
        <div className="mt-16 mb-16 flex justify-center gap-8">
          <button className={buttonStyles} onClick={() => navigate('/')}> 
            Back to Home Page
          </button>
          <button className="bg-green-500 text-white px-6 py-3 rounded-lg" onClick={openModal}>
            Register
          </button>
        </div>
      </div>
      {isOpen && (
        <Lightbox
          mainSrc={AerialHoopData.images[photoIndex]}
          nextSrc={AerialHoopData.images[(photoIndex + 1) % AerialHoopData.images.length]}
          prevSrc={AerialHoopData.images[(photoIndex + AerialHoopData.images.length - 1) % AerialHoopData.images.length]}
          onCloseRequest={closeLightbox}
          onMovePrevRequest={() => setPhotoIndex((photoIndex + AerialHoopData.images.length - 1) % AerialHoopData.images.length)}
          onMoveNextRequest={() => setPhotoIndex((photoIndex + 1) % AerialHoopData.images.length)}
        />
      )}
      <Modal
        isOpen={isModalOpen}
        onRequestClose={closeModal}
        ariaHideApp={false}
        className="flex items-center justify-center z-50 fixed inset-0 bg-black bg-opacity-50"
      >
        <div className="bg-white rounded-lg p-6 w-96 shadow-lg">
          <h2 className="text-xl font-bold mb-4">Become a member of our club</h2>
          <div className="flex flex-col mt-4">
            <label htmlFor="fullName" className="mb-2">Full Name</label>
            <input
              type="text"
              id="fullName"
              value={userName}
              onChange={(e) => setUserName(e.target.value)}
              className="border-2 border-gray-300 rounded-lg p-2"
            />
          </div>
          <div className="flex flex-col mt-4">
            <label htmlFor="phone" className="mb-2">Phone Number</label>
            <input
              type="tel"
              id="phone"
              value={userPhone}
              onChange={(e) => setUserPhone(e.target.value)}
              className="border-2 border-gray-300 rounded-lg p-2"
              placeholder="+380XXXXXXXXX"
            />
          </div>
          <div className="flex flex-col mt-4">
            <label htmlFor="classType" className="mb-2">Class Type</label>
            <select
              id="classType"
              value={userClassType}
              onChange={(e) => setUserClassType(e.target.value)}
              className="border-2 border-gray-300 rounded-lg p-2"
            >
              {classTypes.map((classType, index) => (
                <option key={index} value={classType}>
                  {classType}
                </option>
              ))}
            </select>
          </div>
          {errorMessage && <p className="text-red-500 mt-4">{errorMessage}</p>}
          {successMessage && <p className="text-green-500 mt-4">{successMessage}</p>}
          <div className="flex justify-end mt-6">
            <button onClick={closeModal} className={closeButtonStyles}>Close</button>
            <button onClick={handleRegister} className={modalButtonStyles} disabled={isSubmitting}>
              {isSubmitting ? 'Submitting...' : 'Contact me'}
            </button>
          </div>
        </div>
      </Modal>
    </section>
  );
};

export default AerialHoop;
