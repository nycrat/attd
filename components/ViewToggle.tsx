"use client";

import React from "react";

interface ViewToggleProps {
  viewMode: "liveClasses" | "emptyRooms";
  onToggle: (mode: "liveClasses" | "emptyRooms") => void;
}

export const ViewToggle: React.FC<ViewToggleProps> = ({
  viewMode,
  onToggle,
}) => {
  return (
    <div className="flex items-center w-fit m-auto gap-1 bg-white/5 p-1 rounded-lg">
      <button
        onClick={() => onToggle("liveClasses")}
        className={`px-3 py-1.5 rounded-md text-sm font-medium transition-all duration-200 ${
          viewMode === "liveClasses"
            ? "bg-primary text-white shadow-lg"
            : "text-gray-400 hover:text-white hover:bg-white/5"
        }`}
      >
        Live Classes
      </button>
      <button
        onClick={() => onToggle("emptyRooms")}
        className={`px-3 py-1.5 rounded-md text-sm font-medium transition-all duration-200 ${
          viewMode === "emptyRooms"
            ? "bg-primary text-white shadow-lg"
            : "text-gray-400 hover:text-white hover:bg-white/5"
        }`}
      >
        Empty Rooms
      </button>
    </div>
  );
};
