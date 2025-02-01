import React from "react";

export default function LastPage() {
  return (
    <div className="p-10 bg-primary text-white h-full">
      <h2 className="text-3xl font-bold">Thank you for reading!</h2>
      <p className="text-xl mt-3">
        We hope you enjoyed the story. If you have any feedback, please let us
        know.
      </p>
      <button className="bg-secondary text-primary px-5 py-2 rounded-lg mt-5 hover:bg-indigo-600 transition-all duration-300">
        Share your story
      </button>
    </div>
  );
}
