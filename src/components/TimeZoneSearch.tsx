'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Search, Plus, X } from 'lucide-react';
import { Input, Card } from '@/components/ui';
import { useSearch } from '@/hooks/useSearch';
import { TimeZone } from '@/types';
import { cn } from '@/lib/utils';

interface TimeZoneSearchProps {
  availableTimeZones: TimeZone[];
  selectedTimeZones: string[];
  onAddTimeZone: (timeZoneId: string) => void;
  className?: string;
}

export function TimeZoneSearch({
  availableTimeZones,
  selectedTimeZones,
  onAddTimeZone,
  className,
}: TimeZoneSearchProps) {
  const [isOpen, setIsOpen] = useState(false);
  const { query, setQuery, results, hasQuery } = useSearch(availableTimeZones);

  const filteredResults = results.filter(
    (tz) => !selectedTimeZones.includes(tz.id)
  );

  const handleAddTimeZone = (timeZoneId: string) => {
    onAddTimeZone(timeZoneId);
    setQuery('');
    setIsOpen(false);
  };

  return (
    <div className={cn('relative', className)}>
      <div className="relative">
        <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground w-4 h-4" />
        <Input
          type="text"
          placeholder="Search time zones..."
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          onFocus={() => setIsOpen(true)}
          className="pl-10 pr-10"
          variant="glass"
        />
        {hasQuery && (
          <button
            onClick={() => {
              setQuery('');
              setIsOpen(false);
            }}
            className="absolute right-3 top-1/2 transform -translate-y-1/2 text-muted-foreground hover:text-foreground transition-colors"
          >
            <X className="w-4 h-4" />
          </button>
        )}
      </div>

      <AnimatePresence>
        {isOpen && (hasQuery || filteredResults.length > 0) && (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.2 }}
            className="absolute top-full left-0 right-0 z-50 mt-2"
          >
            <Card className="max-h-80 overflow-y-auto">
              <div className="p-2">
                {filteredResults.length > 0 ? (
                  filteredResults.slice(0, 8).map((timeZone) => (
                    <motion.button
                      key={timeZone.id}
                      initial={{ opacity: 0, x: -10 }}
                      animate={{ opacity: 1, x: 0 }}
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                      onClick={() => handleAddTimeZone(timeZone.id)}
                      className="w-full flex items-center justify-between p-3 rounded-lg hover:bg-accent/50 transition-colors text-left group"
                    >
                      <div className="flex-1">
                        <div className="font-medium text-foreground">
                          {timeZone.city}
                        </div>
                        <div className="text-sm text-muted-foreground">
                          {timeZone.country} • {timeZone.offset}
                        </div>
                      </div>
                      <Plus className="w-4 h-4 text-muted-foreground group-hover:text-primary transition-colors" />
                    </motion.button>
                  ))
                ) : hasQuery ? (
                  <div className="p-4 text-center text-muted-foreground">
                    No time zones found for &quot;{query}&quot;
                  </div>
                ) : (
                  <div className="p-4 text-center text-muted-foreground">
                    All available time zones are already selected
                  </div>
                )}
              </div>
            </Card>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Backdrop to close search */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-40"
            onClick={() => setIsOpen(false)}
          />
        )}
      </AnimatePresence>
    </div>
  );
}