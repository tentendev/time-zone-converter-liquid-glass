export interface TimeZone {
  id: string;
  name: string;
  city: string;
  country: string;
  offset: string;
  abbreviation: string;
  isDST: boolean;
}

export interface WorldClock {
  timeZone: TimeZone;
  currentTime: Date;
  formattedTime: string;
  formattedDate: string;
}

export interface TimeZoneSearchResult {
  timeZone: TimeZone;
  score: number;
}

export type TimeFormat = '12h' | '24h';
export type DateFormat = 'short' | 'medium' | 'long';
export type Theme = 'light' | 'dark' | 'system';