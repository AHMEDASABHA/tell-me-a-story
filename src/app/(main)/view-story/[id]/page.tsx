import { getStoryById } from "@/app/action";
import FlipBook from "@/components/view-story/flipbook";

import type { Story } from "@/utils/story-details/schema/story-schema";
import type { StoryWrapper } from "@/utils/story-details/types/story-object";
import React from "react";
export default async function ViewStory({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const story = await getStoryById(id);
  const output = story?.output as Story;

  return (
    <div className="p-10 md:px-20 lg:px-40 bg-secondary flex flex-col justify-center items-center relative">
      <h2 className="text-4xl p-10 font-bold text-center bg-primary text-white self-stretch">
        {output?.storyTitle}
      </h2>

      <FlipBook story={story as StoryWrapper} />
    </div>
  );
}
