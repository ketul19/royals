'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { heroWords, heroLetter } from '@/lib/animationVariants';

interface Props {
  text1: string;
  text2: string;
}

export const HeroText: React.FC<Props> = ({ text1, text2 }) => {
  return (
    <motion.h1 
      className="text-[var(--hero)] font-display leading-[0.85] tracking-tighter uppercase mb-8"
      variants={heroWords}
      initial="hidden"
      animate="visible"
    >
      <div className="overflow-hidden">
        {text1.split('').map((char, i) => (
          <motion.span key={i} className="inline-block" variants={heroLetter}>
            {char === ' ' ? '\u00A0' : char}
          </motion.span>
        ))}
      </div>
      <div className="overflow-hidden text-accent">
        {text2.split('').map((char, i) => (
          <motion.span key={i} className="inline-block" variants={heroLetter}>
            {char === ' ' ? '\u00A0' : char}
          </motion.span>
        ))}
      </div>
    </motion.h1>
  );
};
