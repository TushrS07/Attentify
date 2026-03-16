"use client";

import { SidebarStudent } from "../../components/SidebarStudent";
import StudentName from "../../components/ProfileNameStudent";
import { useState } from "react";

export default function StudentTimetable() {
  const [userName] = useState("Yash");

  // Replace this URL with the actual uploaded image path from your backend or storage
  const timetableImageUrl = "/timetable.png";

  return (
    <div className="flex">
      <SidebarStudent />
      <div className="flex-1 min-h-screen bg-gray-50 mb-5">
        {/* Greeting Section */}
        <div className="mx-auto mb-6 mt-20 max-w-7xl">
          <div className="pt-10 px-6 md:px-16 mx-4 h-52 rounded-lg bg-gradient-to-r from-indigo-500 via-purple-500 to-purple-600">
            <h1 className="text-white text-3xl lg:text-5xl font-bold mb-2">
              Welcome, <StudentName/>!
            </h1>
            <p className="text-white text-sm lg:text-base">
              Here's your weekly class timetable — Uploaded by your teacher.
            </p>
          </div>
        </div>

        {/* Timetable Image Section */}
        <div className="max-w-7xl mx-auto px-4">
          <div className="bg-white rounded-lg shadow-md p-6">
            <h2 className="text-xl font-semibold mb-4">Your Timetable</h2>
            <div className="overflow-auto rounded border border-gray-200">
              <img
                src={timetableImageUrl}
                alt="Student Timetable"
                className="w-full object-contain rounded"
              />
            </div>
            <p className="mt-2 text-sm text-gray-500">
              (If the timetable doesn't appear, it might not have been uploaded yet.)
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
