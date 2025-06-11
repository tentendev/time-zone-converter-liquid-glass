import { useState, useMemo } from 'react';
import Fuse from 'fuse.js';
import { TimeZone } from '@/types';

const searchOptions = {
  keys: [
    { name: 'city', weight: 0.4 },
    { name: 'country', weight: 0.3 },
    { name: 'name', weight: 0.2 },
    { name: 'abbreviation', weight: 0.1 },
  ],
  threshold: 0.3,
  includeScore: true,
  minMatchCharLength: 1,
};

export function useSearch(timeZones: TimeZone[]) {
  const [query, setQuery] = useState('');

  const fuse = useMemo(() => new Fuse(timeZones, searchOptions), [timeZones]);

  const results = useMemo(() => {
    if (!query.trim()) {
      return timeZones;
    }

    const searchResults = fuse.search(query);
    return searchResults.map(result => result.item);
  }, [query, fuse, timeZones]);

  return {
    query,
    setQuery,
    results,
    hasQuery: query.trim().length > 0,
  };
}