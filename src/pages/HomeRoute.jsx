import React from 'react';
import { ImageUp, User } from 'lucide-react';
import { Button } from '../lib/motion';
import { Link } from 'react-router-dom';
import { useAuth } from '../hooks/useHook';
import PublicPostComponent from '../components/PublicPost';

const HomeRoute = () => {
  const { setIsLoginModalOpen, user } = useAuth();
  const localUser = JSON.parse(localStorage.getItem('user')) || null;

  const currentUser = user?.data || localUser || null;
  const avatar = currentUser?.image
    ? `http://localhost:3000/uploads/${currentUser.image}`
    : null;

  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-4 px-4 py-6">
      {/* Center Feed Section */}
      <section className="md:col-span-2 flex flex-col gap-4">
        {/* Add Post Box */}
        <div className="bg-white rounded-xl shadow p-4 flex items-center gap-4">
          <div className="flex items-center gap-3">
            {avatar ? (
              <img
                src={avatar}
                alt="User Avatar"
                className="w-14 h-14 rounded-full object-cover"
              />
            ) : (
              <div className="flex rounded-full cursor-pointer bg-gray-300 p-4 items-center">
                <User className="text-gray-500" size={25} />
              </div>
            )}
            <div className="flex flex-col items-start">
              <h2 className="font-medium text-gray-700">
                {currentUser?.name || 'Guest'}
              </h2>
              <h2 className="text-sm text-gray-400">
                @{currentUser?.username || 'guest'}
              </h2>
            </div>
          </div>
          <Link to="/create-post" className="flex-1">
            <Button className="w-full flex items-center gap-2 justify-start px-4 py-2 bg-[#1800ad] text-white rounded-full shadow hover:bg-[#13009c] transition-all">
              <ImageUp size={18} />
              <span>Add Post</span>
            </Button>
          </Link>
        </div>
         <div className='max-h-[500px] overflow-y-auto'>
          {/* Post Feed */}
          <PublicPostComponent />
         </div>
      </section>

      {/* Right Sidebar */}
      <section className="max-w-sm bg-white p-4 rounded-xl shadow h-fit md:block hidden">
        <h2 className="font-semibold text-lg text-center mb-2">Profile & Notifications</h2>

        {/* Profile Section */}
        <div className="p-2">
          <h2 className="font-semibold text-lg">Profile</h2>
          <div className="flex items-center space-x-2 p-2">
            {avatar ? (
              <img
                className="w-20 h-20 rounded-full object-cover"
                src={avatar}
                alt="User Avatar"
              />
            ) : (
              <div className="flex rounded-full cursor-pointer bg-gray-300 p-4 items-center">
                <User className="text-gray-500" size={25} />
              </div>
            )}
            <div className="flex flex-col px-2">
              <h2 className="font-medium text-2xl">
                {currentUser?.name || 'Guest'}
              </h2>
              <h2 className="text-gray-400 text-sm">
                @{currentUser?.username || 'guest'}
              </h2>
              <h2 className="text-gray-700 font-medium text-lg">Bio</h2>
              <p className="text-gray-500 text-sm">
                {currentUser?.bio || 'N/A'}
              </p>
            </div>
          </div>

          {!currentUser ? (
            <Button
              onClick={() => setIsLoginModalOpen(true)}
              className="w-full flex items-center gap-2 justify-center px-4 py-2 bg-[#1800ad] text-white rounded-full shadow hover:bg-[#13009c] transition-all"
            >
              Login
            </Button>
          ) : (
            <Link to={`/profile/${currentUser.username}`}>
              <Button className="w-full flex items-center gap-2 justify-center px-4 py-2 bg-[#1800ad] text-white rounded-full shadow hover:bg-[#13009c] transition-all">
                View Profile
              </Button>
            </Link>
          )}
        </div>

        {/* Notifications */}
        <div className="p-2">
          <h2 className="font-semibold text-lg">Notifications</h2>
          <span className="p-2 text-gray-300 w-full block">No Notification yet</span>
        </div>
      </section>
    </div>
  );
};

export default HomeRoute;
