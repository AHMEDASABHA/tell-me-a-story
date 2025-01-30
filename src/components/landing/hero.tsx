import Image from "next/image";
import React from "react";
import heroImage from "../../assets/images/hero.png";
import { Button } from "@heroui/button";
import Link from "next/link";

export function Hero() {
  return (
    <div className="h-svh bg-secondary px-10 md:px-28 lg:px-44 py-10">
      <div className="grid grid-cols-1 md:grid-cols-2 items-center">
        <div className="text-primary mx-2 text-wrap">
          <p className="text-7xl leading-[1.5] font-extrabold py-10">
            Craft Magical stories for kids in minutes
          </p>

          <p className="font-light text-2xl mb-10">
            Create fun and personalized stories that bring your child's
            adventures to life and spark their passion for reading. It only
            takes a few seconds.
          </p>

          <Button
            as={Link}
            href="/create-story"
            color="primary"
            className="text-3xl p-8"
            size="lg"
          >
            Create story
          </Button>
        </div>
        <div className="self-center">
          <Image src={heroImage} alt="Hero" />
        </div>
      </div>
    </div>
  );
}
