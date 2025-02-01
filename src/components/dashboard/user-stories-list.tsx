"use client";
import { getUserStories } from "@/app/action";
import type { StoryWrapper } from "@/utils/story-details/types/story-object";
import { useUser } from "@clerk/nextjs";
import { useEffect, useState } from "react";
import { StoryItemCard } from "./story-item-card";
import CustomLoader from "../create-story/custom-loader";

export const UserStoriesList = () => {
  const { user } = useUser();

  const [userStories, setUserStories] = useState<StoryWrapper[]>([]);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    const fetchUserStories = async () => {
      setIsLoading(true);
      const userStories = await getUserStories(
        user?.primaryEmailAddress?.emailAddress ?? ""
      );
      setUserStories(userStories as StoryWrapper[]);
      setIsLoading(false);
    };
    user && fetchUserStories();
  }, [user]);

  return (
    <div>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-10 mt-10">
        {userStories &&
          userStories.map((userStory) => (
            <StoryItemCard key={userStory.id} story={userStory} />
          ))}
      </div>
      {isLoading && (
        <CustomLoader loadingText="Please wait... Viewing your stories..." />
      )}
    </div>
  );
};
