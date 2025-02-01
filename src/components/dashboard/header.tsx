"use client";
import React, { use } from "react";
import CoinIcon from "@/assets/images/coin.png";
import Image from "next/image";
import { UserDetailsContext } from "@/utils/user/state/user-details.context";
import Link from "next/link";
import { Button } from "@heroui/react";

export function DashboardHeader() {
  const { userData } = use(UserDetailsContext);
  return (
    <div className="p-7 bg-primary text-white flex justify-between items-center">
      <h2 className="text-3xl font-bold text-white">My Stories</h2>
      <div className="gap-3 flex items-center">
        <Image src={CoinIcon} alt="coin" width={60} height={60} />
        <p className="text-xl font-bold">{userData?.credits} Credits Left</p>
        <Link href="/buy-credits">
          <Button className="bg-blue-500 text-white">Buy Credits</Button>
        </Link>
      </div>
    </div>
  );
}
