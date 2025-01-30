import { StaticImageData } from "next/image";
import StoryBook from "@/assets/images/story.png";
import BedStory from "@/assets/images/bedstory.png";
import Educational from "@/assets/images/educational.png";

type IndividualStoryTypeOption = {
  label: StoryType;
  image: StaticImageData;
  isFree: boolean;
};

export type StoryType = "Story Book" | "Bed Story" | "Educational";

export const storyTypes: StoryType[] = ["Story Book", "Bed Story", "Educational"];

export const StoryTypeOptions: IndividualStoryTypeOption[] = [
  {
    label: "Story Book",
    image: StoryBook,
    isFree: true,
  },
  {
    label: "Bed Story",
    image: BedStory,
    isFree: true,
  },
  {
    label: "Educational",
    image: Educational,
    isFree: true,
  },
];
