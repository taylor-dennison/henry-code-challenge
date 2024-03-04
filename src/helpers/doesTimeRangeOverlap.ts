import {toMinutes} from '.';
import {TimeRange} from '../types';

const doesTimeRangeOverlap = (newRange: TimeRange, existingRanges: TimeRange[]): boolean => {
  const newStart = toMinutes(newRange.start);
  const newEnd = toMinutes(newRange.end);

  for (let range of existingRanges) {
    const start = toMinutes(range.start);
    const end = toMinutes(range.end);

    if (newStart < end && newEnd > start) {
      return true; // Found an overlap
    }
  }
  return false; // No overlap
};

export default doesTimeRangeOverlap;