export function canBook({ start, end, now, blocked, bookings }) {
  if (blocked) return false;
  if (start <= now) return false;
  if (start >= end) return false;
  if (end > 1440) return false;
  
  const duration = end - start;
  if (duration > 120) return false;
  
  for (const b of bookings) {
    if (start < b.end && end > b.start) {
      return false;
    }
  }
  
  return true;
}