import { Link } from "react-router-dom";
import { motion } from "framer-motion";

const fadeUp = {
  hidden: { opacity: 0, y: 40 },
  visible: (i = 1) => ({
    opacity: 1,
    y: 0,
    transition: {
      delay: i * 0.2,
      duration: 0.6,
      ease: "easeOut",
    },
  }),
};

function Home({ isLoggedIn }) {
  return (
    <div className="min-h-screen bg-(--color-richblack-900) text-white px-6 md:px-20 pt-20">
      <motion.div
        className="max-w-6xl w-full flex flex-col items-start gap-6"
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.3 }}
      >
        {/* Heading */}
        <motion.div className="flex-1" variants={fadeUp} custom={1}>
          <h1 className="text-4xl md:text-6xl font-bold leading-tight text-(--color-richblack-5) mb-4">
            Real-Time Violence Detection <br />
            Powered by AI
          </h1>
        </motion.div>

        {/* Paragraph & Button */}
        <motion.div className="flex-1" variants={fadeUp} custom={2}>
          <p className="text-(--color-richblack-100) text-lg md:text-xl mb-8 max-w-xl">
            Stay one step ahead with <strong className="text-[#2db8e6]">EyeView</strong> — monitor live feeds,
            detect violent behavior, and send instant alerts to admins.
          </p>

          <Link to="/login">
            <motion.button
              className="bg-[#2db8e6] text-white text-lg px-8 py-3 rounded-lg font-semibold shadow-md hover:bg-[#3A90AC] transition-all duration-300"
              variants={fadeUp}
              custom={3}
            >
              Live Detection
            </motion.button>
          </Link>
        </motion.div>
      </motion.div>
    </div>
  );
}

export default Home;
