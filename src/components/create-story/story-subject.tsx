"use client";
import { StoryDetailsContext } from "@/utils/story-details/state/story-details-context-provider";
import { Textarea } from "@heroui/react";
import React, { use } from "react";

export function StorySubjectInput() {
  const { storyDetails, inputFields } = use(StoryDetailsContext);
  return (
    <div>
      <label
        htmlFor="story-subject"
        className="text-primary text-4xl font-bold"
      >
        1- Subject of the Story
      </label>
      <Textarea
        className="max-w-lg mt-5"
        size="lg"
        id="story-subject"
        placeholder="Write the subject of the story you want to generate"
        value={storyDetails.storySubject}
        classNames={{
          input: "p-2 resize-y min-h-[230px] text-2xl font-bold",
        }}
        name="story-subject"
        onChange={(e) => {
          inputFields().storySubject(e);
        }}
      />
    </div>
  );
}
