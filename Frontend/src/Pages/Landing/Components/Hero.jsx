import React from 'react';
import { motion, scale } from "framer-motion";
import { Navigate, useNavigate } from 'react-router-dom';
import Female from "./Resources/Female.json"
import Lottie from "lottie-react"

function Hero() {
    const navigate = useNavigate();
  return (

    <div className='min-h-screen bg-cover bg-center'     style={{ backgroundImage: "url('src/Pages/Landing/Components/Resources/bo-play-1920x1080.png')" }}>
          <div className='w-full flex h-[500px] md:h-[700px] items-center justify-center px-4'>

      <motion.div
        initial={{ opacity: 0.4, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1 }}
        whileHover={{scale: 1.04}}
        className="text-center px-4"
      >

        <h1 className="font-extralight text-2xl sm:text-3xl md:text-4xl lg:text-6xl leading-tight md:leading-20 tracking-wider text-white">
          Transform Your Patient Interactions <br className="hidden sm:block"/>
          with Complete Control and Privacy
        </h1>
        <motion.button 
        initial = {{opacity: 0}}
        whileHover={{scale : 1.1}}
        whileTap={{scale : 1.1}}
        animate = {{opacity : 1}}
         transition={{ type: "tween", duration: 0.2,  }}
        className='px-4 md:px-6 py-3 md:py-4 border-2 rounded-4xl mt-4 text-sm md:text-base'
        onClick={()=>{navigate("/login")}}
        >
            Get Started In 30 Minutes
        </motion.button>

      </motion.div>

     
      

    </div>

     <div className='min-h-[400px] overflow-hidden font-semibold mb-10 text-xl md:text-2xl w-full border-t px-4 md:px-10'>

        <div className='m-4 md:m-10 flex gap-1'>
           <h1>
            Why Clinix 
           </h1>
           <h1 className="underline">Sphere?
           </h1>

        </div>

        <div className='flex flex-col md:flex-row gap-8 md:gap-5 mx-4 md:mx-20 lg:mx-40 items-start md:items-center md:justify-between'>
           <motion.div className='flex flex-col gap-4'
           whileHover={{scale: 1.05}}>
            <motion.h1 
            whileHover={{scale : 1.1}}
            className='relative inline-block cursor-pointer text-lg md:text-xl'>
               • Complete Privacy & Control
                            <motion.span
                  className="absolute left-0 bottom-0 h-0.5 bg-white"
                  initial={{ width: 0 }}
                  whileHover={{ width: "100%" }}
                  transition={{ duration: 0.3 }}
                 />

                
            </motion.h1>

            <motion.h2 className="font-light text-base md:text-lg">
                Your clinic, lab, or pharmacy manages all data and patient interactions directly, with no third-party interference.
            </motion.h2>
           </motion.div>
            <motion.div className='flex flex-col gap-4'
           whileHover={{scale: 1.05}}>
            <motion.h1 
            whileHover={{scale : 1.1}}
            className='relative inline-block cursor-pointer text-lg md:text-xl'>
               • Instant Setup
                            <motion.span
                  className="absolute left-0 bottom-0 h-0.5 bg-white"
                  initial={{ width: 0 }}
                  whileHover={{ width: "100%" }}
                  transition={{ duration: 0.3 }}
                 />

                
            </motion.h1>

            <motion.h2 className="font-light text-base md:text-lg">
                Launch your fully branded app in just 30 minutes, eliminating months of development.
            </motion.h2>
           </motion.div>

            <motion.div className='flex flex-col gap-4'
           whileHover={{scale: 1.05}}>
            <motion.h1 
            whileHover={{scale : 1.1}}
            className='relative inline-block cursor-pointer text-lg md:text-xl'>
               • Seamless Medical Network
                            <motion.span
                  className="absolute left-0 bottom-0 h-0.5 bg-white"
                  initial={{ width: 0 }}
                  whileHover={{ width: "100%" }}
                  transition={{ duration: 0.3 }}
                 />

                
            </motion.h1>

            <motion.h2 className="font-light text-base md:text-lg">
               Connect effortlessly with patients, labs, and chemists to streamline continuity of care.
            </motion.h2>
           </motion.div>
            
        </div>
        
      </div>

      <div className='min-h-[400px] w-full border-t flex flex-col md:flex-row justify-between px-4 md:px-10'>
        <div className='w-full md:w-[70%] max-h-full'>
            <h1 className="text-xl md:text-2xl font-semibold p-4 md:p-10">Key Features !</h1>

            <div className='flex flex-col md:flex-row items-start md:items-center gap-8 md:gap-4 px-4 md:px-10 lg:ml-20 md:justify-between'>
                <motion.div whileHover={{scale: 1.05}}>
                    <motion.h1  
                    className="font-bold text-lg md:text-2xl" whileHover={{scale : 1.1}}
                    >
                       • Quick, Custom Setup
                    </motion.h1>

                    <motion.h2 className='text-base md:text-2xl font-light'>
                        Your practice, your brand—in minutes. Clinix Sphere helps you launch a custom app tailored to your needs without the usual wait.
                    </motion.h2>
                </motion.div>

                  <motion.div whileHover={{scale: 1.05}}>
                    <motion.h1  
                    className="font-bold text-lg md:text-2xl" whileHover={{scale : 1.1}}
                    >
                        • Independent Control
                    </motion.h1>
                    <motion.h2 className="text-base md:text-2xl font-light">
                        Take control of your patient data and interactions. Clinix Sphere offers a private digital space for secure management of all healthcare needs.
                    </motion.h2>
                </motion.div>


                
            </div>

        </div>
        <div className='w-full md:w-[30%] relative flex items-center justify-center mt-8 md:mt-0'>
            <Lottie 
                 className="w-64 md:w-auto md:absolute md:bottom-0 md:left-1/2 md:-translate-x-1/2"
                 animationData={Female} 
                 loop={true} 
                 style={{ maxWidth: 400 }} 
                />
        </div>

      </div>

      <div className="bg-black text-white min-h-[300px] flex flex-col items-center justify-center space-y-4 px-4 py-8">
  <p className="text-base md:text-lg">Connect with me:</p>
  <div className="flex flex-wrap justify-center gap-4 md:space-x-6">
    <a href="https://github.com/keshav-sudo" target="_blank" className="hover:underline">GitHub</a>
    <a href="https://x.com/keshavsharmma" target="_blank" className="hover:underline">X</a>
    <a href="https://www.linkedin.com/in/thesharmakeshav/" target="_blank" className="hover:underline">LinkedIn</a>
  </div>
  <p className="mt-4 text-xs md:text-sm text-center">&copy; 2025 Keshav Sharma. All rights reserved.</p>
</div>

    </div>
  
  )
}

export default Hero;
