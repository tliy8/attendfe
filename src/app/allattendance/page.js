"use client";
import { useEffect, useState } from "react";

export default function StudentHistoryPage() {
  const [students, setStudents] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch(`${process.env.NEXT_PUBLIC_LINK}/students-history`)
      .then((res) => res.json())
      .then((data) => {
        setStudents(data);
        setLoading(false);
      });
  }, []);

  if (loading) return <div className="text-white text-center mt-10">Loading...</div>;

  return (
    <div className="min-h-screen bg-black text-white p-6">
      <h1 className="text-3xl font-bold mb-6 text-center">Student Attendance History</h1>
      <div className="space-y-6">
        {students.map((student) => (
          <div key={student.id} className="bg-white text-black rounded-lg p-4 shadow-md">
            <h2 className="text-xl font-semibold">{student.name} ({student.id})</h2>
            <p className="text-sm mt-2">Attendance Dates:</p>
            <ul className="list-disc list-inside">
              {student.attendance.length > 0 ? (
                student.attendance.map((date, idx) => (
                  <li key={idx}>{date}</li>
                ))
              ) : (
                <li>No attendance records found.</li>
              )}
            </ul>
          </div>
        ))}
      </div>
    </div>
  );
}
