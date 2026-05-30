import React from 'react';

const Footer = () => {
  return (
    <footer>
      <div className="container">
        <div className="footer-logo">Chakwal Bus Tracker</div>
        <div className="footer-links">
          <a href="#">Home</a>
          <a href="#tracker">Tracker</a>
          <a href="#about">About</a>
          <a href="#contact">Contact</a>
        </div>
        <div className="footer-copy">
          &copy; 2025 Chakwal Bus Tracker — Made by Muhammad Abrash Haider<br />
          <small style={{ opacity: .6 }}>Schedule data sourced from official bus timetables</small><br />
          <small style={{ opacity: .8, color: '#94a3b8' }}>Made for the people of Chakwal</small>
        </div>
      </div>
    </footer>
  );
};

export default Footer;