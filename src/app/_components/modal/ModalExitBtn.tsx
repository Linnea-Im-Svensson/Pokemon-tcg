"use client";

import { useRouter } from "next/navigation";

const ModalExitBtn = () => {
  const router = useRouter();
  return (
    <button
      onClick={() => router.back()}
      className="font absolute -right-2 top-4 z-20 h-14 w-14 rounded-full bg-white font-semibold md:-right-10"
    >
      X
    </button>
  );
};

export default ModalExitBtn;
