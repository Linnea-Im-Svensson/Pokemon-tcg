"use client";

import { User } from "@prisma/client";
import { DefaultUser } from "next-auth";
import { useState } from "react";
import { BsPencil } from "react-icons/bs";
import { BiSolidSave } from "react-icons/bi";
import { api } from "~/trpc/react";

const Username = ({ user }: { user: User | DefaultUser }) => {
  const [username, setUsername] = useState<string>(user.name ?? "");
  const [showEdit, setShowEdit] = useState(false);
  const { mutate } = api.user.updateInfo.useMutation();

  return (
    <div className="relative flex items-center justify-center">
      {showEdit ? (
        <input
          type="text"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          className="rounded-lg p-2"
        />
      ) : (
        <div className=" text-3xl font-bold">{username}</div>
      )}
      <button
        className="absolute -right-10 top-0 p-2 text-lg"
        onClick={() =>
          showEdit
            ? (mutate({ name: username }), setShowEdit(!showEdit))
            : setShowEdit(!showEdit)
        }
      >
        {showEdit ? <BiSolidSave /> : <BsPencil />}
      </button>
    </div>
  );
};

export default Username;
