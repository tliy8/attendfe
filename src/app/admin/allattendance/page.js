"use client";
import { useEffect, useState } from "react";

export default function StudentTodayAttendancePage() {
  const [allStudents, setAllStudents] = useState([]);
  const [loading, setLoading] = useState(true);
  const [filterYear, setFilterYear] = useState("ALL");

  const today = new Date().toISOString().slice(0, 10); // Format: YYYY-MM-DD

  useEffect(() => {
    fetch(`${process.env.NEXT_PUBLIC_LINK}/students-history`)
      .then((res) => res.json())
      .then((data) => {
        // Store all students who attended today
        const attendedToday = data.filter((student) =>
          student.attendance.some((dateStr) => dateStr.startsWith(today))
        );
        setAllStudents(attendedToday);
        setLoading(false);
      })
      .catch((err) => {
        console.error("Error fetching students history:", err);
        setLoading(false);
      });
  }, []);

  if (loading) return <div className="text-white text-center mt-10">Loading...</div>;

  // Filter based on year
  const filteredStudents = allStudents.filter((student) =>
    filterYear === "ALL" ? true : student.year === filterYear
  );

  return (
    <div className="min-h-screen bg-black text-white p-6">
      <h1 className="text-3xl font-bold mb-6 text-center">🎉 Students Who Attended Today</h1>

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

      {filteredStudents.length === 0 ? (
        <p className="text-center text-gray-400">No students from {filterYear} have attended today.</p>
      ) : (
        <div className="space-y-4">
          {filteredStudents.map((student) => (
            <div
              key={student.id}
              className="bg-white text-black rounded-lg p-4 shadow-md"
            >
              <div className="text-lg font-semibold">
                {student.name.toUpperCase()} ({student.id})
              </div>
              <div className="text-sm text-gray-600">{student.year}</div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
