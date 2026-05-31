export function addMinutes(date, minutes) {
  return new Date(new Date(date).getTime() + minutes * 60000);
}

export function parseDate(input) {
  return new Date(input);
}

export function calculateEnd(start, durationMin) {
  return addMinutes(start, durationMin);
}
