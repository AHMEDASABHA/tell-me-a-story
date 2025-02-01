import type { Story } from "../schema/story-schema";

export type StoryWrapper = {
  id: number;
  storyId: string | null;
  storySubject: string | null;
  storyType: string | null;
  storyAgeGroup: string | null;
  storyImageStyle: string | null;
  output: Story;
  coverImage: string | null;
  userEmail: string | null;
  userName: string | null;
  userImage: string | null;
};
