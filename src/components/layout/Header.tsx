'use client';

import { motion } from 'framer-motion';
import { Clock } from 'lucide-react';
import { ThemeToggle } from '@/components/ThemeToggle';

export function Header() {
  return (
    <motion.header
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="sticky top-0 z-40 border-b border-border/40 glass backdrop-blur-xl"
    >
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex h-16 items-center justify-between">
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="flex items-center space-x-3"
          >
            <div className="relative">
              <Clock className="w-8 h-8 text-primary" />
              <motion.div
                className="absolute inset-0"
                animate={{ rotate: 360 }}
                transition={{ duration: 10, repeat: Infinity, ease: 'linear' }}
              >
                <Clock className="w-8 h-8 text-primary/20" />
              </motion.div>
            </div>
            <div>
              <h1 className="text-xl font-bold text-foreground">
                Time Zone Converter
              </h1>
              <p className="text-xs text-muted-foreground hidden sm:block">
                Beautiful time zones at a glance
              </p>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
          >
            <ThemeToggle />
          </motion.div>
        </div>
      </div>
    </motion.header>
  );
}