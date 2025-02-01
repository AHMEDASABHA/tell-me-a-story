import { StoriesList } from "@/components/explore/stories-list";
import React from "react";

export default function ExplorePage() {
  return (
    <div className="min-h-screen p-10 md:px-20 lg:px-40">
      <h2 className="text-4xl font-bold text-center text-primary">
        Explore Stories
      </h2>
      <StoriesList />
    </div>
  );
}
