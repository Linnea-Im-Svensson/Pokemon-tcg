"use client";

import Image from "next/image";
import { motion } from "framer-motion";

const loadingPage = () => {
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
          animate={{ opacity: 1 }}
          transition={{ duration: 0.2 }}
        >
          .
        </motion.span>
        <motion.span
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.2, delay: 0.2 }}
        >
          .
        </motion.span>
        <motion.span
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.2, delay: 0.4 }}
        >
          .
        </motion.span>
      </p>
    </div>
  );
};

export default loadingPage;
