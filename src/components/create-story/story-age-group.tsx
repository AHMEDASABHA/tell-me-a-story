"use client";
import React, { use } from "react";
import { StoryAgeGroupOptions } from "@/utils/story-details/types/story-age";
import Image from "next/image";
import { StoryDetailsContext } from "@/utils/story-details/state/story-details-context-provider";
import { cn } from "@/utils/utils";

export function StoryAgeGroup() {
  const { storyDetails, inputFields } = use(StoryDetailsContext);
  return (
    <div>
      <label className="text-primary text-4xl font-bold">3- Age Group</label>
      <div className="grid grid-cols-3 mt-3 gap-5">
        {StoryAgeGroupOptions.map((option, index) => (
          <div
            key={index + option.label}
            className={cn(
              "relative grayscale hover:grayscale-0 cursor-pointer rounded-2xl p-2",
              storyDetails.ageGroup == option.label &&
                "grayscale-0 border-2 border-primary"
            )}
            onClick={() => {
              inputFields().ageGroup(option.label);
            }}
          >
            <Image
              src={option.image}
              alt={option.label as string}
              width={300}
              height={500}
              className="object-cover rounded-2xl h-[260px]"
            />
            <label className="absolute bottom-5 text-white text-2xl text-center w-full font-bold">
              {option.label}
            </label>
          </div>
        ))}
      </div>
    </div>
  );
}
