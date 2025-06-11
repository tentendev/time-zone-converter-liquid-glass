'use client';

import { motion, AnimatePresence } from 'framer-motion';
import { TimeZoneCard } from './TimeZoneCard';
import { WorldClock } from '@/types';

interface TimeZoneGridProps {
  worldClocks: WorldClock[];
  onRemoveTimeZone: (timeZoneId: string) => void;
  className?: string;
}

export function TimeZoneGrid({ 
  worldClocks, 
  onRemoveTimeZone, 
  className 
}: TimeZoneGridProps) {
  return (
    <div className={className}>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.3, staggerChildren: 0.1 }}
        className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6"
      >
        <AnimatePresence mode="popLayout">
          {worldClocks.map((worldClock, index) => (
            <motion.div
              key={worldClock.timeZone.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95 }}
              transition={{ 
                duration: 0.3,
                delay: index * 0.05,
                type: 'spring',
                stiffness: 200,
                damping: 20
              }}
              layout
            >
              <TimeZoneCard
                worldClock={worldClock}
                onRemove={() => onRemoveTimeZone(worldClock.timeZone.id)}
                isRemovable={worldClocks.length > 1}
              />
            </motion.div>
          ))}
        </AnimatePresence>
      </motion.div>

      {worldClocks.length === 0 && (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center py-12"
        >
          <div className="text-muted-foreground">
            <p className="text-lg mb-2">No time zones selected</p>
            <p className="text-sm">Add some time zones to get started</p>
          </div>
        </motion.div>
      )}
    </div>
  );
}