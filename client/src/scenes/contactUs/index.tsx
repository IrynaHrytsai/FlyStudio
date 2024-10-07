import { useForm } from "react-hook-form";
import { useState } from "react"; 
import { SelectedPage } from "@/shared/types";
import { motion } from "framer-motion";
import HText from "@/shared/HText";
import ContactImage from "@/assets/ContactUs_photo.jpg";

type Props = {
  setSelectedPage: (value: SelectedPage) => void;
};

const ContactUs = ({ setSelectedPage }: Props) => {
  const inputStyles = `mb-5 w-full rounded-lg bg-slate-200
  px-5 py-3 placeholder-slate-800`;

  const {
    register,
    handleSubmit,
    reset, 
    formState: { errors },
  } = useForm();

  const [message, setMessage] = useState<string | null>(null); 

  const onSubmit = async (data: any) => {
    try {
      const response = await fetch("http://localhost:5000/api/contact", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      });

      if (!response.ok) {
        throw new Error("Something went wrong");
      }

      const result = await response.json();
      console.log("Success:", result);

     
      setMessage("Your message has been successfully recorded. We will contact you soon!");
      reset(); 
    } catch (error) {
      console.error("Error:", error);
      
      setMessage("An error occurred. Please try again.");
    }
  };

  const contactImageSrc: string = ContactImage as unknown as string;

  return (
    <section id="contactus" className="mx-auto w-5/6 pt-24 pb-32">
      <motion.div
        onViewportEnter={() => setSelectedPage(SelectedPage.ContactUs)}
      >
       
        <motion.div
          className="md:w-3/5"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.5 }}
          transition={{ duration: 0.5 }}
          variants={{
            hidden: { opacity: 0, x: -50 },
            visible: { opacity: 1, x: 0 },
          }}
        >
          <HText>
          <span className="text-red-900">JOIN NOW</span> AND TRANSFORM YOUR LIFE
          </HText>
          <p className="my-5">
           Ready to take the first step towards a healthier, happier you? Our team at Flystudio is here to support you on your fitness journey.
            Whether you have questions about our classes, need assistance with registration, or want to learn more about our studio, we invite you to reach out.
          </p>

        </motion.div>

      
        <div className="mt-10 justify-between gap-8 md:flex">
          <motion.div
            className="mt-10 basis-3/5 md:mt-0"
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.5 }}
            transition={{ duration: 0.5 }}
            variants={{
              hidden: { opacity: 0, y: 50 },
              visible: { opacity: 1, y: 0 },
            }}
          >
            <form onSubmit={handleSubmit(onSubmit)}>
              <input
                className={inputStyles}
                type="text"
                placeholder="NAME"
                {...register("name", {
                  required: true,
                  maxLength: 100,
                })}
              />
              {errors.name && (
                <p className="mt-1 text-red-600">
                  {errors.name.type === "required" && "This field is required."}
                  {errors.name.type === "maxLength" &&
                    "Max length is 100 char."}
                </p>
              )}

              <input
                className={inputStyles}
                type="email"
                placeholder="EMAIL"
                {...register("email", {
                  required: true,
                  pattern: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                })}
              />
              {errors.email && (
                <p className="mt-1 text-red-600">
                  {errors.email.type === "required" &&
                    "This field is required."}
                  {errors.email.type === "pattern" && "Invalid email address."}
                </p>
              )}

              <textarea
                className={inputStyles}
                placeholder="MESSAGE"
                rows={4}
                cols={50}
                {...register("message", {
                  required: true,
                  maxLength: 2000,
                })}
              />
              {errors.message && (
                <p className="mt-1 text-red-600">
                  {errors.message.type === "required" &&
                    "This field is required."}
                  {errors.message.type === "maxLength" &&
                    "Max length is 2000 char."}
                </p>
              )}

              <button
                type="submit"
                className="mt-5 text-white rounded-lg bg-light-pink px-20 py-3 transition duration-500 hover:bg-pink"
              >
                SUBMIT
              </button>
            </form>

          
            {message && (
              <div className="mt-5 p-3 bg-green-100 text-green-700 border border-green-300 rounded">
                {message}
              </div>
            )}
          </motion.div>

          <motion.div
            className="relative mt-16 basis-2/5 md:mt-0"
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.5 }}
            transition={{ delay: 0.2, duration: 0.5 }}
            variants={{
              hidden: { opacity: 0, y: 50 },
              visible: { opacity: 1, y: 0 },
            }}
          >
            <div className="w-full -mt-40 before:absolute before:-bottom-20 before:-right-10 before:z-[-1] ">
              <img
                className="w-full rounded-lg"
                alt="contact-us-photo"
                src={contactImageSrc}
              />
            </div>
          </motion.div>
        </div>
      </motion.div>
    </section>
  );
};

export default ContactUs;
