import { ROUTES, STOP_ALIASES } from '../data/busData';

function isWeekend() {
  return new Date().getDay() === 0 || new Date().getDay() === 6;
}

function getSchedule(route, direction) {
  const weekend = isWeekend();
  const offsetsKey = weekend ? `weekend${direction === 'fwd' ? 'FwdOffsets' : 'BwdOffsets'}` : (direction === 'fwd' ? 'fwdOffsets' : 'bwdOffsets');
  const intervalKey = weekend ? 'weekendInterval' : 'interval';
  const firstKey = weekend ? `weekendFirstBus${direction === 'fwd' ? 'Fwd' : 'Bwd'}` : `firstBus${direction === 'fwd' ? 'Fwd' : 'Bwd'}`;
  const lastKey = weekend ? `weekendLastBus${direction === 'fwd' ? 'Fwd' : 'Bwd'}` : `lastBus${direction === 'fwd' ? 'Fwd' : 'Bwd'}`;

  return {
    offsets: route[offsetsKey] || (direction === 'fwd' ? route.fwdOffsets : route.bwdOffsets),
    interval: route[intervalKey] || route.interval,
    firstBus: route[firstKey] || route[direction === 'fwd' ? 'firstBusFwd' : 'firstBusBwd'] || route.firstBus,
    lastBus: route[lastKey] || route[direction === 'fwd' ? 'lastBusFwd' : 'lastBusBwd'] || route.lastBus,
  };
}

export function parseTime(str) {
  const [h, m] = str.split(':').map(Number);
  return h * 60 + m;
}

export function minToStr(total) {
  const h = Math.floor(total / 60) % 24;
  const m = total % 60;
  const ap = h >= 12 ? 'PM' : 'AM';
  const hh = h % 12 || 12;
  return `${hh}:${m.toString().padStart(2, '0')} ${ap}`;
}

export function getRouteTime(route, direction, key) {
  const suffix = direction === 'fwd' ? 'Fwd' : 'Bwd';
  const weekend = isWeekend();
  if (weekend && key === 'firstBus') return route[`weekendFirstBus${suffix}`] || route[`firstBus${suffix}`] || route[key];
  if (weekend && key === 'lastBus') return route[`weekendLastBus${suffix}`] || route[`lastBus${suffix}`] || route[key];
  return route[`${key}${suffix}`] || route[key];
}

export function getUpcoming(route, direction, stopIdx, nowMins, count = 4) {
  const { offsets, interval, firstBus, lastBus } = getSchedule(route, direction);
  if (stopIdx >= offsets.length || stopIdx < 0) return [];
  const offset = offsets[stopIdx];
  const start = parseTime(firstBus);
  const end = parseTime(lastBus);
  const results = [];
  let dep = start;
  while (dep <= end && results.length < count) {
    const arr = dep + offset;
    if (arr >= nowMins) results.push({ time: minToStr(arr), mins: arr, dep });
    dep += interval;
  }
  return results;
}

export function getAllTimesForStop(route, direction, stopIdx) {
  const { offsets, interval, firstBus, lastBus } = getSchedule(route, direction);
  if (stopIdx >= offsets.length || stopIdx < 0) return [];
  const offset = offsets[stopIdx];
  const start = parseTime(firstBus);
  const end = parseTime(lastBus);
  const results = [];
  let dep = start;
  while (dep <= end) {
    const arr = dep + offset;
    results.push({ time: minToStr(arr), mins: arr, dep });
    dep += interval;
  }
  return results;
}

export function getNextForStop(route, direction, stopIdx, nowMins) {
  const res = getUpcoming(route, direction, stopIdx, nowMins, 1);
  return res.length ? res[0] : null;
}

export function findStopIndex(route, direction, stop) {
  const stops = direction === 'fwd' ? route.fwdStops : route.bwdStops;
  let idx = stops.indexOf(stop);
  if (idx !== -1) return idx;
  const alias = STOP_ALIASES[stop];
  if (alias) {
    idx = stops.indexOf(alias);
    if (idx !== -1) return idx;
  }
  return stops.findIndex(s => s.toLowerCase() === stop.toLowerCase());
}

export function nowMins() {
  const d = new Date();
  return d.getHours() * 60 + d.getMinutes();
}