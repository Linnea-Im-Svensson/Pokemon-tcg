import Image from "next/image";

const loadingPage = () => {
  return (
    <div className="relative right-0 top-0 flex h-screen w-screen items-center justify-center">
      <Image
        src="/pikachu-loading.gif"
        alt="loading gif"
        height={300}
        width={300}
      />
    </div>
  );
};

export default loadingPage;
