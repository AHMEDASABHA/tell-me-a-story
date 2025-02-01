"use client";
import { useRef, useState, useEffect } from "react";
import HTMLFlipBook from "react-pageflip";
import BookCoverPage from "./book-cover-page";
import type { StoryWrapper } from "@/utils/story-details/types/story-object";
import StoryPage from "./story-page";
import LastPage from "./last-page";
import {
  IoIosArrowDroprightCircle,
  IoIosArrowDropleftCircle,
} from "react-icons/io";

export default function FlipBook({ story }: { story: StoryWrapper }) {
  const book = useRef<any>(null);
  const [page, setPage] = useState(0);

  const totalPages = story?.output?.chapters.length + 2; // +2 for cover and last page

  const nextPage = () => {
    if (book.current && page < totalPages - 2) {
      book.current.pageFlip().flipNext();
      setPage((prevPage) => prevPage + 2);
    }
  };

  const prevPage = () => {
    if (book.current && page > 0) {
      book.current.pageFlip().flipPrev();
      setPage((prevPage) => prevPage - 2);
    }
  };

  useEffect(() => {
    const handleResize = () => {
      if (book.current) {
        book.current.pageFlip().updateFromState();
      }
    };

    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  return (
    <div className="relative w-full max-w-5xl mx-auto px-4">
      {/* @ts-expect-error */}
      <HTMLFlipBook
        ref={book}
        showCover={true}
        className="mt-10"
        width={300}
        height={400}
        size="stretch"
        minWidth={250}
        maxWidth={550}
        minHeight={350}
        maxHeight={800}
        drawShadow={true}
        flippingTime={1000}
        useMouseEvents={false}
        startPage={0}
        usePortrait={false}
        startZIndex={0}
        autoSize={true}
        maxShadowOpacity={0.5}
        showPageCorners={true}
        disableFlipByClick={false}
        onFlip={(e) => setPage(e.data)}
      >
        <div className="page">
          <BookCoverPage imageUrl={story?.coverImage as string} />
        </div>
        {[...Array(story?.output?.chapters.length)].map((_, index) => (
          <div
            key={index}
            className="page border p-2 sm:p-4 md:p-6 lg:p-8 bg-white text-sm sm:text-base"
          >
            <StoryPage chapter={story?.output?.chapters[index]} />
          </div>
        ))}
        <div className="page">
          <LastPage />
        </div>
      </HTMLFlipBook>

      <div className="absolute bottom-2 left-0 right-0 flex justify-between px-2 sm:px-4">
        <button
          onClick={prevPage}
          disabled={page === 0}
          className="text-4xl text-primary/90 hover:text-primary transition-colors disabled:opacity-50"
          aria-label="Previous page"
        >
          <IoIosArrowDropleftCircle />
        </button>
        <button
          onClick={nextPage}
          disabled={page >= totalPages - 2}
          className="text-4xl text-primary/90 hover:text-primary transition-colors disabled:opacity-50"
          aria-label="Next page"
        >
          <IoIosArrowDroprightCircle />
        </button>
      </div>
    </div>
  );
}
