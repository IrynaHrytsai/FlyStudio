import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom'; 
import Carousel from 'react-multi-carousel';
import 'react-multi-carousel/lib/styles.css';
import 'react-18-image-lightbox/style.css';
import Lightbox from 'react-18-image-lightbox';
import AerialSilksImage1 from '@/assets/Aerial_Silks_1.jpg';
import AerialSilksImage2 from '@/assets/Aerial_Silks_2.jpg';
import AerialSilksImage3 from '@/assets/Aerial_Silks_3.jpg';
import AerialSilksImage4 from '@/assets/Aerial_Silks_4.jpg';
import AerialSilksImage5 from '@/assets/Aerial_Silks_5.jpg';
import Modal from 'react-modal';

interface ClassType {
  name: string;
  description: string;
  images: string[];
}

const AerialSilksData: ClassType = {
  name: 'Aerial Silks',
  description: `Aerial silks is an artistic and acrobatic discipline that combines dance and gymnastics using fabric suspended from above. This mesmerizing performance art allows artists to execute breathtaking acrobatics while hanging from long pieces of fabric, often referred to as tissu or aerial ribbons.

What Makes Aerial Silks Unique?

Performers climb the fabric without safety lines, relying solely on their training and skills to ensure their safety. Using the silks, they wrap, suspend, drop, swing, and spiral their bodies into stunning shapes and poses. The art of aerial silks is not just about the acrobatics; it's about storytelling and expressing emotions through movement in the air.

The Artistry of Movement

With each performance, aerialists showcase their strength, flexibility, and creativity to create visually stunning displays. Some may use rosin on their hands and feet to enhance grip, allowing them to perform daring drops and spins effortlessly.

Why Aerial Silks?

Practicing aerial silks requires not only physical strength and stamina but also courage and grace. This demanding art form offers a unique way to connect with one’s body while showcasing incredible artistry and athleticism. Whether you’re a spectator or a performer, the enchanting world of aerial silks is sure to leave you in awe.`,
  images: [AerialSilksImage1, AerialSilksImage2, AerialSilksImage3, AerialSilksImage4, AerialSilksImage5],
};

interface BenefitProps {
  title: string;
  description: string;
}

const benefits: BenefitProps[] = [
  { title: 'Package "Beginner" - 300 UAH', description: 'Your first lesson is free...' },
  { title: 'Package "Master" - 800 UAH', description: 'Includes 5 classes...' },
  { title: 'Package "Pro" - 1500 UAH', description: 'Includes 10 classes...' },
  { title: 'Single Class - 350 UAH', description: 'Enjoy a single session...' },
];

const classTypes = ['Aerial Silks', 'Aerial Hoop', 'Yoga', 'Stretching'];

const TextFrame: React.FC<BenefitProps> = ({ title, description }) => (
  <div className="mt-5 rounded-md border-2 border-black px-5 py-6 text-center text-lg"> 
    <h4 className="font-bold">{title}</h4>
    <p className="my-2">{description}</p>
  </div>
);

const AerialSilks: React.FC = () => {
  const [photoIndex, setPhotoIndex] = useState(0);
  const [isOpen, setIsOpen] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [userName, setUserName] = useState('');
  const [userPhone, setUserPhone] = useState('');
  const [userClassType, setUserClassType] = useState(classTypes[0]);
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
    setUserClassType(classTypes[0]);
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
        setUserClassType(classTypes[0]);
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
    <section id="aerialsilks" className="w-full h-full  scroll-py-20">
      <div className="mx-auto w-5/6">
        <Carousel responsive={responsive} showDots={true} infinite={true}>
          {AerialSilksData.images.map((image, index) => (
            <div key={index} onClick={() => openLightbox(index)}>
              <img
                src={image}
                alt={`Aerial Silks ${index + 1}`}
                className="mt-32 w-full h-96 object-cover cursor-pointer" 
              />
            </div>
          ))}
        </Carousel>
        <h2 className="text-2xl font-bold mt-8">{AerialSilksData.name}</h2>
        <p className="mt-4">{AerialSilksData.description}</p>
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
          mainSrc={AerialSilksData.images[photoIndex]}
          nextSrc={AerialSilksData.images[(photoIndex + 1) % AerialSilksData.images.length]}
          prevSrc={AerialSilksData.images[(photoIndex + AerialSilksData.images.length - 1) % AerialSilksData.images.length]}
          onCloseRequest={closeLightbox}
          onMovePrevRequest={() => setPhotoIndex((photoIndex + AerialSilksData.images.length - 1) % AerialSilksData.images.length)}
          onMoveNextRequest={() => setPhotoIndex((photoIndex + 1) % AerialSilksData.images.length)}
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
              className="border border-gray-300 rounded p-2"
              value={userName} 
              onChange={(e) => setUserName(e.target.value)} 
            />
          </div>
          <div className="flex flex-col mt-4">
            <label htmlFor="phone" className="mb-2">Phone Number</label>
            <input 
              type="text" 
              id="phone" 
              className="border border-gray-300 rounded p-2" 
              value={userPhone} 
              onChange={(e) => setUserPhone(e.target.value)} 
              placeholder="+380XXXXXXXXX"
            />
          </div>
          <div className="flex flex-col mt-4">
            <label htmlFor="classType" className="mb-2">Select Class Type</label>
            <select 
              id="classType" 
              className="border border-gray-300 rounded p-2"
              value={userClassType}
              onChange={(e) => setUserClassType(e.target.value)}
            >
              {classTypes.map((type) => (
                <option key={type} value={type}>{type}</option>
              ))}
            </select>
          </div>
          <div className="flex justify-between mt-6">
            <button 
              className={modalButtonStyles} 
              onClick={handleRegister} 
              disabled={isSubmitting}
            >
              {isSubmitting ? 'Submitting...' : 'Contact me'}
            </button>
            <button className={closeButtonStyles} onClick={closeModal}>Close</button>
          </div>
          {errorMessage && <p className="mt-4 text-red-500">{errorMessage}</p>}
          {successMessage && <p className="mt-4 text-green-500">{successMessage}</p>}
        </div>
      </Modal>
    </section>
  );
};

export default AerialSilks;  