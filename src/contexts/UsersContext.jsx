import axios from "axios";
import { createContext , useState} from "react";


const UserContext = createContext();
const BASE_URL = "https://portal-server-v1.onrender.com/api/users";
const UsersContextProvider = ({children}) => {
    const [sucess , setSucess] = useState('');
    const [error , setError] = useState('');
    const [isLoading , setIsLoading] = useState(false);
    
   const followUser = async (userId , currentUserId) => {
     try {
        setError('');
        setSucess('');
        setIsLoading(true);
        const res = await axios.post(`${BASE_URL}/follow/${userId}` , {currentUserId});
        setSucess(res.data.message);
     } catch (error) {
        setError(error.response?.data?.message || error.message);
     } finally {
        setSucess('');
        setIsLoading(false);
     }
   }

   const unfollowUser = async (userId , currentUserId) => {
    try {
       setError('');
       setSucess('');
       setIsLoading(true);
       const res = await axios.post(`${BASE_URL}/unfollow/${userId}` , {currentUserId});
       setSucess(res.data.message);
    } catch (error) {
       setError(error.response?.data?.message || error.message);
    } finally {
       setSucess('');
       setIsLoading(false);
    }
  }


    return (
        <UserContext.Provider value={{unfollowUser , followUser, isLoading , sucess , error}}>
            {children}
        </UserContext.Provider>
    )
}

export {UserContext, UsersContextProvider}