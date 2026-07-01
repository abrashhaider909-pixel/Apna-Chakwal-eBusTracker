import React from 'react';
import Dashboard from './Dashboard';
import About from './About';
import Contact from './Contact';
import Footer from './Footer';

const App = () => {
  return (
    <>
      {/* NAV */}
      <nav className="nav">
        <a href="#" className="nav-logo"><i className="fa-solid fa-location-dot"/>ApnaChakwaleBusTracker</a>
        <div className="nav-links">
          <a href="#">Home</a>
          <a href="#tracker">Tracker</a>
          <a href="#about">About</a>
          <a href="#contact">Contact</a>
        </div>
        <a href="#tracker" className="nav-cta">Track Now</a>
      </nav>

      {/* HERO */}
      <section className="hero">
        <h1>ApnaChakwaleBusTracker</h1>
        <p>Smart transit for Chakwal City with live bus tracking for Balkassar, Dhudial, and Mulhal Mughlan routes — built with exact schedule data for every stop.</p>
        <a href="#tracker" className="hero-btn">Start Tracking <i className="fa-solid fa-arrow-right"/></a>
        <div className="hero-stats">
          <div className="hero-stat"><div className="hero-stat-num">3</div><div className="hero-stat-label">Routes</div></div>
          <div className="hero-stat"><div className="hero-stat-num">60+</div><div className="hero-stat-label">Stops</div></div>
          <div className="hero-stat"><div className="hero-stat-num">Live</div><div className="hero-stat-label">Arrivals</div></div>
        </div>
      </section>

      {/* TRACKER */}
      <section id="tracker" className="section section-alt">
        <div className="container">
          <div className="section-head">
            <h2>Live Bus Tracker</h2>
            <p>Select your route and stop to see exact arrival times</p>
          </div>
          <div className="widget-wrap">
            <Dashboard />
          </div>
        </div>
      </section>

      {/* FEATURES */}
      <section className="section">
        <div className="container">
          <div className="section-head">
            <h2>Why ApnaChakwaleBusTracker?</h2>
            <p>Designed specifically for the people of Chakwal</p>
          </div>
          <div className="features-grid">
            <div className="feat">
              <div className="feat-icon"><i className="fa-solid fa-clock"/></div>
              <h4>Accurate Scheduled Arrivals</h4>
              <p>Stop-level arrival times are calculated from route schedules so commuters can plan trips with confidence.</p>
            </div>
            <div className="feat">
              <div className="feat-icon"><i className="fa-solid fa-language"/></div>
              <h4>Bilingual Stop Information</h4>
              <p>English and Urdu stop names improve accessibility for students, workers, families, and daily passengers.</p>
            </div>
            <div className="feat">
              <div className="feat-icon"><i className="fa-solid fa-route"/></div>
              <h4>Complete Route Coverage</h4>
              <p>Balkassar, Dhudial, and Mulhal Mughlan routes include both forward and return direction timetables.</p>
            </div>
          </div>
        </div>
      </section>

      {/* ABOUT SECTION */}
      <About />

      {/* CONTACT SECTION (Includes the traveller-note inside) */}
      <Contact />

      {/* FOOTER */}
      <Footer />
    </>
  );
};

export default App;