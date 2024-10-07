import React, { useState } from 'react';
import { NextPage } from 'next';
import { motion } from 'framer-motion';
import { ChevronDownIcon, ChevronUpIcon } from '@heroicons/react/24/outline'; 

const faqs = [
  {
    question: "What is FlyStudio?",
    answer: "FlyStudio is a world-class fitness center offering diverse classes and expert training to help you achieve your fitness goals."
  },
  {
    question: "What types of classes do you offer?",
    answer: "We offer a variety of classes including Aerial Silks, Yoga, Stretching, and more. Check out our 'Our Classes' section for more details."
  },
  {
    question: "How can I become a member?",
    answer: "You can become a member by clicking the 'Become a Member' button in the navbar and filling out the form. We will contact you within 10 minutes."
  },
  {
    question: "Do you offer personal training?",
    answer: "Yes, we offer personal training sessions with expert trainers. Contact us for more information."
  },
  {
    question: "What are your operating hours?",
    answer: "We are open from 6 AM to 10 PM on weekdays and from 8 AM to 8 PM on weekends."
  },
  {
    question: "Where are you located?",
    answer: "We are located at 123 Fitness St., Healthy City, Fitland. Visit our 'Contact Us' section for more details."
  },
  {
    question: "Do I need special clothing for the classes?",
    answer: "We recommend wearing comfortable athletic clothing that allows free movement. Avoid clothing with zippers or buttons for aerial classes."
  },
  {
    question: "Do you offer beginner-friendly classes?",
    answer: "Yes, we have classes tailored to all skill levels, including beginners. Our instructors will help you adapt no matter your fitness level."
  },
  {
    question: "Do you offer discounts for students or seniors?",
    answer: "Yes, we offer special discounts for students and seniors. Check out our 'Promotions' section for more details on current offers."
  },
  {
    question: "How can I cancel or modify my booking?",
    answer: "To cancel or modify a booking, please contact us at least 24 hours before your scheduled class."
  }
];

const FAQ: NextPage = () => {
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  const handleToggle = (index: number) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <section id="faq" className="min-h-screen bg-gradient-to-b from-blue-50 to-blue-100 py-10">
      <div className="container mx-auto px-4">
        <motion.div
          initial="hidden"
          animate="visible"
          variants={{
            hidden: { opacity: 0, y: -20 },
            visible: { opacity: 1, y: 0 }
          }}
          transition={{ duration: 0.5 }}
          className="text-center"
        >
          <h1 className="text-4xl font-bold mb-8 mt-28 text-blue-700">Frequently Asked Questions</h1>
          <p className="text-lg mb-10 text-gray-600">Find answers to the most common questions about FlyStudio.</p>
        </motion.div>
        <div className="space-y-6">
          {faqs.map((faq, index) => (
            <motion.div
              key={index}
              initial="hidden"
              animate="visible"
              variants={{
                hidden: { opacity: 0, x: -20 },
                visible: { opacity: 1, x: 0 }
              }}
              transition={{ delay: index * 0.1, duration: 0.5 }}
              className="bg-white rounded-lg shadow-lg p-6 hover:bg-blue-50 transition-all duration-300"
            >
              <div
                className="flex justify-between items-center cursor-pointer"
                onClick={() => handleToggle(index)}
              >
                <h2 className="text-xl font-semibold text-blue-700">{faq.question}</h2>
                {openIndex === index ? (
                  <ChevronUpIcon className="w-6 h-6 text-blue-700" />
                ) : (
                  <ChevronDownIcon className="w-6 h-6 text-blue-700" />
                )}
              </div>
              {openIndex === index && (
                <motion.p
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ duration: 0.3 }}
                  className="text-gray-700 mt-4"
                >
                  {faq.answer}
                </motion.p>
              )}
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default FAQ;
