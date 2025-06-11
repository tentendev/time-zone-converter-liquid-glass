'use client';

import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Card, CardContent } from '@/components/ui';
import { WorldClock } from '@/types';
import { formatTime, formatDate } from '@/utils/time';

interface MainClockProps {
  worldClock: WorldClock;
  className?: string;
}

export function MainClock({ worldClock, className }: MainClockProps) {
  const [currentTime, setCurrentTime] = useState(worldClock.currentTime);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentTime(new Date());
    }, 1000);

    return () => clearInterval(interval);
  }, []);

  const formattedTime = formatTime(currentTime, worldClock.timeZone.id, '12h');
  const formattedDate = formatDate(currentTime, worldClock.timeZone.id, 'long');
  const seconds = currentTime.getSeconds();

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className={className}
    >
      <Card className="relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-primary/5 via-transparent to-accent/5" />
        <CardContent className="relative p-8 md:p-12 text-center">
          <motion.div
            initial={{ scale: 0.9 }}
            animate={{ scale: 1 }}
            transition={{ type: 'spring', stiffness: 200, damping: 20 }}
          >
            <div className="mb-6">
              <h1 className="text-2xl md:text-3xl font-semibold text-foreground mb-2">
                {worldClock.timeZone.city}
              </h1>
              <p className="text-muted-foreground">
                {worldClock.timeZone.name} • {worldClock.timeZone.country}
              </p>
              <p className="text-sm text-muted-foreground mt-1">
                {worldClock.timeZone.offset} • {worldClock.timeZone.abbreviation}
              </p>
            </div>

            <div className="space-y-4">
              <div className="relative">
                <div className="text-6xl md:text-8xl font-mono font-light text-foreground tracking-tight">
                  {formattedTime.split(' ')[0]}
                </div>
                <div className="text-2xl md:text-3xl text-muted-foreground mt-2">
                  {formattedTime.split(' ')[1]}
                </div>
                
                {/* Seconds indicator */}
                <motion.div
                  key={seconds}
                  initial={{ scale: 0.8, opacity: 0 }}
                  animate={{ scale: 1, opacity: 1 }}
                  className="absolute -top-4 -right-4 w-3 h-3 bg-primary rounded-full"
                />
              </div>

              <div className="text-lg text-muted-foreground">
                {formattedDate}
              </div>
            </div>

            {worldClock.timeZone.isDST && (
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.3 }}
                className="mt-6 inline-flex items-center px-4 py-2 rounded-full bg-amber-100 dark:bg-amber-900/30 text-amber-700 dark:text-amber-300 text-sm font-medium"
              >
                Daylight Saving Time Active
              </motion.div>
            )}
          </motion.div>
        </CardContent>
      </Card>
    </motion.div>
  );
}