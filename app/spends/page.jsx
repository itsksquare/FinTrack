"use client";

import Link from "next/link";
import { ArrowLeftIcon } from "@radix-ui/react-icons";
import { SettingsIcon } from "lucide-react";
import { useSession } from "next-auth/react";
import {
  Chart,
  CategoryScale,
  ArcElement,
  LinearScale,
  PointElement,
  LineElement,
} from "chart.js";
import TransactionsChart from "@/components/TransactionsChart";
import CategoriesChart from "@/components/CategoriesChart";
Chart.register(CategoryScale);
Chart.register(ArcElement);
Chart.register(LinearScale);
Chart.register(PointElement);
Chart.register(LineElement);

const SpendsPage = () => {
  const { data: session } = useSession();

  const getTransactions = () => {
    let total = 0;

    session?.user.transactions.forEach((transaction) => {
      total += transaction.amount;
    });

    return total;
  };

  return (
    <>
      <div className="flex flex-col justify-between items-center p-5">
        <div className="w-full flex flex-row justify-between items-center">
          <Link href="/">
            <ArrowLeftIcon className="h-5 w-5 m-2" />
          </Link>
          <p className="text-xs text-gray-400">Track Spends</p>
          <SettingsIcon className="h-5 w-5 m-2" />
        </div>
        <div className="w-full flex flex-col my-5">
          <p className="text-sm text-gray-500">Your Current Expenses</p>
          {session?.user.transactions.length > 0 && (
            <h2 className="text-xl font-semibold">{getTransactions()}</h2>
          )}
        </div>
        {session?.user.transactions.length === 0 && (
          <>
            <div className="flex items-center justify-center">
              <h2 className="text-lg font-semibold">
                No Transactions Recorded
              </h2>
            </div>
          </>
        )}
        {session?.user.transactions.length > 0 && (
          <>
            <TransactionsChart transactions={session?.user.transactions} />
            <CategoriesChart transactions={session?.user.transactions} />
            <div className="w-full flex flex-col my-5 p-2 bg-gray-300/10 rounded-lg">
              <h2 className="text-lg p-1 font-semibold">Latest Transactions</h2>
              <div className="w-full flex flex-col mt-3 p-1 overflow-y-scroll">
                {session?.user.transactions
                  .reverse()
                  .map((transaction, index) => (
                    <div
                      key={index}
                      className="w-full flex flex-row justify-between items-center py-2 px-4 bg-gray-300/20 rounded-lg mb-2"
                    >
                      <div className="flex flex-col">
                        <p className="text-lg font-normal">
                          <Link href={`/spends/${transaction._id}`}>
                            {transaction.title}
                          </Link>
                        </p>
                        <p className="text-xs text-gray-400">
                          {new Date(transaction.date).toLocaleDateString()} |{" "}
                          {new Date(transaction.date).toLocaleTimeString()}
                        </p>
                      </div>
                      <h2 className="text-green-600 text-xl">
                        {transaction.amount}
                      </h2>
                    </div>
                  ))}
              </div>
            </div>
          </>
        )}
      </div>
    </>
  );
};

export default SpendsPage;
