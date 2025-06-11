'use client';

import { motion } from 'framer-motion';
import { Sun, Moon, Monitor } from 'lucide-react';
import { Button } from '@/components/ui';
import { useTheme } from '@/hooks/useTheme';

const themeIcons = {
  light: Sun,
  dark: Moon,
  system: Monitor,
};

const themeLabels = {
  light: 'Light',
  dark: 'Dark',
  system: 'System',
};

export function ThemeToggle() {
  const { theme, toggleTheme } = useTheme();
  const Icon = themeIcons[theme];

  return (
    <Button
      variant="glass"
      size="md"
      onClick={toggleTheme}
      className="relative overflow-hidden group"
      aria-label={`Switch to ${theme === 'light' ? 'dark' : theme === 'dark' ? 'system' : 'light'} theme`}
    >
      <motion.div
        key={theme}
        initial={{ scale: 0.5, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ duration: 0.2 }}
        className="flex items-center space-x-2"
      >
        <Icon className="w-4 h-4" />
        <span className="hidden sm:inline text-sm font-medium">
          {themeLabels[theme]}
        </span>
      </motion.div>
      
      <motion.div
        className="absolute inset-0 bg-primary/10 rounded-lg"
        initial={{ scale: 0, opacity: 0 }}
        whileHover={{ scale: 1, opacity: 1 }}
        transition={{ duration: 0.2 }}
      />
    </Button>
  );
}