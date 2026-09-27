'use client';

import React, { ReactNode } from 'react';
import { motion, Variants } from 'framer-motion';
import { slideUp, staggerContainer, staggerItem } from '@/lib/animationVariants';

interface Props {
  children: ReactNode;
  className?: string;
  stagger?: boolean;
}

export const AnimatedSection: React.FC<Props> = ({ children, className = '', stagger = false }) => {
  if (stagger) {
    return (
      <motion.div
        className={className}
        variants={staggerContainer}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: '-100px' }}
      >
        {React.Children.map(children, (child) => (
          <motion.div variants={staggerItem}>{child}</motion.div>
        ))}
      </motion.div>
    );
  }

  return (
    <motion.div
      className={className}
      variants={slideUp}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, margin: '-100px' }}
    >
      {children}
    </motion.div>
  );
};
