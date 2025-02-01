import Image from "next/image";
import React from "react";

export default function BookCoverPage({ imageUrl }: { imageUrl: string }) {
  return (
    <div>
      <Image
        src={imageUrl}
        alt="Book Cover"
        width={700}
        height={700}
        className="w-full h-full"
      />
    </div>
  );
}
