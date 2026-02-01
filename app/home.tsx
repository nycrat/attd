"use client";

import { useState, useCallback, useEffect } from "react";
import { Sidebar } from "../components/Sidebar";
import { SearchHeader } from "../components/SearchHeader";
import { Header } from "../components/Header";
import { MapPanel } from "../components/MapPanel";
import { CourseDetailsDrawer } from "../components/CourseDetailsDrawer";
import { Course, LiveClass } from "../lib/types";
import { useNow } from "@/components/NowProvider";
import { formatDatetime } from "@/lib/helpers";

export default function Home() {
  const [liveClasses, setLiveClasses] = useState<LiveClass[]>([]);
  const [allLiveClasses, setAllLiveClasses] = useState<LiveClass[]>([]);
  const [searchResults, setSearchResults] = useState<Course[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [isMapOpen, setIsMapOpen] = useState(false);
  const [selectedClass, setSelectedClass] = useState<LiveClass | null>(null);

  const { now } = useNow();

  useEffect(() => {
    setIsLoading(true);
    (async () => {
      if (!now) {
        return;
      }
      const res = await fetch(`/api/class/current?now=${formatDatetime(now)}`);
      const classes = await res.json();
      setLiveClasses(classes);
      setAllLiveClasses(classes); // store original unfiltered list
      setIsLoading(false);
    })();
  }, [now]);

  const handleSearch = useCallback(
    async (query: string) => {
      if (!query.trim() || !now) return;
      setIsLoading(true);

      try {
        const response = await fetch("/api/search", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ query, now: formatDatetime(now) }),
        });

        if (!response.ok) {
          const errorData = await response
            .json()
            .catch(() => ({ error: "Unknown error" }));
          console.error("Search API error:", errorData);
          throw new Error(
            errorData.error || errorData.details || "Search failed",
          );
        }

        const data = await response.json();
        if (data.results && data.results.length > 0) {
          setLiveClasses(data.results);
          setAllLiveClasses(data.results);
        }
      } catch (error) {
        console.error("Search error:", error);
      } finally {
        setIsLoading(false);
      }
    },
    [now],
  );

  const handleSelectClass = useCallback((item: LiveClass) => {
    setSelectedClass(item);
    setSearchResults([]); // clear search results when focusing on a specific class map location
  }, []);

  const handleBuildingClick = useCallback(
    (buildingCode: string, filteredClasses: LiveClass[]) => {
      setLiveClasses(filteredClasses);
      setSelectedClass(null);
    },
    [],
  );

  return (
    <div className="flex flex-col h-dvh w-full bg-background-dark text-white font-display overflow-hidden">
      <Header />

      <div className="flex flex-1 overflow-hidden ">
        {/* Sidebar - hidden on mobile */}
        <div className="sm:flex hidden w-[500px] border-r border-white/5 p-4">
          <Sidebar
            liveClasses={liveClasses}
            selectedClassId={selectedClass?.id}
            onSelectClass={handleSelectClass}
            isLoading={isLoading}
          />
        </div>

        {/* Desktop View */}
        <main className="flex-1 relative sm:flex flex-col hidden">
          {/* top Fixed Search Area */}
          <div className="w-full py-6 flex flex-col items-center bg-gradient-to-b from-background-dark to-transparent z-40">
            <SearchHeader onSearch={handleSearch} />
          </div>

          <div className="flex-1 flex flex-col overflow-hidden">
            {/* Map Area (Bottom) */}
            <div
              className={`flex-1 transition-all duration-700 ${searchResults.length > 0 ? "h-1/3 opacity-40" : "h-full opacity-100"}`}
            >
              <MapPanel
                selectedClass={selectedClass}
                liveClasses={allLiveClasses}
                onBuildingClick={handleBuildingClick}
              />
            </div>
          </div>

          {/* Course Details Bottom Drawer */}
          <CourseDetailsDrawer
            selectedClass={selectedClass}
            onClose={() => setSelectedClass(null)}
          />
        </main>

        {/* Mobile View */}
        <main className="flex-1 sm:hidden flex flex-col">
          {/* Mobile Search Header */}
          <div className="w-full p-4 pr-6 bg-gradient-to-b from-background-dark to-transparent z-40">
            <SearchHeader onSearch={handleSearch} />
          </div>

          {/* Mobile Sidebar Content */}
          <div className="flex-1 overflow-hidden max-w-screen px-4">
            <Sidebar
              liveClasses={liveClasses}
              selectedClassId={selectedClass?.id}
              onSelectClass={handleSelectClass}
              isLoading={isLoading}
            />
          </div>

          {/* Mobile Map Button */}
          <button
            onClick={() => setIsMapOpen(true)}
            className="fixed bottom-6 right-6 z-50 bg-blue-500 hover:bg-blue-600 text-white p-4 rounded-full shadow-lg transition-all duration-200 flex items-center justify-center"
          >
            <svg
              className="w-6 h-6"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M9 20l-5.447-2.724A1 1 0 013 16.382V5.618a1 1 0 011.447-.894L9 7m0 13l6-3m-6 3V7m6 10l4.553 2.276A1 1 0 0021 18.382V7.618a1 1 0 00-.553-.894L15 4m0 13V4m0 0L9 7"
              />
            </svg>
          </button>

          {/* Course Details Bottom Drawer */}
          <CourseDetailsDrawer
            selectedClass={selectedClass}
            onClose={() => setSelectedClass(null)}
          />
        </main>
      </div>

      {/* Mobile Map Modal */}
      {isMapOpen && (
        <div className="fixed inset-0 z-50 sm:hidden bg-background-dark">
          <div className="flex flex-col h-full">
            {/* Mobile Map Header */}
            <div className="flex items-center justify-between p-4 border-b border-white/10">
              <h2 className="text-lg font-semibold">Map View</h2>
              <button
                onClick={() => setIsMapOpen(false)}
                className="p-2 hover:bg-white/10 rounded-lg transition-colors"
              >
                <svg
                  className="w-6 h-6"
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

            {/* Mobile Map Content */}
            <div className="flex-1">
              <MapPanel
                selectedClass={selectedClass}
                liveClasses={allLiveClasses}
                onBuildingClick={(buildingCode, filteredClasses) => {
                  handleBuildingClick(buildingCode, filteredClasses);
                  setIsMapOpen(false);
                }}
              />
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
