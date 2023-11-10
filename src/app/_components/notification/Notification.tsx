"use client";

import Image from "next/image";
import { useEffect, useState } from "react";
import { AiOutlineBell } from "react-icons/ai";
import { AiFillBell } from "react-icons/ai";
import { api } from "~/trpc/react";

const Notification = () => {
  const notifications = api.notifications.getNotification.useQuery().data;
  const [newNotifications, setNewNotifications] = useState(0);
  const [showNotifications, setShowNotifications] = useState(false);
  const ctx = api.useUtils();
  const { mutate } = api.notifications.markAsRead.useMutation({
    onSuccess: () => {
      ctx.notifications.getNotification.invalidate();
    },
  });

  useEffect(() => {
    setNewNotifications(0);
    notifications?.forEach((note) => {
      note.read === false && setNewNotifications((prev) => prev + 1);
    });
  }, [notifications]);

  return (
    <div
      className="fixed bottom-4 right-4 z-10 h-16 w-16 cursor-pointer rounded-full bg-yellow-200 hover:bg-yellow-300"
      onClick={() => setShowNotifications((prev) => !prev)}
    >
      <div className="relative flex h-full w-full items-center justify-center ">
        {newNotifications > 0 ? (
          <AiFillBell size={40} className="text-red-500" />
        ) : (
          <AiOutlineBell size={40} />
        )}

        {newNotifications > 0 && (
          <div className="absolute -right-2 -top-2 flex h-8 w-8 items-center justify-center rounded-full bg-red-300 text-xl font-semibold">
            {newNotifications}
          </div>
        )}
        {showNotifications && (
          <div className="absolute -left-[235px] -top-[335px] h-[300px] w-[300px] cursor-default rounded-lg bg-yellow-200 p-2">
            {newNotifications === 0 ? (
              <p className="underline">No new notifications</p>
            ) : (
              <p className="text-center underline">New notifications</p>
            )}
            <ul className="flex flex-col gap-2 overflow-y-scroll py-2">
              {notifications?.map((note) => (
                <li
                  className="flex items-center justify-start gap-2 rounded-lg bg-white p-1 hover:bg-neutral-100"
                  onMouseEnter={() => mutate({ notificationId: note.id })}
                >
                  <Image
                    src={note.card.image}
                    alt={note.card.name}
                    height={50}
                    width={50}
                    priority
                  />
                  <div className="flex flex-col gap-2">
                    <p>{note.card.name}</p>
                    <p>Sold for {note.cost} pokécoins</p>
                  </div>
                </li>
              ))}
            </ul>
          </div>
        )}
      </div>
    </div>
  );
};

export default Notification;
