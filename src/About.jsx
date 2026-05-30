import React from 'react';

const About = () => {
  return (
    <section id="about" className="section section-alt">
      <div className="container">
        <div className="section-head">
          <h2>About This Project</h2>
          <p>Built for the community of Chakwal</p>
        </div>
        <div className="about-grid">
          <div className="about-text">
            <h3>Simplifying Daily Commute in Chakwal</h3>
            <p>
              This project was built to solve a real problem — the people of Chakwal had no reliable way to know when their bus would arrive. Whether travelling to work, school, or between cities, timing matters.
            </p>
            <p>
              The tracker covers all three major bus routes operating in Chakwal District, with stop-by-stop arrival times calculated from the official schedule. Data is updated automatically based on the current time.
            </p>
            <p style={{ background: 'var(--green-light)', padding: '14px 18px', borderRadius: '8px', borderLeft: '4px solid var(--green)', fontWeight: 500 }}>
              Made by <strong>Muhammad Abrash Haider</strong> — MCS Student, Military College of Signals (NUST)
            </p>
          </div>
          <div className="about-img">
            <img src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRXsJwpLrI6rBdqh_I72Gq6TrlPVqth589Dxw&s" alt="Chakwal bus service" />
          </div>
        </div>
      </div>
    </section>
  );
};

export default About;