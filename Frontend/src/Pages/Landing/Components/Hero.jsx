import React from 'react';
import { motion, scale } from "framer-motion";
import { Navigate, useNavigate } from 'react-router-dom';
import Female from "./Resources/Female.json"
import Lottie from "lottie-react"

function Hero() {
    const navigate = useNavigate();
  return (

    <div className='min-h-screen bg-cover bg-center'     style={{ backgroundImage: "url('src/Pages/Landing/Components/Resources/bo-play-1920x1080.png')" }}>
          <div className=' w-full flex  h-[700px] items-center justify-center'>

      <motion.div
        initial={{ opacity: 0.4, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1 }}
        whileHover={{scale: 1.04}}
        className="text-center px-4 
    
        "
      >

        <h1 className="font-extralight text-6xl leading-20 tracking-wider text-white ">
          Transform Your Patient Interactions <br/>
          with Complete Control and Privacy
        </h1>
        <motion.button 
        initial = {{opacity: 0}}
        whileHover={{scale : 1.1}}
        whileTap={{scale : 1.1}}
        animate = {{opacity : 1}}
         transition={{ type: "tween", duration: 0.2,  }}
        className='px-6 py-4 border-2 rounded-4xl mt-4'
        onClick={()=>{navigate("/login")}}
        >
            Get Started In 30 Minute
        </motion.button>

      </motion.div>

     
      

    </div>

     <div className='h-[400px] overflow-hidden font-semibold mb-10  text-2xl  w-full  border-t'>

        <div className='m-10 flex gap-1  '>
           <h1>
            Why Clinix 
           </h1>
           <h1 className="underline">Sphere?
           </h1>

        </div>

        <div className='  sm:gap-5 mr-40 ml-40 flex items-center justify-between'>
           <motion.div className='flex flex-col gap-4 '
           whileHover={{scale: 1.05}}>
            <motion.h1 
            whileHover={{scale : 1.1}}
            className='relative inline-block cursor-pointer'>
               • Complete Privacy & Control
                            <motion.span
                  className="absolute left-0 bottom-0 h-0.5 bg-white"
                  initial={{ width: 0 }}
                  whileHover={{ width: "100%" }}
                  transition={{ duration: 0.3 }}
                 />

                
            </motion.h1>

            <motion.h2 className="font-light">
                Your clinic, lab, or <br/>pharmacy manages<br/> all data and patient <br/>interactions directly,<br/> with no third-party <br/>interference.
            </motion.h2>
           </motion.div>
            <motion.div className='flex flex-col gap-4 '
           whileHover={{scale: 1.05}}>
            <motion.h1 
            whileHover={{scale : 1.1}}
            className='relative inline-block cursor-pointer'>
               • Instant Setup
                            <motion.span
                  className="absolute left-0 bottom-0 h-0.5 bg-white"
                  initial={{ width: 0 }}
                  whileHover={{ width: "100%" }}
                  transition={{ duration: 0.3 }}
                 />

                
            </motion.h1>

            <motion.h2 className="font-light">
                Launch your fully branded <br/> app in just 30 minutes, <br/> eliminating months <br/> of development.
            </motion.h2>
           </motion.div>

            <motion.div className='flex flex-col gap-4 '
           whileHover={{scale: 1.05}}>
            <motion.h1 
            whileHover={{scale : 1.1}}
            className='relative inline-block cursor-pointer'>
               • Seamless Medical Network
                            <motion.span
                  className="absolute left-0 bottom-0 h-0.5 bg-white"
                  initial={{ width: 0 }}
                  whileHover={{ width: "100%" }}
                  transition={{ duration: 0.3 }}
                 />

                
            </motion.h1>

            <motion.h2 className="font-light">
               Connect effortlessly <br/> with patients, labs, <br/> and chemists to <br/> streamline <br/>  continuity of care.
            </motion.h2>
           </motion.div>
            
        </div>
        
      </div>

      <div className='h-[400px]  w-full border-t flex  justify-between '>
        <div className=' w-[70%] max-h-full '>
            <h1 className="text-2xl font-semibold p-10">Key Features !</h1>

            <div className='flex items-center ml-30 justify-between'>
                <motion.div  whileHover={{scale: 1.05}} >
                    <motion.h1  
                    className="font-bold text-2xl" whileHover={{scale : 1.1}}
                    >
                       • Quick, Custom Setup
                    </motion.h1>

                    <motion.h2 className='text-2xl font-light'>
                        Your practice, your  <br/> brand—in minutes.<br/> Clinix Sphere helps you launch<br/> a custom app tailored<br/> to your needs without the usual wait.
                    </motion.h2>
                </motion.div>

                  <motion.div  whileHover={{scale: 1.05}} >
                    <motion.h1  
                    className="font-bold text-2xl" whileHover={{scale : 1.1}}
                    >
                        • Independent Control
                    </motion.h1>
                    <motion.h2 className="text-2xl font-light">
                        Take control of your patient<br/> data and  interactions. Clinix Sphere <br/>offers a private digital space <br/>for secure management of all healthcare <br/> needs.
                    </motion.h2>
                </motion.div>


                
            </div>

        </div>
        <div className=' w-[30%]  relative'>
            <Lottie 
                 className="absolute bottom-0 left-1/2 -translate-x-1/2"
                 animationData={Female} 
                 loop={true} 
                 style={{ width: 400 }} 
                />
        </div>

      </div>

      <div class="bg-black text-white h-[300px] flex flex-col items-center justify-center space-y-4">
  <p class="text-lg">Connect with me:</p>
  <div class="flex space-x-6">
    <a href="https://github.com/keshav-sudo" target="_blank" class="hover:underline">GitHub</a>
    <a href="https://x.com/keshavsharmma" target="_blank" class="hover:underline">X</a>
    <a href="https://www.linkedin.com/in/thesharmakeshav/" target="_blank" class="hover:underline">LinkedIn</a>
  </div>
  <p class="mt-4 text-sm">&copy; 2025 Keshav Sharma. All rights reserved.</p>
</div>

    </div>
  
  )
}

export default Hero;
