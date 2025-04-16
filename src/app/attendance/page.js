"use client";
import { useSearchParams, useRouter } from "next/navigation";
import { useState } from "react";

export default function AttendancePage() {
  const searchParams = useSearchParams();
  const router = useRouter();
  const code = searchParams.get("code"); // Extracts the code from the URL
  const [name, setName] = useState("");
  const [id, setId] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();

    const res = await fetch("http://localhost:5000/mark-attendance", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ id, name, code }),
    });

    if (res.ok) {
      router.push(`/success?name=${encodeURIComponent(name)}&code=${encodeURIComponent(code)}`);
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
        <p className="text-center text-gray-600 mb-6">
          Today's Date: {code}
        </p>
        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <label htmlFor="id" className="block text-lg font-medium text-gray-700 mb-1">
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
            <label htmlFor="name" className="block text-lg font-medium text-gray-700 mb-1">
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
