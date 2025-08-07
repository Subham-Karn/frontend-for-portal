// src/pages/SearchPage.jsx
import React, { useState } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';

const BASE_URL = 'https://portal-server-v1.onrender.com/api'; // Update as needed

const SearchPage = () => {
  const [query, setQuery] = useState('');
  const [results, setResults] = useState([]);
  const [loading, setLoading] = useState(false);

  const handleSearch = async (e) => {
    e.preventDefault();
    if (!query.trim()) return;

    try {
      setLoading(true);
      const res = await axios.get(`${BASE_URL}/users/search?query=${query}`);
      setResults(res.data);
      setLoading(false);
    } catch (error) {
      console.error("Search error:", error.message);
      setLoading(false);
    }
  };

  return (
    <div className="max-w-2xl mx-auto p-4">
      <h2 className="text-xl font-bold mb-4">Search Users</h2>

      <form onSubmit={handleSearch} className="flex gap-2 mb-6">
        <input
          type="text"
          placeholder="Enter name or username"
          className="flex-1 border p-2 rounded"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
        />
        <button type="submit" className="bg-blue-600 text-white px-4 py-2 rounded">
          Search
        </button>
      </form>

      {loading && <p>Loading...</p>}

      <ul className="space-y-4">
        {results.map((user) => (
          <li key={user._id} className="flex items-center justify-between border p-3 rounded">
            <div className="flex items-center gap-4">
              <img
                src={user.profilePic || '/default-profile.png'}
                alt={user.username}
                className="w-12 h-12 rounded-full object-cover"
              />
              <div>
                <p className="font-medium">{user.name}</p>
                <p className="text-sm text-gray-500">@{user.username}</p>
              </div>
            </div>

            <Link to={`/profile/${user.username}`} className="text-blue-500 hover:underline">
              View Profile
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default SearchPage;
