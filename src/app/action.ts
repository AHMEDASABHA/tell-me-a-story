// app/actions.ts
"use server";

import Replicate from "replicate";
import { db } from "@/db";
import {
  storySchema,
  type Story,
} from "@/utils/story-details/schema/story-schema";
import { google } from "@ai-sdk/google";
import { generateObject } from "ai";
import { v4 as uuid4 } from "uuid";
import { storyData } from "../db/schema";
import type { StoryImageStyle } from "@/utils/story-details/types/image-type";
import type { StoryAgeGroup } from "@/utils/story-details/types/story-age";
import type { StoryType } from "@/utils/story-details/types/story-type";
import { writeFile } from "node:fs/promises";
import { ID, storage } from "./appwrite";
import axios from "axios";

export async function generateStory(storyPrompt: string) {
  const model = google("gemini-2.0-flash-exp");

  try {
    const { object: story } = await generateObject({
      model: model,
      schema: storySchema,
      prompt: storyPrompt,
    });
    return story;
  } catch (error) {
    console.error(error);
  }
}

export async function saveInDB(
  story: Story,
  storyDetails: {
    storySubject: string;
    storyType: StoryType;
    imageStyle: StoryImageStyle;
    ageGroup: StoryAgeGroup;
  },
  storyCoverImage: {
    imageUrl: string;
  }
) {
  const recordID = uuid4();
  try {
    const result = await db
      .insert(storyData)
      .values({
        storyId: recordID,
        storySubject: story.storyTitle,
        storyType: storyDetails.storyType,
        storyAgeGroup: storyDetails.ageGroup,
        storyImageStyle: storyDetails.imageStyle,
        output: JSON.stringify(story),
        coverImage: storyCoverImage.imageUrl,
      })
      .returning({
        storyId: storyData.storyId,
      });
    return result;
  } catch (error) {
    console.error(error);
  }
}

export async function generateStoryImage(prompt: string) {
  const replicate = new Replicate({
    auth: process.env.REPLICATE_API_TOKEN,
  });

  const input = {
    prompt: prompt,
    go_fast: true,
    megapixels: "1",
    num_outputs: 1,
    aspect_ratio: "1:1",
    output_format: "png",
    output_quality: 80,
    num_inference_steps: 4,
  };

  // @ts-ignore
  const [output] = await replicate.run("black-forest-labs/flux-schnell", {
    input: input,
  });

  console.log(output?.url().href);
  convertImageToBase64(output?.url().href);
}

// export async function uploadImageToStorage(imageUrl: string) {
//   const base64 =
//     "data:image/png;base64," + (await convertImageToBase64(imageUrl));

//   const filename = `/ai-story/${Date.now()}.png`;
//   const file = new File([Buffer.from(base64, "base64")], filename, {
//     type: "image/png",
//   });

//   const promise = storage.createFile(
//     process.env.NEXT_PUBLIC_APPWRITE_BUCKET_ID!!,
//     ID.unique(),
//     file
//   );

//   promise.then(
//     function (response) {
//       console.log(response); // Success
//     },
//     function (error) {
//       console.log(error); // Failure
//     }
//   );
// }

export async function convertImageToBase64(imageUrl: string) {
  try {
    const response = await axios.get(imageUrl, { responseType: "arraybuffer" });
    const base64Image = Buffer.from(response.data).toString("base64");
    return base64Image;
  } catch (error) {
    console.error("Error fetching or converting image:", error);
  }
}
