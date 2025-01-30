import { text, pgTable, serial, varchar, json } from "drizzle-orm/pg-core";

export const storyData = pgTable("story_data", {
  id: serial("id").primaryKey(),
  storyId: varchar("story_id"),
  storySubject: text("story_subject"),
  storyType: varchar("story_type"),
  storyAgeGroup: varchar("story_age_group"),
  storyImageStyle: varchar("story_image_style"),
  output: json("output"),
  coverImage: varchar("cover_image"),
});
