"use client";

import React, { useState } from "react";
import { LiveClass, EmptyRoom } from "../lib/types";
import { LiveClassCard } from "./LiveClassCard";
import { EmptyRoomCard } from "./EmptyRoomCard";
import { getEnd, getLiveClassDatetime } from "@/lib/helpers";
import { useNow } from "./NowProvider";

interface SidebarProps {
  liveClasses: LiveClass[];
  selectedClassId?: string;
  onSelectClass: (item: LiveClass) => void;
  isLoading: boolean;
  viewMode: "liveClasses" | "emptyRooms";
  emptyRooms: EmptyRoom[];
  onSelectEmptyRoom?: (room: EmptyRoom) => void;
  selectedBuilding?: string | null;
  onClearBuildingFilter?: () => void;
}

export const Sidebar: React.FC<SidebarProps> = ({
  liveClasses,
  selectedClassId,
  onSelectClass,
  isLoading,
  viewMode,
  emptyRooms,
  onSelectEmptyRoom,
  selectedBuilding,
  onClearBuildingFilter,
}) => {
  const { now } = useNow();
  const [selectedRoomId, setSelectedRoomId] = useState<string | null>(null);

  if (!now) {
    return null;
  }

  const handleRoomSelect = (room: EmptyRoom) => {
    if (onSelectEmptyRoom) {
      onSelectEmptyRoom(room);
    }
    setSelectedRoomId(room.location);
  };

  if (viewMode === "emptyRooms") {
    return (
      <aside className="w-full h-full flex flex-col bg-background-dark/50 backdrop-blur-xl shrink-0">
        <div className="p-2 pb-4 hidden sm:block">
          <div className="flex items-center justify-between mb-1">
            <h1 className="text-white text-3xl font-bold tracking-tight">
              Empty Rooms
            </h1>
          </div>
          <p className="text-gray-500 text-sm font-medium uppercase tracking-widest">
            Available for 30+ minutes
          </p>
        </div>

        {selectedBuilding && (
          <div className="px-4 py-2 mx-4 mb-2 bg-primary/20 border border-primary/30 rounded-lg flex items-center justify-between">
            <span className="text-sm text-primary">
              Filtering: <strong>{selectedBuilding}</strong>
            </span>
            <button
              onClick={onClearBuildingFilter}
              className="text-gray-400 hover:text-white transition-colors"
            >
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
                  d="M6 18L18 6M6 6l12 12"
                />
              </svg>
            </button>
          </div>
        )}

        <div className="flex-1 overflow-y-auto space-y-4">
          {isLoading ? (
            <div className="flex flex-col items-center justify-center py-20 opacity-30">
              <span
                className={
                  "material-symbols-outlined text-gray-400 text-2xl animate-spin"
                }
              >
                progress_activity
              </span>
            </div>
          ) : emptyRooms.length > 0 ? (
            <section>
              <h2 className="px-4 mb-4 text-xs font-black text-gray-500 uppercase tracking-[0.2em] flex items-center gap-2">
                <span className="size-1.5 bg-purple-500 rounded-full"></span>
                Available Now
              </h2>
              <div className="space-y-3">
                {emptyRooms.map((room) => (
                  <EmptyRoomCard
                    key={room.location}
                    room={room}
                    isSelected={room.location === selectedRoomId}
                    onSelect={handleRoomSelect}
                  />
                ))}
              </div>
            </section>
          ) : (
            <div className="flex flex-col items-center justify-center py-20 opacity-30">
              <span className="material-symbols-outlined text-4xl mb-2">
                meeting_room
              </span>
              <p className="text-sm font-bold uppercase">
                No empty rooms found
              </p>
            </div>
          )}
        </div>
      </aside>
    );
  }

  const liveNow = liveClasses.filter((cls) => {
    const end = getEnd(cls, now);
    return now >= getLiveClassDatetime(cls, now) && now <= end;
  });

  const upcoming = liveClasses.filter(
    (cls) => getLiveClassDatetime(cls, now) > now,
  );

  const past = liveClasses.filter((cls) => {
    const end = getEnd(cls, now);
    return end < now;
  });

  return (
    <aside className="w-full h-full flex flex-col bg-background-dark/50 backdrop-blur-xl shrink-0">
      <div className="p-2 pb-4 hidden sm:block">
        <div className="flex items-center justify-between mb-1">
          <h1 className="text-white text-3xl font-bold tracking-tight">
            Today's Lectures to Attend
          </h1>
        </div>
        <p className="text-gray-500 text-sm font-medium uppercase tracking-widest">
          University of British Columbia
        </p>
      </div>

      <div className="flex-1 overflow-y-auto space-y-8">
        {isLoading ? (
          <div className="flex flex-col items-center justify-center py-20 opacity-30">
            <span
              className={
                "material-symbols-outlined text-gray-400 text-2xl animate-spin"
              }
            >
              progress_activity
            </span>
          </div>
        ) : (
          <>
            {liveNow.length > 0 && (
              <section>
                <h2 className="px-4 mb-4 text-xs font-black text-gray-500 uppercase tracking-[0.2em] flex items-center gap-2">
                  <span className="size-1.5 bg-primary rounded-full"></span>
                  Happening Now
                </h2>
                <div className="space-y-3">
                  {liveNow.map((item) => (
                    <LiveClassCard
                      key={item.id}
                      item={item}
                      isSelected={item.id === selectedClassId}
                      onSelect={onSelectClass}
                    />
                  ))}
                </div>
              </section>
            )}

            {upcoming.length > 0 && (
              <section>
                <div className="px-4 mb-4 flex items-center gap-4">
                  <h2 className="shrink-0 text-xs font-black text-gray-600 uppercase tracking-[0.2em]">
                    Upcoming
                  </h2>
                  <div className="h-[1px] w-full bg-white/5"></div>
                </div>
                <div className="space-y-3">
                  {upcoming.map((item) => (
                    <LiveClassCard
                      key={item.id}
                      item={item}
                      isSelected={item.id === selectedClassId}
                      onSelect={onSelectClass}
                    />
                  ))}
                </div>
              </section>
            )}

            {past.length > 0 && (
              <section>
                <div className="px-4 mb-4 flex items-center gap-4">
                  <h2 className="shrink-0 text-xs font-black text-gray-600 uppercase tracking-[0.2em]">
                    Past
                  </h2>
                  <div className="h-[1px] w-full bg-white/5"></div>
                </div>
                <div className="space-y-3">
                  {past.map((item) => (
                    <LiveClassCard
                      key={item.id}
                      item={item}
                      isSelected={item.id === selectedClassId}
                      onSelect={onSelectClass}
                    />
                  ))}
                </div>
              </section>
            )}

            {liveClasses.length === 0 && (
              <div className="flex flex-col items-center justify-center py-20 opacity-30">
                <span className="material-symbols-outlined text-4xl mb-2">
                  event_busy
                </span>
                <p className="text-sm font-bold uppercase">No classes today</p>
              </div>
            )}
          </>
        )}
      </div>
    </aside>
  );
};
