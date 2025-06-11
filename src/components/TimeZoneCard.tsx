'use client';

import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X } from 'lucide-react';
import { Card, CardContent } from '@/components/ui';
import { WorldClock } from '@/types';
import { formatTime, formatDate } from '@/utils/time';
import { cn } from '@/lib/utils';

interface TimeZoneCardProps {
  worldClock: WorldClock;
  onRemove?: () => void;
  isRemovable?: boolean;
  className?: string;
}

export function TimeZoneCard({ 
  worldClock, 
  onRemove, 
  isRemovable = true,
  className 
}: TimeZoneCardProps) {
  const [currentTime, setCurrentTime] = useState(worldClock.currentTime);
  const [isHovered, setIsHovered] = useState(false);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentTime(new Date());
    }, 1000);

    return () => clearInterval(interval);
  }, []);

  const formattedTime = formatTime(currentTime, worldClock.timeZone.id, '12h');
  const formattedDate = formatDate(currentTime, worldClock.timeZone.id, 'medium');

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
      exit={{ opacity: 0, scale: 0.95 }}
      transition={{ duration: 0.2 }}
      whileHover={{ y: -2 }}
      onHoverStart={() => setIsHovered(true)}
      onHoverEnd={() => setIsHovered(false)}
    >
      <Card className={cn('relative group', className)}>
        <CardContent className="p-6">
          <div className="flex items-start justify-between mb-4">
            <div className="flex-1">
              <h3 className="font-semibold text-lg text-foreground mb-1">
                {worldClock.timeZone.city}
              </h3>
              <p className="text-sm text-muted-foreground">
                {worldClock.timeZone.country}
              </p>
              <p className="text-xs text-muted-foreground mt-1">
                {worldClock.timeZone.offset} • {worldClock.timeZone.abbreviation}
              </p>
            </div>
            
            <AnimatePresence>
              {isRemovable && (isHovered || !onRemove) && (
                <motion.button
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.8 }}
                  onClick={onRemove}
                  className="p-1 rounded-lg hover:bg-destructive/10 hover:text-destructive transition-colors"
                  aria-label={`Remove ${worldClock.timeZone.city} timezone`}
                >
                  <X size={16} />
                </motion.button>
              )}
            </AnimatePresence>
          </div>

          <div className="space-y-2">
            <div className="text-3xl md:text-4xl font-mono font-light text-foreground">
              {formattedTime}
            </div>
            <div className="text-sm text-muted-foreground">
              {formattedDate}
            </div>
          </div>

          {worldClock.timeZone.isDST && (
            <div className="mt-3 inline-flex items-center px-2 py-1 rounded-full bg-amber-100 dark:bg-amber-900/30 text-amber-700 dark:text-amber-300 text-xs">
              DST Active
            </div>
          )}
        </CardContent>
      </Card>
    </motion.div>
  );
}