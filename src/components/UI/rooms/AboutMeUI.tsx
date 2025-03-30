import React from 'react';
import { assets } from '../../../assets/assets';
import './AboutMeUI.css';

const AboutMeUI: React.FC = () => {
  const skillsList = [
    assets.svg.ts,
    assets.svg.js,
    assets.svg.react,
    assets.svg.threejs,
    assets.svg.blender,
    assets.svg.unity,
    assets.svg.opengl,
    assets.svg.python,
    assets.svg.csh,
    assets.svg.cpp,
    assets.svg.php,
    assets.svg.symfony,
  ];

  return (
    <>
      <div
        style={{ textAlign: 'justify', fontSize: '0.9rem', lineHeight: '1.5', minHeight: '280px' }}
      >
        <img
          src={assets.images.face}
          alt="Ray's Portrait"
          className="portrait"
        />
        <p>
          Hi, I’m Ray, a 3D developer with 4 years of experience. I specialize in
          creating immersive experiences and interactive 3D content, particularly using
          <b>Three.js</b> for <b>front-end development</b>. My work in 3D graphics allows me to blend
          creativity with technology to build visually stunning applications.
          <br /><br />
          Alongside 3D front-end development, I’ve also worked in <b>Unity</b>, <b>Back-End</b>, and
          <b>VR development</b>, expanding my skills across multiple fields. These areas have
          allowed me to approach projects from different angles, offering a broad skill
          set to tackle diverse challenges.
          <br /><br />
          I’m always excited to learn and explore new technologies, pushing myself to
          grow and adapt in an ever-evolving industry. Let’s connect and create
          something incredible together!
        </p>
      </div>

      <div style={{ textAlign: 'center', marginTop: '40px' }}>
        <h3>Some of my skills...</h3>
        <div className="skills-container">
          {skillsList.map((skill, index) => (
            <div key={index} className="skill-item">
              <img
                src={skill}
                alt={`skill-icon-${index}`}
                className="skill-icon"
              />
            </div>
          ))}
        </div>
        <p>And more ...</p>
      </div>
    </>
  );
};

export default AboutMeUI;
