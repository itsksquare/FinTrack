"use client";

import {
  ArrowLeftIcon,
  StarFilledIcon,
  LockClosedIcon,
  LockOpen2Icon,
} from "@radix-ui/react-icons";
import { SettingsIcon } from "lucide-react";
import { TiersList, DreamProductCategories } from "@/utils/Utils";
import { useRouter } from "next/navigation";
import { useSession } from "next-auth/react";

const NonMonetaryRewards = () => {
  const { data: session } = useSession();
  const router = useRouter();

  if (!session) return null;

  return (
    <>
      <div className="flex flex-col justify-start items-center p-5 bg-[url('/background2.jpg')] bg-cover min-h-screen">
        <div className="w-full flex flex-row justify-between items-center">
          <button onClick={() => router.back()}>
            <ArrowLeftIcon className="h-5 w-5 m-2" />
          </button>
          <p className="text-xs text-gray-400">Rewards</p>
          <SettingsIcon className="h-5 w-5 m-2" />
        </div>
        <div className="w-full">
          <h2 className="text-center my-4">Non-Monetary Rewards</h2>
          {TiersList.map((tier) => (
            <div key={tier.id}>
              {tier.nonmonetaryRewards.map((reward) => (
                <div key={reward.id}>
                  {DreamProductCategories.find(
                    (category) => category.key === session.user.dreamProductType
                  ).type === reward.type ? (
                    <div
                      key={reward.id}
                      className="w-full flex flex-row justify-between items-center p-4 bg-gray-500/25 rounded-lg my-1"
                    >
                      <div className="flex flex-row items-center">
                        <StarFilledIcon className="w-5 h-5 m-1" />
                        <p>{reward.name}</p>
                      </div>
                      {tier.id <=
                      TiersList.find(
                        (tier) => tier.key === session.user.currentTier
                      ).id ? (
                        <LockOpen2Icon className="w-5 h-5 m-1" />
                      ) : (
                        <LockClosedIcon className="w-5 h-5 m-1" />
                      )}
                    </div>
                  ) : null}
                </div>
              ))}
            </div>
          ))}
        </div>
      </div>
    </>
  );
};

export default NonMonetaryRewards;
