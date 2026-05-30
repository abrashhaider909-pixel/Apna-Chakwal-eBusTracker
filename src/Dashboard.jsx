import React, { useState, useEffect } from 'react';

const URDU = {
  "Tehsil Chowk":"تحصیل چوک","Chaper Bazar":"چاپر بازار","GPO":"جی پی او",
  "GBS":"جی بی ایس","Danish School":"ڈنش سکول","Sabzi Mandi":"سبزی منڈی",
  "Waqar Marbel":"وقار ماربل","Emporium":"ایمپوریم","Oderwal Chakwal":"اوڈوال چکوال",
  "District Complex":"ڈسٹرکٹ کمپلیکس","Fauji Foundation School":"فوجی فاؤنڈیشن اسکول",
  "New Chakwal City":"نیا چکوال سٹی","Mureed Stop":"مورید اسٹاپ",
  "Al Shifa Hospital":"الشفا ہسپتال","Chakwal Bari":"چکوال باری",
  "Thoha Bhader":"تھوہ بھادر","Thoha Bhader HBL":"تھوہ بھادر ایچ بی ایل",
  "Motorway(Lahore)":"موٹروے لاہور","Motorway(RWP)":"موٹروے راولپنڈی",
  "Royal College":"رویال کالج","Balkassar":"بلکسر",
  "Oderwal Chowk":"اوڈوال چوک","Gov School no1":"گورنمنٹ اسکول",
  "Sabzai Mandi":"سبزی منڈی",
  "Dhoke Momen":"ڈھوک مومن","Pindi Patak":"پنڈی پٹاک","Ashraf Town":"اشرف ٹاؤن",
  "Behakari Stop":"بہاکڑی اسٹاپ","Dhab road":"ڈھاب روڈ",
  "Bharia Foundation School":"بھاریا فاؤنڈیشن","Chak Bizd":"چک بزد",
  "Munwar Eye Hospital":"منور آئی ہسپتال","Nai abadi Chak Nauarang":"نئی آبادی چک نوارنگ",
  "Chak Nauarang":"چک نوارنگ","chak Umaraa":"چک امارا","Dhoke Wadhan":"ڈھوک واڈھن",
  "Mona":"مونا","Harrar Chowk":"ہرار چوک","Fareed Kassar Road":"فرید کاسر روڈ",
  "Dhudial":"دھودال","Tehsil chowk":"تحصیل چوک",
  "Ali Masjid":"علی مسجد","Choa Chowk":"چوا چوک","dab":"ڈاب",
  "Mohra kot Chasham Morr":"موہرہ کوٹ چشم مور","Chattal":"چھتال",
  "Khewal":"خوال","Sarkaal Miar":"سرکال میار","Saigolabad":"سیگول آباد",
  "Chak Bakar Shah":"چک بکر شاہ","Khanpur":"خانپور","Dhumman":"دھمن",
  "sosian":"سوشیان","jand khanzada":"جند خانزادہ","pindi gujran":"پنڈی گجران",
  "dhurragi rajgan":"دھرگ راجگان","mulhal mughlan":"ملاح مغلان",
};

const u = (name) => URDU[name] || name;

