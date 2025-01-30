"use client";
import React, { createContext, useState, use } from "react";
import { StoryType, storyTypes } from "../types/story-type";
import { ageGroups, StoryAgeGroup } from "../types/story-age";
import { imageStyles, StoryImageStyle } from "../types/image-type";
import { parseAsString, parseAsStringLiteral, useQueryStates } from "nuqs";

export const StoryDetailsContext = createContext(
  {} as {
    storyDetails: {
      storySubject: string;
      storyType: StoryType;
      imageStyle: StoryImageStyle;
      ageGroup: StoryAgeGroup;
    };
    inputFields: () => {
      storySubject: (e: React.ChangeEvent<HTMLInputElement>) => void;
      storyType: (type: StoryType) => void;
      imageStyle: (style: StoryImageStyle) => void;
      ageGroup: (ageGroup: StoryAgeGroup) => void;
    };
  }
);

export const StoryDetailsProvider = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  const [storyDetails, setStoryDetails] = useQueryStates(
    {
      storySubject: parseAsString.withDefault(""),
      storyType: parseAsStringLiteral(storyTypes).withDefault("Story Book"),
      imageStyle: parseAsStringLiteral(imageStyles).withDefault("3D Cartoon"),
      ageGroup: parseAsStringLiteral(ageGroups).withDefault("0-2 years"),
    },
    {
      urlKeys: {
        storySubject: "subject",
        storyType: "type",
        imageStyle: "style",
        ageGroup: "age",
      },
    }
  );
  const inputFields = () => {
    return {
      storySubject: (e: React.ChangeEvent<HTMLInputElement>) => {
        setStoryDetails({
          ...storyDetails,
          storySubject: e.target.value,
        });
      },
      storyType: (type: StoryType) => {
        setStoryDetails({
          ...storyDetails,
          storyType: type,
        });
      },
      imageStyle: (style: StoryImageStyle) => {
        setStoryDetails({
          ...storyDetails,
          imageStyle: style,
        });
      },
      ageGroup: (ageGroup: StoryAgeGroup) => {
        setStoryDetails({
          ...storyDetails,
          ageGroup: ageGroup,
        });
      },
    };
  };

  return (
    <StoryDetailsContext value={{ storyDetails, inputFields }}>
      {children}
    </StoryDetailsContext>
  );
};
