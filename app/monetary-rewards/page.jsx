"use client";

import { ArrowLeftIcon, ArrowRightIcon } from "@radix-ui/react-icons";
import { CheckCircle, DollarSign, SettingsIcon } from "lucide-react";
import { MonetaryRewardsList } from "@/utils/Utils";
import { useRouter } from "next/navigation";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";

const MonetaryRewards = () => {
  const router = useRouter();

  return (
    <>
      <div className="flex flex-col justify-between items-center p-5">
        <div className="w-full flex flex-row justify-between items-center">
          <button onClick={() => router.back()}>
            <ArrowLeftIcon className="h-5 w-5 m-2" />
          </button>
          <p className="text-xs text-gray-400">Rewards</p>
          <SettingsIcon className="h-5 w-5 m-2" />
        </div>
        <div className="w-full">
          <h2 className="text-center my-4">Monetary Rewards</h2>
          {MonetaryRewardsList.map((reward) => (
            <div
              key={reward.id}
              className="w-full flex flex-row justify-between items-center p-4 border-b border-gray-800 my-1"
            >
              <p>{reward.name}</p>
              <DollarSign className="w-5 h-5 m-1" />
            </div>
          ))}
        </div>
        <Dialog>
          <DialogTrigger className="w-full rounded-full py-3 m-5 gradient_btn flex flex-row justify-between">
            <CheckCircle className="h-4 w-4 my-1 ml-10" />
            Redeem Now!
            <ArrowRightIcon className="h-4 w-4 my-1 mr-10" />
          </DialogTrigger>
          <DialogContent className="w-4/5">
            <DialogHeader>
              <DialogTitle>Are you sure absolutely sure?</DialogTitle>
              <DialogDescription>
                This action cannot be undone. This will permanently delete your
                account and remove your data from our servers.
              </DialogDescription>
            </DialogHeader>
          </DialogContent>
        </Dialog>
      </div>
    </>
  );
};

export default MonetaryRewards;
