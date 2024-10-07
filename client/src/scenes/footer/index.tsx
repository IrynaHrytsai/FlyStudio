import Logo from "@/assets/Logo.png";

const Footer = () => {
  const logoSrc: string = Logo as unknown as string;

  return (
    <footer className="bg-slate-900 py-16">
      <div className="mx-auto w-5/6 gap-16 md:flex">
        <div className="mt-16 basis-1/2 md:mt-0">
          <img alt="logo" src={logoSrc} className="w-32" /> 
          <p className="my-5 text-white">
            Professional training to achieve your fitness goals. At FLYSTUDIO, you’ll find a variety of group classes, personal training, and support from our team of professionals.
          </p>
          <p className="text-white">© 2024 FLYSTUDIO. All rights reserved.</p>
        </div>
        <div className="mt-16 basis-1/4 text-white ml-48 md:mt-0">
          <h4 className="font-bold">Contact Information</h4>
          <p className="my-5">Phone: (333) 425-6825</p>
          <p>Email: info@flystudio.com</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