const ROUTES = {
  balkasar: {
    name:"Tehsil Chowk ↔ Balkassar",
    shortName:"Balkassar Route",
    fwdLabel:"Tehsil Chowk →",
    bwdLabel:"Balkassar →",
    fwdStops:["Tehsil Chowk","Gov School no1","GPO","GBS","Danish School","Sabzi Mandi","Waqar Marbel","Emporium","Oderwal Chakwal","District Complex","Fauji Foundation School","New Chakwal City","Mureed Stop","Al Shifa Hospital","Chakwal Bari","Thoha Bhader","Thoha Bhader HBL","Motorway(Lahore)","Motorway(RWP)","Royal College","Balkassar"],
    fwdOffsets:[0,2,4,8,9,11,13,15,17,19,21,23,27,29,31,33,35,38,40,43,45],
    bwdStops:["Balkassar","Royal College","Motorway(RWP)","Motorway(Lahore)","Thoha Bhader HBL","Thoha Bhader","Chakwal Bari","Al Shifa Hospital","Mureed Stop","New Chakwal City","Fauji Foundation School","District Complex","Oderwal Chowk","Emporium","Waqar Marbel","Sabzai Mandi","GBS","GPO","Gov School no1","Tehsil Chowk"],
    bwdOffsets:[0,2,5,7,10,12,14,16,18,21,23,25,27,29,31,33,36,40,42,45],
    interval:41,
    firstBus:"06:00",lastBus:"21:43",
    firstBusFwd:"06:00",lastBusFwd:"20:21",
    firstBusBwd:"06:00",lastBusBwd:"21:43",
  },
  dhudial: {
    name:"District Complex ↔ Dhudial",
    shortName:"Dhudial Route",
    fwdLabel:"Complex →",
    bwdLabel:"Dhudial →",
    fwdStops:["District Complex","Oderwal Chowk","Emporium","Sabzi Mandi","GBS","GPO","Chaper Bazar","Tehsil chowk","Dhoke Momen","Pindi Patak","Ashraf Town","Behakari Stop","Dhab road","Bharia Foundation School","Chak Bizd","Munwar Eye Hospital","Nai abadi Chak Nauarang","Chak Nauarang","chak Umaraa","Dhoke Wadhan","Mona","Harrar Chowk","Fareed Kassar Road","Dhudial"],
    fwdOffsets:[0,2,4,6,8,11,13,15,17,19,20,24,25,27,28,30,33,34,36,38,40,42,44,45],
    bwdStops:["Dhudial","Fareed Kassar Road","Harrar Chowk","Mona","Dhoke Wadhan","chak Umaraa","Chak Nauarang","Nai abadi Chak Nauarang","Munwar Eye Hospital","Chak Bizd","Bharia Foundation School","Dhab road","Behakari Stop","Ashraf Town","Pindi Patak","Dhoke Momen","Tehsil chowk","Chaper Bazar","GPO","GBS","Sabzi Mandi","Emporium","Oderwal Chowk","District Complex"],
    bwdOffsets:[0,1,3,5,7,9,11,13,15,17,18,20,21,25,27,29,31,33,35,37,39,41,43,45],
    interval:33,
    firstBus:"06:00",lastBus:"21:24",
    firstBusFwd:"06:00",lastBusFwd:"21:24",
    firstBusBwd:"06:00",lastBusBwd:"21:24",
  },
  mulhal: {
    name:"Tehsil Chowk ↔ Mulhal Mughlan",
    shortName:"Mulhal Route",
    fwdLabel:"Tehsil Chowk →",
    bwdLabel:"Mulhal →",
    fwdStops:["Tehsil Chowk","Ali Masjid","Choa Chowk","dab","Mohra kot Chasham Morr","Chattal","Khewal","Sarkaal Miar","Saigolabad","Chak Bakar Shah","Khanpur","Dhumman","sosian","jand khanzada","pindi gujran","dhurragi rajgan","mulhal mughlan"],
    fwdOffsets:[0,2,6,9,10,16,20,24,27,33,39,40,45,47,51,56,60],
    bwdStops:["mulhal mughlan","dhurragi rajgan","pindi gujran","jand khanzada","sosian","Dhumman","Khanpur","Chak Bakar Shah","Saigolabad","Sarkaal Miar","Khewal","Chattal","Mohra kot Chasham Morr","dab","Choa Chowk","Ali Masjid","Tehsil Chowk"],
    bwdOffsets:[0,4,9,13,15,20,21,27,33,36,40,44,50,51,54,58,60],
    interval:75,
    firstBus:"06:00",lastBus:"20:00",
    firstBusFwd:"06:00",lastBusFwd:"18:30",
    firstBusBwd:"06:15",lastBusBwd:"20:00",
  }
};

const STOP_ALIASES = {
  "Oderwal Chakwal":"Oderwal Chowk",
  "Oderwal Chowk":"Oderwal Chakwal",
  "Sabzi Mandi":"Sabzai Mandi",
  "Sabzai Mandi":"Sabzi Mandi",
  "Tehsil Chowk":"Tehsil chowk",
  "Tehsil chowk":"Tehsil Chowk"
};

