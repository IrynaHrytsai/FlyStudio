import HText from "@/shared/HText";
import { BenefitType, SelectedPage } from "@/shared/types";
import {
  HomeModernIcon,
  UserGroupIcon,
  AcademicCapIcon,
} from "@heroicons/react/24/solid";
import { motion } from "framer-motion";
import Benefit from "./Benefit";
import Benefits_photo from "@/assets/Benefits.jpg";
import AnchorLink from 'react-anchor-link-smooth-scroll';

const benefits: Array<BenefitType> = [
  {
    icon: <HomeModernIcon className="h-6 w-6" />,
    title: "State-of-the-Art Facilities",
    description:
      "Experience our modern and spacious facilities equipped with the latest fitness technology. Enjoy an inviting environment that motivates you to achieve your goals.",
  },
  {
    icon: <UserGroupIcon className="h-6 w-6" />,
    title: "A Wide Range of Classes",
    description:
      "Choose from hundreds of diverse classes tailored for every fitness level. From aerial silks to yoga, our offerings cater to all interests and help you find your passion for fitness.",
  },
  {
    icon: <AcademicCapIcon className="h-6 w-6" />,
    title: "Trained Professionals",
    description:
      "Our expert trainers are dedicated to your success. With years of experience and a passion for fitness, they provide personalized guidance to help you reach your full potential.",
  },
];


const container = {
  hidden: {},
  visible: {
    transition: { staggerChildren: 0.2 },
  },
};

type Props = {
  setSelectedPage: (value: SelectedPage) => void;
};

const Benefits = ({ setSelectedPage }: Props) => {
  return (
    <section id="benefits" className="mx-auto min-h-full w-5/6 py-20">
      <motion.div
        onViewportEnter={() => setSelectedPage(SelectedPage.Benefits)}
      >

        <motion.div
          className="md:my-5 md:w-3/5"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.5 }}
          transition={{ duration: 0.5 }}
          variants={{
            hidden: { opacity: 0, x: -50 },
            visible: { opacity: 1, x: 0 },
          }}
        >
          <HText>MORE THAN JUST GYM.</HText>
          <p className="my-5 text-lg">
            We provide world class fitness equipment, trainers and classes to
            get you to your ultimate fitness goals with ease. We provide true
            care into each and every member.
          </p>
        </motion.div>


        <motion.div
          className="mt-5 items-center justify-between gap-8 md:flex"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.5 }}
          variants={container}
        >
          {benefits.map((benefit: BenefitType) => (
            <Benefit
              key={benefit.title}
              icon={benefit.icon}
              title={benefit.title}
              description={benefit.description}
              setSelectedPage={setSelectedPage}
            />
          ))}
        </motion.div>

        <div className="mt-16 items-center justify-between gap-20 md:mt-28 md:flex">
          <img
            className="mx-auto"
            alt="benefits-page-graphic"
            src={Benefits_photo}
          />

          
          <div>
            <div className="relative">
              <div className="before:absolute before:-top-20 before:-left-20 before:z-[1] before:content-abstractwaves">
                <motion.div
                  initial="hidden"
                  whileInView="visible"
                  viewport={{ once: true, amount: 0.5 }}
                  transition={{ duration: 0.5 }}
                  variants={{
                    hidden: { opacity: 0, x: 50 },
                    visible: { opacity: 1, x: 0 },
                  }}
                >
                  <HText>
                    MILLIONS OF HAPPY MEMBERS GETTING{" "}
                    <span className="text-primary-500">FIT</span>
                  </HText>
                </motion.div>
              </div>
            </div>

          
            <motion.div
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, amount: 0.5 }}
              transition={{ duration: 0.5 }}
              variants={{
                hidden: { opacity: 0, x: 50 },
                visible: { opacity: 1, x: 0 },
              }}
            >
             <p className="my-5">
             At Flystudio, we are committed to providing an exceptional fitness experience tailored to your unique needs. Our state-of-the-art facilities offer a welcoming and energizing atmosphere, allowing you to focus on achieving your fitness goals. With a wide range of classes, from aerial silks to yoga, you can explore various disciplines that inspire and motivate you to stay active.
            </p>
            <p className="mb-5">
             Our team of highly qualified trainers is passionate about helping you succeed. They offer personalized guidance and support, ensuring you get the most out of each session. Whether you are a beginner or an experienced athlete, we foster a community that encourages growth, connection, and self-discovery. Join us and experience the difference that dedication and expertise can make on your fitness journey!
            </p>

            </motion.div>

      
            <div className="relative mt-16">
              <div className="before:absolute before:-bottom-20 before:right-40 before:z-[1] before:content-sparkles">
              <AnchorLink
              href="#ourclasses"
              className="rounded-md ml-96 bg-pink px-14 py-3 text-white hover:bg-pink"
              onClick={() => setSelectedPage(SelectedPage.ContactUs)}
            >
              Join Now
            </AnchorLink>
              </div>
            </div>
          </div>
        </div>
      </motion.div>
    </section>
  );
};

export default Benefits;
