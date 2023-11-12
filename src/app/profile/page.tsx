import Image from "next/image";
import { useState } from "react";
import { BsPencil } from "react-icons/bs";
import { getServerAuthSession } from "~/server/auth";
import Username from "../_components/profile/Username";

const profilePage = async () => {
  const session = await getServerAuthSession();

  return (
    <div className="flex h-full w-full flex-col  pt-20">
      <div className="h-1/5 w-full"></div>
      <div className="flex h-4/5 w-full flex-col items-center gap-4 rounded-t-full border-4 border-black bg-blue-50">
        <div className="flex h-40 w-40 -translate-y-[50%] items-center justify-center overflow-hidden rounded-full border-4 border-black">
          <Image
            src={session?.user.image ?? ""}
            alt="profile picture"
            height={300}
            width={300}
            priority
          />
        </div>
        {session?.user && <Username user={session?.user} />}
      </div>
    </div>
  );
};

export default profilePage;
