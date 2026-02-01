"use client";

import React, { MouseEventHandler, useState } from "react";
import { useNow } from "./NowProvider";

interface DateTimePickerProps {
  onDateTimeChange: (date: Date) => void;
}

export const DateTimePicker: React.FC<DateTimePickerProps> = ({
  onDateTimeChange,
}) => {
  const { now } = useNow();

  if (!now) {
    return null;
  }

  const [showModal, setShowModal] = useState(false);
  const [dateTime, setDateTime] = useState(now);

  const handleDateTimeSet = () => {
    onDateTimeChange(dateTime);
    setShowModal(false);
  };

  return (
    <>
      <button
        onClick={() => setShowModal(true)}
        className="text-gray-500 hover:text-white transition-colors p-1"
      >
        <span className="material-symbols-outlined text-xl sm:text-2xl">
          schedule
        </span>
      </button>

      {showModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm">
          <div className="bg-panel-dark border border-white/10 rounded-2xl p-6 w-11/12 max-w-sm mx-4">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-white font-semibold text-lg">
                Set Date & Time
              </h3>
            </div>

            <input
              type="datetime-local"
              onChange={(e) => setDateTime(new Date(e.target.value))}
              className="w-full bg-white/10 border border-white/20 rounded-xl px-4 py-3 text-white focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
              autoFocus
            />

            <div className="mt-4 flex gap-2">
              <button
                onClick={() => setShowModal(false)}
                className="flex-1 bg-white/10 hover:bg-white/20 text-white font-medium py-2 rounded-xl transition-colors"
              >
                Cancel
              </button>
              <button
                onClick={handleDateTimeSet}
                className="flex-1 bg-primary hover:bg-primary/80 text-white font-medium py-2 rounded-xl transition-colors"
              >
                Done
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
};
