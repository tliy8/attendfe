"use client";
import { useEffect, useState } from "react";
import axios from "axios";

export default function UsersPage() {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [editingId, setEditingId] = useState(null);
  const [editName, setEditName] = useState("");
  const [editYear, setEditYear] = useState("");

  const fetchUsers = async () => {
    try {
      const { data } = await axios.get(`${process.env.NEXT_PUBLIC_LINK}/user`);
      setUsers(data.users);
    } catch (error) {
      console.error("Error fetching users:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchUsers();
  }, []);

  const handleDelete = async (id) => {
    if (!confirm("Are you sure you want to delete this user?")) return;
    try {
      await axios.delete(`${process.env.NEXT_PUBLIC_LINK}/user/${id}`);
      setUsers(users.filter(user => user._id !== id));
    } catch (error) {
      console.error("Error deleting user:", error);
    }
  };

  const startEdit = (user) => {
    setEditingId(user._id);
    setEditName(user.name);
    setEditYear(user.year);
  };

  const cancelEdit = () => {
    setEditingId(null);
    setEditName("");
    setEditYear("");
  };

  const saveEdit = async (id) => {
    if (!editName.trim() || !editYear) return;
    try {
      const { data: updatedUser } = await axios.put(
        `${process.env.NEXT_PUBLIC_LINK}/user/${id}`,
        {
          name: editName.toUpperCase(),
          year: editYear,
        }
      );
      setUsers(users.map(u => (u._id === id ? updatedUser : u)));
      cancelEdit();
    } catch (error) {
      console.error("Error updating user:", error);
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 p-6">
      <div className="max-w-4xl mx-auto bg-white rounded-xl shadow-md p-6">
        <h1 className="text-2xl font-bold mb-6 text-center text-gray-800">User List</h1>

        {loading ? (
          <p className="text-center text-gray-500">Loading users...</p>
        ) : users.length === 0 ? (
          <p className="text-center text-gray-500">No users found.</p>
        ) : (
          <div className="overflow-x-auto">
            <table className="min-w-full border border-gray-300">
              <thead>
                <tr className="bg-gray-200 text-gray-700">
                  <th className="py-2 px-4 border">No</th>
                  <th className="py-2 px-4 border">Name</th>
                  <th className="py-2 px-4 border">Year</th>
                  <th className="py-2 px-4 border">Actions</th>
                </tr>
              </thead>
              <tbody>
                {users.map((user, index) => (
                  <tr key={user._id} className="hover:bg-gray-100 transition duration-200">
                    <td className="py-2 px-4 border text-center">{index + 1}</td>
                    <td className="py-2 px-4 border">
                      {editingId === user._id ? (
                        <input
                          type="text"
                          value={editName}
                          onChange={(e) => setEditName(e.target.value.toUpperCase())}
                          className="w-full px-2 py-1 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
                        />
                      ) : (
                        user.name
                      )}
                    </td>
                    <td className="py-2 px-4 border">
                      {editingId === user._id ? (
                        <div className="flex space-x-4">
                          {['Y1', 'Y2', 'Y3'].map(opt => (
                            <label key={opt} className="inline-flex items-center space-x-1">
                              <input
                                type="radio"
                                name="year"
                                value={opt}
                                checked={editYear === opt}
                                onChange={() => setEditYear(opt)}
                                className="form-radio h-4 w-4 text-blue-600"
                              />
                              <span className="text-gray-800">{opt}</span>
                            </label>
                          ))}
                        </div>
                      ) : (
                        user.year
                      )}
                    </td>
                    <td className="py-2 px-4 border text-center space-x-2">
                      {editingId === user._id ? (
                        <>
                          <button
                            onClick={() => saveEdit(user._id)}
                            className="bg-green-500 text-white px-3 py-1 rounded hover:bg-green-600"
                          >
                            Save
                          </button>
                          <button
                            onClick={cancelEdit}
                            className="bg-gray-500 text-white px-3 py-1 rounded hover:bg-gray-600"
                          >
                            Cancel
                          </button>
                        </>
                      ) : (
                        <>
                          <button
                            onClick={() => startEdit(user)}
                            className="bg-blue-500 text-white px-3 py-1 rounded hover:bg-blue-600"
                          >
                            Edit
                          </button>
                          <button
                            onClick={() => handleDelete(user._id)}
                            className="bg-red-500 text-white px-3 py-1 rounded hover:bg-red-600"
                          >
                            Delete
                          </button>
                        </>
                      )}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  );
}
