import type { StoryChapter } from "@/utils/story-details/schema/story-schema";
import React from "react";
import { MdPlayCircleFilled } from "react-icons/md";

export default function StoryPage({ chapter }: { chapter: StoryChapter }) {
  function playSpeech(text: string) {
    const synth = window?.speechSynthesis;
    const utterance = new SpeechSynthesisUtterance(text);
    synth?.speak(utterance);
  }

  return (
    <div>
      <h1 className="text-3xl font-bold text-primary flex justify-between items-center">
        {chapter.chapterTitle}
        <span>
          <MdPlayCircleFilled
            className="text-primary text-3xl cursor-pointer"
            onClick={() => {
              console.log(chapter.storyText);
              playSpeech(chapter.storyText);
            }}
          />
        </span>
      </h1>
      <p className="text-primary rounded-lg mt-5 px-10 p-5 bg-slate-100 text-2xl">
        {chapter.storyText}
      </p>
    </div>
  );
}
