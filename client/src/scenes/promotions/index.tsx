import React, { useState } from 'react';
import { NextPage } from 'next';
import { MagnifyingGlassIcon } from '@heroicons/react/24/outline'; 
import summerSale from '@/assets/summerSale.jpg';
import NewMemberDiscount from '@/assets/NewMemberDiscount.jpg';
import BackToSchool from '@/assets/BackToSchool.jpg';
import HolidayGift from '@/assets/HolidayGift.jpg';
import FamilyDiscount from '@/assets/FamilyDiscount.jpeg';
import ReferralProgram from '@/assets/ReferralProgram.jpg';
import BlackFriday from '@/assets/BlackFriday.png';
import CyberMonday from '@/assets/CyberMonday.jpg';
import SpringRefresh from '@/assets/SpringRefresh.png';

interface Promotion {
  id: string;
  title: string;
  description: string;
  discount: string;
  startDate: string;
  endDate: string;
  terms: string;
  category: string;
  image: string;
}

const promotions: Promotion[] = [
  {
    id: '1',
    title: 'Summer Sale',
    description: 'Get ready for summer with our special sale!',
    discount: '30% off',
    startDate: '2024-07-01',
    endDate: '2024-07-31',
    terms: 'Applicable to all classes except personal training.',
    category: 'Seasonal',
    image: summerSale,
  },
  {
    id: '2',
    title: 'New Member Discount',
    description: 'Join now and get a 50% discount on your first month!',
    discount: '50% off',
    startDate: '2024-07-15',
    endDate: '2024-08-15',
    terms: 'Only for new members.',
    category: 'Membership',
    image: NewMemberDiscount,
  },
  {
    id: '3',
    title: 'Back to School Special',
    description: 'Get your fitness routine back on track with our back-to-school offer!',
    discount: '25% off',
    startDate: '2024-09-01',
    endDate: '2024-09-30',
    terms: 'Available for students only.',
    category: 'Seasonal',
    image: BackToSchool,
  },
  {
    id: '4',
    title: 'Holiday Gift Card Special',
    description: 'Give the gift of fitness with our holiday gift card special!',
    discount: 'Buy one, get one 50% off',
    startDate: '2024-12-01',
    endDate: '2024-12-31',
    terms: 'Valid for gift card purchases only.',
    category: 'Seasonal',
    image: HolidayGift,
  },
  {
    id: '5',
    title: 'Family Discount',
    description: 'Sign up with a family member and both get 20% off!',
    discount: '20% off',
    startDate: '2024-08-01',
    endDate: '2024-08-31',
    terms: 'Must sign up together to receive the discount.',
    category: 'Membership',
    image: FamilyDiscount,
  },
  {
    id: '6',
    title: 'Referral Program',
    description: 'Refer a friend and get a free class!',
    discount: 'Free class',
    startDate: '2024-07-01',
    endDate: '2024-12-31',
    terms: 'Valid for new referrals only.',
    category: 'Membership',
    image: ReferralProgram,
  },
  {
    id: '7',
    title: 'Black Friday Deal',
    description: 'Our best offer of the year - don’t miss out!',
    discount: '50% off all memberships',
    startDate: '2024-11-25',
    endDate: '2024-11-28',
    terms: 'Only valid during Black Friday week.',
    category: 'Seasonal',
    image: BlackFriday,
  },
  {
    id: '8',
    title: 'Cyber Monday Flash Sale',
    description: 'One-day-only sale on all online memberships!',
    discount: '60% off',
    startDate: '2024-11-29',
    endDate: '2024-11-29',
    terms: 'Available online only.',
    category: 'Seasonal',
    image: CyberMonday,
  },
  {
    id: '9',
    title: 'Spring Refresh',
    description: 'Refresh your fitness goals with our spring offer!',
    discount: '20% off',
    startDate: '2024-03-01',
    endDate: '2024-03-31',
    terms: 'Valid for all group classes.',
    category: 'Seasonal',
    image: SpringRefresh,
  },
];

const Promotions: NextPage = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);

  const filteredPromotions = promotions.filter((promotion) =>
    (selectedCategory ? promotion.category === selectedCategory : true) &&
    (searchTerm ? promotion.title.toLowerCase().includes(searchTerm.toLowerCase()) : true)
  );

  return (
    <section id="promotions" className="min-h-screen bg-gray-100 py-10">
      <div className="container mx-auto px-4">
        <h1 className="text-4xl font-bold mb-8 text-center">Current Promotions</h1>
        <div className="flex justify-between mb-6">
          <div className="relative">
            <input
              type="text"
              placeholder="Search promotions..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="p-2 border rounded pl-10"
            />
            <MagnifyingGlassIcon className="absolute left-3 top-2.5 w-5 h-5 text-gray-400" /> 
          </div>
          <select
            value={selectedCategory || ''}
            onChange={(e) => setSelectedCategory(e.target.value || null)}
            className="p-2 border rounded"
          >
            <option value="">All Categories</option>
            <option value="Seasonal">Seasonal</option>
            <option value="Membership">Membership</option>
          </select>
        </div>
        <div className="space-y-6">
          {filteredPromotions.map((promotion) => (
            <div key={promotion.id} className="bg-white rounded-lg shadow-md p-6">
              <h2 className="text-xl font-semibold mb-2">{promotion.title}</h2>
              <img
                src={promotion.image}
                alt={promotion.title}
                className="w-full h-80 object-cover rounded-md mb-4" 
              />
              <p className="text-gray-700 mt-2">{promotion.description}</p>
              <p className="text-lg font-bold mt-2">Discount: {promotion.discount}</p>
              <p className="text-gray-600">
                Valid from {new Date(promotion.startDate).toLocaleDateString()} to {new Date(promotion.endDate).toLocaleDateString()}
              </p>
              <p className="text-gray-500">Terms: {promotion.terms}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Promotions;
