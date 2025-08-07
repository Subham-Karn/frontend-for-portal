import React, { useState } from 'react';
import { useAuth } from '../hooks/useHook';

const SignUp = () => {
  const [formData, setFormData] = useState({
    name: '',
    username: '',
    email: '',
    password: '',
    age: '',
    gender: '',
    address: '',
    phone: '',
    bio: '',
    image: null,
  });

  const {Signup} = useAuth();
  const handleChange = (e) => {
    const { name, type, value, files } = e.target;
    if (type === 'file') {
      setFormData({
        ...formData,
        [name]: files[0] || null,
      });
    } else {
      setFormData({
        ...formData,
        [name]: value,
      });
    }
  };
 const handleSignUp = async (e) =>{
    e.preventDefault();
    console.log(formData);
    
    await Signup(formData);
 }
  return (
    <div>
      <h2>Sign Up</h2>
      <form onSubmit={handleSignUp}>
        <label htmlFor="name">Name</label><br />
        <input
          type="text"
          name="name"
          onChange={handleChange}
          value={formData.name}
          placeholder="Name"
        /><br />

        <label htmlFor="username">Username</label><br />
        <input
          type="text"
          name="username"
          onChange={handleChange}
          value={formData.username}
          placeholder="Username"
        /><br />

        <label htmlFor="image">Image</label><br />
        <input
          type="file"
          name="image"
          onChange={handleChange}
          accept="image/*"
        /><br />

        <label htmlFor="email">Email</label><br />
        <input
          type="email"
          name="email"
          onChange={handleChange}
          value={formData.email}
          placeholder="Email"
        /><br />

        <label htmlFor="password">Password</label><br />
        <input
          type="password"
          name="password"
          onChange={handleChange}
          value={formData.password}
          placeholder="Password"
        /><br />

        <label htmlFor="age">Age</label><br />
        <input
          type="number"
          name="age"
          onChange={handleChange}
          value={formData.age}
          placeholder="Age"
        /><br />

        <label htmlFor="gender">Gender</label><br />
        <input
          type="text"
          name="gender"
          onChange={handleChange}
          value={formData.gender}
          placeholder="Gender"
        /><br />

        <label htmlFor="address">Address</label><br />
        <input
          type="text"
          name="address"
          onChange={handleChange}
          value={formData.address}
          placeholder="Address"
        /><br />

        <label htmlFor="phone">Phone</label><br />
        <input
          type="tel"
          name="phone"
          onChange={handleChange}
          value={formData.phone}
          placeholder="Phone"
        /><br />

        <label htmlFor="bio">Bio</label><br />
        <textarea
          name="bio"
          onChange={handleChange}
          value={formData.bio}
          placeholder="Bio"
        /><br />
        <button type='submit'>Sign Up</button>
      </form>
    </div>
  );
};

export default SignUp;
