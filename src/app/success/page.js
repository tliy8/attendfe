"use client";
import { useSearchParams, useRouter } from "next/navigation";

export default function SuccessPage() {
  const searchParams = useSearchParams();
  const router = useRouter();
  const name = searchParams.get("name") || "User";
  const code = searchParams.get("code") || "Unknown Date";

  return (
    <div className="min-h-screen bg-black flex items-center justify-center p-4">
      <div className="bg-white bg-opacity-80 backdrop-filter backdrop-blur-lg rounded-xl shadow-2xl p-8 w-full max-w-md text-center">
        <h2 className="text-3xl font-bold text-gray-800 mb-4">
          ✅ Attendance Recorded Successfully!
        </h2>
        <p className="text-lg text-gray-700 mb-6">
          Thank you, {name}. Your attendance for {code} has been marked.
        </p>
      </div>
    </div>
  );
}
