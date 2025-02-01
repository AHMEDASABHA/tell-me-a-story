"use client";
import { getAllStories, getUserStories } from "@/app/action";
import type { StoryWrapper } from "@/utils/story-details/types/story-object";
import { useUser } from "@clerk/nextjs";
import { useEffect, useState } from "react";
import CustomLoader from "../create-story/custom-loader";
import { StoryItemCard } from "./story-item-card";
import { Button } from "@heroui/react";

export const StoriesList = () => {
  const [allStories, setAllStories] = useState<StoryWrapper[]>([]);
  const [offset, setOffset] = useState(0);
  const [isLoading, setIsLoading] = useState(false);

  const fetchAllStories = async (offset: number) => {
    setOffset(offset);
    setIsLoading(true);
    const allStories = await getAllStories(offset);
    setAllStories((prevStories) => [
      ...prevStories,
      ...(allStories as StoryWrapper[]),
    ]);
    setIsLoading(false);
  };

  useEffect(() => {
    fetchAllStories(0);
  }, []);

  return (
    <div>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-10 mt-10">
        {allStories &&
          allStories.map((story, index) => (
            <StoryItemCard key={story.id} story={story} />
          ))}
      </div>
      <div className="flex justify-center items-center mt-10">
        <Button color="primary" onPress={() => fetchAllStories(offset + 8)}>
          Load More
        </Button>
      </div>
      {isLoading && (
        <CustomLoader loadingText="Please wait... Viewing gallery..." />
      )}
    </div>
  );
};
