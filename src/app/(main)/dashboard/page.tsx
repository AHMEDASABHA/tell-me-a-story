import { DashboardHeader } from "@/components/dashboard/header";
import { UserStoriesList } from "@/components/dashboard/user-stories-list";
import React from "react";

export default function Dashboard() {
  return (
    <div className="bg-secondary p-10 md:px-20 lg:px-40">
      <DashboardHeader />
      <UserStoriesList />
    </div>
  );
}
