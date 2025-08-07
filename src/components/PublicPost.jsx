import React, { useState } from 'react';
import { MessageCircle, Share2, MoreHorizontal, Loader2 } from 'lucide-react';
import { FaHeart, FaRegHeart, FaRegComment } from 'react-icons/fa';
import { formatDistanceToNow } from 'date-fns';
import { useFeed } from '../hooks/useHook';

const PublicPostComponent = () => {
  const { 
    feedPosts, 
    addLike, 
    addComment, 
    sharePost,
    isLoading
  } = useFeed();
  const loadingStates = isLoading || {};
  const [commentTexts, setCommentTexts] = useState({});
  const [showCommentInputs, setShowCommentInputs] = useState({});
  const [localLikes, setLocalLikes] = useState({});

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

  const handleComment = async (postId) => {
    try {
      await addComment(postId, commentTexts[postId] || '');
      setCommentTexts(prev => ({ ...prev, [postId]: '' }));
      setShowCommentInputs(prev => ({ ...prev, [postId]: false }));
    } catch (error) {
      console.error("Comment failed:", error);
    }
  };

  const handleShare = async (postId) => {
    try {
      await sharePost(postId);
    } catch (error) {
      console.error("Share failed:", error);
    }
  };

  const getImageSrc = (image) => {
    if (!image) return null;
    if (image.startsWith('http')) return image;
    return `https://portal-server-v1.onrender.com/uploads/${image}`;
  };

  if (!feedPosts || feedPosts.length === 0) {
    return (
      <div className="text-center py-10">
        <p className="text-gray-500 italic">No posts found. Be the first to share something!</p>
      </div>
    );
  }

  return (
    <div className="max-w-2xl mx-auto space-y-6">
      {feedPosts.map((post) => {
        const user = post.user || {};
        const isLiked = localLikes[post._id]?.liked || false;
        const likeCount = localLikes[post._id]?.count || post.like || 0;
        const commentCount = post.comments?.length || 0;
        const shareCount = post.share || 0;
        const showComment = showCommentInputs[post._id];
        const commentText = commentTexts[post._id] || '';
        const isLoading = loadingStates[post._id];

        return (
          <div 
            key={post._id} 
            className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden hover:shadow-md transition-shadow"
          >
            {/* Post Header */}
            <div className="flex items-center justify-between p-4">
              <div className="flex items-center space-x-3">
                <img
                  src={getImageSrc(user.image)}
                  alt={user.name}
                  className="w-10 h-10 rounded-full object-cover border-2 border-white shadow-sm"
                />
                <div>
                  <h3 className="font-semibold text-gray-900">
                    {user.name || 'User'}
                  </h3>
                  <p className="text-xs text-gray-500">
                    {post.createdAt
                      ? formatDistanceToNow(new Date(post.createdAt), { addSuffix: true })
                      : 'just now'}
                  </p>
                </div>
              </div>
              <button className="text-gray-400 hover:text-gray-600 p-1 rounded-full">
                <MoreHorizontal size={18} />
              </button>
            </div>

            {/* Post Content */}
            <div className="px-4 pb-2">
              <h2 className="text-xl font-semibold mb-2">{post.title}</h2>
              <p className="text-gray-800 mb-3">{post.content}</p>
              
              {post.image && (
                <div className="rounded-lg overflow-hidden mb-3">
                  <img
                    src={getImageSrc(post.image)}
                    alt={post.title}
                    className="w-full h-auto max-h-96 object-cover"
                  />
                </div>
              )}
            </div>

            {/* Engagement Bar */}
            <div className="px-4 py-2 border-t border-gray-100">
              <div className="flex justify-between text-gray-500">
                <div className="flex space-x-4">
                  <button 
                    onClick={() => handleLike(post._id)}
                    disabled={isLoading?.like}
                    className="flex items-center space-x-1 group disabled:opacity-50"
                  >
                    {isLoading?.like ? (
                      <Loader2 size={16} className="animate-spin" />
                    ) : isLiked ? (
                      <FaHeart className="text-red-500" />
                    ) : (
                      <FaRegHeart className="group-hover:text-red-500" />
                    )}
                    <span className="text-xs">{likeCount}</span>
                  </button>

                  <button 
                    onClick={() => setShowCommentInputs(prev => ({ ...prev, [post._id]: !prev[post._id] }))}
                    className="flex items-center space-x-1 hover:text-blue-500"
                  >
                    <FaRegComment />
                    <span className="text-xs">{commentCount}</span>
                  </button>

                  <button 
                    onClick={() => handleShare(post._id)}
                    disabled={isLoading?.share}
                    className="flex items-center space-x-1 hover:text-green-500 disabled:opacity-50"
                  >
                    {isLoading?.share ? (
                      <Loader2 size={16} className="animate-spin" />
                    ) : (
                      <Share2 size={16} />
                    )}
                    <span className="text-xs">{shareCount}</span>
                  </button>
                </div>
              </div>

              {/* Comment Input */}
              {showComment && (
                <div className="mt-3 flex items-center space-x-2">
                  <input
                    type="text"
                    value={commentText}
                    onChange={(e) => setCommentTexts(prev => ({ ...prev, [post._id]: e.target.value }))}
                    placeholder="Write a comment..."
                    className="flex-1 text-sm bg-gray-100 border border-gray-200 rounded-full px-3 py-1 focus:outline-none focus:ring-1 focus:ring-blue-500"
                  />
                  <button
                    onClick={() => handleComment(post._id)}
                    disabled={!commentText.trim() || isLoading?.comment}
                    className="text-blue-500 font-medium text-sm disabled:text-blue-300"
                  >
                    {isLoading?.comment ? (
                      <Loader2 size={16} className="animate-spin" />
                    ) : (
                      'Post'
                    )}
                  </button>
                </div>
              )}
            </div>
          </div>
        );
      })}
    </div>
  );
};

export default PublicPostComponent;