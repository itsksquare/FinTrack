"use client";

import { DreamProductCategories } from "@/utils/Utils";
import Image from "next/image";
import { ArrowRightIcon } from "@radix-ui/react-icons";
import { CheckCircle, SettingsIcon } from "lucide-react";
import { Progress } from "./ui/progress";
import Link from "next/link";

const HomeProfile = ({ session }) => {
  const dreamProduct = DreamProductCategories.find(
    (cat) => cat.key === session?.user.dreamProductType
  ).products.find((prod) => prod.key === session?.user.dreamProduct);

  return (
    <>
      <div className="flex flex-col w-full p-5">
        <div className="flex flex-row w-full justify-between mt-5">
          <div className="w-1/2">
            <p className="text-sm">Welcome back,</p>
            <p className="text-xl font-semibold">
              <Link href="/profile">{session?.user.name}</Link>
            </p>
          </div>
          <div className="flex flex-rw w-1/3 items-end justify-end">
            <Link href="/tiers">{session?.user.currentTier}</Link>
            <SettingsIcon className="w-6 h-6 ml-2" />
          </div>
        </div>
        <div className="flex flex-col text-center items-center mt-20">
          <h2 className="text-lg text-gray-300 font-semibold">
            Dream Product Selected
          </h2>
          <p className="text-4xl font-semibold my-4">{dreamProduct.name}</p>
          <p className="text-lg text-gray-300">
            {session?.user.currentTokens} Tokens Present
          </p>
          <Image
            src={dreamProduct.image}
            alt={dreamProduct.name}
            width={200}
            height={200}
            className="rounded-full mt-16"
          />
        </div>
        <div className="w-full flex flex-col items-center mt-5">
          <div className="w-full flex flex-row justify-center m-2">
            <Link href="/transaction">Scan</Link>&nbsp; / &nbsp;
            <button>Refresh</button>
          </div>
          <Progress
            value={session?.user.tierProgress}
            className="h-5 w-4/5 m-2"
          />
          <Link
            href="/spends"
            className="rounded-full py-3 m-5 gradient_btn flex flex-row justify-between"
          >
            <CheckCircle className="h-4 w-4 my-1 mx-3" />
            Track Spends
            <ArrowRightIcon className="h-4 w-4 my-1 mx-5" />
          </Link>
        </div>
      </div>
    </>
  );
};

export default HomeProfile;
