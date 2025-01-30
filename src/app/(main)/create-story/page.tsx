"use client";
import { generateStory, generateStoryImage, saveInDB } from "@/app/action";
import CustomLoader from "@/components/create-story/custom-loader";
import { StoryAgeGroup } from "@/components/create-story/story-age-group";
import { StoryImageStyle } from "@/components/create-story/story-image-style";
import { StorySubjectInput } from "@/components/create-story/story-subject";
import StoryType from "@/components/create-story/story-type";
import { AI_PROMPT } from "@/utils/constants";
import type { Story } from "@/utils/story-details/schema/story-schema";
import { StoryDetailsContext } from "@/utils/story-details/state/story-details-context-provider";
import { Button } from "@heroui/react";
import { use, useState } from "react";

export default function CreateStory() {
  const { storyDetails } = use(StoryDetailsContext);
  const [loading, setLoading] = useState(false);

  async function handleGeneratingStory() {
    setLoading(true);
    const storyPrompt = AI_PROMPT.replace("{ageGroup}", storyDetails.ageGroup)
      .replace("{storyType}", storyDetails.storyType)
      .replace("{storyImageStyle}", storyDetails.imageStyle)
      .replace("{storySubject}", storyDetails.storySubject);
    try {
      const story = await generateStory(storyPrompt);
      const storyCoverPrompt = `
      Add text with the title of the story: ${story?.storyTitle}
      in bold text for book cover, ${story?.coverImage.prompt}
      `;
      const storyCoverImage = await generateStoryImage(storyCoverPrompt);
      // const result = await saveInDB(story, storyDetails, storyCoverImage);
      // console.log(result);
      setLoading(false);
    } catch (e) {
      console.log(e);
      setLoading(false);
    }
  }

  return (
    <div className="p-10 md:px-20 lg:px-40 bg-secondary">
      <h1 className="text-7xl font-extrabold text-primary text-center">
        Create Story
      </h1>
      <p className="text-primary text-2xl text-center">
        Unlock your creativity with AI: Craft stories like never before. Let our
        AI bring your imagination to life, one story at a time.
      </p>

      <div className="grid grid-cols-1 md:grid-cols-2 mt-8 gap-4">
        <StorySubjectInput />
        <StoryType />
        <StoryAgeGroup />
        <StoryImageStyle />
      </div>
      <div className="flex justify-end">
        <Button
          color="primary"
          className="p-10 text-2xl"
          disabled={loading}
          onPress={handleGeneratingStory}
        >
          {loading ? "Generating..." : "Generate story"}
        </Button>
      </div>
      {loading && <CustomLoader />}
    </div>
  );
}
