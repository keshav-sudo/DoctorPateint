import React from 'react';
import { motion } from "framer-motion";
import { useNavigate } from 'react-router-dom';
import Female from "./Resources/Female.json"
import Lottie from "lottie-react"

function Hero() {
    const navigate = useNavigate();
  return (

    <div className='min-h-screen bg-gradient-to-br from-black via-gray-900 to-black relative overflow-hidden'>
      {/* Subtle blue glow effects */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute w-96 h-96 bg-blue-600/10 rounded-full blur-3xl -top-48 -left-48"></div>
        <div className="absolute w-96 h-96 bg-cyan-600/10 rounded-full blur-3xl -bottom-48 -right-48"></div>
      </div>
      
      <div className='w-full flex h-[500px] md:h-[700px] items-center justify-center px-4 relative z-10'>

      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        className="text-center px-4 max-w-5xl"
      >

        <motion.h1 
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.2, duration: 1 }}
          className="font-bold text-3xl sm:text-4xl md:text-5xl lg:text-7xl leading-tight md:leading-[1.2] tracking-wide text-white mb-6"
        >
          Transform Your Patient Interactions <br className="hidden sm:block"/>
          <span className="bg-gradient-to-r from-blue-400 to-cyan-400 bg-clip-text text-transparent">with Complete Control and Privacy</span>
        </motion.h1>
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.4, duration: 1 }}
          className="text-gray-400 text-base md:text-lg lg:text-xl mb-10 font-medium max-w-3xl mx-auto"
        >
          A premium healthcare management platform designed for excellence
        </motion.p>
        <motion.button 
        initial = {{opacity: 0, y: 20}}
        animate = {{opacity : 1, y: 0}}
        transition={{ delay: 0.6, duration: 0.6 }}
        whileHover={{scale : 1.05}}
        whileTap={{scale : 0.98}}
        className='px-8 md:px-10 py-4 md:py-4 bg-gradient-to-r from-blue-600 to-cyan-600 rounded-md text-base md:text-lg font-semibold tracking-wide hover:from-blue-500 hover:to-cyan-500 transition-all duration-300 shadow-xl shadow-blue-600/30'
        onClick={()=>{navigate("/login")}}
        >
            GET STARTED NOW
        </motion.button>

      </motion.div>

    </div>

     <div className='min-h-[500px] py-16 md:py-20 text-xl md:text-2xl w-full border-t border-blue-900/30 px-4 md:px-10 bg-gradient-to-b from-black to-gray-900'>

        <div className='m-4 md:m-10 mb-12'>
           <h1 className="text-3xl md:text-4xl font-bold tracking-wide">
            Why <span className="bg-gradient-to-r from-blue-400 to-cyan-400 bg-clip-text text-transparent">Clinix Sphere</span>?
           </h1>
        </div>

        <div className='flex flex-col md:flex-row gap-12 md:gap-8 mx-4 md:mx-20 lg:mx-40'>
           <motion.div 
             initial={{ opacity: 0, y: 20 }}
             whileInView={{ opacity: 1, y: 0 }}
             transition={{ duration: 0.6 }}
             className='flex flex-col gap-4 flex-1 p-6 border border-blue-900/30 rounded-lg bg-gradient-to-br from-blue-900/10 to-transparent hover:border-blue-600/50 transition-all'
           >
            <h1 className='text-xl md:text-2xl font-bold mb-2 text-blue-400'>
               Complete Privacy & Control
            </h1>
            <p className="text-gray-300 text-base md:text-lg font-medium leading-relaxed">
                Your clinic, lab, or pharmacy manages all data and patient interactions directly, with no third-party interference.
            </p>
           </motion.div>

            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className='flex flex-col gap-4 flex-1 p-6 border border-blue-900/30 rounded-lg bg-gradient-to-br from-cyan-900/10 to-transparent hover:border-cyan-600/50 transition-all'
            >
            <h1 className='text-xl md:text-2xl font-bold mb-2 text-cyan-400'>
               Instant Setup
            </h1>
            <p className="text-gray-300 text-base md:text-lg font-medium leading-relaxed">
                Launch your fully branded app in just 30 minutes, eliminating months of development.
            </p>
           </motion.div>

            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.4 }}
              className='flex flex-col gap-4 flex-1 p-6 border border-blue-900/30 rounded-lg bg-gradient-to-br from-blue-900/10 to-transparent hover:border-blue-600/50 transition-all'
            >
            <h1 className='text-xl md:text-2xl font-bold mb-2 text-blue-400'>
               Seamless Medical Network
            </h1>
            <p className="text-gray-300 text-base md:text-lg font-medium leading-relaxed">
               Connect effortlessly with patients, labs, and chemists to streamline continuity of care.
            </p>
           </motion.div>
            
        </div>
        
      </div>

      <div className='min-h-[500px] py-16 md:py-20 w-full border-t border-blue-900/30 flex flex-col md:flex-row justify-between px-4 md:px-10 bg-black'>
        <div className='w-full md:w-[65%]'>
            <h1 className="text-3xl md:text-4xl font-bold tracking-wide p-4 md:p-10 bg-gradient-to-r from-blue-400 to-cyan-400 bg-clip-text text-transparent">Key Features</h1>

            <div className='flex flex-col md:flex-row gap-12 md:gap-8 px-4 md:px-10'>
                <motion.div 
                  initial={{ opacity: 0, x: -20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.6 }}
                  className='flex-1'
                >
                    <h1 className="text-xl md:text-2xl font-bold mb-4 text-white">
                       Quick, Custom Setup
                    </h1>
                    <p className='text-base md:text-lg text-gray-300 font-medium leading-relaxed'>
                        Your practice, your brand—in minutes. Clinix Sphere helps you launch a custom app tailored to your needs without the usual wait.
                    </p>
                </motion.div>

                  <motion.div 
                    initial={{ opacity: 0, x: -20 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.6, delay: 0.2 }}
                    className='flex-1'
                  >
                    <h1 className="text-xl md:text-2xl font-bold mb-4 text-white">
                        Independent Control
                    </h1>
                    <p className="text-base md:text-lg text-gray-300 font-medium leading-relaxed">
                        Take control of your patient data and interactions. Clinix Sphere offers a private digital space for secure management of all healthcare needs.
                    </p>
                </motion.div>
            </div>

        </div>
        <div className='w-full md:w-[35%] flex items-center justify-center mt-12 md:mt-0'>
            <Lottie 
                 className="w-64 md:w-80 opacity-80"
                 animationData={Female} 
                 loop={true}
                />
        </div>

      </div>

      <div className="bg-black text-white border-t border-blue-900/30 min-h-[250px] flex flex-col items-center justify-center space-y-6 px-4 py-12">
        <p className="text-sm md:text-base text-gray-400 font-semibold tracking-widest">CONNECT WITH ME</p>
        <div className="flex flex-wrap justify-center gap-8">
          <a href="https://github.com/keshav-sudo" target="_blank" className="text-sm font-medium hover:text-blue-400 transition-colors">GitHub</a>
          <a href="https://x.com/keshavsharmma" target="_blank" className="text-sm font-medium hover:text-blue-400 transition-colors">X</a>
          <a href="https://www.linkedin.com/in/thesharmakeshav/" target="_blank" className="text-sm font-medium hover:text-blue-400 transition-colors">LinkedIn</a>
        </div>
        <p className="mt-4 text-xs text-gray-500 font-medium text-center">&copy; 2025 Keshav Sharma. All rights reserved.</p>
      </div>

    </div>
  
  )
}

export default Hero;
