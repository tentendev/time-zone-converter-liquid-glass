'use client';

import { motion } from 'framer-motion';
import { Header } from '@/components/layout';
import { MainClock, TimeZoneGrid, TimeZoneSearch } from '@/components';
import { useTimeZones } from '@/hooks';

export default function Home() {
  const {
    worldClocks,
    availableTimeZones,
    selectedTimeZones,
    addTimeZone,
    removeTimeZone,
  } = useTimeZones();

  const primaryClock = worldClocks[0];

  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-background to-accent/5">
      <div className="absolute inset-0 bg-gradient-glass opacity-30" />
      
      <div className="relative">
        <Header />
        
        <main className="container mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className="space-y-8">
            {/* Main Clock Section */}
            {primaryClock && (
              <motion.section
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6 }}
                className="mb-12"
              >
                <MainClock worldClock={primaryClock} />
              </motion.section>
            )}

            {/* Search Section */}
            <motion.section
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.1 }}
              className="max-w-md mx-auto"
            >
              <TimeZoneSearch
                availableTimeZones={availableTimeZones}
                selectedTimeZones={selectedTimeZones}
                onAddTimeZone={addTimeZone}
              />
            </motion.section>

            {/* Time Zones Grid */}
            <motion.section
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
            >
              {worldClocks.length > 1 && (
                <div className="mb-6">
                  <h2 className="text-2xl font-semibold text-foreground mb-2">
                    Other Time Zones
                  </h2>
                  <p className="text-muted-foreground">
                    Compare times across different regions
                  </p>
                </div>
              )}
              
              <TimeZoneGrid
                worldClocks={worldClocks.slice(1)}
                onRemoveTimeZone={removeTimeZone}
              />
            </motion.section>

            {/* Empty State */}
            {worldClocks.length === 0 && (
              <motion.section
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.3 }}
                className="text-center py-16"
              >
                <div className="space-y-4">
                  <div className="text-6xl">🌍</div>
                  <h2 className="text-2xl font-semibold text-foreground">
                    Welcome to Time Zone Converter
                  </h2>
                  <p className="text-muted-foreground max-w-md mx-auto">
                    Start by searching and adding time zones from around the world to track multiple times at once.
                  </p>
                </div>
              </motion.section>
            )}
          </div>
        </main>

        {/* Footer */}
        <footer className="border-t border-border/40 glass mt-16">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-6">
            <div className="text-center text-sm text-muted-foreground">
              <p>
                Built with Next.js, Tailwind CSS, and Framer Motion
              </p>
              <p className="mt-1">
                Featuring Apple Liquid Glass UI design
              </p>
            </div>
          </div>
        </footer>
      </div>
    </div>
  );
}
