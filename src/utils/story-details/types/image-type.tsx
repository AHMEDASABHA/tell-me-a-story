import type { StaticImageData } from "next/image";
import ThreeDCartoon from "@/assets/images/3d.png";
import PaperCut from "@/assets/images/paper_cut.png";
import WaterColor from "@/assets/images/watercolor.png";
import PixelStyle from "@/assets/images/pixel.png";

export type StoryImageStyle =
  | "3D Cartoon"
  | "Paper Cut"
  | "Water Color"
  | "Pixel Style";

export const imageStyles: StoryImageStyle[] = [
  "3D Cartoon",
  "Paper Cut",
  "Water Color",
  "Pixel Style",
];

type IndividualStoryImageStyleOption = {
  label: StoryImageStyle;
  image: StaticImageData;
  isFree: boolean;
};

export const StoryImageStyleOptions: IndividualStoryImageStyleOption[] = [
  {
    label: "3D Cartoon",
    image: ThreeDCartoon,
    isFree: true,
  },
  {
    label: "Paper Cut",
    image: PaperCut,
    isFree: true,
  },
  {
    label: "Water Color",
    image: WaterColor,
    isFree: true,
  },
  {
    label: "Pixel Style",
    image: PixelStyle,
    isFree: true,
  },
];
