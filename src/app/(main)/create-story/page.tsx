"use client";
import {
  generateStory,
  generateStoryImage,
  saveInDB,
  updateUserCredits,
} from "@/app/action";
import CustomLoader from "@/components/create-story/custom-loader";
import { StoryAgeGroup } from "@/components/create-story/story-age-group";
import { StoryImageStyle } from "@/components/create-story/story-image-style";
import { StorySubjectInput } from "@/components/create-story/story-subject";
import StoryType from "@/components/create-story/story-type";
import { AI_PROMPT } from "@/utils/constants";
import { StoryDetailsContext } from "@/utils/story-details/state/story-details-context-provider";
import { useUser } from "@clerk/nextjs";
import { Button } from "@heroui/react";
import { use, useState } from "react";
import { toast } from "react-toastify";
import { useRouter } from "next/navigation";
import { UserDetailsContext } from "@/utils/user/state/user-details.context";

export default function CreateStory() {
  const { storyDetails } = use(StoryDetailsContext);
  const [loading, setLoading] = useState(false);
  const { user } = useUser();
  const router = useRouter();
  const { userData, setUserData } = use(UserDetailsContext);

  const notify = (msg: string) => toast(msg);
  const notifyError = (msg: string) => toast.error(msg);

  async function handleGeneratingStory() {
    if (!userData) return;
    if (userData?.credits === 0) {
      notifyError("You have no credits left");
      return;
    }
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

      const result = await saveInDB(
        story!,
        storyDetails,
        storyCoverImage?.imageUrl as string,
        {
          userEmail: user?.primaryEmailAddress?.emailAddress ?? "",
          userName: user?.fullName ?? "",
          userImage: user?.imageUrl ?? "",
        }
      );
      console.log(result);
      await updateUserCredits(
        user?.primaryEmailAddress?.emailAddress ?? "",
        Number(userData?.credits) - 1
      );
      setUserData((prev) => {
        if (!prev) return null;
        return {
          ...prev,
          credits: Number(prev?.credits) - 1,
        };
      });
      notify("Story generated successfully");
      router.replace(`/view-story/${result?.[0].storyId}`);
      setLoading(false);
    } catch (e) {
      console.log(e);
      notifyError("Something went wrong");
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
      <div className="flex flex-col justify-end items-end gap-4">
        <Button
          color="primary"
          className="p-10 text-2xl"
          disabled={loading}
          onPress={handleGeneratingStory}
        >
          {loading ? "Generating..." : "Generate story"}
        </Button>
        <span className="text-primary text-sm mt-0">
          1 credit will be deducted from your account
        </span>
      </div>
      {loading && (
        <CustomLoader loadingText="Please wait... Generating story..." />
      )}
    </div>
  );
}
