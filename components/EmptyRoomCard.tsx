"use client";

import React from "react";
import { EmptyRoom } from "../lib/types";

interface EmptyRoomCardProps {
  room: EmptyRoom;
  isSelected: boolean;
  onSelect: (room: EmptyRoom) => void;
}

export const EmptyRoomCard: React.FC<EmptyRoomCardProps> = ({
  room,
  isSelected,
  onSelect,
}) => {
  const formatMinutes = (mins: number) => {
    if (mins >= 60) {
      const hours = Math.floor(mins / 60);
      const remainingMins = mins % 60;
      return remainingMins > 0 ? `${hours}h ${remainingMins}m` : `${hours}h`;
    }
    return `${mins}m`;
  };

  return (
    <div
      onClick={() => onSelect(room)}
      className={`p-4 rounded-xl border transition-all duration-200 cursor-pointer ${
        isSelected
          ? "bg-primary/20 border-primary"
          : "bg-white/5 border-white/10 hover:bg-white/10 hover:border-white/20"
      }`}
    >
      <div className="flex items-start justify-between mb-2">
        <div>
          <h3 className="text-white font-bold text-lg">
            {room.buildingCode} {room.roomNumber}
          </h3>
          <p className="text-gray-400 text-sm">{room.location}</p>
        </div>
        <div className="flex flex-col items-end">
          <span className="text-primary font-bold text-xl">
            {formatMinutes(room.minutesAvailable)}
          </span>
          <span className="text-gray-500 text-xs uppercase tracking-wider">
            available
          </span>
        </div>
      </div>
      <div className="flex items-center gap-4 mt-3">
        <div className="flex items-center gap-1 text-gray-500 text-sm">
          <svg
            className="w-4 h-4"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z"
            />
          </svg>
          <span>{room.capacity}</span>
        </div>
        <div className="text-gray-600 text-sm">
          Until{" "}
          {new Date(room.availableUntil).toLocaleTimeString([], {
            hour: "2-digit",
            minute: "2-digit",
          })}
        </div>
      </div>
    </div>
  );
};
