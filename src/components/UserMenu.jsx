import { User } from 'lucide-react';
import { Button } from '../lib/motion'; // Adjust if needed
import { useNavigate } from 'react-router-dom';

const UserMenu = ({ user, handleLogout, setIsOpen }) => {
  const navigate = useNavigate();

  const getImageSrc = (image) => {
    if (!image) return null;
    if (image.startsWith('http')) return image;
    return `https://portal-server-v1.onrender.com/uploads/${image}`;
  };

  return (
    <div className="p-5 rounded-xl bg-white shadow-xl w-72 space-y-4">
      {/* Avatar */}
      <div className="flex justify-center">
        {user?.image ? (
          <img
            src={getImageSrc(user.image)}
            alt={user.name}
            className="w-20 h-20 rounded-full object-cover border border-gray-300 shadow"
          />
        ) : (
          <div className="w-20 h-20 flex items-center justify-center bg-gray-200 rounded-full border shadow">
            <User size={32} className="text-gray-500" />
          </div>
        )}
      </div>

      {/* User Info */}
      <div className="text-center space-y-1">
        <h1 className="text-lg font-bold uppercase text-gray-700">
          {user?.name || "User Name"}
        </h1>
        <p className="text-sm text-gray-500 truncate px-2">
          {user?.email || "user@example.com"}
        </p>
      </div>

      {/* Action Buttons */}
      <div className="flex flex-col gap-2">
        <Button
          onClick={() => {
            navigate(`/profile/${user?.username}`);
            setIsOpen(false);
          }}
          className="bg-indigo-100 text-indigo-700 hover:bg-indigo-200 transition duration-150 py-2 px-4 rounded"
        >
          View Profile
        </Button>
        <Button
          onClick={() => {
            handleLogout();
            setIsOpen(false);
          }}
          className="bg-red-100 text-red-600 hover:bg-red-200 transition duration-150 py-2 px-4 rounded"
        >
          Logout
        </Button>
      </div>
    </div>
  );
};

export default UserMenu;
