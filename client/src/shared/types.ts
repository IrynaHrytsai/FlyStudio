export enum SelectedPage {
  Home = 'home',
  Benefits = 'benefits',
  OurClasses = 'ourclasses',
  AerialSilks = 'aerial-silks',
  AerialSilksKids = 'aerial-silks-kids',
  AerialYoga = 'aerial-yoga',
  Yoga = 'yoga',
  YogaForPregnant = 'yoga-for-pregnant',
  Stretching = 'stretching',
  AerialHoop = 'aerial-hoop',
  ContactUs = 'contact-us',
  OurTrainers = 'our-trainers',
  FAQ = 'FAQ',
  Promotions = 'promotions',
}

export interface BenefitType {
  icon: JSX.Element;
  title: string;
  description: string;
}


export interface ClassType {
  name: string;
  description?: string;
  image?: string;
  component?: React.ComponentType<any>; 
}
