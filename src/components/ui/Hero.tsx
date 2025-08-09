"use client";

import { motion } from 'framer-motion';
import Image from 'next/image';

const Hero = () => {
  return (
    <section className="relative flex min-h-[calc(100vh-4rem)] w-full items-center justify-center p-4">
      
      <div className="relative z-20 flex w-full max-w-5xl items-center justify-between">
        
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="space-y-4 text-left"
        >
          <p className="text-sm font-light uppercase tracking-widest text-gray-300">
            An Unrivaled Experience
          </p>
          <h1 className="text-5xl font-bold leading-none tracking-tighter text-light-text md:text-7xl">
            Echoes of the<br />Cosmos
          </h1>
        </motion.div>

        <motion.p
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8, delay: 0.4 }}
          className="hidden max-w-xs text-right text-sm leading-relaxed text-gray-400 md:block"
        >
          Engineered with precision for deep space acoustics. Our technology delivers a soundstage as vast as the universe itself.
        </motion.p>
      </div>

      <motion.div
        initial={{ opacity: 0, scale: 0.8 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 1 }}
        className="absolute left-[45%] top-[45%] z-10 h-48 w-48 -translate-x-1/2 -translate-y-1/2 md:h-64 md:w-64"
      >
        <motion.div
          animate={{ y: [-10, 10], x: [-5, 5] }}
          transition={{ duration: 12, repeat: Infinity, repeatType: 'reverse', ease: 'easeInOut' }}
        >
          <Image
            src="/astronaut.png"
            alt="Floating Astronaut"
            width={256}
            height={256}
            priority={true}
            className="opacity-90"
          />
        </motion.div>
      </motion.div>
      
      <div 
        className="absolute bottom-1 left-1/2 -translate-x-1/2 text-xs text-gray-400"
      >
        Scroll to explore
      </div>
    </section>
  );
};

export default Hero;