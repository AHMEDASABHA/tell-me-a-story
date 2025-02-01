import {
  text,
  pgTable,
  serial,
  varchar,
  json,
  integer,
} from "drizzle-orm/pg-core";

export const storyData = pgTable("story_data", {
  id: serial("id").primaryKey(),
  storyId: varchar("story_id"),
  storySubject: text("story_subject"),
  storyType: varchar("story_type"),
  storyAgeGroup: varchar("story_age_group"),
  storyImageStyle: varchar("story_image_style"),
  output: json("output"),
  coverImage: varchar("cover_image"),
  userEmail: varchar("user_email"),
  userName: varchar("user_name"),
  userImage: varchar("user_image"),
});

export const UserData = pgTable("user_data", {
  id: serial("id").primaryKey(),
  userEmail: varchar("user_email"),
  userName: varchar("user_name"),
  userImage: varchar("user_image"),
  credits: integer("credits").default(3),
});
