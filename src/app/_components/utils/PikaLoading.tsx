import Image from "next/image";
import { motion } from "framer-motion";

const PikaLoading = () => {
  return (
    <div className="relative right-0 top-0 flex h-screen w-screen flex-col items-center justify-center gap-4">
      <Image
        src="/pikachu-loading.gif"
        alt="loading gif"
        height={300}
        width={300}
      />
      <p className="text-3xl font-semibold">
        Loading{" "}
        <motion.span
          initial={{ opacity: 0 }}
          animate={{ opacity: [1, 0] }}
          transition={{ duration: 1.5, repeat: 10, repeatDelay: 0.5 }}
        >
          .
        </motion.span>
        <motion.span
          initial={{ opacity: 0 }}
          animate={{ opacity: [1, 0] }}
          transition={{
            duration: 1.5,
            delay: 0.2,
            repeat: 10,
            repeatDelay: 0.5,
          }}
        >
          .
        </motion.span>
        <motion.span
          initial={{ opacity: 0 }}
          animate={{ opacity: [1, 0] }}
          transition={{
            duration: 1.5,
            delay: 0.4,
            repeat: 10,
            repeatDelay: 0.5,
          }}
        >
          .
        </motion.span>
      </p>
    </div>
  );
};

export default PikaLoading;
