"use client";
import { useEffect, useState } from "react";
import axios from "axios";
import { useRouter } from "next/navigation"; // Import useRouter

export default function Home() {
  const [qrCode, setQrCode] = useState("");
  const [absentees, setAbsentees] = useState([]);
  const router = useRouter(); // Initialize the router

  useEffect(() => {
    fetchQRCode();
    fetchAbsentees();
  }, []);

  // Get Daily QR Code from backend
  const fetchQRCode = async () => {
    try {
      const { data } = await axios.get("http://localhost:5000/generate-qr");
      setQrCode(data.qrCode);
    } catch (error) {
      console.error("Error fetching QR code:", error);
    }
  };

  // Get Absentees List from backend
  const fetchAbsentees = async () => {
    try {
      const { data } = await axios.get("http://localhost:5000/absentees");
      setAbsentees(data);
    } catch (error) {
      console.error("Error fetching absentees:", error);
    }
  };

  // Go to Admin Page
  const gotoadminpage = () => {
    router.push("/admin"); // Navigate to the admin page
  };

  return (
    <div className="min-h-screen bg-black flex items-center justify-center p-4">
      <div className="bg-white bg-opacity-80 backdrop-filter backdrop-blur-lg rounded-xl shadow-2xl p-8 w-full max-w-lg text-center">
        <h1 className="text-3xl font-bold text-gray-800 mb-4">
          Scan QR Code to Mark Attendance
        </h1>
        {qrCode ? (
          <img
            src={qrCode}
            alt="Daily QR Code"
            className="mx-auto my-4 max-w-xs border-4 border-gray-200 rounded-md shadow-lg"
          />
        ) : (
          <p className="text-gray-600">Loading QR Code...</p>
        )}
        <p className="text-gray-700 mt-4">
          Scan this QR code to mark your attendance.
        </p>
        <button
          onClick={gotoadminpage}
          className="mt-4 w-full py-2 px-4 bg-green-600 hover:bg-green-700 text-white font-semibold rounded-lg shadow-md focus:outline-none focus:ring-2 focus:ring-green-500 transition"
        >
          Go to Admin Page
        </button>
      </div>
    </div>
  );
}
