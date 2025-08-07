import React, {  useState } from 'react'
import {assets, navItems} from '../assets/assets'
import { Link, useNavigate } from 'react-router-dom'
import { Menu, Search, User, X } from 'lucide-react'
import { Button } from '../lib/motion'
import { useAuth } from '../hooks/useHook'
import SearchInput from '../util/SearchInput'
import LoginMondal from '../components/LoginMondal'
import SignupModal from '../components/SignupModal'
import UserMenu from './UserMenu'
const Navbar = () => {
    const [trackIndex , setTrackIndex] = useState('Home');
    const [isOpen, setIsOpen] = useState(false);
    const [isSearchOpen, setIsSearchOpen] = useState(false);
    const [isUserOpen, setIsUserOpen] = useState(false);
    const {isLoginModalOpen, setIsLoginModalOpen} = useAuth();
    const {isSignupModalOpen, setIsSignupModalOpen} = useAuth();
    const {user , handleLogout} = useAuth();
    const localUser = JSON.parse(localStorage.getItem('user'));
    const currentUser = user?.data || localUser || null;
    const naviagte = useNavigate();
  return (
    <header className={`bg-[#1800ad] text-white flex justify-between items-center px-4 py-2`}>
        <nav className='flex gap-8 items-center justify-between w-full'>
        <section className='flex gap-4 items-center'>
            {/* Logo Section */}
            <Link to='/'>
            <section className='h-15 '>
                <img className='h-full object-contain' src={assets.mainLogo} alt="coummunity-logo" />
            </section>
            </Link>  
            {/* Nav-Links */}
            <section className="hidden md:flex gap-4 items-center uppercase tracking-widest text-sm">
            {navItems.map((item) => (
                <div
                key={item.id}
                onClick={() => setTrackIndex(item.name)}
                className={trackIndex === item.name ? "text-white font-bold font-sans" : "text-gray-200 hover:text-white"}
                >
                <Link
                    to={item.path}
                >
                    {item.name}
                </Link>
                </div>
            ))}
            </section>
           
        </section>

            

          {/* Auth Section */}
          <section className='flex gap-4 items-center'>
         <div className='hidden md:flex'>
         <SearchInput  className={'w-full h-10 p-4 rounded-full ring-none outline-none'}/>
        </div>
            <div className='hidden md:flex'>
                {
                    currentUser?(
                    user?.data.isAuthenticated || localUser?.isAuthenticated && (
                        <div onClick={() => setIsUserOpen(!isUserOpen)}  className={`flex rounded-full shadow-lg cursor-pointer ${user?.data.image === null ? 'bg-gray-300 p-4' : ''} items-center`}>
                            {
                                user?.data?.image || localUser?.image === null ? (
                                    <User className='text-gray-500' size={25}/>
                                ):(
                                <img className='w-15 h-15 rounded-full object-cover ring-2 ring-white' src={`https://portal-server-v1.onrender.com/uploads/${localUser?.image}`} alt="" /> 
                                )
                            }
                        </div>
                    )
                    ):(
                         <div className='flex gap-4 items-center'>
                            <Button onClick={() => setIsLoginModalOpen(true)} className={'bg-white text-[#1800ad] hover:bg-white/60 cursor-pointer transition-all duration-150 py-2 px-4 rounded-full'}>Login</Button>
                            <Button onClick={() => setIsSignupModalOpen(true)} className={'bg-white text-[#1800ad] hover:bg-white/60 cursor-pointer transition-all duration-150 py-2 px-4 rounded-full'}>Signup</Button>
                        </div>
                    )
                 
                    }
                {
                    isUserOpen && (
                        <div className={`absolute rounded top-20 right-4 text-black bg-white shadow-lg p-4`}>
                            <h1 className='text-lg text-center font-semibold uppercase text-gray-500'>{user?.data.name || localUser?.name}</h1>
                            <p className='text-sm text-center text-gray-300'>{user?.data.email || localUser?.email}</p>
                            <div className='flex flex-col gap-2 mt-2'>
                                <Button onClick={()=>{
                                    naviagte(`/profile/${user?.data.username || localUser?.username}`);
                                    setIsUserOpen(false);
                                }} className={'text-[#1800ad] bg-[#1800ad]/5 rounded hover:text-[#1800ad]/60 cursor-pointer transition-all duration-150 py-2 px-4'}>Profile</Button>
                                <Button onClick={()=>{
                                    handleLogout();
                                    setIsUserOpen(false);
                                }} className={'text-red-500 bg-red-50 hover:text-red-300 cursor-pointer transition-all duration-150 py-2 px-4 rounded'}>Logout</Button>
                            </div>
                        </div>
                    )
                }

            </div>
         <span onClick={() => setIsSearchOpen(!isSearchOpen)} className='md:hidden'>
                <Search size={20} />
             </span>
          <div onClick={() => setIsOpen(!isOpen)} className='block md:hidden hover:text-white/60 focus:text-white/60 transition-all duration-150'>
            <Menu size={30}/>
          </div>
          {
              isSearchOpen && (
                <div className='absolute top-0 left-0 w-full justify-center h-screen bg-[#1800ad]/50 flex flex-col gap-4 items-center'>
                <Button onClick={() => setIsSearchOpen(!isSearchOpen)}  className={'absolute top-4 right-4 hover:text-white/60'}><X size={30}/></Button>
                 <div className='flex gap-4 items-center w-[90%]'>
                    <SearchInput  className={'w-full h-full rounded-full'}/>
                 </div>
                </div>
              )
          }
          </section>
       </nav>
       {
          isOpen && (
            <nav className='absolute top-0 left-0 w-full z-60 justify-center h-screen bg-[#1800ad] flex flex-col gap-4 items-center'>
            <Button onClick={() => setIsOpen(!isOpen)}  className={'absolute top-4 right-4 hover:text-white/60'}><X size={30}/></Button>
            {navItems.map((item) => (
                <div
                key={item.id}
                onClick={() => setTrackIndex(item.name)}
                className={`${trackIndex === item.name ? "text-white font-bold font-sans" : "text-gray-200 hover:text-white"}`}
                >
                <Link
                    to={item.path}
                >
                    {item.name}
                </Link>
                </div>
            ))}
            {
                currentUser ? (
                   <UserMenu user={currentUser} handleLogout={handleLogout} setIsOpen={setIsOpen} />
                ):(
                    <div className='flex gap-4 items-center'>
                        <Button onClick={() => setIsLoginModalOpen(true)} className={'bg-white text-[#1800ad] hover:bg-white/60 cursor-pointer transition-all duration-150 py-2 px-4 rounded-full'}>Login</Button>
                        <Button onClick={() => setIsSignupModalOpen(true)} className={'bg-white text-[#1800ad] hover:bg-white/60 cursor-pointer transition-all duration-150 py-2 px-4 rounded-full'}>Signup</Button>
                    </div>
                )
            }
            </nav>
          )
       }
       {
          isLoginModalOpen && (
            <LoginMondal isOpen={isLoginModalOpen} onClose={() => setIsLoginModalOpen(false)} />
          )
       }
       {
          isSignupModalOpen && (
            <SignupModal isOpen={isSignupModalOpen} onClose={() => setIsSignupModalOpen(false)} />
          )
       }
    </header>
  )
}

export default Navbar
