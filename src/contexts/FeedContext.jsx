import axios from "axios";
import { createContext, useEffect, useState } from "react";

const BASE_URL = 'http://localhost:3000/api/feed';
const FeedContext  =  createContext();

const FeedContextProvider =  ({children}) => {
    const [feedPosts , setFeedPosts] = useState([]);
    const [error , setError] = useState('');
    const [success , setSucess] = useState('');
    const [isLoading , setIsLoading] = useState(false);
    const addPOST = async (data) => {
    try {
        setError('');
        setSucess('');
        setIsLoading(true);

            const formData = new FormData();
            for (const key in data) {
            formData.append(key, data[key]);
            }

        const res = await axios.post(`${BASE_URL}/posts`, formData, {
        headers: {
            'Content-Type': 'multipart/form-data',
        },
        });

        setSucess(res.data.message);
    } catch (error) {
        setError(error.response?.data?.message || error.message);
    } finally {
        setIsLoading(false);
    }
    };

    const addLike = async (id) => {
        try {
          setError('');
          setSucess('');
          setIsLoading(true);
    
          const res = await axios.post(`${BASE_URL}/posts/${id}/like`);
    
          setSucess(res.data.message);
        } catch (error) {
          setError(error.response?.data?.message || error.message);
        } finally {
          setIsLoading(false);
        }
      };

    useEffect(()=>{
        const fetchPosts = async ()=>{
            const res = await fetch(`${BASE_URL}/posts`);
            const data = await res.json();
            setFeedPosts(data.data);
            
        }
        fetchPosts();
    },[feedPosts]);
    return ( 
        <FeedContext.Provider value={{addPOST , feedPosts , addLike , error , success, isLoading}}>
            {children}
        </FeedContext.Provider>
     );
}
 
export {FeedContextProvider , FeedContext};