"use client";

import React, { useState, useEffect, KeyboardEvent, useRef } from "react";
import { useNow } from "./NowProvider";

interface SearchHeaderProps {
  onSearch: (query: string) => void;
}

export const SearchHeader: React.FC<SearchHeaderProps> = ({ onSearch }) => {
  const [value, setValue] = useState("");
  const [isMobile, setIsMobile] = useState(false);
  const { setNow } = useNow();
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 640);
    };
    
    checkMobile();
    window.addEventListener('resize', checkMobile);
    
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  const handleKeyDown = (e: KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      onSearch(value);
    }
  };

  const handleButtonClick = () => {
    inputRef.current?.showPicker?.();
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setNow(new Date(e.target.value));
  };

  return (
    <div className="w-full max-w-5xl sm:px-6 flex items-center gap-4 sm:gap-6">
      <div className="relative group grow">
        <div className="absolute -inset-0.5 bg-gradient-to-r from-primary/20 to-primary/5 rounded-xl sm:rounded-2xl blur opacity-10 group-hover:opacity-20 transition duration-1000"></div>

        <div
          className={
            "relative bg-panel-dark/80 backdrop-blur-md border border-white/10 rounded-xl sm:rounded-2xl p-2 transition-all duration-300 group-hover:border-white/20"
          }
        >
          <div className="flex items-center gap-2 sm:gap-4 px-2 sm:px-4 py-2">
            <span
              className={"material-symbols-outlined text-gray-400 text-xl sm:text-2xl"}
            >
              auto_awesome
            </span>
            <input
              className="bg-transparent border-none focus:ring-0 text-sm sm:text-base font-medium text-white w-full placeholder-gray-600 font-display focus:outline-none h-6 leading-6 my-1"
              type="text"
              placeholder={isMobile ? "Search classes..." : "Ask about classes using natural language..."}
              value={value}
              onChange={(e) => setValue(e.target.value)}
              onKeyDown={handleKeyDown}
            />
            {value && (
              <button
                onClick={() => setValue("")}
                className="text-gray-500 hover:text-white transition-colors"
              >
                <span className="material-symbols-outlined text-sm">close</span>
              </button>
            )}
          </div>
        </div>
      </div>

      <button
        onClick={handleButtonClick}
        className="text-gray-500 hover:text-white transition-colors p-1"
      >
        <span className="material-symbols-outlined text-xl sm:text-2xl">settings</span>
      </button>

      <input
        type="datetime-local"
        ref={inputRef}
        onChange={handleChange}
        className="absolute right-0 top-22 invisible"
      />
    </div>
  );
};
