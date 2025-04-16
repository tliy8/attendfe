"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";

export default function AddUser() {
  const router = useRouter();
  const [users, setUsers] = useState([{ id: "", username: "" }]);

  // Handle input change
  const handleInputChange = (index, field, value) => {
    const newUsers = [...users];
    newUsers[index][field] = value;
    setUsers(newUsers);
  };

  // Add new empty input row
  const addUserRow = () => {
    setUsers([...users, { id: "", username: "" }]);
  };

  // Remove user row
  const removeUserRow = (index) => {
    if (users.length > 1) {
      setUsers(users.filter((_, i) => i !== index));
    }
  };

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();
    
    // Format data to match backend
    const formattedUsers = users.map(user => ({
      id: user.id,
      name: user.username, // Match the backend's "name" field
    }));
  
    try {
      const response = await fetch(`${process.env.NEXT_PUBLIC_LINK}/add-user`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formattedUsers),
      });
  
      if (response.ok) {
        alert("Users added successfully!");
        setUsers([{ id: "", username: "" }]); // Reset form
      } else {
        alert("Error adding users");
      }
    } catch (error) {
      console.error("Error:", error);
      alert("Failed to add users");
    }
  };
  

  return (
    <div className="min-h-screen bg-black flex items-center justify-center p-4
">
      <div className="bg-white bg-opacity-90 backdrop-filter backdrop-blur-lg rounded-lg shadow-xl p-8 w-full max-w-lg">
        <h1 className="text-3xl font-bold text-gray-800 text-center mb-6">Add Multiple Users</h1>

        <form onSubmit={handleSubmit} className="space-y-4">
          {users.map((user, index) => (
            <div key={index} className="flex space-x-2 items-center">
              {/* Username Input */}
              <input
              type="id"
              placeholder="ID"
              value={user.id}
              onChange={(e) => handleInputChange(index, "id", e.target.value)}
              className="flex-1 px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 text-gray-800"
              required
                
              />
              
              {/* Email Input */}
              <input
                type="text"
                placeholder="Username"
                value={user.username}
                onChange={(e) => handleInputChange(index, "username", e.target.value)}
                className="flex-1 px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 text-gray-800"
                required
              />

              {/* Remove Button (Only if more than 1 row) */}
              {users.length > 1 && (
                <button
                  type="button"
                  onClick={() => removeUserRow(index)}
                  className="bg-red-500 hover:bg-red-600 text-white px-3 py-2 rounded-lg"
                >
                  ✕
                </button>
              )}
            </div>
          ))}

          {/* Add More Users Button */}
          <button
            type="button"
            onClick={addUserRow}
            className="w-full py-2 px-4 bg-green-600 hover:bg-green-700 text-white font-semibold rounded-lg shadow-md transition"
          >
            + Add More Users
          </button>

          {/* Submit Button */}
          <button
            type="submit"
            className="w-full py-2 px-4 bg-indigo-600 hover:bg-indigo-700 text-white font-semibold rounded-lg shadow-md transition"
          >
            Submit Users
          </button>
        </form>

        {/* Back Button */}
        <button
          onClick={() => router.push("/admin")}
          className="mt-4 w-full py-2 px-4 bg-gray-300 hover:bg-gray-400 text-gray-800 font-semibold rounded-lg shadow-md transition"
        >
          Back to Admin Panel
        </button>
      </div>
    </div>
  );
}