function parseTime(str){ 
  const [h,m] = str.split(':').map(Number);
  return h*60+m;
}
function minToStr(total){
  const h = Math.floor(total/60)%24;
  const m = total%60;
  const ap = h>=12?'PM':'AM';
  const hh = h%12||12;
  return `${hh}:${m.toString().padStart(2,'0')} ${ap}`;
}
function getRouteTime(route, direction, key){
  const suffix = direction === 'fwd' ? 'Fwd' : 'Bwd';
  return route[`${key}${suffix}`] || route[key];
}
function getUpcoming(route, direction, stopIdx, nowMins, count=4){
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
function getAllTimesForStop(route, direction, stopIdx){
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
function getNextForStop(route, direction, stopIdx, nowMins){
  const res = getUpcoming(route, direction, stopIdx, nowMins, 1);
  return res.length ? res[0] : null;
}
function findStopIndex(route, direction, stop){
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
function getNowMins(){
  const d = new Date();
  return d.getHours()*60+d.getMinutes();
}

export default function Dashboard() {
  const [routeKey, setRouteKey] = useState('balkasar');
  const [selFwdIdx, setSelFwdIdx] = useState(null);
  const [selBwdIdx, setSelBwdIdx] = useState(null);
  const [view, setView] = useState('fwd'); 
  const [tick, setTick] = useState(0);

  useEffect(()=>{
    const id = setInterval(()=>setTick(t=>t+1), 30000);
    return ()=>clearInterval(id);
  },[]);

  const route = ROUTES[routeKey];
  const nm = getNowMins();

  const stops = view==='fwd' ? route.fwdStops : route.bwdStops;
  const selIdx = view==='fwd' ? selFwdIdx : selBwdIdx;
  const setSelIdx = view==='fwd' ? setSelFwdIdx : setSelBwdIdx;

  const globalUpcoming = getUpcoming(route, view, 0, nm, 4);

  const masterNext = (()=>{
    if(selIdx === null) return globalUpcoming[0] || null;
    return getNextForStop(route,view,selIdx,nm);
  })();

  const changeRoute = (key)=>{
    setRouteKey(key);
    setSelFwdIdx(null);
    setSelBwdIdx(null);
    setView('fwd');
  };

  const selectStop = (idx)=>{
    setSelIdx(idx);
    if(window.innerWidth <= 1024){
      setTimeout(()=>{
        document.querySelector('.t-details')?.scrollIntoView({behavior:'smooth',block:'start'});
      }, 80);
    }
  };

  return (
    <div className="tracker-layout">
      {/* SIDEBAR */}
      <aside className="t-sidebar">
        <div className="t-brand"><i className="fa-solid fa-bus-simple"/> Bus Tracker</div>
        {Object.entries(ROUTES).map(([key,r])=>(
          <button key={key} className={`route-btn ${routeKey===key?'active':''}`} onClick={()=>changeRoute(key)}>
            {r.shortName}
            <small>{r.fwdLabel.replace('→','↔').replace(' →','')}</small>
          </button>
        ))}
        <div style={{marginTop:24,fontSize:'.78rem',color:'#94a3b8',lineHeight:1.6}}>
          <strong style={{display:'block',marginBottom:6,color:'#64748b'}}>Operating Hours</strong>
          First: {minToStr(parseTime(getRouteTime(route, view, 'firstBus')))}<br/>
          Last: {minToStr(parseTime(getRouteTime(route, view, 'lastBus')))}<br/>
          Interval: every {route.interval} min
        </div>
      </aside>

      {/* MAIN */}
      <div className="t-main">
        {/* Mobile Tabs */}
        <div className="mobile-tabs">
          {Object.entries(ROUTES).map(([key,r])=>(
            <button key={key} className={`mob-tab ${routeKey===key?'active':''}`} onClick={()=>changeRoute(key)}>{r.shortName}</button>
          ))}
        </div>

        {/* Status Bar */}
        <div className="t-status">
          <div className="t-status-left">
            <div className="t-status-label">
              {selIdx!==null ? `Next at ${stops[selIdx]}` : `Next from ${view==='fwd'?route.fwdStops[0]:route.bwdStops[0]}`}
            </div>
            <div className="t-status-time">{masterNext ? masterNext.time : 'No Service'}</div>
            <div className="t-status-sub">{route.name}</div>
          </div>
          <div className="upcoming-box">
            <div className="upcoming-title">Next departures</div>
            <div className="upcoming-grid">
              {globalUpcoming.length ? globalUpcoming.map((b,i)=>(
                <div key={i} className="upcoming-item">
                  <div className="upcoming-item-label">{i===0?'Next':i===1?'Then':i===2?'+2':'+ 3'}</div>
                  <div className="upcoming-item-time">{b.time}</div>
                </div>
              )) : <div style={{color:'rgba(255,255,255,.7)',fontSize:'.8rem'}}>No more buses today</div>}
            </div>
          </div>
        </div>

        {/* Direction Switcher */}
        <div style={{display:'flex',borderBottom:'1px solid var(--border)',background:'#fff'}}>
          {['fwd','bwd'].map(d=>(
            <button key={d} onClick={()=>setView(d)} style={{flex:1,padding:'13px',border:'none',background:'transparent',fontFamily:'Inter',fontWeight:600,fontSize:'.85rem',cursor:'pointer',borderBottom:`3px solid ${view===d?'var(--green)':'transparent'}`,color:view===d?'var(--green)':'var(--sub)',transition:'.2s'}}>
              <i className={`fa-solid fa-arrow-${d==='fwd'?'right':'left'}`} style={{marginRight:8}}/>
              {d==='fwd'?route.fwdLabel:route.bwdLabel}
            </button>
          ))}
        </div>

        {/* Grid Body */}
        <div className="t-body">
          {/* Stop List */}
          <div className="stop-list">
            {stops.map((stop,idx)=>{
              const next = getNextForStop(route,view,idx,nm);
              const arriving = next && (next.mins - nm) < 8;
              const badgeText = next ? (arriving?'Arriving':next.time) : 'Ended';
              const badgeClass = !next?'badge-ended':arriving?'badge-arriving':'badge-soon';
              return (
                <div key={idx} className={`stop-item ${selIdx===idx?'active':''}`} onClick={()=>selectStop(idx)}>
                  <div className="stop-num">{idx+1}</div>
                  <div className="stop-info">
                    <span className="stop-name-urdu">{u(stop)}</span>
                    <span className="stop-name-eng">{stop}</span>
                  </div>
                  <span className={`stop-badge ${badgeClass}`}>{badgeText}</span>
                </div>
              );
            })}
          </div>

          {/* Schedule Engine Output */}
          <div className="t-details">
            {selIdx===null ? (
              <div className="no-stop">
                <i className="fa-solid fa-hand-pointer" style={{fontSize:'2rem',color:'#cbd5e1',marginBottom:14,display:'block'}}/>
                Select a stop to view full schedule
              </div>
            ) : (()=>{
              const stop = stops[selIdx];
              const fwdIdx = view==='fwd' ? selIdx : findStopIndex(route,'fwd',stop);
              const bwdIdx = view==='bwd' ? selIdx : findStopIndex(route,'bwd',stop);
              
              const fwdNext = getNextForStop(route,'fwd',fwdIdx,nm);
              const bwdNext = getNextForStop(route,'bwd',bwdIdx,nm);
              
              const fwdAll = getUpcoming(route,'fwd',fwdIdx,nm,12);
              const bwdAll = getUpcoming(route,'bwd',bwdIdx,nm,12);
              
              const fwdFull = getAllTimesForStop(route,'fwd',fwdIdx);
              const bwdFull = getAllTimesForStop(route,'bwd',bwdIdx);
              const maxRows = Math.max(fwdAll.length, bwdAll.length);
              
              return (
                <>
                  <div className="detail-header">
                    <div className="detail-urdu">{u(stop)}</div>
                    <div className="detail-eng">{stop}</div>
                  </div>
                  <div className="detail-cards">
                    <div className="detail-card">
                      <div className="detail-card-label">Next — {route.fwdLabel}</div>
                      <div className="detail-card-time">{fwdNext ? fwdNext.time : '—'}</div>
                      <div className="detail-card-direction">{fwdNext ? `Dep. ${minToStr(fwdNext.dep)} from origin` : 'No more today'}</div>
                    </div>
                    <div className="detail-card">
                      <div className="detail-card-label">Next — {route.bwdLabel}</div>
                      <div className="detail-card-time">{bwdNext ? bwdNext.time : '—'}</div>
                      <div className="detail-card-direction">{bwdNext ? `Dep. ${minToStr(bwdNext.dep)} from origin` : 'No more today'}</div>
                    </div>
                  </div>
                  <div className="tbl-wrap">
                    <h5>Upcoming Arrivals at this Stop</h5>
                    <table>
                      <thead><tr><th>{route.fwdLabel}</th><th>{route.bwdLabel}</th></tr></thead>
                      <tbody>
                        {Array.from({length:maxRows}).map((_,i)=>{
                          const f = fwdAll[i];
                          const b = bwdAll[i];
                          const fNext = f && fwdNext && f.mins===fwdNext.mins;
                          const bNext = b && bwdNext && b.mins===bwdNext.mins;
                          return (
                            <tr key={i} className={(fNext||bNext)?'next-row':''}>
                              <td>{f ? f.time : '—'}</td>
                              <td>{b ? b.time : '—'}</td>
                            </tr>
                          );
                        })}
                      </tbody>
                    </table>
                  </div>
                  <div className="full-schedule">
                    <h5>Full Daily Timetable at this Stop</h5>
                    <div className="full-grid">
                      <div className="full-panel">
                        <div className="full-panel-title">{route.fwdLabel}</div>
                        {fwdFull.length ? (
                          <div className="time-list">
                            {fwdFull.map((bus,i)=>{
                              const isNext = fwdNext && bus.mins === fwdNext.mins;
                              return (
                                <div key={i} className={`time-chip ${isNext?'next':''}`}>{bus.time}</div>
                              );
                            })}
                          </div>
                        ) : <div className="empty-times">No schedule found</div>}
                      </div>
                      
                      <div className="full-panel">
                        <div className="full-panel-title">{route.bwdLabel}</div>
                        {bwdFull.length ? (
                          <div className="time-list">
                            {bwdFull.map((bus,i)=>{
                              const isNext = bwdNext && bus.mins === bwdNext.mins;
                              return (
                                <div key={i} className={`time-chip ${isNext?'next':''}`}>{bus.time}</div>
                              );
                            })}
                          </div>
                        ) : <div className="empty-times">No schedule found</div>}
                      </div>
                    </div>
                  </div>
                </>
              );
            })()}
          </div>
        </div>
      </div>
    </div>
  );
}