"use client";

import { Rarity, ShopItem } from "@prisma/client";
import Image from "next/image";
import { useState } from "react";
import { api } from "~/trpc/react";
import Loading from "../utils/Loading";

type ItemInfo = {
  itemName: string;
  cost: number;
};

const DashboardItemPreview = ({
  itemName,
  cost,
  itemId,
}: {
  itemName: string;
  cost: number;
  itemId: string;
}) => {
  const [editState, setEditState] = useState(false);
  const [itemInfo, setItemInfo] = useState<ItemInfo>({
    itemName: itemName,
    cost: cost,
  });
  const rarity = Rarity;
  const { mutate, isLoading } = api.dashboard.updateShopItem.useMutation();
  return (
    <div className="flex w-full items-center justify-between gap-4 rounded-lg border-2 border-black bg-white p-2">
      <Image
        src="/pack.jpg"
        alt={itemName}
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
                value={itemInfo.itemName}
                onChange={(e) =>
                  setItemInfo({ ...itemInfo, itemName: e.target.value })
                }
                className="w-full rounded-lg border-2 border-black p-1"
              />
            ) : (
              <p>{itemName}</p>
            )}
          </div>
          <div className="flex flex-col items-start justify-center">
            <p>Cost:</p>
            {editState ? (
              <input
                type="number"
                value={itemInfo.cost}
                onChange={(e) =>
                  setItemInfo({ ...itemInfo, cost: +e.target.value })
                }
                className="w-20 rounded-lg border-2 border-black p-1"
              />
            ) : (
              <p>{itemInfo.cost}</p>
            )}
          </div>
        </div>
        {editState ? (
          <button
            className="flex h-10 w-full items-center justify-center rounded-lg bg-yellow-200 p-2 hover:bg-yellow-300"
            onClick={() => (
              mutate({
                name: itemInfo.itemName,
                cost: itemInfo.cost,
                itemId: itemId,
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

export default DashboardItemPreview;
