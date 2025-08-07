import React from 'react'
import MainRoutes from './routes/MainRoutes'
import { AuthContext, AuthContextProvider } from './contexts/AuthContext'
import ErrorBoundary from './util/ErrorBundary'
import { FeedContextProvider } from './contexts/FeedContext'
import { UsersContextProvider } from './contexts/UsersContext'

const App = () => {
  return (
    // Add Contexts
    <div>
      <ErrorBoundary>
        <AuthContextProvider>
          <UsersContextProvider>
          <FeedContextProvider>
            <MainRoutes />
          </FeedContextProvider>
          </UsersContextProvider>
        </AuthContextProvider>
      </ErrorBoundary>
    </div>
  )
}

export default App
