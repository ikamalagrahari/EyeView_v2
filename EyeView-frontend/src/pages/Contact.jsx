import { FaEnvelope, FaPhoneAlt, FaMapMarkerAlt } from "react-icons/fa";
import { motion } from "framer-motion";

const fadeIn = {
  hidden: { opacity: 0, y: 30 },
  visible: (delay = 0) => ({
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.6,
      delay: delay * 0.2,
      ease: "easeOut",
    },
  }),
};

function Contact() {
  return (
    <div className="min-h-screen bg-(--color-richblack-900) text-white px-6 md:px-20 py-20">
      <motion.div
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.2 }}
        className="max-w-4xl mx-auto text-center"
      >
        <motion.h1
          className="text-4xl md:text-5xl font-bold mb-6 text-(--color-richblack-5)"
          variants={fadeIn}
          custom={1}
        >
          Contact Us
        </motion.h1>

        <motion.p
          className="text-(--color-richblack-100) mb-12 max-w-xl mx-auto"
          variants={fadeIn}
          custom={2}
        >
          Got a question, feedback, or partnership idea? Reach out to us and
          let’s connect. We’re always here to help.
        </motion.p>

        <div className="grid md:grid-cols-3 gap-8">
          {/* Email */}
          <motion.div
            className="bg-[#1F2A37] p-6 rounded-lg shadow-lg hover:shadow-[#2db8e6]/50 transition-all duration-300"
            variants={fadeIn}
            custom={3}
          >
            <FaEnvelope className="text-3xl text-[#2db8e6] mb-4 mx-auto" />
            <h3 className="text-xl font-semibold mb-2">Email</h3>
            <p className="text-(--color-richblack-100)">
              support@eyeview.ai
            </p>
          </motion.div>

          {/* Phone */}
          <motion.div
            className="bg-[#1F2A37] p-6 rounded-lg shadow-lg hover:shadow-[#2db8e6]/50 transition-all duration-300"
            variants={fadeIn}
            custom={4}
          >
            <FaPhoneAlt className="text-3xl text-[#2db8e6] mb-4 mx-auto" />
            <h3 className="text-xl font-semibold mb-2">Phone</h3>
            <p className="text-(--color-richblack-100)">
              +91 8355908097
            </p>
          </motion.div>

          {/* Location */}
          <motion.div
            className="bg-[#1F2A37] p-6 rounded-lg shadow-lg hover:shadow-[#2db8e6]/50 transition-all duration-300"
            variants={fadeIn}
            custom={5}
          >
            <FaMapMarkerAlt className="text-3xl text-[#2db8e6] mb-4 mx-auto" />
            <h3 className="text-xl font-semibold mb-2">Location</h3>
            <p className="text-(--color-richblack-100)">
              Mumbai, Maharashtra, India
            </p>
          </motion.div>
        </div>
      </motion.div>

      {/* Feedback Form */}
<motion.div
  className="mt-20 bg-[#1F2A37] p-8 rounded-lg shadow-lg max-w-3xl mx-auto"
  variants={fadeIn}
  custom={6}
>
  <h2 className="text-2xl font-bold mb-6 text-white">Send Us Your Feedback</h2>
  <form className="flex flex-col space-y-4">
    <input
      type="text"
      placeholder="Your Name"
      className="p-3 rounded-md bg-(--color-richblack-800) border border-gray-700 text-white focus:outline-hidden focus:ring-2 focus:ring-[#2db8e6]"
    />
    <input
      type="email"
      placeholder="Your Email"
      className="p-3 rounded-md bg-(--color-richblack-800) border border-gray-700 text-white focus:outline-hidden focus:ring-2 focus:ring-[#2db8e6]"
    />
    <textarea
      placeholder="Your Message"
      rows="5"
      className="p-3 rounded-md bg-(--color-richblack-800) border border-gray-700 text-white focus:outline-hidden focus:ring-2 focus:ring-[#2db8e6]"
    ></textarea>

    <motion.button
      type="submit"
      className="bg-[#2db8e6] text-white font-semibold py-3 px-6 rounded-md hover:bg-[#3A90AC] transition-all duration-300 w-fit self-end"
      whileHover={{ scale: 1.05 }}
      whileTap={{ scale: 0.95 }}
    >
      Submit Feedback
    </motion.button>
  </form>
</motion.div>
    </div>
    
  );
}

export default Contact;
