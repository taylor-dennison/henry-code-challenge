import {toMinutes} from '.';
import {TimeRange} from '../types';


const sortTimeRanges = (ranges: TimeRange[]): TimeRange[] => {
  return ranges.sort((a, b) => toMinutes(a.start) - toMinutes(b.start));
};


export default sortTimeRanges;