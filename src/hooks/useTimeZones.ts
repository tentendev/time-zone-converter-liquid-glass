import { useState, useEffect, useCallback } from 'react';
import { useLocalStorage } from './useLocalStorage';
import { WorldClock, TimeFormat, DateFormat } from '@/types';
import { POPULAR_TIMEZONES } from '@/utils/timezones';
import { getCurrentTimeInZone } from '@/utils/time';

export function useTimeZones() {
  const [selectedTimeZones, setSelectedTimeZones] = useLocalStorage<string[]>('selectedTimeZones', [
    'America/New_York',
    'Europe/London',
    'Asia/Tokyo',
    'America/Los_Angeles'
  ]);
  
  const [timeFormat, setTimeFormat] = useLocalStorage<TimeFormat>('timeFormat', '12h');
  const [dateFormat, setDateFormat] = useLocalStorage<DateFormat>('dateFormat', 'medium');
  const [worldClocks, setWorldClocks] = useState<WorldClock[]>([]);

  const updateTimes = useCallback(() => {
    const clocks = selectedTimeZones
      .map(tzId => {
        const timeZone = POPULAR_TIMEZONES.find(tz => tz.id === tzId);
        if (!timeZone) return null;
        return getCurrentTimeInZone(timeZone);
      })
      .filter((clock): clock is WorldClock => clock !== null);
    
    setWorldClocks(clocks);
  }, [selectedTimeZones]);

  useEffect(() => {
    updateTimes();
    const interval = setInterval(updateTimes, 1000);
    return () => clearInterval(interval);
  }, [updateTimes]);

  const addTimeZone = (timeZoneId: string) => {
    if (!selectedTimeZones.includes(timeZoneId)) {
      setSelectedTimeZones(prev => [...prev, timeZoneId]);
    }
  };

  const removeTimeZone = (timeZoneId: string) => {
    setSelectedTimeZones(prev => prev.filter(id => id !== timeZoneId));
  };

  const reorderTimeZones = (fromIndex: number, toIndex: number) => {
    setSelectedTimeZones(prev => {
      const newOrder = [...prev];
      const [moved] = newOrder.splice(fromIndex, 1);
      newOrder.splice(toIndex, 0, moved);
      return newOrder;
    });
  };

  return {
    selectedTimeZones,
    worldClocks,
    timeFormat,
    dateFormat,
    setTimeFormat,
    setDateFormat,
    addTimeZone,
    removeTimeZone,
    reorderTimeZones,
    availableTimeZones: POPULAR_TIMEZONES,
  };
}