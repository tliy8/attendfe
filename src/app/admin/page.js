"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";
import axios from "axios";

export default function Admin() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [token, setToken] = useState("");
  const [absentees, setAbsentees] = useState([]);
  const router = useRouter();

  const login = async () => {
    try {
      const { data } = await axios.post(`${process.env.NEXT_PUBLIC_LINK}/admin/login`, { username, password });
      setToken(data.token);
      fetchAbsentees();
    } catch (error) {
      console.error("Login error:", error);
      alert("Login failed");
    }
  };

  const fetchAbsentees = async () => {
    try {
      const { data } = await axios.get(`${process.env.NEXT_PUBLIC_LINK}/absentees`);
      setAbsentees(data);
    } catch (error) {
      console.error("Error fetching absentees:", error);
    }
  };

  return (
    <div className="min-h-screen bg-black flex items-center justify-center p-4">
      <div className="bg-white bg-opacity-90 backdrop-filter backdrop-blur-md rounded-xl shadow-lg p-8 w-full max-w-md text-center">
        <h1 className="text-3xl font-bold text-gray-800 mb-6">Admin Panel</h1>

        {!token ? (
          <div className="space-y-4">
            <input
              type="text"
              placeholder="Username"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 text-gray-800"
            />
            <input
              type="password"
              placeholder="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 text-gray-800"
            />
            <button
              onClick={login}
              className="w-full py-2 px-4 bg-blue-600 hover:bg-blue-700 text-white font-semibold rounded-lg shadow-md transition"
            >
              Login
            </button>
          </div>
        ) : (
          <div>
            <h2 className="text-2xl font-semibold text-gray-800 mb-4">Absentees List</h2>

            {absentees.length > 0 ? (
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {absentees.map((user) => (
                  <div key={user.id} className="border border-gray-300 rounded-lg p-4 shadow-md bg-gray-100">
                    <p className="text-lg font-semibold text-gray-800">ID: {user.id}</p>
                    <p className="text-gray-600">Name: {user.name}</p>
                  </div>
                ))}
              </div>
            ) : (
              <p className="text-gray-600">All attendees are present!</p>
            )}

            {/* Add User Button */}
            <button
              onClick={() => router.push("admin/adduser")}
              className="mt-4 w-full py-2 px-4 bg-green-600 hover:bg-green-700 text-white font-semibold rounded-lg shadow-md transition"
            >
              Add User
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
