import React from 'react'
import { Route, Routes } from 'react-router-dom'
import PublicView from '../util/PublicView'
import HomeRoute from '../pages/HomeRoute'
import PublicPostRoute from '../pages/PublicPostRoute'
import ContactRoute from '../pages/ContactRoute'
import AboutRoute from '../pages/AboutRoute'
import ProfileRoute from '../pages/ProfileRoute'
import AddPost from '../pages/AddPost'
import SearchUserPage from '../pages/SearchUsersPage'
const MainRoutes = () => {
  return (
    <Routes>
       <Route path='/' element={<PublicView><HomeRoute/></PublicView>} />
       <Route path='/profile/:username' element={<PublicView><ProfileRoute/></PublicView>} />
       <Route path='/create-post' element={<PublicView><AddPost/></PublicView>} />
       <Route path='/public-posts' element={<PublicView><PublicPostRoute/></PublicView>} />
       <Route path='/about' element={<PublicView><AboutRoute/></PublicView>} />
       <Route path='/contact' element={<PublicView><ContactRoute/></PublicView>} />
      <Route path='/search' element={<PublicView><SearchUserPage/></PublicView>} />
    </Routes>
  )
}

export default MainRoutes
