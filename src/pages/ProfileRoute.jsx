import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { CircleAlert, User, MessageCircle, Heart, Share2, MoreHorizontal } from 'lucide-react';
import { FaHeart, FaRegHeart } from 'react-icons/fa';
import { useAuth, useFeed, useUser } from '../hooks/useHook';
import { formatDistanceToNow } from 'date-fns';

const ProfileRoute = () => {
  const { username } = useParams();
  const { feedPosts, addLike } = useFeed();
  const { followUser, unfollowUser } = useUser();
  const { getUserByUsername } = useAuth();
  const currentUser = JSON.parse(localStorage.getItem('user')) || null;
  const currentUserId = currentUser?._id;

  const [profileUser, setProfileUser] = useState(null);
  const [isFollowing, setIsFollowing] = useState(false);
  const [localLikes, setLocalLikes] = useState({});

  useEffect(() => {
    const fetchProfileUser = async () => {
      const user = await getUserByUsername(username);
      setProfileUser(user);
      if (user?.followers?.includes(currentUserId)) {
        setIsFollowing(true);
      }
    };
    fetchProfileUser();
  }, [username, currentUserId, getUserByUsername]);

  const handleFollow = async () => {
    if (!profileUser || !currentUserId) return;
    if (isFollowing) {
      await unfollowUser(currentUserId, profileUser._id);
      setIsFollowing(false);
    } else {
      await followUser(currentUserId, profileUser._id);
      setIsFollowing(true);
    }
  };

  const handleLike = async (postId) => {
    try {
      // Optimistic update
      setLocalLikes(prev => ({
        ...prev,
        [postId]: {
          liked: true,
          count: (prev[postId]?.count || 0) + 1
        }
      }));
      await addLike(postId);
    } catch (error) {
      // Revert on error
      setLocalLikes(prev => ({
        ...prev,
        [postId]: {
          liked: false,
          count: (prev[postId]?.count || 0) - 1
        }
      }));
      console.error("Like failed:", error);
    }
  };

  const getImageSrc = (image) => {
    if (!image) return null;
    if (image.startsWith('http')) return image;
    return `http://localhost:3000/uploads/${image}`;
  };

  const userPosts = feedPosts.filter(post => post.user?._id === profileUser?._id);

  if (!profileUser) return (
    <div className="flex justify-center items-center h-screen">
      <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
    </div>
  );

  return (
    <main className='grid grid-cols-1 md:grid-cols-3 gap-6 p-5 max-w-6xl mx-auto'>
      {/* Profile Section */}
      <section className='bg-white rounded-xl shadow-sm p-6 h-fit sticky top-4'>
        <div className='flex flex-col items-center gap-6'>
          {/* Profile Image */}
          <div className='relative'>
            <div className={`w-32 h-32 rounded-full flex items-center justify-center ${!profileUser.image ? 'bg-gray-200' : ''}`}>
              {!profileUser.image ? (
                <User className='text-gray-500' size={48} />
              ) : (
                <img 
                  className='w-full h-full rounded-full object-cover border-4 border-white shadow-md' 
                  src={getImageSrc(profileUser.image)} 
                  alt={profileUser.name} 
                />
              )}
            </div>
          </div>

          {/* User Info */}
          <div className='text-center'>
            <h1 className='text-2xl font-bold text-gray-800'>{profileUser.name}</h1>
            <p className='text-gray-500'>@{profileUser.username}</p>
            <p className='mt-3 text-gray-700'>{profileUser.bio || 'No bio yet'}</p>
          </div>

          {/* Stats */}
          <div className='flex justify-between w-full border-t border-b border-gray-100 py-4'>
            <div className='text-center'>
              <p className='text-xl font-semibold'>{userPosts.length}</p>
              <p className='text-sm text-gray-500'>Posts</p>
            </div>
            <div className='text-center'>
              <p className='text-xl font-semibold'>{profileUser.followers?.length || 0}</p>
              <p className='text-sm text-gray-500'>Followers</p>
            </div>
            <div className='text-center'>
              <p className='text-xl font-semibold'>{profileUser.following?.length || 0}</p>
              <p className='text-sm text-gray-500'>Following</p>
            </div>
          </div>

          {/* Follow Button */}
          {profileUser.username === currentUser?.username ? (
            <button className='w-full bg-blue-600 hover:bg-blue-700 text-white font-medium py-2 px-4 rounded-lg transition'>
              Edit Profile
            </button>
          ) : (
            <button
              onClick={handleFollow}
              className={`w-full font-medium py-2 px-4 rounded-lg transition ${
                isFollowing 
                  ? 'bg-gray-200 hover:bg-gray-300 text-gray-800' 
                  : 'bg-blue-600 hover:bg-blue-700 text-white'
              }`}
            >
              {isFollowing ? 'Following' : 'Follow'}
            </button>
          )}
        </div>
      </section>

      {/* Posts Section */}
      <section className='md:col-span-2 space-y-6'>
        <h2 className='text-2xl font-bold text-gray-800'>Posts</h2>
        
        {userPosts.length === 0 ? (
          <div className='bg-white rounded-xl shadow-sm p-8 text-center'>
            <CircleAlert size={48} className='mx-auto text-gray-400 mb-4' />
            <h3 className='text-xl font-medium text-gray-600'>No posts yet</h3>
            <p className='text-gray-500 mt-2'>
              {profileUser.username === currentUser?.username 
                ? 'Share your first post!' 
                : 'This user hasn\'t posted anything yet'}
            </p>
          </div>
        ) : (
          userPosts.map((post) => {
            const isLiked = localLikes[post._id]?.liked || false;
            const likeCount = localLikes[post._id]?.count || post.like || 0;
            const commentCount = post.comments?.length || 0;
            const shareCount = post.share || 0;

            return (
              <article key={post._id} className='bg-white rounded-xl shadow-sm overflow-hidden'>
                {/* Post Header */}
                <div className='flex items-center justify-between p-4 border-b border-gray-100'>
                  <div className='flex items-center space-x-3'>
                    <img
                      src={getImageSrc(post.user?.image)}
                      alt={post.user?.name}
                      className='w-10 h-10 rounded-full object-cover'
                    />
                    <div>
                      <h3 className='font-medium'>{post.user?.name}</h3>
                      <p className='text-xs text-gray-500'>
                        {formatDistanceToNow(new Date(post.createdAt), { addSuffix: true })}
                      </p>
                    </div>
                  </div>
                  <button className='text-gray-400 hover:text-gray-600'>
                    <MoreHorizontal size={18} />
                  </button>
                </div>

                {/* Post Content */}
                <div className='p-4'>
                  <h3 className='text-xl font-semibold mb-2'>{post.title}</h3>
                  <p className='text-gray-700 mb-4'>{post.content}</p>
                  
                  {post.image && (
                    <img
                      src={getImageSrc(post.image)}
                      alt={post.title}
                      className='w-full h-auto max-h-96 object-cover rounded-lg mb-4'
                    />
                  )}

                  {/* Engagement Bar */}
                  <div className='flex items-center justify-between text-gray-500 border-t border-gray-100 pt-3'>
                    <button 
                      onClick={() => handleLike(post._id)}
                      className='flex items-center gap-1 hover:text-red-500'
                    >
                      {isLiked ? (
                        <FaHeart className='text-red-500' />
                      ) : (
                        <FaRegHeart />
                      )}
                      <span>{likeCount}</span>
                    </button>

                    <button className='flex items-center gap-1 hover:text-blue-500'>
                      <MessageCircle size={18} />
                      <span>{commentCount}</span>
                    </button>

                    <button className='flex items-center gap-1 hover:text-green-500'>
                      <Share2 size={18} />
                      <span>{shareCount}</span>
                    </button>
                  </div>
                </div>
              </article>
            );
          })
        )}
      </section>
    </main>
  );
};

export default ProfileRoute;