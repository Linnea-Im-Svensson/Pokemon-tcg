"use client";

import { Rarity, ShopItem } from "@prisma/client";
import Image from "next/image";
import { useState } from "react";
import { api } from "~/trpc/react";
import Loading from "../utils/Loading";

type ItemInfo = {
  gameName: string;
  winValue: number;
};

const DashboardGamePreview = ({
  gameName,
  winValue,
  gameId,
}: {
  gameName: string;
  winValue: number;
  gameId: string;
}) => {
  const [editState, setEditState] = useState(false);
  const [gameInfo, setGameInfo] = useState<ItemInfo>({
    gameName: gameName,
    winValue: winValue,
  });
  const rarity = Rarity;
  const { mutate, isLoading } = api.dashboard.updateGame.useMutation();
  return (
    <div className="flex w-full items-center justify-between gap-4 rounded-lg border-2 border-black bg-white p-2">
      <Image
        src="/elements.webp"
        alt={gameName}
        height={100}
        width={100}
        priority
        className="h-auto w-14"
      />
      <div className="flex h-full w-full flex-col items-center justify-between">
        <div className="flex w-full items-center justify-between gap-2">
          <div className="flex flex-col items-start justify-center">
            <p>Name:</p>
            {editState ? (
              <input
                type="text"
                value={gameInfo.gameName}
                onChange={(e) =>
                  setGameInfo({ ...gameInfo, gameName: e.target.value })
                }
                className="w-full rounded-lg border-2 border-black p-1"
              />
            ) : (
              <p>{gameName}</p>
            )}
          </div>
          <div className="flex flex-col items-start justify-center">
            <p>Price:</p>
            {editState ? (
              <input
                type="number"
                value={gameInfo.winValue}
                onChange={(e) =>
                  setGameInfo({ ...gameInfo, winValue: +e.target.value })
                }
                className="w-20 rounded-lg border-2 border-black p-1"
              />
            ) : (
              <p>{gameInfo.winValue} pokécoins</p>
            )}
          </div>
        </div>
        {editState ? (
          <button
            className="flex h-10 w-full items-center justify-center rounded-lg bg-yellow-200 p-2 hover:bg-yellow-300"
            onClick={() => (
              mutate({
                name: gameInfo.gameName,
                winValue: gameInfo.winValue,
                itemId: gameId,
              }),
              setEditState(false)
            )}
          >
            {isLoading ? <Loading size="small" /> : "Save"}
          </button>
        ) : (
          <button
            className="h-10 w-full rounded-lg bg-yellow-200 p-2 hover:bg-yellow-300"
            onClick={() => setEditState(true)}
          >
            Edit
          </button>
        )}
      </div>
    </div>
  );
};

export default DashboardGamePreview;
