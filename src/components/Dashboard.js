import React, { useState, useEffect } from 'react';
import { ROUTES, u } from '../data/busData';
import { 
  nowMins, 
  getUpcoming, 
  getNextForStop, 
  minToStr, 
  parseTime, 
  getRouteTime, 
  findStopIndex, 
  getAllTimesForStop 
} from '../utils/timeHelpers';

const Dashboard = () => {
  const [routeKey, setRouteKey] = useState('balkasar');
  const [selFwdIdx, setSelFwdIdx] = useState(null);
  const [selBwdIdx, setSelBwdIdx] = useState(null);
  const [view, setView] = useState('fwd'); // fwd | bwd
  const [tick, setTick] = useState(0);

  useEffect(() => {
    const id = setInterval(() => setTick(t => t + 1), 30000);
    return () => clearInterval(id);
  }, []);

  const route = ROUTES[routeKey];
  const nm = nowMins();

  const stops = view === 'fwd' ? route.fwdStops : route.bwdStops;
  const selIdx = view === 'fwd' ? selFwdIdx : selBwdIdx;
  const setSelIdx = view === 'fwd' ? setSelFwdIdx : setSelBwdIdx;

  const globalUpcoming = getUpcoming(route, view, 0, nm, 4);

  let nextFwd = null, nextBwd = null;
  if (selFwdIdx !== null) nextFwd = getNextForStop(route, 'fwd', selFwdIdx, nm);
  if (selBwdIdx !== null) nextBwd = getNextForStop(route, 'bwd', selBwdIdx, nm);

  const masterNext = (() => {
    if (selIdx === null) return globalUpcoming[0] || null;
    return getNextForStop(route, view, selIdx, nm);
  })();

  const changeRoute = (key) => {
    setRouteKey(key);
    setSelFwdIdx(null);
    setSelBwdIdx(null);
    setView('fwd');
  };

  const selectStop = (idx) => {
    setSelIdx(idx);
    if (window.innerWidth <= 1024) {
      setTimeout(() => {
        document.querySelector('.t-details')?.scrollIntoView({ behavior: 'smooth', block: 'start' });
      }, 80);
    }
  };

  return (
    <div className="tracker-layout">
      {/* SIDEBAR */}
      <aside className="t-sidebar">
        <div className="t-brand"><i className="fa-solid fa-bus-simple"/> Bus Tracker</div>
        {Object.entries(ROUTES).map(([key, r]) => (
          <button key={key} className={`route-btn ${routeKey === key ? 'active' : ''}`} onClick={() => changeRoute(key)}>
            {r.shortName}
            <small>{r.fwdLabel.replace('→', '↔').replace(' →', '')}</small>
          </button>
        ))}
        <div style={{ marginTop: 24, fontSize: '.78rem', color: '#94a3b8', lineHeight: 1.6 }}>
          <strong style={{ display: 'block', marginBottom: 6, color: '#64748b' }}>Operating Hours</strong>
          First: {minToStr(parseTime(getRouteTime(route, view, 'firstBus')))}<br/>
          Last: {minToStr(parseTime(getRouteTime(route, view, 'lastBus')))}<br/>
          Interval: every {route.interval} min
        </div>
      </aside>

      {/* MAIN */}
      <div className="t-main">
        {/* mobile tabs */}
        <div className="mobile-tabs">
          {Object.entries(ROUTES).map(([key, r]) => (
            <button key={key} className={`mob-tab ${routeKey === key ? 'active' : ''}`} onClick={() => changeRoute(key)}>{r.shortName}</button>
          ))}
        </div>

        {/* Status bar */}
        <div className="t-status">
          <div className="t-status-left">
            <div className="t-status-label">
              {selIdx !== null ? `Next at ${stops[selIdx]}` : `Next from ${view === 'fwd' ? route.fwdStops[0] : route.bwdStops[0]}`}
            </div>
            <div className="t-status-time">{masterNext ? masterNext.time : 'No Service'}</div>
            <div className="t-status-sub">{route.name}</div>
          </div>
          <div className="upcoming-box">
            <div className="upcoming-title">Next departures</div>
            <div className="upcoming-grid">
              {globalUpcoming.length ? (
                globalUpcoming.map((b, i) => (
                  <div key={i} className="upcoming-item">
                    <div className="upcoming-item-label">{i === 0 ? 'Next' : i === 1 ? 'Then' : i === 2 ? '+2' : '+ 3'}</div>
                    <div className="upcoming-item-time">{b.time}</div>
                  </div>
                ))
              ) : (
                <div style={{ color: 'rgba(255,255,255,.7)', fontSize: '.8rem' }}>No more buses today</div>
              )}
            </div>
          </div>
        </div>

        {/* Direction tabs */}
        <div style={{ display: 'flex', borderBottom: '1px solid var(--border)', background: '#fff' }}>
          {['fwd', 'bwd'].map(d => (
            <button key={d} onClick={() => setView(d)} style={{ flex: 1, padding: '13px', border: 'none', background: 'transparent', fontFamily: 'Inter', fontWeight: 600, fontSize: '.85rem', cursor: 'pointer', borderBottom: `3px solid ${view === d ? 'var(--green)' : 'transparent'}`, color: view === d ? 'var(--green)' : 'var(--sub)', transition: '.2s' }}>
              <i className={`fa-solid fa-arrow-${d === 'fwd' ? 'right' : 'left'}`} style={{ marginRight: 8 }}/>
              {d === 'fwd' ? route.fwdLabel : route.bwdLabel}
            </button>
          ))}
        </div>

        {/* Body */}
        <div className="t-body">
          {/* Stop List */}
          <div className="stop-list">
            {stops.map((stop, idx) => {
              const next = getNextForStop(route, view, idx, nm);
              const arriving = next && (next.mins - nm) < 8;
              const badgeText = next ? (arriving ? 'Arriving' : next.time) : 'Ended';
              const badgeClass = !next ? 'badge-ended' : arriving ? 'badge-arriving' : 'badge-soon';
              return (
                <div key={idx} className={`stop-item ${selIdx === idx ? 'active' : ''}`} onClick={() => selectStop(idx)}>
                  <div className="stop-num">{idx + 1}</div>
                  <div className="stop-info">
                    <span className="stop-name-urdu">{u(stop)}</span>
                    <span className="stop-name-eng">{stop}</span>
                  </div>
                  <span className={`stop-badge ${badgeClass}`}>{badgeText}</span>
                </div>
              );
            })}
          </div>

          {/* Details */}
          <div className="t-details">
            {selIdx === null ? (
              <div className="no-stop">
                <i className="fa-solid fa-hand-pointer" style={{ fontSize: '2rem', color: '#cbd5e1', marginBottom: 14, display: 'block' }}/>
                Select a stop to view full schedule
              </div>
            ) : (() => {
              const stop = stops[selIdx];
              const fwdIdx = view === 'fwd' ? selIdx : findStopIndex(route, 'fwd', stop);
              const bwdIdx = view === 'bwd' ? selIdx : findStopIndex(route, 'bwd', stop);
              const fwdNext = getNextForStop(route, 'fwd', fwdIdx, nm);
              const bwdNext = getNextForStop(route, 'bwd', bwdIdx, nm);
              const fwdAll = getUpcoming(route, 'fwd', fwdIdx, nm, 12);
              const bwdAll = getUpcoming(route, 'bwd', bwdIdx, nm, 12);
              const fwdFull = getAllTimesForStop(route, 'fwd', fwdIdx);
              const bwdFull = getAllTimesForStop(route, 'bwd', bwdIdx);
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
                      <div className="detail-card-time">{fwdNext ? fwdNext.time : 'No Service'}</div>
                      <div className="detail-card-direction">From Origin: {minToStr(parseTime(getRouteTime(route, 'fwd', 'firstBus')))}</div>
                    </div>
                    <div className="detail-card">
                      <div className="detail-card-label">Next — {route.bwdLabel}</div>
                      <div className="detail-card-time">{bwdNext ? bwdNext.time : 'No Service'}</div>
                      <div className="detail-card-direction">From Origin: {minToStr(parseTime(getRouteTime(route, 'bwd', 'firstBus')))}</div>
                    </div>
                  </div>

                  <div className="tbl-wrap">
                    <h5>Upcoming Shifts Today</h5>
                    <table>
                      <thead>
                        <tr>
                          <th>{route.fwdLabel}</th>
                          <th>{route.bwdLabel}</th>
                        </tr>
                      </thead>
                      <tbody>
                        {Array.from({ length: maxRows }).map((_, i) => (
                          <tr key={i} className={i === 0 ? 'next-row' : ''}>
                            <td>{fwdAll[i] ? fwdAll[i].time : '—'}</td>
                            <td>{bwdAll[i] ? bwdAll[i].time : '—'}</td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>

                  <div className="full-schedule">
                    <h5>Full Route Timetable</h5>
                    <div className="full-grid">
                      <div className="full-panel">
                        <div className="full-panel-title">{route.fwdLabel} All Day</div>
                        <div className="time-list">
                          {fwdFull.map((b, i) => (
                            <div key={i} className={`time-chip ${fwdNext && fwdNext.dep === b.dep ? 'next' : ''}`}>{b.time}</div>
                          ))}
                        </div>
                      </div>
                      <div className="full-panel">
                        <div className="full-panel-title">{route.bwdLabel} All Day</div>
                        <div className="time-list">
                          {bwdFull.map((b, i) => (
                            <div key={i} className={`time-chip ${bwdNext && bwdNext.dep === b.dep ? 'next' : ''}`}>{b.time}</div>
                          ))}
                        </div>
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
};

export default Dashboard;