import React, { useEffect, useState } from 'react';
import { ImageUp, Loader2, X } from 'lucide-react';
import { useFeed } from '../hooks/useHook';

const AddPost = () => {
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const [image, setImage] = useState(null);
  const [imageFile, setImageFile] = useState(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState('');
  const {addPOST , isLoading , success , setSucess } = useFeed();
  const localUser = JSON.parse(localStorage.getItem('user')) || null;
  
  const handleImageUpload = (e) => {
    const file = e.target.files[0];
    
    if (!file) return;
    
    if (!file.type.match('image.*')) {
      setError('Please upload an image file');
      return;
    }
    
    if (file.size > 5 * 1024 * 1024) {
      setError('Image size should be less than 5MB');
      return;
    }
    
    setError('');
    setImageFile(file);
    setImage(URL.createObjectURL(file));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');

    if (!title.trim() || !content.trim()) {
      setError('Title and content are required!');
      return;
    }

    if (title.length > 100) {
      setError('Title should be less than 100 characters');
      return;
    }

    const postData = {
        title: title.trim(),
        content: content.trim(),
        image: imageFile, 
        userId: localUser._id
    };

    try {
      setIsSubmitting(true);
      console.log('Post submitted:', postData);
      await addPOST(postData);
      setTitle('');
      setContent('');
      setImage(null);
      setImageFile(null);
    } catch (err) {
    console.error(err);
      setError('Failed to create post. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  };
  useEffect(()=>{
    if(success) {
      setTimeout(() => {
        window.location.reload();
        setSucess('');
      }, 3000);
    }
  },[success , setSucess]);


  return (
    <div className="max-w-6xl mx-auto py-4 bg-white rounded-xl p-6 my-8">
      <h1 className="text-2xl font-bold mb-6 text-gray-800">Create New Post</h1>

      {error && (
        <div className="mb-4 p-3 bg-red-100 text-red-700 rounded-md">
          {error}
        </div>
      )}
       {
        success && (
          <div className="mb-4 p-3 text-center bg-green-100 text-green-700 rounded-md">
            {success}
          </div>
        )
       }
      <form onSubmit={handleSubmit}>
        <div className="flex flex-col md:flex-row gap-6">
          {/* Left side - Text inputs */}
          <div className="flex-1 flex flex-col gap-4">
            {/* Title */}
            <div>
              <label htmlFor="title" className="block text-sm font-medium text-gray-700 mb-1">
                Title
              </label>
              <input
                id="title"
                type="text"
                placeholder="Post Title"
                className="w-full p-3 border border-gray-300 rounded-md outline-none focus:ring-2 focus:ring-indigo-500"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                required
                maxLength={100}
              />
            </div>

            {/* Content */}
            <div className="flex-1 flex flex-col">
              <label htmlFor="content" className="block text-sm font-medium text-gray-700 mb-1">
                Content
              </label>
              <textarea
                id="content"
                placeholder="What's on your mind?"
                className="w-full flex-1 p-3 border border-gray-300 rounded-md resize-none outline-none focus:ring-2 focus:ring-indigo-500"
                value={content}
                onChange={(e) => setContent(e.target.value)}
                required
              ></textarea>
            </div>

            {/* Submit Button */}
            <button
              type="submit"
              className="mt-2 flex justify-center items-center gap-2 bg-indigo-600 text-white px-6 py-3 rounded-md hover:bg-indigo-700 transition-all font-medium disabled:opacity-70 disabled:cursor-not-allowed"
              disabled={isSubmitting || isLoading}
            >
              {isSubmitting  || isLoading ? (
                <>
                  <Loader2 className="animate-spin" size={20} />
                  Posting...
                </>
              ) : (
                'Post'
              )}
            </button>
          </div>

          {/* Right side - Image upload/preview */}
          <div className="w-full md:w-96 flex flex-col">
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Image (Optional)
            </label>
            <div className="flex-1 border-2 border-dashed border-gray-300 rounded-lg bg-gray-50 hover:bg-gray-100 transition flex flex-col items-center justify-center">
              {image ? (
                <div className="relative w-full h-full">
                  <img
                    src={image}
                    alt="Preview"
                    className="w-full h-full object-contain rounded-lg"
                  />
                  <button
                    type="button"
                    onClick={() => {
                      setImage(null);
                      setImageFile(null);
                    }}
                    className="absolute top-2 right-2 p-1 bg-black/50 rounded-full text-white hover:bg-black/70 transition"
                  >
                    <X size={18} />
                  </button>
                </div>
              ) : (
                <label className="flex flex-col items-center justify-center p-6 w-full h-full cursor-pointer">
                  <ImageUp size={40} className="text-gray-400 mb-2" />
                  <span className="text-gray-600 font-medium">Click to upload image</span>
                  <span className="text-sm text-gray-500 mt-1">PNG, JPG up to 5MB</span>
                  <input
                    type="file"
                    accept="image/*"
                    className="hidden"
                    onChange={handleImageUpload}
                  />
                </label>
              )}
            </div>
          </div>
        </div>
      </form>
    </div>
  );
};

export default AddPost;