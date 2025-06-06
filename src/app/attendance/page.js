"use client";
import React, { Suspense, useState } from "react";
import { useSearchParams, useRouter } from "next/navigation";

function AttendancePageContent() {
  const searchParams = useSearchParams();
  const router = useRouter();
  const code = searchParams.get("code");

  const [name, setName] = useState("");
  const [id, setId] = useState("");
  const [year, setYear] = useState("Y1"); // default value

  const handleSubmit = async (e) => {
    e.preventDefault();

    const res = await fetch(`${process.env.NEXT_PUBLIC_LINK}/mark-attendance`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ id, name, code, year }), // include year
    });

    if (res.ok) {
      router.push(
        `/success?name=${encodeURIComponent(name)}&code=${encodeURIComponent(
          code
        )}`
      );
    } else {
      alert("❌ Error marking attendance.");
    }
  };

  return (
    <div className="min-h-screen bg-black flex items-center justify-center p-4">
      <div className="bg-white bg-opacity-80 backdrop-filter backdrop-blur-lg rounded-xl shadow-2xl p-8 w-full max-w-md">
        <h2 className="text-3xl font-bold text-center text-gray-800 mb-6">
          Mark Attendance
        </h2>
        <p className="text-center text-gray-600 mb-6">Today's Code: {code}</p>
        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <label
              htmlFor="id"
              className="block text-lg font-medium text-gray-700 mb-1"
            >
              Your ID
            </label>
            <input
              type="text"
              id="id"
              placeholder="Enter your ID"
              value={id}
              onChange={(e) => setId(e.target.value)}
              required
              className="w-full px-4 py-2 border border-gray-300 rounded-lg text-black focus:outline-none focus:ring-2 focus:ring-blue-500 transition"
            />
          </div>
          <div>
            <label
              htmlFor="name"
              className="block text-lg font-medium text-gray-700 mb-1"
            >
              Your Name
            </label>
            <input
              type="text"
              id="name"
              placeholder="Enter your name"
              value={name}
              onChange={(e) => setName(e.target.value.toUpperCase())}
              required
              className="w-full px-4 py-2 border border-gray-300 rounded-lg text-black focus:outline-none focus:ring-2 focus:ring-blue-500 transition"
            />
          </div>

          {/* Radio buttons for year */}
          <div>
            <label className="block text-lg font-medium text-gray-700 mb-2">
              Year
            </label>
            <div className="flex space-x-4">
              {["Y1", "Y2", "Y3"].map((y) => (
                <label key={y} className="inline-flex items-center">
                  <input
                    type="radio"
                    name="year"
                    value={y}
                    checked={year === y}
                    onChange={(e) => setYear(e.target.value)}
                    className="form-radio h-5 w-5 text-blue-600"
                  />
                  <span className="ml-2 text-gray-700">{y}</span>
                </label>
              ))}
            </div>
          </div>

          <button
            type="submit"
            className="w-full py-2 px-4 bg-blue-600 hover:bg-blue-700 text-white font-semibold rounded-lg shadow-md focus:outline-none focus:ring-2 focus:ring-blue-500 transition"
          >
            Submit
          </button>
        </form>
      </div>
    </div>
  );
}

export default function AttendancePage() {
  return (
    <Suspense fallback={<div>Loading attendance page...</div>}>
      <AttendancePageContent />
    </Suspense>
  );
}
