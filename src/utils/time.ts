import { format, toZonedTime } from 'date-fns-tz';
import { TimeZone, WorldClock, TimeFormat, DateFormat } from '@/types';

export function getCurrentTimeInZone(timeZone: TimeZone): WorldClock {
  const now = new Date();
  const zonedTime = toZonedTime(now, timeZone.id);
  
  return {
    timeZone,
    currentTime: zonedTime,
    formattedTime: formatTime(zonedTime, timeZone.id, '12h'),
    formattedDate: formatDate(zonedTime, timeZone.id, 'medium'),
  };
}

export function formatTime(
  date: Date,
  timeZoneId: string,
  timeFormat: TimeFormat = '12h'
): string {
  const pattern = timeFormat === '12h' ? 'h:mm:ss a' : 'HH:mm:ss';
  return format(toZonedTime(date, timeZoneId), pattern, { timeZone: timeZoneId });
}

export function formatDate(
  date: Date,
  timeZoneId: string,
  dateFormat: DateFormat = 'medium'
): string {
  const patterns = {
    short: 'MMM d',
    medium: 'MMM d, yyyy',
    long: 'EEEE, MMMM d, yyyy'
  };
  
  return format(toZonedTime(date, timeZoneId), patterns[dateFormat], { timeZone: timeZoneId });
}

export function getTimeZoneOffset(timeZoneId: string): string {
  const now = new Date();
  const utc = new Date(now.getTime() + (now.getTimezoneOffset() * 60000));
  const targetTime = new Date(utc.toLocaleString('en-US', { timeZone: timeZoneId }));
  const diff = (targetTime.getTime() - utc.getTime()) / (1000 * 60 * 60);
  
  const sign = diff >= 0 ? '+' : '-';
  const hours = Math.floor(Math.abs(diff));
  const minutes = Math.abs(diff) % 1 * 60;
  
  if (minutes === 0) {
    return `UTC${sign}${hours}`;
  }
  return `UTC${sign}${hours}:${minutes.toString().padStart(2, '0')}`;
}

export function isDaylightSavingTime(timeZoneId: string): boolean {
  const now = new Date();
  const jan = new Date(now.getFullYear(), 0, 1);
  const jul = new Date(now.getFullYear(), 6, 1);
  
  const janOffset = getTimezoneOffset(jan, timeZoneId);
  const julOffset = getTimezoneOffset(jul, timeZoneId);
  const currentOffset = getTimezoneOffset(now, timeZoneId);
  
  return currentOffset !== Math.max(janOffset, julOffset);
}

function getTimezoneOffset(date: Date, timeZoneId: string): number {
  const utc = new Date(date.getTime() + (date.getTimezoneOffset() * 60000));
  const target = new Date(utc.toLocaleString('en-US', { timeZone: timeZoneId }));
  return (target.getTime() - utc.getTime()) / (1000 * 60 * 60);
}

export function getRelativeTimeString(date: Date): string {
  const now = new Date();
  const diffInSeconds = Math.floor((now.getTime() - date.getTime()) / 1000);
  
  if (diffInSeconds < 60) {
    return 'now';
  }
  
  const diffInMinutes = Math.floor(diffInSeconds / 60);
  if (diffInMinutes < 60) {
    return `${diffInMinutes}m ago`;
  }
  
  const diffInHours = Math.floor(diffInMinutes / 60);
  if (diffInHours < 24) {
    return `${diffInHours}h ago`;
  }
  
  const diffInDays = Math.floor(diffInHours / 24);
  return `${diffInDays}d ago`;
}