import React, { useState } from 'react';
import { X, User, Mail, Lock, Image as ImageIcon, Phone, MapPin, Calendar,  VenusAndMars, Loader2 } from 'lucide-react';
import { useAuth } from '../hooks/useHook';

const SignupModal = ({ isOpen, onClose }) => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    username: '',
    age: '',
    gender: '',
    phone: '',
    address: '',
    bio: '',
    image: null
  });
  const [imagePreview, setImagePreview] = useState(null);
  const [errors, setErrors] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const {Signup} = useAuth();
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setFormData(prev => ({ ...prev, image: file }));
      setImagePreview(URL.createObjectURL(file));
    }
  };

  const validateForm = () => {
    const newErrors = {};
    if (!formData.name.trim()) newErrors.name = 'Name is required';
    if (!formData.email.trim()) newErrors.email = 'Email is required';
    if (!/^\S+@\S+\.\S+$/.test(formData.email)) newErrors.email = 'Invalid email format';
    if (!formData.password) newErrors.password = 'Password is required';
    if (formData.password.length < 6) newErrors.password = 'Password must be at least 6 characters';
    if (!formData.username.trim()) newErrors.username = 'Username is required';
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validateForm()) return;

    setIsSubmitting(true);
    try {
      const formDataToSend = new FormData();
      Object.entries(formData).forEach(([key, value]) => {
        if (value !== null && value !== undefined) {
          formDataToSend.append(key, value);
        }
      });
      await Signup(formData)
      
      onClose(); // Close on success
    } catch (error) {
      console.error('Signup error:', error);
    } finally {
      setIsSubmitting(false);
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50">
      <div className="relative bg-white rounded-lg shadow-xl w-full max-w-md mx-4 overflow-y-auto max-h-[90vh]">
        <button
          onClick={onClose}
          className="absolute top-2 right-2 p-1 rounded-full hover:bg-gray-100"
        >
          <X size={24} className="text-gray-500" />
        </button>

        <div className="p-6">
          <h2 className="text-2xl font-bold text-gray-800 mb-6">Create Account</h2>
          
          <form onSubmit={handleSubmit} encType="multipart/form-data">
            {/* Profile Picture */}
            <div className="flex flex-col items-center mb-6">
              <label className="cursor-pointer">
                {imagePreview ? (
                  <div className="relative">
                    <img
                      src={imagePreview}
                      alt="Preview"
                      className="w-24 h-24 rounded-full object-cover border-2 border-indigo-100"
                    />
                    <div className="absolute bottom-0 right-0 bg-indigo-600 text-white p-1 rounded-full">
                      <ImageIcon size={16} />
                    </div>
                  </div>
                ) : (
                  <div className="w-24 h-24 rounded-full bg-gray-100 border-2 border-dashed border-gray-300 flex items-center justify-center">
                    <ImageIcon size={32} className="text-gray-400" />
                  </div>
                )}
                <input
                  type="file"
                  accept="image/*"
                  className="hidden"
                  onChange={handleImageChange}
                />
              </label>
              <span className="text-sm text-gray-500 mt-2">Profile photo</span>
            </div>

            {/* Basic Info */}
            <div className="grid grid-cols-1 gap-4 mb-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Full Name*</label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <User size={18} className="text-gray-400" />
                  </div>
                  <input
                    name="name"
                    type="text"
                    placeholder="John Doe"
                    className="w-full text-gray-700 pl-10 p-3 border border-gray-300 rounded-md focus:ring-2 focus:ring-indigo-500"
                    value={formData.name}
                    onChange={handleChange}
                  />
                </div>
                {errors.name && <p className="mt-1 text-sm text-red-600">{errors.name}</p>}
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Email*</label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <Mail size={18} className="text-gray-400" />
                  </div>
                  <input
                    name="email"
                    type="email"
                    placeholder="your@email.com"
                    className="w-full text-gray-700 pl-10 p-3 border border-gray-300 rounded-md focus:ring-2 focus:ring-indigo-500"
                    value={formData.email}
                    onChange={handleChange}
                  />
                </div>
                {errors.email && <p className="mt-1 text-sm text-red-600">{errors.email}</p>}
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Password*</label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <Lock size={18} className="text-gray-400" />
                  </div>
                  <input
                    name="password"
                    type="password"
                    placeholder="••••••••"
                    className="w-full text-gray-700 pl-10 p-3 border border-gray-300 rounded-md focus:ring-2 focus:ring-indigo-500"
                    value={formData.password}
                    onChange={handleChange}
                  />
                </div>
                {errors.password && <p className="mt-1 text-sm text-red-600">{errors.password}</p>}
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Username*</label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <User size={18} className="text-gray-400" />
                  </div>
                  <input
                    name="username"
                    type="text"
                    placeholder="johndoe123"
                    className="w-full text-gray-700 pl-10 p-3 border border-gray-300 rounded-md focus:ring-2 focus:ring-indigo-500"
                    value={formData.username}
                    onChange={handleChange}
                  />
                </div>
                {errors.username && <p className="mt-1 text-sm text-red-600">{errors.username}</p>}
              </div>
            </div>

            {/* Additional Info */}
            <div className="grid grid-cols-2 gap-4 mb-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Age</label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <Calendar size={18} className="text-gray-400" />
                  </div>
                  <input
                    name="age"
                    type="number"
                    placeholder="25"
                    className="w-full text-gray-700 pl-10 p-3 border border-gray-300 rounded-md focus:ring-2 focus:ring-indigo-500"
                    value={formData.age}
                    onChange={handleChange}
                  />
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Gender</label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <VenusAndMars size={18} className="text-gray-400" />
                  </div>
                  <select
                    name="gender"
                    className="w-full pl-10  text-gray-700 p-3 border border-gray-300 rounded-md focus:ring-2 focus:ring-indigo-500 appearance-none"
                    value={formData.gender}
                    onChange={handleChange}
                  >
                    <option value="">Select</option>
                    <option value="male">Male</option>
                    <option value="female">Female</option>
                    <option value="other">Other</option>
                  </select>
                </div>
              </div>
            </div>

            <div className="mb-4">
              <label className="block text-sm font-medium text-gray-700 mb-1">Phone</label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <Phone size={18} className="text-gray-400" />
                </div>
                <input
                  name="phone"
                  type="tel"
                  placeholder="+1 234 567 890"
                  className="w-full pl-10 text-gray-700 p-3 border border-gray-300 rounded-md focus:ring-2 focus:ring-indigo-500"
                  value={formData.phone}
                  onChange={handleChange}
                />
              </div>
            </div>

            <div className="mb-4">
              <label className="block text-sm font-medium text-gray-700 mb-1">Address</label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <MapPin size={18} className="text-gray-400" />
                </div>
                <input
                  name="address"
                  type="text"
                  placeholder="123 Main St, City"
                  className="w-full pl-10 text-gray-700 p-3 border border-gray-300 rounded-md focus:ring-2 focus:ring-indigo-500"
                  value={formData.address}
                  onChange={handleChange}
                />
              </div>
            </div>

            <div className="mb-6">
              <label className="block text-sm font-medium text-gray-700 mb-1">Bio</label>
              <textarea
                name="bio"
                rows={3}
                placeholder="Tell us about yourself..."
                className="w-full text-gray-700 p-3 border border-gray-300 rounded-md focus:ring-2 focus:ring-indigo-500"
                value={formData.bio}
                onChange={handleChange}
              />
            </div>

            <button
              type="submit"
              disabled={isSubmitting}
              className="w-full bg-indigo-600 text-white py-3 rounded-md hover:bg-indigo-700 transition font-medium disabled:opacity-70"
            >
              {isSubmitting ? (
                <span className="flex items-center justify-center gap-2">
                  <Loader2 size={18} className="animate-spin" />
                  Creating Account...
                </span>
              ) : (
                'Sign Up'
              )}
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default SignupModal;