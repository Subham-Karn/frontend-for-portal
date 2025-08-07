import { motion } from 'framer-motion'
export const Button = ({children, className, ...props}) =>{
  return (
    <motion.button
      whileTap={{ scale: 0.8 }}
      {...props}
      className={className}
    >
      {children}
    </motion.button>
  )
}

export const Loading  = () =>{
  return (
    <div className="flex items-center justify-center h-screen">
      <div className="animate-spin rounded-full h-32 w-32 border-t-4 border-b-4 border-gray-900"></div>
    </div>
  )
}