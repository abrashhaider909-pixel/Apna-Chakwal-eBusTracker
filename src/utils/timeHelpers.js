import { ROUTES, STOP_ALIASES } from '../data/busData';

export function parseTime(str){
  const [h,m] = str.split(':').map(Number);
  return h*60+m;
}

export function minToStr(total){
  const h = Math.floor(total/60)%24;
  const m = total%60;
  const ap = h>=12?'PM':'AM';
  const hh = h%12||12;
  return `${hh}:${m.toString().padStart(2,'0')} ${ap}`;
}

export function getRouteTime(route, direction, key){
  const suffix = direction === 'fwd' ? 'Fwd' : 'Bwd';
  return route[`${key}${suffix}`] || route[key];
}

export function getUpcoming(route, direction, stopIdx, nowMins, count=4){
  const offsets = direction==='fwd' ? route.fwdOffsets : route.bwdOffsets;
  if(stopIdx >= offsets.length || stopIdx < 0) return [];
  const offset = offsets[stopIdx];
  const start = parseTime(getRouteTime(route, direction, 'firstBus'));
  const end   = parseTime(getRouteTime(route, direction, 'lastBus'));
  const interval = route.interval;
  const results = [];
  let dep = start;
  while(dep <= end && results.length < count){
    const arr = dep + offset;
    if(arr >= nowMins) results.push({time: minToStr(arr), mins: arr, dep});
    dep += interval;
  }
  return results;
}

export function getAllTimesForStop(route, direction, stopIdx){
  const offsets = direction==='fwd' ? route.fwdOffsets : route.bwdOffsets;
  if(stopIdx >= offsets.length || stopIdx < 0) return [];
  const offset = offsets[stopIdx];
  const start = parseTime(getRouteTime(route, direction, 'firstBus'));
  const end   = parseTime(getRouteTime(route, direction, 'lastBus'));
  const results = [];
  let dep = start;
  while(dep <= end){
    const arr = dep + offset;
    results.push({time: minToStr(arr), mins: arr, dep});
    dep += route.interval;
  }
  return results;
}

export function getNextForStop(route, direction, stopIdx, nowMins){
  const res = getUpcoming(route, direction, stopIdx, nowMins, 1);
  return res.length ? res[0] : null;
}

export function findStopIndex(route, direction, stop){
  const stops = direction==='fwd' ? route.fwdStops : route.bwdStops;
  let idx = stops.indexOf(stop);
  if(idx !== -1) return idx;
  const alias = STOP_ALIASES[stop];
  if(alias){
    idx = stops.indexOf(alias);
    if(idx !== -1) return idx;
  }
  return stops.findIndex(s => s.toLowerCase() === stop.toLowerCase());
}

export function nowMins(){
  const d = new Date();
  return d.getHours()*60+d.getMinutes();
}