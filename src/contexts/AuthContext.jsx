import axios from "axios";
import { createContext, useState } from "react";

const AuthContext = createContext();
const BASE_URL = "http://localhost:3000/api/auth";
const AuthContextProvider = ({ children }) => {
    // const [allUser , setAllUser] = useState([]);
    const [user , setUser] = useState(null);
    const [isLoading , setIsLoading] = useState(false);
    const [error , setError] = useState(null);
    const [success , setSuccess] = useState(null);
    const [isLoginModalOpen, setIsLoginModalOpen] = useState(false);
    const [isSignupModalOpen, setIsSignupModalOpen] = useState(false);
  const Signup = async (data) => {
    console.log(data);
    
  try {
    setIsLoading(true);
    setError('');
    setSuccess(null);
    const formData = new FormData();
    for (const key in data) {
      formData.append(key, data[key]);
    }

    const res = await axios.post(`${BASE_URL}/signup`, formData, {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    });

    setSuccess(res.data.message);
    setUser(res.data);
    localStorage.setItem('user', JSON.stringify(res.data.data));
  } catch (error) {
    setError(error.response?.data?.message || error.message);
  } finally {
    setIsLoading(false);
  }
};

   const SignIn = async (data) => {
       try {
        setIsLoading(true);
        setError(null);
        setSuccess(null);
        const res = await axios.post(`${BASE_URL}/signin` , data);
        setSuccess(res.data.message);
        setIsLoading(false);
        setUser(res.data);
        localStorage.setItem('user', JSON.stringify(res.data.data));
       } catch (error) {
        console.log(error);
        
        setError(error.message);
        setIsLoading(false);
        return;
       }
   }

const getUserByUsername = async (username) => {
  try {
    setIsLoading(true);
    setError(null);
    setSuccess(null);

    const res = await axios.get(`${BASE_URL}/users/${username}`);
    
    setIsLoading(false);
    return res.data; // Now this is the actual user object
  } catch (error) {
    console.log(error);
    setError(error.message);
    setIsLoading(false);
    return null;
  }
};


   const handleLogout = () => {
    localStorage.removeItem('user');
    setUser(null);
   }
    return( 
    <AuthContext.Provider value={{ user, getUserByUsername, handleLogout , setUser, Signup , SignIn , setError , isLoginModalOpen , setIsLoginModalOpen , isSignupModalOpen , setIsSignupModalOpen , isLoading , error , success}}>
        {children}
    </AuthContext.Provider>
    )
};

export { AuthContext, AuthContextProvider };