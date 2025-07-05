import React from "react";
import { Reel } from "../lib/reel-bst";

interface ReelPlayerProps {
  reel: Reel;
  onLike: (id: string) => void;
  onDislike?: (id: string) => void;
}

export const ReelPlayer: React.FC<ReelPlayerProps> = ({ reel, onLike, onDislike }) => {
  return (
    <div className="flex flex-col items-center justify-center h-full w-full">
      <video
        src={reel.videoUrl}
        controls
        autoPlay
        loop
        className="w-full max-h-[70vh] rounded-lg shadow-lg"
      />
      <div className="mt-4 text-center">
        <div className="font-bold text-lg mb-2">{reel.description}</div>
        <div className="text-xs text-gray-500 mb-2">
          {reel.keywords.join(", ")}
        </div>
        <div className="flex gap-2 justify-center">
          {onDislike && (
            <button
              className="bg-gray-700 text-white px-4 py-2 rounded-full font-semibold hover:bg-gray-800 transition order-1"
              onClick={() => onDislike(reel.id)}
            >
              👎 Dislike
            </button>
          )}
          <button
            className="bg-pink-500 text-white px-4 py-2 rounded-full font-semibold hover:bg-pink-600 transition order-2"
            onClick={() => onLike(reel.id)}
          >
            ❤️ Like ({reel.likes})
          </button>
        </div>
      </div>
    </div>
  );
};
