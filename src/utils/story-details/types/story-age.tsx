import type { StaticImageData } from "next/image";
import Age0to2 from "@/assets/images/02years.png";
import Age3to5 from "@/assets/images/35years.png";
import Age5to8 from "@/assets/images/58years.png";

export type StoryAgeGroup = "0-2 years" | "3-5 years" | "5-8 years";

export const ageGroups: StoryAgeGroup[] = [
  "0-2 years",
  "3-5 years",
  "5-8 years",
];

type IndividualStoryAgeGroupOption = {
  label: StoryAgeGroup;
  image: StaticImageData;
  isFree: boolean;
};

export const StoryAgeGroupOptions: IndividualStoryAgeGroupOption[] = [
  {
    label: "0-2 years",
    image: Age0to2,
    isFree: true,
  },
  {
    label: "3-5 years",
    image: Age3to5,
    isFree: true,
  },
  {
    label: "5-8 years",
    image: Age5to8,
    isFree: true,
  },
];
