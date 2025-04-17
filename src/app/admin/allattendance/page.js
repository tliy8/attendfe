"use client";
import { useEffect, useState } from "react";
import dynamic from "next/dynamic";

// Dynamically import react-calendar to avoid SSR issues
const Calendar = dynamic(() => import("react-calendar"), { ssr: false });

// Helper: convert ISO date string to 'YYYY-MM-DD'
const formatDate = (date) => date.slice(0, 10);

export default function StudentHistoryPage() {
  const [students, setStudents] = useState([]);
  const [loading, setLoading] = useState(true);
  const [filterYear, setFilterYear] = useState("ALL");

  useEffect(() => {
    fetch(`${process.env.NEXT_PUBLIC_LINK}/students-history`)
      .then((res) => res.json())
      .then((data) => {
        setStudents(data);
        setLoading(false);
      })
      .catch((err) => {
        console.error("Error fetching students history:", err);
        setLoading(false);
      });
  }, []);

  if (loading) return <div className="text-white text-center mt-10">Loading...</div>;

  // Filter based on selected year
  const filteredStudents = students.filter((student) =>
    filterYear === "ALL" ? true : student.year === filterYear
  );

  return (
    <div className="min-h-screen bg-black text-white p-6">
      <h1 className="text-3xl font-bold mb-4 text-center">Student Attendance History</h1>
      {/* Year Filter Radios */}
      <div className="flex justify-center space-x-6 mb-6">
        {["ALL", "Y1", "Y2", "Y3"].map((opt) => (
          <label key={opt} className="inline-flex items-center space-x-2 text-white">
            <input
              type="radio"
              name="filter-year"
              value={opt}
              checked={filterYear === opt}
              onChange={() => setFilterYear(opt)}
              className="form-radio h-4 w-4 text-blue-500"
            />
            <span>{opt}</span>
          </label>
        ))}
      </div>
      {/* Student Calendars */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {filteredStudents.map((student) => {
          const attendSet = new Set(student.attendance.map(formatDate));
          return (
            <div key={student.id} className="bg-white text-black rounded-lg p-4 shadow-md">
              <h2 className="text-xl font-semibold mb-2">
                {student.name.toUpperCase()} ({student.id})
              </h2>
              <Calendar
                className="border rounded-lg"
                showNeighboringMonth={false}         // hide days from adjacent months
                showFixedNumberOfWeeks={false}      // only the weeks in current month
                prevLabel="‹"
                nextLabel="›"
                tileClassName={({ date, view }) => {
                  if (view === "month") {
                    const dayString = date.toISOString().slice(0, 10);
                    return attendSet.has(dayString)
                      ? "bg-green-200 text-green-800 rounded-full"
                      : null;
                  }
                }}
              />
            </div>
          );
        })}
      </div>
    </div>
  );
}