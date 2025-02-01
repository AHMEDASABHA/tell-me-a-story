import { z } from "zod";
export const storySchema = z.object({
  storyTitle: z.string(),
  coverImage: z.object({
    prompt: z.string(),
    style: z.string(),
  }),
  chapters: z.array(
    z.object({
      chapterNumber: z.number(),
      chapterTitle: z.string(),
      storyText: z.string(),
      image: z.object({
        prompt: z.string(),
        style: z.string(),
      }),
    })
  ),
});

export type Story = z.infer<typeof storySchema>;

export type StoryChapter = Story["chapters"][number];
