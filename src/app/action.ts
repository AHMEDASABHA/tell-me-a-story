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
import { storyData, UserData } from "../db/schema";
import type { StoryImageStyle } from "@/utils/story-details/types/image-type";
import type { StoryAgeGroup } from "@/utils/story-details/types/story-age";
import type { StoryType } from "@/utils/story-details/types/story-type";
import ImageKit from "imagekit";
import { eq, desc } from "drizzle-orm";

import axios from "axios";
import { UserResource } from "@clerk/types";

const imagekit = new ImageKit({
  publicKey: process.env.NEXT_PUBLIC_IMAGEKIT_PUBLIC_KEY || "",
  privateKey: process.env.NEXT_PUBLIC_IMAGEKIT_PRIVATE_KEY || "",
  urlEndpoint: process.env.NEXT_PUBLIC_IMAGEKIT_URL_ENDPOINT || "",
});

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
  storyCoverImage: string,
  userDetails: {
    userEmail: string;
    userName: string;
    userImage: string;
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
        coverImage: storyCoverImage,
        userEmail: userDetails.userEmail,
        userName: userDetails.userName,
        userImage: userDetails.userImage,
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

  try {
    const [output]: any = await replicate.run(
      "black-forest-labs/flux-schnell",
      {
        input: input,
      }
    );
    const imageUrl = await uploadImageToStorage(output?.url().href);
    return { imageUrl };
  } catch (error) {
    console.error(error);
  }
}

export async function uploadImageToStorage(imageUrl: string) {
  const base64 =
    "data:image/png;base64," + (await convertImageToBase64(imageUrl));

  const filename = `/ai-story/${Date.now()}.png`;
  try {
    const response = await imagekit.upload({
      file: base64,
      fileName: filename,
    });
    return response.url;
  } catch (error) {
    return new Response("Image upload failed", { status: 500 });
  }
}

export async function convertImageToBase64(imageUrl: string) {
  try {
    const response = await axios.get(imageUrl, { responseType: "arraybuffer" });
    const base64Image = Buffer.from(response.data).toString("base64");
    return base64Image;
  } catch (error) {
    console.error("Error fetching or converting image:", error);
  }
}

export async function getStoryById(id: string) {
  const stories = await db
    .select()
    .from(storyData)
    .where(eq(storyData.storyId, id));
  return stories[0];
}

export async function getUserStories(email: string) {
  const stories = await db
    .select()
    .from(storyData)
    .where(eq(storyData.userEmail, email))
    .orderBy(desc(storyData.id));
  return stories;
}

export async function addUserToDatabaseIfNotExists({
  userEmail,
  userName,
  userImage,
}: {
  userEmail: string;
  userName: string;
  userImage: string;
}) {
  if (userEmail) {
    const userData = await db
      .select()
      .from(UserData)
      .where(eq(UserData.userEmail, userEmail));
    if (!userData[0]) {
      const newUserData = await db
        .insert(UserData)
        .values({
          userEmail: userEmail,
          userName: userName,
          userImage: userImage,
        })
        .returning({
          userEmail: UserData.userEmail,
          userName: UserData.userName,
          userImage: UserData.userImage,
          credits: UserData.credits,
        });
      return {
        userEmail: newUserData[0].userEmail,
        userName: newUserData[0].userName,
        userImage: newUserData[0].userImage,
        credits: newUserData[0].credits ?? 3,
      };
    } else {
      return {
        userEmail: userData[0].userEmail,
        userName: userData[0].userName,
        userImage: userData[0].userImage,
        credits: userData[0].credits ?? 3,
      };
    }
  }
}

export async function updateUserCredits(email: string, newCredits: number) {
  const result = db
    .update(UserData)
    .set({
      credits: newCredits,
    })
    .where(eq(UserData.userEmail, email))
    .returning({
      id: UserData.id,
      credits: UserData.credits,
    });
  return result;
}

export async function getAllStories(offset: number, limit: number = 8) {
  const stories = await db
    .select()
    .from(storyData)
    .orderBy(desc(storyData.id))
    .limit(limit)
    .offset(offset);
  return stories;
}
