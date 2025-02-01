"use client";

import Image from "next/image";
import Link from "next/link";
import type { StoryWrapper } from "@/utils/story-details/types/story-object";
import { Card, CardHeader, CardBody, CardFooter, Button } from "@heroui/react";

interface StoryItemCardProps {
  story: StoryWrapper;
}

export const StoryItemCard = ({ story }: StoryItemCardProps) => {
  return (
    <Link href={`/view-story/${story.storyId}`}>
      <Card
        isFooterBlurred
        className="w-full h-[300px] col-span-12 sm:col-span-5 transition-all duration-300 hover:scale-105 cursor-pointer"
      >
        <Image
          alt="Card example background"
          className="z-0 w-full h-full scale-125 -translate-y-6 object-cover"
          src={story?.coverImage ?? ""}
          width={500}
          height={500}
        />
        <CardFooter className="absolute bg-white/30 bottom-0 border-t-1 border-zinc-100/50 z-10 justify-between">
          <div>
            <p className="text-black text-xl">{story.output.storyTitle}</p>
          </div>
          <Button className="text-tiny" color="primary" radius="full" size="sm">
            Read now
          </Button>
        </CardFooter>
      </Card>
    </Link>
  );
};
